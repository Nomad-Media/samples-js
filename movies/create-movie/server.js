const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";
const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";
const RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const MOVIE_CONTENT_DEFINITION_ID = "eb710e28-7c44-492e-91f9-8acd0cd9331c";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-npm";
import config from "./config.js";
const NomadSDK = new NomadMediaSDK(config);

import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/movies.html');
});

app.post('/get-genre-list', upload.none(), async (req, res) => 
{
    try
    {
        const GENRE_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: GENRE_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);

        res.status(200).json(GENRE_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-performer-list', upload.none(), async (req, res) =>
{
    try
    {
        const PERFORMER_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: PERFORMER_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);
        res.status(200).json(PERFORMER_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-tag-list', upload.none(), async (req, res) =>
{
    try
    {
        const TAG_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: TAG_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);
        res.status(200).json(TAG_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-rating-list', upload.none(), async (req, res) =>
{
    try
    {
        const RATING_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: RATING_CONTENT_DEFINITION_ID,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);
        res.status(200).json(RATING_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-movie', upload.fields([{ name: "imageFile", maxCount: 1 }, 
    { name: "videoFile", maxCount: 1 }]), async (req, res) => 
{
    try
    {
        let contentId = null;
        if (req.body.typeSelect === "Create")
        {
            const CREATE_MOVIE_INFO = await NomadSDK.createContent(MOVIE_CONTENT_DEFINITION_ID);
            contentId = CREATE_MOVIE_INFO.contentId;
        }
        else
        {
            contentId = req.body.updateId;
        }

        let image = null;
        if (req.files.imageFile && req.body.imageId === "")
        {
            const IMAGE_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
                req.files.imageFile[0], null);

            image = { description: req.files.imageFile[0].originalname, id: IMAGE_ID }
        }
        else
        {
            const IMAGE_INFO = await NomadSDK.getAssetDetails(req.body.imageId);

            if (IMAGE_INFO)
            {
                image = { description: IMAGE_INFO.properties.displayName, id: req.body.imageId};
            }   
        }

        let video = null;
        if (req.files.movieFile && req.body.videoId === "")
        {
            const VIDEO_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
                req.files.videoFile[0], null);

            video = { description: req.files.videoFile[0].originalname, id: VIDEO_ID }
        }
        else
        {
            const VIDEO_INFO = await NomadSDK.getAssetDetails(req.body.videoId);

            if (VIDEO_INFO)
            {
                video = { description: VIDEO_INFO.properties.displayName, id: req.body.videoId, };
            }
        }

        let genres = null;
        if (req.body.genreSelect)
        {
            console.log(req.body.genreSelect);
            const GENRES_PARSED = JSON.parse(req.body.genreSelect);
            genres = Array.isArray(GENRES_PARSED) ? GENRES_PARSED : [GENRES_PARSED];
        }

        let performers = null;
        if (req.body.performerSelect)
        {
            const PERFORMERS_PARSED = JSON.parse(req.body.performerSelect);
            performers = Array.isArray(PERFORMERS_PARSED) ? PERFORMERS_PARSED : [PERFORMERS_PARSED];
        }

        let tags = null;
        if (req.body.tagSelect)
        {
            const TAGS_PARSED = JSON.parse(req.body.tagSelect);
            tags = Array.isArray(TAGS_PARSED) ? TAGS_PARSED : [TAGS_PARSED];
        }

        let ratings = null;
        if (req.body.ratingSelect)
        {
            ratings = JSON.parse(req.body.ratingSelect);
        }

        const MOVIE_INFO = await NomadSDK.updateContent(contentId, MOVIE_CONTENT_DEFINITION_ID, {
            ...(req.body.title && { title: req.body.title }),
            ...(req.body.plot && { plot: req.body.plot }),
            ...(req.body.date && { releaseDate: `${req.body.date}T00:00:00Z` }),
            ...(req.body.genreSelect && { genres: genres }),
            ...(req.body.performerSelect && { performers: performers }),
            ...(req.body.tagSelect && { tags: tags }),
            ...(req.body.ratingSelect && { ratings: ratings }),
            ...(image && { image: image }),
            ...(video && { movieFile: video }),
        });

        res.status(200).json(MOVIE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/search-movies', upload.none(), async (req, res) =>
{
    try
    {
        const FILTERS = [{
            fieldName: "contentDefinitionId",
            operator: "Equals",
            values: MOVIE_CONTENT_DEFINITION_ID
        }];

        if (req.body.fieldName)
        {
            if (typeof req.body.fieldName === 'string') 
            {
                FILTERS.push({
                    fieldName: req.body.fieldName,
                    operator: req.body.operator,
                    values: req.body.value,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.value.length; ++idx)
                {
                    FILTERS.push({
                        fieldName: req.body.fieldName[idx],
                        operator: req.body.operator[idx],
                        values: req.body.value[idx],
                    });
                }
            }
        }

        const SORT_FIELDS = [];
        if (req.body.sortFieldName)
        {
            if (typeof req.body.sortFieldName === 'string') 
            {
                SORT_FIELDS.push({
                    fieldName: req.body.sortFieldName,
                    sortType: req.body.sortType,
                });
            }
            else
            {
                for (let idx = 0; idx < req.body.sortFieldName.length; ++idx)
                {
                    SORT_FIELDS.push({
                        fieldName: req.body.sortFieldName[idx],
                        sortType: req.body.sortType[idx],
                    });
                }
            }
        }

        const RESULT_FIELD_NAMES = Array.isArray(req.body.resultFieldNames) ? req.body.resultFieldNames.map(fieldName => ({name: fieldName})) : [{name: req.body.resultFieldNames}];
        
        const SEARCH_MOVIE_INFO = await NomadSDK.search(req.body.searchQuery,
            req.body.pageOffset, req.body.pageSize, FILTERS, SORT_FIELDS,
            RESULT_FIELD_NAMES, req.body.similarAssetId, req.body.minScore, 
            req.body.excludeTotalRecordCount, req.body.filterBinder);

        res.status(200).json(SEARCH_MOVIE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-movie', upload.none(), async (req, res) =>
{
    try
    {
        const GET_MOVIE_INFO = await NomadSDK.getContent(req.body.getId, MOVIE_CONTENT_DEFINITION_ID);

        res.status(200).json(GET_MOVIE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-movie', upload.none(), async (req, res) =>
{
    try
    {
        const DELETE_MOVIE_INFO = await NomadSDK.deleteContent(req.body.deleteId);

        res.status(200).json(DELETE_MOVIE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
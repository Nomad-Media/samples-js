const CONTENT_RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";
const EPISODE_CONTENT_DEFINITION_ID = "03c22d5f-b5a9-4c31-b46f-ece15be01d25";
const FEATURED_GROUP_CONTENT_DEFINITION_ID = "a33d1db2-b3ec-478b-8b14-48c813e7153e";
const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";
const LANGUAGE_CONTENT_DEFINITION_ID = "e4b10c04-1878-4830-a115-e42d52705059";
const MEDIA_ATTRIBUTE_CONTENT_DEFINITION_ID = "ada6d0f1-98ba-4248-ba14-8386fa14e497";
const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";
const SEASON_CONTENT_DEFINITION_ID = "58922a6f-6a9e-41d6-95c4-4d27f932b34e";
const SERIES_CONTENT_DEFINITION_ID = "9c1713ce-006c-4dc7-afb6-028df1fb3bf3";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const VIDEO_CONTENT_DEFINITION_ID = "22470571-8d03-4b04-b8dc-4f7e91aa57d4";
const VIDEO_TYPE_CONTENT_DEFINITION_ID = "9d84b2fd-fee0-47d8-9036-f9726c007927";

const PARENT_FOLDER_ASSET_ID = "bf731b1a-d798-49b6-9c53-c89abedd7c8e";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-npm";
import config from "./config.js";
const NomadSDK = new NomadMediaSDK(config);

import express from 'express';
import multer from 'multer';
import { isArray } from 'util';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/mitus.html');
});

app.get('/content-ratings', async (req, res) => {
    try
    {
        const CONTENT_RATINGS = await getGroups(CONTENT_RATING_CONTENT_DEFINITION_ID);

        res.status(200).json(CONTENT_RATINGS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/featured-groups', async (req, res) => {
    try
    {
        const FEATURED_GROUPS = await getGroups(FEATURED_GROUP_CONTENT_DEFINITION_ID);

        res.status(200).json(FEATURED_GROUPS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/genres', async (req, res) => {
    try
    {
        const GENRES = await getGroups(GENRE_CONTENT_DEFINITION_ID);

        res.status(200).json(GENRES);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/languages', async (req, res) => {
    try
    {
        const LANGUAGES = await getGroups(LANGUAGE_CONTENT_DEFINITION_ID);

        res.status(200).json(LANGUAGES);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/media-attributes', async (req, res) => {
    try
    {
        const MEDIA_ATTRIBUTES = await getGroups(MEDIA_ATTRIBUTE_CONTENT_DEFINITION_ID);

        res.status(200).json(MEDIA_ATTRIBUTES);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/performers', async (req, res) => {
    try
    {
        const PERFORMERS = await getGroups(PERFORMER_CONTENT_DEFINITION_ID);

        res.status(200).json(PERFORMERS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/seasons', async (req, res) => {
    try
    {
        const SEASONS = await getGroups(SEASON_CONTENT_DEFINITION_ID);

        res.status(200).json(SEASONS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/series', async (req, res) => {
    try
    {
        const SERIES = await getGroups(SERIES_CONTENT_DEFINITION_ID);

        res.status(200).json(SERIES);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/tags', async (req, res) => {
    try
    {
        const TAGS = await getGroups(TAG_CONTENT_DEFINITION_ID);

        res.status(200).json(TAGS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.get('/video-types', async (req, res) => {
    try
    {
        const VIDEO_TYPES = await getGroups(VIDEO_TYPE_CONTENT_DEFINITION_ID);

        res.status(200).json(VIDEO_TYPES);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.post('/upload', upload.fields([{ name: "mainVideo" }, { name: "thumbnail" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"][0];
        const THUMBNAIL = req.files["thumbnail"][0];

        const CONTENT_RATING = req.body.contentRatingSelect ? JSON.parse(req.body.contentRatingSelect) : null;

        let featuredGroups = null;
        if (req.body.featuredGroupsSelect)
        {
            const PARSED_FEATURED_GROUP = JSON.parse(req.body.featuredGroupsSelect);
            featuredGroups = Array.isArray(PARSED_FEATURED_GROUP) ? PARSED_FEATURED_GROUP : [PARSED_FEATURED_GROUP];
        }

        let genres = null;
        if (req.body.genresSelect)
        {
            const PARSED_GENRES = JSON.parse(req.body.genresSelect);
            genres = Array.isArray(PARSED_GENRES) ? PARSED_GENRES : [PARSED_GENRES];
        }

        let languages = null;
        if (req.body.languagesSelect)
        {
            const PARSED_LANGUAGES = JSON.parse(req.body.languagesSelect);
            languages = Array.isArray(PARSED_LANGUAGES) ? PARSED_LANGUAGES : [PARSED_LANGUAGES];
        }
        
        let mediaAttributes = null;
        if (req.body.mediaAttributesSelect)
        {
            const PARSED_MEDIA_ATTRIBUTES = JSON.parse(req.body.mediaAttributesSelect);
            mediaAttributes = Array.isArray(PARSED_MEDIA_ATTRIBUTES) ? PARSED_MEDIA_ATTRIBUTES : [PARSED_MEDIA_ATTRIBUTES];
        }

        let performers = null;
        if (req.body.performersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.performersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        const PRIMARY_PERFORMER = req.body.primaryPerformerSelect ? JSON.parse(req.body.primaryPerformerSelect) : null;

        const SEASON = req.body.seasonSelect ? JSON.parse(req.body.seasonSelect) : null;

        const SERIES = req.body.seriesSelect ? JSON.parse(req.body.seriesSelect) : null;

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const VIDEO_TYPE_SELECT = req.body.videoTypeSelect ? JSON.parse(req.body.videoTypeSelect) : null;

        const UPLOAD_VIDEO_ID = await NomadSDK.uploadAsset(req.body.title, null, null, "replace",
            MAIN_VIDEO, PARENT_FOLDER_ASSET_ID);

        const UPLOAD_THUMBNAIL_ID = await NomadSDK.uploadAsset(`${req.body.title} thumbnail`, null, null, "replace",
            THUMBNAIL, PARENT_FOLDER_ASSET_ID);

        if (req.body.mediaTypeSelect === "episode")
        {
            const EPISODE = await NomadSDK.createContent(EPISODE_CONTENT_DEFINITION_ID);
            await NomadSDK.updateContent(EPISODE.contentId, EPISODE_CONTENT_DEFINITION_ID, 
                {
                    contentRating: CONTENT_RATING,
                    disabled: req.body.disabledSelect === "true",
                    duration: req.body.duration,
                    featuredGroups: featuredGroups,
                    groupSequence: req.body.groupSequence,
                    mainVideo: { "id": UPLOAD_VIDEO_ID },
                    number: req.body.number,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    performers: performers,
                    series: SERIES,
                    season: SEASON,
                    shortDescription: req.body.shortDescription,
                    sortNumber: req.body.sortNumber,
                    tags: tags,
                    thumbnailImage: { "id": UPLOAD_THUMBNAIL_ID },
                    title: req.body.title
                });

            res.status(200).json();
        }
        else
        {
            const VIDEO = await NomadSDK.createContent(VIDEO_CONTENT_DEFINITION_ID);
            await NomadSDK.updateContent(VIDEO.contentId, VIDEO_CONTENT_DEFINITION_ID, 
                {
                    contentRating: CONTENT_RATING,
                    disabled: req.body.disabledSelect === "true",
                    featuredGroups: featuredGroups,
                    groupSequence: req.body.groupSequence,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    mainVideo: { "id": UPLOAD_VIDEO_ID },
                    mediaAttributes: mediaAttributes,
                    performers: performers,
                    primaryPerformer: PRIMARY_PERFORMER,
                    shortDescription: req.body.shortDescription,
                    tags: tags,
                    thumbnailImage: { "id": UPLOAD_THUMBNAIL_ID },
                    title: req.body.title,
                    videoType: VIDEO_TYPE_SELECT
                });

            res.status(200).json();
        }
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});

async function getGroups(GROUP_CONTENT_DEFINITION_ID)
{
    const GROUP_LIST = [];
    let offset = 0;
    while (true)
    {
        const SEARCH_INFO = await NomadSDK.search(null, offset, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: GROUP_CONTENT_DEFINITION_ID,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);

        if (!SEARCH_INFO) return [];
        GROUP_LIST.push(...SEARCH_INFO.items);

        ++offset;

        if (SEARCH_INFO.items.length < 100) break;
    }
    return GROUP_LIST;
}
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

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/media-manager.html');
});

app.get('/api-paths', (req, res) => {
    const paths = app._router.stack
        .filter(r => r.route && r.route.path)
        .map(r => r.route.path);

    res.status(200).json(paths);
});

app.post('/asset-details', upload.none(), async (req, res) => {
    try
    {
        const ASSET_DETAILS = await NomadSDK.getAssetDetails(req.body.assetId);

        res.status(200).json(ASSET_DETAILS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
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

app.get('/episodes', async (req, res) => {
    try
    {
        const EPISODES = await getGroups(EPISODE_CONTENT_DEFINITION_ID);

        res.status(200).json(EPISODES);
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

app.get('/videos', async (req, res) => {
    try
    {
        const VIDEOS = await getGroups(VIDEO_CONTENT_DEFINITION_ID);

        res.status(200).json(VIDEOS);
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

app.post('/uploadVideo', upload.fields([{ name: "mainVideo" }, { name: "thumbnail" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

        let contentRatings = null;
        if (req.body.contentRatingsSelect)
        {
            const PARSED_CONTENT_RATINGS = JSON.parse(req.body.contentRatingsSelect);
            contentRatings = Array.isArray(PARSED_CONTENT_RATINGS) ? PARSED_CONTENT_RATINGS : [PARSED_CONTENT_RATINGS];
        }

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
        
        let uploadVideoId = null;
        if (MAIN_VIDEO)
        {
            uploadVideoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);

        }

        let uploadThumbnailId = null;
        if (THUMBNAIL)
        {
            uploadThumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }

        if (req.body.mediaTypeSelect === "episode")
        {
            const EPISODE = await NomadSDK.createContent(EPISODE_CONTENT_DEFINITION_ID);
            await NomadSDK.updateContent(EPISODE.contentId, EPISODE_CONTENT_DEFINITION_ID, 
                {
                    contentRatings: contentRatings,
                    disabled: req.body.disabledSelect === "true",
                    duration: req.body.duration,
                    featuredGroups: featuredGroups,
                    groupSequence: req.body.groupSequence,
                    mainVideo: uploadVideoId ? { "id": uploadVideoId } : null,
                    number: req.body.number,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    performers: performers,
                    series: SERIES,
                    season: SEASON,
                    shortDescription: req.body.shortDescription,
                    sortNumber: req.body.sortNumber,
                    tags: tags,
                    thumbnailImage: uploadThumbnailId ? { "id": uploadThumbnailId } : null,
                    title: req.body.title
                });

            res.status(200).json();
        }
        else
        {
            const VIDEO = await NomadSDK.createContent(VIDEO_CONTENT_DEFINITION_ID);
            await NomadSDK.updateContent(VIDEO.contentId, VIDEO_CONTENT_DEFINITION_ID, 
                {
            contentRatings: contentRatings,
                    disabled: req.body.disabledSelect === "true",
                    featuredGroups: featuredGroups,
                    genres: genres,
                    groupSequence: req.body.groupSequence,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    mainVideo: uploadVideoId ? { "id": uploadVideoId } : null,
                    mediaAttributes: mediaAttributes,
                    performers: performers,
                    primaryPerformer: PRIMARY_PERFORMER,
                    shortDescription: req.body.shortDescription,
                    tags: tags,
                    thumbnailImage: uploadThumbnailId ? { "id": uploadThumbnailId } : null,
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

app.post('/updateVideo', upload.fields([{ name: "updateMainVideo" }, { name: "updateThumbnail" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnail"] ? req.files["thumbnail"][0] : null;

        let contentRatings = null;
        if (req.body.updateContentRatingsSelect)
        {
            const PARSED_CONTENT_RATINGS = JSON.parse(req.body.updateContentRatingsSelect);
            contentRatings = Array.isArray(PARSED_CONTENT_RATINGS) ? PARSED_CONTENT_RATINGS : [PARSED_CONTENT_RATINGS];
        }

        let featuredGroups = null;
        if (req.body.updateFeaturedGroupsSelect)
        {
            const PARSED_FEATURED_GROUP = JSON.parse(req.body.updateFeaturedGroupsSelect);
            featuredGroups = Array.isArray(PARSED_FEATURED_GROUP) ? PARSED_FEATURED_GROUP : [PARSED_FEATURED_GROUP];
        }

        let genres = null;
        if (req.body.updateGenresSelect)
        {
            const PARSED_GENRES = JSON.parse(req.body.updateGenresSelect);
            genres = Array.isArray(PARSED_GENRES) ? PARSED_GENRES : [PARSED_GENRES];
        }

        let languages = null;
        if (req.body.updateLanguagesSelect)
        {
            const PARSED_LANGUAGES = JSON.parse(req.body.updateLanguagesSelect);
            languages = Array.isArray(PARSED_LANGUAGES) ? PARSED_LANGUAGES : [PARSED_LANGUAGES];
        }
        
        let mediaAttributes = null;
        if (req.body.updateMediaAttributesSelect)
        {
            const PARSED_MEDIA_ATTRIBUTES = JSON.parse(req.body.updateMediaAttributesSelect);
            mediaAttributes = Array.isArray(PARSED_MEDIA_ATTRIBUTES) ? PARSED_MEDIA_ATTRIBUTES : [PARSED_MEDIA_ATTRIBUTES];
        }

        let performers = null;
        if (req.body.updatePerformersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.updatePerformersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        const PRIMARY_PERFORMER = req.body.updatePrimaryPerformerSelect ? JSON.parse(req.body.updatePrimaryPerformerSelect) : null;

        const SEASON = req.body.updateSeasonSelect ? JSON.parse(req.body.updateSeasonSelect) : null;

        const SERIES = req.body.updateSeriesSelect ? JSON.parse(req.body.updateSeriesSelect) : null;

        let tags = null;
        if (req.body.updateTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.updateTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const VIDEO_TYPE_SELECT = req.body.updateVideoTypeSelect ? JSON.parse(req.body.updateVideoTypeSelect) : null;

        let contentId = null;
        let contentDefinitionId = null;
        if (req.body.updateMediaTypeSelect === "episode")
        {
            contentId = JSON.parse(req.body.updateEpisodeSelect).id;
            contentDefinitionId = EPISODE_CONTENT_DEFINITION_ID;
        }
        else
        {
            contentId = JSON.parse(req.body.updateVideoSelect).id;
            contentDefinitionId = VIDEO_CONTENT_DEFINITION_ID;
        }

        const UPDATE_INFO = await NomadSDK.getContent(contentId, contentDefinitionId);

        let videoId = null;
        if (MAIN_VIDEO)
        {
            await NomadSDK.deleteAsset(UPDATE_INFO.properties.mainVideo.id);

            videoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);
        }

        let thumbnailId = null;
        if (THUMBNAIL)
        {
            await NomadSDK.deleteAsset(UPDATE_INFO.properties.thumbnailImage.id);

            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);

            UPDATE_INFO.properties.thumbnailImage.id = UPLOAD_THUMBNAIL_ID;
        }

        if (req.body.updateMediaTypeSelect === "episode")
        {
            await NomadSDK.updateContent(contentId, EPISODE_CONTENT_DEFINITION_ID,
                {
                    contentRatings: contentRatings,
                    disabled: req.body.disabledSelect === "true",
                    duration: req.body.duration,
                    featuredGroups: featuredGroups,
                    groupSequence: req.body.groupSequence,
                    mainVideo: videoId ? { id : videoId } : (UPDATE_INFO.properties.mainVideo ? { id : UPDATE_INFO.properties.mainVideo.id } : null),
                    number: req.body.number,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    performers: performers,
                    series: SERIES,
                    season: SEASON,
                    shortDescription: req.body.shortDescription,
                    sortNumber: req.body.sortNumber,
                    tags: tags,
                    thumbnailImage: thumbnailId ? { id : thumbnailId } : (UPDATE_INFO.properties.thumbnailImage ? { id : UPDATE_INFO.properties.thumbnailImage.id } : null),
                    title: req.body.title
                });

            res.status(200).json();
        }
        else
        {
            await NomadSDK.updateContent(contentId, VIDEO_CONTENT_DEFINITION_ID, 
                {
                    contentRatings: contentRatings,
                    disabled: req.body.disabledSelect === "true",
                    featuredGroups: featuredGroups,
                    genres: genres,
                    groupSequence: req.body.groupSequence,
                    languages: languages,
                    longDescription: req.body.longDescription,
                    mainVideo: { "id": UPDATE_INFO.properties.mainVideo.id },
                    mediaAttributes: mediaAttributes,
                    performers: performers,
                    primaryPerformer: PRIMARY_PERFORMER,
                    shortDescription: req.body.shortDescription,
                    tags: tags,
                    thumbnailImage: { "id": UPDATE_INFO.properties.thumbnailImage.id },
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

app.post('/deleteVideo', upload.none(), async (req, res) => {
    try
    {
        let contentId = null;
        let contentDefinitionId = null;
        if (req.body.deleteMediaTypeSelect === "episode")
        {
            contentId = JSON.parse(req.body.deleteEpisodeSelect).id;
            contentDefinitionId = EPISODE_CONTENT_DEFINITION_ID;
        }
        else
        {
            contentId = JSON.parse(req.body.deleteVideoSelect).id;
            contentDefinitionId = VIDEO_CONTENT_DEFINITION_ID;
        }

        const DELETE_INFO = await NomadSDK.getContent(contentId, contentDefinitionId);

        if (DELETE_INFO.properties.mainVideo) await NomadSDK.deleteAsset(DELETE_INFO.properties.mainVideo.id);
        if (DELETE_INFO.properties.thumbnailImage) await NomadSDK.deleteAsset(DELETE_INFO.properties.thumbnailImage.id);

        await NomadSDK.deleteContent(contentId, contentDefinitionId);

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.post('/createSeries', upload.fields([{ name: "createSeriesTitleIconFile" }, { name: "createSeriesThumbnailFile" }]), async (req, res) => {
    try
    {
        const SERIES_TITLE_ICON = req.files["createSeriesTitleIconFile"] ? req.files["createSeriesTitleIconFile"][0] : null;
        const SERIES_THUMBNAIL = req.files["createSeriesThumbnailFile"] ? req.files["createSeriesThumbnailFile"][0] : null;

        let contentRatings = null;
        if (req.body.createSeriesContentRatingsSelect)
        {
            const PARSED_CONTENT_RATINGS = JSON.parse(req.body.createSeriesContentRatingsSelect);
            contentRatings = Array.isArray(PARSED_CONTENT_RATINGS) ? PARSED_CONTENT_RATINGS : [PARSED_CONTENT_RATINGS];
        }

        let featuredGroups = null;
        if (req.body.createSeriesFeaturedGroupsSelect)
        {
            const PARSED_FEATURED_GROUP = JSON.parse(req.body.createSeriesFeaturedGroupsSelect);
            featuredGroups = Array.isArray(PARSED_FEATURED_GROUP) ? PARSED_FEATURED_GROUP : [PARSED_FEATURED_GROUP];
        }

        let genres = null;
        if (req.body.createSeriesGenresSelect)
        {
            const PARSED_GENRES = JSON.parse(req.body.createSeriesGenresSelect);
            genres = Array.isArray(PARSED_GENRES) ? PARSED_GENRES : [PARSED_GENRES];
        }
        
        let mediaAttributes = null;
        if (req.body.createSeriesMediaAttributesSelect)
        {
            const PARSED_MEDIA_ATTRIBUTES = JSON.parse(req.body.createSeriesMediaAttributesSelect);
            mediaAttributes = Array.isArray(PARSED_MEDIA_ATTRIBUTES) ? PARSED_MEDIA_ATTRIBUTES : [PARSED_MEDIA_ATTRIBUTES];
        }

        let performers = null;
        if (req.body.createSeriesPerformersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.createSeriesPerformersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        let relatedSeries = null;
        if (req.body.createSeriesRelatedSeriesSelect)
        {
            const PARSED_RELATED_SERIES = JSON.parse(req.body.createSeriesRelatedSeriesSelect);
            relatedSeries = Array.isArray(PARSED_RELATED_SERIES) ? PARSED_RELATED_SERIES : [PARSED_RELATED_SERIES];
        }

        const SERIES_INFO = await NomadSDK.createContent(SERIES_CONTENT_DEFINITION_ID);
        await NomadSDK.updateContent(SERIES_INFO.contentId, SERIES_CONTENT_DEFINITION_ID,
            {
                contentRatings: contentRatings,
                disabled: req.body.isDisabledSelect === "true",
                featuredGroups: featuredGroups,
                genres: genres,
                longDescription: req.body.description,
                mediaAttributes: mediaAttributes,
                name: req.body.name,
                performers: performers,
                relatedSeries: relatedSeries,
                shortDescription: req.body.createSeriesShortDescription,
                thumbnailImage: SERIES_THUMBNAIL ? { "id": await NomadSDK.uploadAsset(null, null, null, "replace",
                    SERIES_THUMBNAIL, PARENT_FOLDER_ASSET_ID, null) } : null,
                titleIcon: SERIES_TITLE_ICON ? { "id": await NomadSDK.uploadAsset(null, null, null, "replace",
                    SERIES_TITLE_ICON, PARENT_FOLDER_ASSET_ID, null) } : null
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.post('/updateSeries', upload.fields([{ name: "updateSeriesTitleIconFile" }, { name: "updateSeriesThumbnailFile" }]), async (req, res) => {
    try
    {
        const SERIES_TITLE_ICON = req.files["updateSeriesTitleIconFile"] ? req.files["updateSeriesTitleIconFile"][0] : null;
        const SERIES_THUMBNAIL = req.files["updateSeriesThumbnailFile"] ? req.files["updateSeriesThumbnailFile"][0] : null;

        let contentRatings = null;
        if (req.body.updateContentRatingsSelect)
        {
            const PARSED_CONTENT_RATINGS = JSON.parse(req.body.updateContentRatingsSelect);
            contentRatings = Array.isArray(PARSED_CONTENT_RATINGS) ? PARSED_CONTENT_RATINGS : [PARSED_CONTENT_RATINGS];
        }

        let featuredGroups = null;
        if (req.body.updateFeaturedGroupsSelect)
        {
            const PARSED_FEATURED_GROUP = JSON.parse(req.body.updateFeaturedGroupsSelect);
            featuredGroups = Array.isArray(PARSED_FEATURED_GROUP) ? PARSED_FEATURED_GROUP : [PARSED_FEATURED_GROUP];
        }

        let genres = null;
        if (req.body.updateGenresSelect)
        {
            const PARSED_GENRES = JSON.parse(req.body.updateGenresSelect);
            genres = Array.isArray(PARSED_GENRES) ? PARSED_GENRES : [PARSED_GENRES];
        }
        
        let mediaAttributes = null;
        if (req.body.updateMediaAttributesSelect)
        {
            const PARSED_MEDIA_ATTRIBUTES = JSON.parse(req.body.updateMediaAttributesSelect);
            mediaAttributes = Array.isArray(PARSED_MEDIA_ATTRIBUTES) ? PARSED_MEDIA_ATTRIBUTES : [PARSED_MEDIA_ATTRIBUTES];
        }

        let performers = null;
        if (req.body.updatePerformersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.updatePerformersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        let relatedSeries = null;
        if (req.body.updateRelatedSeriesSelect)
        {
            const PARSED_RELATED_SERIES = JSON.parse(req.body.updateRelatedSeriesSelect);
            relatedSeries = Array.isArray(PARSED_RELATED_SERIES) ? PARSED_RELATED_SERIES : [PARSED_RELATED_SERIES];
        }

        const SERIES_INFO = await NomadSDK.getContent(JSON.parse(req.body.updateSeriesSelect).id, SERIES_CONTENT_DEFINITION_ID);
        await NomadSDK.updateContent(SERIES_INFO.contentId, SERIES_CONTENT_DEFINITION_ID,
            {
                contentRatings: contentRatings,
                disabled: req.body.isDisabledSelect === "true",
                featuredGroups: featuredGroups,
                genres: genres,
                longDescription: req.body.description,
                mediaAttributes: mediaAttributes,
                name: JSON.parse(req.body.updateSeriesSelect).description,
                performers: performers,
                relatedSeries: relatedSeries,
                shortDescription: req.body.updateSeriesShortDescription,
                thumbnailImage: SERIES_THUMBNAIL ? { "id": await NomadSDK.uploadAsset(null, null, null, "replace",
                    SERIES_THUMBNAIL, PARENT_FOLDER_ASSET_ID, null) } : (SERIES_INFO.properties.thumbnailImage ? { "id": SERIES_INFO.properties.thumbnailImage.id } : null),
                titleIcon: SERIES_TITLE_ICON ? { "id": await NomadSDK.uploadAsset(null, null, null, "replace",
                    SERIES_TITLE_ICON, PARENT_FOLDER_ASSET_ID, null) } : (SERIES_INFO.properties.titleIcon ? { "id": SERIES_INFO.properties.titleIcon.id } : null)
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.post('/deleteSeries', upload.none(), async (req, res) => {
    try
    {
        const SERIES_INFO = await NomadSDK.getContent(JSON.parse(req.body.deleteSeriesSelect).id, SERIES_CONTENT_DEFINITION_ID);

        if (SERIES_INFO.properties.titleIcon) await NomadSDK.deleteAsset(SERIES_INFO.properties.titleIcon.id);
        if (SERIES_INFO.properties.thumbnailImage) await NomadSDK.deleteAsset(SERIES_INFO.properties.thumbnailImage.id);

        await NomadSDK.deleteContent(SERIES_INFO.contentId, SERIES_CONTENT_DEFINITION_ID);

        res.status(200).json();
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

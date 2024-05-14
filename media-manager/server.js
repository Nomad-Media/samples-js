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

import NomadMediaSDK from "@nomad-media/full";
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

app.post('/createEpisode', upload.fields([{ name: "mainVideo" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let languages = null;
        if (req.body.languagesSelect)
        {
            const PARSED_LANGUAGES = JSON.parse(req.body.languagesSelect);
            languages = Array.isArray(PARSED_LANGUAGES) ? PARSED_LANGUAGES : [PARSED_LANGUAGES];
        }

        let performers = null;
        if (req.body.performersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.performersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        const SEASON = req.body.seasonSelect ? JSON.parse(req.body.seasonSelect) : null;

        const SERIES = req.body.seriesSelect ? JSON.parse(req.body.seriesSelect) : null;

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }
        
        let videoId = null;
        if (MAIN_VIDEO)
        {
            videoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);

        }

        let thumbnailId = null;
        if (THUMBNAIL)
        {
            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }

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
                thumbnailImage: thumbnailId ? { "id": thumbnailId } : null,
                title: req.body.title
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.post('/createVideo', upload.fields([{ name: "mainVideo" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const VIDEO_TYPE_SELECT = req.body.videoTypeSelect ? JSON.parse(req.body.videoTypeSelect) : null;
        
        let videoId = null;
        if (MAIN_VIDEO)
        {
            videoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);

        }

        let thumbnailId = null;
        if (THUMBNAIL)
        {
            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }
 
        const VIDEO = await NomadSDK.createContent(VIDEO_CONTENT_DEFINITION_ID);
        await NomadSDK.updateContent(VIDEO.contentId, VIDEO_CONTENT_DEFINITION_ID, 
            {
                contentRatings: contentRatings,
                featuredGroups: featuredGroups,
                genres: genres,
                groupSequence: req.body.groupSequence,
                languages: languages,
                longDescription: req.body.longDescription,
                mainVideo: videoId ? { "id": videoId } : null,
                mediaAttributes: mediaAttributes,
                performers: performers,
                primaryPerformer: PRIMARY_PERFORMER,
                shortDescription: req.body.shortDescription,
                tags: tags,
                thumbnailImage: thumbnailId ? { "id": thumbnailId } : null,
                title: req.body.title,
                videoType: VIDEO_TYPE_SELECT
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.post('/createSeries', upload.fields([{ name: "titleIcon" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const SERIES_TITLE_ICON = req.files["titleIcon"] ? req.files["titleIcon"][0] : null;
        const SERIES_THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let relatedSeries = null;
        if (req.body.relatedSeriesSelect)
        {
            const PARSED_RELATED_SERIES = JSON.parse(req.body.relatedSeriesSelect);
            relatedSeries = Array.isArray(PARSED_RELATED_SERIES) ? PARSED_RELATED_SERIES : [PARSED_RELATED_SERIES];
        }

        let thumbnailId = null;
        if (SERIES_THUMBNAIL)
        {
            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                SERIES_THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }

        let titleIconId = null;
        if (SERIES_TITLE_ICON)
        {
            titleIconId = await NomadSDK.uploadAsset(null, null, null, "replace",
                SERIES_TITLE_ICON, PARENT_FOLDER_ASSET_ID, null);
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
                shortDescription: req.body.shortDescription,
                thumbnailImage: SERIES_THUMBNAIL ? { "id": thumbnailId } : null,
                titleIcon: SERIES_TITLE_ICON ? { "id": titleIconId } : null
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.post('/updateEpisode', upload.fields([{ name: "mainVideo" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let languages = null;
        if (req.body.languagesSelect)
        {
            const PARSED_LANGUAGES = JSON.parse(req.body.languagesSelect);
            languages = Array.isArray(PARSED_LANGUAGES) ? PARSED_LANGUAGES : [PARSED_LANGUAGES];
        }

        let performers = null;
        if (req.body.performersSelect)
        {
            const PARSED_PERFORMERS = JSON.parse(req.body.performersSelect);
            performers = Array.isArray(PARSED_PERFORMERS) ? PARSED_PERFORMERS : [PARSED_PERFORMERS];
        }

        const SEASON = req.body.seasonSelect ? JSON.parse(req.body.seasonSelect) : null;

        const SERIES = req.body.seriesSelect ? JSON.parse(req.body.seriesSelect) : null;

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const UPDATE_EPISODE_INFO = await NomadSDK.getContent(req.body.id, EPISODE_CONTENT_DEFINITION_ID);

        let videoId = null;
        if (MAIN_VIDEO)
        {
            if (UPDATE_EPISODE_INFO.properties.mainVideo)
            {
                try
                {
                    await NomadSDK.deleteAsset(UPDATE_EPISODE_INFO.properties.mainVideo.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            videoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);
        }

        let thumbnailId = null;
        if (THUMBNAIL)
        {
            if (UPDATE_EPISODE_INFO.properties.thumbnailImage)
            {
                try
                {
                    await NomadSDK.deleteAsset(UPDATE_EPISODE_INFO.properties.thumbnailImage.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }

        await NomadSDK.updateContent(req.body.id, EPISODE_CONTENT_DEFINITION_ID,
            {
                contentRatings: contentRatings,
                disabled: req.body.disabledSelect === "true",
                duration: req.body.duration,
                featuredGroups: featuredGroups,
                groupSequence: req.body.groupSequence,
                mainVideo: videoId ? { id : videoId } : null,
                number: req.body.number,
                languages: languages,
                longDescription: req.body.longDescription,
                performers: performers,
                series: SERIES,
                season: SEASON,
                shortDescription: req.body.shortDescription,
                sortNumber: req.body.sortNumber,
                tags: tags,
                thumbnailImage: thumbnailId ? { id : thumbnailId } : null,
                title: req.body.title
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.post('/updateVideo', upload.fields([{ name: "mainVideo" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const MAIN_VIDEO = req.files["mainVideo"] ? req.files["mainVideo"][0] : null;
        const THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const VIDEO_TYPE_SELECT = req.body.videoTypeSelect ? JSON.parse(req.body.videoTypeSelect) : null;

        const UPDATE_VIDEO_INFO = await NomadSDK.getContent(req.body.id, VIDEO_CONTENT_DEFINITION_ID);

        let videoId = null;
        if (MAIN_VIDEO)
        {
            if (UPDATE_VIDEO_INFO.properties.mainVideo)
            {
                try
                {
                    await NomadSDK.deleteAsset(UPDATE_VIDEO_INFO.properties.mainVideo.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            videoId = await NomadSDK.uploadAsset(null, null, null, "replace",
                MAIN_VIDEO, PARENT_FOLDER_ASSET_ID, null);
        }

        let thumbnailId = null;
        if (THUMBNAIL)
        {
            if (UPDATE_VIDEO_INFO.properties.thumbnailImage)
            {
                try
                {
                    await NomadSDK.deleteAsset(UPDATE_VIDEO_INFO.properties.thumbnailImage.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }
        
        await NomadSDK.updateContent(req.body.id, VIDEO_CONTENT_DEFINITION_ID, 
            {
                contentRatings: contentRatings,
                disabled: req.body.disabledSelect === "true",
                featuredGroups: featuredGroups,
                genres: genres,
                groupSequence: req.body.groupSequence,
                languages: languages,
                longDescription: req.body.longDescription,
                mainVideo: videoId ? { "id": videoId } : null,
                mediaAttributes: mediaAttributes,
                performers: performers,
                primaryPerformer: PRIMARY_PERFORMER,
                shortDescription: req.body.shortDescription,
                tags: tags,
                thumbnailImage: thumbnailId ? { "id": thumbnailId }: null,
                title: req.body.title,
                videoType: VIDEO_TYPE_SELECT
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});


app.post('/updateSeries', upload.fields([{ name: "titleIcon" }, { name: "thumbnailImage" }]), async (req, res) => {
    try
    {
        const SERIES_TITLE_ICON = req.files["titleIcon"] ? req.files["titleIcon"][0] : null;
        const SERIES_THUMBNAIL = req.files["thumbnailImage"] ? req.files["thumbnailImage"][0] : null;

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

        let relatedSeries = null;
        if (req.body.relatedSeriesSelect)
        {
            const PARSED_RELATED_SERIES = JSON.parse(req.body.relatedSeriesSelect);
            relatedSeries = Array.isArray(PARSED_RELATED_SERIES) ? PARSED_RELATED_SERIES : [PARSED_RELATED_SERIES];
        }

        const SERIES_INFO = await NomadSDK.getContent(req.body.id, SERIES_CONTENT_DEFINITION_ID);

        let titleIconId = null;
        if (SERIES_TITLE_ICON)
        {
            if (SERIES_INFO.properties.titleIcon)
            {
                try
                {
                    await NomadSDK.deleteAsset(SERIES_INFO.properties.titleIcon.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            titleIconId = await NomadSDK.uploadAsset(null, null, null, "replace",
                SERIES_TITLE_ICON, PARENT_FOLDER_ASSET_ID, null);
        }

        let thumbnailId = null;
        if (SERIES_THUMBNAIL)
        {
            if (SERIES_INFO.properties.thumbnailImage)
            {
                try
                {
                    await NomadSDK.deleteAsset(SERIES_INFO.properties.thumbnailImage.id);
                }
                catch
                {
                    console.log("Asset in content doesn't exist");
                }
            }

            thumbnailId = await NomadSDK.uploadAsset(null, null, null, "replace",
                SERIES_THUMBNAIL, PARENT_FOLDER_ASSET_ID, null);
        }

        await NomadSDK.updateContent(SERIES_INFO.contentId, SERIES_CONTENT_DEFINITION_ID,
            {
                contentRatings: contentRatings,
                featuredGroups: featuredGroups,
                genres: genres,
                longDescription: req.body.description,
                mediaAttributes: mediaAttributes,
                name: req.body.name,
                performers: performers,
                relatedSeries: relatedSeries,
                shortDescription: req.body.shortDescription,
                thumbnailImage: thumbnailId ? { "id": thumbnailId } : null,
                titleIcon: titleIconId ? { "id": titleIconId } : null
            });

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.post('/deleteMedia', upload.none(), async (req, res) => {
    try
    {
        await NomadSDK.deleteContent(req.body.id, req.body.contentDefinitionId);

        res.status(200).json();
    }
    catch (error)
    {
        res.status(500).json({ error: error.stack });
    }
});

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
});

// Gets all the contents from a content definition
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

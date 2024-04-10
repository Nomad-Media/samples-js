const COLLECTION_CONTENT_DEFINITION_ID = "20352932-05d2-4a7a-8821-06fcf4438ced";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";

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
	res.sendFile(__dirname + '/public/media-builder.html');
});

app.get('/get-collections-list', upload.none(), async (req, res) =>
{
    try
    {
        const COLLECTIONS_LIST = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);

        res.status(200).json(COLLECTIONS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-related-content-list', upload.none(), async (req, res) =>
{
    try
    {
        const RELATED_CONTENT_LIST = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);

        res.status(200).json(RELATED_CONTENT_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-tags-list', upload.none(), async (req, res) =>
{
    try
    {
        const TAGS = await getGroups(TAG_CONTENT_DEFINITION_ID);

        res.status(200).json(TAGS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.createMediaBuilderCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.createMediaBuilderCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        const RELATED_CONTENT_IDS = req.body.relatedContentIds !== "" ? req.body.relatedContentIds.split(",") : null;

        let tags = null;
        if (req.body.createMediaBuilderTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.createMediaBuilderTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const PROPERTIES = {};

        if (req.body.key)
        {         
            if (typeof req.body.key === "string")
            {
                req.body.key = [req.body.key];
                req.body.value = [req.body.value];
            }   

            for (let propertyIdx = 0; propertyIdx < req.body.key.length; ++propertyIdx)
            {
                let value = req.body.value[propertyIdx];
                try
                {
                    value = JSON.parse(value);
                }
                catch (error){}

                PROPERTIES[req.body.key[propertyIdx]] = value;
            }
        }

        const MEDIA_BUILDER = await NomadSDK.createMediaBuilder(req.body.name, 
            req.body.destinationFolderId, collections, RELATED_CONTENT_IDS,
            tags, PROPERTIES);

        res.status(200).json(MEDIA_BUILDER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-media-builder-item', upload.none(), async (req, res) =>
{
    try
    {
        const RELATED_CONTENT_IDS = req.body.relatedContentIds !== "" ? req.body.relatedContentIds.split(",") : null;

        let sourceAssetId = null;
        let startTimeCode = null;
        let endTimeCode = null;
        let annotationId = null;

        if (req.body.sourceType === "asset")
        {
            sourceAssetId = req.body.sourceAssetId;
            startTimeCode = req.body.startTimeCode !== "" ? req.body.startTimeCode : null;
            endTimeCode = req.body.endTimeCode !== "" ? req.body.endTimeCode : null;
        }
        else if (req.body.sourceType === "annotation")
        {
            annotationId = req.body.annotationId;
        }

        const MEDIA_BUILDER_ITEM = await NomadSDK.createMediaBuilderItem(req.body.id,
            req.body.sourceAssetId, startTimeCode, endTimeCode, annotationId, RELATED_CONTENT_IDS);

        res.status(200).json(MEDIA_BUILDER_ITEM);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-media-builder-items-add-annotations', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_BUILDER_ITEMS = await NomadSDK.createMediaBuilderItemsAddAnnotations(
            req.body.mediaBuilderId, req.body.sourceAssetId);

        res.status(200).json(MEDIA_BUILDER_ITEMS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-media-builder-items-bulk', upload.none(), async (req, res) =>
{
    try
    {
        if (!("sourceAssetId" in req.body))
        {
            res.status(500).json({error: "sourceAssetId is required."});
            return;
        }

        const SOURCE_ASSET_IDS = Array.isArray(req.body.sourceAssetId) ? req.body.sourceAssetId : [req.body.sourceAssetId];
        const START_TIME_CODES = Array.isArray(req.body.startTimeCode) ? req.body.startTimeCode : [req.body.startTimeCode];
        const END_TIME_CODES = Array.isArray(req.body.endTimeCode) ? req.body.endTimeCode : [req.body.endTimeCode];
        const RELATED_CONTENTS = Array.isArray(req.body.relatedContentIds) ? req.body.relatedContentIds : [req.body.relatedContentIds];
    
        const MEDIA_BUILDER_ITEMS_INFO = [];

        for(let idx = 0; idx < SOURCE_ASSET_IDS.length; ++idx)
        {
            const MEDIA_BUILDER_ITEM_INFO = {}
            MEDIA_BUILDER_ITEM_INFO.sourceAssetId = SOURCE_ASSET_IDS[idx];
            MEDIA_BUILDER_ITEM_INFO.startTimeCode = START_TIME_CODES[idx] !== "" ? START_TIME_CODES[idx] : null;
            MEDIA_BUILDER_ITEM_INFO.endTimeCode = END_TIME_CODES[idx] !== "" ? END_TIME_CODES[idx] : null;
            MEDIA_BUILDER_ITEM_INFO.relatedContentIds = RELATED_CONTENTS[idx] !== "" ? RELATED_CONTENTS[idx].split(",") : null;

            MEDIA_BUILDER_ITEMS_INFO.push(MEDIA_BUILDER_ITEM_INFO);
        }

        const MEDIA_BUILDER_ITEMS = await NomadSDK.createMediaBuilderItemsBulk(req.body.mediaBuilderId, 
            MEDIA_BUILDER_ITEMS_INFO);

        res.status(200).json(MEDIA_BUILDER_ITEMS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteMediaBuilder(req.body.id);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-media-builder-item', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteMediaBuilderItem(req.body.id, req.body.itemid);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});        

app.post('/duplicate-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.duplicateMediaBuilderCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.duplicateMediaBuilderCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        const RELATED_CONTENT_IDS = req.body.relatedContentIds !== "" ? req.body.relatedContentIds.split(",") : null;

        const PROPERTIES = {};

        if (req.body.key)
        {         
            if (typeof req.body.key === "string")
            {
                req.body.key = [req.body.key];
                req.body.value = [req.body.value];
            }   

            for (let propertyIdx = 0; propertyIdx < req.body.key.length; ++propertyIdx)
            {
                let value = req.body.value[propertyIdx];
                try
                {
                    value = JSON.parse(value);
                }
                catch (error){}

                PROPERTIES[req.body.key[propertyIdx]] = value;
            }
        }

        const MEDIA_BUILDER = await NomadSDK.duplicateMediaBuilder(req.body.id, req.body.name, 
            req.body.destinationFolderId, collections, RELATED_CONTENT_IDS,
            PROPERTIES);

        res.status(200).json(MEDIA_BUILDER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_BUILDER = await NomadSDK.getMediaBuilder(req.body.id);

        res.status(200).json(MEDIA_BUILDER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});     

app.get('/get-media-builders', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_BUILDERS = await NomadSDK.getMediaBuilders();

        res.status(200).json(MEDIA_BUILDERS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-media-builder-ids-from-asset', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_BUILDER_IDS = await NomadSDK.getMediaBuilderIdsFromAsset(req.body.assetId);

        res.status(200).json(MEDIA_BUILDER_IDS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-media-builder-items', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_BUILDER_ITEMS = await NomadSDK.getMediaBuilderItems(req.body.id);

        res.status(200).json(MEDIA_BUILDER_ITEMS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/move-media-builder-item', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.moveMediaBuilderItem(req.body.id, req.body.itemId, req.body.previousItemId);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/render-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        const RENDER_MEDIA_BUILDER = await NomadSDK.renderMediaBuilder(req.body.id);

        res.status(200).json(RENDER_MEDIA_BUILDER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/update-media-builder', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.updateMediaBuilderCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.updateMediaBuilderCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        const RELATED_CONTENT_IDS = req.body.relatedContentIds !== "" ? req.body.relatedContentIds.split(",") : null;

        let tags = null;
        if (req.body.updateMediaBuilderTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.updateMediaBuilderTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const PROPERTIES = {};

        if (req.body.key)
        {         
            if (typeof req.body.key === "string")
            {
                req.body.key = [req.body.key];
                req.body.value = [req.body.value];
            }   

            for (let propertyIdx = 0; propertyIdx < req.body.key.length; ++propertyIdx)
            {
                let value = req.body.value[propertyIdx];
                try
                {
                    value = JSON.parse(value);
                }
                catch (error){}

                PROPERTIES[req.body.key[propertyIdx]] = value;
            }
        }

        const MEDIA_BUILDER = await NomadSDK.updateMediaBuilder(req.body.id, 
            req.body.name, req.body.destinationFolderId, collections, RELATED_CONTENT_IDS, 
            tags, PROPERTIES);

        res.status(200).json(MEDIA_BUILDER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
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
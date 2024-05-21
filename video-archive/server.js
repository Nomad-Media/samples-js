import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//import NomadMediaSDK from "@nomad-media/public";
import NomadMediaSDK from '@nomad-media/full';
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
	res.sendFile(__dirname + '/public/content-groups.html');
});

app.post('/search', upload.none(), async (req, res) => {
    try
    {
        const QUERY = req.body.query ? req.body.query : null;

        const SEARCH_RESULT = await NomadSDK.search(QUERY, null, null,
            [
                {
                    "fieldName": "contentDefinitionId",
                    "operator": "equals",
                    "values": "3ff29f61-bd0b-4c17-b855-49db5a292aeb"
                },
                {
                    "fieldName": "assetType",
                    "operator": "equals",
                    "values": 2 
                },
                {
                    "fieldName": "uuidSearchField",
                    "operator": "equals",
                    "values": "73d06e60-9607-4018-b666-775790c0f0c2"
                },
                {
                    "fieldName": "assetStatus",
                    "operator": "equals",
                    "values": [1, 2, 3, 4, 7, 8, 9, 11, 12, 14, 17]
                },
                {
                    "fieldName": "mediaType",
                    "operator": "equals",
                    "values": 2
                }
            ], 
            [
                {
                    "fieldName": req.body.sortBy,
                    "sortType": "descending"
                }
            ], null, null, null, true, null);
        //const SEARCH_RESULT = await NomadSDK.mediaSearch(req.body.query, null,
        //[
        //    {
        //        "fieldName": "score",
        //        "order": "descending"
        //    }
        //]);

        res.status(200).json(SEARCH_RESULT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/asset', upload.none(), async (req, res) => {
    try
    {
        const ASSET = await NomadSDK.getAssetDetails(req.body.assetId);
        res.status(200).json(ASSET);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getMediaItem', upload.none(), async (req, res) => {
    try
    {
        const MEDIA_ITEM = await NomadSDK.getMediaItem(req.body.id);
        res.status(200).json(MEDIA_ITEM);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
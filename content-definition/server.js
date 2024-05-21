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
	res.sendFile(__dirname + '/public/content-definition.html');
});

app.post('/getContentDefinition', upload.none(), async (req, res) => {
    try
    {
        const CONTENT_DEFINITION = await NomadSDK.getContentDefinition(req.body.contentDefinitionId);
        
        res.status(200).json(CONTENT_DEFINITION);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.post('/getContentDefinitions', upload.none(), async (req, res) => {
    try
    {
        const CONTENT_DEFINITIONS = await NomadSDK.getContentDefinitions(req.body.contentManagementType,
            req.body.sortColumn, req.body.isDescending === "true", req.body.pageIndex, req.body.pageSize);
        
        res.status(200).json(CONTENT_DEFINITIONS);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
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
	res.sendFile(__dirname + '/public/job.html');
});

app.post('/createJob', upload.none(), async (req, res) => {
    try
    {
        const response = await NomadSDK.createJob(req.body.bucketName, req.body.objectKey, req.body.notificationCallbackUrl,
            req.body.replaceExistingJob, req.body.requestedTasks, req.body.requestedTranscodeProfiles, req.body.externalId,
            req.body.assetUrl);

        return res.status(200).json(response);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
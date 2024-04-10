
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
	res.sendFile(__dirname + '/public/live-output-profile.html');
});

app.post('/get-live-output-profile', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.getLiveOutputProfile(req.body.id);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-live-output-profiles', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.getLiveOutputProfiles();
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-live-output-types', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.getLiveOutputTypes();
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-live-output-profile', upload.none(), async (req, res) => {
    try
    {
        let TYPE = JSON.parse(req.body.createLiveOutputTypeSelect);
        TYPE = TYPE.id === "" ? null : TYPE;

        let VIDEO_BITRATE_MODE = JSON.parse(req.body.videoBitrateMode);
        VIDEO_BITRATE_MODE = VIDEO_BITRATE_MODE.id === "" ? null : VIDEO_BITRATE_MODE;

        let VIDEO_CODEC = JSON.parse(req.body.videoCodec);
        VIDEO_CODEC = VIDEO_CODEC.id === "" ? null : VIDEO_CODEC;
        
        const RESPONSE = await NomadSDK.createLiveOutputProfile(req.body.name,
            TYPE, req.body.enabled === "true", req.body.audioBitrate, req.body.outputStreamKey,
            req.body.outputUrl, req.body.secondaryOutputKey, req.body.secondaryOutputUrl, 
            req.body.videoBitrate, VIDEO_BITRATE_MODE, VIDEO_CODEC, req.body.videoHeight, 
            req.body.videoWidth);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-live-output-profile', upload.none(), async (req, res) => {
    try
    {
        let TYPE = JSON.parse(req.body.updateLiveOutptuTypeSelect);
        TYPE = TYPE.id === "" ? null : TYPE;

        let VIDEO_BITRATE_MODE = JSON.parse(req.body.videoBitrateMode);
        VIDEO_BITRATE_MODE = VIDEO_BITRATE_MODE.id === "" ? null : VIDEO_BITRATE_MODE;

        let VIDEO_CODEC = JSON.parse(req.body.videoCodec);
        VIDEO_CODEC = VIDEO_CODEC.id === "" ? null : VIDEO_CODEC;
        
        const RESPONSE = await NomadSDK.updateLiveOutputProfile(req.body.id, req.body.name,
            TYPE, req.body.enabled === "true", req.body.audioBitrate, req.body.outputStreamKey,
            req.body.outputUrl, req.body.secondaryOutputKey, req.body.secondaryOutputUrl, 
            req.body.videoBitrate, VIDEO_BITRATE_MODE, VIDEO_CODEC, req.body.videoHeight, 
            req.body.videoWidth);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-live-output-profile', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.deleteLiveOutputProfile(req.body.id);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
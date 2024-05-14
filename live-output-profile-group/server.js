
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
	res.sendFile(__dirname + '/public/live-output-profile-group.html');
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

app.get('/get-live-output-profile-groups', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.getLiveOutputProfileGroups();
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-live-output-profile-group', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.getLiveOutputProfileGroup(req.body.id);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-live-output-profile-group', upload.none(), async (req, res) => {
    try
    {
        let TYPE = JSON.parse(req.body.createLiveOutputGroupOutputTypeSelect);
        TYPE = TYPE.id === "" ? null : TYPE;

        let ARCHIVE_OUTPUT_PROFILES = JSON.parse(req.body.createLiveOutputGroupArchiveLiveOutputProfileSelect);
        ARCHIVE_OUTPUT_PROFILES = ARCHIVE_OUTPUT_PROFILES.id === "" ? null : ARCHIVE_OUTPUT_PROFILES;

        let OUTPUT_PROFILES = JSON.parse(req.body.createLiveOutputGroupLiveOutputProfilesSelect);
        OUTPUT_PROFILES = OUTPUT_PROFILES.id === "" ? null : OUTPUT_PROFILES;
        
        const RESPONSE = await NomadSDK.createLiveOutputProfileGroup(req.body.name,
            req.body.isEnabled === "true", req.body.manifestType,
            req.body.isDefaultGroup === "true", TYPE, ARCHIVE_OUTPUT_PROFILES, 
            OUTPUT_PROFILES);
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

        let ARCHIVE_OUTPUT_PROFILES = JSON.parse(req.body.updateLiveOutputGroupArchiveLiveOutputProfileSelect);
        ARCHIVE_OUTPUT_PROFILES = ARCHIVE_OUTPUT_PROFILES.id === "" ? null : ARCHIVE_OUTPUT_PROFILES;

        let OUTPUT_PROFILES = JSON.parse(req.body.updateLiveOutputGroupLiveOutputProfilesSelect);
        OUTPUT_PROFILES = OUTPUT_PROFILES.id === "" ? null : OUTPUT_PROFILES;
        
        const RESPONSE = await NomadSDK.updateLiveOutputProfileGroup(req.body.id, req.body.name,
            req.body.isEnabled === "true", req.body.manifestType,
            req.body.isDefaultGroup === "true", TYPE, ARCHIVE_OUTPUT_PROFILES,
            OUTPUT_PROFILES);
        res.status(200).json(RESPONSE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-live-output-profile-group', upload.none(), async (req, res) => {
    try
    {
        const RESPONSE = await NomadSDK.deleteLiveOutputProfileGroup(req.body.id);
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
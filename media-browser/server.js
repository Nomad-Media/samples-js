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
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/videos', (req, res) => {
    res.sendFile(__dirname + '/public/contentDefinition.html');
});

app.get('/series', (req, res) => {
    res.sendFile(__dirname + '/public/contentDefinition.html');
});

app.get('/events', (req, res) => {
    res.sendFile(__dirname + '/public/contentDefinition.html');
});

app.get('/genres', (req, res) => {
    res.sendFile(__dirname + '/public/contentDefinition.html');
});

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/public/search.html');
});

app.get('/getConfig', upload.none(), async (req, res) => {
    try
    {
        const CONFIG = await NomadSDK.getDefaultSiteConfig();

        res.status(200).json(CONFIG);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getContent', upload.none(), async (req, res) =>
{
    try
    {
        const CONTENT = await NomadSDK.getDynamicContent(req.body.id);

        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getMediaGroup', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup(req.body.id);

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getMediaItem', upload.none(), async (req, res) =>
{
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

app.get('/getVideos', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup("content-definition-video-2247");

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getSeries', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup("content-definition-series-9c17");

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getEvents', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup("content-definition-event-412a");

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getGenres', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup("content-definition-genre-dbba");

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getSearch', upload.none(), async (req, res) =>
{
    try
    {
        const SEARCH_RESULTS = await NomadSDK.mediaSearch(req.body.search);

        res.status(200).json(SEARCH_RESULTS);
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
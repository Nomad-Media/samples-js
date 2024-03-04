const SERIES_CONTENT_DEFINITION_ID = "9c1713ce-006c-4dc7-afb6-028df1fb3bf3";
const EVENT_TYPE_CONTENT_DEFINITION_ID = "0ee492a3-7875-4288-8690-f9895a44cb43";
const EVENT_CONTENT_DEFINITION_ID = "412a30e3-73ee-4eae-b739-e1fc87601c7d";
const INPUT_CONTENT_DEFINITION_ID = "5ce6e254-01e9-44b8-9f20-4691140db3ce";
const EXTERNAL_OUTPUT_PROFILES_PATH = "lookup/33?lookupKey=99e8767a-00ba-4758-b9c2-e07b52c47021";
const DAYS_CONTENT_DEFINITION_ID = "fc8042c1-1ade-400d-b0aa-02937e658ae6"

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
	res.sendFile(__dirname + '/public/event-scheduler.html');
});

app.get('/get-event-list', upload.none(), async (req, res) =>
{
    try
    {
        const EVENT_LIST = await getGroups(EVENT_TYPE_CONTENT_DEFINITION_ID);

        res.status(200).json(EVENT_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});


app.get('/get-series-list', upload.none(), async (req, res) =>
{
    try
    {
        const RATING_LIST = await getGroups(SERIES_CONTENT_DEFINITION_ID);

        res.status(200).json(RATING_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-days-list', upload.none(), async (req, res) =>
{
    try
    {
        const DAYS_LIST = await getGroups(DAYS_CONTENT_DEFINITION_ID);

        res.status(200).json(DAYS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-event', upload.none(), async (req, res) => {
    try
    {
        const CONTENT_ID = req.body.createOrUpdateEventSelect === "update" ? req.body.contnetId : null;

        let name = null
        if (req.body.seriesSelect)
        {
            if (req.body.name === "")
                name = req.body.seriesSelect.description;
            else
                name = req.body.name;
        }
            
        const EVENT_TYPE = JSON.parse(req.body.eventTypeSelect);

        const SERIES = req.body.seriesSelect 
            ? JSON.parse(req.body.seriesSelect)
            : null;
            
        const PROPERTIES = {}

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

        const EVENT_ID = await NomadSDK.createAndUpdateEvent(
            CONTENT_ID, EVENT_CONTENT_DEFINITION_ID, name, 
            req.body.startDatetime, req.body.endDatetime, EVENT_TYPE, SERIES, 
            req.body.isDisabled === "true", req.body.overrideSeriesDetailsSelect === "true",
            PROPERTIES);
        
        res.status(200).json(EVENT_ID);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-livestream-input-list', upload.none(), async (req, res) =>
{
    try
    {
        const INPUT_LIST = await getGroups(INPUT_CONTENT_DEFINITION_ID);

        res.status(200).json(INPUT_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-external-output-profiles-list', upload.none(), async (req, res) =>
{
    try
    {
        const EXTERNAL_OUTPUT_PROFILES_LIST = await NomadSDK.miscFunctions(
            EXTERNAL_OUTPUT_PROFILES_PATH, "GET");

        res.status(200).json(EXTERNAL_OUTPUT_PROFILES_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});
    
app.post('/add-event', upload.none(), async (req, res) => 
{
    try
    {
        const SLATE_VIDEO = req.body.slateVideoId === ""
            ? null : { id: req.body.slateVideoId, description: req.body.slateVideoName };
        const PREROLL_VIDEO = req.body.prerollVideoId === ""
            ? null : { id: req.body.prerollVideoId, description: req.body.prerollVideoName };
        const POSTROLL_VIDEO = req.body.postrollVideoId === ""
            ? null : { id: req.body.postrollVideoId, description: req.body.postrollVideoName };
        const ARCHIVE_FOLDER = req.body.archiveFolderId === ""
            ? null : { id: req.body.archiveFolderId, description: req.body.archiveFolderName };
        const PRIMARY_LIVESTREAM_INPUT = req.body.primaryLivestreamInputSelect === undefined
            ? null : JSON.parse(req.body.primaryLivestreamInputSelect);
        const BACKUP_LIVESTREAM_INPUT_SELECT = req.body.backupLivestreamInputSelect === undefined
            ? null : JSON.parse(req.body.backupLivestreamInputSelect);
        const EXTERNAL_OUTPUT_PROFILES = req.body.externalOutputProfilesSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.externalOutputProfilesSelect))
            ? JSON.parse(req.body.externalOutputProfilesSelect) : [JSON.parse(req.body.externalOutputProfilesSelect)];

        await NomadSDK.addLiveScheduleToEvent(req.body.addEventId, SLATE_VIDEO, PREROLL_VIDEO, 
            POSTROLL_VIDEO, req.body.isSecureOutput === "true", ARCHIVE_FOLDER, 
            PRIMARY_LIVESTREAM_INPUT, BACKUP_LIVESTREAM_INPUT_SELECT, 
            req.body.primaryLivesteamInputUrl, req.body.backupLivestreamInputUrl, 
            EXTERNAL_OUTPUT_PROFILES);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/extend-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.extendLiveSchedule(req.body.extendEventId, 
            JSON.parse(req.body.daysOfTheWeekSelect), 
            req.body.recurringWeeks, req.body.endDatetime, req.body.timeZoneOffsetSeconds);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-event', upload.none(), async (req, res) =>
{
    try
    {
        const EVENT_INFO = await NomadSDK.getLiveSchedule(req.body.getEventId);

        res.status(200).json(EVENT_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/start-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.startLiveSchedule(req.body.startEventId);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/stop-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.stopLiveSchedule(req.body.stopEventId);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-event', upload.none(), async (req, res) => 
{
    try
    {
        await NomadSDK.deleteEvent(req.body.deleteId, 
            req.body.deleteContentDefinitionId);
        
        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
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
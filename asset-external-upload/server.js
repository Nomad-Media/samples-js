const LANGUAGE_CONTENT_DEFINITION_ID = "e4b10c04-1878-4830-a115-e42d52705059";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";

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
	res.sendFile(__dirname + '/public/asset-external-upload.html');
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

app.post('/create-placeholder', upload.single('file'), async (req, res) => {
    try
    {
        const PLACEHOLDER_INFO = await NomadSDK.createPlaceholderAsset(req.body.parentDirectoryId, req.body.assetName);

        let tags = null;
        if (req.body.tagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.tagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        await NomadSDK.uploadAsset(req.body.assetName, PLACEHOLDER_INFO.id, null, "replace",
            req.file, req.body.parentDirectoryId, req.body.languageId);

        await NomadSDK.bulkUpdateMetadata([PLACEHOLDER_INFO.id], null, null, tags.map(item => item.id));

        res.status(200).json(PLACEHOLDER_INFO.id);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
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

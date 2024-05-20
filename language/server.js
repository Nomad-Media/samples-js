const LANGUAGE_CONTENT_DEFINITION_ID = "e4b10c04-1878-4830-a115-e42d52705059";

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
	res.sendFile(__dirname + '/public/language.html');
});

app.get('/getLanguages', async (req, res) => {
    try
    {
        const LANGUAGES = [];
        let offset = 0;
        while (true)
        {
            const SEARCH_INFO = await NomadSDK.search(null, offset, null, 
                [
                    {
                        fieldName: "contentDefinitionId",
                        operator: "Equals",
                        values: LANGUAGE_CONTENT_DEFINITION_ID,
                    },
                    {
                        fieldName: "languageId",
                        operator: "Equals",
                        values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                    },
                    {
                        fieldName: "active",
                        operator: "Equals",
                        values: true
                    }
                ], null, null, null, null, true, null);

            if (!SEARCH_INFO) return [];
            LANGUAGES.push(...SEARCH_INFO.items);

            ++offset;

            if (SEARCH_INFO.items.length < 100) break;
        }
        return res.status(200).json(LANGUAGES);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/getProperties', upload.none(), async (req, res) => {
    try
    {
        const CONTENT_DEFINITION_ID = req.body.contentDefinitionId;

        const PROPERTIES = await NomadSDK.getContentDefinition(CONTENT_DEFINITION_ID);
        return res.status(200).json(PROPERTIES);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/getContents', upload.none(), async (req, res) => {
    try
    {
        const CONTENT_DEFINITION_ID = req.body.contentDefinitionId;
        const LANGUAGE_ID = req.body.languageId;

        const CONTENTS = [];
        let offset = 0;

        while (true)
        {
            const SEARCH_INFO = await NomadSDK.search(null, offset, null, 
                [
                    {
                        fieldName: "contentDefinitionId",
                        operator: "Equals",
                        values: CONTENT_DEFINITION_ID,
                    },
                    {
                        fieldName: "languageId",
                        operator: "Equals",
                        values: LANGUAGE_ID
                    }
                ], null, null, null, null, true, null);

            if (!SEARCH_INFO || SEARCH_INFO.items.length === 0) break;
            CONTENTS.push(...SEARCH_INFO.items);

            ++offset;

            if (SEARCH_INFO.items.length < 100) break;
        }

        return res.status(200).json(CONTENTS);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/getContentData', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.getContent(req.body.contentId, req.body.contentDefinitionId);
        return res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/createContent', upload.none(), async (req, res) => {
    try
    {
        console.log(req.body);
        const PROPERTIES = {};
        const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

        for (const KEY in req.body)
        {
            let keyData = checkString(req.body[KEY]);
            req.body[KEY] = keyData;

            if (KEY.includes("createContent"))
            {
                let correctedKey = KEY.replace("createContent", "");
                correctedKey = correctedKey.charAt(0).toLowerCase() + correctedKey.slice(1);
                req.body[correctedKey] = typeof keyData === "string" ? keyData : keyData.id;
                delete req.body[KEY];
            }
            else
            {
                if (typeof keyData === "string" && GUID_REGEX.test(keyData))
                {
                    try
                    {
                        const ASSET_DATA = await NomadSDK.getAsset(keyData);
                        keyData = {"id": keyData, "description": ASSET_DATA.displayName};
                    }
                    catch (error)
                    {
                        console.error(`The asset with the ID ${keyData} does not exist.`);
                        keyData = {"id": keyData};
                    }
                }

                PROPERTIES[KEY] = keyData;
                delete req.body[KEY];
            }
        }

        req.body.properties = PROPERTIES;
        console.log(req.body.properties);

        const ID = await NomadSDK.updateContent(req.body.masterId, req.body.contentDefinitionId, req.body.properties, req.body.language);

        return res.status(200).json(ID);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/getContent', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.search(null, 0, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: req.body.contentDefinitionId,
                },
                {
                    fieldName: "masterId",
                    operator: "Equals",
                    values: req.body.masterId
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: JSON.parse(req.body.getContentLanguage).id
                }
            ], null, null, null, null, null, null);
        console.log(JSON.stringify(CONTENT, null, 4));
        return res.status(200).json(CONTENT.items[0]);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/updateContent', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.search(null, 0, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: req.body.contentDefinitionId,
                },
                {
                    fieldName: "masterId",
                    operator: "Equals",
                    values: req.body.masterId
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: JSON.parse(req.body.updateContentLanguage).id
                }
            ], null, null, null, null, null, null);

        const CONTENT_ID = CONTENT.items[0].id;

        const PROPERTIES = {};
        const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

        for (const KEY in req.body)
        {
            let keyData = checkString(req.body[KEY]);
            req.body[KEY] = keyData;

            if (KEY.includes("updateContent"))
            {
                let correctedKey = KEY.replace("updateContent", "");
                correctedKey = correctedKey.charAt(0).toLowerCase() + correctedKey.slice(1);
                req.body[correctedKey] = typeof keyData === "string" ? keyData : keyData.id;
                delete req.body[KEY];
            }
            else
            {
                if (typeof keyData === "string" && GUID_REGEX.test(keyData))
                {
                    try
                    {
                        const ASSET_DATA = await NomadSDK.getAsset(keyData);
                        keyData = {"id": keyData, "description": ASSET_DATA.displayName};
                    }
                    catch (error)
                    {
                        console.error(`The asset with the ID ${keyData} does not exist.`);
                        keyData = {"id": keyData};
                    }
                }

                PROPERTIES[KEY] = keyData;
                delete req.body[KEY];
            }
        }

        req.body.properties = PROPERTIES;

        await NomadSDK.updateContent(CONTENT_ID, req.body.contentDefinitionId, req.body.properties, req.body.language);

        return res.status(200).json(CONTENT_ID);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

app.post('/deleteContent', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.search(null, 0, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: req.body.contentDefinitionId,
                },
                {
                    fieldName: "masterId",
                    operator: "Equals",
                    values: req.body.masterId
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: JSON.parse(req.body.deleteContentLanguage).id
                }
            ], null, null, null, null, null, null);

        const CONTENT_ID = CONTENT.items[0].id;

        await NomadSDK.deleteContent(CONTENT_ID, req.body.contentDefinitionId);
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

function checkString(str)
{
    try
    {
        return JSON.parse(str);
    }
    catch (error)
    {
        return str;
    }
}

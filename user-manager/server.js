const COUNTRY_CONTENT_DEFINITION_ID = "ed1edc64-21a5-413e-8cf6-a21285d51e7f";
const SECURITY_GROUP_CONTENT_DEFINITION_ID = "5a91bebb-05c5-4e11-ab8d-48f5a6dd93c0";
const STATE_CONTENT_DEFINITION_ID = "066fa41a-ec24-486c-81fd-a43085064870";
const SYSTEM_ROLE_CONTENT_DEFINITION_ID = "0c32db1f-35ab-41ce-b6b6-5d87e8ae478b";
const USER_CONTENT_DEFINITION_ID = "b42cb50a-1664-4b68-a8f8-2272b9b13e7c";
const USER_STATUS_CONTENT_DEFINITION_ID = "7cd8e9e6-4bd4-471b-906a-965b2ab0e9aa";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "@nomad-media/full";
import config from "./config.js";
const NomadSDK = new NomadMediaSDK(config);

import express from 'express';
import multer from 'multer';
import { get } from 'http';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/user-manager.html');
});

app.get('/getCountries', async (req, res) => {
    try
    {
        const COUNTRIES = await getGroups(COUNTRY_CONTENT_DEFINITION_ID);

        res.status(200).json(COUNTRIES);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/getSecurityGroups', async (req, res) => {
    try
    {
        const SECURITY_GROUPS = await getGroups(SECURITY_GROUP_CONTENT_DEFINITION_ID);

        res.status(200).json(SECURITY_GROUPS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/getStates', async (req, res) => {
    try
    {
        const STATES = await getGroups(STATE_CONTENT_DEFINITION_ID);

        res.status(200).json(STATES);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/getSystemRoles', async (req, res) => {
    try
    {
        const SYSTEM_ROLES = await getGroups(SYSTEM_ROLE_CONTENT_DEFINITION_ID);

        res.status(200).json(SYSTEM_ROLES);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/getUserStatuses', async (req, res) => {
    try
    {
        const USER_STATUSES = await getGroups(USER_STATUS_CONTENT_DEFINITION_ID);

        res.status(200).json(USER_STATUSES);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/createUser', upload.none(), async (req, res) => {
    try
    {
        const USER_STATUS = JSON.parse(req.body.createUserStatus);
        const STATE = JSON.parse(req.body.createState);
        const COUNTRY = JSON.parse(req.body.createCountry);
        const SYSTEM_ROLE = JSON.parse(req.body.createSystemRole);

        let securityGroup = null;
        if (req.body.createSecurityGroup)
        {
            securityGroup = JSON.parse(req.body.createSecurityGroup);
            securityGroup = Array.isArray ? securityGroup : [securityGroup];
        }

        const USER_ID = await NomadSDK.createContent(USER_CONTENT_DEFINITION_ID);
    
        const PROPERTIES = {
            status: USER_STATUS,
            stateId: STATE,
            country: COUNTRY,
            role: SYSTEM_ROLE
        };

        if (req.body.firstName) PROPERTIES.firstName = req.body.firstName;
        if (req.body.lastName) PROPERTIES.lastName = req.body.lastName;
        if (req.body.email) PROPERTIES.email = req.body.email;
        if (req.body.organization) PROPERTIES.organization = req.body.organization;
        if (req.body.title) PROPERTIES.title = req.body.title;
        if (req.body.phone) PROPERTIES.phone = req.body.phone;
        if (req.body.phoneExt) PROPERTIES.phoneExt = req.body.phoneExt;
        if (req.body.mobilePhone) PROPERTIES.mobilePhone = req.body.mobilePhone;
        if (req.body.address) PROPERTIES.address = req.body.address;
        if (req.body.address2) PROPERTIES.address2 = req.body.address2;
        if (req.body.city) PROPERTIES.city = req.body.city;
        if (req.body.postalCode) PROPERTIES.postalCode = req.body.postalCode;
        if (securityGroup) PROPERTIES.assignedSecurityGroups = securityGroup;

        const USER_INFO = await NomadSDK.updateContent(USER_ID.contentId, USER_CONTENT_DEFINITION_ID, 
            PROPERTIES);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/getUser', upload.none(), async (req, res) => {
    try
    {
        const USER_INFO = await NomadSDK.getContent(req.body.userId, USER_CONTENT_DEFINITION_ID);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/updateUser', upload.none(), async (req, res) => {
    try
    {
        const USER_STATUS = JSON.parse(req.body.updateUserStatus);
        const STATE = JSON.parse(req.body.updateState);
        const COUNTRY = JSON.parse(req.body.updateCountry);
        const SYSTEM_ROLE = JSON.parse(req.body.updateSystemRole);

        let securityGroup = null;
        if (req.body.updateSecurityGroup)
        {
            securityGroup = JSON.parse(req.body.updateSecurityGroup);
            securityGroup = Array.isArray ? securityGroup : [securityGroup];
        }

        const PROPERTIES = {
            status: USER_STATUS,
            stateId: STATE,
            country: COUNTRY,
            role: SYSTEM_ROLE
        };

        if (req.body.firstName) PROPERTIES.firstName = req.body.firstName;
        if (req.body.lastName) PROPERTIES.lastName = req.body.lastName;
        if (req.body.email) PROPERTIES.email = req.body.email;
        if (req.body.organization) PROPERTIES.organization = req.body.organization;
        if (req.body.title) PROPERTIES.title = req.body.title;
        if (req.body.phone) PROPERTIES.phone = req.body.phone;
        if (req.body.phoneExt) PROPERTIES.phoneExt = req.body.phoneExt;
        if (req.body.mobilePhone) PROPERTIES.mobilePhone = req.body.mobilePhone;
        if (req.body.address) PROPERTIES.address = req.body.address;
        if (req.body.address2) PROPERTIES.address2 = req.body.address2;
        if (req.body.city) PROPERTIES.city = req.body.city;
        if (req.body.postalCode) PROPERTIES.postalCode = req.body.postalCode;
        if (securityGroup) PROPERTIES.assignedSecurityGroups = securityGroup;

        const USER_INFO = await NomadSDK.updateContent(req.body.userId, USER_CONTENT_DEFINITION_ID, 
            PROPERTIES);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/deleteUser', upload.none(), async (req, res) => {
    try
    {
        await NomadSDK.deleteContent(req.body.userId, USER_CONTENT_DEFINITION_ID);

        res.status(200).send("User deleted successfully");
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
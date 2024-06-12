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
	res.sendFile(__dirname + '/public/search.html');
});

app.post('/search', upload.none(), async (req, res) =>
{
    try
    {
        const FILTERS = [];

        if (req.body.fieldName)
        {
            if (typeof req.body.fieldName === 'string') 
            {
                FILTERS.push({
                    fieldName: req.body.fieldName,
                    operator: req.body.operator,
                    values: req.body.value,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.value.length; ++idx)
                {
                    FILTERS.push({
                        fieldName: req.body.fieldName[idx],
                        operator: req.body.operator[idx],
                        values: req.body.value[idx],
                    });
                }
            }
        }

        const SORT_FIELDS = [];
        if (req.body.sortFieldName)
        {
            if (typeof req.body.sortFieldName === 'string') 
            {
                SORT_FIELDS.push({
                    fieldName: req.body.sortFieldName,
                    sortType: req.body.sortType,
                });
            }
            else
            {
                for (let idx = 0; idx < req.body.sortFieldName.length; ++idx)
                {
                    SORT_FIELDS.push({
                        fieldName: req.body.sortFieldName[idx],
                        sortType: req.body.sortType[idx],
                    });
                }
            }
        }

        const RESULT_FIELD_NAMES = req.body.resultFieldNames !== "" 
            ? req.body.resultFieldNames.split(",").map(elem => ({ "name": elem })) 
            : null;

        const FULL_URL_NAMES = req.body.fullUrlNames !== "" 
            ? req.body.fullUrlNames.split(",") 
            : null;

        const SEARCH_MOVIE_INFO = await NomadSDK.search(req.body.searchQuery,
            req.body.pageOffset, req.body.pageSize, FILTERS.length !== 0 ? FILTERS : null, 
            SORT_FIELDS.length !== 0 ? SORT_FIELDS : null, RESULT_FIELD_NAMES, 
            FULL_URL_NAMES, req.body.distinctOnFieldName, req.body.includeVideoClips === "True", 
            req.body.similarAssetId, req.body.minScore, req.body.excludeTotalRecordCount, 
            req.body.filterBinder, req.body.useLlmSearch === "True",
            req.body.includeInternalFieldsInResults === "True");

        res.status(200).json(SEARCH_MOVIE_INFO);
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
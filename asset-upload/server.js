import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-sdk";
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
	res.sendFile(__dirname + '/public/asset-upload.html');
});
	

app.post('/uploadAsset', upload.single("file"), async (req, res) => {
  	try 
	{
		const ID = await NomadSDK.uploadAsset(req.body.name, req.body.existingAssetId,
			req.body.relatedContentId, req.body.uploadOverwriteOption, req.file, 
			req.body.parentId, req.body.languageId);

		res.status(200).json(ID);
  	} 
	catch (error) 
	{
		console.error(error);
		res.status(500).json({ error: error.message });
 	}
});

app.post('/uploadRelatedAsset', upload.single("file"), async (req, res) => {
	try 
	{
		const ID = await NomadSDK.uploadRelatedAsset(req.body.existingAssetId, req.body.relatedAssetId, 
			req.body.newRelatedAssetMetadataType, req.body.uploadOverwriteOption, req.file,
			req.body.parentId, req.body.languageId);

		res.status(200).json(ID);
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

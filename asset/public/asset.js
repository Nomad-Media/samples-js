import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSDK = new NomadMediaSDK(config);

const collectionContentDefinitionId = "20352932-05d2-4a7a-8821-06fcf4438ced";
const labelContentDefinitionId = "fc710473-d014-4b2a-b812-c98255e32046";
const languageContentDefinitionId = "e4b10c04-1878-4830-a115-e42d52705059";
const tagContentDefinitionId = "c806783c-f127-48ae-90c9-32175f4e1fff";

getCollectionList();
getContentDefinitions();
getCountryList();
getLabelList();
getLanguageList();
getLiveChannels();
getTagList();

async function getContentDefinitions()
{
    const contentDefinitions = await nomadSDK.getContentDefinitions();
    const contentDefinitionItems = contentDefinitions.items;

    if (contentDefinitionItems)
    {
        for (let contentDefinition of contentDefinitionItems)
        {
            const option = document.createElement("option");
            option.value = contentDefinition.contentDefinitionId;
            option.textContent = contentDefinition.properties.title;
            buildMediaRelatedContentsContentDefinitionsSelect.appendChild(option);
            clipAssetRelatedContentsContentDefinitionsSelect.appendChild(option.cloneNode(true));
            registerAssetRelatedContentsContentDefinitionsSelect.appendChild(option.cloneNode(true));
        }

        $(buildMediaRelatedContentsContentDefinitionsSelect).select2();
        $(clipAssetRelatedContentsContentDefinitionsSelect).select2();
        $(registerAssetRelatedContentsContentDefinitionsSelect).select2();
    }
}

async function getCollectionList()
{
    const collectionList = await getGroups(collectionContentDefinitionId);

    if (collectionList)
    {
        for (let collectionIdx = 0; collectionIdx < collectionList.length; ++collectionIdx)
        {
            let option = document.createElement("option");
            option.value = collectionList[collectionIdx].id;
            option.text = collectionList[collectionIdx].title;
            buildMediaCollectionsSelect.appendChild(option);
            clipAssetCollectionsSelect.appendChild(option.cloneNode(true));
            registerAssetCollectionsSelect.appendChild(option.cloneNode(true));
        }

        $(buildMediaCollectionsSelect).select2();
        $(clipAssetCollectionsSelect).select2();
        $(registerAssetCollectionsSelect).select2();
    }
}

async function getCountryList()
{
    const lookup = await nomadSDK.miscFunctions("config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json", "GET", null, true);
    const countryList = lookup[5].children;

    if (countryList)
    {
        for (let countryIdx = 0; countryIdx < countryList.length; ++countryIdx)
        {
            let option = document.createElement("option");
            option.value = countryList[countryIdx].id;
            option.text = countryList[countryIdx].label;
            createAnnotationCountrySelect.appendChild(option);
            updateAnnotationCountrySelect.appendChild(option.cloneNode(true));
        }

        $(createAnnotationCountrySelect).select2();
        $(updateAnnotationCountrySelect).select2();
    }
}

async function getLabelList()
{
    const labelList = await getGroups(labelContentDefinitionId);

    if (labelList)
    {
        for (let labelIdx = 0; labelIdx < labelList.length; ++labelIdx)
        {
            let option = document.createElement("option");
            option.value = labelList[labelIdx].id;
            option.text = labelList[labelIdx].title;
            createAssetAdBreakLabelsSelect.appendChild(option);
            updateAssetAdBreakLabelsSelect.appendChild(option.cloneNode(true));
        }

        $(createAssetAdBreakLabelsSelect).select2();
        $(updateAssetAdBreakLabelsSelect).select2();
    }
}

async function getLanguageList()
{
    const languageList = await getGroups(languageContentDefinitionId);

    if (languageList)
    {
        for (let languageIdx = 0; languageIdx < languageList.length; ++languageIdx)
        {
            let option = document.createElement("option");
            option.value = languageList[languageIdx].id;
            option.text = languageList[languageIdx].title;
            updateAssetLanguageSelect.appendChild(option);
        }

        $(updateAssetLanguageSelect).select2();
    }
}

async function getLiveChannels()
{
    const liveChannels = await nomadSDK.getLiveChannels();

    if (liveChannels)
    {
        for (let liveChannel of liveChannels)
        {
            const option = document.createElement("option");
            option.value = liveChannel.id;
            option.textContent = liveChannel.name;
            recordsAssetTrackingBeaconLiveChannelSelect.appendChild(option);
        }

        $(recordsAssetTrackingBeaconLiveChannelSelect).select2();
    }
}

async function getTagList()
{
    const tagList = await getGroups(tagContentDefinitionId);

    if (tagList)
    {
        for (let tagIdx = 0; tagIdx < tagList.length; ++tagIdx)
        {
            let option = document.createElement("option");
            option.value = tagList[tagIdx].id;
            option.text = tagList[tagIdx].title;
            buildMediaTagsSelect.appendChild(option);
            clipAssetTagsSelect.appendChild(option.cloneNode(true));
            createAssetAdBreakTagsSelect.appendChild(option.cloneNode(true));
            registerAssetTagsSelect.appendChild(option.cloneNode(true));
            updateAssetAdBreakTagsSelect.appendChild(option.cloneNode(true));
        }

        $(buildMediaTagsSelect).select2();
        $(clipAssetTagsSelect).select2();
        $(createAssetAdBreakTagsSelect).select2();
        $(registerAssetTagsSelect).select2();
        $(updateAssetAdBreakTagsSelect).select2();
    }
}

async function populateRelatedContentSelect(contentDefinitionId, relatedContentsSelect)
{
    let relatedContentList;
    console.log("config.apiType", config.apiType);
    if (config.apiType !== "portal")
    {
        relatedContentList = await getGroups(contentDefinitionId);
    }

    relatedContentsSelect.innerHTML = "";

    for (let relatedContentIdx = 0; relatedContentIdx < relatedContentList.length; ++relatedContentIdx)
    {
        let option = document.createElement("option");
        option.value = relatedContentList[relatedContentIdx].id;
        option.text = relatedContentList[relatedContentIdx].title;
        relatedContentsSelect.appendChild(option);
    }

    $(relatedContentsSelect).select2();
}

$("#buildMediaRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, buildMediaRelatedContentsSelect);
});

$("#clipAssetRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, clipAssetRelatedContentsSelect);
});

$("#registerAssetRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, registerAssetRelatedContentsSelect);
});

archiveAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const formData = getElements(archiveAssetForm);

    await nomadSDK.archiveAsset(formData.assetId);
});

batchActionAddActionArgumentButton.addEventListener('click', function() 
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], batchActionActionArgumentsDiv);
});

batchActionForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const formData = getElements(batchActionForm);

    let batchAction = null;
    if (formData.batchActionId)
    {
        batchAction = {
            id: formData.batchActionId,
            description: formData.batchActionActionArgumentsDiv
        };
    }

    let targetIds = null;
    if (formData.targetIds)
    {
        targetIds = formData.targetIds.split(',')
    }

    const actionArguments = [];
    if (typeof formData.argumentKey !== "undefined")
    {
        for (let argumentActionIdx = 0; argumentActionIdx < formData.argumentKey.length; ++argumentActionIdx) 
        {
            actionArguments[formData.argumentKey[argumentActionIdx]] = formData.argumentValue[argumentActionIdx];
        }
    }

    await nomadSDK.batchAction(
        formData.actionName,
        batchAction,
        formData.contentDefinitionId,
        formData.schemaName,
        targetIds,
        actionArguments,
        formData.resolverExcempt === "True"
    );
});

buildMediaAddSourceButton.addEventListener('click', function()
{
    createAddButtonElements(["Source Asset Id", "Start Time Code", "End Time Code"], 
        ["sourceAssetId", "startTimeCode", "endTimeCode"], buildMediaSourcesDiv);
});

buildMediaForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(buildMediaForm);

    let collections = null;
    if (formData.buildMediaCollectionsSelect)
    {
        const parsed = JSON.parse(formData.buildMediaCollectionsSelect);
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.buildMediaRelatedContentsSelect)
    {
        const parsed = JSON.parse(formData.buildMediaRelatedContentsSelect);
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        if (formData.buildMediaRelatedContentsContentDefinitionsSelect)
        {
            relatedContents.forEach(item =>
            {
                item["type"] = formData.buildMediaRelatedContentsContentDefinitionsSelect;
            });
        }
    }

    let tags = null;
    if (formData.buildMediaTagsSelect)
    {
        const parsed = JSON.parse(formData.buildMediaTagsSelect);
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    await nomadSDK.buildMedia(
        formData.sources,
        formData.title,
        tags,
        collections,
        relatedContents,
        formData.destinationFolderId,
        formData.videoBitrate,
        formData.audioTracks
    );
});

clipAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(clipAssetForm);

    let collections = null;
    if (formData.clipAssetCollectionsSelect)
    {
        const parsed = JSON.parse(formData.clipAssetCollectionsSelect);
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.clipAssetRelatedContentsSelect)
    {
        const parsed = JSON.parse(formData.clipAssetRelatedContentsSelect);
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        if (formData.clipAssetRelatedContentsContentDefinitionsSelect)
        {
            relatedContents.forEach(item =>
            {
                item["type"] = formData.clipAssetRelatedContentsContentDefinitionsSelect;
            });
        }
    }

    let tags = null;
    if (formData.clipAssetTagsSelect)
    {
        const parsed = JSON.parse(formData.clipAssetTagsSelect);
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    await nomadSDK.clipAsset(
        formData.assetId,
        formData.startTimeCode,
        formData.endTimeCode,
        formData.title,
        formData.outputFolderId,
        tags,
        collections,
        relatedContents,
        formData.videoBitrate,
        formData.audioTracks
    );
});

copyAssetAddActionArgumentButton.addEventListener('click', function ()
{
    createAddButtonElements(["Argument Key", "Argument Value"],
        ["argumentKey", "argumentValue"], copyAssetActionArgumentsDiv);
});

copyAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(copyAssetForm);

    let batchAction = null;
    if (formData.batchActionId)
    {
        batchAction = {
            id: formData.batchActionId,
            description: formData.batchActionName
        };
    }

    let targetIds = null;
    if (formData.targetIds)
    {
        targetIds = formData.targetIds.split(",");
    }

    const actionArguments = {};
    if (typeof formData.argumentKey !== "undefined")
    {
        for (let i = 0; i < formData.argumentKey.length; ++i)
        {
            actionArguments[formData.argumentKey[i]] = formData.argumentValue[i];
        }
    }

    await nomadSDK.copyAsset(
        formData.assetId,
        batchAction,
        formData.contentDefintionId,
        formData.schemaName,
        targetIds,
        actionArguments,
        formData.resolverExcempt === "True"
    );
});

createAnnotationForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createAnnotationForm);

    const properties = {
        country: formData.updateAnnotationCountrySelect,
        description: formData.description,
        firstKeyword: formData.firstKeyword,
        secondKeyword: formData.secondKeyword
    };

    await nomadSDK.createAnnotation(
        formData.assetId,
        formData.startTimeCode,
        formData.endTimeCode,
        properties,
        formData.contentId,
        formData.imageUrl
    );
});

createAssetAdBreakForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createAssetAdBreakForm);

    let tags = null;
    if (formData.createAssetAdBreakTagsSelect)
    {
        const parsed = JSON.parse(formData.createAssetAdBreakTagsSelect);
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    let labels = null;
    if (formData.createAssetAdBreakLabelsSelect)
    {
        const parsed = JSON.parse(formData.createAssetAdBreakLabelsSelect);
        labels = Array.isArray(parsed) ? parsed : [parsed];
    }

    await nomadSDK.createAssetAdBreak(
        formData.assetId,
        formData.timeCode,
        tags,
        labels
    );
});

createFolderAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createFolderAssetForm);

    await nomadSDK.createFolderAsset(
        formData.parentId,
        formData.displayName
    );
});

createPlaceholderAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createPlaceholderAssetForm);

    await nomadSDK.createPlaceholderAsset(
        formData.parentId,
        formData.assetName
    );
});

createScreenshotAtTimecodeForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createScreenshotAtTimecodeForm);

    await nomadSDK.createScreenshotAtTimecode(
        formData.assetId,
        formData.timeCode
    );
});

deleteAnnotationForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(deleteAnnotationForm);
    await nomadSDK.deleteAnnotation(formData.assetId, formData.annotationId);
});

deleteAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(deleteAssetForm);
    await nomadSDK.deleteAsset(formData.assetId);
});

deleteAssetAdBreakForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(deleteAssetAdBreakForm);
    await nomadSDK.deleteAssetAdBreak(formData.assetId, formData.adBreakId);
});

downloadArchiveAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(downloadArchiveAssetForm);
    const assetIds = formData.assetId.split(",");
    await nomadSDK.downloadArchiveAsset(assetIds, formData.fileName, formData.downloadProxy === "True");
});

duplicateAssetForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(duplicateAssetForm);
    await nomadSDK.duplicateAsset(formData.assetId);
});

getAnnotationsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAnnotationsForm);
    await nomadSDK.getAnnotations(formData.assetId);
});

getAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetForm);
    await nomadSDK.getAsset(formData.assetId);
});

getAssetAdBreaksForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetAdBreaksForm);
    await nomadSDK.getAssetAdBreaks(formData.assetId);
});

getAssetChildNodesForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetChildNodesForm);
    await nomadSDK.getAssetChildNodes(
        formData.assetId,
        formData.folderId,
        formData.sortColumn,
        formData.isDesc === "True",
        formData.pageIndex,
        formData.pageSize
    );
});

getAssetDetailsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetDetailsForm);
    await nomadSDK.getAssetDetails(formData.assetId);
});

getAssetManifestWithCookiesForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetManifestWithCookiesForm);
    await nomadSDK.getAssetManifestWithCookies(formData.assetId, formData.cookieId);
});

getAssetMetadataSummaryForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetMetadataSummaryForm);
    await nomadSDK.getAssetMetadataSummary(formData.assetId);
});

getAssetParentFoldersForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetParentFoldersForm);
    await nomadSDK.getAssetParentFolders(formData.assetId, formData.pageSize);
});

getAssetScreenshotDetailsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetScreenshotDetailsForm);
    await nomadSDK.getAssetScreenshotDetails(formData.assetId, formData.segmentId, formData.screenshotId);
});

getAssetSegmentDetailsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getAssetSegmentDetailsForm);
    await nomadSDK.getAssetSegmentDetails(formData.assetId, formData.segmentId);
});

getUserUploadPartsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getUserUploadPartsForm);
    await nomadSDK.getUserUploadParts(formData.assetId);
});

getUserUploadsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(getUserUploadsForm);
    await nomadSDK.getUserUploads(formData.includeCompletedUploads === "True");
});

importAnnotationsAddAnnotationButton.addEventListener('click', function()
{
    createAddButtonElements(["Start Time Code", "End Time Code"], 
        ["startTimeCode", "endTimeCode"], importAnnotationsDiv);
});

importAnnotationsForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(importAnnotationsForm);
    const startTimeCodes = Array.isArray(formData.startTimeCode) ? formData.startTimeCode : [formData.startTimeCode];
    const endTimeCodes = Array.isArray(formData.endTimeCode) ? formData.endTimeCode : [formData.endTimeCode];
    const annotations = [];
    for (let i = 0; i < startTimeCodes.length; ++i) 
    {   
        annotations.push({
            startTimeCode: startTimeCodes[i],
            endTimeCode: endTimeCodes[i]
        });
    }
    await nomadSDK.importAnnotations(formData.assetId, annotations);
});

indexAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(indexAssetForm);
    await nomadSDK.indexAsset(formData.assetId);
});

localRestoreAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(localRestoreAssetForm);
    await nomadSDK.localRestoreAsset(formData.assetId, formData.profile);
});

moveAssetAddActionArgumentButton.addEventListener('click', function()
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], moveAssetActionArgumentsDiv);
});

moveAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(moveAssetForm);

    let batchAction = null;
    if (formData.batchActionId) 
    {
        batchAction = {
            id: formData.batchActionId,
            description: formData.batchActionName
        };
    }

    let targetIds = null;
    if (formData.targetIds) 
    {
        targetIds = formData.targetIds.split(",");
    }

    const actionArguments = {};
    if (typeof formData.argumentKey !== "undefined") 
    {
        for (let i = 0; i < formData.argumentKey.length; ++i) 
        {
            actionArguments[formData.argumentKey[i]] = formData.argumentValue[i];
        }
    }

    await nomadSDK.moveAsset(
        formData.assetId,
        batchAction,
        formData.contentDefintionId,
        formData.schemaName,
        targetIds,
        actionArguments,
        formData.resolverExcempt === "True"
    );
});

recordsAssetTrackingBeaconForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(recordsAssetTrackingBeaconForm);
    const liveChannel = JSON.parse(formData.recordsAssetTrackingBeaconLiveChannelSelect);
    await nomadSDK.recordsAssetTrackingBeacon(
        formData.assetId,
        formData.trackingEvent,
        liveChannel,
        formData.contentId,
        formData.second
    );
});

registerAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(registerAssetForm);

    let collections = null;
    if (formData.registerAssetCollectionsSelect) 
    {
        const parsed = JSON.parse(formData.registerAssetCollectionsSelect);
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.registerAssetRelatedContentsSelect) 
    {
        const parsed = JSON.parse(formData.registerAssetRelatedContentsSelect);
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        if (formData.registerAssetRelatedContentsContentDefinitionsSelect) 
        {
            relatedContents.forEach(item => {
                item["type"] = formData.registerAssetRelatedContentsContentDefinitionsSelect;
            });
        }
    }

    let tags = null;
    if (formData.registerAssetTagsSelect) 
    {
        const parsed = JSON.parse(formData.registerAssetTagsSelect);
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    await nomadSDK.registerAsset(
        formData.assetId,
        formData.parentId,
        formData.displayObjectKey,
        formData.bucketName,
        formData.objectKey,
        formData.eTag,
        tags,
        collections,
        relatedContents,
        formData.sequencer,
        formData.assetStatus,
        formData.storageClass,
        formData.assetType,
        formData.contentLength,
        formData.storageEventName,
        formData.createDate,
        formData.storageSouceIpAddress,
        formData.startMediaProcessor === "True",
        formData.deleteMissingAsset === "True"
    );
});

reprocessAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(reprocessAssetForm);
    const targetIds = formData.targetIds.split(",");
    await nomadSDK.reprocessAsset(targetIds);
});

restoreAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(restoreAssetForm);
    await nomadSDK.restoreAsset(formData.assetId);
});

shareAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(shareAssetForm);

    const nomadUsers = formData.nomadUsers ? formData.nomadUsers.split(",").map(id => ({ id })) : [];
    const externalUsers = formData.externalUsers ? formData.externalUsers.split(",").map(id => ({ id })) : [];

    await nomadSDK.shareAsset(
        formData.assetId,
        nomadUsers,
        externalUsers,
        formData.shareDurationInHours
    );
});

startWorkflowAddActionArgumentButton.addEventListener('click', function()
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], startWorkflowActionArgumentsDiv);
});

startWorkflowForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(startWorkflowForm);

    const actionArguments = {};
    if (typeof formData.argumentKey !== "undefined") {
        for (let i = 0; i < formData.argumentKey.length; ++i) {
            actionArguments[formData.argumentKey[i]] = formData.argumentValue[i];
        }
    }

    const targetIds = formData.targetIds.split(",");
    await nomadSDK.startWorkflow(actionArguments, targetIds);
});

transcribeAssetAddTranscriptButton.addEventListener('click', function()
{
    createAddButtonElements(["Start Time Code", "Content"], 
        ["startTimeCode", "content"], transcribeAssetDiv, ["time", "text"]);
});

transcribeAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(transcribeAssetForm);

    const startTimeCodes = Array.isArray(formData.startTimeCode) ? formData.startTimeCode : [formData.startTimeCode];
    const contents = Array.isArray(formData.content) ? formData.content : [formData.content];
    const transcript = [];
    for (let i = 0; i < startTimeCodes.length; ++i) {
        transcript.push({
            startTimeCode: startTimeCodes[i],
            content: contents[i]
        });
    }

    await nomadSDK.transcribeAsset(
        formData.assetId,
        formData.transcriptId,
        transcript
    );
});

updateAssetAddCustomPropertyButton.addEventListener('click', function()
{
    createAddButtonElements(["Property Key", "Property Value"],
        ["propertyKey", "propertyValue"], updateAssetCustomPropertiesDiv);
});

updateAnnotationForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(updateAnnotationForm);

    const country = JSON.parse(formData.updateAnnotationCountrySelect);

    await nomadSDK.updateAnnotation(
        formData.assetId,
        formData.annotationId,
        formData.startTimeCode,
        formData.endTimeCode,
        formData.firstKeyword,
        formData.secondKeyword,
        formData.description,
        country,
        formData.contentId,
        formData.imageUrl
    );
});

updateAssetForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(updateAssetForm);

    const properties = {};
    if (formData.propertyKey) 
    {
        const propertyKeys = Array.isArray(formData.propertyKey) ? formData.propertyKey : [formData.propertyKey];
        const propertyValues = Array.isArray(formData.propertyValue) ? formData.propertyValue : [formData.propertyValue];
        for (let i = 0; i < propertyKeys.length; ++i) {
            properties[propertyKeys[i]] = propertyValues[i];
        }
    }

    await nomadSDK.updateAsset(
        formData.assetId,
        formData.displayName,
        formData.displayDate,
        formData.availableStartDate,
        formData.availableEndDate,
        properties
    );
});

updateAssetAdBreakForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(updateAssetAdBreakForm);

    let tags = null;
    if (formData.updateAssetAdBreakTagsSelect) 
    {
        const parsed = JSON.parse(formData.updateAssetAdBreakTagsSelect);
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    let labels = null;
    if (formData.updateAssetAdBreakLabelsSelect) 
    {
        const parsed = JSON.parse(formData.updateAssetAdBreakLabelsSelect);
        labels = Array.isArray(parsed) ? parsed : [parsed];
    }

    await nomadSDK.updateAssetAdBreak(
        formData.assetId,
        formData.adBreakId,
        formData.timeCode,
        tags,
        labels
    );
});

updateAssetLanguageForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();
    const formData = getElements(updateAssetLanguageForm);

    const language = JSON.parse(formData.updateAssetLanguageSelect);
    await nomadSDK.updateAssetLanguage(
        formData.assetId,
        language.id
    );
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "SELECT") 
        {   
            const SELECTED_OPTIONS = []
            for (let element of input) 
            {   
                if (element.selected) 
                {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) 
                    {
                        if (input.id) 
                        {
                            FORM_DATA.append(input.id, element.value);
                        } 
                        else 
                        {
                            FORM_DATA.append(input.name, element.value);
                        }
                    } 
                    else 
                    {
                        SELECTED_OPTIONS.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (SELECTED_OPTIONS.length > 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS));
            }
            else if (SELECTED_OPTIONS.length === 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS[0]));
            }
        }
        else if (input.tagName === "INPUT")
        {
            if (input.id) 
            {
                FORM_DATA.append(input.id, input.value);
            } 
            else 
            {
                FORM_DATA.append(input.name, input.value);
            }
        }
    }
    return FORM_DATA;
}

function createAddButtonElements(LABELS, INPUT_NAMES, DIV, TYPES) {
    const ELEMENTS = [];

    let types = (TYPES === undefined) ? new Array(LABELS.length).fill("text") : TYPES;

    for (let elementIdx = 0; elementIdx < LABELS.length; ++elementIdx) 
    {
        const label = document.createElement("label");
        label.textContent = LABELS[elementIdx];

        const input = document.createElement("input");
        input.type = types[elementIdx];
        input.name = INPUT_NAMES[elementIdx];

        const br = document.createElement('br');

        ELEMENTS.push(label, input, br);

        DIV.appendChild(label);
        DIV.appendChild(input);
        DIV.appendChild(br);
    }

    const REMOVE_BUTTON = document.createElement('button');
    REMOVE_BUTTON.textContent = 'Remove';

    const BR = document.createElement('br');

    REMOVE_BUTTON.addEventListener('click', function() {
        ELEMENTS.forEach(ELEMENT => DIV.removeChild(ELEMENT));
        DIV.removeChild(BR);
        DIV.removeChild(REMOVE_BUTTON);
    });

    DIV.appendChild(BR);
    DIV.appendChild(REMOVE_BUTTON);
}

async function populateRelatedContentSelect(contentDefinitionId, relatedContentsSelect)
{
    let relatedContentList;
    console.log("config.apiType", config.apiType);
    if (config.apiType !== "portal")
    {
        relatedContentList = await getGroups(contentDefinitionId);
    }

    relatedContentsSelect.innerHTML = "";

    for(let relatedContentIdx = 0; relatedContentIdx < relatedContentList.length; ++relatedContentIdx)
    {
        let option = document.createElement("option");
        option.value = relatedContentList[relatedContentIdx].id;
        option.text = relatedContentList[relatedContentIdx].title;
        relatedContentsSelect.appendChild(option);
    }

    $(relatedContentsSelect).select2();
}

async function getGroups(groupContentDefinitionId)
{
    const groupList = [];
    let offset = 0;
    while (true)
    {
        const searchInfo = await nomadSDK.search(null, offset, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: groupContentDefinitionId,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);

        if (!searchInfo) return [];
        groupList.push(...searchInfo.items);

        ++offset;

        if (searchInfo.items.length < 100) break;
    }
    return groupList;
}
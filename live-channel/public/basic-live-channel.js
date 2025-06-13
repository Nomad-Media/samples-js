import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getChannelsForm = document.getElementById("getChannelsForm");
const getChannelForm = document.getElementById("getChannelForm");
const createChannelForm = document.getElementById("createChannelForm");
const updateChannelForm = document.getElementById("updateChannelForm");
const clipLiveChannelForm = document.getElementById("clipLiveChannelForm");
const refreshChannelsForm = document.getElementById("refreshChannelsForm");
const nextEventForm = document.getElementById("nextEventForm");
const startOutputTrackingForm = document.getElementById("startOutputTrackingForm");
const moveScheduleEventForm = document.getElementById("moveScheduleEventForm");
const addAssetScheduleEventForm = document.getElementById("addAssetScheduleEventForm");
const getAssetScheduleEventForm = document.getElementById("getAssetScheduleEventForm");
const updateAssetScheduleEventForm = document.getElementById("updateAssetScheduleEventForm");
const removeAssetScheduleEventForm = document.getElementById("removeAssetScheduleEventForm");
const getInputsForm = document.getElementById("getInputsForm");
const getInputForm = document.getElementById("getInputForm");
const createInputForm = document.getElementById("createInputForm");
const updateInputForm = document.getElementById("updateInputForm");
const addInputScheduleEventForm = document.getElementById("addInputScheduleEventForm");
const getInputScheduleEventForm = document.getElementById("getInputScheduleEventForm");
const updateInputScheduleEventForm = document.getElementById("updateInputScheduleEventForm");
const removeInputScheduleEventForm = document.getElementById("removeInputScheduleEventForm");
const startChannelForm = document.getElementById("startChannelForm");
const stopChannelForm = document.getElementById("stopChannelForm");
const deleteChannelForm = document.getElementById("deleteChannelForm");
const deleteInputForm = document.getElementById("deleteInputForm");
const getOutputsForm = document.getElementById("getOutputsForm");
const getOutputForm = document.getElementById("getOutputForm");
const getOutputTypesForm = document.getElementById("getOutputTypesForm");
const createOutputForm = document.getElementById("createOutputForm");
const updateOutputForm = document.getElementById("updateOutputForm");
const deleteOutputForm = document.getElementById("deleteOutputForm");
const getOutputGroupsForm = document.getElementById("getOutputGroupsForm");
const getOutputGroupForm = document.getElementById("getOutputGroupForm");
const createOutputGroupForm = document.getElementById("createOutputGroupForm");
const updateOutputGroupForm = document.getElementById("updateOutputGroupForm");
const deleteOutputGroupForm = document.getElementById("deleteOutputGroupForm");
const getOperatorsForm = document.getElementById("getOperatorsForm");
const getOperatorForm = document.getElementById("getOperatorForm");
const startBroadcastForm = document.getElementById("startBroadcastForm");
const cancelBroadcastForm = document.getElementById("cancelBroadcastForm");
const stopBroadcastForm = document.getElementById("stopBroadcastForm");
const getCompletedSegmentsForm = document.getElementById("getCompletedSegmentsForm");
const startSegmentForm = document.getElementById("startSegmentForm");
const cancelSegmentForm = document.getElementById("cancelSegmentForm");
const completeSegmentForm = document.getElementById("completeSegmentForm");

const createChannelType = document.getElementById("createChannelType");
const updateChannelType = document.getElementById("updateChannelType");
const createInputSourceType = document.getElementById("createInputSourceType");
const updateInputSourceType = document.getElementById("updateInputSourceType");

const createChannelUrlDiv = document.getElementById("createChannelUrlDiv");
const updateChannelUrlDiv = document.getElementById("updateChannelUrlDiv");
const createInputSourceUrlDiv = document.getElementById("createSourceUrlDiv");
const createInputSourcesDiv = document.getElementById("createInputSourcesDiv");
const updateInputSourceUrlDiv = document.getElementById("updateSourceUrlDiv");

const createInputSourceUrlLabel = document.getElementById("createSourceUrlLabel");
const updateInputSourceUrlLabel = document.getElementById("updateSourceUrlLabel");

const createInputAddSourcesButton = document.getElementById("createInputAddSourcesButton");

const clipLiveChannelCollectionsSelect = document.getElementById("clipLiveChannelCollectionsSelect");
const clipLiveChannelContentDefinitionsSelect = document.getElementById("clipLiveChannelContentDefinitionsSelect");
const clipLiveChannelRelatedContentsSelect = document.getElementById("clipLiveChannelRelatedContentsSelect");
const clipLiveChannelSelect = document.getElementById("clipLiveChannelSelect");
const clipLiveChannelTagsSelect = document.getElementById("clipLiveChannelTagsSelect");
const updateChannelSelect = document.getElementById("updateChannelSelect");
const createOutputTypeSelect = document.getElementById("createOutputTypeSelect");
const updateOutputTypeSelect = document.getElementById("updateOutputTypeSelect");
const createOutputGroupTypeSelect = document.getElementById("createOutputGroupTypeSelect");
const createOutputGroupArchiveOutputProfile = document.getElementById("createOutputGroupArchiveOutputProfile");
const createOutputGroupOutputProfiles = document.getElementById("createOutputGroupOutputProfiles");
const updateOutputGroupTypeSelect = document.getElementById("updateOutputGroupTypeSelect");
const updateOutputGroupArchiveOutputProfile = document.getElementById("updateOutputGroupArchiveOutputProfile");
const updateOutputGroupOutputProfiles = document.getElementById("updateOutputGroupOutputProfiles");

getCollectionList();
getContentDefinitions();
getLiveChannels();
getLiveOutputProfiles();
getTagList();
getOutputTypes();

async function getCollectionList()
{
    const collections = await getGroups("20352932-05d2-4a7a-8821-06fcf4438ced");
    if (collections)
    {
        for (let collection of collections)
        {
            let option = document.createElement("option");
            option.value = collection.id;
            option.text = collection.title;
            clipLiveChannelCollectionsSelect.appendChild(option);
        }
        $(clipLiveChannelCollectionsSelect).select2();
    }
}

async function getContentDefinitions()
{
    const contentDefinitions = await nomadSdk.miscFunctions("contentDefinition", "GET");
    if (contentDefinitions && contentDefinitions.items)
    {
        for (let contentDefinition of contentDefinitions.items)
        {
            const option = document.createElement("option");
            option.value = contentDefinition.contentDefinitionId;
            option.textContent = contentDefinition.properties.title;
            clipLiveChannelContentDefinitionsSelect.appendChild(option);
        }
        $(clipLiveChannelContentDefinitionsSelect).select2();
    }
}

async function getLiveChannels()
{
    const liveChannels = await nomadSdk.getLiveChannels();
    if (liveChannels)
    {
        for (let liveChannel of liveChannels)
        {
            const option = document.createElement("option");
            option.value = liveChannel.id;
            option.textContent = liveChannel.name;
            clipLiveChannelSelect.appendChild(option);
            updateChannelSelect.appendChild(option.cloneNode(true));
        }
        $(clipLiveChannelSelect).select2();
        $(updateChannelSelect).select2();
    }
}

async function getLiveOutputProfiles()
{
    const liveOutputProfiles = await nomadSdk.getLiveOutputProfiles();
    if (liveOutputProfiles)
    {
        for (let liveOutputProfile of liveOutputProfiles)
        {
            const option = document.createElement("option");
            option.value = liveOutputProfile.id;
            option.textContent = liveOutputProfile.name;
            createOutputGroupArchiveOutputProfile.appendChild(option);
            createOutputGroupOutputProfiles.appendChild(option.cloneNode(true));
            updateOutputGroupArchiveOutputProfile.appendChild(option.cloneNode(true));
            updateOutputGroupOutputProfiles.appendChild(option.cloneNode(true));
        }
        $(createOutputGroupArchiveOutputProfile).select2();
        $(createOutputGroupOutputProfiles).select2();
        $(updateOutputGroupArchiveOutputProfile).select2();
        $(updateOutputGroupOutputProfiles).select2();
    }
}

async function getTagList()
{
    const tags = await getGroups("c806783c-f127-48ae-90c9-32175f4e1fff");
    if (tags)
    {
        for (let tag of tags)
        {
            let option = document.createElement("option");
            option.value = tag.id;
            option.text = tag.title;
            clipLiveChannelTagsSelect.appendChild(option);
        }
        $(clipLiveChannelTagsSelect).select2();
    }
}

async function getOutputTypes()
{
    const outputTypes = await nomadSdk.miscFunctions("lookup/117", "GET");
    if (outputTypes && outputTypes.items)
    {
        for (let outputType of outputTypes.items)
        {
            const option = document.createElement("option");
            option.value = outputType.id;
            option.textContent = outputType.description;
            createOutputTypeSelect.appendChild(option);
            updateOutputTypeSelect.appendChild(option.cloneNode(true));
            createOutputGroupTypeSelect.appendChild(option.cloneNode(true));
            updateOutputGroupTypeSelect.appendChild(option.cloneNode(true));
        }
        $(createOutputTypeSelect).select2();
        $(updateOutputTypeSelect).select2();
        $(createOutputGroupTypeSelect).select2();
        $(updateOutputGroupTypeSelect).select2();
    }
}

$("#clipLiveChannelContentDefinitionsSelect").on("select2:select", async function (event)
{
    await populateRelatedContentSelect(event.params.data.id, clipLiveChannelRelatedContentsSelect);
});

getChannelsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getLiveChannels());
});

getChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getChannelForm);
    console.log(await nomadSdk.getLiveChannel(formData.channelId));
});

createChannelType.addEventListener("change", function (event)
{
    event.preventDefault();
    let createChannelTypeValue = createChannelType.value;
    createChannelUrlDiv.hidden = !(createChannelTypeValue === "External");
});

createChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createChannelForm);
    const securityGroups = formData.createSecurityGroups ? formData.createSecurityGroups.split(",") : [];
    console.log(await nomadSdk.createLiveChannel(
        formData.createChannelName,
        formData.createChannelThumbnailImage,
        formData.createChannelArchiveFolderAssetId,
        formData.createChannelEnableHighAvailability === "true",
        formData.createChannelEnableLiveClipping === "true",
        formData.createChannelIsSecureOutput === "true",
        formData.createChannelIsOutputScreenshots === "true",
        formData.createChannelType,
        formData.createChannelUrl,
        securityGroups
    ));
});

updateChannelType.addEventListener("change", function (event)
{
    event.preventDefault();
    let updateChannelTypeValue = updateChannelType.value;
    updateChannelUrlDiv.hidden = !(updateChannelTypeValue === "External");
});

updateChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateChannelForm);
    const channel = JSON.parse(formData.updateChannelSelect);
    const securityGroups = formData.updateSecurityGroups ? formData.updateSecurityGroups.split(",") : [];
    console.log(await nomadSdk.updateLiveChannel(
        channel.id,
        formData.updateChannelName,
        formData.updateChannelThumbnailImage,
        formData.updateChannelArchiveFolderAssetId,
        formData.updateChannelEnableHighAvailability === "true",
        formData.updateChannelEnableLiveClipping === "true",
        formData.updateChannelIsSecureOutput === "true",
        formData.updateChannelIsOutputScreenshots === "true",
        formData.updateChannelType,
        formData.updateChannelUrl,
        securityGroups
    ));
});

clipLiveChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(clipLiveChannelForm);
    const liveChannel = JSON.parse(formData.clipLiveChannelSelect);
    let collections = null;
    if (formData.clipLiveChannelCollectionsSelect)
    {
        const parsedCollections = JSON.parse(formData.clipLiveChannelCollectionsSelect);
        collections = Array.isArray(parsedCollections) ? parsedCollections : [parsedCollections];
    }
    let relatedContent = null;
    if (formData.clipLiveChannelRelatedContentsSelect)
    {
        const parsedRelatedContent = JSON.parse(formData.clipLiveChannelRelatedContentsSelect);
        relatedContent = Array.isArray(parsedRelatedContent) ? parsedRelatedContent : [parsedRelatedContent];
    }
    let tags = null;
    if (formData.clipLiveChannelTagsSelect)
    {
        const parsedTags = JSON.parse(formData.clipLiveChannelTagsSelect);
        tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
    }
    console.log(await nomadSdk.clipLiveChannel(
        liveChannel.id,
        formData.startTimeCode,
        formData.endTimeCode,
        formData.title,
        formData.outputFolderAssetId,
        tags,
        collections,
        relatedContent,
        formData.videoBitrate,
        formData.audioTracks
    ));
});

refreshChannelsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.liveChannelRefresh());
});

nextEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(nextEventForm);
    console.log(await nomadSdk.nextEvent(formData.channelId));
});

startOutputTrackingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startOutputTrackingForm);
    console.log(await nomadSdk.startOutputTracking(formData.channelId));
});

moveScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(moveScheduleEventForm);
    console.log(await nomadSdk.moveScheduleEvent(
        formData.channelId,
        formData.scheduleEventId,
        formData.previousScheduleEventId
    ));
});

getInputsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getLiveInputs());
});

getInputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getInputForm);
    console.log(await nomadSdk.getLiveInput(formData.getInputId));
});

createInputSourceType.addEventListener("change", function (event)
{
    event.preventDefault();
    let sourceType = createInputSourceType.value;
    createInputSourceUrlDiv.hidden = !(sourceType !== "UDP_PUSH");
    if (sourceType === "RTMP_PUSH")
    {
        createInputSourceUrlLabel.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                               Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        createInputSourceUrlLabel.innerHTML = "Enter Source Video URL<br>\
                                               Must start with http or rtmp";
        createInputSourcesDiv.hidden = sourceType === "RTMP_PULL";
    }
});

createInputAddSourcesButton.addEventListener("click", function (event)
{
    event.preventDefault();
    let ipLabel = document.createElement("label");
    ipLabel.setAttribute("for", "ipInput");
    ipLabel.textContent = "Ip:";
    createInputSourcesDiv.appendChild(ipLabel);

    let ipInput = document.createElement("input");
    ipInput.setAttribute("type", "createInputSources");
    ipInput.setAttribute("name", "ipInputName");
    createInputSourcesDiv.appendChild(ipInput);

    let portLabel = document.createElement("label");
    portLabel.setAttribute("for", "portInput");
    portLabel.textContent = "Port:";
    createInputSourcesDiv.appendChild(portLabel);

    let portInput = document.createElement("input");
    portInput.setAttribute("type", "createInputSources");
    portInput.setAttribute("name", "portInputName");
    createInputSourcesDiv.appendChild(portInput);

    let urlLabel = document.createElement("label");
    urlLabel.setAttribute("for", "urlInput");
    urlLabel.textContent = "Url:";
    createInputSourcesDiv.appendChild(urlLabel);

    let urlInput = document.createElement("input");
    urlInput.setAttribute("type", "createInputSources");
    urlInput.setAttribute("name", "urlInputName");
    createInputSourcesDiv.appendChild(urlInput);
});

createInputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createInputForm);
    console.log(await nomadSdk.createLiveInput(
        formData.createInputName,
        formData.createInputSource,
        formData.createInputType,
        formData.createInputIsStandard === "true",
        formData.createInputVideoAssetId,
        formData.createInputDestinations ? formData.createInputDestinations.split(",") : [],
        formData.createInputSources ? formData.createInputSources.split(",") : []
    ));
});

updateInputSourceType.addEventListener("change", function (event)
{
    event.preventDefault();
    let sourceType = updateInputSourceType.value;
    updateInputSourceUrlDiv.hidden = !(sourceType !== "UDP_PUSH");
    if (sourceType === "RTMP_PUSH")
    {
        updateInputSourceUrlLabel.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                               Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        updateInputSourceUrlLabel.innerHTML = "Enter Source Video URL<br>\
                                               Must start with http or rtmp";
    }
});

updateInputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateInputForm);
    console.log(await nomadSdk.updateLiveInput(
        formData.updateInputId,
        formData.updateInputName,
        formData.updateInputSource,
        formData.updateInputType,
        formData.updateInputIsStandard === "true",
        formData.updateInputVideoAssetId,
        formData.updateInputDestinations ? formData.updateInputDestinations.split(",") : [],
        formData.updateInputSources ? formData.updateInputSources.split(",") : []
    ));
});

addAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addAssetScheduleEventForm);
    console.log(await nomadSdk.addAssetScheduleEvent(
        formData.addAssetScheduleEventChannelId,
        {
            id: formData.addAssetScheduleEventAssetId,
            name: formData.addAssetScheduleEventAssetName
        },
        formData.addAssetScheduleEventIsLoop === "true",
        formData.addAssetScheduleEventDurationTimeCode,
        formData.addAssetScheduleEventPreviousId
    ));
});

getAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getAssetScheduleEventForm);
    console.log(await nomadSdk.getAssetScheduleEvent(
        formData.channelId,
        formData.scheduleEventId
    ));
});

updateAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateAssetScheduleEventForm);
    console.log(await nomadSdk.updateAssetScheduleEvent(
        formData.scheduleEventId,
        formData.channelId,
        formData.assetId,
        formData.assetName,
        formData.IsLoop === "true",
        formData.DurationTimeCode,
        formData.previousId
    ));
});

removeAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(removeAssetScheduleEventForm);
    console.log(await nomadSdk.removeAssetScheduleEvent(
        formData.removeAssetScheduleEventChannelId,
        formData.removeAssetScheduleEventScheduleEventId
    ));
});

addInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addInputScheduleEventForm);
    let backupInput = null;
    if (formData.addInputScheduleEventBackupInputId)
    {
        backupInput = {
            id: formData.addInputScheduleEventBackupInputId,
            name: formData.addInputScheduleEventBackupInputName
        };
    }
    console.log(await nomadSdk.addInputScheduleEvent(
        formData.addInputScheduleEventChannelId,
        {
            id: formData.addInputScheduleEventInputId,
            name: formData.addInputScheduleEventInputName
        },
        backupInput,
        formData.addInputScheduleEventFixedOnAirTimeUTC,
        formData.addInputScheduleEventPreviousId
    ));
});

getInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getInputScheduleEventForm);
    console.log(await nomadSdk.getInputScheduleEvent(
        formData.channelId,
        formData.scheduleEventId
    ));
});

updateInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateInputScheduleEventForm);
    const input = formData.inputId ? { id: formData.inputId, name: formData.inputName } : null;
    const backupInput = formData.backupInputId ? { id: formData.backupInputId, name: formData.backupInputName } : null;
    const fixedOnAirTimeUTC = formData.fixedOnAirTimeUTC || null;
    console.log(await nomadSdk.updateInputScheduleEvent(
        formData.scheduleEventId,
        formData.channelId,
        input,
        backupInput,
        fixedOnAirTimeUTC
    ));
});

removeInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(removeInputScheduleEventForm);
    console.log(await nomadSdk.removeInputScheduleEvent(
        formData.removeInputScheduleEventChannelId,
        formData.removeInputScheduleEventScheduleEventId
    ));
});

startChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startChannelForm);
    await nomadSdk.startLiveChannel(formData.startLiveChannelId);
});

stopChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopChannelForm);
    await nomadSdk.stopLiveChannel(formData.stopLiveChannelId);
});

deleteChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteChannelForm);
    await nomadSdk.deleteLiveChannel(
        formData.deleteChannelId,
        formData.deleteLiveInputs === "true"
    );
});

deleteInputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteInputForm);
    await nomadSdk.deleteLiveInput(formData.deleteInputId);
});

getOutputsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getLiveOutputProfiles());
});

getOutputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getOutputForm);
    console.log(await nomadSdk.getLiveOutputProfile(formData.id));
});

getOutputTypesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.miscFunctions("lookup/117", "GET"));
});

createOutputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createOutputForm);
    const outputType = formData.createOutputTypeSelect ? JSON.parse(formData.createOutputTypeSelect) : {};
    console.log(await nomadSdk.createLiveOutputProfile(
        formData.name,
        outputType,
        formData.isActive === "true",
        formData.audioBitrate,
        formData.outputStreamKey,
        formData.outputUrl,
        formData.secondaryOutputStreamKey,
        formData.secondaryOutputUrl,
        formData.videoBitrate,
        formData.videoBitrateMode,
        formData.videoCodec,
        formData.videoFramesPerSecond
    ));
});

updateOutputTypeSelect.addEventListener("change", function (event)
{
    event.preventDefault();
    let outputType = updateOutputTypeSelect.value;
    updateChannelUrlDiv.hidden = !(outputType === "External");
});

updateOutputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateOutputForm);
    const outputType = formData.updateOutputTypeSelect ? JSON.parse(formData.updateOutputTypeSelect) : {};
    console.log(await nomadSdk.updateLiveOutputProfile(
        formData.id,
        formData.name,
        outputType,
        formData.isActive === "true",
        formData.audioBitrate,
        formData.outputStreamKey,
        formData.outputUrl,
        formData.secondaryOutputStreamKey,
        formData.secondaryOutputUrl,
        formData.videoBitrate,
        formData.videoBitrateMode,
        formData.videoCodec,
        formData.videoFramesPerSecond
    ));
});

deleteOutputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteOutputForm);
    console.log(await nomadSdk.deleteLiveOutputProfile(formData.id));
});

getOutputGroupsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getLiveOutputProfileGroups());
});

getOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getOutputGroupForm);
    console.log(await nomadSdk.getLiveOutputProfileGroup(formData.id));
});

createOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createOutputGroupForm);
    const manifestType = formData.manifestType || "both";
    const createOutputGroupType = formData.createOutputGroupTypeSelect ? JSON.parse(formData.createOutputGroupTypeSelect) : null;
    let createOutputGroupArchiveOutputProfileValue = formData.createOutputGroupArchiveOutputProfile ? JSON.parse(formData.createOutputGroupArchiveOutputProfile) : null;
    if (createOutputGroupArchiveOutputProfileValue && createOutputGroupArchiveOutputProfileValue.id === "null") createOutputGroupArchiveOutputProfileValue = null;
    const createOutputGroupOutputProfiles = formData.createOutputGroupOutputProfiles ? JSON.parse(formData.createOutputGroupOutputProfiles) : null;
    console.log(await nomadSdk.createLiveOutputProfileGroup(
        formData.name,
        formData.isEnabled === "true",
        manifestType,
        formData.isDefaultGroup === "true",
        createOutputGroupType,
        createOutputGroupArchiveOutputProfileValue,
        createOutputGroupOutputProfiles
    ));
});

updateOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateOutputGroupForm);
    let manifestType = formData.manifestType;
    if (manifestType !== "")
    {
        manifestType = typeof manifestType === "string" ? manifestType : "both";
    }
    const updateOutputGroupType = formData.updateOutputGroupTypeSelect ? JSON.parse(formData.updateOutputGroupTypeSelect) : null;
    let updateOutputGroupArchiveOutputProfileValue = formData.updateOutputGroupArchiveOutputProfile ? JSON.parse(formData.updateOutputGroupArchiveOutputProfile) : null;
    if (updateOutputGroupArchiveOutputProfileValue && updateOutputGroupArchiveOutputProfileValue.id === "null") updateOutputGroupArchiveOutputProfileValue = null;
    let updateOutputGroupOutputProfiles = formData.updateOutputGroupOutputProfiles;
    updateOutputGroupOutputProfiles = updateOutputGroupOutputProfiles ? JSON.parse(updateOutputGroupOutputProfiles) : null;
    console.log(await nomadSdk.updateLiveOutputProfileGroup(
        formData.id,
        formData.name,
        formData.isEnabled === "true",
        manifestType,
        formData.isDefaultGroup === "true",
        updateOutputGroupType,
        updateOutputGroupArchiveOutputProfileValue,
        updateOutputGroupOutputProfiles
    ));
});

deleteOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteOutputGroupForm);
    console.log(await nomadSdk.deleteLiveOutputProfileGroup(formData.id));
});

getOperatorsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getLiveOperators());
});

getOperatorForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getOperatorForm);
    console.log(await nomadSdk.getLiveOperator(formData.getOperatorId));
});

startBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startBroadcastForm);
    await nomadSdk.startBroadcast(
        formData.startBroadcastChannelId,
        formData.startBroadcastPrerollAssetId,
        formData.startBroadcastPostrollAssetId,
        formData.startBroadcastLiveInputId,
        formData.startBroadcastRelatedAssetIds ? formData.startBroadcastRelatedAssetIds.split(",") : [],
        formData.startBroadcastTagIds ? formData.startBroadcastTagIds.split(",") : []
    );
});

cancelBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(cancelBroadcastForm);
    await nomadSdk.cancelBroadcast(formData.cancelBroadcastChannelId);
});

stopBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopBroadcastForm);
    await nomadSdk.stopBroadcast(formData.stopBroadcastChannelId);
});

getCompletedSegmentsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getCompletedSegmentsForm);
    console.log(await nomadSdk.getCompletedSegments(formData.getCompletedSegmentsChannelId));
});

startSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startSegmentForm);
    await nomadSdk.startSegments(formData.startSegmentChannelId);
});

cancelSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(cancelSegmentForm);
    console.log(await nomadSdk.cancelSegments(formData.cancelSegmentChannelId));
});

completeSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(completeSegmentForm);
    await nomadSdk.completeSegments(
        formData.completeSegmentChannelId,
        formData.completeSegmentRelatedAssetIds ? formData.completeSegmentRelatedAssetIds.split(",") : [],
        formData.completeSegmentTagIds ? formData.completeSegmentTagIds.split(",") : []
    );
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.tagName) continue;
        if (input.type === "file")
        {
            if (input.files && input.files.length > 0)
            {
                formData[input.id || input.name] = input.files[0];
            }
        }
        else if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let option of input.options)
            {
                if (option.selected)
                {
                    if (option.value.trim().toLowerCase() === option.label.trim().toLowerCase())
                    {
                        const value = option.value !== "" ? option.value : null;
                        formData[input.id || input.name] = value;
                    }
                    else
                    {
                        selectedOptions.push({ id: option.value, description: option.label });
                    }
                }
            }
            if (selectedOptions.length > 1)
            {
                formData[input.id || input.name] = JSON.stringify(selectedOptions);
            }
            else if (selectedOptions.length === 1)
            {
                formData[input.id || input.name] = JSON.stringify(selectedOptions[0]);
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            const value = input.value !== "" ? input.value : null;
            formData[input.id || input.name] = value;
        }
    }
    return formData;
}

async function getGroups(contentDefinitionId)
{
    const groupList = [];
    let offset = 0;
    while (true)
    {
        const searchInfo = await nomadSdk.search(
            null, offset, null,
            [
                { 
                    fieldName: "contentDefinitionId", 
                    operator: "Equals", 
                    values: contentDefinitionId 
                },
                { 
                    fieldName: "languageId", 
                    operator: "Equals", 
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8" 
                }
            ],
            null, null, null, null, true, null
        );
        if (!searchInfo)
        {
            return [];
        }
        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100)
        {
            break;
        }
    }
    return groupList;
}

async function populateRelatedContentSelect(contentDefinitionId, relatedContentsSelect)
{
    const relatedContentList = await getGroups(contentDefinitionId);

    relatedContentsSelect.innerHTML = "";

    for (let relatedContent of relatedContentList)
    {
        let option = document.createElement("option");
        option.value = relatedContent.id;
        option.text = relatedContent.title;
        relatedContentsSelect.appendChild(option);
    }

    $(relatedContentsSelect).select2();
}
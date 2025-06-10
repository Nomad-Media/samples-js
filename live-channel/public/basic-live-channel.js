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
    console.log(await nomadSdk.getLiveChannel(formData.get("channelId")));
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
    const securityGroups = formData.get("createSecurityGroups") ? formData.get("createSecurityGroups").split(",") : [];
    console.log(await nomadSdk.createLiveChannel(
        formData.get("createChannelName"),
        formData.get("createChannelThumbnailImage"),
        formData.get("createChannelArchiveFolderAssetId"),
        formData.get("createChannelEnableHighAvailability") === "true",
        formData.get("createChannelEnableLiveClipping") === "true",
        formData.get("createChannelIsSecureOutput") === "true",
        formData.get("createChannelIsOutputScreenshots") === "true",
        formData.get("createChannelType"),
        formData.get("createChannelUrl"),
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
    const channel = JSON.parse(formData.get("updateChannelSelect"));
    const securityGroups = formData.get("updateSecurityGroups") ? formData.get("updateSecurityGroups").split(",") : [];
    console.log(await nomadSdk.updateLiveChannel(
        channel.id,
        formData.get("updateChannelName"),
        formData.get("updateChannelThumbnailImage"),
        formData.get("updateChannelArchiveFolderAssetId"),
        formData.get("updateChannelEnableHighAvailability") === "true",
        formData.get("updateChannelEnableLiveClipping") === "true",
        formData.get("updateChannelIsSecureOutput") === "true",
        formData.get("updateChannelIsOutputScreenshots") === "true",
        formData.get("updateChannelType"),
        formData.get("updateChannelUrl"),
        securityGroups
    ));
});

clipLiveChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(clipLiveChannelForm);
    const liveChannel = JSON.parse(formData.get("clipLiveChannelSelect"));
    let collections = null;
    if (formData.get("clipLiveChannelCollectionsSelect"))
    {
        const parsedCollections = JSON.parse(formData.get("clipLiveChannelCollectionsSelect"));
        collections = Array.isArray(parsedCollections) ? parsedCollections : [parsedCollections];
    }
    let relatedContent = null;
    if (formData.get("clipLiveChannelRelatedContentsSelect"))
    {
        const parsedRelatedContent = JSON.parse(formData.get("clipLiveChannelRelatedContentsSelect"));
        relatedContent = Array.isArray(parsedRelatedContent) ? parsedRelatedContent : [parsedRelatedContent];
    }
    let tags = null;
    if (formData.get("clipLiveChannelTagsSelect"))
    {
        const parsedTags = JSON.parse(formData.get("clipLiveChannelTagsSelect"));
        tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
    }
    console.log(await nomadSdk.clipLiveChannel(
        liveChannel.id,
        formData.get("startTimeCode"),
        formData.get("endTimeCode"),
        formData.get("title"),
        formData.get("outputFolderAssetId"),
        tags,
        collections,
        relatedContent,
        formData.get("videoBitrate"),
        formData.get("audioTracks")
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
    console.log(await nomadSdk.nextEvent(formData.get("channelId")));
});

startOutputTrackingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startOutputTrackingForm);
    console.log(await nomadSdk.startOutputTracking(formData.get("channelId")));
});

moveScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(moveScheduleEventForm);
    console.log(await nomadSdk.moveScheduleEvent(
        formData.get("channelId"),
        formData.get("scheduleEventId"),
        formData.get("previousScheduleEventId")
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
    console.log(await nomadSdk.getLiveInput(formData.get("getInputId")));
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
        formData.get("createInputName"),
        formData.get("createInputSource"),
        formData.get("createInputType"),
        formData.get("createInputIsStandard") === "true",
        formData.get("createInputVideoAssetId"),
        formData.get("createInputDestinations") ? formData.get("createInputDestinations").split(",") : [],
        formData.get("createInputSources") ? formData.get("createInputSources").split(",") : []
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
        formData.get("updateInputId"),
        formData.get("updateInputName"),
        formData.get("updateInputSource"),
        formData.get("updateInputType"),
        formData.get("updateInputIsStandard") === "true",
        formData.get("updateInputVideoAssetId"),
        formData.get("updateInputDestinations") ? formData.get("updateInputDestinations").split(",") : [],
        formData.get("updateInputSources") ? formData.get("updateInputSources").split(",") : []
    ));
});

addAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addAssetScheduleEventForm);
    console.log(await nomadSdk.addAssetScheduleEvent(
        formData.get("addAssetScheduleEventChannelId"),
        {
            id: formData.get("addAssetScheduleEventAssetId"),
            name: formData.get("addAssetScheduleEventAssetName")
        },
        formData.get("addAssetScheduleEventIsLoop") === "true",
        formData.get("addAssetScheduleEventDurationTimeCode"),
        formData.get("addAssetScheduleEventPreviousId")
    ));
});

getAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getAssetScheduleEventForm);
    console.log(await nomadSdk.getAssetScheduleEvent(
        formData.get("channelId"),
        formData.get("scheduleEventId")
    ));
});

updateAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateAssetScheduleEventForm);
    console.log(await nomadSdk.updateAssetScheduleEvent(
        formData.get("scheduleEventId"),
        formData.get("channelId"),
        formData.get("assetId"),
        formData.get("assetName"),
        formData.get("IsLoop") === "true",
        formData.get("DurationTimeCode"),
        formData.get("previousId")
    ));
});

removeAssetScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(removeAssetScheduleEventForm);
    console.log(await nomadSdk.removeAssetScheduleEvent(
        formData.get("removeAssetScheduleEventChannelId"),
        formData.get("removeAssetScheduleEventScheduleEventId")
    ));
});

addInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addInputScheduleEventForm);
    let backupInput = null;
    if (formData.get("addInputScheduleEventBackupInputId"))
    {
        backupInput = {
            id: formData.get("addInputScheduleEventBackupInputId"),
            name: formData.get("addInputScheduleEventBackupInputName")
        };
    }
    console.log(await nomadSdk.addInputScheduleEvent(
        formData.get("addInputScheduleEventChannelId"),
        {
            id: formData.get("addInputScheduleEventInputId"),
            name: formData.get("addInputScheduleEventInputName")
        },
        backupInput,
        formData.get("addInputScheduleEventFixedOnAirTimeUTC"),
        formData.get("addInputScheduleEventPreviousId")
    ));
});

getInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getInputScheduleEventForm);
    console.log(await nomadSdk.getInputScheduleEvent(
        formData.get("channelId"),
        formData.get("scheduleEventId")
    ));
});

updateInputScheduleEventForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateInputScheduleEventForm);
    const input = formData.get("inputId") ? { id: formData.get("inputId"), name: formData.get("inputName") } : null;
    const backupInput = formData.get("backupInputId") ? { id: formData.get("backupInputId"), name: formData.get("backupInputName") } : null;
    const fixedOnAirTimeUTC = formData.get("fixedOnAirTimeUTC") || null;
    console.log(await nomadSdk.updateInputScheduleEvent(
        formData.get("scheduleEventId"),
        formData.get("channelId"),
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
        formData.get("removeInputScheduleEventChannelId"),
        formData.get("removeInputScheduleEventScheduleEventId")
    ));
});

startChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startChannelForm);
    await nomadSdk.startLiveChannel(formData.get("startLiveChannelId"));
});

stopChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopChannelForm);
    await nomadSdk.stopLiveChannel(formData.get("stopLiveChannelId"));
});

deleteChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteChannelForm);
    await nomadSdk.deleteLiveChannel(
        formData.get("deleteChannelId"),
        formData.get("deleteLiveInputs") === "true"
    );
});

deleteInputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteInputForm);
    await nomadSdk.deleteLiveInput(formData.get("deleteInputId"));
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
    console.log(await nomadSdk.getLiveOutputProfile(formData.get("id")));
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
    const outputType = formData.get("createOutputTypeSelect") ? JSON.parse(formData.get("createOutputTypeSelect")) : {};
    console.log(await nomadSdk.createLiveOutputProfile(
        formData.get("name"),
        outputType,
        formData.get("isActive") === "true",
        formData.get("audioBitrate"),
        formData.get("outputStreamKey"),
        formData.get("outputUrl"),
        formData.get("secondaryOutputStreamKey"),
        formData.get("secondaryOutputUrl"),
        formData.get("videoBitrate"),
        formData.get("videoBitrateMode"),
        formData.get("videoCodec"),
        formData.get("videoFramesPerSecond")
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
    const outputType = formData.get("updateOutputTypeSelect") ? JSON.parse(formData.get("updateOutputTypeSelect")) : {};
    console.log(await nomadSdk.updateLiveOutputProfile(
        formData.get("id"),
        formData.get("name"),
        outputType,
        formData.get("isActive") === "true",
        formData.get("audioBitrate"),
        formData.get("outputStreamKey"),
        formData.get("outputUrl"),
        formData.get("secondaryOutputStreamKey"),
        formData.get("secondaryOutputUrl"),
        formData.get("videoBitrate"),
        formData.get("videoBitrateMode"),
        formData.get("videoCodec"),
        formData.get("videoFramesPerSecond")
    ));
});

deleteOutputForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteOutputForm);
    console.log(await nomadSdk.deleteLiveOutputProfile(formData.get("id")));
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
    console.log(await nomadSdk.getLiveOutputProfileGroup(formData.get("id")));
});

createOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createOutputGroupForm);
    const manifestType = formData.get("manifestType") || "both";
    const createOutputGroupType = formData.get("createOutputGroupTypeSelect") ? JSON.parse(formData.get("createOutputGroupTypeSelect")) : null;
    let createOutputGroupArchiveOutputProfileValue = formData.get("createOutputGroupArchiveOutputProfile") ? JSON.parse(formData.get("createOutputGroupArchiveOutputProfile")) : null;
    if (createOutputGroupArchiveOutputProfileValue && createOutputGroupArchiveOutputProfileValue.id === "null") createOutputGroupArchiveOutputProfileValue = null;
    const createOutputGroupOutputProfiles = formData.get("createOutputGroupOutputProfiles") ? JSON.parse(formData.get("createOutputGroupOutputProfiles")) : null;
    console.log(await nomadSdk.createLiveOutputProfileGroup(
        formData.get("name"),
        formData.get("isEnabled") === "true",
        manifestType,
        formData.get("isDefaultGroup") === "true",
        createOutputGroupType,
        createOutputGroupArchiveOutputProfileValue,
        createOutputGroupOutputProfiles
    ));
});

updateOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateOutputGroupForm);
    let manifestType = formData.get("manifestType");
    if (manifestType !== "")
    {
        manifestType = typeof manifestType === "string" ? manifestType : "both";
    }
    const updateOutputGroupType = formData.get("updateOutputGroupTypeSelect") ? JSON.parse(formData.get("updateOutputGroupTypeSelect")) : null;
    let updateOutputGroupArchiveOutputProfileValue = formData.get("updateOutputGroupArchiveOutputProfile") ? JSON.parse(formData.get("updateOutputGroupArchiveOutputProfile")) : null;
    if (updateOutputGroupArchiveOutputProfileValue && updateOutputGroupArchiveOutputProfileValue.id === "null") updateOutputGroupArchiveOutputProfileValue = null;
    let updateOutputGroupOutputProfiles = formData.get("updateOutputGroupOutputProfiles");
    updateOutputGroupOutputProfiles = updateOutputGroupOutputProfiles ? JSON.parse(updateOutputGroupOutputProfiles) : null;
    console.log(await nomadSdk.updateLiveOutputProfileGroup(
        formData.get("id"),
        formData.get("name"),
        formData.get("isEnabled") === "true",
        manifestType,
        formData.get("isDefaultGroup") === "true",
        updateOutputGroupType,
        updateOutputGroupArchiveOutputProfileValue,
        updateOutputGroupOutputProfiles
    ));
});

deleteOutputGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteOutputGroupForm);
    console.log(await nomadSdk.deleteLiveOutputProfileGroup(formData.get("id")));
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
    console.log(await nomadSdk.getLiveOperator(formData.get("getOperatorId")));
});

startBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startBroadcastForm);
    await nomadSdk.startBroadcast(
        formData.get("startBroadcastChannelId"),
        formData.get("startBroadcastPrerollAssetId"),
        formData.get("startBroadcastPostrollAssetId"),
        formData.get("startBroadcastLiveInputId"),
        formData.get("startBroadcastRelatedAssetIds") ? formData.get("startBroadcastRelatedAssetIds").split(",") : [],
        formData.get("startBroadcastTagIds") ? formData.get("startBroadcastTagIds").split(",") : []
    );
});

cancelBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(cancelBroadcastForm);
    await nomadSdk.cancelBroadcast(formData.get("cancelBroadcastChannelId"));
});

stopBroadcastForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopBroadcastForm);
    await nomadSdk.stopBroadcast(formData.get("stopBroadcastChannelId"));
});

getCompletedSegmentsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getCompletedSegmentsForm);
    console.log(await nomadSdk.getCompletedSegments(formData.get("getCompletedSegmentsChannelId")));
});

startSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(startSegmentForm);
    await nomadSdk.startSegments(formData.get("startSegmentChannelId"));
});

cancelSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(cancelSegmentForm);
    console.log(await nomadSdk.cancelSegments(formData.get("cancelSegmentChannelId")));
});

completeSegmentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(completeSegmentForm);
    await nomadSdk.completeSegments(
        formData.get("completeSegmentChannelId"),
        formData.get("completeSegmentRelatedAssetIds") ? formData.get("completeSegmentRelatedAssetIds").split(",") : [],
        formData.get("completeSegmentTagIds") ? formData.get("completeSegmentTagIds").split(",") : []
    );
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let element of input)
            {
                if (element.selected)
                {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase())
                    {
                        if (input.id)
                        {
                            formData.append(input.id, element.value);
                        }
                        else
                        {
                            formData.append(input.name, element.value);
                        }
                    }
                    else
                    {
                        selectedOptions.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (selectedOptions.length > 1)
            {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length === 1)
            {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT")
        {
            if (input.id)
            {
                formData.append(input.id, input.value);
            }
            else
            {
                formData.append(input.name, input.value);
            }
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
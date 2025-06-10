import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createIntelligentPlaylistForm = document.getElementById("createIntelligentPlaylistForm");
const createIntelligentScheduleForm = document.getElementById("createIntelligentScheduleForm");
const createPlaylistForm = document.getElementById("createPlaylistForm");
const createPlaylistVideoForm = document.getElementById("createPlaylistVideoForm");
const createScheduleItemAssetForm = document.getElementById("createScheduleItemAssetForm");
const createScheduleItemLiveChannelForm = document.getElementById("createScheduleItemLiveChannelForm");
const createScheduleItemSearchFilterForm = document.getElementById("createScheduleItemSearchFilterForm");
const createScheduleItemPlaylistScheduleForm = document.getElementById("createScheduleItemPlaylistScheduleForm");
const deleteIntelligentPlaylistForm = document.getElementById("deleteIntelligentPlaylistForm");
const deleteIntelligentScheduleForm = document.getElementById("deleteIntelligentScheduleForm");
const deletePlaylistForm = document.getElementById("deletePlaylistForm");
const deleteScheduleItemForm = document.getElementById("deleteScheduleItemForm");
const getIntelligentPlaylistForm = document.getElementById("getIntelligentPlaylistForm");
const getIntelligentScheduleForm = document.getElementById("getIntelligentScheduleForm");
const getPlaylistForm = document.getElementById("getPlaylistForm");
const getScheduleItemForm = document.getElementById("getScheduleItemForm");
const getScheduleItemsForm = document.getElementById("getScheduleItemsForm");
const getSchedulePreviewForm = document.getElementById("getSchedulePreviewForm");
const moveScheduleItemForm = document.getElementById("moveScheduleItemForm");
const publishIntelligentScheduleForm = document.getElementById("publishIntelligentScheduleForm");
const startScheduleForm = document.getElementById("startScheduleForm");
const stopScheduleForm = document.getElementById("stopScheduleForm");
const updateIntelligentPlaylistForm = document.getElementById("updateIntelligentPlaylistForm");
const updateIntelligentScheduleForm = document.getElementById("updateIntelligentScheduleForm");
const updatePlaylistForm = document.getElementById("updatePlaylistForm");
const updatePlaylistVideoForm = document.getElementById("updatePlaylistVideoForm");
const updateScheduleItemAssetForm = document.getElementById("updateScheduleItemAssetForm");
const updateScheduleItemLiveChannelForm = document.getElementById("updateScheduleItemLiveChannelForm");
const updateScheduleItemSearchFilterForm = document.getElementById("updateScheduleItemSearchFilterForm");
const updateScheduleItemPlaylistScheduleForm = document.getElementById("updateScheduleItemPlaylistScheduleForm");

const createIntelligentPlaylistCollectionsSelect = document.getElementById("createIntelligentPlaylistCollectionsSelect");
const createIntelligentPlaylistRelatedContentsContentDefinitionsSelect = document.getElementById("createIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
const createIntelligentPlaylistRelatedContentsSelect = document.getElementById("createIntelligentPlaylistRelatedContentsSelect");
const createIntelligentPlaylistSearchFilterTypeSelect = document.getElementById("createIntelligentPlaylistSearchFilterTypeSelect");
const createIntelligentPlaylistTagsSelect = document.getElementById("createIntelligentPlaylistTagsSelect");
const createIntelligentScheduleTimeZoneSelect = document.getElementById("createIntelligentScheduleTimeZoneSelect");
const createPlaylistLoopPlaylistSelect = document.getElementById("createPlaylistLoopPlaylistSelect");
const createScheduleItemAssetDays = document.getElementById("createScheduleItemAssetDays");
const createScheduleItemLiveChannelDays = document.getElementById("createScheduleItemLiveChannelDays");
const createScheduleItemLiveChannelsSelect = document.getElementById("createScheduleItemLiveChannelsSelect");
const createScheduleItemSearchFilterCollectionsSelect = document.getElementById("createScheduleItemSearchFilterCollectionsSelect");
const createScheduleItemSearchFilterDays = document.getElementById("createScheduleItemSearchFilterDays");
const createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect = document.getElementById("createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
const createScheduleItemSearchFilterRelatedContentsSelect = document.getElementById("createScheduleItemSearchFilterRelatedContentsSelect");
const createScheduleItemSearchFilterTypeSelect = document.getElementById("createScheduleItemSearchFilterTypeSelect");
const createScheduleItemSearchFilterTagsSelect = document.getElementById("createScheduleItemSearchFilterTagsSelect");
const createScheduleItemPlaylistScheduleDays = document.getElementById("createScheduleItemPlaylistScheduleDays");
const createScheduleItemPlaylistSchedulesSelect = document.getElementById("createScheduleItemPlaylistSchedulesSelect");
const updateIntelligentPlaylistCollectionsSelect = document.getElementById("updateIntelligentPlaylistCollectionsSelect");
const updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect = document.getElementById("updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
const updateIntelligentPlaylistRelatedContentsSelect = document.getElementById("updateIntelligentPlaylistRelatedContentsSelect");
const updateIntelligentPlaylistSearchFilterTypeSelect = document.getElementById("updateIntelligentPlaylistSearchFilterTypeSelect");
const updateIntelligentPlaylistTagsSelect = document.getElementById("updateIntelligentPlaylistTagsSelect");
const updateIntelligentScheduleTimeZoneSelect = document.getElementById("updateIntelligentScheduleTimeZoneSelect");
const updatePlaylistLoopPlaylistSelect = document.getElementById("updatePlaylistLoopPlaylistSelect");
const updateScheduleItemAssetDays = document.getElementById("updateScheduleItemAssetDays");
const updateScheduleItemLiveChannelDays = document.getElementById("updateScheduleItemLiveChannelDays");
const updateScheduleItemLiveChannelsSelect = document.getElementById("updateScheduleItemLiveChannelsSelect");
const updateScheduleItemSearchFilterCollectionsSelect = document.getElementById("updateScheduleItemSearchFilterCollectionsSelect");
const updateScheduleItemSearchFilterDays = document.getElementById("updateScheduleItemSearchFilterDays");
const updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect = document.getElementById("updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
const updateScheduleItemSearchFilterRelatedContentsSelect = document.getElementById("updateScheduleItemSearchFilterRelatedContentsSelect");
const updateScheduleItemSearchFilterTypeSelect = document.getElementById("updateScheduleItemSearchFilterTypeSelect");
const updateScheduleItemSearchFilterTagsSelect = document.getElementById("updateScheduleItemSearchFilterTagsSelect");
const updateScheduleItemPlaylistScheduleDays = document.getElementById("updateScheduleItemPlaylistScheduleDays");
const updateScheduleItemPlaylistSchedulesSelect = document.getElementById("updateScheduleItemPlaylistSchedulesSelect");

const createIntelligentPlaylistSearchFilterTypeDiv = document.getElementById("createIntelligentPlaylistSearchFilterTypeDiv");
const createPlaylistDefaultVideoAssetIdDiv = document.getElementById("createPlaylistDefaultVideoAssetIdDiv");
const createScheduleItemSearchFilterSearchFilterTypeDiv = document.getElementById("createScheduleItemSearchFilterSearchFilterTypeDiv");
const updateIntelligentPlaylistSearchFilterTypeDiv = document.getElementById("updateIntelligentPlaylistSearchFilterTypeDiv");
const updatePlaylistDefaultVideoAssetIdDiv = document.getElementById("updatePlaylistDefaultVideoAssetIdDiv");
const updateScheduleItemSearchFilterSearchFilterTypeDiv = document.getElementById("updateScheduleItemSearchFilterSearchFilterTypeDiv");

const COLLECTION_CONTENT_DEFINITION_ID = "20352932-05d2-4a7a-8821-06fcf4438ced";
const DAY_CONTENT_DEFINITION_ID = "fc8042c1-1ade-400d-b0aa-02937e658ae6";
const INTELLIGENT_PROGRAMMING_CONTENT_DEFINITION_ID = "d77bf165-33e7-4002-9c58-3c9874acf187";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const TIMEZONE_CONTENT_DEFINITION_ID = "6ffc9376-af95-4f70-864e-1b00b8f8a283";

createIntelligentPlaylistSearchFilterTypeSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    createIntelligentPlaylistSearchFilterTypeDiv.hidden = (createIntelligentPlaylistSearchFilterTypeSelect.value !== "2")
});

createPlaylistLoopPlaylistSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    createPlaylistDefaultVideoAssetIdDiv.hidden = (createPlaylistLoopPlaylistSelect.value === "True")
});

createScheduleItemSearchFilterTypeSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    createScheduleItemSearchFilterSearchFilterTypeDiv.hidden = false;

    createScheduleItemSearchFilterSearchFilterTypeDiv.hidden = (createScheduleItemSearchFilterTypeSelect.value !== "2")
});

updateIntelligentPlaylistSearchFilterTypeSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    updateIntelligentPlaylistSearchFilterTypeDiv.hidden = false;

    updateIntelligentPlaylistSearchFilterTypeDiv.hidden = (updateIntelligentPlaylistSearchFilterTypeSelect.value !== "2")
});

updatePlaylistLoopPlaylistSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    updatePlaylistDefaultVideoAssetIdDiv.hidden = (updatePlaylistLoopPlaylistSelect.value === "True")
});

updateScheduleItemSearchFilterTypeSelect.addEventListener("change", async function (event)
{
    event.preventDefault();

    updateScheduleItemSearchFilterSearchFilterTypeDiv.hidden = false;

    updateScheduleItemSearchFilterSearchFilterTypeDiv.hidden = (updateScheduleItemSearchFilterTypeSelect.value !== "2")
});

getCollections();
async function getCollections()
{
    const collections = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);
    for (let collection of collections)
    {
        const option = document.createElement("option");
        option.value = collection.id;
        option.textContent = collection.title;
        createIntelligentPlaylistCollectionsSelect.appendChild(option);
        createScheduleItemSearchFilterCollectionsSelect.appendChild(option.cloneNode(true));
        updateIntelligentPlaylistCollectionsSelect.appendChild(option.cloneNode(true));
        updateScheduleItemSearchFilterCollectionsSelect.appendChild(option.cloneNode(true));
    }
    $(createIntelligentPlaylistCollectionsSelect).select2();
    $(createScheduleItemSearchFilterCollectionsSelect).select2();
    $(updateIntelligentPlaylistCollectionsSelect).select2();
    $(updateScheduleItemSearchFilterCollectionsSelect).select2();
}

getContentDefinitions();
async function getContentDefinitions()
{
    const contentDefinitions = await nomadSdk.miscFunctions("contentDefinition", "GET");
    for (let contentDefinition of contentDefinitions.items)
    {
        const option = document.createElement("option");
        option.value = contentDefinition.contentDefinitionId;
        option.textContent = contentDefinition.properties.title;
        createIntelligentPlaylistRelatedContentsContentDefinitionsSelect.appendChild(option);

        const option2 = document.createElement("option");
        option2.value = contentDefinition.contentDefinitionId;
        option2.textContent = contentDefinition.properties.title;
        createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect.appendChild(option2);

        const option3 = document.createElement("option");
        option3.value = contentDefinition.contentDefinitionId;
        option3.textContent = contentDefinition.properties.title;
        updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect.appendChild(option3);

        const option4 = document.createElement("option");
        option4.value = contentDefinition.contentDefinitionId;
        option4.textContent = contentDefinition.properties.title;
        updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect.appendChild(option4);
    }
    $(createIntelligentPlaylistRelatedContentsContentDefinitionsSelect).select2();
    $(createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect).select2();
    $(updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect).select2();
    $(updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect).select2();
}

getDays();
async function getDays()
{
    const days = await getGroups(DAY_CONTENT_DEFINITION_ID);
    const ORDERED_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    days.sort((a, b) => ORDERED_DAYS.indexOf(a.title) - ORDERED_DAYS.indexOf(b.title));
    for (let day of days)
    {
        const option = document.createElement("option");
        option.value = day.id;
        option.textContent = day.title;
        createScheduleItemAssetDays.appendChild(option);
        createScheduleItemLiveChannelDays.appendChild(option.cloneNode(true));
        createScheduleItemSearchFilterDays.appendChild(option.cloneNode(true));
        createScheduleItemPlaylistScheduleDays.appendChild(option.cloneNode(true));
        updateScheduleItemAssetDays.appendChild(option.cloneNode(true));
        updateScheduleItemLiveChannelDays.appendChild(option.cloneNode(true));
        updateScheduleItemSearchFilterDays.appendChild(option.cloneNode(true));
        updateScheduleItemPlaylistScheduleDays.appendChild(option.cloneNode(true));
    }
    $(createScheduleItemAssetDays).select2();
    $(createScheduleItemLiveChannelDays).select2();
    $(createScheduleItemSearchFilterDays).select2();
    $(createScheduleItemPlaylistScheduleDays).select2();
    $(updateScheduleItemAssetDays).select2();
    $(updateScheduleItemLiveChannelDays).select2();
    $(updateScheduleItemSearchFilterDays).select2();
    $(updateScheduleItemPlaylistScheduleDays).select2();
}

getLiveChannels();
async function getLiveChannels()
{
    const liveChannels = await nomadSdk.getLiveChannels();
    for (let liveChannel of liveChannels)
    {
        const option = document.createElement("option");
        option.value = liveChannel.id;
        option.textContent = liveChannel.name;
        createScheduleItemLiveChannelsSelect.appendChild(option);
        updateScheduleItemLiveChannelsSelect.appendChild(option.cloneNode(true));
    }
    $(createScheduleItemLiveChannelsSelect).select2();
    $(updateScheduleItemLiveChannelsSelect).select2();
}

getPlaylistSchedules();
async function getPlaylistSchedules()
{
    const playlistSchedules = await getGroups(INTELLIGENT_PROGRAMMING_CONTENT_DEFINITION_ID);
    const playlists = playlistSchedules.filter(item => item.identifiers.scheduleType === 4);
    for (let playlistSchedule of playlists)
    {
        const option = document.createElement("option");
        option.value = playlistSchedule.id;
        option.textContent = playlistSchedule.title;
        createScheduleItemPlaylistSchedulesSelect.appendChild(option);
        updateScheduleItemPlaylistSchedulesSelect.appendChild(option.cloneNode(true));
    }
    $(createScheduleItemPlaylistSchedulesSelect).select2();
    $(updateScheduleItemPlaylistSchedulesSelect).select2();
}

$("#createIntelligentPlaylistRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#createIntelligentPlaylistRelatedContentsSelect").empty();
    event.preventDefault();
    const relatedContents = await getGroups(event.params.data.id);
    for (let relatedContent of relatedContents)
    {
        const option = document.createElement("option");
        option.value = relatedContent.id;
        option.textContent = relatedContent.title;
        createIntelligentPlaylistRelatedContentsSelect.appendChild(option);
    }
    $(createIntelligentPlaylistRelatedContentsSelect).select2();
});

$("#createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#createScheduleItemSearchFilterRelatedContentsSelect").empty();
    event.preventDefault();
    const relatedContents = await getGroups(event.params.data.id);
    for (let relatedContent of relatedContents)
    {
        const option = document.createElement("option");
        option.value = relatedContent.id;
        option.textContent = relatedContent.title;
        createScheduleItemSearchFilterRelatedContentsSelect.appendChild(option);
    }
    $(createScheduleItemSearchFilterRelatedContentsSelect).select2();
});

$("#updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#updateIntelligentPlaylistRelatedContentsSelect").empty();
    event.preventDefault();
    const relatedContents = await getGroups(event.params.data.id);
    for (let relatedContent of relatedContents)
    {
        const option = document.createElement("option");
        option.value = relatedContent.id;
        option.textContent = relatedContent.title;
        updateIntelligentPlaylistRelatedContentsSelect.appendChild(option);
    }
    $(updateIntelligentPlaylistRelatedContentsSelect).select2();
});

$("#updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#updateScheduleItemSearchFilterRelatedContentsSelect").empty();
    event.preventDefault();
    const relatedContents = await getGroups(event.params.data.id);
    for (let relatedContent of relatedContents)
    {
        const option = document.createElement("option");
        option.value = relatedContent.id;
        option.textContent = relatedContent.title;
        updateScheduleItemSearchFilterRelatedContentsSelect.appendChild(option);
    }
    $(updateScheduleItemSearchFilterRelatedContentsSelect).select2();
});

getTags();
async function getTags()
{
    const tags = await getGroups(TAG_CONTENT_DEFINITION_ID);
    for (let tag of tags)
    {
        const option = document.createElement("option");
        option.value = tag.id;
        option.textContent = tag.title;
        createIntelligentPlaylistTagsSelect.appendChild(option);
        createScheduleItemSearchFilterTagsSelect.appendChild(option.cloneNode(true));
        updateIntelligentPlaylistTagsSelect.appendChild(option.cloneNode(true));
        updateScheduleItemSearchFilterTagsSelect.appendChild(option.cloneNode(true));
    }
    $(createIntelligentPlaylistTagsSelect).select2();
    $(createScheduleItemSearchFilterTagsSelect).select2();
    $(updateIntelligentPlaylistTagsSelect).select2();
    $(updateScheduleItemSearchFilterTagsSelect).select2();
}

getTimeZones();
async function getTimeZones()
{
    const timeZones = await getGroups(TIMEZONE_CONTENT_DEFINITION_ID);
    for (let timeZone of timeZones)
    {
        const option = document.createElement("option");
        option.value = timeZone.id;
        option.textContent = timeZone.title;
        createIntelligentScheduleTimeZoneSelect.appendChild(option);
        updateIntelligentScheduleTimeZoneSelect.appendChild(option.cloneNode(true));
    }
    $(createIntelligentScheduleTimeZoneSelect).select2();
    $(updateIntelligentScheduleTimeZoneSelect).select2();
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
                    values: contentDefinitionId,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null
        );
        if (!searchInfo) return [];
        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100) break;
    }
    return groupList;
}

createIntelligentPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createIntelligentPlaylistForm);

    let collections = null;
    if (formData.get("createIntelligentPlaylistCollectionsSelect"))
    {
        const parsed = JSON.parse(formData.get("createIntelligentPlaylistCollectionsSelect"));
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.get("createIntelligentPlaylistRelatedContentsSelect"))
    {
        const parsed = JSON.parse(formData.get("createIntelligentPlaylistRelatedContentsSelect"));
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        relatedContents.forEach(item => {
            item["type"] = formData.get("createIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
        });
    }

    let tags = null;
    if (formData.get("createIntelligentPlaylistTagsSelect"))
    {
        const parsed = JSON.parse(formData.get("createIntelligentPlaylistTagsSelect"));
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.createIntelligentPlaylist(
        collections,
        formData.get("endSearchDate"),
        formData.get("endSearchDurationInMinutes"),
        formData.get("name"),
        relatedContents,
        formData.get("searchDate"),
        formData.get("searchDurationInMinutes"),
        formData.get("createIntelligentPlaylistSearchFilterTypeSelect"),
        tags,
        thumbnailAsset
    );
    console.log(result);
});

createIntelligentScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createIntelligentScheduleForm);

    const defaultVideoAsset = formData.get("defaultVideoAssetId") ? { id: formData.get("defaultVideoAssetId") } : null;
    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.createIntelligentSchedule(
        defaultVideoAsset,
        formData.get("name"),
        thumbnailAsset,
        formData.get("createIntelligentScheduleTimeZoneSelect")
    );
    console.log(result);
});

createPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createPlaylistForm);

    const defaultVideoAsset = (formData.get("defaultVideoAssetId") && formData.get("createPlaylistLoopPlaylistSelect") === "False")
        ? { id: formData.get("defaultVideoAssetId") }
        : null;
    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.createPlaylist(
        formData.get("name"),
        thumbnailAsset,
        formData.get("createPlaylistLoopPlaylistSelect") === "True",
        defaultVideoAsset
    );
    console.log(result);
});

createPlaylistVideoForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createPlaylistVideoForm);

    const result = await nomadSdk.createPlaylistVideo(
        formData.get("playlistId"),
        { id: formData.get("assetId") },
        formData.get("previousItem")
    );
    console.log(result);
});

createScheduleItemAssetForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createScheduleItemAssetForm);

    let days = null;
    if (formData.get("createScheduleItemAssetDays"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemAssetDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const result = await nomadSdk.createScheduleItemAsset(
        formData.get("scheduleId"),
        { id: formData.get("assetId") },
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        formData.get("previousItem"),
        formData.get("timeCode")
    );
    console.log(result);
});

createScheduleItemLiveChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createScheduleItemLiveChannelForm);

    let days = null;
    if (formData.get("createScheduleItemLiveChannelDays"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemLiveChannelDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const liveChannel = JSON.parse(formData.get("createScheduleItemLiveChannelsSelect"));

    const result = await nomadSdk.createScheduleItemLiveChannel(
        formData.get("scheduleId"),
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        liveChannel,
        formData.get("previousItem"),
        formData.get("timeCode")
    );
    console.log(result);
});

createScheduleItemSearchFilterForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createScheduleItemSearchFilterForm);

    let collections = null;
    if (formData.get("createScheduleItemSearchFilterCollectionsSelect"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemSearchFilterCollectionsSelect"));
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let days = null;
    if (formData.get("createScheduleItemSearchFilterDays"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemSearchFilterDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.get("createScheduleItemSearchFilterRelatedContentsSelect"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemSearchFilterRelatedContentsSelect"));
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        relatedContents.forEach(item => {
            item["type"] = formData.get("createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
        });
    }

    let tags = null;
    if (formData.get("createScheduleItemSearchFilterTagsSelect"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemSearchFilterTagsSelect"));
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    const result = await nomadSdk.createScheduleItemSearchFilter(
        formData.get("scheduleId"),
        collections,
        days,
        formData.get("durationTimeCode"),
        formData.get("endSearchDate"),
        formData.get("endSearchDurationInMinutes"),
        formData.get("endTimeCode"),
        formData.get("previousItem"),
        relatedContents,
        formData.get("searchDate"),
        formData.get("searchDurationInMinutes"),
        formData.get("createScheduleItemSearchFilterTypeSelect"),
        tags,
        formData.get("timeCode")
    );
    console.log(result);
});

createScheduleItemPlaylistScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createScheduleItemPlaylistScheduleForm);

    let days = null;
    if (formData.get("createScheduleItemPlaylistScheduleDays"))
    {
        const parsed = JSON.parse(formData.get("createScheduleItemPlaylistScheduleDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const playlistSchedule = JSON.parse(formData.get("createScheduleItemPlaylistSchedulesSelect"));

    const result = await nomadSdk.createScheduleItemPlaylistSchedule(
        formData.get("scheduleId"),
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        playlistSchedule,
        formData.get("previousItem"),
        formData.get("timeCode")
    );
    console.log(result);
});

deleteIntelligentPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteIntelligentPlaylistForm);

    await nomadSdk.deleteIntelligentPlaylist(formData.get("scheduleId"));
    console.log("Deleted intelligent playlist");
});

deleteIntelligentScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteIntelligentScheduleForm);

    await nomadSdk.deleteIntelligentSchedule(formData.get("scheduleId"));
    console.log("Deleted intelligent schedule");
});

deletePlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deletePlaylistForm);

    await nomadSdk.deletePlaylist(formData.get("scheduleId"));
    console.log("Deleted playlist");
});

deleteScheduleItemForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteScheduleItemForm);

    await nomadSdk.deleteScheduleItem(formData.get("scheduleId"), formData.get("itemId"));
    console.log("Deleted schedule item");
});

getPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getPlaylistForm);

    const result = await nomadSdk.getPlaylist(formData.get("scheduleId"));
    console.log(result);
});

getIntelligentPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getIntelligentPlaylistForm);

    const result = await nomadSdk.getIntelligentPlaylist(formData.get("scheduleId"));
    console.log(result);
});

getIntelligentScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getIntelligentScheduleForm);

    const result = await nomadSdk.getIntelligentSchedule(formData.get("scheduleId"));
    console.log(result);
});

getScheduleItemForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getScheduleItemForm);

    const result = await nomadSdk.getScheduleItem(formData.get("scheduleId"), formData.get("itemId"));
    console.log(result);
});

getScheduleItemsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getScheduleItemsForm);

    const result = await nomadSdk.getScheduleItems(formData.get("scheduleId"));
    console.log(result);
});

getSchedulePreviewForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getSchedulePreviewForm);

    const result = await nomadSdk.getSchedulePreview(formData.get("scheduleId"));
    console.log(result);
});

moveScheduleItemForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(moveScheduleItemForm);

    const result = await nomadSdk.moveScheduleItem(
        formData.get("scheduleId"),
        formData.get("itemId"),
        formData.get("previousItem")
    );
    console.log(result);
});

publishIntelligentScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(publishIntelligentScheduleForm);

    const result = await nomadSdk.publishIntelligentSchedule(
        formData.get("scheduleId"),
        formData.get("numberOfLockedDays")
    );
    console.log(result);
});

startScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(startScheduleForm);

    const result = await nomadSdk.startSchedule(
        formData.get("scheduleId"),
        formData.get("skipCleanupOnFailure") === "True"
    );
    console.log(result);
});

stopScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(stopScheduleForm);

    const result = await nomadSdk.stopSchedule(
        formData.get("scheduleId"),
        formData.get("forceStop") === "True"
    );
    console.log(result);
});

updateIntelligentPlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateIntelligentPlaylistForm);

    let collections = null;
    if (formData.get("updateIntelligentPlaylistCollectionsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateIntelligentPlaylistCollectionsSelect"));
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.get("updateIntelligentPlaylistRelatedContentsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateIntelligentPlaylistRelatedContentsSelect"));
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        relatedContents.forEach(item => {
            item["type"] = formData.get("updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
        });
    }

    let tags = null;
    if (formData.get("updateIntelligentPlaylistTagsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateIntelligentPlaylistTagsSelect"));
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.updateIntelligentPlaylist(
        formData.get("scheduleId"),
        collections,
        formData.get("endSearchDate"),
        formData.get("endSearchDurationInMinutes"),
        formData.get("name"),
        relatedContents,
        formData.get("searchDate"),
        formData.get("searchDurationInMinutes"),
        formData.get("updateIntelligentPlaylistSearchFilterTypeSelect"),
        tags,
        thumbnailAsset
    );
    console.log(result);
});

updateIntelligentScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateIntelligentScheduleForm);

    const defaultVideoAsset = formData.get("defaultVideoAssetId") ? { id: formData.get("defaultVideoAssetId") } : null;
    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.updateIntelligentSchedule(
        formData.get("scheduleId"),
        defaultVideoAsset,
        formData.get("name"),
        thumbnailAsset,
        formData.get("updateIntelligentScheduleTimeZoneSelect")
    );
    console.log(result);
});

updatePlaylistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updatePlaylistForm);

    const defaultVideoAsset = (formData.get("defaultVideoAssetId") && formData.get("updatePlaylistLoopPlaylistSelect") === "False")
        ? { id: formData.get("defaultVideoAssetId") }
        : null;
    const thumbnailAsset = formData.get("thumbnailAssetId") ? { id: formData.get("thumbnailAssetId") } : null;

    const result = await nomadSdk.updatePlaylist(
        formData.get("scheduleId"),
        defaultVideoAsset,
        formData.get("updatePlaylistLoopPlaylistSelect") === "True",
        formData.get("name"),
        thumbnailAsset
    );
    console.log(result);
});

updatePlaylistVideoForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updatePlaylistVideoForm);

    const result = await nomadSdk.updatePlaylistVideo(
        formData.get("playlistId"),
        formData.get("itemId"),
        { id: formData.get("assetId") }
    );
    console.log(result);
});

updateScheduleItemAssetForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateScheduleItemAssetForm);

    let days = null;
    if (formData.get("updateScheduleItemAssetDays"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemAssetDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const result = await nomadSdk.updateScheduleItemAsset(
        formData.get("scheduleId"),
        formData.get("itemId"),
        { id: formData.get("assetId") },
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        formData.get("timeCode")
    );
    console.log(result);
});

updateScheduleItemLiveChannelForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateScheduleItemLiveChannelForm);

    let days = null;
    if (formData.get("updateScheduleItemLiveChannelDays"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemLiveChannelDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const liveChannel = JSON.parse(formData.get("updateScheduleItemLiveChannelsSelect"));

    const result = await nomadSdk.updateScheduleItemLiveChannel(
        formData.get("scheduleId"),
        formData.get("itemId"),
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        liveChannel,
        formData.get("timeCode")
    );
    console.log(result);
});

updateScheduleItemSearchFilterForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateScheduleItemSearchFilterForm);

    let collections = null;
    if (formData.get("updateScheduleItemSearchFilterCollectionsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemSearchFilterCollectionsSelect"));
        collections = Array.isArray(parsed) ? parsed : [parsed];
    }

    let days = null;
    if (formData.get("updateScheduleItemSearchFilterDays"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemSearchFilterDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    let relatedContents = null;
    if (formData.get("updateScheduleItemSearchFilterRelatedContentsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemSearchFilterRelatedContentsSelect"));
        relatedContents = Array.isArray(parsed) ? parsed : [parsed];
        relatedContents.forEach(item => {
            item["type"] = formData.get("updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
        });
    }

    let tags = null;
    if (formData.get("updateScheduleItemSearchFilterTagsSelect"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemSearchFilterTagsSelect"));
        tags = Array.isArray(parsed) ? parsed : [parsed];
    }

    const result = await nomadSdk.updateScheduleItemSearchFilter(
        formData.get("scheduleId"),
        formData.get("itemId"),
        collections,
        days,
        formData.get("durationTimeCode"),
        formData.get("endSearchDate"),
        formData.get("endSearchDurationInMinutes"),
        formData.get("endTimeCode"),
        relatedContents,
        formData.get("searchDate"),
        formData.get("searchDurationInMinutes"),
        formData.get("updateScheduleItemSearchFilterTypeSelect"),
        tags,
        formData.get("timeCode")
    );
    console.log(result);
});

updateScheduleItemPlaylistScheduleForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateScheduleItemPlaylistScheduleForm);

    let days = null;
    if (formData.get("updateScheduleItemPlaylistScheduleDays"))
    {
        const parsed = JSON.parse(formData.get("updateScheduleItemPlaylistScheduleDays"));
        days = Array.isArray(parsed) ? parsed : [parsed];
    }

    const playlistSchedule = JSON.parse(formData.get("updateScheduleItemPlaylistSchedulesSelect"));

    const result = await nomadSdk.updateScheduleItemPlaylistSchedule(
        formData.get("scheduleId"),
        formData.get("itemId"),
        days,
        formData.get("durationTimeCode"),
        formData.get("endTimeCode"),
        playlistSchedule,
        formData.get("timeCode")
    );
    console.log(result);
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
                    if (input.id)
                    {
                        formData.append(input.id, element.value);
                    }
                    else
                    {
                        formData.append(input.name, element.value);
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
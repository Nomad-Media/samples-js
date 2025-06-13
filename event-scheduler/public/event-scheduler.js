import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createForm = document.getElementById("createForm");
const addForm = document.getElementById("addForm");
const extendForm = document.getElementById("extendForm");
const getForm = document.getElementById("getForm");
const startForm = document.getElementById("startForm");
const stopForm = document.getElementById("stopForm");
const deleteForm = document.getElementById("deleteForm");

const createOrUpdateEventDiv = document.getElementById("createOrUpdateEventDiv");
const nameDiv = document.getElementById("nameDiv");
const addPropertiesDiv = document.getElementById("addPropertiesDiv");
const propertiesDiv = document.getElementById("propertiesDiv");

const createOrUpdateEventSelect = document.getElementById("createOrUpdateEventSelect");
const eventTypeSelect = document.getElementById("eventTypeSelect");
const seriesSelect = document.getElementById("seriesSelect");
const overrideSeriesDetailsSelect = document.getElementById("overrideSeriesDetailsSelect");
const primaryLivestreamInputSelect = document.getElementById("primaryLivestreamInputSelect");
const backupLivestreamInputSelect = document.getElementById("backupLivestreamInputSelect");
const externalOutputProfilesSelect = document.getElementById("externalOutputProfilesSelect");
const daysOfTheWeekSelect = document.getElementById("daysOfTheWeekSelect");

const addPropertyButton = document.getElementById("addPropertyButton");

const seriesContentDefinitionId = "9c1713ce-006c-4dc7-afb6-028df1fb3bf3";
const eventTypeContentDefinitionId = "0ee492a3-7875-4288-8690-f9895a44cb43";
const eventContentDefinitionId = "412a30e3-73ee-4eae-b739-e1fc87601c7d";
const inputContentDefinitionId = "4ce6e254-01e9-44b8-9f20-4691140db3ce";
const externalOutputProfilesPath = "lookup/33?lookupKey=99e8767a-00ba-4758-b9c2-e07b52c47021";
const daysContentDefinitionId = "fc8042c1-1ade-400d-b0aa-02937e658ae6"

createOrUpdateEventSelect.addEventListener("change", function (event)
{
    event.preventDefault();

    createOrUpdateEventSelect.value === "create"
        ? createOrUpdateEventDiv.hidden = true
        : createOrUpdateEventDiv.hidden = false;
});

getEventList();

async function getEventList()
{
    const eventList = await getGroups(eventTypeContentDefinitionId);

    for (let eventIdx = 0; eventIdx < eventList.length; ++eventIdx)
    {
        let option = document.createElement("option");
        option.value = eventList[eventIdx].id;
        option.text = eventList[eventIdx].title;
        eventTypeSelect.appendChild(option);
    }

    $(eventTypeSelect).select2();
}

getSeriesList();

async function getSeriesList()
{
    const seriesList = await getGroups(seriesContentDefinitionId);

    for (let seriesIdx = 0; seriesIdx < seriesList.length; ++seriesIdx)
    {
        let option = document.createElement("option");
        option.value = seriesList[seriesIdx].id;
        option.text = seriesList[seriesIdx].title;
        seriesSelect.appendChild(option);
    }

    $(seriesSelect).select2({
        placeholder: "Select a series",
        allowClear: true
    });
}

getDaysOfTheWeekList();

async function getDaysOfTheWeekList()
{
    const days = await getGroups(daysContentDefinitionId);

    const orderedDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    days.sort((a, b) => orderedDays.indexOf(a.title) - orderedDays.indexOf(b.title));

    for (let daysOfTheWeekIdx = 0; daysOfTheWeekIdx < days.length; ++daysOfTheWeekIdx)
    {
        let option = document.createElement("option");
        option.value = days[daysOfTheWeekIdx].id;
        option.text = days[daysOfTheWeekIdx].title;
        daysOfTheWeekSelect.appendChild(option);
    }

    $(daysOfTheWeekSelect).select2();
}

overrideSeriesDetailsSelect.addEventListener("change", function (event)
{
    event.preventDefault();

    if (overrideSeriesDetailsSelect.value === "true")
    {
        addPropertiesDiv.hidden = false;
        nameDiv.hidden = false;
    }
    else
    {
        addPropertiesDiv.hidden = true;
        nameDiv.hidden = true;
    }
});

addPropertyButton.addEventListener("click", function (event)
{
    event.preventDefault();

    let keyInput = document.createElement("input");
    keyInput.type = "text";
    keyInput.placeholder = "Key";
    keyInput.name = "key";
    keyInput.style.width = "100px";

    let valueInput = document.createElement("input");
    valueInput.type = "text";
    valueInput.name = "value";
    valueInput.placeholder = "Value";

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");
    let br3 = document.createElement("br");
    let br4 = document.createElement("br");

    propertiesDiv.appendChild(keyInput);
    propertiesDiv.appendChild(valueInput);
    propertiesDiv.appendChild(br1);
    propertiesDiv.appendChild(br2);

    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function (event)
    {
        event.preventDefault();

        propertiesDiv.removeChild(keyInput);
        propertiesDiv.removeChild(valueInput);
        propertiesDiv.removeChild(br1);
        propertiesDiv.removeChild(br2);
        propertiesDiv.removeChild(br3);
        propertiesDiv.removeChild(br4);
    });

    propertiesDiv.appendChild(removeButton);
    propertiesDiv.appendChild(br3);
    propertiesDiv.appendChild(br4);
});

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createForm);

    let contentId = formData.createOrUpdateEventSelect === "update" ? formData.contnetId : null;

    let name = null;
    if (formData.seriesSelect)
    {
        if (formData.name === "" || formData.name === null)
        {
            name = JSON.parse(formData.seriesSelect).description;
        }
        else
        {
            name = formData.name;
        }
    }

    const eventType = JSON.parse(formData.eventTypeSelect);
    const series = formData.seriesSelect ? JSON.parse(formData.seriesSelect) : null;

    const properties = {};
    const keys = [];
    const values = [];
    for (let input of createForm.elements)
    {
        if (input.name === "key") keys.push(input.value);
        if (input.name === "value") values.push(input.value);
    }
    for (let i = 0; i < keys.length; ++i)
    {
        let value = values[i];
        try
        {
            value = JSON.parse(value);
        }
        catch (error) {}
        properties[keys[i]] = value;
    }

    const eventId = await nomadSdk.createAndUpdateEvent(
        contentId, eventContentDefinitionId, name, formData.startDatetime, formData.endDatetime,
        eventType, series, formData.isDisabled === "true", formData.overrideSeriesDetailsSelect === "true",
        properties
    );

    console.log(eventId);
});

primaryLiveInputList();

async function primaryLiveInputList()
{
    const inputList = await getGroups(inputContentDefinitionId);

    for (let idx = 0; idx < inputList.length; ++idx)
    {
        let option = document.createElement("option");
        option.value = inputList[idx].id;
        option.text = inputList[idx].title;
        primaryLivestreamInputSelect.appendChild(option);

        let option2 = document.createElement("option");
        option2.value = inputList[idx].id;
        option2.text = inputList[idx].title;
        backupLivestreamInputSelect.appendChild(option2);
    }

    $(primaryLivestreamInputSelect).select2();
    $(backupLivestreamInputSelect).select2();
}

externalOutputProfilesList();

async function externalOutputProfilesList()
{
    const externalOutputProfilesList = await nomadSdk.miscFunctions(
        externalOutputProfilesPath, "GET"
    );

    for (let idx = 0; idx < externalOutputProfilesList.items.length; ++idx)
    {
        let option = document.createElement("option");
        option.value = externalOutputProfilesList.items[idx].id;
        option.text = externalOutputProfilesList.items[idx].description;
        externalOutputProfilesSelect.appendChild(option);
    }

    $(externalOutputProfilesSelect).select2();
}

addForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addForm);

    const slateVideo = !formData.slateVideoId
        ? null : { id: formData.slateVideoId, description: formData.slateVideoName };
    const prerollVideo = !formData.prerollVideoId
        ? null : { id: formData.prerollVideoId, description: formData.prerollVideoName };
    const postrollVideo = !formData.postrollVideoId
        ? null : { id: formData.postrollVideoId, description: formData.postrollVideoName };
    const archiveFolder = !formData.archiveFolderId
        ? null : { id: formData.archiveFolderId, description: formData.archiveFolderName };
    const primaryLivestreamInput = formData.primaryLivestreamInputSelect
        ? JSON.parse(formData.primaryLivestreamInputSelect) : null;
    const backupLivestreamInput = formData.backupLivestreamInputSelect
        ? JSON.parse(formData.backupLivestreamInputSelect) : null;
    const externalOutputProfiles = formData.externalOutputProfilesSelect
        ? Array.isArray(JSON.parse(formData.externalOutputProfilesSelect))
            ? JSON.parse(formData.externalOutputProfilesSelect)
            : [JSON.parse(formData.externalOutputProfilesSelect)]
        : null;

    await nomadSdk.addLiveScheduleToEvent(
        formData.addEventId, slateVideo, prerollVideo, postrollVideo, formData.isSecureOutput === "true",
        archiveFolder, primaryLivestreamInput, backupLivestreamInput, formData.primaryLivesteamInputUrl,
        formData.backupLivestreamInputUrl, externalOutputProfiles
    );
});

extendForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(extendForm);

    await nomadSdk.extendLiveSchedule(
        formData.extendEventId, JSON.parse(formData.daysOfTheWeekSelect), formData.recurringWeeks,
        formData.endDatetime, formData.timeZoneOffsetSeconds
    );
});

getForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getForm);

    const eventInfo = await nomadSdk.getLiveSchedule(formData.getEventId);
    console.log(eventInfo);
});

startForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(startForm);

    await nomadSdk.startLiveSchedule(formData.startEventId);
});

stopForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(stopForm);

    await nomadSdk.stopLiveSchedule(formData.stopEventId);
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteForm);

    await nomadSdk.deleteEvent(formData.deleteId, formData.deleteContentDefinitionId);
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.tagName) continue;
        if (input.tagName === "SELECT")
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
        else if (input.tagName === "INPUT")
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
                { fieldName: "contentDefinitionId", operator: "Equals", values: contentDefinitionId },
                { fieldName: "languageId", operator: "Equals", values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8" }
            ], null, null, null, null, true, null
        );
        if (!searchInfo) return [];

        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100) break;
    }
    return groupList;
}
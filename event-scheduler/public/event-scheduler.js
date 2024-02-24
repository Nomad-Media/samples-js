const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const EXTEND_FORM = document.getElementById("extendForm");
const GET_FORM = document.getElementById("getForm");
const START_FORM = document.getElementById("startForm");
const STOP_FORM = document.getElementById("stopForm");
const DELETE_FORM = document.getElementById("deleteForm");

const CREATE_OR_UPDATE_EVENT_DIV = document.getElementById("createOrUpdateEventDiv");
const NAME_DIV = document.getElementById("nameDiv");
const ADD_PROPERTIES_DIV = document.getElementById("addPropertiesDiv");
const PROPERTIES_DIV = document.getElementById("propertiesDiv");

const CREATE_OR_UPDATE_EVENT_SELECT = document.getElementById("createOrUpdateEventSelect");
const EVENT_TYPE_SELECT = document.getElementById("eventTypeSelect");
const SERIES_SELECT = document.getElementById("seriesSelect");
const OVERRIDE_SERIES_DETAILS_SELECT = document.getElementById("overrideSeriesDetailsSelect");
const PRIMARY_LIVESTREAM_INPUT_SELECT = document.getElementById("primaryLivestreamInputSelect");
const BACKUP_LIVESTREAM_INPUT_SELECT = document.getElementById("backupLivestreamInputSelect");
const EXTERNAL_OUTPUT_PROFILES_SELECT = document.getElementById("externalOutputProfilesSelect");
const DAYS_OF_THE_WEEK_SELECT = document.getElementById("daysOfTheWeekSelect");

const ADD_PROPERTY_BUTTON = document.getElementById("addPropertyButton");

CREATE_OR_UPDATE_EVENT_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_OR_UPDATE_EVENT_SELECT.value === "create" 
        ? CREATE_OR_UPDATE_EVENT_DIV.hidden = true 
        : CREATE_OR_UPDATE_EVENT_DIV.hidden = false;
});

await getEventList();

async function getEventList()
{
    const EVENT_LIST = await sendRequest("/get-event-list", "GET");

    for(let eventIdx = 0; eventIdx < EVENT_LIST.length; ++eventIdx)
    {
        let option = document.createElement("option");
        option.value = EVENT_LIST[eventIdx].id;
        option.text = EVENT_LIST[eventIdx].title;
        EVENT_TYPE_SELECT.appendChild(option);
    }

    $(EVENT_TYPE_SELECT).select2();
    
}

await getSeriesList();

async function getSeriesList()
{
    const SERIES_LIST = await sendRequest("/get-series-list", "GET");

    for(let seriesIdx = 0; seriesIdx < SERIES_LIST.length; ++seriesIdx)
    {
        let option = document.createElement("option");
        option.value = SERIES_LIST[seriesIdx].id;
        option.text = SERIES_LIST[seriesIdx].title;
        SERIES_SELECT.appendChild(option);
    }

    $(SERIES_SELECT).select2({
        placeholder: "Select a series",
        allowClear: true
    });
}

await getDaysOfTheWeekList();

async function getDaysOfTheWeekList()
{
    const DAYS = await sendRequest("/get-days-list", "GET");

    const ORDERED_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    DAYS.sort((a, b) => ORDERED_DAYS.indexOf(a.title) - ORDERED_DAYS.indexOf(b.title));

    for(let daysOfTheWeekIdx = 0; daysOfTheWeekIdx < DAYS.length; ++daysOfTheWeekIdx)
    {
        let option = document.createElement("option");
        option.value = DAYS[daysOfTheWeekIdx].id;
        option.text = DAYS[daysOfTheWeekIdx].title;
        DAYS_OF_THE_WEEK_SELECT.appendChild(option);
    }

    $(DAYS_OF_THE_WEEK_SELECT).select2();
}

OVERRIDE_SERIES_DETAILS_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    if (OVERRIDE_SERIES_DETAILS_SELECT.value === "true")
    {
        ADD_PROPERTIES_DIV.hidden = false;
        NAME_DIV.hidden = false;
    }
    else
    {
        ADD_PROPERTIES_DIV.hidden = true;
        NAME_DIV.hidden = true;
    }
});

ADD_PROPERTY_BUTTON.addEventListener("click", async function (event)
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

    PROPERTIES_DIV.appendChild(keyInput);
    PROPERTIES_DIV.appendChild(valueInput);
    PROPERTIES_DIV.appendChild(br1);
    PROPERTIES_DIV.appendChild(br2);

    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function (event)
    {
        event.preventDefault();

        PROPERTIES_DIV.removeChild(keyInput);
        PROPERTIES_DIV.removeChild(valueInput);
        PROPERTIES_DIV.removeChild(removeButton);
        PROPERTIES_DIV.removeChild(br1);
        PROPERTIES_DIV.removeChild(br2);
        PROPERTIES_DIV.removeChild(br3);
        PROPERTIES_DIV.removeChild(br4);
    });

    PROPERTIES_DIV.appendChild(removeButton);
    PROPERTIES_DIV.appendChild(br3);
    PROPERTIES_DIV.appendChild(br4);
});

CREATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    console.log(await sendRequest("/create-event", "POST", FORM_DATA));
});

await primaryLiveInputList();

async function primaryLiveInputList()
{
    const PRIMARY_LIVESTREAM_INPUT_LIST = await sendRequest("/get-livestream-input-list", "GET");

    for(let primaryLiveInputIdx = 0; primaryLiveInputIdx < PRIMARY_LIVESTREAM_INPUT_LIST.length; ++primaryLiveInputIdx)
    {
        let option = document.createElement("option");
        option.value = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].id;
        option.text = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].title;
        PRIMARY_LIVESTREAM_INPUT_SELECT.appendChild(option);

        let option2 = document.createElement("option");
        option2.value = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].id;
        option2.text = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].title;
        BACKUP_LIVESTREAM_INPUT_SELECT.appendChild(option2);
    }

    $(PRIMARY_LIVESTREAM_INPUT_SELECT).select2();
    $(BACKUP_LIVESTREAM_INPUT_SELECT).select2();
}

await externalOutputProfilesList();

async function externalOutputProfilesList()
{
    const EXTERNAL_OUTPUT_PROFILES_LIST = await sendRequest("/get-external-output-profiles-list", "GET");

    for(let externalOutputProfilesIdx = 0; externalOutputProfilesIdx < EXTERNAL_OUTPUT_PROFILES_LIST.length; ++externalOutputProfilesIdx)
    {
        let option = document.createElement("option");
        option.value = EXTERNAL_OUTPUT_PROFILES_LIST[externalOutputProfilesIdx].id;
        option.text = EXTERNAL_OUTPUT_PROFILES_LIST[externalOutputProfilesIdx].description;
        EXTERNAL_OUTPUT_PROFILES_SELECT.appendChild(option);
    }

    $(EXTERNAL_OUTPUT_PROFILES_SELECT).select2();
}

ADD_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_FORM);

    await sendRequest("/add-event", "POST", FORM_DATA);
});

EXTEND_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(EXTEND_FORM);

    await sendRequest("/extend-event", "POST", FORM_DATA);
});

GET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_FORM);

    console.log(await sendRequest("/get-event", "POST", FORM_DATA));
});

START_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_FORM);

    await sendRequest("/start-event", "POST", FORM_DATA);
});

STOP_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_FORM);

    await sendRequest("/stop-event", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    sendRequest("/delete-event", "POST", FORM_DATA);
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "SELECT") {
            const SELECTED_OPTIONS = []
            for (let element of input) {
                if (element.selected) {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) {
                        if (input.id) {
                            FORM_DATA.append(input.id, element.value);
                        } else {
                            FORM_DATA.append(input.name, element.value);
                        }
                    } else {
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
            if (input.id) {
                FORM_DATA.append(input.id, input.value);
            } else {
                FORM_DATA.append(input.name, input.value);
            }
        }
    }
    return FORM_DATA;
}

async function sendRequest(PATH, METHOD, BODY)
{
    try
    {
        const REQUEST = { method: METHOD };
        if (BODY) REQUEST["body"] = BODY;
        const RESPONSE = await fetch(PATH, REQUEST);

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json();
            if (DATA) return DATA;
        }
        else
        {
            const INFO = await RESPONSE.json();
            console.error(JSON.stringify(INFO, null, 4));
            console.error("HTTP-Error: " + RESPONSE.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}
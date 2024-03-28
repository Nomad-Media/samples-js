const CREATE_LIVE_OUTPUT_PROFILE_FORM = document.getElementById("createLiveOutputProfileForm");
const DELETE_LIVE_OUTPUT_PROFILE_FORM = document.getElementById("deleteLiveOutputProfileForm");
const GET_LIVE_OUTPUT_PROFILE_FORM = document.getElementById("getLiveOutputProfileForm");
const GET_LIVE_OUTPUT_PROFILES_FORM = document.getElementById("getLiveOutputProfilesForm");
const GET_LIVE_OUTPUT_TYPES_FORM = document.getElementById("getLiveOutputTypesForm");
const UPDATE_LIVE_OUTPUT_PROFILE_FORM = document.getElementById("updateLiveOutputProfileForm");

const CREATE_LIVE_OUTPUT_TYPE_SELECT = document.getElementById("createLiveOutputTypeSelect");
const UPDATE_LIVE_OUTPUT_TYPE_SELECT = document.getElementById("updateLiveOutputTypeSelect");

await getLiveOutputTypes();

async function getLiveOutputTypes()
{
    const RESPONSE = await sendRequest("/get-live-output-types", "GET");
    const LIVE_OUTPUT_TYPES = RESPONSE.items;

    for(let liveOutputTypeIdx = 0; liveOutputTypeIdx < LIVE_OUTPUT_TYPES.length; ++liveOutputTypeIdx)
    {
        let option = document.createElement("option");
        option.value = LIVE_OUTPUT_TYPES[liveOutputTypeIdx].id;
        option.text = LIVE_OUTPUT_TYPES[liveOutputTypeIdx].description;
        CREATE_LIVE_OUTPUT_TYPE_SELECT.appendChild(option);
        UPDATE_LIVE_OUTPUT_TYPE_SELECT.appendChild(option.cloneNode(true));
    }

    $(CREATE_LIVE_OUTPUT_TYPE_SELECT).select2();
    $(UPDATE_LIVE_OUTPUT_TYPE_SELECT).select2();
}

CREATE_LIVE_OUTPUT_PROFILE_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_LIVE_OUTPUT_PROFILE_FORM);

    await sendRequest("/create-live-output-profile", "POST", FORM_DATA);
});

DELETE_LIVE_OUTPUT_PROFILE_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_LIVE_OUTPUT_PROFILE_FORM);

    await sendRequest("/delete-live-output-profile", "POST", FORM_DATA);
});

GET_LIVE_OUTPUT_PROFILE_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_LIVE_OUTPUT_PROFILE_FORM);

    await sendRequest("/get-live-output-profile", "POST", FORM_DATA);
});

GET_LIVE_OUTPUT_PROFILES_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    await sendRequest("/get-live-output-profiles", "GET");
});

GET_LIVE_OUTPUT_TYPES_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    await getLiveOutputTypes();
});

UPDATE_LIVE_OUTPUT_PROFILE_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_LIVE_OUTPUT_PROFILE_FORM);

    await sendRequest("/update-live-output-profile", "PUT", FORM_DATA);
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
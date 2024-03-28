const CREATE_LIVE_OUTPUT_PROFILE_GROUP_FORM = document.getElementById("createLiveOutputProfileGroupForm");
const DELETE_LIVE_OUTPUT_PROFILE_GROUP_FORM = document.getElementById("deleteLiveOutputProfileGroupForm");
const GET_LIVE_OUTPUT_PROFILE_GROUP_FORM = document.getElementById("getLiveOutputProfileGroupForm");
const GET_LIVE_OUTPUT_PROFILE_GROUPS_FORM = document.getElementById("getLiveOutputProfileGroupsForm");
const UPDATE_LIVE_OUTPUT_PROFILE_GROUP_FORM = document.getElementById("updateLiveOutputProfileGroupForm");

const CREATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT = document.getElementById("createLiveOutputGroupOutputTypeSelect");
const CREATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT = document.getElementById("createLiveOutputGroupArchiveLiveOutputProfileSelect");
const CREATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT = document.getElementById("createLiveOutputGroupLiveOutputProfilesSelect");
const UPDATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT = document.getElementById("updateLiveOutputGroupOutputTypeSelect");
const UPDATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT = document.getElementById("updateLiveOutputGroupArchiveLiveOutputProfileSelect");
const UPDATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT = document.getElementById("updateLiveOutputGroupLiveOutputProfilesSelect");

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
        CREATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT.appendChild(option);
        UPDATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT.appendChild(option.cloneNode(true));
    }

    $(CREATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT).select2();
    $(UPDATE_LIVE_OUTPUT_GROUP_OUTPUT_TYPE_SELECT).select2();
}

await getLiveOutputProfile();

async function getLiveOutputProfile()
{
    const LIVE_OUTPUT_PROFILES = await sendRequest("/get-live-output-profiles", "GET");

    for(let liveOutputProfileIdx = 0; liveOutputProfileIdx < LIVE_OUTPUT_PROFILES.length; ++liveOutputProfileIdx)
    {
        let option = document.createElement("option");
        option.value = LIVE_OUTPUT_PROFILES[liveOutputProfileIdx].id;
        option.text = LIVE_OUTPUT_PROFILES[liveOutputProfileIdx].name;
        CREATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT.appendChild(option);
        CREATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT.appendChild(option.cloneNode(true));
        UPDATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT.appendChild(option.cloneNode(true));
        UPDATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT.appendChild(option.cloneNode(true));
    }

    $(CREATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT).select2();
    $(CREATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT).select2();
    $(UPDATE_LIVE_OUTPUT_GROUP_ARCHIVE_LIVE_OUTPUT_PROFILE_SELECT).select2();
    $(UPDATE_LIVE_OUTPUT_GROUP_LIVE_OUTPUT_PROFILES_SELECT).select2();
}

CREATE_LIVE_OUTPUT_PROFILE_GROUP_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_LIVE_OUTPUT_PROFILE_GROUP_FORM);

    await sendRequest("/create-live-output-profile-group", "POST", FORM_DATA);
});

DELETE_LIVE_OUTPUT_PROFILE_GROUP_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_LIVE_OUTPUT_PROFILE_GROUP_FORM);

    await sendRequest("/delete-live-output-profile-group", "POST", FORM_DATA);
});

GET_LIVE_OUTPUT_PROFILE_GROUP_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_LIVE_OUTPUT_PROFILE_GROUP_FORM);

    await sendRequest("/get-live-output-profile-group", "POST", FORM_DATA);
});

GET_LIVE_OUTPUT_PROFILE_GROUPS_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    await sendRequest("/get-live-output-profile-groups", "GET");
});

UPDATE_LIVE_OUTPUT_PROFILE_GROUP_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_LIVE_OUTPUT_PROFILE_GROUP_FORM);

    await sendRequest("/update-live-output-profile-group", "PUT", FORM_DATA);
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
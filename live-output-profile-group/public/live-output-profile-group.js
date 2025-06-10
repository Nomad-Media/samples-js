const createLiveOutputProfileGroupForm = document.getElementById("createLiveOutputProfileGroupForm");
const deleteLiveOutputProfileGroupForm = document.getElementById("deleteLiveOutputProfileGroupForm");
const getLiveOutputProfileGroupForm = document.getElementById("getLiveOutputProfileGroupForm");
const getLiveOutputProfileGroupsForm = document.getElementById("getLiveOutputProfileGroupsForm");
const updateLiveOutputProfileGroupForm = document.getElementById("updateLiveOutputProfileGroupForm");

const createLiveOutputGroupOutputTypeSelect = document.getElementById("createLiveOutputGroupOutputTypeSelect");
const createLiveOutputGroupArchiveLiveOutputProfileSelect = document.getElementById("createLiveOutputGroupArchiveLiveOutputProfileSelect");
const createLiveOutputGroupLiveOutputProfilesSelect = document.getElementById("createLiveOutputGroupLiveOutputProfilesSelect");
const updateLiveOutputGroupOutputTypeSelect = document.getElementById("updateLiveOutputGroupOutputTypeSelect");
const updateLiveOutputGroupArchiveLiveOutputProfileSelect = document.getElementById("updateLiveOutputGroupArchiveLiveOutputProfileSelect");
const updateLiveOutputGroupLiveOutputProfilesSelect = document.getElementById("updateLiveOutputGroupLiveOutputProfilesSelect");

getLiveOutputTypes();

async function getLiveOutputTypes()
{
    const response = await sendRequest("/get-live-output-types", "GET");
    const liveOutputTypes = response.items;

    for (let liveOutputTypeIdx = 0; liveOutputTypeIdx < liveOutputTypes.length; ++liveOutputTypeIdx)
    {
        let option = document.createElement("option");
        option.value = liveOutputTypes[liveOutputTypeIdx].id;
        option.text = liveOutputTypes[liveOutputTypeIdx].description;
        createLiveOutputGroupOutputTypeSelect.appendChild(option);
        updateLiveOutputGroupOutputTypeSelect.appendChild(option.cloneNode(true));
    }

    $(createLiveOutputGroupOutputTypeSelect).select2();
    $(updateLiveOutputGroupOutputTypeSelect).select2();
}

getLiveOutputProfile();

async function getLiveOutputProfile()
{
    const liveOutputProfiles = await sendRequest("/get-live-output-profiles", "GET");

    for (let liveOutputProfileIdx = 0; liveOutputProfileIdx < liveOutputProfiles.length; ++liveOutputProfileIdx)
    {
        let option = document.createElement("option");
        option.value = liveOutputProfiles[liveOutputProfileIdx].id;
        option.text = liveOutputProfiles[liveOutputProfileIdx].name;
        createLiveOutputGroupArchiveLiveOutputProfileSelect.appendChild(option);
        createLiveOutputGroupLiveOutputProfilesSelect.appendChild(option.cloneNode(true));
        updateLiveOutputGroupArchiveLiveOutputProfileSelect.appendChild(option.cloneNode(true));
        updateLiveOutputGroupLiveOutputProfilesSelect.appendChild(option.cloneNode(true));
    }

    $(createLiveOutputGroupArchiveLiveOutputProfileSelect).select2();
    $(createLiveOutputGroupLiveOutputProfilesSelect).select2();
    $(updateLiveOutputGroupArchiveLiveOutputProfileSelect).select2();
    $(updateLiveOutputGroupLiveOutputProfilesSelect).select2();
}

createLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createLiveOutputProfileGroupForm);

    let type = formData.get("createLiveOutputGroupOutputTypeSelect") ? JSON.parse(formData.get("createLiveOutputGroupOutputTypeSelect")) : null;
    type = type && type.id === "" ? null : type;

    let archiveOutputProfiles = formData.get("createLiveOutputGroupArchiveLiveOutputProfileSelect") ? JSON.parse(formData.get("createLiveOutputGroupArchiveLiveOutputProfileSelect")) : null;
    archiveOutputProfiles = archiveOutputProfiles && archiveOutputProfiles.id === "" ? null : archiveOutputProfiles;

    let outputProfiles = formData.get("createLiveOutputGroupLiveOutputProfilesSelect") ? JSON.parse(formData.get("createLiveOutputGroupLiveOutputProfilesSelect")) : null;
    outputProfiles = outputProfiles && outputProfiles.id === "" ? null : outputProfiles;

    await sendRequest("/create-live-output-profile-group", "POST", {
        name: formData.get("name"),
        isEnabled: formData.get("isEnabled") === "true",
        manifestType: formData.get("manifestType"),
        isDefaultGroup: formData.get("isDefaultGroup") === "true",
        type,
        archiveOutputProfiles,
        outputProfiles
    });
});

deleteLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteLiveOutputProfileGroupForm);

    await sendRequest("/delete-live-output-profile-group", "POST", {
        id: formData.get("id")
    });
});

getLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getLiveOutputProfileGroupForm);

    await sendRequest("/get-live-output-profile-group", "POST", {
        id: formData.get("id")
    });
});

getLiveOutputProfileGroupsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/get-live-output-profile-groups", "GET");
});

updateLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateLiveOutputProfileGroupForm);

    let type = formData.get("updateLiveOutputGroupOutputTypeSelect") ? JSON.parse(formData.get("updateLiveOutputGroupOutputTypeSelect")) : null;
    type = type && type.id === "" ? null : type;

    let archiveOutputProfiles = formData.get("updateLiveOutputGroupArchiveLiveOutputProfileSelect") ? JSON.parse(formData.get("updateLiveOutputGroupArchiveLiveOutputProfileSelect")) : null;
    archiveOutputProfiles = archiveOutputProfiles && archiveOutputProfiles.id === "" ? null : archiveOutputProfiles;

    let outputProfiles = formData.get("updateLiveOutputGroupLiveOutputProfilesSelect") ? JSON.parse(formData.get("updateLiveOutputGroupLiveOutputProfilesSelect")) : null;
    outputProfiles = outputProfiles && outputProfiles.id === "" ? null : outputProfiles;

    await sendRequest("/update-live-output-profile-group", "PUT", {
        id: formData.get("id"),
        name: formData.get("name"),
        isEnabled: formData.get("isEnabled") === "true",
        manifestType: formData.get("manifestType"),
        isDefaultGroup: formData.get("isDefaultGroup") === "true",
        type,
        archiveOutputProfiles,
        outputProfiles
    });
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

async function sendRequest(path, method, body)
{
    try
    {
        const request = { method: method };
        if (body)
        {
            request.headers = { "Content-Type": "application/json" };
            request.body = JSON.stringify(body);
        }
        const response = await fetch(path, request);

        if (response.ok)
        {
            const data = await response.json();
            if (data) return data;
        }
        else
        {
            const info = await response.json();
            console.error(JSON.stringify(info, null, 4));
            console.error("HTTP-Error: " + response.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}
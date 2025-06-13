import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

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
getLiveOutputProfile();

async function getLiveOutputTypes()
{
    const response = await nomadSdk.getLiveOutputTypes();
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

async function getLiveOutputProfile()
{
    const liveOutputProfiles = await nomadSdk.getLiveOutputProfiles();

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

    let type = formData.createLiveOutputGroupOutputTypeSelect ? JSON.parse(formData.createLiveOutputGroupOutputTypeSelect) : null;
    type = type && type.id === "" ? null : type;

    let archiveOutputProfiles = formData.createLiveOutputGroupArchiveLiveOutputProfileSelect ? JSON.parse(formData.createLiveOutputGroupArchiveLiveOutputProfileSelect) : null;
    archiveOutputProfiles = archiveOutputProfiles && archiveOutputProfiles.id === "" ? null : archiveOutputProfiles;

    let outputProfiles = formData.createLiveOutputGroupLiveOutputProfilesSelect ? JSON.parse(formData.createLiveOutputGroupLiveOutputProfilesSelect) : null;
    outputProfiles = outputProfiles && outputProfiles.id === "" ? null : outputProfiles;

    await nomadSdk.createLiveOutputProfileGroup(
        formData.name,
        formData.isEnabled === "true",
        formData.manifestType,
        formData.isDefaultGroup === "true",
        type,
        archiveOutputProfiles,
        outputProfiles
    );
});

deleteLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteLiveOutputProfileGroupForm);

    await nomadSdk.deleteLiveOutputProfileGroup(formData.id);
});

getLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getLiveOutputProfileGroupForm);

    await nomadSdk.getLiveOutputProfileGroup(formData.id);
});

getLiveOutputProfileGroupsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const response = await nomadSdk.getLiveOutputProfileGroups();
    console.log(response);
});

updateLiveOutputProfileGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateLiveOutputProfileGroupForm);

    let type = formData.updateLiveOutputGroupOutputTypeSelect ? JSON.parse(formData.updateLiveOutputGroupOutputTypeSelect) : null;
    type = type && type.id === "" ? null : type;

    let archiveOutputProfiles = formData.updateLiveOutputGroupArchiveLiveOutputProfileSelect ? JSON.parse(formData.updateLiveOutputGroupArchiveLiveOutputProfileSelect) : null;
    archiveOutputProfiles = archiveOutputProfiles && archiveOutputProfiles.id === "" ? null : archiveOutputProfiles;

    let outputProfiles = formData.updateLiveOutputGroupLiveOutputProfilesSelect ? JSON.parse(formData.updateLiveOutputGroupLiveOutputProfilesSelect) : null;
    outputProfiles = outputProfiles && outputProfiles.id === "" ? null : outputProfiles;

    await nomadSdk.updateLiveOutputProfileGroup(
        formData.id,
        formData.name,
        formData.isEnabled === "true",
        formData.manifestType,
        formData.isDefaultGroup === "true",
        type,
        archiveOutputProfiles,
        outputProfiles
    );
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
            formData[input.id || input.name] = input.value !== "" ? input.value : null;
        }
    }
    return formData;
}
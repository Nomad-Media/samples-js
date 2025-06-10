import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createLiveOutputProfileForm = document.getElementById("createLiveOutputProfileForm");
const deleteLiveOutputProfileForm = document.getElementById("deleteLiveOutputProfileForm");
const getLiveOutputProfileForm = document.getElementById("getLiveOutputProfileForm");
const getLiveOutputProfilesForm = document.getElementById("getLiveOutputProfilesForm");
const getLiveOutputTypesForm = document.getElementById("getLiveOutputTypesForm");
const updateLiveOutputProfileForm = document.getElementById("updateLiveOutputProfileForm");

const createLiveOutputTypeSelect = document.getElementById("createLiveOutputTypeSelect");
const updateLiveOutputTypeSelect = document.getElementById("updateLiveOutputTypeSelect");

getLiveOutputTypes();

async function getLiveOutputTypes()
{
    const response = await nomadSdk.getLiveOutputTypes();
    const liveOutputTypes = response.items;

    for (let liveOutputTypeIdx = 0; liveOutputTypeIdx < liveOutputTypes.length; ++liveOutputTypeIdx)
    {
        let option = document.createElement("option");
        option.value = liveOutputTypes[liveOutputTypeIdx].id;
        option.text = liveOutputTypes[liveOutputTypeIdx].description;
        createLiveOutputTypeSelect.appendChild(option);
        updateLiveOutputTypeSelect.appendChild(option.cloneNode(true));
    }

    $(createLiveOutputTypeSelect).select2();
    $(updateLiveOutputTypeSelect).select2();
}

createLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createLiveOutputProfileForm);

    let type = formData.get("createLiveOutputTypeSelect") ? JSON.parse(formData.get("createLiveOutputTypeSelect")) : null;
    type = type && type.id === "" ? null : type;

    let videoBitrateMode = formData.get("videoBitrateMode") ? JSON.parse(formData.get("videoBitrateMode")) : null;
    videoBitrateMode = videoBitrateMode && videoBitrateMode.id === "" ? null : videoBitrateMode;

    let videoCodec = formData.get("videoCodec") ? JSON.parse(formData.get("videoCodec")) : null;
    videoCodec = videoCodec && videoCodec.id === "" ? null : videoCodec;

    const response = await nomadSdk.createLiveOutputProfile(
        formData.get("name"),
        type,
        formData.get("enabled") === "true",
        formData.get("audioBitrate"),
        formData.get("outputStreamKey"),
        formData.get("outputUrl"),
        formData.get("secondaryOutputKey"),
        formData.get("secondaryOutputUrl"),
        formData.get("videoBitrate"),
        videoBitrateMode,
        videoCodec,
        formData.get("videoHeight"),
        formData.get("videoWidth")
    );
    console.log(response);
});

deleteLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteLiveOutputProfileForm);

    const response = await nomadSdk.deleteLiveOutputProfile(formData.get("id"));
    console.log(response);
});

getLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getLiveOutputProfileForm);

    const response = await nomadSdk.getLiveOutputProfile(formData.get("id"));
    console.log(response);
});

getLiveOutputProfilesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const response = await nomadSdk.getLiveOutputProfiles();
    console.log(response);
});

getLiveOutputTypesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await getLiveOutputTypes();
});

updateLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateLiveOutputProfileForm);

    let type = formData.get("updateLiveOutputTypeSelect") ? JSON.parse(formData.get("updateLiveOutputTypeSelect")) : null;
    type = type && type.id === "" ? null : type;

    let videoBitrateMode = formData.get("videoBitrateMode") ? JSON.parse(formData.get("videoBitrateMode")) : null;
    videoBitrateMode = videoBitrateMode && videoBitrateMode.id === "" ? null : videoBitrateMode;

    let videoCodec = formData.get("videoCodec") ? JSON.parse(formData.get("videoCodec")) : null;
    videoCodec = videoCodec && videoCodec.id === "" ? null : videoCodec;

    const response = await nomadSdk.updateLiveOutputProfile(
        formData.get("id"),
        formData.get("name"),
        type,
        formData.get("enabled") === "true",
        formData.get("audioBitrate"),
        formData.get("outputStreamKey"),
        formData.get("outputUrl"),
        formData.get("secondaryOutputKey"),
        formData.get("secondaryOutputUrl"),
        formData.get("videoBitrate"),
        videoBitrateMode,
        videoCodec,
        formData.get("videoHeight"),
        formData.get("videoWidth")
    );
    console.log(response);
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
}
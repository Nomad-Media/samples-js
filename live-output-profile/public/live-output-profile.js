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

    let type = formData.createLiveOutputTypeSelect ? JSON.parse(formData.createLiveOutputTypeSelect) : null;
    type = type && type.id === "" ? null : type;

    let videoBitrateMode = formData.videoBitrateMode ? JSON.parse(formData.videoBitrateMode) : null;
    videoBitrateMode = videoBitrateMode && videoBitrateMode.id === "" ? null : videoBitrateMode;

    let videoCodec = formData.videoCodec ? JSON.parse(formData.videoCodec) : null;
    videoCodec = videoCodec && videoCodec.id === "" ? null : videoCodec;

    const response = await nomadSdk.createLiveOutputProfile(
        formData.name,
        type,
        formData.enabled === "true",
        formData.audioBitrate,
        formData.outputStreamKey,
        formData.outputUrl,
        formData.secondaryOutputKey,
        formData.secondaryOutputUrl,
        formData.videoBitrate,
        videoBitrateMode,
        videoCodec,
        formData.videoHeight,
        formData.videoWidth
    );
    console.log(response);
});

deleteLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteLiveOutputProfileForm);

    const response = await nomadSdk.deleteLiveOutputProfile(formData.id);
    console.log(response);
});

getLiveOutputProfileForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getLiveOutputProfileForm);

    const response = await nomadSdk.getLiveOutputProfile(formData.id);
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

    let type = formData.updateLiveOutputTypeSelect ? JSON.parse(formData.updateLiveOutputTypeSelect) : null;
    type = type && type.id === "" ? null : type;

    let videoBitrateMode = formData.videoBitrateMode ? JSON.parse(formData.videoBitrateMode) : null;
    videoBitrateMode = videoBitrateMode && videoBitrateMode.id === "" ? null : videoBitrateMode;

    let videoCodec = formData.videoCodec ? JSON.parse(formData.videoCodec) : null;
    videoCodec = videoCodec && videoCodec.id === "" ? null : videoCodec;

    const response = await nomadSdk.updateLiveOutputProfile(
        formData.id,
        formData.name,
        type,
        formData.enabled === "true",
        formData.audioBitrate,
        formData.outputStreamKey,
        formData.outputUrl,
        formData.secondaryOutputKey,
        formData.secondaryOutputUrl,
        formData.videoBitrate,
        videoBitrateMode,
        videoCodec,
        formData.videoHeight,
        formData.videoWidth
    );
    console.log(response);
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
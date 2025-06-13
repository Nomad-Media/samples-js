import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createForm = document.getElementById("createForm");
const createJobIdForm = document.getElementById("createJobIdForm");

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createForm);

    try
    {
        const requestedTasks = formData.requestedTasks ? formData.requestedTasks.split(",") : null;
        const requestedTranscodeProfiles = formData.requestedTranscodeProfiles 
            ? formData.requestedTranscodeProfiles.split(",") 
            : null;
        const replaceExistingJob = formData.replaceExistingJob === "true";

        const response = await nomadSdk.createJob(
            formData.bucketName,
            formData.objectKey,
            formData.notificationCallbackUrl,
            requestedTasks,
            formData.externalId,
            requestedTranscodeProfiles,
            replaceExistingJob,
            formData.assetUrl
        );

        console.log(response);
    }
    catch (error)
    {
        console.error(error);
    }
});

createJobIdForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createJobIdForm);

    try
    {
        const response = await nomadSdk.createJobId(
            formData.assetId,
            formData.jobResultUrl,
            formData.externalId
        );

        console.log(response);
    }
    catch (error)
    {
        console.error(error);
    }   
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
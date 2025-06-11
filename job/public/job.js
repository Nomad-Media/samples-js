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
        const requestedTasks = formData.get("requestedTasks") ? formData.get("requestedTasks").split(",") : null;
        const requestedTranscodeProfiles = formData.get("requestedTranscodeProfiles") ? formData.get("requestedTranscodeProfiles").split(",") : null;
        const replaceExistingJob = formData.get("replaceExistingJob") === "true";

        const response = await nomadSdk.createJob(
            formData.get("bucketName"),
            formData.get("objectKey"),
            formData.get("notificationCallbackUrl"),
            requestedTasks,
            formData.get("externalId"),
            requestedTranscodeProfiles,
            replaceExistingJob,
            formData.get("assetUrl")
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
            formData.get("assetId"),
            formData.get("jobResultUrl"),
            formData.get("externalId")
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
    const formData = new FormData();
    for (let input of form)
    {
        if (input.id === "") continue;
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
            if (input.multiple)
            {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length > 0)
            {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
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
import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const videoTrackingForm = document.getElementById("videoTrackingForm");

videoTrackingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(videoTrackingForm);

    try
    {
        const trackingInfo = await nomadSdk.getVideoTracking(
            formData.assetId,
            formData.trackingEvent,
            formData.seconds
        );
        console.log(trackingInfo);
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
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let option of input.options)
            {
                if (option.selected)
                {
                    if (option.value.trim().toLowerCase() === option.label.trim().toLowerCase())
                    {
                        formData[input.id || input.name] = option.value !== "" ? option.value : null;
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
            if (input.type === "file")
            {
                if (input.files && input.files.length > 0)
                {
                    formData[input.id || input.name] = input.files[0];
                }
            }
            else
            {
                formData[input.id || input.name] = input.value !== "" ? input.value : null;
            }
        }
    }
    return formData;
}
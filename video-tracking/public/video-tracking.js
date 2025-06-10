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
            formData.get("assetId"),
            formData.get("trackingEvent"),
            formData.get("seconds")
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
                    if (element.value === element.label)
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
            if (input.type === "file")
            {
                formData.append(input.id, input.files[0]);
            }
            else
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
    return formData;
}
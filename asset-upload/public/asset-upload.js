import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const uploadAssetForm = document.getElementById("uploadAssetForm");
const uploadRelatedAssetForm = document.getElementById("uploadRelatedAssetForm");

uploadAssetForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(uploadAssetForm);

    const uploadReplaceOverwriteOptions = formData.uploadReplaceOverwriteOptions
        ? formData.uploadReplaceOverwriteOptions.split(",").map(option => option.trim())
        : null;

    await nomadSdk.uploadAsset(
        formData.name,
        formData.existingAssetId,
        formData.relatedContentId,
        formData.uploadOverwriteOption,
        formData.file,
        formData.parentId,
        formData.languageId,
        uploadReplaceOverwriteOptions
    );
});

uploadRelatedAssetForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(uploadRelatedAssetForm);

    await nomadSdk.uploadRelatedAsset(
        formData.existingAssetId,
        formData.relatedAssetId,
        formData.newRelatedAssetMetadataType,
        formData.uploadOverwriteOption,
        formData.file,
        formData.parentId,
        formData.languageId
    );
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
        else if (input.tagName === "INPUT")
        {
            const value = input.value !== "" ? input.value : null;
            formData[input.id || input.name] = value;
        }
    }
    return formData;
}
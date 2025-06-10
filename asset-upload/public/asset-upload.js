import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const uploadAssetForm = document.getElementById("uploadAssetForm");
const uploadRelatedAssetForm = document.getElementById("uploadRelatedAssetForm");

uploadAssetForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = getElements(uploadAssetForm);

    const name = formData.get("name");
    const existingAssetId = formData.get("existingAssetId");
    const relatedContentId = formData.get("relatedContentId");
    const uploadOverwriteOption = formData.get("uploadOverwriteOption");
    const file = formData.get("file");
    const parentId = formData.get("parentId");
    const languageId = formData.get("languageId");

    await nomadSdk.uploadAsset(
        name,
        existingAssetId,
        relatedContentId,
        uploadOverwriteOption,
        file,
        parentId,
        languageId
    );
});

uploadRelatedAssetForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = getElements(uploadRelatedAssetForm);

    const existingAssetId = formData.get("existingAssetId");
    const relatedAssetId = formData.get("relatedAssetId");
    const newRelatedAssetMetadataType = formData.get("newRelatedAssetMetadataType");
    const uploadOverwriteOption = formData.get("uploadOverwriteOption");
    const file = formData.get("file");
    const parentId = formData.get("parentId");
    const languageId = formData.get("languageId");

    await nomadSdk.uploadRelatedAsset(
        existingAssetId,
        relatedAssetId,
        newRelatedAssetMetadataType,
        uploadOverwriteOption,
        file,
        parentId,
        languageId
    );
});

function getElements(form) {
    const formData = new FormData();
    for (let input of form) {
        if (input.type === "file") {
            for (let file of input.files) {
                formData.append(input.id, file);
            }
        }
        else if (input.tagName === "SELECT") {
            const selectedOptions = [];
            for (let element of input) {
                if (element.selected) {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) {
                        if (input.id) {
                            formData.append(input.id, element.value);
                        } else {
                            formData.append(input.name, element.value);
                        }
                    } else {
                        selectedOptions.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (selectedOptions.length > 1) {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length === 1) {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT") {
            if (input.id) {
                formData.append(input.id, input.value);
            } else {
                formData.append(input.name, input.value);
            }
        }
    }
    return formData;
}
import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const addTagForm = document.getElementById("addTagOrCollectionForm");
const removeTagForm = document.getElementById("removeTagOrCollectionForm");
const deleteTagForm = document.getElementById("deleteTagOrCollectionForm");
const addRelatedContentForm = document.getElementById("addRelatedContentForm");
const deleteRelatedContentForm = document.getElementById("deleteRelatedContentForm");
const addCustomPropertiesForm = document.getElementById("addCustomProperties");

const addTagOrCollection = document.getElementById("addTagOrCollection");
const addTagNameLabel = document.getElementById("addTagNameLabel");
const createNew = document.getElementById("createNew");
const addTagIdLabel = document.getElementById("addTagIdLabel");
const removeTagOrCollection = document.getElementById("removeTagOrCollection");
const removeTagIdLabel = document.getElementById("removeTagIdLabel");
const deleteTagOrCollection = document.getElementById("deleteTagOrCollection");
const deleteTagIdLabel = document.getElementById("deleteTagIdLabel");

const tagIdDiv = document.getElementById("tagIdDiv");

addTagOrCollection.addEventListener("change", function (event)
{
    event.preventDefault();

    addTagOrCollection.value === "tag" ? addTagNameLabel.textContent = "Tag Name:" : addTagNameLabel.textContent = "Collection Name:";

    addTagOrCollection.value === "tag" ? addTagIdLabel.textContent = "Tag Id:" : addTagIdLabel.textContent = "Collection Id:";
});

createNew.addEventListener("change", function (event)
{
    event.preventDefault();

    createNew.value === "true" ? tagIdDiv.hidden = true : tagIdDiv.hidden = false;
});

addTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addTagForm);

    const result = await nomadSdk.addTagOrCollection(
        formData.addTagOrCollection,
        formData.addTagContentId,
        formData.addTagContentDefinition,
        formData.addTagName,
        formData.addTagId,
        formData.createNew
    );
    console.log(result);
});

removeTagOrCollection.addEventListener("change", function (event)
{
    event.preventDefault();

    removeTagOrCollection.value === "tag" ? removeTagIdLabel.textContent = "Tag Id:" : removeTagIdLabel.textContent = "Collection Id:";
});

removeTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(removeTagForm);

    const result = await nomadSdk.removeTagOrCollection(
        formData.removeTagOrCollection,
        formData.removeTagContentId,
        formData.removeTagContentDefinition,
        formData.removeTagId
    );
    console.log(result);
});

deleteTagOrCollection.addEventListener("change", function (event)
{
    event.preventDefault();

    deleteTagOrCollection.value === "tag" ? deleteTagIdLabel.textContent = "Tag Id:" : deleteTagIdLabel.textContent = "Collection Id:";
});

deleteTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteTagForm);

    const result = await nomadSdk.deleteTagOrCollection(
        formData.deleteTagOrCollection,
        formData.deleteTagId
    );
    console.log(result);
});

addRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addRelatedContentForm);

    const result = await nomadSdk.addRelatedContent(
        formData.addRelatedContentId,
        formData.addRelatedRelatedContentId,
        formData.addRelatedContentDefinition
    );
    console.log(result);
});

deleteRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteRelatedContentForm);

    const result = await nomadSdk.deleteRelatedContent(
        formData.deleteRelatedContentId,
        formData.deleteRelatedRelatedContentId,
        formData.deleteRelatedContentDefinition
    );
    console.log(result);
});

addCustomPropertiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addCustomPropertiesForm);

    const result = await nomadSdk.addCustomProperties(
        formData.addCustomPropertiesAssetId,
        formData.addCustomPropertiesName,
        formData.addCustomPropertiesNames ? formData.addCustomPropertiesNames.split(',') : [],
        formData.addCustomPropertiesValues ? formData.addCustomPropertiesValues.split(',') : []
    );
    console.log(result);
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.tagName) continue;
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
            {
                const value = input.value !== "" ? input.value : null;
                formData[input.id || input.name] = value;
            }
        }
    }
    return formData;
}
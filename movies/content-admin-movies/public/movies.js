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
        formData.get("addTagOrCollection"),
        formData.get("addTagContentId"),
        formData.get("addTagContentDefinition"),
        formData.get("addTagName"),
        formData.get("addTagId"),
        formData.get("createNew")
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
        formData.get("removeTagOrCollection"),
        formData.get("removeTagContentId"),
        formData.get("removeTagContentDefinition"),
        formData.get("removeTagId")
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
        formData.get("deleteTagOrCollection"),
        formData.get("deleteTagId")
    );
    console.log(result);
});

addRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addRelatedContentForm);

    const result = await nomadSdk.addRelatedContent(
        formData.get("addRelatedContentId"),
        formData.get("addRelatedRelatedContentId"),
        formData.get("addRelatedContentDefinition")
    );
    console.log(result);
});

deleteRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteRelatedContentForm);

    const result = await nomadSdk.deleteRelatedContent(
        formData.get("deleteRelatedContentId"),
        formData.get("deleteRelatedRelatedContentId"),
        formData.get("deleteRelatedContentDefinition")
    );
    console.log(result);
});

addCustomPropertiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addCustomPropertiesForm);

    const result = await nomadSdk.addCustomProperties(
        formData.get("addCustomPropertiesAssetId"),
        formData.get("addCustomPropertiesName"),
        formData.get("addCustomPropertiesNames").split(','),
        formData.get("addCustomPropertiesValues").split(',')
    );
    console.log(result);
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || input.type === "checkbox" && input.checked)
            {
                input.id ? formData.append(input.id, input.value) : formData.append(input.name, input.value);
            }
        }
    }
    return formData;
}
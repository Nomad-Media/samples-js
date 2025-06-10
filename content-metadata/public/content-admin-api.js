import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createTagForm = document.getElementById("createTagOrCollectionForm");
const addTagForm = document.getElementById("addTagOrCollectionForm");
const getTagForm = document.getElementById("getTagOrCollectionForm");
const removeTagForm = document.getElementById("removeTagOrCollectionForm");
const deleteTagForm = document.getElementById("deleteTagOrCollectionForm");
const addRelatedContentForm = document.getElementById("addRelatedContentForm");
const deleteRelatedContentForm = document.getElementById("deleteRelatedContentForm");
const addCustomPropertiesForm = document.getElementById("addCustomProperties");

const createTagOrCollection = document.getElementById("createTagOrCollection");
const createTagNameLabel = document.getElementById("createTagNameLabel");
const addTagOrCollection = document.getElementById("addTagOrCollection");
const addTagNameLabel = document.getElementById("addTagNameLabel");
const getTagOrCollection = document.getElementById("getTagOrCollection");
const getTagIdLabel = document.getElementById("getTagIdLabel");
const createNew = document.getElementById("createNew");
const addTagIdLabel = document.getElementById("addTagIdLabel");
const removeTagOrCollection = document.getElementById("removeTagOrCollection");
const removeTagIdLabel = document.getElementById("removeTagIdLabel");
const deleteTagOrCollection = document.getElementById("deleteTagOrCollection");
const deleteTagIdLabel = document.getElementById("deleteTagIdLabel");

const tagIdDiv = document.getElementById("tagIdDiv");
const addCustomPropertiesDiv = document.getElementById("addCustomPropertiesDiv");

const addCustomPropertiesButton = document.getElementById("addCustomPropertiesButton");

addCustomPropertiesButton.addEventListener("click", async function (event)
{
    event.preventDefault();

    const propertyNameLabel = document.createElement('label');
    propertyNameLabel.textContent = "Property Name:"; 
    const propertyName = document.createElement('input');
    propertyName.type = "text";
    propertyName.name = "propertyName";

    const propertyValueLabel = document.createElement('label');
    propertyValueLabel.textContent = "Property Value:";
    const propertyValue = document.createElement('input');
    propertyValue.type = "text";
    propertyValue.name = "propertyValue";

    addCustomPropertiesDiv.appendChild(propertyNameLabel);
    addCustomPropertiesDiv.appendChild(propertyName);
    addCustomPropertiesDiv.appendChild(propertyValueLabel);
    addCustomPropertiesDiv.appendChild(propertyValue);
});

createTagOrCollection.addEventListener("change", async function (event)
{
    event.preventDefault();

    createTagOrCollection.value === "tag"
        ? createTagNameLabel.textContent = "Tag Name:"
        : createTagNameLabel.textContent = "Collection Name:";
});

createTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createTagForm);

    const type = formData.get("createTagOrCollection");
    const name = formData.get("createTagName");

    const result = await nomadSdk.createTagOrCollection(type, name);
    console.log(result);
});

addTagOrCollection.addEventListener("change", async function (event)
{
    event.preventDefault();

    addTagOrCollection.value === "tag"
        ? addTagNameLabel.textContent = "Tag Name:"
        : addTagNameLabel.textContent = "Collection Name:";

    addTagOrCollection.value === "tag"
        ? addTagIdLabel.textContent = "Tag Id:"
        : addTagIdLabel.textContent = "Collection Id:";
});

createNew.addEventListener("change", async function (event)
{
    event.preventDefault();

    createNew.value === "true"
        ? tagIdDiv.hidden = true
        : tagIdDiv.hidden = false; 
});

addTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addTagForm);

    const type = formData.get("addTagOrCollection");
    const contentId = formData.get("addTagContentId");
    const contentDefinition = formData.get("addTagContentDefinition");
    const name = formData.get("addTagName");
    const tagId = formData.get("addTagId");
    const createNewValue = formData.get("createNew");

    const result = await nomadSdk.addTagOrCollection(type, contentId, contentDefinition, name, tagId, createNewValue);
    console.log(result);
});

getTagOrCollection.addEventListener("change", async function (event)
{
    event.preventDefault();

    getTagOrCollection.value === "tag"
        ? getTagIdLabel.textContent = "Tag Id:"
        : getTagIdLabel.textContent = "Collection Id:";
});

getTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getTagForm);

    const type = formData.get("getTagOrCollection");
    const tagId = formData.get("getTagId");

    const result = await nomadSdk.getTagOrCollection(type, tagId);
    console.log(result);
});

removeTagOrCollection.addEventListener("change", async function (event)
{
    event.preventDefault();

    removeTagOrCollection.value === "tag"
        ? removeTagIdLabel.textContent = "Tag Id:"
        : removeTagIdLabel.textContent = "Collection Id:";
});

removeTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(removeTagForm);

    const type = formData.get("removeTagOrCollection");
    const contentId = formData.get("removeTagContentId");
    const contentDefinition = formData.get("removeTagContentDefinition");
    const tagId = formData.get("removeTagId");

    const result = await nomadSdk.removeTagOrCollection(type, contentId, contentDefinition, tagId);
    console.log(result);
});

deleteTagOrCollection.addEventListener("change", async function (event)
{
    event.preventDefault();

    deleteTagOrCollection.value === "tag"
        ? deleteTagIdLabel.textContent = "Tag Id:"
        : deleteTagIdLabel.textContent = "Collection Id:";
});

deleteTagForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteTagForm);

    const type = formData.get("deleteTagOrCollection");
    const tagId = formData.get("deleteTagId");

    const result = await nomadSdk.deleteTagOrCollection(type, tagId);
    console.log(result);
});

addRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addRelatedContentForm);

    const contentId = formData.get("addRelatedContentId");
    const relatedContentId = formData.get("addRelatedRelatedContentId");
    const contentDefinition = formData.get("addRelatedContentDefinition");

    const result = await nomadSdk.addRelatedContent(contentId, relatedContentId, contentDefinition);
    console.log(result);
});

deleteRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteRelatedContentForm);

    const contentId = formData.get("deleteRelatedContentId");
    const relatedContentId = formData.get("deleteRelatedRelatedContentId");
    const contentDefinition = formData.get("deleteRelatedContentDefinition");

    const result = await nomadSdk.deleteRelatedContent(contentId, relatedContentId, contentDefinition);
    console.log(result);
});

addCustomPropertiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addCustomPropertiesForm);

    const assetId = formData.get("addCustomPropertiesAssetId");
    const name = formData.get("name");
    const date = formData.get("date");

    const propertyNames = formData.getAll("propertyName");
    const propertyValues = formData.getAll("propertyValue");
    const properties = {};

    for (let i = 0; i < propertyNames.length; i++)
    {
        properties[propertyNames[i]] = propertyValues[i];
    }

    const result = await nomadSdk.addCustomProperties(assetId, name, date, properties);
    console.log(result);
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
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
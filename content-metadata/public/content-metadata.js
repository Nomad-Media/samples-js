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

    await nomadSdk.createTagOrCollection(
        formData.createTagOrCollection,
        formData.createTagName
    );
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

    await nomadSdk.addTagOrCollection(
        formData.addTagOrCollection,
        formData.addTagContentId,
        formData.addTagContentDefinition,
        formData.addTagName,
        formData.addTagId,
        formData.createNew
    );
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

    await nomadSdk.getTagOrCollection(
        formData.getTagOrCollection,
        formData.getTagId
    );
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

    await nomadSdk.removeTagOrCollection(
        formData.removeTagOrCollection,
        formData.removeTagContentId,
        formData.removeTagContentDefinition,
        formData.removeTagId
    );
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

    await nomadSdk.deleteTagOrCollection(
        formData.deleteTagOrCollection,
        formData.deleteTagId
    );
});

addRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addRelatedContentForm);

    await nomadSdk.addRelatedContent(
        formData.addRelatedContentId,
        formData.addRelatedRelatedContentId,
        formData.addRelatedContentDefinition
    );
});

deleteRelatedContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteRelatedContentForm);

    await nomadSdk.deleteRelatedContent(
        formData.deleteRelatedContentId,
        formData.deleteRelatedRelatedContentId,
        formData.deleteRelatedContentDefinition
    );
});

addCustomPropertiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addCustomPropertiesForm);

    const assetId = formData.addCustomPropertiesAssetId;
    const name = formData.name;
    const date = formData.date;

    const propertyNames = [];
    const propertyValues = [];
    for (let input of addCustomPropertiesForm.elements)
    {
        if (input.name === "propertyName") propertyNames.push(input.value);
        if (input.name === "propertyValue") propertyValues.push(input.value);
    }
    const properties = {};
    for (let i = 0; i < propertyNames.length; i++)
    {
        properties[propertyNames[i]] = propertyValues[i];
    }

    await nomadSdk.addCustomProperties(assetId, name, date, properties);
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
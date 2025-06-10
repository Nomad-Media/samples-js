import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const mediaSearchForm = document.getElementById("mediaSearchForm");
const getDynamicContentForm = document.getElementById("getDynamicContentForm");
const getDynamicContentsForm = document.getElementById("getDynamicContentsForm");
const getMediaGroupForm = document.getElementById("getMediaGroupForm");
const getMediaItemForm = document.getElementById("getMediaItemForm");
const getDefaultSiteConfigForm = document.getElementById("getDefaultSiteConfigForm");
const getSiteConfigForm = document.getElementById("getSiteConfigForm");
const getMyContentForm = document.getElementById("getMyContentForm");
const getMyGroupForm = document.getElementById("getMyGroupForm");
const clearWatchlistForm = document.getElementById("clearWatchlistForm");
const clearContinueWatchingForm = document.getElementById("clearContinueWatchingForm");
const getContentCookiesForm = document.getElementById("getContentCookiesForm");
const formForm = document.getElementById("formForm");

const sortFieldsDiv = document.getElementById("sortFieldsDiv");
const addSortFieldsButton = document.getElementById("addSortFieldsButton");

addSortFieldsButton.addEventListener('click', function (event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "sortFieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "sortFieldName");
    fieldName.required = true;

    let sortTypeLabel = document.createElement('label');
    sortTypeLabel.setAttribute("for", "sortType");
    sortTypeLabel.textContent = "Sort Type:";

    let sortType = document.createElement("select");
    sortType.setAttribute("name", "sortType");
    sortType.required = true;

    let ascendingOption = document.createElement("option");
    ascendingOption.value = "Ascending";
    ascendingOption.text = "Ascending";
    sortType.appendChild(ascendingOption);

    let descendingOption = document.createElement("option");
    descendingOption.value = "Descending";
    descendingOption.text = "Descending";
    sortType.appendChild(descendingOption);

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Sort Field";
    removeButton.addEventListener("click", function (event)
    {
        event.preventDefault();
        sortFieldsDiv.removeChild(br1);
        sortFieldsDiv.removeChild(br2);
        sortFieldsDiv.removeChild(fieldNameLabel);
        sortFieldsDiv.removeChild(fieldName);
        sortFieldsDiv.removeChild(sortTypeLabel);
        sortFieldsDiv.removeChild(sortType);
        sortFieldsDiv.removeChild(removeButton);
    });

    sortFieldsDiv.appendChild(fieldNameLabel);
    sortFieldsDiv.appendChild(fieldName);
    sortFieldsDiv.appendChild(sortTypeLabel);
    sortFieldsDiv.appendChild(sortType);

    sortFieldsDiv.appendChild(br1);
    sortFieldsDiv.appendChild(br2);

    sortFieldsDiv.appendChild(removeButton);
});

mediaSearchForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(mediaSearchForm);

    const ids = formData.get("ids") === "" ? [] : formData.get("ids").split(',');

    const sortFields = [];
    const sortFieldNames = formData.getAll("sortFieldName");
    const sortTypes = formData.getAll("sortType");
    for (let i = 0; i < sortFieldNames.length; ++i)
    {
        sortFields.push({
            fieldName: sortFieldNames[i],
            sortType: sortTypes[i]
        });
    }

    const searchQuery = formData.get("searchQuery");
    const pageOffset = formData.get("pageOffset");
    const pageSize = formData.get("pageSize");

    const result = await nomadSdk.mediaSearch(
        searchQuery, ids, sortFields, pageOffset, pageSize
    );
    console.log(result);
});

getDynamicContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getDynamicContentForm);

    const dynamicContentId = formData.get("dynamicContentId");
    const result = await nomadSdk.getDynamicContent(dynamicContentId);
    console.log(result);
});

getDynamicContentsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const result = await nomadSdk.getDynamicContents();
    console.log(result);
});

getMediaGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getMediaGroupForm);

    const mediaGroupId = formData.get("mediaGroupId");
    const result = await nomadSdk.getMediaGroup(mediaGroupId);
    console.log(result);
});

getMediaItemForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getMediaItemForm);

    const mediaItemId = formData.get("mediaItemId");
    const result = await nomadSdk.getMediaItem(mediaItemId);
    console.log(result);
});

getDefaultSiteConfigForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const result = await nomadSdk.getDefaultSiteConfig();
    console.log(result);
});

getSiteConfigForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getSiteConfigForm);

    const siteConfigId = formData.get("siteConfigId");
    const result = await nomadSdk.getSiteConfig(siteConfigId);
    console.log(result);
});

getMyContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const result = await nomadSdk.getMyContent();
    console.log(result);
});

getMyGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getMyGroupForm);

    const myGroupId = formData.get("myGroupId");
    const result = await nomadSdk.getMyGroup(myGroupId);
    console.log(result);
});

clearWatchlistForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const result = await nomadSdk.clearWatchlist();
    console.log(result);
});

clearContinueWatchingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(clearContinueWatchingForm);

    const userId = formData.get("userId");
    const assetId = formData.get("assetId");
    const result = await nomadSdk.clearContinueWatching(userId, assetId);
    console.log(result);
});

getContentCookiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentCookiesForm);

    const contentId = formData.get("contentId");
    const result = await nomadSdk.getContentCookies(contentId);
    console.log(result);
});

formForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(formForm);

    const contentDefinitionId = formData.get("contentDefinitionId");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const active = formData.get("active");
    const startDate = formData.get("startDate");
    const lookupId = formData.get("lookupId");
    const description = formData.get("description");

    const result = await nomadSdk.createForm(contentDefinitionId, {
        firstName, lastName, active, startDate, lookupId, description
    });
    console.log(result);
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
}
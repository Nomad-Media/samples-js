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

    const ids = formData.ids === "" || !formData.ids ? [] : formData.ids.split(',');

    const sortFields = [];
    const sortFieldNames = formData.sortFieldName ? (Array.isArray(formData.sortFieldName) ? formData.sortFieldName : [formData.sortFieldName]) : [];
    const sortTypes = formData.sortType ? (Array.isArray(formData.sortType) ? formData.sortType : [formData.sortType]) : [];
    for (let i = 0; i < sortFieldNames.length; ++i)
    {
        sortFields.push({
            fieldName: sortFieldNames[i],
            sortType: sortTypes[i]
        });
    }

    const searchQuery = formData.searchQuery;
    const pageOffset = formData.pageOffset;
    const pageSize = formData.pageSize;

    const result = await nomadSdk.mediaSearch(
        searchQuery, ids, sortFields, pageOffset, pageSize
    );
    console.log(result);
});

getDynamicContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getDynamicContentForm);

    const dynamicContentId = formData.dynamicContentId;
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

    const mediaGroupId = formData.mediaGroupId;
    const mediaGroupFilters = formData.mediaGroupFilters === "" || !formData.mediaGroupFilters ? null : formData.mediaGroupFilters.split(',');
    const result = await nomadSdk.getMediaGroup(mediaGroupId, mediaGroupFilters);
    console.log(result);
});

getMediaItemForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getMediaItemForm);

    const mediaItemId = formData.mediaItemId;
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

    const siteConfigId = formData.siteConfigId;
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

    const myGroupId = formData.myGroupId;
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

    const userId = formData.userId;
    const assetId = formData.assetId;
    const result = await nomadSdk.clearContinueWatching(userId, assetId);
    console.log(result);
});

getContentCookiesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentCookiesForm);

    const contentId = formData.contentId;
    const result = await nomadSdk.getContentCookies(contentId);
    console.log(result);
});

formForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(formForm);

    const contentDefinitionId = formData.contentDefinitionId;
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const active = formData.active;
    const startDate = formData.startDate;
    const lookupId = formData.lookupId;
    const description = formData.description;

    const result = await nomadSdk.createForm(contentDefinitionId, {
        firstName, lastName, active, startDate, lookupId, description
    });
    console.log(result);
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
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            const value = input.value !== "" ? input.value : null;
            formData[input.id || input.name] = value;
        }
    }
    return formData;
}
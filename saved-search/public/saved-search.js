import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const addSavedSearchForm = document.getElementById("addSavedSearchForm");
const deleteSavedSearchForm = document.getElementById("deleteSavedSearchForm");
const getSavedSearchForm = document.getElementById("getSavedSearchForm");
const getSavedSearchesForm = document.getElementById("getSavedSearchesForm");
const patchSavedSearchForm = document.getElementById("patchSavedSearchForm");
const updateSavedSearchForm = document.getElementById("updateSavedSearchForm");
const getSearchSavedForm = document.getElementById("getSearchSavedForm");
const getSearchSavedByIdForm = document.getElementById("getSearchSavedByIdForm");

const addFiltersDiv = document.getElementById("addFiltersDiv");
const addSortFieldsDiv = document.getElementById("addSortFieldsDiv");
const addSearchResultFieldsDiv = document.getElementById("addSearchResultFieldsDiv");
const updateFiltersDiv = document.getElementById("updateFiltersDiv");
const updateSortFieldsDiv = document.getElementById("updateSortFieldsDiv");
const updateSearchResultFieldsDiv = document.getElementById("updateSearchResultFieldsDiv");
const getFiltersDiv = document.getElementById("getFiltersDiv");
const getSortFieldsDiv = document.getElementById("getSortFieldsDiv");
const getSearchResultFieldsDiv = document.getElementById("getSearchResultFieldsDiv");

const addAddFilterButton = document.getElementById("addAddFilterButton");
const addAddSortFieldButton = document.getElementById("addAddSortFieldButton");
const addAddSearchResultFieldButton = document.getElementById("addAddSearchResultFieldButton");
const updateAddFilterButton = document.getElementById("updateAddFilterButton");
const updateAddSortFieldButton = document.getElementById("updateAddSortFieldButton");
const updateAddSearchResultFieldButton = document.getElementById("updateAddSearchResultFieldButton");
const getAddFilterButton = document.getElementById("getAddFilterButton");
const getAddSortFieldButton = document.getElementById("getAddSortFieldButton");
const getAddSearchResultFieldButton = document.getElementById("getAddSearchResultFieldButton");

addAddFilterButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(addFiltersDiv);
});

updateAddFilterButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(updateFiltersDiv);
});

getAddFilterButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(getFiltersDiv);
});

function addFilterFields(div) 
{
    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "fieldName");
    fieldName.required = true;

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operator");
    operationLabel.textContent = "Operator:";

    let operator = document.createElement("input");
    operator.setAttribute("type", "text");
    operator.setAttribute("name", "operator");
    operator.required = true;

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "value");
    valueLabel.textContent = "Value:";

    let value = document.createElement("input");
    value.setAttribute("type", "text");
    value.setAttribute("name", "value");
    value.required = true;

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Filter";
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        div.removeChild(br1);
        div.removeChild(br2);
        div.removeChild(fieldNameLabel);
        div.removeChild(fieldName);
        div.removeChild(operationLabel);
        div.removeChild(operator);
        div.removeChild(valueLabel);
        div.removeChild(value);
        div.removeChild(removeButton);
    });

    div.appendChild(fieldNameLabel);
    div.appendChild(fieldName);
    div.appendChild(operationLabel);
    div.appendChild(operator);
    div.appendChild(valueLabel);
    div.appendChild(value);

    div.appendChild(br1);
    div.appendChild(br2);

    div.appendChild(removeButton);
}

addAddSortFieldButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(addSortFieldsDiv);
});

updateAddSortFieldButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(updateSortFieldsDiv);
});

getAddSortFieldButton.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(getSortFieldsDiv);
});

function addSortFields(div)
{
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
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        div.removeChild(br1);
        div.removeChild(br2);
        div.removeChild(fieldNameLabel);
        div.removeChild(fieldName);
        div.removeChild(sortTypeLabel);
        div.removeChild(sortType);
        div.removeChild(removeButton);
    });

    div.appendChild(fieldNameLabel);
    div.appendChild(fieldName);
    div.appendChild(sortTypeLabel);
    div.appendChild(sortType);

    div.appendChild(br1);
    div.appendChild(br2);

    div.appendChild(removeButton);
}

addAddSearchResultFieldButton.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(addSearchResultFieldsDiv);
});

updateAddSearchResultFieldButton.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(updateSearchResultFieldsDiv);
});

getAddSearchResultFieldButton.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(getSearchResultFieldsDiv);
});

function addSearchResultFields(div) {
    let fieldDiv = document.createElement("div");

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "subSearchResultFieldName");

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let addButton = document.createElement("button");
    addButton.textContent = "Add Sub Search Result Field";

    addButton.addEventListener("click", function(event) {
        event.preventDefault();
        addSearchResultFields(fieldDiv);
    });

    let br3 = document.createElement("br");
    let br4 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Search Result Field";

    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        div.removeChild(fieldDiv);
    });

    fieldDiv.appendChild(fieldNameLabel);
    fieldDiv.appendChild(fieldName);
    fieldDiv.appendChild(br1);
    fieldDiv.appendChild(br2);
    fieldDiv.appendChild(addButton);
    fieldDiv.appendChild(br3);
    fieldDiv.appendChild(br4);
    fieldDiv.appendChild(removeButton);

    div.appendChild(fieldDiv);
}

addSavedSearchForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(addSavedSearchForm);

    let searchResultFields = getSearchResultFieldsData(addSearchResultFieldsDiv);

    // Build filters
    const filters = [];
    const fieldNames = formData.getAll("fieldName");
    const operators = formData.getAll("operator");
    const values = formData.getAll("value");
    for (let i = 0; i < fieldNames.length; ++i)
    {
        filters.push({
            fieldName: fieldNames[i],
            operator: operators[i],
            values: values[i].split(",")
        });
    }

    // Build sort fields
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

    // Parse searchResultFields
    formData.append('searchResultFields', JSON.stringify(searchResultFields));

    const result = await nomadSdk.addSavedSearch(
        formData.get("name"),
        formData.get("featured") === "true",
        formData.get("bookmarked") === "true",
        formData.get("public") === "true",
        formData.get("sequence"),
        formData.get("type"),
        formData.get("query"),
        formData.get("offset"),
        formData.get("size"),
        filters,
        sortFields,
        searchResultFields,
        formData.get("similarAssetId"),
        formData.get("minScore"),
        formData.get("excludeTotalRecordCount") === "true",
        formData.get("filterBinder")
    );
    console.log(result);
});

deleteSavedSearchForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(deleteSavedSearchForm);

    const result = await nomadSdk.deleteSavedSearch(formData.get("id"));
    console.log(result);
});

getSavedSearchForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(getSavedSearchForm);

    const result = await nomadSdk.getSavedSearch(formData.get("id"));
    console.log(result);
});

getSavedSearchesForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const result = await nomadSdk.getSavedSearches();
    console.log(result);
});

patchSavedSearchForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(patchSavedSearchForm);

    const result = await nomadSdk.patchSavedSearch(
        formData.get("id"),
        formData.get("name"),
        formData.get("featured") === "true",
        formData.get("bookmarked") === "true",
        formData.get("public") === "true",
        formData.get("sequence"),
        formData.get("type"),
        formData.get("query"),
        formData.get("offset"),
        formData.get("size"),
        formData.get("similarAssetId"),
        formData.get("minScore"),
        formData.get("excludeTotalRecordCount") === "true",
        formData.get("filterBinder")
    );
    console.log(result);
});

updateSavedSearchForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(updateSavedSearchForm);

    let searchResultFields = getSearchResultFieldsData(updateSearchResultFieldsDiv);

    // Build filters
    const filters = [];
    const fieldNames = formData.getAll("fieldName");
    const operators = formData.getAll("operator");
    const values = formData.getAll("value");
    for (let i = 0; i < fieldNames.length; ++i)
    {
        filters.push({
            fieldName: fieldNames[i],
            operator: operators[i],
            values: values[i].split(",")
        });
    }

    // Build sort fields
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

    // Parse searchResultFields
    formData.append('searchResultFields', JSON.stringify(searchResultFields));

    const result = await nomadSdk.updateSavedSearch(
        formData.get("id"),
        formData.get("name"),
        formData.get("featured") === "true",
        formData.get("bookmarked") === "true",
        formData.get("public") === "true",
        formData.get("sequence"),
        formData.get("type"),
        formData.get("query"),
        formData.get("offset"),
        formData.get("size"),
        filters,
        sortFields,
        searchResultFields,
        formData.get("similarAssetId"),
        formData.get("minScore"),
        formData.get("excludeTotalRecordCount") === "true",
        formData.get("filterBinder")
    );
    console.log(result);
});

getSearchSavedForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(getSearchSavedForm);

    let searchResultFields = getSearchResultFieldsData(getSearchResultFieldsDiv);

    // Build filters
    const filters = [];
    const fieldNames = formData.getAll("fieldName");
    const operators = formData.getAll("operator");
    const values = formData.getAll("value");
    for (let i = 0; i < fieldNames.length; ++i)
    {
        filters.push({
            fieldName: fieldNames[i],
            operator: operators[i],
            values: values[i].split(",")
        });
    }

    // Build sort fields
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

    // Parse searchResultFields
    formData.append('searchResultFields', JSON.stringify(searchResultFields));

    const result = await nomadSdk.getSearchSaved(
        formData.get("query"),
        formData.get("offset"),
        formData.get("size"),
        filters,
        sortFields,
        searchResultFields,
        formData.get("similarAssetId"),
        formData.get("minScore"),
        formData.get("excludeTotalRecordCount") === "true",
        formData.get("filterBinder")
    );
    console.log(result);
});

getSearchSavedByIdForm.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const formData = getElements(getSearchSavedByIdForm);

    const result = await nomadSdk.getSearchSavedById(formData.get("id"));
    console.log(result);
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "SELECT") 
        {
            const selectedOptions = []
            for (let element of input) 
            {
                if (element.selected) 
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

function getSearchResultFieldsData(div) 
{
    let fieldDivs = Array.from(div.children).filter(child => child.tagName === 'DIV');

    let searchResultFields = fieldDivs.map(fieldDiv => 
    {
        let nameInput = fieldDiv.querySelector('input[name="subSearchResultFieldName"]');

        let name = nameInput.value;

        let nestedSearchResultFields = getSearchResultFieldsData(fieldDiv);

        return {
            name: name,
            searchResultFields: nestedSearchResultFields
        };
    });

    return searchResultFields;
}
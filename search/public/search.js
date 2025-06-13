import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const searchForm = document.getElementById("searchForm");

const filtersDiv = document.getElementById("filtersDiv");
const sortFieldsDiv = document.getElementById("sortFieldsDiv");

const addFilterButton = document.getElementById("addFilterButton");
const addSortFieldsButton = document.getElementById("addSortFieldsButton");

addFilterButton.addEventListener('click', function(event)
{
    event.preventDefault();

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
        filtersDiv.removeChild(br1);
        filtersDiv.removeChild(br2);
        filtersDiv.removeChild(fieldNameLabel);
        filtersDiv.removeChild(fieldName);
        filtersDiv.removeChild(operationLabel);
        filtersDiv.removeChild(operator);
        filtersDiv.removeChild(valueLabel);
        filtersDiv.removeChild(value);
        filtersDiv.removeChild(removeButton);
    });

    filtersDiv.appendChild(fieldNameLabel);
    filtersDiv.appendChild(fieldName);
    filtersDiv.appendChild(operationLabel);
    filtersDiv.appendChild(operator);
    filtersDiv.appendChild(valueLabel);
    filtersDiv.appendChild(value);

    filtersDiv.appendChild(br1);
    filtersDiv.appendChild(br2);

    filtersDiv.appendChild(removeButton);
});

addSortFieldsButton.addEventListener('click', function(event)
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
    removeButton.addEventListener("click", function(event) {
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

searchForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(searchForm);

    const filters = [];
    const fieldNames = formData.fieldName ? (Array.isArray(formData.fieldName) ? formData.fieldName : [formData.fieldName]) : [];
    const operators = formData.operator ? (Array.isArray(formData.operator) ? formData.operator : [formData.operator]) : [];
    const values = formData.value ? (Array.isArray(formData.value) ? formData.value : [formData.value]) : [];
    for (let i = 0; i < fieldNames.length; ++i)
    {
        filters.push({
            fieldName: fieldNames[i],
            operator: operators[i],
            values: values[i]
        });
    }

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

    const resultFieldNames = formData.resultFieldNames !== "" && formData.resultFieldNames !== null && formData.resultFieldNames !== undefined
        ? formData.resultFieldNames.split(",").map(elem => ({ name: elem }))
        : null;

    const fullUrlNames = formData.fullUrlNames !== "" && formData.fullUrlNames !== null && formData.fullUrlNames !== undefined
        ? formData.fullUrlNames.split(",")
        : null;

    const searchMovieInfo = await nomadSdk.search(
        formData.searchQuery,
        formData.pageOffset,
        formData.pageSize,
        filters.length !== 0 ? filters : null,
        sortFields.length !== 0 ? sortFields : null,
        resultFieldNames,
        fullUrlNames,
        formData.distinctOnFieldName,
        formData.includeVideoClips === "True",
        formData.similarAssetId,
        formData.minScore,
        formData.excludeTotalRecordCount,
        formData.filterBinder,
        formData.useLlmSearch === "True",
        formData.includeInternalFieldsInResults === "True"
    );

    console.log(searchMovieInfo);
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
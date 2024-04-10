const SEARCH_FORM = document.getElementById("searchForm");

const FILTERS_DIV = document.getElementById("filtersDiv");
const SORT_FIELDS_DIV = document.getElementById("sortFieldsDiv");

const ADD_FILTER_BUTTON = document.getElementById("addFilterButton");
const ADD_SORT_FIELDS_BUTTON = document.getElementById("addSortFieldsButton");

ADD_FILTER_BUTTON.addEventListener('click', function(event)
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
        FILTERS_DIV.removeChild(br1);
        FILTERS_DIV.removeChild(br2);
        FILTERS_DIV.removeChild(fieldNameLabel);
        FILTERS_DIV.removeChild(fieldName);
        FILTERS_DIV.removeChild(operationLabel);
        FILTERS_DIV.removeChild(operator);
        FILTERS_DIV.removeChild(valueLabel);
        FILTERS_DIV.removeChild(value);
        FILTERS_DIV.removeChild(removeButton);
    });

    FILTERS_DIV.appendChild(fieldNameLabel);
    FILTERS_DIV.appendChild(fieldName);
    FILTERS_DIV.appendChild(operationLabel);
    FILTERS_DIV.appendChild(operator);
    FILTERS_DIV.appendChild(valueLabel);
    FILTERS_DIV.appendChild(value);

    FILTERS_DIV.appendChild(br1);
    FILTERS_DIV.appendChild(br2);

    FILTERS_DIV.appendChild(removeButton);
});

ADD_SORT_FIELDS_BUTTON.addEventListener('click', function(event)
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
        SORT_FIELDS_DIV.removeChild(br1);
        SORT_FIELDS_DIV.removeChild(br2);
        SORT_FIELDS_DIV.removeChild(fieldNameLabel);
        SORT_FIELDS_DIV.removeChild(fieldName);
        SORT_FIELDS_DIV.removeChild(sortTypeLabel);
        SORT_FIELDS_DIV.removeChild(sortType);
        SORT_FIELDS_DIV.removeChild(removeButton);
    });

    SORT_FIELDS_DIV.appendChild(fieldNameLabel);
    SORT_FIELDS_DIV.appendChild(fieldName);
    SORT_FIELDS_DIV.appendChild(sortTypeLabel);
    SORT_FIELDS_DIV.appendChild(sortType);

    SORT_FIELDS_DIV.appendChild(br1);
    SORT_FIELDS_DIV.appendChild(br2);

    SORT_FIELDS_DIV.appendChild(removeButton);
});

SEARCH_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(SEARCH_FORM);

    console.log(await sendRequest("/search", "POST", FORM_DATA));
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "SELECT") {
            const SELECTED_OPTIONS = []
            for (let element of input) {
                if (element.selected) {
                    if (element.value === element.label) {
                        if (input.id) {
                            FORM_DATA.append(input.id, element.value);
                        } else {
                            FORM_DATA.append(input.name, element.value);
                        }
                    } else {
                        SELECTED_OPTIONS.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (SELECTED_OPTIONS.length > 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS));
            }
            else if (SELECTED_OPTIONS.length === 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS[0]));
            }
        }
        else if (input.tagName === "INPUT")
        {
            if (input.type === "file") {
                FORM_DATA.append(input.id, input.files[0]);
            } else {
                if (input.id) {
                    FORM_DATA.append(input.id, input.value);
                } else {
                    FORM_DATA.append(input.name, input.value);
                }
            }
        }
    }
    return FORM_DATA;
}

async function sendRequest(PATH, METHOD, BODY)
{
    try
    {
        const REQUEST = { method: METHOD };
        if (BODY) REQUEST["body"] = BODY;
        const RESPONSE = await fetch(PATH, REQUEST);

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json();
            if (DATA) return DATA;
        }
        else
        {
            const INFO = await RESPONSE.json();
            console.error(JSON.stringify(INFO, null, 4));
            console.error("HTTP-Error: " + RESPONSE.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}
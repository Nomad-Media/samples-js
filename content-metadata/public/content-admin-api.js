const CREATE_TAG_FORM = document.getElementById("createTagOrCollectionForm");
const ADD_TAG_FORM = document.getElementById("addTagOrCollectionForm");
const GET_TAG_FORM = document.getElementById("getTagOrCollectionForm");
const REMOVE_TAG_FORM = document.getElementById("removeTagOrCollectionForm");
const DELETE_TAG_FORM = document.getElementById("deleteTagOrCollectionForm");
const ADD_RELATED_CONTENT_FORM = document.getElementById("addRelatedContentForm");
const DELETE_RELATED_CONTENT_FORM = document.getElementById("deleteRelatedContentForm");
const ADD_CUSTOM_PROPERTIES_FORM = document.getElementById("addCustomProperties");

const CREATE_TAG_OR_COLLECTION = document.getElementById("createTagOrCollection");
const CREATE_TAG_NAME_LABEL = document.getElementById("createTagNameLabel");
const ADD_TAG_OR_COLLECTION = document.getElementById("addTagOrCollection");
const ADD_TAG_NAME_LABEL = document.getElementById("addTagNameLabel");
const GET_TAG_OR_COLLECTION = document.getElementById("getTagOrCollection");
const GET_TAG_ID_LABEL = document.getElementById("getTagIdLabel");
const CREATE_NEW = document.getElementById("createNew");
const ADD_TAG_ID_LABEL = document.getElementById("addTagIdLabel");
const REMOVE_TAG_OR_COLLECTION = document.getElementById("removeTagOrCollection");
const REMOVE_TAG_ID_LABEL = document.getElementById("removeTagIdLabel");
const DELETE_TAG_OR_COLLECTION = document.getElementById("deleteTagOrCollection");
const DELETE_TAG_ID_LABEL = document.getElementById("deleteTagIdLabel");

const TAG_ID_DIV = document.getElementById("tagIdDiv");
const ADD_CUSTOM_PROPERTIES_DIV = document.getElementById("addCustomPropertiesDiv");

const ADD_CUSTOM_PROPERTIES_BUTTON = document.getElementById("addCustomPropertiesButton");

ADD_CUSTOM_PROPERTIES_BUTTON.addEventListener("click", async function (event)
{
    event.preventDefault();

    const PROPERTY_NAME_LABEL = document.createElement('label');
    PROPERTY_NAME_LABEL.textContent = "Property Name:"; 
    const PROPERTY_NAME = document.createElement('input');
    PROPERTY_NAME.type = "text";
    PROPERTY_NAME.name = "propertyName";

    const PROPERTY_VALUE_LABEL = document.createElement('label');
    PROPERTY_VALUE_LABEL.textContent = "Property Value:";
    const PROPERTY_VALUE = document.createElement('input');
    PROPERTY_VALUE.type = "text";
    PROPERTY_VALUE.name = "propertyValue";

    ADD_CUSTOM_PROPERTIES_DIV.appendChild(PROPERTY_NAME_LABEL);
    ADD_CUSTOM_PROPERTIES_DIV.appendChild(PROPERTY_NAME);
    ADD_CUSTOM_PROPERTIES_DIV.appendChild(PROPERTY_VALUE_LABEL);
    ADD_CUSTOM_PROPERTIES_DIV.appendChild(PROPERTY_VALUE);
});

CREATE_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_TAG_OR_COLLECTION.value === "tag" ? CREATE_TAG_NAME_LABEL.textContent = "Tag Name:" : CREATE_TAG_NAME_LABEL.textContent = "Collection Name:";
});

CREATE_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_TAG_FORM);

    console.log(await sendRequest("/create-tag-or-collection", "POST", FORM_DATA));
});

ADD_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();
    
    ADD_TAG_OR_COLLECTION.value === "tag" ? ADD_TAG_NAME_LABEL.textContent = "Tag Name:" : ADD_TAG_NAME_LABEL.textContent = "Collection Name:";

    ADD_TAG_OR_COLLECTION.value === "tag" ? ADD_TAG_ID_LABEL.textContent = "Tag Id:" : ADD_TAG_ID_LABEL.textContent = "Collection Id:";
});

CREATE_NEW.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_NEW.value === "true" ? TAG_ID_DIV.hidden = true : TAG_ID_DIV.hidden = false; 
});

ADD_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_TAG_FORM);

    console.log(await sendRequest("/add-tag-or-collection", "POST", FORM_DATA));
});

GET_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();
    
    GET_TAG_OR_COLLECTION.value === "tag" ? GET_TAG_ID_LABEL.textContent = "Tag Id:" : GET_TAG_ID_LABEL.textContent = "Collection Id:";
});

GET_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_TAG_FORM);

    console.log(await sendRequest("/get-tag-or-collection", "POST", FORM_DATA));
});

REMOVE_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();
    
    REMOVE_TAG_OR_COLLECTION.value === "tag" ? REMOVE_TAG_ID_LABEL.textContent = "Tag Id:" : REMOVE_TAG_ID_LABEL.textContent = "Collection Id:";
});

REMOVE_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_TAG_FORM);

    console.log(await sendRequest("/remove-tag-or-collection", "POST", FORM_DATA));
});

DELETE_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();

    DELETE_TAG_OR_COLLECTION.value === "tag" ? DELETE_TAG_ID_LABEL.textContent = "Tag Id:" : DELETE_TAG_ID_LABEL.textContent = "Collection Id:";
});

DELETE_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(DELETE_TAG_FORM);

    console.log(await sendRequest("/delete-tag-or-collection", "POST", FORM_DATA));
});

ADD_RELATED_CONTENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_RELATED_CONTENT_FORM);

    console.log(await sendRequest("/add-related-content", "POST", FORM_DATA));
});

DELETE_RELATED_CONTENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_RELATED_CONTENT_FORM);

    console.log(await sendRequest("/delete-related-content", "POST", FORM_DATA));
});

ADD_CUSTOM_PROPERTIES_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_CUSTOM_PROPERTIES_FORM);

    console.log(await sendRequest("/add-custom-properties", "POST", FORM_DATA));
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || input.type === "checkbox" && input.checked)
            {
                input.id ? FORM_DATA.append(input.id, input.value) : FORM_DATA.append(input.name, input.value);
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
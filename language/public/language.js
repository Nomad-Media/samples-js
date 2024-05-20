const CREATE_FORM = document.getElementById("createForm");
const GET_FORM = document.getElementById("getForm");
const UPDATE_FORM = document.getElementById("updateForm");
const DELETE_FORM = document.getElementById("deleteForm");

const CREATE_CONTENT_LANGUAGE_PROPERTIES_DIV = document.getElementById("createContentLanguagePropertiesDiv");
const UPDATE_CONTENT_LANGUAGE_PROPERTIES_DIV = document.getElementById("updateContentLanguagePropertiesDiv");

const CREATE_CONTENT_CONTENT_DEFINITION_ID = document.getElementById("createContentContentDefinitionId");
const CREATE_CONTENT_MASTER_ID = document.getElementById("createContentMasterId");
const CREATE_CONTENT_LANGUAGE_ID = document.getElementById("createContentLanguageId");
const UPDATE_CONTENT_CONTENT_DEFINITION_ID = document.getElementById("updateContentContentDefinitionId");
const UPDATE_CONTENT_MASTER_ID = document.getElementById("updateContentMasterId");
const UPDATE_CONTENT_LANGUAGE_ID = document.getElementById("updateContentLanguageId");

const CREATE_CONTENT_ADD_PROPERTIES_BUTTON = document.getElementById("createContentAddPropertiesButton");
const CREATE_CONTENT_SUBMIT_BUTTON = document.getElementById("createContentSubmitButton");
const UPDATE_CONTENT_ADD_PROPERTIES_BUTTON = document.getElementById("updateContentAddPropertiesButton");
const UPDATE_CONTENT_SUBMIT_BUTTON = document.getElementById("updateContentSubmitButton");

const CREATE_CONTENT_LANGUAGE_SELECT = document.getElementById("createContentLanguage");
const GET_CONTENT_LANGUAGE_SELECT = document.getElementById("getContentLanguage");
const UPDATE_CONTENT_LANGUAGE_SELECT = document.getElementById("updateContentLanguage");
const DELETE_CONTENT_LANGUAGE_SELECT = document.getElementById("deleteContentLanguage");

await getLanguages()

async function getLanguages()
{
    const LANGUAGES = await sendRequest("/getLanguages", "GET");
    if (LANGUAGES)
    {
        for (let language of LANGUAGES)
        {
            const OPTION = document.createElement("option");
            OPTION.value = language.id;
            OPTION.text = language.identifiers.title;
            CREATE_CONTENT_LANGUAGE_SELECT.appendChild(OPTION);
            GET_CONTENT_LANGUAGE_SELECT.appendChild(OPTION.cloneNode(true));
            UPDATE_CONTENT_LANGUAGE_SELECT.appendChild(OPTION.cloneNode(true));
            DELETE_CONTENT_LANGUAGE_SELECT.appendChild(OPTION.cloneNode(true));
        }
    }

    $(CREATE_CONTENT_LANGUAGE_SELECT).select2();
    $(GET_CONTENT_LANGUAGE_SELECT).select2();
    $(UPDATE_CONTENT_LANGUAGE_SELECT).select2();
    $(DELETE_CONTENT_LANGUAGE_SELECT).select2();
}

CREATE_CONTENT_ADD_PROPERTIES_BUTTON.addEventListener("click", async () => {
    await addProperties(CREATE_CONTENT_CONTENT_DEFINITION_ID.value,
        CREATE_CONTENT_MASTER_ID.value, CREATE_CONTENT_LANGUAGE_SELECT.value,
        CREATE_CONTENT_LANGUAGE_PROPERTIES_DIV, 
        CREATE_CONTENT_ADD_PROPERTIES_BUTTON, CREATE_CONTENT_SUBMIT_BUTTON,
        "create");
});

UPDATE_CONTENT_ADD_PROPERTIES_BUTTON.addEventListener("click", async () => {
    await addProperties(UPDATE_CONTENT_CONTENT_DEFINITION_ID.value,
        UPDATE_CONTENT_MASTER_ID.value, UPDATE_CONTENT_LANGUAGE_SELECT.value,
        UPDATE_CONTENT_LANGUAGE_PROPERTIES_DIV, 
        UPDATE_CONTENT_ADD_PROPERTIES_BUTTON, UPDATE_CONTENT_SUBMIT_BUTTON,
        "update");
});

async function addProperties(CONTENT_DEFINITION_ID, MASTER_ID, LANGUAGE_ID, DIV,
    ADD_PROPERTIES_BUTTON, SUBMIT_BUTTON, ACTION)
{
    ADD_PROPERTIES_BUTTON.hidden = true;

    const PROPERTIES_FORM_DATA = new FormData();
    PROPERTIES_FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);

    const PROPERTIES = await sendRequest("/getProperties", "POST", PROPERTIES_FORM_DATA);

    let contentId = null;
    if (ACTION === "create")
    {
        contentId = MASTER_ID
    }
    else
    {
        const FORM_DATA = new FormData();
        FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);
        FORM_DATA.append("languageId", LANGUAGE_ID);

        const CONTENTS = await sendRequest("/getContents", "POST", FORM_DATA);
        try
        {
            contentId = CONTENTS.find(content => content.masterId === MASTER_ID).id;
        } 
        catch (error)
        {
            console.error("Master Id not found in content definition");
        }
    }

    const CONTENT_FORM_DATA = new FormData();
    CONTENT_FORM_DATA.append("contentId", contentId);
    CONTENT_FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);

    const CONTENT_DATA = await sendRequest("/getContentData", "POST", CONTENT_FORM_DATA);

    const PROPERTIES_DIV = document.createElement("div");
    PROPERTIES_DIV.classList.add("properties");
    
    for (let contentField of PROPERTIES.contentFields)
    {
        const PROPERTY = contentField.properties;

        const PROPERTY_DIV = document.createElement("div");

        const LABEL = document.createElement("label");
        LABEL.textContent = PROPERTY.title;
        PROPERTY_DIV.appendChild(LABEL);

        let camelPropertyTitle = PROPERTY.title.replace(/ /g, "");
        if (camelPropertyTitle.slice(1) === camelPropertyTitle.slice(1).toUpperCase()) camelPropertyTitle = camelPropertyTitle.toLowerCase();
        camelPropertyTitle = camelPropertyTitle[0].toLowerCase() + camelPropertyTitle.slice(1);

        if ((PROPERTY.fieldId.description === "Short Text" || PROPERTY.fieldId.description === "Number") && contentField.isInEditorForm)
        {
            const INPUT = document.createElement("input");
            INPUT.type = "text";
            INPUT.id = camelPropertyTitle;
            if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle]) INPUT.value = CONTENT_DATA.properties[camelPropertyTitle];

            PROPERTY_DIV.appendChild(INPUT);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);
        }
        else if (PROPERTY.fieldId.description === "Long Text" && contentField.isInEditorForm)
        {
            const TEXTAREA = document.createElement("textarea");
            TEXTAREA.id = camelPropertyTitle;

            if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle]) TEXTAREA.value = CONTENT_DATA.properties[camelPropertyTitle];

            PROPERTY_DIV.appendChild(TEXTAREA);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);
        }
        else if ((PROPERTY.fieldId.description === "Lookup Multi-Select Chip View" || 
            PROPERTY.fieldId.description === "Related Content Definition") && contentField.isInEditorForm)
        {
            const SELECT = document.createElement("select");
            SELECT.multiple = PROPERTY.fieldId.description === "Lookup Multi-Select Chip View";
            SELECT.id = camelPropertyTitle;
            
            const CONTENT_DEFINITION_ID = PROPERTY.fieldId.description === "Lookup Multi-Select Chip View" ?
                PROPERTY.lookupDropdownProperties.lookupKey :
                PROPERTY.relatedContentDefinition.id;

            const FORM_DATA = new FormData();
            FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);
            FORM_DATA.append("languageId", LANGUAGE_ID);

            const OPTIONS = await sendRequest("/getContents", "POST", FORM_DATA);
            
            for (let option of OPTIONS)
            {
                const OPTION = document.createElement("option");
                OPTION.value = option.id;
                OPTION.text = option.title;

                if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle]) 
                {
                    if (PROPERTY.fieldId.description === "Lookup Multi-Select Chip View")
                    {
                        for (let selectedOption of CONTENT_DATA.properties[camelPropertyTitle])
                        {
                            if (selectedOption.id === option.id)
                            {
                                OPTION.selected = true;
                            }
                        }
                    }
                    else if (CONTENT_DATA.properties[camelPropertyTitle].id === option.id)
                    {
                        OPTION.selected = true;
                    }
                }

                SELECT.appendChild(OPTION);
            }

            PROPERTY_DIV.appendChild(SELECT);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);

            $(SELECT).select2();
        }
        else if (PROPERTY.fieldId.description === "Asset Selector" && contentField.isInEditorForm)
        {
            LABEL.textContent += " Id";

            const INPUT = document.createElement("input");
            INPUT.type = "text";
            INPUT.id = camelPropertyTitle;

            if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle]) INPUT.value = CONTENT_DATA.properties[camelPropertyTitle].id;

            PROPERTY_DIV.appendChild(INPUT);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);
        }
        else if (PROPERTY.fieldId.description === "Date" && contentField.isInEditorForm)
        {
            const INPUT = document.createElement("input");
            INPUT.type = "datetime-local";
            INPUT.id = camelPropertyTitle;

            const DATE = new Date(CONTENT_DATA.properties[camelPropertyTitle]);
            if (!isNaN(DATE))
            {
                const FROMATTED_DATE = DATE.toISOString().slice(0, -8);
                if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle]) INPUT.value = FROMATTED_DATE;
            }

            PROPERTY_DIV.appendChild(INPUT);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);
        }
        else if (PROPERTY.fieldId.description === "Checkbox" && contentField.isInEditorForm)
        {
            const INPUT = document.createElement("select");
            INPUT.id = camelPropertyTitle;

            const TRUE_OPTION = document.createElement("option");
            TRUE_OPTION.value = "true";
            TRUE_OPTION.text = "True";

            const FALSE_OPTION = document.createElement("option");
            FALSE_OPTION.value = "false";
            FALSE_OPTION.text = "False";

            if (CONTENT_DATA && CONTENT_DATA.properties[camelPropertyTitle])
            {
                if (CONTENT_DATA.properties[camelPropertyTitle] === "true")
                {
                    TRUE_OPTION.selected = true;
                }
                else
                {
                    FALSE_OPTION.selected = true;
                }
            }

            INPUT.appendChild(TRUE_OPTION);
            INPUT.appendChild(FALSE_OPTION);

            PROPERTY_DIV.appendChild(INPUT);
            PROPERTIES_DIV.appendChild(PROPERTY_DIV);

            $(INPUT).select2();
        }
    }
    
    DIV.appendChild(PROPERTIES_DIV);

    SUBMIT_BUTTON.hidden = false;
}

CREATE_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const FORM_DATA = getElements(CREATE_FORM);
    await sendRequest("/createContent", "POST", FORM_DATA);
});

GET_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const FORM_DATA = getElements(GET_FORM);
    await sendRequest("/getContent", "POST", FORM_DATA);
});

UPDATE_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const FORM_DATA = getElements(UPDATE_FORM);
    await sendRequest("/updateContent", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const FORM_DATA = getElements(DELETE_FORM);
    await sendRequest("/deleteContent", "POST", FORM_DATA);
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.id === "") continue;
        if (input.tagName === "SELECT") {
            const SELECTED_OPTIONS = []
            for (let element of input) {
                if (element.selected) {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) {
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
            if (input.multiple)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS));
            }
            else if (SELECTED_OPTIONS.length > 0)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS[0]));
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            if (input.id) {
                FORM_DATA.append(input.id, input.value);
            } else {
                FORM_DATA.append(input.name, input.value);
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
            try
            {
                const DATA = await RESPONSE.json();
                if (DATA) return DATA;
            }
            catch (error)
            {
                console.log("No data returned");
            }
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
const PLACEHOLDER_FORM = document.getElementById("placeholderForm");

const LANGUAGE_SELECT = document.getElementById("languageSelect");
const TAGS_SELECT = document.getElementById("tagsSelect");

await getLanguages();

async function getLanguages()
{
    const LANGUAGES = await sendRequest("/languages", "GET");

    for (let language of LANGUAGES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = language.id;
        OPTION.text = language.title;
        LANGUAGE_SELECT.appendChild(OPTION);
    }

    $(LANGUAGE_SELECT).select2();
}

await getTags();

async function getTags()
{
    const TAGS = await sendRequest("/tags", "GET");

    for (let tag of TAGS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = tag.id;
        OPTION.text = tag.title;
        TAGS_SELECT.appendChild(OPTION);
    }

    $(TAGS_SELECT).select2();
}

PLACEHOLDER_FORM.addEventListener("submit", async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(PLACEHOLDER_FORM);

    await sendRequest("/create-placeholder", "POST", FORM_DATA);
});

// gets the values from the form
function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.type === "file")
        {
            for (let file of input.files)
            {
                FORM_DATA.append(input.id, file);
            }
        }
        else if (input.tagName === "SELECT") 
        {
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
            if (input.id) {
                FORM_DATA.append(input.id, input.value);
            } else {
                FORM_DATA.append(input.name, input.value);
            }
        }
    }

    return FORM_DATA;
}

// sends a request to the server
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
            {}
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
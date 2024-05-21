const GET_CONTENT_DEFINITIONS_FORM = document.getElementById("getContentDefinitionsForm");
const GET_CONTENT_DEFINITION_FORM = document.getElementById("getContentDefinitionForm");

GET_CONTENT_DEFINITIONS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONTENT_DEFINITIONS_FORM);

    const CONTENT_DEFINITIONS = await sendRequest("/getContentDefinitions", "POST", FORM_DATA);

    if (CONTENT_DEFINITIONS) console.log(CONTENT_DEFINITIONS);
});

GET_CONTENT_DEFINITION_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONTENT_DEFINITION_FORM);

    const CONTENT_DEFINITION = await sendRequest("/getContentDefinition", "POST", FORM_DATA);

    if (CONTENT_DEFINITION) console.log(CONTENT_DEFINITION);
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
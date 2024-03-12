const UPLOAD_ASSET_FORM = document.getElementById("uploadAssetForm");
const UPLOAD_RELATED_ASSET_FORM = document.getElementById("uploadRelatedAssetForm");

UPLOAD_ASSET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(UPLOAD_ASSET_FORM);

    console.log(await sendRequest("/uploadAsset", "POST", FORM_DATA));
});

UPLOAD_RELATED_ASSET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(UPLOAD_RELATED_ASSET_FORM);

    console.log(await sendRequest("/uploadRelatedAsset", "POST", FORM_DATA))
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
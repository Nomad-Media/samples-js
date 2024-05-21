const SEARCH = document.getElementById("search");
const SEARCH_BUTTON = document.getElementById("searchButton");
 
const INITIAL_RESULTS_DIV = document.getElementById("initialResults");
const MOST_RECENT_RESULTS_DIV = document.getElementById("mostRecentResults");
const NUM_RESULTS = document.getElementById("numResults");
const SEARCH_RESULTS_DIV = document.getElementById("searchResults");
const TOP_RESULTS_DIV = document.getElementById("topResults");

await displayMostRecent();

async function displayMostRecent()
{
    const FORM_DATA = new FormData();
    FORM_DATA.append("sortBy", "createdDate");

    const SEARCH_RESULTS = await sendRequest("/search", "POST", FORM_DATA);

    await displayResults(null, SEARCH_RESULTS.items, MOST_RECENT_RESULTS_DIV);
}

SEARCH_BUTTON.addEventListener("click", async () =>
{
    INITIAL_RESULTS_DIV.innerHTML = "";
    SEARCH_RESULTS_DIV.innerHTML = "";

    const FORM_DATA = new FormData();

    FORM_DATA.append("query", SEARCH.value);
    FORM_DATA.append("sortBy", "score");

    const SEARCH_RESULTS = await sendRequest("/search", "POST", FORM_DATA);

    if (SEARCH_RESULTS && SEARCH_RESULTS.items.length > 0)
    {
        await displayResults(SEARCH.value, SEARCH_RESULTS.items, SEARCH_RESULTS_DIV);
    }
    else
    {
        const NO_RESULTS_TEXT = document.createElement("p");
        NO_RESULTS_TEXT.textContent = "No results found";
        NUM_RESULTS.appendChild(NO_RESULTS_TEXT);
    }
});

async function displayResults(QUERY, RESULTS, DIV)
{
    const NUM_RESULTS_DIV = document.getElementById("numResults");
    NUM_RESULTS_DIV.innerHTML = "";

    if (QUERY)
    {
        const NUM_RESULTS = RESULTS.length;
        const NUM_RESULTS_TEXT_DIV = document.createElement("div");
        NUM_RESULTS_TEXT_DIV.classList.add("num-results-text");
        const NUM_RESULTS_TEXT = document.createElement("p");
        NUM_RESULTS_TEXT.textContent = `Found ${NUM_RESULTS} results for "${QUERY}"`;
        NUM_RESULTS_TEXT_DIV.appendChild(NUM_RESULTS_TEXT);
        NUM_RESULTS_DIV.appendChild(NUM_RESULTS_TEXT_DIV);
    }

    for (const result of RESULTS)
    {
        const RESULT_DIV = document.createElement("div");
        RESULT_DIV.classList.add("result");

        const DESCRIPTION = document.createElement("p");
        DESCRIPTION.textContent = result.description;
        RESULT_DIV.appendChild(DESCRIPTION);

        if (result.identifiers.thumbnailImageFullUrl)
        {
            const THUMBNAIL = document.createElement("img");
            THUMBNAIL.src = result.identifiers.thumbnailImageFullUrl;
            THUMBNAIL.classList.add("thumbnail");
            RESULT_DIV.appendChild(THUMBNAIL);
        }
        //if (result.imageUrl)
        //{
        //    const THUMBNAIL = document.createElement("img");
        //    THUMBNAIL.src = result.imageUrl;
        //    THUMBNAIL.classList.add("thumbnail");
//
        //    RESULT_DIV.appendChild(THUMBNAIL);
        //}
        else
        {
            const PLACEHOLDER = document.createElement("div");
            PLACEHOLDER.classList.add("placeholder");

            RESULT_DIV.appendChild(PLACEHOLDER);
        }

        const TITLE = document.createElement("p");
        TITLE.classList.add("title");
        TITLE.textContent = result.title;
        RESULT_DIV.appendChild(TITLE);

        const BOTTOM_DIV = document.createElement("div");
        BOTTOM_DIV.classList.add("flex");

        if (result.createdDate)
        {
            const DATE = document.createElement("p");
            DATE.classList.add("date");
            DATE.textContent = result.createdDate.split("T")[0];
            BOTTOM_DIV.appendChild(DATE);
        }
        //if (result.date)
        //{
        //    const DATE = document.createElement("p");
        //    DATE.classList.add("date");
        //    DATE.textContent = result.date.split("T")[0];
        //    BOTTOM_DIV.appendChild(DATE);
        //}

        const BUTTON = document.createElement("button");
        const SPAN_TEXT = document.createElement("span");
        BUTTON.classList.add("view-button");
        SPAN_TEXT.textContent = "View";
        BUTTON.appendChild(SPAN_TEXT);


        BUTTON.addEventListener("click", async () =>
        {
            const FORM_DATA = new FormData();
            FORM_DATA.append("assetId", result.id);

            const ASSET = await sendRequest("/asset", "POST", FORM_DATA);
            createDialog(ASSET, result.title);
        });
        //BUTTON.addEventListener("click", async () =>
        //{
        //    const FORM_DATA = new FormData();
        //    FORM_DATA.append("id", result.itemId);
//
        //    const MEDIA_ITEM = await sendRequest("/getMediaItem", "POST", FORM_DATA);
        //    createDialog(MEDIA_ITEM, result.title);
        //});

        BOTTOM_DIV.appendChild(BUTTON);

        RESULT_DIV.appendChild(BOTTOM_DIV);
        DIV.appendChild(RESULT_DIV);
    }
}

function createDialog(ASSET, TITLE)
{
    debugger;
    const DIALOG = document.createElement("dialog");
    DIALOG.classList.add("dialog");

    const DIALOG_CONTENT = document.createElement("div");
    DIALOG_CONTENT.classList.add("dialog-content");

    const CLOSE_BUTTON = document.createElement("button");
    CLOSE_BUTTON.classList.add("close-button");
    CLOSE_BUTTON.innerText = "Close";
    CLOSE_BUTTON.addEventListener("click", () => DIALOG.remove());
    DIALOG_CONTENT.appendChild(CLOSE_BUTTON);

    if (ASSET.properties.embedCode)
    {
        const EMBED_CODE = document.createElement("div");
        EMBED_CODE.innerHTML = ASSET.properties.embedCode;
        EMBED_CODE.classList.add("embed-code");
        
        const IFRAME = EMBED_CODE.querySelector("iframe");
        IFRAME.classList.add("iframe");

        DIALOG_CONTENT.appendChild(EMBED_CODE);
    }

    DIALOG.appendChild(DIALOG_CONTENT);
    document.body.appendChild(DIALOG);

    DIALOG.showModal();
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


import NomadMediaSDK from "@nomad-media/public";
import config from "../config.js";

const NomadSDK = new NomadMediaSDK(config);

const SEARCH = document.getElementById("search");
const SEARCH_BUTTON = document.getElementById("searchButton");
const SEARCH_SELECT = document.getElementById("searchSelect");

const LOADING_INITIAL_RESULTS_TEXT = document.getElementById("loadingInitialResults");
const LOADING_HIGHLIGHED_RESULTS_TEXT = document.getElementById("loadingHighlightedResults");
const LOADING_RESULTS_TEXT = document.getElementById("loadingResults");
 
const HIGHLIGHTED_RESULTS_DIV = document.getElementById("highlightedResults");
const INITIAL_RESULTS_DIV = document.getElementById("initialResults");
const MOST_RECENT_RESULTS_DIV = document.getElementById("mostRecentResults");
const NUM_RESULTS_DIV = document.getElementById("numResults");
const RESULTS_DIV = document.getElementById("results");
const SEARCH_RESULTS_DIV = document.getElementById("searchResults");

init();

async function init()
{
    await displayMostRecent();
    await displayHighlighedCases();
}

async function displayMostRecent()
{
    const SEARCH_RESULTS = await search(null, "displayDate", "descending", 10);
    await displayResults(null, SEARCH_RESULTS, MOST_RECENT_RESULTS_DIV, 10, LOADING_INITIAL_RESULTS_TEXT);
}

async function displayHighlighedCases()
{
    const SEARCH_RESULTS = await search(null, "displayDate", "descending", null, ["dbe78812-b047-4b55-9812-faf32e5f92ad"]);
    await displayResults(null, SEARCH_RESULTS, HIGHLIGHTED_RESULTS_DIV, 10, LOADING_HIGHLIGHED_RESULTS_TEXT);
}

document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) 
    {
        event.preventDefault();
        document.getElementById('searchButton').click();
    }
});

SEARCH_BUTTON.addEventListener("click", async () =>
{
    INITIAL_RESULTS_DIV.innerHTML = "";
    SEARCH_RESULTS_DIV.innerHTML = "";
    NUM_RESULTS_DIV.innerHTML = "";

    INITIAL_RESULTS_DIV.style.display = "none";
    INITIAL_RESULTS_DIV.hidden = true;

    RESULTS_DIV.hidden = false;

    const COURT_VALUE = SEARCH_SELECT.value == "" ? "" : [SEARCH_SELECT.value];

    const SEARCH_RESULTS = await search(SEARCH.value, "displayDate", "descending", null, COURT_VALUE);

    if (SEARCH_RESULTS && SEARCH_RESULTS.length > 0)
    {
        await displayResults(SEARCH.value, SEARCH_RESULTS, SEARCH_RESULTS_DIV, null, LOADING_RESULTS_TEXT);
    }
    else
    {
        const NO_RESULTS_TEXT = document.createElement("p");
        NO_RESULTS_TEXT.classList.add("num-results-text");
        NO_RESULTS_TEXT.textContent = "No results found";
        NUM_RESULTS_DIV.appendChild(NO_RESULTS_TEXT);
        LOADING_RESULTS_TEXT.remove();
    }
});

async function displayResults(QUERY, RESULTS, DIV, NUM_RESULTS, LOADING_TEXT)
{
    let loading = true;

    const NUM_RESULTS_DIV = document.getElementById("numResults");
    NUM_RESULTS_DIV.innerHTML = "";

    let numResultsShown = 0;

    for (const result of RESULTS)
    {
        if (result.video)
        {
            ++numResultsShown;
            const RESULT_DIV = document.createElement("div");
            RESULT_DIV.classList.add("result");

            const DESCRIPTION = document.createElement("p");
            DESCRIPTION.textContent = result.description;
            RESULT_DIV.appendChild(DESCRIPTION);

            if (result.previewUrl || result.imgageUrl || result.thumbnailImageUrl)
            {
                const URL = result.previewUrl || result.imageUrl || result.previewImageImageUrl;
                const THUMBNAIL = document.createElement("img");

                THUMBNAIL.src = URL;
                THUMBNAIL.classList.add("thumbnail");
                RESULT_DIV.appendChild(THUMBNAIL);
            }
            else
            {
                const PLACEHOLDER = document.createElement("div");
                PLACEHOLDER.classList.add("placeholder");

                RESULT_DIV.appendChild(PLACEHOLDER);
            }

            const INFO_DIV = document.createElement("div");
            INFO_DIV.classList.add("info");

            const TITLE = document.createElement("p");
            TITLE.classList.add("title");
            TITLE.textContent = result.caseNumber ? result.caseNumber : result.title;
            INFO_DIV.appendChild(TITLE);

            if (result.name && TITLE.textContent !== result.name.replace(".mp4", ""))
            {
                const NAME = document.createElement("p");
                NAME.classList.add("name");
                NAME.textContent = result.name.replace(".mp4", "");
                INFO_DIV.appendChild(NAME);
            }

            RESULT_DIV.appendChild(INFO_DIV);

            const BOTTOM_DIV = document.createElement("div");
            BOTTOM_DIV.classList.add("flex");

            if (result.displayDate)
            {
                const DATE = document.createElement("p");
                DATE.classList.add("date");
                const DATE_STR = new Date(result.displayDate).toLocaleDateString();
                DATE.textContent = DATE_STR.split("T")[0];
                BOTTOM_DIV.appendChild(DATE);
            }

            const BUTTON = document.createElement("button");
            const SPAN_TEXT = document.createElement("span");
            BUTTON.classList.add("view-button");
            SPAN_TEXT.textContent = "View";
            BUTTON.appendChild(SPAN_TEXT);

            RESULT_DIV.addEventListener("click", async () =>
            {
                const FORM_DATA = new FormData();
                FORM_DATA.append("id", result.itemId);

                await createDialog(result);
            });

            BOTTOM_DIV.appendChild(BUTTON);

            RESULT_DIV.appendChild(BOTTOM_DIV);

            if (loading)
            {
                LOADING_TEXT.remove();
                loading = false;
            }

            DIV.appendChild(RESULT_DIV);

            const TITLE_NAME = document.querySelector(".title, .name");
            if (TITLE_NAME !== null)
            {
                const ELEMENTS = NodeList.prototype.isPrototypeOf(TITLE_NAME) ? TITLE_NAME : [TITLE_NAME];
                ELEMENTS.forEach(element => {
                    if (element.scrollHeight > element.clientHeight) 
                    {
                        element.style.height = "2.99rem";
                    }
                });
            }

            if (NUM_RESULTS !== null && numResultsShown >= NUM_RESULTS)
            {
                break;
            }
        }
    }

    if (QUERY !== null)
    {
        const NUM_RESULTS_TEXT_DIV = document.createElement("div");
        NUM_RESULTS_TEXT_DIV.classList.add("num-results-text");
        const NUM_RESULTS_TEXT = document.createElement("p");

        const NUM_RESULTS = SEARCH_RESULTS_DIV.querySelectorAll(".result").length;
        NUM_RESULTS_TEXT.textContent = `Found ${NUM_RESULTS} results${QUERY == "" ? "" : ` for ${QUERY}`} in ${SEARCH_SELECT.selectedOptions[0].label}`;

        const CLOSE_BUTTON = document.createElement("button");
        CLOSE_BUTTON.textContent = "X";
        CLOSE_BUTTON.classList.add("found-close-button");
        CLOSE_BUTTON.addEventListener("click", () => window.location.href = "/index.html");

        NUM_RESULTS_TEXT_DIV.appendChild(NUM_RESULTS_TEXT);
        NUM_RESULTS_TEXT_DIV.appendChild(CLOSE_BUTTON);
        NUM_RESULTS_DIV.appendChild(NUM_RESULTS_TEXT_DIV);
    }
}

async function createDialog(ASSET)
{
    const DIALOG = document.createElement("dialog");
    DIALOG.classList.add("dialog");

    const DIALOG_CONTENT = document.createElement("div");
    DIALOG_CONTENT.classList.add("dialog-content");
    
    fetch(`${config.serviceApiUrl}/api/embedded/share-media?id=${ASSET.itemId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    })
    .then(response => {
        const IFRAME = document.createElement("iframe");
        IFRAME.classList.add("iframe");
        IFRAME.src = response.url;
        console.log("URL" + response.url);
        IFRAME.frameBorder = "0";
        IFRAME.allow = "fullscreen";
        DIALOG_CONTENT.appendChild(IFRAME);
    })
    .catch(e => {
        console.log('Error loading iframe: ' + e.message);
        DIALOG.remove();
    });

    const BUTTON_CONTAINER = document.createElement("div");
    BUTTON_CONTAINER.classList.add("button-container");

    const CLOSE_BUTTON = document.createElement("button");
    CLOSE_BUTTON.classList.add("nice-button");
    CLOSE_BUTTON.innerText = "Close";
    CLOSE_BUTTON.addEventListener("click", () => DIALOG.remove());
    BUTTON_CONTAINER.appendChild(CLOSE_BUTTON);

    //const VIDEO_URL = ASSET.video.fullUrl;
    //if (VIDEO_URL) 
    //{
    //    const VIDEO_DOWNLOAD_BUTTON = document.createElement("button");
    //    VIDEO_DOWNLOAD_BUTTON.textContent = "Download Video";
    //    VIDEO_DOWNLOAD_BUTTON.addEventListener("click", async () => {
    //        try
    //        {
    //            await startDownload(VIDEO_URL, ASSET.title, DIALOG);
    //        }
    //        catch (error)
    //        {
    //            console.error("Failed to download video");
    //        }
    //    });
    //    BUTTON_CONTAINER.appendChild(VIDEO_DOWNLOAD_BUTTON);
    //}

    DIALOG_CONTENT.appendChild(BUTTON_CONTAINER);
    
    DIALOG.appendChild(DIALOG_CONTENT);
    document.body.appendChild(DIALOG);

    DIALOG.showModal();
}

async function search(QUERY, SORT_BY, SORT_TYPE, PAGE_SIZE, ID)
{
    let offset = 0;

    if (!PAGE_SIZE) PAGE_SIZE = 100;
    //if (!ID) ID = ["f855b07e-2f83-493b-a14b-537dbef9898b"];
    const MEDIA_VIDEOS = [];

    while (true)
    {
        const MEDIA_ITEMS = await NomadSDK.mediaSearch(QUERY, ID, 
            [
                {
                    "fieldName": SORT_BY,
                    "sortType": SORT_TYPE === "ascending" ? 0 : 1
                }
            ], offset, null);

        MEDIA_VIDEOS.push(...MEDIA_ITEMS.filter(item => item.contentDefinition.id === "22470571-8d03-4b04-b8dc-4f7e91aa57d4"));

        if (MEDIA_VIDEOS.length >= PAGE_SIZE || MEDIA_ITEMS.length === 0)
        {
            return MEDIA_VIDEOS.slice(0, PAGE_SIZE);
        }

        ++offset;
    }
}

async function startDownload(VIDEO_URL, TITLE, DIALOG) 
{
    DIALOG.remove();

    Swal.fire({
        title: 'Downloading',
        text: 'Please wait...',
        showCloseButton: true,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try
    {
        const RESPONSE = await fetch(VIDEO_URL);
        const BLOB = await RESPONSE.blob();
        const LINK = document.createElement("a");
        LINK.href = URL.createObjectURL(BLOB);
        LINK.download = TITLE;
        LINK.click();

        Swal.close();

        Swal.fire({
            title: 'Download Complete',
            text: 'The video has been downloaded',
            icon: 'success'
        });
    }
    catch (error)
    {
        Swal.close();

        Swal.fire({
            title: 'Download Failed',
            text: 'Failed to download the video',
            icon: 'error'
        });
    }
}
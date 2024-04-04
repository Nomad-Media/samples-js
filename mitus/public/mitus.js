const UPLOAD_VIDEO_FORM = document.getElementById("uploadVideoForm");

const CONTENT_RATING_SELECT = document.getElementById("contentRatingSelect");
const FEATURED_GROUPS_SELECT = document.getElementById("featuredGroupsSelect");
const GENRES_SELECT = document.getElementById("genresSelect");
const LANGUAGES_SELECT = document.getElementById("languagesSelect");
const MEDIA_ATTRIBUTES_SELECT = document.getElementById("mediaAttributesSelect");
const PERFROMERS_SELECT = document.getElementById("performersSelect");
const PRIMARY_PERFRORMER_SELECT = document.getElementById("primaryPerformerSelect");
const SEASON_SELECT = document.getElementById("seasonSelect");
const SERIES_SELECT = document.getElementById("seriesSelect");
const TAGS_SELECT = document.getElementById("tagsSelect");
const VIDEO_TYPE_SELECT = document.getElementById("videoTypeSelect");

const MEDIA_TYPE_SELECT = document.getElementById("mediaTypeSelect");

const EPISODE_DIV = document.getElementById("episodeDiv");
const VIDEO_DIV = document.getElementById("videoDiv");

await getContentRatings();

async function getContentRatings()
{
    const CONTENT_RATINGS = await sendRequest("/content-ratings", "GET");
    for (let contentRating of CONTENT_RATINGS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = contentRating.id;
        OPTION.text = contentRating.title;
        CONTENT_RATING_SELECT.appendChild(OPTION);
    }

    $(CONTENT_RATING_SELECT).select2();
}

await getFeaturedGroups();

async function getFeaturedGroups()
{
    const FEATURED_GROUPS = await sendRequest("/featured-groups", "GET");
    for (let featuredGroup of FEATURED_GROUPS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = featuredGroup.id;
        OPTION.text = featuredGroup.title;
        FEATURED_GROUPS_SELECT.appendChild(OPTION);
    }

    $(FEATURED_GROUPS_SELECT).select2();
}

await getGenres();

async function getGenres()
{
    const GENRES = await sendRequest("/genres", "GET");
    for (let genre of GENRES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = genre.id;
        OPTION.text = genre.title;
        GENRES_SELECT.appendChild(OPTION);
    }

    $(GENRES_SELECT).select2();
}

await getLanguages();

async function getLanguages()
{
    const LANGUAGES = await sendRequest("/languages", "GET");
    for (let language of LANGUAGES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = language.id;
        OPTION.text = language.title;
        LANGUAGES_SELECT.appendChild(OPTION);
    }

    $(LANGUAGES_SELECT).select2();
}

await getMediaAttributes();

async function getMediaAttributes()
{
    const MEDIA_ATTRIBUTES = await sendRequest("/media-attributes", "GET");
    for (let mediaAttribute of MEDIA_ATTRIBUTES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = mediaAttribute.id;
        OPTION.text = mediaAttribute.title;
        MEDIA_ATTRIBUTES_SELECT.appendChild(OPTION);
    }

    $(MEDIA_ATTRIBUTES_SELECT).select2();
}

await getPerformers();

async function getPerformers()
{
    const PERFORMERS = await sendRequest("/performers", "GET");
    for (let performer of PERFORMERS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = performer.id;
        OPTION.text = performer.title;
        PERFROMERS_SELECT.appendChild(OPTION);
        PRIMARY_PERFRORMER_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(PERFROMERS_SELECT).select2();
    $(PRIMARY_PERFRORMER_SELECT).select2();
}

await getSeasons();

async function getSeasons()
{
    const SEASONS = await sendRequest("/seasons", "GET");
    for (let season of SEASONS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = season.id;
        OPTION.text = season.title;
        SEASON_SELECT.appendChild(OPTION);
    }

    $(SEASON_SELECT).select2();
}

await getSeries();

async function getSeries()
{
    const SERIES = await sendRequest("/series", "GET");
    for (let series of SERIES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = series.id;
        OPTION.text = series.title;
        SERIES_SELECT.appendChild(OPTION);
    }

    $(SERIES_SELECT).select2();
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

await getVideoTypes();

async function getVideoTypes()
{
    const VIDEO_TYPES = await sendRequest("/video-types", "GET");
    for (let videoType of VIDEO_TYPES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = videoType.id;
        OPTION.text = videoType.title;
        VIDEO_TYPE_SELECT.appendChild(OPTION);
    }

    $(VIDEO_TYPE_SELECT).select2();
}

MEDIA_TYPE_SELECT.addEventListener("change", async (event) => {
    const MEDIA_TYPE = event.target.value;
    
    if (MEDIA_TYPE === "episode")
    {
        EPISODE_DIV.hidden = false;
        VIDEO_DIV.hidden = true;
    }
    else if (MEDIA_TYPE === "video")
    {
        EPISODE_DIV.hidden = true;
        VIDEO_DIV.hidden = false;
    }
});

UPLOAD_VIDEO_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();

    const FORM_DATA = getElements(UPLOAD_VIDEO_FORM);

    await sendRequest("/upload", "POST", FORM_DATA);
});

function getElements(FORM)
{
    const FILES = [];
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
            return DATA;
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
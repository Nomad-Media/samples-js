const MY_UPLOADS_DIV = document.getElementById("myUploadsDiv");

const DELETE_VIDEO_FORM = document.getElementById("deleteVideoForm");
const UPLOAD_VIDEO_FORM = document.getElementById("uploadVideoForm");
const UPDATE_VIDEO_FORM = document.getElementById("updateVideoForm");

const CONTENT_RATINGS_SELECT = document.getElementById("contentRatingsSelect");
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

const UPDATE_MEDIA_TYPE_SELECT = document.getElementById("updateMediaTypeSelect");
const UPDATE_EPISODE_SELECT = document.getElementById("updateEpisodeSelect");
const UPDATE_VIDEO_SELECT = document.getElementById("updateVideoSelect");

const DELETE_MEDIA_TYPE_SELECT = document.getElementById("deleteMediaTypeSelect");
const DELETE_EPISODE_SELECT = document.getElementById("deleteEpisodeSelect");
const DELETE_VIDEO_SELECT = document.getElementById("deleteVideoSelect");

const EPISODE_DIV = document.getElementById("episodeDiv");
const VIDEO_DIV = document.getElementById("videoDiv");

const UPDATE_EPISODE_DIV = document.getElementById("updateEpisodeDiv");
const UPDATE_VIDEO_DIV = document.getElementById("updateVideoDiv");
const UPDATE_DIV = document.getElementById("updateDiv");

const DELETE_EPISODE_DIV = document.getElementById("deleteEpisodeDiv");
const DELETE_VIDEO_DIV = document.getElementById("deleteVideoDiv");

const EPISODE_KEY_ORDER = ["title", "series", "season", "shortDescription", "longDescription", "featuredGroups", "contentRatings", "performers", "tags", "languages"];
const VIDEO_KEY_ORDER = ["title", "shortDescription", "longDescription", "genre", "featuredGroups", "contentRatings", "performers", "primaryPerformer", "mediaAttributes", "tags", "languages", "videoType"];

await getUserUploadMedia();

async function getUserUploadMedia()
{
    const UPLOADS = await sendRequest("/user-upload-media", "GET");
    const EPISODE_UPLOADS = UPLOADS[0];
    const VIDEO_UPLOADS = UPLOADS[1];

    if (EPISODE_UPLOADS.length > 0)
    {
        MY_UPLOADS_DIV.appendChild(document.createElement("h3")).textContent = "Episodes";
        createTable(EPISODE_UPLOADS, EPISODE_KEY_ORDER);
    }

    if (VIDEO_UPLOADS.length > 0)
    {
        MY_UPLOADS_DIV.appendChild(document.createElement("h3")).textContent = "Videos";
        createTable(VIDEO_UPLOADS, VIDEO_KEY_ORDER);
    }
}

function createTable(UPLOADS, KEY_ORDER = [])
{
    let table = document.createElement("table");
    table.className = "styled-table";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    
    for (let key of KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

        let th = document.createElement("th");
        th.textContent = FORMATTED_KEY;
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    for (let upload of UPLOADS)
    {
        let uploadIdentifiers = upload.identifiers;
        let tr = document.createElement("tr");

        for (let key of KEY_ORDER)
        {
            let td = document.createElement("td");
            
            const values = [];
            if (Array.isArray(uploadIdentifiers[key]))
            {
                for (let value of uploadIdentifiers[key])
                {
                    values.push(value.description);
                }
                td.textContent = values.join(", ");
            }
            else if (Object.prototype.toString.call(uploadIdentifiers[key]) === '[object Object]')
            {
                td.textContent = uploadIdentifiers[key].description;
            }
            else
            {
                td.textContent = uploadIdentifiers[key];
            }
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    MY_UPLOADS_DIV.appendChild(table);
}

await getContentRatings();

async function getContentRatings()
{
    const CONTENT_RATINGS = await sendRequest("/content-ratings", "GET");
    for (let contentRating of CONTENT_RATINGS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = contentRating.id;
        OPTION.text = contentRating.title;
        CONTENT_RATINGS_SELECT.appendChild(OPTION);
    }

    $(CONTENT_RATINGS_SELECT).select2();
}

await getEpisodes();

async function getEpisodes()
{
    const EPISODES = await sendRequest("/episodes", "GET");
    for (let episode of EPISODES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = episode.id;
        OPTION.text = episode.title;
        UPDATE_EPISODE_SELECT.appendChild(OPTION);
        DELETE_EPISODE_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(UPDATE_EPISODE_SELECT).select2();
    $(DELETE_EPISODE_SELECT).select2();
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

await getVideos();

async function getVideos()
{
    const VIDEOS = await sendRequest("/videos", "GET");
    for (let video of VIDEOS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = video.id;
        OPTION.text = video.title;
        UPDATE_VIDEO_SELECT.appendChild(OPTION);
        DELETE_VIDEO_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(UPDATE_VIDEO_SELECT).select2();
    $(DELETE_VIDEO_SELECT).select2();
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

UPDATE_MEDIA_TYPE_SELECT.addEventListener("change", async (event) => {
    const MEDIA_TYPE = event.target.value;
    
    if (MEDIA_TYPE === "episode")
    {
        UPDATE_EPISODE_DIV.hidden = false;
        UPDATE_VIDEO_DIV.hidden = true;
    }
    else if (MEDIA_TYPE === "video")
    {
        UPDATE_EPISODE_DIV.hidden = true;
        UPDATE_VIDEO_DIV.hidden = false;
    }
});

$('#updateEpisodeSelect').on('select2:select', async (event) => {

    UPDATE_DIV.innerHTML = "";

    const EPISODES = await sendRequest("/episodes", "GET");
    const EPISODE = EPISODES.find(episode => episode.id === event.target.value);
    const EPISODE_DETAILS = EPISODE.identifiers;

    for (let key of EPISODE_KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
        const FORMATTED_KEY_HYPHEN = FORMATTED_KEY.replace(/\s+/g, '-').toLowerCase();
        if (!EPISODE_DETAILS[key])
        {
            const REQUESTS = await sendRequest("/api-paths", "GET");

            if (FORMATTED_KEY_HYPHEN[FORMATTED_KEY_HYPHEN.length - 1] === "s")
            {
                if (REQUESTS.includes(`/${FORMATTED_KEY_HYPHEN}`))
                {
                    EPISODE_DETAILS[key] = [];
                }
            }
            else
            {
                if (REQUESTS.includes(`/${FORMATTED_KEY_HYPHEN}s`))
                {
                    EPISODE_DETAILS[key] = {};
                }
            }
        }

        if (typeof(EPISODE_DETAILS[key]) === "string" || !EPISODE_DETAILS[key])
        {
            let input = document.createElement("input");
            input.id = key;
            input.value = EPISODE_DETAILS[key] ? EPISODE_DETAILS[key] : "";

            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            UPDATE_DIV.appendChild(label);
            UPDATE_DIV.appendChild(input);
        }
        else
        {
            let select = document.createElement("select");
            select.id = `update${key.charAt(0).toUpperCase() + key.slice(1)}Select`;

            if (Array.isArray(EPISODE_DETAILS[key]))
            {
                select.multiple = true;
            }

            let selectValues = []
            if (FORMATTED_KEY_HYPHEN[FORMATTED_KEY_HYPHEN.length - 1] === "s")
            {
                selectValues = await sendRequest(`/${FORMATTED_KEY_HYPHEN}`, "GET");
            }
            else
            {
                selectValues = await sendRequest(`/${FORMATTED_KEY_HYPHEN}s`, "GET");
            }


            for (let value of selectValues)
            {
                let option = document.createElement("option");
                option.value = value.id;
                option.text = value.description ? value.description : value.title;
                select.appendChild(option);
            }

            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            UPDATE_DIV.appendChild(label);
            UPDATE_DIV.appendChild(select);

            $(`#${select.id}`).select2();

            if (Array.isArray(EPISODE_DETAILS[key]))
            {
                for (let value of EPISODE_DETAILS[key])
                {
                    $(`#update${key.charAt(0).toUpperCase() + key.slice(1)}Select`).val(value.id).trigger("change");
                }
            }
            else
            {
                $(`#update${key.charAt(0).toUpperCase() + key.slice(1)}Select`).val(EPISODE_DETAILS[key].id).trigger("change");
            }
        }
    }
});

$('#updateVideoSelect').on('select2:select', async (event) => {
    UPDATE_DIV.innerHTML = "";

    const VIDEOS = await sendRequest("/videos", "GET");
    const VIDEO = VIDEOS.find(video => video.id === event.target.value);
    const VIDEO_DETAILS = VIDEO.identifiers;

    for (let key of VIDEO_KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
        const FORMATTED_KEY_HYPHEN = FORMATTED_KEY.replace(/\s+/g, '-').toLowerCase();
        if (!VIDEO_DETAILS[key])
        {
            const REQUESTS = await sendRequest("/api-paths", "GET");

            if (FORMATTED_KEY_HYPHEN[FORMATTED_KEY_HYPHEN.length - 1] === "s")
            {
                if (REQUESTS.includes(`/${FORMATTED_KEY_HYPHEN}`))
                {
                    VIDEO_DETAILS[key] = [];
                }
            }
            else
            {
                if (REQUESTS.includes(`/${FORMATTED_KEY_HYPHEN}s`))
                {
                    VIDEO_DETAILS[key] = {};
                }
            }
        }

        if (typeof(VIDEO_DETAILS[key]) === "string" || !VIDEO_DETAILS[key])
        {
            let input = document.createElement("input");
            input.id = key;
            input.value = VIDEO_DETAILS[key] ? VIDEO_DETAILS[key] : "";

            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            UPDATE_DIV.appendChild(label);
            UPDATE_DIV.appendChild(input);
        }
        else
        {
            let select = document.createElement("select");
            select.id = `#update${key.charAt(0).toUpperCase() + key.slice(1)}Select`;

            if (Array.isArray(VIDEO_DETAILS[key]))
            {
                select.multiple = true;
            }

            let selectValues = []
            if (FORMATTED_KEY_HYPHEN[FORMATTED_KEY_HYPHEN.length - 1] === "s")
            {
                selectValues = await sendRequest(`/${FORMATTED_KEY_HYPHEN}`, "GET");
            }
            else
            {
                selectValues = await sendRequest(`/${FORMATTED_KEY_HYPHEN}s`, "GET");
            }

            for (let value of selectValues)
            {
                let option = document.createElement("option");
                option.value = value.id;
                option.text = value.description ? value.description : value.title;
                select.appendChild(option);
            }

            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            UPDATE_DIV.appendChild(label);
            UPDATE_DIV.appendChild(select);

            $(`#${select.id}`).select2();

            if (Array.isArray(VIDEO_DETAILS[key]))
            {
                for (let value of VIDEO_DETAILS[key])
                {
                    $(`#update${key.charAt(0).toUpperCase() + key.slice(1)}Select`).val(value.id).trigger("change");
                }
            }
            else
            {
                $(`#update${key.charAt(0).toUpperCase() + key.slice(1)}Select`).val(VIDEO_DETAILS[key].id).trigger("change");
            }
        }
    }
});

UPDATE_VIDEO_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_VIDEO_FORM);

    await sendRequest("/update", "POST", FORM_DATA);
});

DELETE_MEDIA_TYPE_SELECT.addEventListener("change", async (event) => {
    const MEDIA_TYPE = event.target.value;
    
    if (MEDIA_TYPE === "episode")
    {
        DELETE_EPISODE_DIV.hidden = false;
        DELETE_VIDEO_DIV.hidden = true;
    }
    else if (MEDIA_TYPE === "video")
    {
        DELETE_EPISODE_DIV.hidden = true;
        DELETE_VIDEO_DIV.hidden = false;
    }
});

DELETE_VIDEO_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_VIDEO_FORM);
    console.log(FORM_DATA);

    await sendRequest("/delete", "POST", FORM_DATA);
});

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

async function sendRequest(PATH, METHOD, BODY)
{
    try
    {
        const REQUEST = { method: METHOD };
        if (BODY) REQUEST["body"] = BODY;
        console.log(PATH);
        console.log(REQUEST);
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
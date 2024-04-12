const MY_UPLOADS_DIV = document.getElementById("myUploadsDiv");

const CREATE_SERIES_FORM = document.getElementById("createSeriesForm");
const UPLOAD_VIDEO_FORM = document.getElementById("uploadVideoForm");

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

const EPISODE_DIV = document.getElementById("episodeDiv");
const VIDEO_DIV = document.getElementById("videoDiv");

const CREATE_SERIES_CONTENT_RATINGS_SELECT = document.getElementById("createSeriesContentRatingsSelect");
const CREATE_SERIES_FEATURE_GROUPS_SELECT = document.getElementById("createSeriesFeaturedGroupsSelect");
const CREATE_SERIES_GENRES_SELECT = document.getElementById("createSeriesGenresSelect");
const CREATE_SERIES_MEDIA_ATTRIBUTES_SELECT = document.getElementById("createSeriesMediaAttributesSelect");
const CREATE_SERIES_PERFORMERS_SELECT = document.getElementById("createSeriesPerformersSelect");
const CREATE_SERIES_RELATED_SERIES_SELECT = document.getElementById("createSeriesRelatedSeriesSelect");

const EPISODE_KEY_ORDER = ["title", "series", "season", "shortDescription", "longDescription", "featuredGroups", "contentRatings", "performers", "tags", "languages", "thumbnailImage"];
const VIDEO_KEY_ORDER = ["title", "shortDescription", "longDescription", "genres", "featuredGroups", "contentRatings", "performers", "primaryPerformer", "mediaAttributes", "tags", "languages", "videoType", "thumbnailImage"];
const SERIES_KEY_ORDER = ["name", "longDescription", "genres", "featuredGroups", "contentRatings", "performers", "mediaAttributes", "relatedSeries", "thumbnailImage", "titleIcon"];

const EPISODE_IMAGE_NAMES = ["mainVideo", "thumbnailImage"];
const VIDEO_IMAGE_NAMES = ["mainVideo", "thumbnailImage"];
const SERIES_IMAGE_VIDEO_NAMES = ["thumbnailImage", "titleIcon"];

const VIDEO_SUB_CALL_DICT = {
    "primary-performer": "performers"
}

const SERIES_SUB_CALL_DICT = {
    "related-series": "series"
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
        CREATE_SERIES_CONTENT_RATINGS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CONTENT_RATINGS_SELECT).select2();
    $(CREATE_SERIES_CONTENT_RATINGS_SELECT).select2();
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
        CREATE_SERIES_FEATURE_GROUPS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(FEATURED_GROUPS_SELECT).select2();
    $(CREATE_SERIES_FEATURE_GROUPS_SELECT).select2();
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
        CREATE_SERIES_GENRES_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(GENRES_SELECT).select2();
    $(CREATE_SERIES_GENRES_SELECT).select2();
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
        CREATE_SERIES_MEDIA_ATTRIBUTES_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(MEDIA_ATTRIBUTES_SELECT).select2();
    $(CREATE_SERIES_MEDIA_ATTRIBUTES_SELECT).select2();
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
        CREATE_SERIES_PERFORMERS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(PERFROMERS_SELECT).select2();
    $(PRIMARY_PERFRORMER_SELECT).select2();
    $(CREATE_SERIES_PERFORMERS_SELECT).select2();
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
        CREATE_SERIES_RELATED_SERIES_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(SERIES_SELECT).select2();
    $(CREATE_SERIES_RELATED_SERIES_SELECT).select2();
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

await getUserUploadMedia();

async function getUserUploadMedia()
{
    const EPISODE_CONTENT_DEFINITION_ID = "03c22d5f-b5a9-4c31-b46f-ece15be01d25";
    const SERIES_CONTENT_DEFINITION_ID = "9c1713ce-006c-4dc7-afb6-028df1fb3bf3";
    const VIDEO_CONTENT_DEFINITION_ID = "22470571-8d03-4b04-b8dc-4f7e91aa57d4";

    const EPISODES = await sendRequest("/episodes", "GET");
    const VIDEOS = await sendRequest("/videos", "GET");
    const SERIES = await sendRequest("/series", "GET");

    if (EPISODES.length > 0)
    {
        MY_UPLOADS_DIV.appendChild(document.createElement("h3")).textContent = "Episodes";
        await createTable("episode", EPISODES, EPISODE_CONTENT_DEFINITION_ID, EPISODE_KEY_ORDER, EPISODE_IMAGE_NAMES);
    }

    if (VIDEOS.length > 0)
    {
        MY_UPLOADS_DIV.appendChild(document.createElement("h3")).textContent = "Videos";
        await createTable("video", VIDEOS, VIDEO_CONTENT_DEFINITION_ID, VIDEO_KEY_ORDER, VIDEO_IMAGE_NAMES, VIDEO_SUB_CALL_DICT);
    }

    if (SERIES.length > 0)
    {
        MY_UPLOADS_DIV.appendChild(document.createElement("h3")).textContent = "Series";
        await createTable("series", SERIES, SERIES_CONTENT_DEFINITION_ID, SERIES_KEY_ORDER, SERIES_IMAGE_VIDEO_NAMES, SERIES_SUB_CALL_DICT);
    }
}

async function createTable(CONTENT_DEFINITION, UPLOADS, CONTENT_DEFINITION_ID, KEY_ORDER = [], IMAGE_VIDEO_NAMES = [], SUB_CALL_DICT = {})
{
    let table = document.createElement("table");
    table.className = "styled-table";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
   
    let th = document.createElement("th");
    tr.appendChild(th);

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

        let td = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = upload.id;
        td.appendChild(checkbox);
        tr.appendChild(td);

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
            else if (Object.prototype.toString.call(uploadIdentifiers[key]) === '[object Object]' && !IMAGE_VIDEO_NAMES.includes(key))
            {
                td.textContent = uploadIdentifiers[key].description;
            }
            else if (uploadIdentifiers[key] && IMAGE_VIDEO_NAMES.includes(key))
            {
                const FORM_DATA = new FormData();
                FORM_DATA.append("assetId", uploadIdentifiers[key].id);
                try
                {
                    let assetDetails = await sendRequest('/asset-details', 'POST', FORM_DATA);

                    let img = document.createElement("img");
                    img.src = assetDetails.properties.fullUrl;
                    img.width = 100;
                    img.height = 100;
                    td.appendChild(img);
                }
                catch (error)
                {}
            }
            else
            {
                td.textContent = uploadIdentifiers[key];
            }

            if (key === KEY_ORDER[0])
            {
                td.classList.add("pointer");
                td.classList.add("underline");
                
                td.addEventListener("click", () => {
                    let dialog = document.createElement("dialog");
                    dialog.id = `dialog${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}${key[0].toUpperCase() + key.slice(1)}`;

                    let form = document.createElement("form");
                    form.id = `form${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}${key[0].toUpperCase() + key.slice(1)}`;

                    let div = document.createElement("div");
                    div.id = `div${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}${key[0].toUpperCase() + key.slice(1)}`;

                    let closeButton = document.createElement("button");
                    closeButton.textContent = "X";
                    closeButton.style.position = "absolute";
                    closeButton.style.right = "0";
                    closeButton.style.top = "0";
                    closeButton.addEventListener("click", () => {
                        dialog.remove();
                        clearFormFields(div);
                    });

                    updateDiv(UPLOADS, upload.id, dialog.id, KEY_ORDER, div, CONTENT_DEFINITION, IMAGE_VIDEO_NAMES, SUB_CALL_DICT);

                    let updateButton = document.createElement("button");
                    updateButton.textContent = "Update";
                    updateButton.addEventListener("click", async () => {
                        event.preventDefault();

                        const FORM_DATA = getElements(form);
                        FORM_DATA.append("id", upload.id);

                        await sendRequest(`/update${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}`, "POST", FORM_DATA);
                        location.reload();
                    });

                    form.appendChild(div);
                    form.appendChild(document.createElement("br"));
                    form.appendChild(document.createElement("br"));
                    form.appendChild(updateButton);
                    dialog.appendChild(closeButton);
                    dialog.appendChild(form);
                    document.body.appendChild(dialog);

                    dialog.showModal();
                });
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    MY_UPLOADS_DIV.appendChild(table);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
        event.preventDefault();

        const checkboxes = table.querySelectorAll("input[type=checkbox]:checked");
        for (let checkbox of checkboxes)
        {
            const FORM_DATA = new FormData();
            FORM_DATA.append("id", checkbox.value);
            FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);
            await sendRequest("/deleteMedia", "POST", FORM_DATA);
            checkbox.parentNode.parentNode.remove();
        }
        location.reload();
    });

    MY_UPLOADS_DIV.appendChild(document.createElement("br"));
    MY_UPLOADS_DIV.appendChild(document.createElement("br"));
    MY_UPLOADS_DIV.appendChild(deleteButton);
}

function clearFormFields(div) 
{
    while (div.firstChild) 
    {
        div.removeChild(div.firstChild);
    }
}

function initializeSelect2InDialog(DIALOG_ID, select) {
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                let $DIALOG_ID = $(`#${DIALOG_ID}`);
                if ($DIALOG_ID.length > 0) {
                    $(`#${select.id}`).select2({
                        dropdownParent: $DIALOG_ID
                    }).on('select2:open', function() {
                        let $dropdown = $('.select2-dropdown');
                        let $select2 = $('.select2-container--open');
                        let offset = $select2.offset();
                        let height = $select2.outerHeight(false);

                        let top = offset.top + height - $(window).scrollTop();
                        let left = offset.left - $(window).scrollLeft();
                        
                        $dropdown.css({
                            position: 'fixed',
                            top: top + 'px',
                            left: left + 'px',
                        });
                    });

                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(document, { childList: true, subtree: true });
}

async function updateDiv(CONTENTS, CONTENT_ID, DIALOG_ID, KEY_ORDER, DIV, ELEMS_NAME, IMAGE_VIDEO_NAMES = [], SUB_CALL_DICT = {})
{
    const CONTENT = CONTENTS.find(content => content.id === CONTENT_ID);
    const CONTENT_DETAILS = CONTENT.identifiers;

    let ranImageVideoNames = false;

    for (let key of KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
        let formattedKeyHyphen = FORMATTED_KEY.replace(/\s+/g, '-').toLowerCase();
        if (!CONTENT_DETAILS[key] && !IMAGE_VIDEO_NAMES.includes(key))
        {
            const REQUESTS = await sendRequest("/api-paths", "GET");
            
            if (formattedKeyHyphen[formattedKeyHyphen.length - 1] === "s")
            {
                if (REQUESTS.includes(`/${formattedKeyHyphen}`))
                {
                    CONTENT_DETAILS[key] = [];
                }
            }
            else
            {
                if (REQUESTS.includes(`/${formattedKeyHyphen}s`))
                {
                    CONTENT_DETAILS[key] = {};
                }
            }
        }

        if (!ranImageVideoNames)
        {
            for (name of IMAGE_VIDEO_NAMES)
            {
                const FORMATTED_NAME = name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
                let label = document.createElement("label");
                label.textContent = FORMATTED_NAME;

                let file = document.createElement("input");
                file.id = name;
                file.type = "file";

                DIV.appendChild(label);
                DIV.appendChild(file);
            }
            ranImageVideoNames = true;
        }

        if (typeof(CONTENT_DETAILS[key]) === "string" || !CONTENT_DETAILS[key])
        {
            if (IMAGE_VIDEO_NAMES.includes(key)) continue;

            let input = document.createElement("input");
            input.id = key;
            input.value = CONTENT_DETAILS[key] ? CONTENT_DETAILS[key] : "";

            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            DIV.appendChild(label);
            DIV.appendChild(input);
        }
        else
        {
            if (IMAGE_VIDEO_NAMES.includes(key)) continue;

            let select = document.createElement("select");
            select.id = `update${ELEMS_NAME.charAt(0).toUpperCase() + ELEMS_NAME.slice(1)}${key.charAt(0).toUpperCase() + key.slice(1)}Select`;

            if (Array.isArray(CONTENT_DETAILS[key]))
            {
                select.multiple = true;
            }
            let selectValues = []
            if (SUB_CALL_DICT && SUB_CALL_DICT[formattedKeyHyphen])
            {
                formattedKeyHyphen = SUB_CALL_DICT[formattedKeyHyphen];
            }
            if (formattedKeyHyphen[formattedKeyHyphen.length - 1] === "s")
            {
                selectValues = await sendRequest(`/${formattedKeyHyphen}`, "GET");
            }
            else
            {
                selectValues = await sendRequest(`/${formattedKeyHyphen}s`, "GET");
            }

            let option = document.createElement("option");
            option.value = "";
            option.text = "Select";
            select.appendChild(option);
            for (let value of selectValues)
            {
                let option = document.createElement("option");
                option.value = value.id;
                option.text = value.description ? value.description : value.title;
                select.appendChild(option);
            }
            
            let label = document.createElement("label");
            label.textContent = FORMATTED_KEY;
            DIV.appendChild(label);
            DIV.appendChild(select);

            if (DIALOG_ID) initializeSelect2InDialog(DIALOG_ID, select);

            if (Array.isArray(CONTENT_DETAILS[key]))
            {
                for (let value of CONTENT_DETAILS[key])
                {
                    $(`#${select.id}`).val(value.id).trigger("change");
                }
            }
            else
            {
                $(`#${select.id}`).val(CONTENT_DETAILS[key].id).trigger("change");
            }
        }
    }
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

    await sendRequest("/uploadVideo", "POST", FORM_DATA);
});

CREATE_SERIES_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SERIES_FORM);

    await sendRequest("/createSeries", "POST", FORM_DATA);
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
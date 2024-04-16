const MY_UPLOADS_DIV = document.getElementById("myUploadsDiv");

const CREATE_SERIES_FORM = document.getElementById("createSeriesForm");
const UPLOAD_VIDEO_FORM = document.getElementById("uploadVideoForm");

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

await getUserUploadMedia();

async function getUserUploadMedia()
{
    const EPISODE_CONTENT_DEFINITION_ID = "03c22d5f-b5a9-4c31-b46f-ece15be01d25";
    const SERIES_CONTENT_DEFINITION_ID = "9c1713ce-006c-4dc7-afb6-028df1fb3bf3";
    const VIDEO_CONTENT_DEFINITION_ID = "22470571-8d03-4b04-b8dc-4f7e91aa57d4";

    // gets all the episodes, videos, and series that the user has uploaded
    const EPISODES = await sendRequest("/episodes", "GET");
    const VIDEOS = await sendRequest("/videos", "GET");
    const SERIES = await sendRequest("/series", "GET");

    // creates a table for each type of media that the user has uploaded
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

// creates a table for the media that the user has uploaded
async function createTable(CONTENT_DEFINITION, UPLOADS, CONTENT_DEFINITION_ID, KEY_ORDER = [], IMAGE_VIDEO_NAMES = [], SUB_CALL_DICT = {})
{
    let table = document.createElement("table");
    table.className = "styled-table";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
   
    let th = document.createElement("th");
    tr.appendChild(th);

    // creates the table headers
    for (let key of KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

        let th = document.createElement("th");
        th.textContent = FORMATTED_KEY;
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    // creates the table body
    let tbody = document.createElement("tbody");

    for (let upload of UPLOADS)
    {
        let uploadIdentifiers = upload.identifiers;
        let tr = document.createElement("tr");

        // creates a checkbox for each row
        let td = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = upload.id;
        td.appendChild(checkbox);
        tr.appendChild(td);

        // creates the table data for each row
        for (let key of KEY_ORDER)
        {
            let td = document.createElement("td");

            if (Array.isArray(uploadIdentifiers[key]))
            {
                const VALUES = [];
                for (let value of uploadIdentifiers[key])
                {
                    VALUES.push(value.description);
                }
                td.textContent = VALUES.join(", ");
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

            // creates a dialog for each row that allows the user to update the media
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

    // creates a button that allows the user to create new media
    let createButton = document.createElement("button");
    createButton.textContent = "Create";
    createButton.style.marginRight = "10px";

    createButton.addEventListener("click", () => {
        let dialog = document.createElement("dialog");
        dialog.id = `dialogCreate${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}`;

        let form = document.createElement("form");
        form.id = `formCreate${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}`;

        let div = document.createElement("div");
        div.id = `divCreate${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}`;

        let closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.style.position = "absolute";
        closeButton.style.right = "0";
        closeButton.style.top = "0";
        closeButton.addEventListener("click", () => {
            dialog.remove();
            clearFormFields(div);
        });

        updateDiv(UPLOADS, "", dialog.id, KEY_ORDER, div, CONTENT_DEFINITION, IMAGE_VIDEO_NAMES, SUB_CALL_DICT);

        let createButton = document.createElement("button");
        createButton.textContent = "Create";
        createButton.addEventListener("click", async () => {
            event.preventDefault();
            
            const FORM_DATA = getElements(form);

            await sendRequest(`/create${CONTENT_DEFINITION[0].toUpperCase() + CONTENT_DEFINITION.slice(1)}`, "POST", FORM_DATA);
            location.reload();
        });

        form.appendChild(div);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        form.appendChild(createButton);
        dialog.appendChild(closeButton);
        dialog.appendChild(form);
        document.body.appendChild(dialog);

        dialog.showModal();
    });

    MY_UPLOADS_DIV.appendChild(document.createElement("br"));
    MY_UPLOADS_DIV.appendChild(document.createElement("br"));
    MY_UPLOADS_DIV.appendChild(createButton);

    // creates a button that allows the user to delete media
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

    MY_UPLOADS_DIV.appendChild(deleteButton);
}

function clearFormFields(div) 
{
    while (div.firstChild) 
    {
        div.removeChild(div.firstChild);
    }
}

// makes the select2 dropdowns work in the dialog
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

// creates the form for updating or creating media
async function updateDiv(CONTENTS, CONTENT_ID, DIALOG_ID, KEY_ORDER, DIV, ELEMS_NAME, IMAGE_VIDEO_NAMES = [], SUB_CALL_DICT = {})
{
    const CONTENT = CONTENTS.find(content => content.id === CONTENT_ID);
    const CONTENT_DETAILS = CONTENT ? CONTENT.identifiers : {};

    let ranImageVideoNames = false;

    let title = document.createElement("h3");
    title.textContent = `${CONTENT_ID ? "Update" : "Create"} ${ELEMS_NAME[0].toUpperCase() + ELEMS_NAME.slice(1)}`;
    DIV.appendChild(title);

    for (let key of KEY_ORDER)
    {
        const FORMATTED_KEY = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
        let formattedKeyHyphen = FORMATTED_KEY.replace(/\s+/g, '-').toLowerCase();

        if (SUB_CALL_DICT && SUB_CALL_DICT[formattedKeyHyphen])
        {
            formattedKeyHyphen = SUB_CALL_DICT[formattedKeyHyphen];
        }

        // checks if the key is a sub call
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

        // creates the file inputs for the images and videos
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

        // creates the inputs for the rest of the form
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
            select.id = `${key}Select`;

            if (Array.isArray(CONTENT_DETAILS[key]))
            {
                select.multiple = true;
            }

            // gets the values for the select dropdown
            let selectValues = []
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

            // sets the selected values for the select dropdown
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
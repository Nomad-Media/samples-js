const CREATE_MEDIA_BUILDER_FORM = document.getElementById('createMediaBuilderForm');
const CREATE_MEDIA_BUILDER_ITEM_FORM = document.getElementById('createMediaBuilderItemForm');
const CREATE_MEDIA_BUILDER_ITEMS_ADD_ANNOTATIONS_FORM = document.getElementById('createMediaBuilderItemsAddAnnotationsForm');
const CREATE_MEDIA_BUILDER_ITEMS_BULK_FORM = document.getElementById('createMediaBuilderItemsBulkForm');
const DELETE_MEDIA_BUILDER_FORM = document.getElementById('deleteMediaBuilderForm');
const DELETE_MEDIA_BUILDER_ITEM_FORM = document.getElementById('deleteMediaBuilderItemForm');
const DUPLICATE_MEDIA_BUILDER_FORM = document.getElementById('duplicateMediaBuilderForm');
const GET_MEDIA_BUILDER_FORM = document.getElementById('getMediaBuilderForm');
const GET_MEDIA_BUILDERS_FORM = document.getElementById('getMediaBuildersForm');
const GET_MEDIA_BUILDER_IDS_FROM_ASSET_FORM = document.getElementById('getMediaBuilderIdsFromAssetForm');
const GET_MEDIA_BUILDER_ITEMS_FORM = document.getElementById('getMediaBuilderItemsForm');
const MOVE_MEDIA_BUILDER_ITEM_FORM = document.getElementById('moveMediaBuilderItemForm');
const RENDER_MEDIA_BUILDER_FORM = document.getElementById('renderMediaBuilderForm');
const UPDATE_MEDIA_BUILDER_FORM = document.getElementById('updateMediaBuilderForm');

const CREATE_MEDIA_BUILDER_COLLECTIONS_SELECT = document.getElementById('createMediaBuilderCollectionsSelect');
const CREATE_MEDIA_BUILDER_TAGS_SELECT = document.getElementById('createMediaBuilderTagsSelect');
const SOURCE_TYPE_SELECT = document.getElementById('sourceTypeSelect');
const DUPLICATE_MEDIA_BUILDER_COLLECTIONS_SELECT = document.getElementById('duplicateMediaBuilderCollectionsSelect');
const UPDATE_MEDIA_BUILDER_COLLECTIONS_SELECT = document.getElementById('updateMediaBuilderCollectionsSelect');
const UPDATE_MEDIA_BUILDER_TAGS_SELECT = document.getElementById('updateMediaBuilderTagsSelect');

const CREATE_MEDIA_BUILDER_PROPERTIES_DIV = document.getElementById('createMediaBuilderPropertiesDiv');
const ASSET_DIV = document.getElementById('assetDiv');
const ANNOTATION_DIV = document.getElementById('annotationDiv');
const ADD_MEDIA_BUILDER_ITEMS_DIV = document.getElementById('addMediaBuilderItemsDiv');
const DUPLICATE_MEDIA_BUILDER_PROPERTIES_DIV = document.getElementById('duplicateMediaBuilderPropertiesDiv');
const UPDATE_MEDIA_BUILDER_PROPERTIES_DIV = document.getElementById('updateMediaBuilderPropertiesDiv');

const CREATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON = document.getElementById('createMediaBuilderAddPropertyButton');
const ADD_MEDIA_BUILDER_ITEM_BUTTON = document.getElementById('addMediaBuilderItemButton');
const DUPLICATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON = document.getElementById('duplicateMediaBuilderAddPropertyButton');
const UPDATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON = document.getElementById('updateMediaBuilderAddPropertyButton');

await getCollectionsList();

async function getCollectionsList()
{
    const COLLECTIONS_LIST = await sendRequest('/get-collections-list', 'GET');

    for (let collectionIdx = 0; collectionIdx < COLLECTIONS_LIST.length; ++collectionIdx)
    {
        const OPTION = document.createElement('option');
        OPTION.value = COLLECTIONS_LIST[collectionIdx].id;
        OPTION.text = COLLECTIONS_LIST[collectionIdx].title;
        CREATE_MEDIA_BUILDER_COLLECTIONS_SELECT.appendChild(OPTION);
        DUPLICATE_MEDIA_BUILDER_COLLECTIONS_SELECT.appendChild(OPTION.cloneNode(true));
        UPDATE_MEDIA_BUILDER_COLLECTIONS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_MEDIA_BUILDER_COLLECTIONS_SELECT).select2();
    $(DUPLICATE_MEDIA_BUILDER_COLLECTIONS_SELECT).select2();
    $(UPDATE_MEDIA_BUILDER_COLLECTIONS_SELECT).select2();
}

await getTagsList();

async function getTagsList()
{
    const TAGS_LIST = await sendRequest('/get-tags-list', 'GET');

    for (let tagIdx = 0; tagIdx < TAGS_LIST.length; ++tagIdx)
    {
        const OPTION = document.createElement('option');
        OPTION.value = TAGS_LIST[tagIdx].id;
        OPTION.text = TAGS_LIST[tagIdx].title;
        CREATE_MEDIA_BUILDER_TAGS_SELECT.appendChild(OPTION);
        UPDATE_MEDIA_BUILDER_TAGS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_MEDIA_BUILDER_TAGS_SELECT).select2();
    $(UPDATE_MEDIA_BUILDER_TAGS_SELECT).select2();
}

CREATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON.addEventListener('click', async function (event)
{
    event.preventDefault();

    addProperties(CREATE_MEDIA_BUILDER_PROPERTIES_DIV);
});

ADD_MEDIA_BUILDER_ITEM_BUTTON.addEventListener('click', async function (event)
{
    event.preventDefault();

    let sourceAssetIdLabel = document.createElement('label');
    sourceAssetIdLabel.textContent = 'Source Asset ID';
    let sourceAssetIdInput = document.createElement('input');
    sourceAssetIdInput.type = 'text';
    sourceAssetIdInput.id = 'sourceAssetId';
    sourceAssetIdInput.required = true;

    let startTimeCodeLabel = document.createElement('label');
    startTimeCodeLabel.textContent = 'Start Time Code';
    let startTimeCodeInput = document.createElement('input');
    startTimeCodeInput.type = 'text';
    startTimeCodeInput.id = 'startTimeCode';

    let endTimeCodeLabel = document.createElement('label');
    endTimeCodeLabel.textContent = 'End Time Code';
    let endTimeCodeInput = document.createElement('input');
    endTimeCodeInput.type = 'text';
    endTimeCodeInput.id = 'endTimeCode';

    let relatedContentsLabel = document.createElement('label');
    relatedContentsLabel.textContent = 'Related Content Ids';
    let relatedContentsSelect = document.createElement('input');
    relatedContentsSelect.type = 'text';
    relatedContentsSelect.id = 'relatedContentIds';

    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    let br3 = document.createElement('br');
    let br4 = document.createElement('br');

    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(sourceAssetIdLabel);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(sourceAssetIdInput);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(startTimeCodeLabel);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(startTimeCodeInput);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(endTimeCodeLabel);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(endTimeCodeInput);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(relatedContentsLabel);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(relatedContentsSelect);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(br1);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(br2);

    let removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function (event) 
    {
        event.preventDefault();

        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(sourceAssetIdLabel);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(sourceAssetIdInput);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(startTimeCodeLabel);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(startTimeCodeInput);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(endTimeCodeLabel);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(endTimeCodeInput);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(relatedContentsLabel);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(relatedContentsSelect);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(br1);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(br2);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(br3);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(br4);
        ADD_MEDIA_BUILDER_ITEMS_DIV.removeChild(removeButton);
    });

    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(removeButton);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(br3);
    ADD_MEDIA_BUILDER_ITEMS_DIV.appendChild(br4);
});

DUPLICATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON.addEventListener('click', async function (event)
{
    event.preventDefault();

    addProperties(DUPLICATE_MEDIA_BUILDER_PROPERTIES_DIV);
});

UPDATE_MEDIA_BUILDER_ADD_PROPERTY_BUTTON.addEventListener('click', async function (event)
{
    event.preventDefault();

    addProperties(UPDATE_MEDIA_BUILDER_PROPERTIES_DIV);
});

SOURCE_TYPE_SELECT.addEventListener('change', async function (event)
{
    event.preventDefault();

    if (SOURCE_TYPE_SELECT.value === 'asset')
    {
        ASSET_DIV.style.display = 'block';
        ANNOTATION_DIV.style.display = 'none';
    }
    else if (SOURCE_TYPE_SELECT.value === 'annotation')
    {
        ASSET_DIV.style.display = 'none';
        ANNOTATION_DIV.style.display = 'block';
    }
});

CREATE_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_MEDIA_BUILDER_FORM);

    await sendRequest('/create-media-builder', 'POST', FORM_DATA)
});

CREATE_MEDIA_BUILDER_ITEM_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_MEDIA_BUILDER_ITEM_FORM);

    await sendRequest('/create-media-builder-item', 'POST', FORM_DATA)
});

CREATE_MEDIA_BUILDER_ITEMS_ADD_ANNOTATIONS_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_MEDIA_BUILDER_ITEMS_ADD_ANNOTATIONS_FORM);

    await sendRequest('/create-media-builder-items-add-annotations', 'POST', FORM_DATA)
});

CREATE_MEDIA_BUILDER_ITEMS_BULK_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_MEDIA_BUILDER_ITEMS_BULK_FORM);

    await sendRequest('/create-media-builder-items-bulk', 'POST', FORM_DATA)
});

DELETE_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_MEDIA_BUILDER_FORM);

    await sendRequest('/delete-media-builder', 'POST', FORM_DATA)
});

DELETE_MEDIA_BUILDER_ITEM_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_MEDIA_BUILDER_ITEM_FORM);

    await sendRequest('/delete-media-builder-item', 'POST', FORM_DATA)
});

DUPLICATE_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DUPLICATE_MEDIA_BUILDER_FORM);

    await sendRequest('/duplicate-media-builder', 'POST', FORM_DATA)
});

GET_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_MEDIA_BUILDER_FORM);

    await sendRequest('/get-media-builder', 'POST', FORM_DATA)
});

GET_MEDIA_BUILDERS_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    await sendRequest('/get-media-builders', 'GET')
});

GET_MEDIA_BUILDER_IDS_FROM_ASSET_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_MEDIA_BUILDER_IDS_FROM_ASSET_FORM);

    await sendRequest('/get-media-builder-ids-from-asset', 'POST', FORM_DATA)
});

GET_MEDIA_BUILDER_ITEMS_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_MEDIA_BUILDER_ITEMS_FORM);

    await sendRequest('/get-media-builder-items', 'POST', FORM_DATA)
});

MOVE_MEDIA_BUILDER_ITEM_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(MOVE_MEDIA_BUILDER_ITEM_FORM);

    await sendRequest('/move-media-builder-item', 'POST', FORM_DATA)
});

RENDER_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(RENDER_MEDIA_BUILDER_FORM);

    await sendRequest('/render-media-builder', 'POST', FORM_DATA)
});

UPDATE_MEDIA_BUILDER_FORM.addEventListener('submit', async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_MEDIA_BUILDER_FORM);

    await sendRequest('/update-media-builder', 'POST', FORM_DATA)
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

function addProperties(DIV) {
    let keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.name = 'key';
    keyInput.placeholder = 'Key';
    keyInput.style.width = "100px";

    let valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.name = 'value';
    valueInput.placeholder = 'Value';

    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    let br3 = document.createElement('br');
    let br4 = document.createElement('br');

    DIV.appendChild(keyInput);
    DIV.appendChild(valueInput);
    DIV.appendChild(br1);
    DIV.appendChild(br2);

    let removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function (event) {
        event.preventDefault();
        DIV.removeChild(keyInput);
        DIV.removeChild(valueInput);
        DIV.removeChild(br1);
        DIV.removeChild(br2);
        DIV.removeChild(br3);
        DIV.removeChild(br4);
        DIV.removeChild(removeButton);
    });

    DIV.appendChild(removeButton);
    DIV.appendChild(br3);
    DIV.appendChild(br4);
}
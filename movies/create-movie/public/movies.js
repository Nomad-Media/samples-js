import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";
const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";
const RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const MOVIE_CONTENT_DEFINITION_ID = "eb710e28-7c44-492e-91f9-8acd0cd9331c";
const LANGUAGE_ID = "c66131cd-27fc-4f83-9b89-b57575ac0ed8";

const createForm = document.getElementById("createForm");
const searchMoviesForm = document.getElementById("searchMoviesForm");
const getMovieForm = document.getElementById("getMovieForm");
const deleteMovieForm = document.getElementById("deleteMovieForm");

const typeSelect = document.getElementById("typeSelect");
const genreSelect = document.getElementById("genreSelect");
const performerSelect = document.getElementById("performerSelect");
const tagSelect = document.getElementById("tagSelect");
const ratingSelect = document.getElementById("ratingSelect");
const filtersDiv = document.getElementById("filtersDiv");
const addFilterButton = document.getElementById("addFilterButton");
const sortFieldsDiv = document.getElementById("sortFieldsDiv");
const addSortFieldsButton = document.getElementById("addSortFieldsButton");

const updateIdDiv = document.getElementById("updateIdDiv");

typeSelect.addEventListener("change", function (event)
{
    event.preventDefault();
    typeSelect.value === "create" ? updateIdDiv.hidden = true : updateIdDiv.hidden = false;
});

getGenreList();
getPerformerList();
getTagList();
getRatingList();

async function getGenreList()
{
    const genreList = await nomadSdk.search(
        null, null, null,
        [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: GENRE_CONTENT_DEFINITION_ID,
            }
        ],
        null, null, null, null, true, null
    );
    for(let genreIdx = 0; genreIdx < genreList.items.length; ++genreIdx)
    {
        let option = document.createElement("option");
        option.value = genreList.items[genreIdx].id;
        option.text = genreList.items[genreIdx].title;
        genreSelect.appendChild(option);
    }
    $(genreSelect).select2();
    return genreList.items;
}

async function getPerformerList()
{
    const performerList = await nomadSdk.search(
        null, null, null,
        [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: PERFORMER_CONTENT_DEFINITION_ID,
            }
        ],
        null, null, null, null, true, null
    );
    for(let performerIdx = 0; performerIdx < performerList.items.length; ++performerIdx)
    {
        let option = document.createElement("option");
        option.value = performerList.items[performerIdx].id;
        option.text = performerList.items[performerIdx].title;
        performerSelect.appendChild(option);
    }
    $(performerSelect).select2();
    return performerList.items;
}

async function getTagList()
{
    const tagList = await nomadSdk.search(
        null, null, null,
        [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: TAG_CONTENT_DEFINITION_ID,
            }
        ],
        null, null, null, null, true, null
    );
    for(let tagIdx = 0; tagIdx < tagList.items.length; ++tagIdx)
    {
        let option = document.createElement("option");
        option.value = tagList.items[tagIdx].id;
        option.text = tagList.items[tagIdx].title;
        tagSelect.appendChild(option);
    }
    $(tagSelect).select2();
    return tagList.items;
}

async function getRatingList()
{
    const ratingList = await nomadSdk.search(
        null, null, null,
        [
            {
                fieldName: "contentDefinitionId",
                operator: "Equals",
                values: RATING_CONTENT_DEFINITION_ID,
            },
            {
                fieldName: "languageId",
                operator: "Equals",
                values: LANGUAGE_ID
            }
        ],
        null, null, null, null, true, null
    );
    for(let ratingIdx = 0; ratingIdx < ratingList.items.length; ++ratingIdx)
    {
        let option = document.createElement("option");
        option.value = ratingList.items[ratingIdx].id;
        option.text = ratingList.items[ratingIdx].title;
        ratingSelect.appendChild(option);
    }
    $(ratingSelect).select2();
    return ratingList.items;
}

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createForm);

    let contentId = null;
    if (formData.typeSelect === "create") {
        const createMovieInfo = await nomadSdk.createContent(MOVIE_CONTENT_DEFINITION_ID);
        contentId = createMovieInfo.contentId;
    } else {
        contentId = formData.updateId;
    }

    // Handle image file
    let image = null;
    if (formData.imageFile && !formData.imageId) {
        const imageId = await nomadSdk.uploadAsset(
            null, null, null, "replace",
            formData.imageFile,
            null,
            null
        );
        image = { description: formData.imageFile.name, id: imageId };
    } else if (formData.imageId) {
        const imageInfo = await nomadSdk.getAssetDetails(formData.imageId);
        if (imageInfo) {
            image = { description: imageInfo.properties.displayName, id: formData.imageId };
        }
    }

    // Handle video file
    let video = null;
    if (formData.videoFile && !formData.videoId) {
        const videoId = await nomadSdk.uploadAsset(
            null, null, null, "replace",
            formData.videoFile,
            null,
            null
        );
        video = { description: formData.videoFile.name, id: videoId };
    } else if (formData.videoId) {
        const videoInfo = await nomadSdk.getAssetDetails(formData.videoId);
        if (videoInfo) {
            video = { description: videoInfo.properties.displayName, id: formData.videoId };
        }
    }

    let genres = null;
    if (formData.genreSelect) {
        const genresParsed = JSON.parse(formData.genreSelect);
        genres = Array.isArray(genresParsed) ? genresParsed : [genresParsed];
    }

    let performers = null;
    if (formData.performerSelect) {
        const performersParsed = JSON.parse(formData.performerSelect);
        performers = Array.isArray(performersParsed) ? performersParsed : [performersParsed];
    }

    let tags = null;
    if (formData.tagSelect) {
        const tagsParsed = JSON.parse(formData.tagSelect);
        tags = Array.isArray(tagsParsed) ? tagsParsed : [tagsParsed];
    }

    let ratings = null;
    if (formData.ratingSelect) {
        ratings = JSON.parse(formData.ratingSelect);
    }

    const movieInfo = await nomadSdk.updateContent(contentId, MOVIE_CONTENT_DEFINITION_ID, {
        ...(formData.title && { title: formData.title }),
        ...(formData.plot && { plot: formData.plot }),
        ...(formData.date && { releaseDate: `${formData.date}T00:00:00Z` }),
        ...(genres && { genres }),
        ...(performers && { performers }),
        ...(tags && { tags }),
        ...(ratings && { ratings }),
        ...(image && { image }),
        ...(video && { movieFile: video }),
    });

    console.log(movieInfo);
});

addFilterButton.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "fieldName");
    fieldName.required = true;

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operator");
    operationLabel.textContent = "Operator:";

    let operator = document.createElement("input");
    operator.setAttribute("type", "text");
    operator.setAttribute("name", "operator");
    operator.required = true;

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "value");
    valueLabel.textContent = "Value:";

    let value = document.createElement("input");
    value.setAttribute("type", "text");
    value.setAttribute("name", "value");
    value.required = true;

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Filter";
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        filtersDiv.removeChild(br1);
        filtersDiv.removeChild(br2);
        filtersDiv.removeChild(fieldNameLabel);
        filtersDiv.removeChild(fieldName);
        filtersDiv.removeChild(operationLabel);
        filtersDiv.removeChild(operator);
        filtersDiv.removeChild(valueLabel);
        filtersDiv.removeChild(value);
        filtersDiv.removeChild(removeButton);
    });

    filtersDiv.appendChild(fieldNameLabel);
    filtersDiv.appendChild(fieldName);
    filtersDiv.appendChild(operationLabel);
    filtersDiv.appendChild(operator);
    filtersDiv.appendChild(valueLabel);
    filtersDiv.appendChild(value);

    filtersDiv.appendChild(br1);
    filtersDiv.appendChild(br2);

    filtersDiv.appendChild(removeButton);
});

addSortFieldsButton.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "sortFieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "sortFieldName");
    fieldName.required = true;

    let sortTypeLabel = document.createElement('label');
    sortTypeLabel.setAttribute("for", "sortType");
    sortTypeLabel.textContent = "Sort Type:";

    let sortType = document.createElement("select");
    sortType.setAttribute("name", "sortType");
    sortType.required = true;

    let ascendingOption = document.createElement("option");
    ascendingOption.value = "Ascending";
    ascendingOption.text = "Ascending";
    sortType.appendChild(ascendingOption);

    let descendingOption = document.createElement("option");
    descendingOption.value = "Descending";
    descendingOption.text = "Descending";
    sortType.appendChild(descendingOption);

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Sort Field";
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        sortFieldsDiv.removeChild(br1);
        sortFieldsDiv.removeChild(br2);
        sortFieldsDiv.removeChild(fieldNameLabel);
        sortFieldsDiv.removeChild(fieldName);
        sortFieldsDiv.removeChild(sortTypeLabel);
        sortFieldsDiv.removeChild(sortType);
        sortFieldsDiv.removeChild(removeButton);
    });

    sortFieldsDiv.appendChild(fieldNameLabel);
    sortFieldsDiv.appendChild(fieldName);
    sortFieldsDiv.appendChild(sortTypeLabel);
    sortFieldsDiv.appendChild(sortType);

    sortFieldsDiv.appendChild(br1);
    sortFieldsDiv.appendChild(br2);

    sortFieldsDiv.appendChild(removeButton);
});

searchMoviesForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(searchMoviesForm);

    const filters = [{
        fieldName: "contentDefinitionId",
        operator: "Equals",
        values: MOVIE_CONTENT_DEFINITION_ID
    }];

    const fieldNames = formData.fieldName ? (Array.isArray(formData.fieldName) ? formData.fieldName : [formData.fieldName]) : [];
    const operators = formData.operator ? (Array.isArray(formData.operator) ? formData.operator : [formData.operator]) : [];
    const values = formData.value ? (Array.isArray(formData.value) ? formData.value : [formData.value]) : [];
    for (let i = 0; i < fieldNames.length; ++i) {
        filters.push({
            fieldName: fieldNames[i],
            operator: operators[i],
            values: values[i]
        });
    }

    const sortFields = [];
    const sortFieldNames = formData.sortFieldName ? (Array.isArray(formData.sortFieldName) ? formData.sortFieldName : [formData.sortFieldName]) : [];
    const sortTypes = formData.sortType ? (Array.isArray(formData.sortType) ? formData.sortType : [formData.sortType]) : [];
    for (let i = 0; i < sortFieldNames.length; ++i) {
        sortFields.push({
            fieldName: sortFieldNames[i],
            sortType: sortTypes[i]
        });
    }

    const searchQuery = formData.searchQuery || null;
    const pageOffset = formData.pageOffset || null;
    const pageSize = formData.pageSize || null;

    const result = await nomadSdk.search(
        searchQuery,
        pageOffset,
        pageSize,
        filters,
        sortFields.length > 0 ? sortFields : null
    );
    console.log(result);
});

getMovieForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getMovieForm);

    const result = await nomadSdk.getContent(formData.getId, MOVIE_CONTENT_DEFINITION_ID);
    console.log(result);
});

deleteMovieForm.addEventListener("submit", async function(event)
{
    event.preventDefault();
    const formData = getElements(deleteMovieForm);

    const result = await nomadSdk.deleteContent(formData.deleteId);
    console.log(result);
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.tagName) continue;
        if (input.type === "file")
        {
            if (input.files && input.files.length > 0)
            {
                formData[input.id || input.name] = input.files[0];
            }
        }
        else if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let option of input.options)
            {
                if (option.selected)
                {
                    if (option.value.trim().toLowerCase() === option.label.trim().toLowerCase())
                    {
                        const value = option.value !== "" ? option.value : null;
                        formData[input.id || input.name] = value;
                    }
                    else
                    {
                        selectedOptions.push({ id: option.value, description: option.label });
                    }
                }
            }
            if (selectedOptions.length > 1)
            {
                formData[input.id || input.name] = JSON.stringify(selectedOptions);
            }
            else if (selectedOptions.length === 1)
            {
                formData[input.id || input.name] = JSON.stringify(selectedOptions[0]);
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            const value = input.value !== "" ? input.value : null;
            formData[input.id || input.name] = value;
        }
    }
    return formData;
}
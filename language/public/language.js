import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const createForm = document.getElementById("createForm");
const getForm = document.getElementById("getForm");
const updateForm = document.getElementById("updateForm");
const deleteForm = document.getElementById("deleteForm");

const createContentLanguagePropertiesDiv = document.getElementById("createContentLanguagePropertiesDiv");
const updateContentLanguagePropertiesDiv = document.getElementById("updateContentLanguagePropertiesDiv");

const createContentContentDefinitionId = document.getElementById("createContentContentDefinitionId");
const createContentMasterId = document.getElementById("createContentMasterId");
const updateContentContentDefinitionId = document.getElementById("updateContentContentDefinitionId");
const updateContentMasterId = document.getElementById("updateContentMasterId");

const createContentAddPropertiesButton = document.getElementById("createContentAddPropertiesButton");
const createContentSubmitButton = document.getElementById("createContentSubmitButton");
const updateContentAddPropertiesButton = document.getElementById("updateContentAddPropertiesButton");
const updateContentSubmitButton = document.getElementById("updateContentSubmitButton");

const createContentLanguageSelect = document.getElementById("createContentLanguage");
const getContentLanguageSelect = document.getElementById("getContentLanguage");
const updateContentLanguageSelect = document.getElementById("updateContentLanguage");
const deleteContentLanguageSelect = document.getElementById("deleteContentLanguage");

getLanguages();

async function getLanguages()
{
    const languages = await getGroups("e4b10c04-1878-4830-a115-e42d52705059");
    if (languages)
    {
        for (let language of languages)
        {
            const option = document.createElement("option");
            option.value = language.id;
            option.text = language.identifiers.title;
            createContentLanguageSelect.appendChild(option);
            getContentLanguageSelect.appendChild(option.cloneNode(true));
            updateContentLanguageSelect.appendChild(option.cloneNode(true));
            deleteContentLanguageSelect.appendChild(option.cloneNode(true));
        }
    }

    $(createContentLanguageSelect).select2();
    $(getContentLanguageSelect).select2();
    $(updateContentLanguageSelect).select2();
    $(deleteContentLanguageSelect).select2();
}

createContentAddPropertiesButton.addEventListener("click", async () =>
{
    if (!createContentContentDefinitionId?.value || !createContentMasterId?.value) 
    {
        console.error("Content Definition Id and Master Id are required to add properties.");
        return;
    }
    await addProperties(
        createContentContentDefinitionId.value,
        createContentMasterId.value,
        createContentLanguageSelect.value,
        createContentLanguagePropertiesDiv,
        createContentAddPropertiesButton,
        createContentSubmitButton,
        "create"
    );
});

updateContentAddPropertiesButton.addEventListener("click", async () =>
{
    if (!updateContentContentDefinitionId?.value)
    {
        console.error("Content Definition Id and Master Id are required to add properties.");
        return; 
    }
    await addProperties(
        updateContentContentDefinitionId.value,
        updateContentMasterId.value,
        updateContentLanguageSelect.value,
        updateContentLanguagePropertiesDiv,
        updateContentAddPropertiesButton,
        updateContentSubmitButton,
        "update"
    );
});

async function addProperties(contentDefinitionId, masterId, languageId, div, addPropertiesButton, submitButton, action)
{
    addPropertiesButton.hidden = true;

    const properties = await nomadSdk.getContentDefinition(contentDefinitionId);

    let contentId = null;
    if (action === "create")
    {
        contentId = masterId;
    }
    else
    {
        const contents = await getContents(contentDefinitionId, languageId);
        try
        {
            contentId = contents.find(content => content.masterId === masterId).id;
        }
        catch (error)
        {
            console.error("Master Id not found in content definition");
        }
    }

    const contentData = await nomadSdk.getContent(contentId, contentDefinitionId);

    const propertiesDiv = document.createElement("div");
    propertiesDiv.classList.add("properties");

    for (let contentField of properties.contentFields)
    {
        const property = contentField.properties;

        const propertyDiv = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = property.title;
        propertyDiv.appendChild(label);

        let camelPropertyTitle = property.title.replace(/ /g, "");
        if (camelPropertyTitle.slice(1) === camelPropertyTitle.slice(1).toUpperCase())
        {
            camelPropertyTitle = camelPropertyTitle.toLowerCase();
        }
        camelPropertyTitle = camelPropertyTitle[0].toLowerCase() + camelPropertyTitle.slice(1);

        if ((property.fieldId.description === "Short Text" || property.fieldId.description === "Number") && contentField.isInEditorForm)
        {
            const input = document.createElement("input");
            input.type = "text";
            input.id = camelPropertyTitle;
            if (contentData && contentData.properties[camelPropertyTitle])
            {
                input.value = contentData.properties[camelPropertyTitle];
            }

            propertyDiv.appendChild(input);
            propertiesDiv.appendChild(propertyDiv);
        }
        else if (property.fieldId.description === "Long Text" && contentField.isInEditorForm)
        {
            const textarea = document.createElement("textarea");
            textarea.id = camelPropertyTitle;

            if (contentData && contentData.properties[camelPropertyTitle])
            {
                textarea.value = contentData.properties[camelPropertyTitle];
            }

            propertyDiv.appendChild(textarea);
            propertiesDiv.appendChild(propertyDiv);
        }
        else if ((property.fieldId.description === "Lookup Multi-Select Chip View" ||
            property.fieldId.description === "Related Content Definition") && contentField.isInEditorForm)
        {
            const select = document.createElement("select");
            select.multiple = property.fieldId.description === "Lookup Multi-Select Chip View";
            select.id = camelPropertyTitle;

            const contentDefinitionIdForSelect = property.fieldId.description === "Lookup Multi-Select Chip View"
                ? property.lookupDropdownProperties.lookupKey
                : property.relatedContentDefinition.id;

            const options = await getContents(contentDefinitionIdForSelect, languageId);

            for (let optionData of options)
            {
                const option = document.createElement("option");
                option.value = optionData.id;
                option.text = optionData.title;

                if (contentData && contentData.properties[camelPropertyTitle])
                {
                    if (property.fieldId.description === "Lookup Multi-Select Chip View")
                    {
                        for (let selectedOption of contentData.properties[camelPropertyTitle])
                        {
                            if (selectedOption.id === optionData.id)
                            {
                                option.selected = true;
                            }
                        }
                    }
                    else if (contentData.properties[camelPropertyTitle].id === optionData.id)
                    {
                        option.selected = true;
                    }
                }

                select.appendChild(option);
            }

            propertyDiv.appendChild(select);
            propertiesDiv.appendChild(propertyDiv);

            $(select).select2();
        }
        else if (property.fieldId.description === "Asset Selector" && contentField.isInEditorForm)
        {
            label.textContent += " Id";

            const input = document.createElement("input");
            input.type = "text";
            input.id = camelPropertyTitle;

            if (contentData && contentData.properties[camelPropertyTitle])
            {
                input.value = contentData.properties[camelPropertyTitle].id;
            }

            propertyDiv.appendChild(input);
            propertiesDiv.appendChild(propertyDiv);
        }
        else if (property.fieldId.description === "Date" && contentField.isInEditorForm)
        {
            const input = document.createElement("input");
            input.type = "datetime-local";
            input.id = camelPropertyTitle;

            const date = new Date(contentData.properties[camelPropertyTitle]);
            if (!isNaN(date))
            {
                const formattedDate = date.toISOString().slice(0, -8);
                if (contentData && contentData.properties[camelPropertyTitle])
                {
                    input.value = formattedDate;
                }
            }

            propertyDiv.appendChild(input);
            propertiesDiv.appendChild(propertyDiv);
        }
        else if (property.fieldId.description === "Checkbox" && contentField.isInEditorForm)
        {
            const input = document.createElement("select");
            input.id = camelPropertyTitle;

            const trueOption = document.createElement("option");
            trueOption.value = "true";
            trueOption.text = "True";

            const falseOption = document.createElement("option");
            falseOption.value = "false";
            falseOption.text = "False";

            if (contentData && contentData.properties[camelPropertyTitle])
            {
                if (contentData.properties[camelPropertyTitle] === "true")
                {
                    trueOption.selected = true;
                }
                else
                {
                    falseOption.selected = true;
                }
            }

            input.appendChild(trueOption);
            input.appendChild(falseOption);

            propertyDiv.appendChild(input);
            propertiesDiv.appendChild(propertyDiv);

            $(input).select2();
        }
    }

    div.appendChild(propertiesDiv);

    submitButton.hidden = false;
}

createForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(createForm);
    await nomadSdk.updateContent(
        formData.get("createContentMasterId"),
        formData.get("createContentContentDefinitionId"),
        getPropertiesFromForm(formData, "createContent"),
        formData.get("createContentLanguage")
    );
});

getForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(getForm);
    const contents = await getContents(
        formData.get("getContentContentDefinitionId"),
        JSON.parse(formData.get("getContentLanguage")).id,
        formData.get("getContentMasterId")
    );
    console.log(contents[0]);
});

updateForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(updateForm);
    const contents = await getContents(
        formData.get("updateContentContentDefinitionId"),
        JSON.parse(formData.get("updateContentLanguage")).id,
        formData.get("updateContentMasterId")
    );
    if (contents.length > 0)
    {
        await nomadSdk.updateContent(
            contents[0].id,
            formData.get("updateContentContentDefinitionId"),
            getPropertiesFromForm(formData, "updateContent"),
            formData.get("updateContentLanguage")
        );
    }
});

deleteForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(deleteForm);
    const contents = await getContents(
        formData.get("deleteContentContentDefinitionId"),
        JSON.parse(formData.get("deleteContentLanguage")).id,
        formData.get("deleteContentMasterId")
    );
    if (contents.length > 0)
    {
        await nomadSdk.deleteContent(
            contents[0].id,
            formData.get("deleteContentContentDefinitionId")
        );
    }
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.id === "") continue;
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let element of input)
            {
                if (element.selected)
                {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase())
                    {
                        if (input.id)
                        {
                            formData.append(input.id, element.value);
                        }
                        else
                        {
                            formData.append(input.name, element.value);
                        }
                    }
                    else
                    {
                        selectedOptions.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (input.multiple)
            {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length > 0)
            {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            if (input.id)
            {
                formData.append(input.id, input.value);
            }
            else
            {
                formData.append(input.name, input.value);
            }
        }
    }
    return formData;
}

function getPropertiesFromForm(formData, prefix)
{
    const properties = {};
    for (let [key, value] of formData.entries())
    {
        if (key.startsWith(prefix) && !key.endsWith("Id") && !key.endsWith("Language"))
        {
            let propKey = key.replace(prefix, "");
            propKey = propKey.charAt(0).toLowerCase() + propKey.slice(1);
            try
            {
                properties[propKey] = JSON.parse(value);
            }
            catch
            {
                properties[propKey] = value;
            }
        }
    }
    return properties;
}

async function getGroups(contentDefinitionId)
{
    const groupList = [];
    let offset = 0;
    while (true)
    {
        const searchInfo = await nomadSdk.search(
            null, offset, null,
            [
                { 
                    fieldName: "contentDefinitionId", 
                    operator: "Equals", 
                    values: contentDefinitionId 
                },
                { 
                    fieldName: "languageId", 
                    operator: "Equals", 
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8" 
                },
                { 
                    fieldName: "active", 
                    operator: "Equals", 
                    values: true 
                } 
            ], null, null, null, null, true, null
        );
        if (!searchInfo)
        {
            return [];
        }
        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100) break;
    }
    return groupList;
}

async function getContents(contentDefinitionId, languageId, masterId)
{
    const contents = [];
    let offset = 0;
    while (true)
    {
        const filters = [
            { 
                fieldName: "contentDefinitionId", 
                operator: "Equals", 
                values: contentDefinitionId 
            },
            { 
                fieldName: "languageId", 
                operator: "Equals", 
                values: languageId 
            },
        ];
        if (masterId)
        {
            filters.push({ fieldName: "masterId", operator: "Equals", values: masterId });
        }

        const searchInfo = await nomadSdk.search(
            null, offset, null, filters, null, null, null, null, true, null
        );

        if (!searchInfo || searchInfo.items.length === 0) break;
        contents.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100) break;
    }
    return contents;
}
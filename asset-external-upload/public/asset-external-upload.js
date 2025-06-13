import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const placeholderForm = document.getElementById("placeholderForm");
const languageSelect = document.getElementById("languageSelect");
const tagsSelect = document.getElementById("tagsSelect");

async function getLanguages()
{
    const languages = await getGroups("e4b10c04-1878-4830-a115-e42d52705059");
    for (let language of languages)
    {
        const option = document.createElement("option");
        option.value = language.id;
        option.text = language.title;
        languageSelect.appendChild(option);
    }
    $(languageSelect).select2();
}

getLanguages();

async function getTags()
{
    const tags = await getGroups("c806783c-f127-48ae-90c9-32175f4e1fff");
    for (let tag of tags)
    {
        const option = document.createElement("option");
        option.value = tag.id;
        option.text = tag.title;
        tagsSelect.appendChild(option);
    }
    $(tagsSelect).select2();
}

getTags();

async function getGroups(contentDefinitionId)
{
    const groupList = [];
    let offset = 0;
    while (true)
    {
        const searchInfo = await nomadSdk.search(
            null, offset, null,
            [
                { fieldName: "contentDefinitionId", operator: "Equals", values: contentDefinitionId },
                { fieldName: "languageId", operator: "Equals", values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8" }
            ],
            null, null, null, null, true, null
        );
        if (!searchInfo)
        {
            return [];
        }
        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100)
        {
            break;
        }
    }
    return groupList;
}

placeholderForm.addEventListener("submit", async function(event)
{
    event.preventDefault();
    const formData = getElements(placeholderForm);

    const parentDirectoryId = formData.parentDirectoryId;
    const assetName = formData.assetName;
    const languageId = formData.languageSelect;
    const tagsSelectValue = formData.tagsSelect;
    const file = formData.file;

    let tags = null;
    if (tagsSelectValue)
    {
        const parsedTags = JSON.parse(tagsSelectValue);
        tags = Array.isArray(parsedTags) ? parsedTags : [parsedTags];
    }

    const placeholderInfo = await nomadSdk.createPlaceholderAsset(parentDirectoryId, assetName);

    await nomadSdk.uploadAsset(
        assetName,
        placeholderInfo.id,
        null,
        "replace",
        file,
        parentDirectoryId,
        languageId
    );

    if (tags && tags.length > 0)
    {
        await nomadSdk.bulkUpdateMetadata(
            [placeholderInfo.id],
            null,
            null,
            tags.map(item => item.id)
        );
    }
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
        else if (input.tagName === "INPUT")
        {
            const value = input.value !== "" ? input.value : null;
            formData[input.id || input.name] = value;
        }
    }
    return formData;
}
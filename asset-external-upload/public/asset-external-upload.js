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

    const parentDirectoryId = formData.get("parentDirectoryId");
    const assetName = formData.get("assetName");
    const languageId = formData.get("languageSelect");
    const tagsSelectValue = formData.get("tagsSelect");
    const file = formData.get("file");

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
    const formData = new FormData();
    for (let input of form)
    {
        if (input.type === "file")
        {
            for (let file of input.files)
            {
                formData.append(input.id, file);
            }
        }
        else if (input.tagName === "SELECT")
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
            if (selectedOptions.length > 1)
            {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length === 1)
            {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT")
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
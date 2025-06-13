import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getContentDefinitionsForm = document.getElementById("getContentDefinitionsForm");
const getContentDefinitionForm = document.getElementById("getContentDefinitionForm");

getContentDefinitionsForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const formData = getElements(getContentDefinitionsForm);

    const contentDefinitions = await nomadSdk.getContentDefinitions(
        formData.contentManagementType,
        formData.sortColumn,
        formData.isDescending === "true",
        formData.pageIndex,
        formData.pageSize
    );

    if (contentDefinitions)
    {
        console.log(contentDefinitions);
    }
});

getContentDefinitionForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const formData = getElements(getContentDefinitionForm);

    const contentDefinition = await nomadSdk.getContentDefinition(formData.contentDefinitionId);

    if (contentDefinition)
    {
        console.log(contentDefinition);
    }
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.tagName) continue;
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
            {
                // If input is "" (empty string), set to null
                const value = input.value !== "" ? input.value : null;
                formData[input.id || input.name] = value;
            }
        }
    }
    return formData;
}
import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getContentDefinitionsForm = document.getElementById("getContentDefinitionsForm");
const getContentDefinitionForm = document.getElementById("getContentDefinitionForm");

getContentDefinitionsForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const formData = getElements(getContentDefinitionsForm);

    const contentManagementType = formData.get("contentManagementType");
    const sortColumn = formData.get("sortColumn");
    const isDescending = formData.get("isDescending") === "true";
    const pageIndex = formData.get("pageIndex");
    const pageSize = formData.get("pageSize");

    const contentDefinitions = await nomadSdk.getContentDefinitions(
        contentManagementType,
        sortColumn,
        isDescending,
        pageIndex,
        pageSize
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

    const contentDefinitionId = formData.get("contentDefinitionId");

    const contentDefinition = await nomadSdk.getContentDefinition(contentDefinitionId);

    if (contentDefinition)
    {
        console.log(contentDefinition);
    }
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
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
    }
    return formData;
}
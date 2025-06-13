import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getContentForm = document.getElementById("getContentForm");
const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const deactivateForm = document.getElementById("deactivateForm");
const getContentUserTrackForm = document.getElementById("getContentUserTrackForm");
const getContentUserTrackTouchForm = document.getElementById("getContentUserTrackTouchForm");
const deleteForm = document.getElementById("deleteForm");

getContentForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentForm);

    await nomadSdk.getContent(
        formData.getContentContentId,
        formData.getContentContentDefinitionId,
        formData.isRevision
    );
});

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createForm);

    await nomadSdk.createContent(
        formData.createContentContentDefinitionId,
        formData.createContentLanguageId
    );
});

updateForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateForm);

    await nomadSdk.updateContent(
        formData.updateContentContentId,
        formData.updateContentContentDefinitionId,
        formData.updateContentProperties,
        formData.updateContentLanguageId
    );
});

deactivateForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deactivateForm);

    await nomadSdk.deactivateContentUserTrack(
        formData.sessionId,
        formData.contentId,
        formData.contentDefinitionId,
        formData.deactivate === "True"
    );
});

getContentUserTrackForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentUserTrackForm);

    await nomadSdk.getContentUserTrack(
        formData.contentId,
        formData.contentDefinitionId,
        formData.sortColumn,
        formData.isDescending === "True",
        formData.pageIndex,
        formData.pageSize
    );
});

getContentUserTrackTouchForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentUserTrackTouchForm);

    await nomadSdk.getContentUserTrackTouch(
        formData.contentId,
        formData.contentDefinitionId
    );
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteForm);

    await nomadSdk.deleteContent(
        formData.deleteContentContentId,
        formData.deleteContentContentDefinitionId
    );
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
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
        formData.get("getContentContentId"),
        formData.get("getContentContentDefinitionId"),
        formData.get("isRevision")
    );
});

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createForm);

    await nomadSdk.createContent(
        formData.get("createContentContentDefinitionId"),
        formData.get("createContentLanguageId")
    );
});

updateForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateForm);

    await nomadSdk.updateContent(
        formData.get("updateContentContentId"),
        formData.get("updateContentContentDefinitionId"),
        formData.get("updateContentProperties"),
        formData.get("updateContentLanguageId")
    );
});

deactivateForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deactivateForm);

    await nomadSdk.deactivateContentUserTrack(
        formData.get("sessionId"),
        formData.get("contentId"),
        formData.get("contentDefinitionId"),
        formData.get("deactivate") === "True"
    );
});

getContentUserTrackForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentUserTrackForm);

    await nomadSdk.getContentUserTrack(
        formData.get("contentId"),
        formData.get("contentDefinitionId"),
        formData.get("sortColumn"),
        formData.get("isDescending") === "True",
        formData.get("pageIndex"),
        formData.get("pageSize")
    );
});

getContentUserTrackTouchForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getContentUserTrackTouchForm);

    await nomadSdk.getContentUserTrackTouch(
        formData.get("contentId"),
        formData.get("contentDefinitionId")
    );
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteForm);

    await nomadSdk.deleteContent(
        formData.get("deleteContentContentId"),
        formData.get("deleteContentContentDefinitionId")
    );
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
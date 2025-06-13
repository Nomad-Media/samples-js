import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getGroupForm = document.getElementById("getGroupForm");
const getGroupsForm = document.getElementById("getGroupsForm");
const createForm = document.getElementById("createForm");
const addForm = document.getElementById("addForm");
const removeForm = document.getElementById("removeForm");
const renameForm = document.getElementById("renameForm");
const shareForm = document.getElementById("shareForm");
const stopShareForm = document.getElementById("stopShareForm");
const deleteForm = document.getElementById("deleteForm");

getGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(getGroupForm);
    console.log(await nomadSdk.getContentGroup(formData.getGroupId));
});

getGroupsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log(await nomadSdk.getContentGroups());
});

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(createForm);
    console.log(await nomadSdk.createContentGroup(formData.createName));
});

addForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addForm);
    const contentIds = formData.addContentIds ? formData.addContentIds.split(",") : [];
    console.log(await nomadSdk.addContentsToContentGroup(formData.addGroupId, contentIds));
});

removeForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(removeForm);
    const contentIds = formData.removeContentIds ? formData.removeContentIds.split(",") : [];
    console.log(await nomadSdk.removeContentsFromContentGroup(formData.removeGroupId, contentIds));
});

renameForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(renameForm);
    console.log(await nomadSdk.renameContentGroup(formData.renameGroupId, formData.renameGroup));
});

shareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(shareForm);
    const userIds = formData.shareUserIds ? formData.shareUserIds.split(",") : [];
    console.log(await nomadSdk.shareContentGroup(formData.shareGroupId, userIds));
});

stopShareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopShareForm);
    const userIds = formData.removeSharedUserIds ? formData.removeSharedUserIds.split(",") : [];
    console.log(await nomadSdk.stopSharingContentGroupWithUsers(formData.stopsSharingGroupId, userIds));
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteForm);
    console.log(await nomadSdk.deleteContentGroup(formData.deleteGroupId));
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
                formData[input.id || input.name] = input.value !== "" ? input.value : null;
            }
        }
    }
    return formData;
}
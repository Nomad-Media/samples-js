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
    const groupId = formData.get("getGroupId");
    console.log(await nomadSdk.getContentGroup(groupId));
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
    const name = formData.get("createName");
    console.log(await nomadSdk.createContentGroup(name));
});

addForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(addForm);
    const groupId = formData.get("addGroupId");
    const contentIds = formData.get("addContentIds").split(",");
    console.log(await nomadSdk.addContentsToContentGroup(groupId, contentIds));
});

removeForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(removeForm);
    const groupId = formData.get("removeGroupId");
    const contentIds = formData.get("removeContentIds").split(",");
    console.log(await nomadSdk.removeContentsFromContentGroup(groupId, contentIds));
});

renameForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(renameForm);
    const groupId = formData.get("renameGroupId");
    const newName = formData.get("renameGroup");
    console.log(await nomadSdk.renameContentGroup(groupId, newName));
});

shareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(shareForm);
    const groupId = formData.get("shareGroupId");
    const userIds = formData.get("shareUserIds").split(",");
    console.log(await nomadSdk.shareContentGroup(groupId, userIds));
});

stopShareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(stopShareForm);
    const groupId = formData.get("stopsSharingGroupId");
    const userIds = formData.get("removeSharedUserIds").split(",");
    console.log(await nomadSdk.stopSharingContentGroupWithUsers(groupId, userIds));
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(deleteForm);
    const groupId = formData.get("deleteGroupId");
    console.log(await nomadSdk.deleteContentGroup(groupId));
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
                input.id ? formData.append(input.id, input.value) : formData.append(input.name, input.value);
            }
        }
    }
    return formData;
}
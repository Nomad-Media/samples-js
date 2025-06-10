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
const stopSharingForm = document.getElementById("stopSharingForm");
const portalForm = document.getElementById("portalForm");
const deleteForm = document.getElementById("deleteForm");

getGroupForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getGroupForm);

    const groupId = formData.get("groupId");
    const result = await nomadSdk.getContentGroup(groupId);
    console.log(result);
});

getGroupsForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const result = await nomadSdk.getContentGroups();
    console.log(result);
});

createForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createForm);

    const name = formData.get("name");
    const result = await nomadSdk.createContentGroup(name);
    console.log(result);
});

addForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addForm);

    const groupId = formData.get("groupId");
    const contentIds = formData.get("contentIds")?.split(",") || [];
    const result = await nomadSdk.addContentsToContentGroup(groupId, contentIds);
    console.log(result);
});

removeForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(removeForm);

    const groupId = formData.get("groupId");
    const contentIds = formData.get("contentIds")?.split(",") || [];
    const result = await nomadSdk.removeContentsFromContentGroup(groupId, contentIds);
    console.log(result);
});

renameForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(renameForm);

    const groupId = formData.get("groupId");
    const renameGroup = formData.get("renameGroup");
    const result = await nomadSdk.renameContentGroup(groupId, renameGroup);
    console.log(result);
});

shareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(shareForm);

    const groupId = formData.get("groupId");
    const userIds = formData.get("userIds")?.split(",") || [];
    const result = await nomadSdk.shareContentGroupWithUsers(groupId, userIds);
    console.log(result);
});

stopSharingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(stopSharingForm);

    const groupId = formData.get("groupId");
    const userIds = formData.get("userIds")?.split(",") || [];
    const result = await nomadSdk.stopSharingContentGroupWithUsers(groupId, userIds);
    console.log(result);
});

portalForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(portalForm);

    const groupNames = formData.get("groupNames")?.split(",") || [];
    const portalId = formData.get("portalId");
    const result = await nomadSdk.getPortalGroups(groupNames, portalId);
    console.log(result);
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteForm);

    const groupId = formData.get("groupId");
    const result = await nomadSdk.deleteContentGroup(groupId);
    console.log(result);
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let element of input)
            {
                if (element.selected)
                {
                    if (element.value === element.label)
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
            if (input.type === "file")
            {
                formData.append(input.id, input.files[0]);
            }
            else
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
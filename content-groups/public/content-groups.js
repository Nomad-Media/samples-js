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

    const result = await nomadSdk.getContentGroup(formData.groupId);
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

    const result = await nomadSdk.createContentGroup(formData.name);
    console.log(result);
});

addForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(addForm);

    const contentIds = formData.contentIds ? formData.contentIds.split(",") : [];
    const result = await nomadSdk.addContentsToContentGroup(formData.groupId, contentIds);
    console.log(result);
});

removeForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(removeForm);

    const contentIds = formData.contentIds ? formData.contentIds.split(",") : [];
    const result = await nomadSdk.removeContentsFromContentGroup(formData.groupId, contentIds);
    console.log(result);
});

renameForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(renameForm);

    const result = await nomadSdk.renameContentGroup(formData.groupId, formData.renameGroup);
    console.log(result);
});

shareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(shareForm);

    const userIds = formData.userIds ? formData.userIds.split(",") : [];
    const result = await nomadSdk.shareContentGroupWithUsers(formData.groupId, userIds);
    console.log(result);
});

stopSharingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(stopSharingForm);

    const userIds = formData.userIds ? formData.userIds.split(",") : [];
    const result = await nomadSdk.stopSharingContentGroupWithUsers(formData.groupId, userIds);
    console.log(result);
});

portalForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(portalForm);

    const groupNames = formData.groupNames ? formData.groupNames.split(",") : [];
    const result = await nomadSdk.getPortalGroups(groupNames, formData.portalId);
    console.log(result);
});

deleteForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteForm);

    const result = await nomadSdk.deleteContentGroup(formData.groupId);
    console.log(result);
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
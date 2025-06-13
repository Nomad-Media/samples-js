import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

// Form elements
const shareForm = document.getElementById("shareForm");
const getShareForm = document.getElementById("getShareForm");
const updateShareForm = document.getElementById("updateShareForm");
const shareExpireForm = document.getElementById("shareExpireForm");
const shareNotificationForm = document.getElementById("shareNotificationForm");
const deleteShareForm = document.getElementById("deleteShareForm");

// Create Share
shareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(shareForm);
    console.log(elems);

    const sharedContents = elems.sharedContents ? elems.sharedContents.split(",") : [];
    const sharedPermissions = elems.sharedPermissions ? elems.sharedPermissions.split(",") : [];

    const result = await nomadSdk.share(
        elems.assetId,
        elems.name,
        sharedContents,
        { id: elems.sharedDuration },
        sharedPermissions,
        elems.sharedType,
        elems.sharedStatus,
        elems.sharedDurationInHours,
        elems.sharedLink,
        elems.ownerId,
        elems.expirationDate
    );

    console.log(result);
});

// Get Share
getShareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(getShareForm);

    const result = await nomadSdk.getShare(elems.shareId);
    console.log(result);
});

// Update Share
updateShareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(updateShareForm);

    const sharedContents = elems.sharedContents ? elems.sharedContents.split(",") : [];
    const sharedPermissions = elems.sharedPermissions ? elems.sharedPermissions.split(",") : [];
    
    const result = await nomadSdk.updateShare(
        elems.shareId,
        elems.assetId,
        elems.name,
        sharedContents,
        { id: elems.sharedDuration },
        sharedPermissions,
        elems.sharedType,
        elems.sharedStatus,
        elems.sharedDurationInHours,
        elems.sharedLink,
        elems.ownerId,
        elems.expirationDate
    );

    console.log(result);
});

// Share Expire
shareExpireForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(shareExpireForm);

    const result = await nomadSdk.shareExpire(shareId);
    console.log(result);
});

// Share Notification
shareNotificationForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(shareNotificationForm);

    const result = await nomadSdk.shareNotification(elems.shareId, );
    console.log(result);
});

// Delete Share
deleteShareForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const elems = getElements(deleteShareForm);

    const result = await nomadSdk.deleteShare(elems.shareId);
    console.log(result);
});

// Helper to get form data
function getElements(form)
{
    const elems = {}
    for (let input of form)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
            {
                const value = input.value !== "" ? input.value : null;
                elems[input.id || input.name] = value;
            }
        }
    }
    return elems;
}
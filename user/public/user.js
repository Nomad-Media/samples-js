import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const deleteUserForm = document.getElementById("deleteUserForm");
const deleteUserDataForm = document.getElementById("deleteUserDataForm");
const deleteUserContentAttributeDataForm = document.getElementById("deleteUserContentAttributeDataForm");
const deleteUserContentGroupDataForm = document.getElementById("deleteUserContentGroupDataForm");
const deleteUserDislikesDataForm = document.getElementById("deleteUserDislikesDataForm");
const deleteUserLikesDataForm = document.getElementById("deleteUserLikesDataForm");
const deleteUserFavoritesDataForm = document.getElementById("deleteUserFavoritesDataForm");
const deleteUserSavedSearchDataForm = document.getElementById("deleteUserSavedSearchDataForm");
const deleteUserSessionDataForm = document.getElementById("deleteUserSessionDataForm");
const deleteUserContentSecurityDataForm = document.getElementById("deleteUserContentSecurityDataForm");
const deleteUserVideoTrackingDataForm = document.getElementById("deleteUserVideoTrackingDataForm");

deleteUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserForm);
    await nomadSdk.deleteUser(userData.userId);
});

deleteUserDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserDataForm);
    await nomadSdk.deleteUserData(userData.userId);
});

deleteUserContentAttributeDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentAttributeDataForm);
    await nomadSdk.deleteUserContentAttributeData(userData.userId);
});

deleteUserContentGroupDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentGroupDataForm);
    await nomadSdk.deleteUserContentGroupData(userData.userId);
});

deleteUserDislikesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserDislikesDataForm);
    await nomadSdk.deleteUserDislikesData(userData.userId);
});

deleteUserLikesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserLikesDataForm);
    await nomadSdk.deleteUserLikesData(userData.userId);
});

deleteUserFavoritesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserFavoritesDataForm);
    await nomadSdk.deleteUserFavoritesData(userData.userId);
});

deleteUserSavedSearchDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserSavedSearchDataForm);
    await nomadSdk.deleteUserSavedSearchData(userData.userId);
});

deleteUserSessionDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserSessionDataForm);
    await nomadSdk.deleteUserSessionData(userData.userId);
});

deleteUserContentSecurityDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentSecurityDataForm);
    await nomadSdk.deleteUserContentSecurityData(
        userData.contentId,
        userData.contentDefinitionId,
        userData.email,
        userData.id,
        userData.keyName,
        `${userData.expirationDate}Z`
    );
});

deleteUserVideoTrackingDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserVideoTrackingDataForm);
    await nomadSdk.deleteUserVideoTrackingData(
        userData.assetId,
        userData.contentId,
        userData.videoTrackingAttribute,
        userData.id,
        userData.isFirstQuartile === "true",
        userData.isMidpoint === "true",
        userData.isThirdQuartile === "true",
        userData.isComplete === "true",
        userData.isHidden === "true",
        userData.isLiveStream === "true",
        userData.maxSeconds,
        userData.lastSeconds,
        userData.totalSeconds,
        userData.lastBeaconDate,
        userData.keyName
    );
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
            {
                formData[input.id || input.name] = input.value;
            }
        }
    }
    return formData;
}
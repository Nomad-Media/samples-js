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
    await nomadSdk.deleteUser(userData.get("userId"));
});

deleteUserDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserDataForm);
    await nomadSdk.deleteUserData(userData.get("userId"));
});

deleteUserContentAttributeDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentAttributeDataForm);
    await nomadSdk.deleteUserContentAttributeData(userData.get("userId"));
});

deleteUserContentGroupDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentGroupDataForm);
    await nomadSdk.deleteUserContentGroupData(userData.get("userId"));
});

deleteUserDislikesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserDislikesDataForm);
    await nomadSdk.deleteUserDislikesData(userData.get("userId"));
});

deleteUserLikesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserLikesDataForm);
    await nomadSdk.deleteUserLikesData(userData.get("userId"));
});

deleteUserFavoritesDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserFavoritesDataForm);
    await nomadSdk.deleteUserFavoritesData(userData.get("userId"));
});

deleteUserSavedSearchDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserSavedSearchDataForm);
    await nomadSdk.deleteUserSavedSearchData(userData.get("userId"));
});

deleteUserSessionDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserSessionDataForm);
    await nomadSdk.deleteUserSessionData(userData.get("userId"));
});

deleteUserContentSecurityDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserContentSecurityDataForm);
    await nomadSdk.deleteUserContentSecurityData(
        userData.get("contentId"),
        userData.get("contentDefinitionId"),
        userData.get("email"),
        userData.get("id"),
        userData.get("keyName"),
        `${userData.get("expirationDate")}Z`
    );
});

deleteUserVideoTrackingDataForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const userData = getElements(deleteUserVideoTrackingDataForm);
    await nomadSdk.deleteUserVideoTrackingData(
        userData.get("assetId"),
        userData.get("contentId"),
        userData.get("videoTrackingAttribute"),
        userData.get("id"),
        userData.get("isFirstQuartile") === "true",
        userData.get("isMidpoint") === "true",
        userData.get("isThirdQuartile") === "true",
        userData.get("isComplete") === "true",
        userData.get("isHidden") === "true",
        userData.get("isLiveStream") === "true",
        userData.get("maxSeconds"),
        userData.get("lastSeconds"),
        userData.get("totalSeconds"),
        userData.get("lastBeaconDate"),
        userData.get("keyName")
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
                input.id ? formData.append(input.id, input.value) : formData.append(input.name, input.value);
            }
        }
    }
    return formData;
}
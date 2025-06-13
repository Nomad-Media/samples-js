import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getUserSessionForm = document.getElementById("getUserSessionForm");
const changeSessionStatusForm = document.getElementById("changeSessionStatusForm");
const deleteUserSessionForm = document.getElementById("deleteUserSessionForm");

getUserSessionForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    try
    {
        const userSession = await nomadSdk.getUserSession();
        console.log(userSession);
    }
    catch (error)
    {
        console.error(error);
    }
});

changeSessionStatusForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(changeSessionStatusForm);

    try
    {
        const userSession = await nomadSdk.changeSessionStatus(
            formData.changeSessionStatus,
            formData.applicationId
        );
        console.log(userSession);
    }
    catch (error)
    {
        console.error(error);
    }
});

deleteUserSessionForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteUserSessionForm);

    try
    {
        const result = await nomadSdk.deleteUserSession(
            formData.sessionId
        );
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
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
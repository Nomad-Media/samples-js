import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getUserSessionForm = document.getElementById("getUserSessionForm");
const changeSessionStatusForm = document.getElementById("changeSessionStatusForm");

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
            formData.get("changeSessionStatus"),
            formData.get("applicationId")
        );
        console.log(userSession);
    }
    catch (error)
    {
        console.error(error);
    }
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
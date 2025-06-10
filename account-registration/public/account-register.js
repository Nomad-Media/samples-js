import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSDK = new NomadMediaSDK(config);

const registerForm = document.getElementById("registerForm");
const verifyForm = document.getElementById("verifyForm");
const resendForm = document.getElementById("resendForm");

registerForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(registerForm);
    await nomadSDK.register(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.password
    );
});

verifyForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(verifyForm);
    await nomadSDK.verify(
        formData.email,
        formData.code
    );
});

resendForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(resendForm);
    await nomadSDK.resend(formData.email);
});

function getElements(form)
{
    const formData = {};
    for (let input of form)
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
const loginForm = document.getElementById("loginForm");
const refreshTokenForm = document.getElementById("refreshTokenForm");
const forgotPassForm = document.getElementById("forgotPasswordForm");
const resetPassForm = document.getElementById("resetPasswordForm");
const logoutForm = document.getElementById("logoutForm");

import NomadMediaSDK from "@nomad-media/full"
import config from "../config.js";
const NomadSDK = new NomadMediaSDK(config);

loginForm.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    await NomadSDK.login();
});

refreshTokenForm.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    await NomadSDK.refreshToken();
});

forgotPassForm.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    const formData = getElements(forgotPassForm);
    await NomadSDK.forgotPassword(formData.username);
});

resetPassForm.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    const formData = getElements(resetPassForm);
    await NomadSDK.resetPassword(
        formData.username,
        formData.passcode,
        formData.password
    );
});

logoutForm.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    await NomadSDK.logout();
});

function getElements(FORM) 
{
    const formData = {};
    for (let input of FORM) 
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
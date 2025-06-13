import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getConfigForm = document.getElementById("getConfigForm");
const getServerTimeForm = document.getElementById("getServerTimeForm");
const clearServerCacheForm = document.getElementById("clearServerCacheForm");

getConfigForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    const formData = getElements(getConfigForm);
    try
    {
        const result = await nomadSdk.getConfig(formData.configKey);
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
});

getServerTimeForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    try
    {
        const result = await nomadSdk.getServerTime();
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
});

clearServerCacheForm.addEventListener("submit", async (event) =>
{
    event.preventDefault();
    try
    {
        const result = await nomadSdk.clearServerCache();
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
        if (!input.tagName) continue;
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || (input.type === "checkbox" && input.checked))
            {
                const value = input.value !== "" ? input.value : null;
                formData[input.id || input.name] = value;
            }
        }
    }
    return formData;
}
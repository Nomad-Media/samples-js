import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getAuditForm = document.getElementById("getAuditForm");

getAuditForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();

    const formData = getElements(getAuditForm);

    try 
    {
        const audit = await nomadSdk.getAudit(formData.contentId);
        console.log(audit);
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
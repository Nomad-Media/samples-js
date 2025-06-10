import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const getAuditForm = document.getElementById("getAuditForm");

getAuditForm.addEventListener("submit", async (event) => 
{
    event.preventDefault();

    const formData = getElements(getAuditForm);
    const contentId = formData.get("contentId");

    try 
    {
        const audit = await nomadSdk.getAudit(contentId);
        console.log(audit);
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
                if (input.id) 
                {
                    formData.append(input.id, input.value);
                }   
                else 
                {
                    formData.append(input.name, input.value);
                }
            }
        }
    }
    return formData;
}
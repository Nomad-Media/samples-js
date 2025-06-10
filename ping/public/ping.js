import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const pingForm = document.getElementById("pingForm");
const authPingForm = document.getElementById("authPingForm");

pingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    try
    {
        const pingInfo = await nomadSdk.ping();
        console.log(pingInfo);
    }
    catch (error)
    {
        console.error(error);
    }
});

authPingForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    try
    {
        const pingInfo = await nomadSdk.pingAuth();
        console.log(pingInfo);
    }
    catch (error)
    {
        console.error(error);
    }
});
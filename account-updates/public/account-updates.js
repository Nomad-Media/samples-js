import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSDK = new NomadMediaSDK(config);

const updateForm = document.getElementById("updateForm");
const emailForm = document.getElementById("changeEmailForm");
const passwordForm = document.getElementById("changePassForm");

const country = document.getElementById("country");
const state = document.getElementById("state");

async function getOptions()
{
    const path = `config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json`;
    const options = await nomadSDK.miscFunctions(path, "GET", null, true);

    const countries = options[5].children;
    const states = options[6].children;

    for (let countryIdx = 0; countryIdx < countries.length; ++countryIdx)
    {
        let option = document.createElement("option");
        option.value = countries[countryIdx].label;
        option.text = countries[countryIdx].label;
        country.appendChild(option);
    }

    for (let stateIdx = 0; stateIdx < states.length; ++stateIdx)
    {
        let option = document.createElement("option");
        option.value = states[stateIdx].label;
        option.text = states[stateIdx].label;
        state.appendChild(option);
    }
}

getOptions();

updateForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(updateForm);
    await nomadSDK.updateUser(
        formData.address1,
        formData.address2,
        formData.city,
        formData.country,
        formData.firstName,
        formData.lastName,
        formData.organization,
        formData.phoneNumber,
        formData.phoneExt,
        formData.postalCode,
        formData.state
    );
});

emailForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(emailForm);
    await nomadSDK.changeEmail(formData.changeEmail, formData.password);
});

passwordForm.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = getElements(passwordForm);
    await nomadSDK.changePassword(formData.currentPassword, formData.newPassword);
});

function getElements(form)
{
    const formData = {};
    for (let input of form)
    {
        if (input.tagName === "SELECT")
        {
            if (input.selectedOptions && input.selectedOptions.length > 0)
            {
                formData[input.id || input.name] = input.selectedOptions[0].value;
            }
        }
        else if (input.tagName === "INPUT")
        {
            if (input.type === "file")
            {
                formData[input.id || input.name] = input.files[0];
            }
            else if (input.type !== "checkbox" || input.checked)
            {
                const value = input.value !== "" ? input.value : null;
                formData[input.id || input.name] = value;
            }
        }
    }
    return formData;
}
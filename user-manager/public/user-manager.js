import NomadMediaSDK from "@nomad-media/full";
import config from "../config.js";
const nomadSdk = new NomadMediaSDK(config);

const COUNTRY_CONTENT_DEFINITION_ID = "ed1edc64-21a5-413e-8cf6-a21285d51e7c";
const SECURITY_GROUP_CONTENT_DEFINITION_ID = "5a91bebb-05c5-4e11-ab8d-48f5a6dd93c0";
const STATE_CONTENT_DEFINITION_ID = "066fa41a-ec24-486c-81fd-a43085064870";
const SYSTEM_ROLE_CONTENT_DEFINITION_ID = "0c32db1f-35ab-41ce-b6b6-5d87e8ae478b";
const USER_CONTENT_DEFINITION_ID = "b42cb50a-1664-4b68-a8f8-2272b9b13e7c";
const USER_STATUS_CONTENT_DEFINITION_ID = "7cd8e9e6-4bd4-471b-906a-965b2ab0e9aa";
const LANGUAGE_ID = "c66131cd-27fc-4f83-9b89-b57575ac0ed8";

const createUserForm = document.getElementById("createUserForm");
const getUserForm = document.getElementById("getUserForm");
const updateUserForm = document.getElementById("updateUserForm");
const deleteUserForm = document.getElementById("deleteUserForm");

const createCountrySelect = document.getElementById("createCountry");
const createSecurityGroupsSelect = document.getElementById("createSecurityGroups");
const createStateSelect = document.getElementById("createState");
const createSystemRole = document.getElementById("createSystemRole");
const createUserStatusSelect = document.getElementById("createUserStatus");
const updateCountrySelect = document.getElementById("updateCountry");
const updateSecurityGroupsSelect = document.getElementById("updateSecurityGroups");
const updateStateSelect = document.getElementById("updateState");
const updateSystemRole = document.getElementById("updateSystemRole");
const updateUserStatusSelect = document.getElementById("updateUserStatus");

getCountries();
getSecurityGroups();
getStates();
getSystemRoles();
getUserStatuses();

async function getCountries()
{
    const countries = await getGroups(COUNTRY_CONTENT_DEFINITION_ID);
    for (let country of countries)
    {
        const option = document.createElement("option");
        option.value = country.id;
        option.text = country.title;
        createCountrySelect.appendChild(option);
        updateCountrySelect.appendChild(option.cloneNode(true));
    }
    $(createCountrySelect).select2();
    $(updateCountrySelect).select2();
}

async function getSecurityGroups()
{
    const securityGroups = await getGroups(SECURITY_GROUP_CONTENT_DEFINITION_ID);
    for (let securityGroup of securityGroups)
    {
        const option = document.createElement("option");
        option.value = securityGroup.id;
        option.text = securityGroup.title;
        createSecurityGroupsSelect.appendChild(option);
        updateSecurityGroupsSelect.appendChild(option.cloneNode(true));
    }
    $(createSecurityGroupsSelect).select2();
    $(updateSecurityGroupsSelect).select2();
}

async function getStates()
{
    const states = await getGroups(STATE_CONTENT_DEFINITION_ID);
    for (let state of states)
    {
        const option = document.createElement("option");
        option.value = state.id;
        option.text = state.title;
        createStateSelect.appendChild(option);
        updateStateSelect.appendChild(option.cloneNode(true));
    }
    $(createStateSelect).select2();
    $(updateStateSelect).select2();
}

async function getSystemRoles()
{
    const systemRoles = await getGroups(SYSTEM_ROLE_CONTENT_DEFINITION_ID);
    for (let systemRole of systemRoles)
    {
        const option = document.createElement("option");
        option.value = systemRole.id;
        option.text = systemRole.title;
        createSystemRole.appendChild(option);
        updateSystemRole.appendChild(option.cloneNode(true));
    }
    $(createSystemRole).select2();
    $(updateSystemRole).select2();
}

async function getUserStatuses()
{
    const userStatuses = await getGroups(USER_STATUS_CONTENT_DEFINITION_ID);
    for (let userStatus of userStatuses)
    {
        const option = document.createElement("option");
        option.value = userStatus.id;
        option.text = userStatus.title;
        createUserStatusSelect.appendChild(option);
        updateUserStatusSelect.appendChild(option.cloneNode(true));
    }
    $(createUserStatusSelect).select2();
    $(updateUserStatusSelect).select2();
}

createUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(createUserForm);

    // Parse select values
    const userStatus = JSON.parse(formData.get("createUserStatus"));
    const state = JSON.parse(formData.get("createState"));
    const country = JSON.parse(formData.get("createCountry"));
    const systemRole = JSON.parse(formData.get("createSystemRole"));

    let securityGroup = null;
    if (formData.get("createSecurityGroups"))
    {
        securityGroup = JSON.parse(formData.get("createSecurityGroups"));
        securityGroup = Array.isArray(securityGroup) ? securityGroup : [securityGroup];
    }

    const userId = await nomadSdk.createContent(USER_CONTENT_DEFINITION_ID);

    const properties = {
        status: userStatus,
        stateId: state,
        country: country,
        role: systemRole
    };

    if (formData.get("firstName")) properties.firstName = formData.get("firstName");
    if (formData.get("lastName")) properties.lastName = formData.get("lastName");
    if (formData.get("email")) properties.email = formData.get("email");
    if (formData.get("organization")) properties.organization = formData.get("organization");
    if (formData.get("title")) properties.title = formData.get("title");
    if (formData.get("phone")) properties.phone = formData.get("phone");
    if (formData.get("phoneExt")) properties.phoneExt = formData.get("phoneExt");
    if (formData.get("mobilePhone")) properties.mobilePhone = formData.get("mobilePhone");
    if (formData.get("address")) properties.address = formData.get("address");
    if (formData.get("address2")) properties.address2 = formData.get("address2");
    if (formData.get("city")) properties.city = formData.get("city");
    if (formData.get("postalCode")) properties.postalCode = formData.get("postalCode");
    if (securityGroup) properties.assignedSecurityGroups = securityGroup;

    const userInfo = await nomadSdk.updateContent(userId.contentId, USER_CONTENT_DEFINITION_ID, properties);

    console.log(userInfo);
});

getUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getUserForm);

    const userInfo = await nomadSdk.getContent(formData.get("userId"), USER_CONTENT_DEFINITION_ID);

    console.log(userInfo);
});

updateUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateUserForm);

    // Parse select values
    const userStatus = JSON.parse(formData.get("updateUserStatus"));
    const state = JSON.parse(formData.get("updateState"));
    const country = JSON.parse(formData.get("updateCountry"));
    const systemRole = JSON.parse(formData.get("updateSystemRole"));

    let securityGroup = null;
    if (formData.get("updateSecurityGroups"))
    {
        securityGroup = JSON.parse(formData.get("updateSecurityGroups"));
        securityGroup = Array.isArray(securityGroup) ? securityGroup : [securityGroup];
    }

    const properties = {
        status: userStatus,
        stateId: state,
        country: country,
        role: systemRole
    };

    if (formData.get("firstName")) properties.firstName = formData.get("firstName");
    if (formData.get("lastName")) properties.lastName = formData.get("lastName");
    if (formData.get("email")) properties.email = formData.get("email");
    if (formData.get("organization")) properties.organization = formData.get("organization");
    if (formData.get("title")) properties.title = formData.get("title");
    if (formData.get("phone")) properties.phone = formData.get("phone");
    if (formData.get("phoneExt")) properties.phoneExt = formData.get("phoneExt");
    if (formData.get("mobilePhone")) properties.mobilePhone = formData.get("mobilePhone");
    if (formData.get("address")) properties.address = formData.get("address");
    if (formData.get("address2")) properties.address2 = formData.get("address2");
    if (formData.get("city")) properties.city = formData.get("city");
    if (formData.get("postalCode")) properties.postalCode = formData.get("postalCode");
    if (securityGroup) properties.assignedSecurityGroups = securityGroup;

    const userInfo = await nomadSdk.updateContent(formData.get("userId"), USER_CONTENT_DEFINITION_ID, properties);

    console.log(userInfo);
});

deleteUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteUserForm);

    await nomadSdk.deleteContent(formData.get("userId"), USER_CONTENT_DEFINITION_ID);

    console.log("User deleted successfully");
});

function getElements(form)
{
    const formData = new FormData();
    for (let input of form)
    {
        if (input.id === "") continue;
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let element of input)
            {
                if (element.selected)
                {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase())
                    {
                        if (input.id)
                        {
                            formData.append(input.id, element.value);
                        }
                        else
                        {
                            formData.append(input.name, element.value);
                        }
                    }
                    else
                    {
                        selectedOptions.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (input.multiple)
            {
                formData.append(input.id, JSON.stringify(selectedOptions));
            }
            else if (selectedOptions.length > 0)
            {
                formData.append(input.id, JSON.stringify(selectedOptions[0]));
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
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
    return formData;
}

async function getGroups(contentDefinitionId)
{
    const groupList = [];
    let offset = 0;
    while (true)
    {
        const searchInfo = await nomadSdk.search(
            null, offset, null,
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: contentDefinitionId,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: LANGUAGE_ID
                }
            ], null, null, null, null, true, null
        );
        if (!searchInfo) return [];
        groupList.push(...searchInfo.items);
        ++offset;
        if (searchInfo.items.length < 100) break;
    }
    return groupList;
}
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
    const userStatus = formData.createUserStatus ? JSON.parse(formData.createUserStatus) : null;
    const state = formData.createState ? JSON.parse(formData.createState) : null;
    const country = formData.createCountry ? JSON.parse(formData.createCountry) : null;
    const systemRole = formData.createSystemRole ? JSON.parse(formData.createSystemRole) : null;

    let securityGroup = null;
    if (formData.createSecurityGroups)
    {
        securityGroup = JSON.parse(formData.createSecurityGroups);
        securityGroup = Array.isArray(securityGroup) ? securityGroup : [securityGroup];
    }

    const userId = await nomadSdk.createContent(USER_CONTENT_DEFINITION_ID);

    const properties = {
        status: userStatus,
        stateId: state,
        country: country,
        role: systemRole
    };

    if (formData.firstName) properties.firstName = formData.firstName;
    if (formData.lastName) properties.lastName = formData.lastName;
    if (formData.email) properties.email = formData.email;
    if (formData.organization) properties.organization = formData.organization;
    if (formData.title) properties.title = formData.title;
    if (formData.phone) properties.phone = formData.phone;
    if (formData.phoneExt) properties.phoneExt = formData.phoneExt;
    if (formData.mobilePhone) properties.mobilePhone = formData.mobilePhone;
    if (formData.address) properties.address = formData.address;
    if (formData.address2) properties.address2 = formData.address2;
    if (formData.city) properties.city = formData.city;
    if (formData.postalCode) properties.postalCode = formData.postalCode;
    if (securityGroup) properties.assignedSecurityGroups = securityGroup;

    const userInfo = await nomadSdk.updateContent(userId.contentId, USER_CONTENT_DEFINITION_ID, properties);

    console.log(userInfo);
});

getUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(getUserForm);

    const userInfo = await nomadSdk.getContent(formData.userId, USER_CONTENT_DEFINITION_ID);

    console.log(userInfo);
});

updateUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(updateUserForm);

    // Parse select values
    const userStatus = formData.updateUserStatus ? JSON.parse(formData.updateUserStatus) : null;
    const state = formData.updateState ? JSON.parse(formData.updateState) : null;
    const country = formData.updateCountry ? JSON.parse(formData.updateCountry) : null;
    const systemRole = formData.updateSystemRole ? JSON.parse(formData.updateSystemRole) : null;

    let securityGroup = null;
    if (formData.updateSecurityGroups)
    {
        securityGroup = JSON.parse(formData.updateSecurityGroups);
        securityGroup = Array.isArray(securityGroup) ? securityGroup : [securityGroup];
    }

    const properties = {
        status: userStatus,
        stateId: state,
        country: country,
        role: systemRole
    };

    if (formData.firstName) properties.firstName = formData.firstName;
    if (formData.lastName) properties.lastName = formData.lastName;
    if (formData.email) properties.email = formData.email;
    if (formData.organization) properties.organization = formData.organization;
    if (formData.title) properties.title = formData.title;
    if (formData.phone) properties.phone = formData.phone;
    if (formData.phoneExt) properties.phoneExt = formData.phoneExt;
    if (formData.mobilePhone) properties.mobilePhone = formData.mobilePhone;
    if (formData.address) properties.address = formData.address;
    if (formData.address2) properties.address2 = formData.address2;
    if (formData.city) properties.city = formData.city;
    if (formData.postalCode) properties.postalCode = formData.postalCode;
    if (securityGroup) properties.assignedSecurityGroups = securityGroup;

    const userInfo = await nomadSdk.updateContent(formData.userId, USER_CONTENT_DEFINITION_ID, properties);

    console.log(userInfo);
});

deleteUserForm.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const formData = getElements(deleteUserForm);

    await nomadSdk.deleteContent(formData.userId, USER_CONTENT_DEFINITION_ID);

    console.log("User deleted successfully");
});

function getElements(form)
{
    const formData = {};
    for (let input of form.elements)
    {
        if (!input.id) continue;
        if (input.tagName === "SELECT")
        {
            const selectedOptions = [];
            for (let option of input.options)
            {
                if (option.selected)
                {
                    if (option.value.trim().toLowerCase() === option.label.trim().toLowerCase())
                    {
                        formData[input.id] = option.value;
                    }
                    else
                    {
                        selectedOptions.push({ id: option.value, description: option.label });
                    }
                }
            }
            if (input.multiple)
            {
                formData[input.id] = JSON.stringify(selectedOptions);
            }
            else if (selectedOptions.length > 0)
            {
                formData[input.id] = JSON.stringify(selectedOptions[0]);
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            formData[input.id] = input.value;
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
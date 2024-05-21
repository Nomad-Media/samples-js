const CREATE_USER_FORM = document.getElementById("createUserForm");
const GET_USER_FORM = document.getElementById("getUserForm");
const UPDATE_USER_FORM = document.getElementById("updateUserForm");
const DELETE_USER_FORM = document.getElementById("deleteUserForm");

const CREATE_COUNTRY_SELECT = document.getElementById("createCountry");
const CREATE_SECURITY_GROUPS_SELECT = document.getElementById("createSecurityGroups");
const CREATE_STATE_SELECT = document.getElementById("createState");
const CREATE_SYSTEM_ROLE = document.getElementById("createSystemRole");
const CREATE_USER_STATUS_SELECT = document.getElementById("createUserStatus");
const UPDATE_COUNTRY_SELECT = document.getElementById("updateCountry");
const UPDATE_SECURITY_GROUPS_SELECT = document.getElementById("updateSecurityGroups");
const UPDATE_STATE_SELECT = document.getElementById("updateState");
const UPDATE_SYSTEM_ROLE = document.getElementById("updateSystemRole");
const UPDATE_USER_STATUS_SELECT = document.getElementById("updateUserStatus");

await getCountries();

async function getCountries()
{
    const COUNTRIES = await sendRequest("/getCountries", "GET");
    for (let country of COUNTRIES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = country.id;
        OPTION.text = country.title;
        CREATE_COUNTRY_SELECT.appendChild(OPTION);
        UPDATE_COUNTRY_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_COUNTRY_SELECT).select2();
    $(UPDATE_COUNTRY_SELECT).select2();
}

await getSecurityGroups();

async function getSecurityGroups()
{
    const SECURITY_GROUPS = await sendRequest("/getSecurityGroups", "GET");
    for (let securityGroup of SECURITY_GROUPS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = securityGroup.id;
        OPTION.text = securityGroup.title;
        CREATE_SECURITY_GROUPS_SELECT.appendChild(OPTION);
        UPDATE_SECURITY_GROUPS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_SECURITY_GROUPS_SELECT).select2();
    $(UPDATE_SECURITY_GROUPS_SELECT).select2();
}

await getStates();

async function getStates()

{
    const STATES = await sendRequest("/getStates", "GET");
    for (let state of STATES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = state.id;
        OPTION.text = state.title;
        CREATE_STATE_SELECT.appendChild(OPTION);
        UPDATE_STATE_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_STATE_SELECT).select2();
    $(UPDATE_STATE_SELECT).select2();
}

await getSystemRoles();

async function getSystemRoles()
{
    const SYSTEM_ROLES = await sendRequest("/getSystemRoles", "GET");
    for (let systemRole of SYSTEM_ROLES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = systemRole.id;
        OPTION.text = systemRole.title;
        CREATE_SYSTEM_ROLE.appendChild(OPTION);
        UPDATE_SYSTEM_ROLE.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_SYSTEM_ROLE).select2();
    $(UPDATE_SYSTEM_ROLE).select2();
}

await getUserStatuses();

async function getUserStatuses()
{
    const USER_STATUSES = await sendRequest("/getUserStatuses", "GET");
    for (let userStatus of USER_STATUSES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = userStatus.id;
        OPTION.text = userStatus.title;
        CREATE_USER_STATUS_SELECT.appendChild(OPTION);
        UPDATE_USER_STATUS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_USER_STATUS_SELECT).select2();
    $(UPDATE_USER_STATUS_SELECT).select2();
}

CREATE_USER_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_USER_FORM);

    const USER_INFO = await sendRequest("/createUser", "POST", FORM_DATA);
});

GET_USER_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_USER_FORM);

    const USER_INFO = await sendRequest("/getUser", "POST", FORM_DATA);
});

UPDATE_USER_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_USER_FORM);

    const USER_INFO = await sendRequest("/updateUser", "POST", FORM_DATA);
});

DELETE_USER_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_USER_FORM);

    const USER_INFO = await sendRequest("/deleteUser", "POST", FORM_DATA);
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.id === "") continue;
        if (input.tagName === "SELECT") {
            const SELECTED_OPTIONS = []
            for (let element of input) {
                if (element.selected) {
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) {
                        if (input.id) {
                            FORM_DATA.append(input.id, element.value);
                        } else {
                            FORM_DATA.append(input.name, element.value);
                        }
                    } else {
                        SELECTED_OPTIONS.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (input.multiple)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS));
            }
            else if (SELECTED_OPTIONS.length > 0)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS[0]));
            }
        }
        else if (input.tagName === "INPUT" || input.tagName === "TEXTAREA")
        {
            if (input.id) {
                FORM_DATA.append(input.id, input.value);
            } else {
                FORM_DATA.append(input.name, input.value);
            }
        }
    }
    return FORM_DATA;
}

async function sendRequest(PATH, METHOD, BODY)
{
    try
    {
        const REQUEST = { method: METHOD };
        if (BODY) REQUEST["body"] = BODY;
        const RESPONSE = await fetch(PATH, REQUEST);

        if (RESPONSE.ok)
        {
            try
            {
                const DATA = await RESPONSE.json();
                if (DATA) return DATA;
            }
            catch (error)
            {
                console.log("No data returned");
            }
        }
        else
        {
            const INFO = await RESPONSE.json();
            console.error(JSON.stringify(INFO, null, 4));
            console.error("HTTP-Error: " + RESPONSE.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}
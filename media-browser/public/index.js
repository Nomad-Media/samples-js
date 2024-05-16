const CONFIG_DIV = document.getElementById('configDiv');
const FEATURED_GROUPS_DIV = document.getElementById('featuredGroupsDiv');
const MEDIA_GROUP_DIV = document.getElementById('mediaGroupDiv');

const CONFIG_BUTTON = document.getElementById('configButton');
const MEDIA_GROUP_BUTTON = document.getElementById('mediaGroupButton');

let mediaGroupId = null;

CONFIG_BUTTON.addEventListener('click', async function (event) {
    event.preventDefault();

    const CONFIG = await sendRequest('/getConfig', 'GET');
    
    mediaGroupId = CONFIG.landingPageMediaGroup.id;

    CONFIG_DIV.hidden = true;
    MEDIA_GROUP_DIV.hidden = false;
});

MEDIA_GROUP_BUTTON.addEventListener('click', async function (event) {
    event.preventDefault();

    const FORM_DATA = new FormData();
    FORM_DATA.append('id', mediaGroupId);

    const MEDIA_GROUP = await sendRequest('/getMediaGroup', 'POST', FORM_DATA);

    MEDIA_GROUP_DIV.hidden = true;

    await createMenuItems(MEDIA_GROUP.mediaGroupMenuItems);
    await createFeaturedGroupsRows(MEDIA_GROUP.featuredGroups);
});

async function createMenuItems(MEDIA_GROUP_MENU_ITEMS)
{
    const HEADER = document.querySelector('header');
    const FOOTER = document.querySelector('footer');

    const HEADER_NAV = document.createElement('nav');
    const FOOTER_NAV = document.createElement('nav');

    const HOME = document.createElement('a');
    HOME.innerText = "Home";
    HOME.href = "/";
    HEADER.appendChild(HOME);

    HEADER_NAV.classList.add("nav");
    FOOTER_NAV.classList.add("nav");

    MEDIA_GROUP_MENU_ITEMS.sort((a, b) => a.location.sortOrder - b.location.sortOrder);

    for (let menuItem of MEDIA_GROUP_MENU_ITEMS)
    {
        const MENU_ITEM = document.createElement('a');
        MENU_ITEM.innerText = menuItem.title;
        
        if (menuItem.contentDefinition && menuItem.contentDefinition.description === "Content Definition")
        {
            MENU_ITEM.href = menuItem.url ? menuItem.url : menuItem.title.toLowerCase().replace(' ', '-');
        }
        else if (menuItem.contentDefinition && menuItem.contentDefinition.description === "Dynamic Content")
        {
            MENU_ITEM.href = "#";
            MENU_ITEM.addEventListener('click', async function (event) {
                const FORM_DATA = new FormData();
                FORM_DATA.append('id', menuItem.itemId);

                const CONTENT = await sendRequest('/getContent', 'POST', FORM_DATA);

                const DIALOG = document.createElement('dialog');

                const DIALOG_CONTENT = document.createElement('div');

                const TITLE = document.createElement('h3');
                TITLE.innerText = CONTENT.title;

                DIALOG_CONTENT.innerHTML = CONTENT.content;

                let dialogCloseButton = document.createElement('button');
                dialogCloseButton.innerText = "X";
                dialogCloseButton.style.position = "absolute";
                dialogCloseButton.style.right = "0";
                dialogCloseButton.style.top = "0";
                dialogCloseButton.style.zIndex = "1";
                dialogCloseButton.addEventListener('click', function (event) {
                    DIALOG.remove();
                });

                DIALOG.appendChild(TITLE);
                DIALOG.appendChild(DIALOG_CONTENT);
                DIALOG.appendChild(dialogCloseButton);
                document.body.appendChild(DIALOG);

                DIALOG.showModal();
            });
        }
        else if (menuItem.url)
        {
            MENU_ITEM.href = menuItem.url;
        }

        menuItem.location.description === "Header" ? HEADER_NAV.appendChild(MENU_ITEM) : FOOTER_NAV.appendChild(MENU_ITEM);
    }

    const SEARCH = document.createElement('a');
    SEARCH.innerText = "Search";
    SEARCH.href = "/search";
    HEADER_NAV.appendChild(SEARCH);
    
    HEADER.appendChild(HEADER_NAV);
    FOOTER.appendChild(FOOTER_NAV);
}

async function createFeaturedGroupsRows(FEATUED_GROUPS)
{
    for (let featuredGroup of FEATUED_GROUPS)
    {
        const FEATURED_GROUP_HEADER = document.createElement('h3');
        FEATURED_GROUP_HEADER.innerText = featuredGroup.title;

        const FEATURED_GROUP_TABLE = document.createElement('table');
        FEATURED_GROUP_TABLE.classList.add("table");
        const FEATURED_GROUP_ROW = FEATURED_GROUP_TABLE.insertRow();

        for (let item of featuredGroup.items)
        {
            const FEATURED_GROUP_CELL = FEATURED_GROUP_ROW.insertCell();
            FEATURED_GROUP_CELL.innerText = item.title;

            FEATURED_GROUP_CELL.classList.add("rowSelect");

            FEATURED_GROUP_CELL.addEventListener('click', async function (event) {
                await enterDialog(item.itemId);
            });
                           
            FEATURED_GROUPS_DIV.appendChild(FEATURED_GROUP_HEADER);
            FEATURED_GROUPS_DIV.appendChild(FEATURED_GROUP_TABLE);
        }
    }
}

async function enterDialog(MEDIA_ITEM_ID)
{
    let dialog = document.createElement('dialog');
    dialog.id = `dialog-${MEDIA_ITEM_ID}`;

    let dialogContent = document.createElement('div');

    let dialogCloseButton = document.createElement('button');
    dialogCloseButton.innerText = "X";
    dialogCloseButton.style.position = "absolute";
    dialogCloseButton.style.right = "0";
    dialogCloseButton.style.top = "0";
    dialogCloseButton.style.zIndex = "1";
    dialogCloseButton.addEventListener('click', function (event) {
        dialog.remove();
    });

    dialogContent.appendChild(dialogCloseButton);
    dialog.appendChild(dialogContent);

    const FORM_DATA = new FormData();
    FORM_DATA.append('id', MEDIA_ITEM_ID);

    const ITEM_INFO = await sendRequest('/getMediaItem', 'POST', FORM_DATA);

    const TITLE = document.createElement('h3');
    TITLE.innerText = ITEM_INFO.title;

    const DESCRIPTION = document.createElement('p');
    ITEM_INFO.longDescription ? DESCRIPTION.innerText = ITEM_INFO.longDescription : null;

    dialogContent.appendChild(TITLE);
    dialogContent.appendChild(DESCRIPTION);

    if (ITEM_INFO.performers && ITEM_INFO.performers.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Performers";
        dialogContent.appendChild(TITLE);

        const PERFORMERS = document.createElement('p');
        ITEM_INFO.performers ? PERFORMERS.innerText = ITEM_INFO.performers.map(performer =>performer.name).join(', ') : null;
        dialogContent.appendChild(PERFORMERS);
    }

    if (ITEM_INFO.genres && ITEM_INFO.genres.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Genres";
        dialogContent.appendChild(TITLE);

        const GENRES = document.createElement('p');
        ITEM_INFO.genres ? GENRES.innerText = ITEM_INFO.genres.map(genre =>genre.description).join(', ') : null;
        dialogContent.appendChild(GENRES);
    }


    if (ITEM_INFO.contentRatings && ITEM_INFO.contentRatings.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Content Ratings";
        dialogContent.appendChild(TITLE);

        const CONTNET_RATINGS = document.createElement('p');
        ITEM_INFO.contentRatings ? CONTNET_RATINGS.innerText = ITEM_INFO.contentRatings.map(contentRating =>contentRating.description).join(', ') : null;
        dialogContent.appendChild(CONTNET_RATINGS);
    }

    if (ITEM_INFO.mediaAttributes && ITEM_INFO.mediaAttributes.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Media Attributes";
        dialogContent.appendChild(TITLE);

        const MEDIA_ATTRIBUTES = document.createElement('p');
        ITEM_INFO.mediaAttributes ? MEDIA_ATTRIBUTES.innerText = ITEM_INFO.mediaAttributes.map(mediaAttribute =>mediaAttribute.name).join(', ') : null;
        dialogContent.appendChild(MEDIA_ATTRIBUTES);
    }

    if (ITEM_INFO.tags && ITEM_INFO.tags.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Tags";
        dialogContent.appendChild(TITLE);

        const TAGS = document.createElement('p');
        ITEM_INFO.tags ? TAGS.innerText = ITEM_INFO.tags.map(tag =>tag.name).join(', ') : null;
        dialogContent.appendChild(TAGS);
    }

    if (ITEM_INFO.video && ITEM_INFO.video.fullUrl)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Video Url";
        dialogContent.appendChild(TITLE);

        const VIDEO_URL = document.createElement('a');
        VIDEO_URL.href = ITEM_INFO.video.fullUrl;
        VIDEO_URL.innerText = ITEM_INFO.video.fullUrl;
        dialogContent.appendChild(VIDEO_URL);
    }
    
    if (ITEM_INFO.similarMediaItems && ITEM_INFO.similarMediaItems.length > 0)
    {
        const TITLE = document.createElement('h5');
        TITLE.innerText = "Similar Items";
        dialogContent.appendChild(TITLE);

        const SIMILAR_ITEMS_TABLE = document.createElement('table');
        const SIMILAR_ITEMS_ROW = SIMILAR_ITEMS_TABLE.insertRow();

        for (let similarItem of ITEM_INFO.similarMediaItems)
        {
            const SIMILAR_ITEM_CELL = SIMILAR_ITEMS_ROW.insertCell();
            SIMILAR_ITEM_CELL.innerText = similarItem.title;

            SIMILAR_ITEM_CELL.classList.add("rowSelect");

            SIMILAR_ITEM_CELL.addEventListener('click', async function (event) {
                dialog.remove();
                await enterDialog(similarItem.relatedMediaItemId);
            });
                           
            dialogContent.appendChild(SIMILAR_ITEMS_TABLE);
        }
    }

    dialog.appendChild(dialogContent);

    document.body.appendChild(dialog);

    dialog.showModal();
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
            const DATA = await RESPONSE.json();
            if (DATA) return DATA;
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
## Prerequisites

- Node package manager (npm).

> 📘 Note
> 
> You can download npm [here](https://nodejs.org/en/download).

## Nomad SDK NPM

To learn how to set up the nomad sdk npm, go to [Nomad SDK NPM](https://github.com/Nomad-Media/nomad-sdk/tree/main/nomad-sdk-npm).

## Setup

- First, add a config.js file to the root of the sample directory. The config.js file should look like this:

```javascript 
const config = {
    "username": "username",
    "password": "password",
    "serviceApiUrl": "serviceApiUrl",
    "apiType": "admin",
    "debugMode": true
};

export default config;
```

- Next, open up a terminal and navigate to the directory of the sample you want to run.

- Then, install the needed packages.

```bash
npm install
```

- Next, start the server.

```bash
npm start
```

- Finally open a webpage and go to localhost:4200.
## Nomad SDK Files

In the nomad-sdk/js directory there are two versions of the Nomad SDK. There is the sdk.min.js file which is a minified version of the sdk, and the sdk-debug.js file which is a concatenated version of the sdk. The sdk-debug file will show you all the parameter documentation and readable code.

## Sample Code Structure
| Title | Description | Link |
| ----- | ----------- | ---- |
| Account Authenticateion | Shows how to authenticate a user and generate a token. | [Account Authentication](https://github.com/Nomad-Media/samples-js/tree/main/account-authentication)
| Account Registration | Shows how to register a user. | [Account Registration](https://github.com/Nomad-Media/samples-js/tree/main/account-registration)
| Account Updates | Shows how to update a user's account. | [Account Updates](https://github.com/Nomad-Media/samples-js/tree/main/account-updates)
| Asset | show how to use all of the endpoints related to assets (not including uploading). | [Asset](https://github.com/Nomad-Media/samples-js/tree/main/asset)
| Asset Upload | Shows how to upload an asset and a related asset. | [Asset Upload](https://github.com/Nomad-Media/samples-js/tree/main/assets-upload)
| Audit | Shows how to get audit logs. | [Audit](https://github.com/Nomad-Media/samples-js/tree/main/audit)
| Config | Shows how to use all of the endpoints related to config. | [Config](https://github.com/Nomad-Media/samples-js/tree/main/config)
| Content | Shows how to create, delete, get and update content (including getting user tracking). | [Content](https://github.com/Nomad-Media/samples-js/tree/main/content)
| Content Groups | Shows how to create, delete, and manipulate content groups. | [Content Groups](https://github.com/Nomad-Media/samples-js/tree/main/content-groups)
| Content Metadata | Shows how to manipulate asset metadata | [Content Admin](https://github.com/Nomad-Media/samples-js/tree/main/content-metadata)
| Event Scheduler | Shows how to create, delete, and update and event and add and extend a live schedule to an event. | [Event Scheduler](https://github.com/Nomad-Media/samples-js/tree/main/event-scheduler)
| Live Channel | Shows how to use live channels, live inputs, live outputs, schedule events, and live operators. | [Live Channel](https://github.com/Nomad-Media/samples-js/tree/main/live-channel)
| Live Output Profile | Shows how to use live output profiles. | [Live Output Profile](https://github.com/Nomad-Media/samples-js/tree/main/live-output-profile)
| Live Output Profile Group | Shows how to use live output profile groups. | [Live Output Profile Group](https://github.com/Nomad-Media/samples-js/tree/main/live-output-profile-group)
| Media | Shows how to use all of the endpoints related to media. | [Media](https://github.com/Nomad-Media/samples-js/tree/main/media)
| Media Browser | Shows how to use the media browser. The media browser shows all of the content of the default media group specified in the config. | [Media Browser](https://github.com/Nomad-Media/samples-js/tree/main/media-browser)
| Media Builder | Shows how to use all of the endpoints related to the media builder. | [Media Builder](https://github.com/Nomad-Media/samples-js/tree/main/media-builder)
| Media Manager | Shows how to use the media manager. The media manager shows tables of the content definitions commonly used for content. | [Media Manager](https://github.com/Nomad-Media/samples-js/tree/main/media-manager)
| Movies | Shows how to use content admin, content groups, and content to create a movie. | [Movies](https://github.com/Nomad-Media/samples-js/tree/main/movies)
| Ping | Shows how to ping an application and/or a user session. | [Ping](https://github.com/Nomad-Media/samples-js/tree/main/ping)
| Saved Search | Shows how to use saved searches and search saves. | [Saved Search](https://github.com/Nomad-Media/samples-js/tree/main/saved-search)
| Schedule | Shows how to set up and use intelligent playlists, intellignet schedules, and playlists. | [Schedule](https://github.com/Nomad-Media/samples-js/tree/main/schedule)
| Search | Shows how to use search and all of the parameters that can be used with search. | [Search](https://github.com/Nomad-Media/samples-js/tree/main/search)
| Sync | Shows how to set up CRUD operations for a content definition (in this case, a movie). | [Sync](https://github.com/Nomad-Media/samples-js/tree/main/sync)
| User | Shows how to delete various user data. | [User](https://github.com/Nomad-Media/samples-js/tree/main/user)
| User Session | Shows how to change a user session status. | [User Session](https://github.com/Nomad-Media/samples-js/tree/main/user-session)
| Video Tracking | Shows the different ways to track video. | [Video Tracking](https://github.com/Nomad-Media/samples-js/tree/main/user-session)
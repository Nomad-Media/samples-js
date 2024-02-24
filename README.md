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
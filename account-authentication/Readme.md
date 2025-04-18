## Prerequisites

- Node package manager (npm).

> 📘 Note
> 
> You can download npm [here](https://nodejs.org/en/download).

## Nomad SDK NPM

To learn how to download and setup the nomad sdk npm, go to [Nomad SDK NPM](https://github.com/Nomad-Media/nomad-sdk/tree/main/nomad-sdk-npm).

## Setup

To run the Node application, follow these steps:
```
npm install
npm start
```

Then open a webpage and go to localhost:4200.

## Nomad SDK Files

In the nomad-sdk/js directory there are two versions of the Nomad SDK. There is the sdk.min.js file which is a minified version of the sdk, and the sdk-debug.js file which is a concatenated version of the sdk. The sdk-debug file will show you all the parameter documentation and readable code.

## Login

To login, click the login button. (Note the NomadSDK automatically logs you in).

![](images/login.png)

> 📘 Note
> 
> For more information about the API call used go to [Login](https://developer.nomad-cms.com/docs/login)

## Refresh Token

To refresh the authentication token, click the refresh token button. (Note the NomadSDK automatically refreshes the token before it expires).

![](images/refresh-token.png)

> 📘 Note
> 
> For more information about the API call used go to [Refresh Token](https://developer.nomad-cms.com/docs/refresh-token)

## Forgot Password

If you forgot your password, enter your email under "Enter Username" under "Forgot Password". You should get emailed a 6 digit code.

![](images/forgot-password.png)
![](images/email.png)

> 📘 Note
> 
> For more information about the API call used go to [Forgot Password](https://developer.nomad-cms.com/docs/forgot-password)

## Reset Password

Enter your code into "Enter Code" under "Reset Password" and your password will be reset.

![](images/reset-password.png)

> 📘 Note
> 
> For more information about the API call used go to [Reset Password](https://developer.nomad-cms.com/docs/reset-password)

## Logout

To logout, click logout.

![](images/logout.png)

> 📘 Note
> 
> For more information about the API call used go to [Logout](https://developer.nomad-cms.com/docs/logout)
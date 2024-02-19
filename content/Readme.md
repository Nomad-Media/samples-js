## Prerequisites

- Node package manager (npm).

> 📘 Note
> 
> You can download npm [here](https://nodejs.org/en/download).

## Nomad SDK NPM

To learn how to set up the nomad sdk npm, go to [Nomad SDK NPM](doc:nomad-sdk).

## Setup

To run the Node application, follow these steps:
```
npm install
npm start
```

Then open a webpage and go to localhost:4200.
![](images/homepage.png)

## Nomad SDK Files

In the nomad-sdk/js directory there are two versions of the Nomad SDK. There is the sdk.min.js file which is a minified version of the sdk, and the sdk-debug.js file which is a concatenated version of the sdk. The sdk-debug file will show you all the parameter documentation and readable code.

## Get Content

To get a content, enter the content and content definition id and if it is a revision.

![](images/get-content.png)

> 📘 Note
> 
> For more information about the API call used go to [Gets a content.](ref:getcontent-1)

## Create Content

To create content, enter the id of the content definition you want to add the content to. This will create a new blank content in your content definition.

![](images/create-content.png)

> 📘 Note
> 
> For more information about the API call used go to [Creates a content.](ref:createcontent)

## Update Content

To update content, enter the id of the content definition you want to update the content to, the id of the content you want to update, the properties (in json), and the language id.

![](images/update-content.png)

> 📘 Note
> 
> For more information about the API call used go to [Updates a content.](ref:updatecontent)

## Get Content User Tracking

To get user tracking, enter the id and content definition id of the content you want to get the user tracking of.

![](images/get-content-user-track.png)

> 📘 Note
> 
> For more information about the API calls used go to [Gets the content user track.](ref:getcontentusertrack)

## Delete Content

To delete content, enter the id of the content definition the content is in and the id of the content.

![](images/delete-content.png)

> 📘 Note
> 
> For more information about the API call used go to [Deletes a content.](ref:deletecontent)
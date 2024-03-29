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

## Content Definition Setup

## Introduction

For this walkthrough we are assuming you read and understand the concepts and terminology explained in [Content Definitions](https://developer.nomad-cms.com/docs/content-definitions).

## Creating the Movie content definition

Let's create a new content definition called Movie with the following fields and settings:

| Title | Type | Required | Is Index Identifier | Editor Form Fields Tab | Content List Fields Tab |
|-------|------|----------|---------------------|------------------------|------------------------|
| Title | Short Text | Yes | Yes | Yes | Yes |
| Slug | Short Text<br>Slugify | Yes | Yes | Yes | No |
| Plot | Long Text | No | Yes | Yes | Yes |
| Genres | Lookup Multi-Select | No | Yes | Yes | Yes |
| Tags | Lookup Multi-Select | No | Yes | Yes | Yes |
| Performers | Lookup Multi-Select | No | Yes | Yes | Yes |
| Ratings | Related Content Definition | No | Yesq | Yes | Yes |
| Release Date | Date | No | Yes | Yes | Yes |
| Image | Image Selector | No | Yes | Yes | Yes |
| Video | Asset Selector | No | Yes | Yes | Yes |

The completed Movie content definition will look like this:

![](images/content-definition-movie.png)

## Creating the Movie Genre content definition

Let's create another content definition to add more metadata to the asset for use in queries. This one will be a Movie Genre content definition.

| Title | Type | Required | Is Index Identifier | Editor Form Fields Tab | Content List Fields Tab |
|-------|------|----------|---------------------|------------------------|------------------------|
| Name | Short Text | Yes | Yes | Yes | Yes |
| Slug | Short Text<br>Slugify | Yes | Yes | Yes | No |

The completed Movie Genre content definition will look like this:

![](images/content-definition-movie-genre.png)

## Other Content Definitions

Here are the tables for the other Content Definitions:

Tags:

| Title | Type       | Required | Is Index Identifier | Editor Form Fields Tab | Content List Fields Tab |
| :---- | :--------- | :------- | :------------------ | :--------------------- | :---------------------- |
| Name  | Short Text | Yes      | Yes                 | Yes                    | Yes                     |

Performers:

| Title | Type | Required | Is Index Identifier | Editor Form Fields Tab | Content List Fields Tab |
|-------|------|----------|---------------------|------------------------|------------------------|
| Name | Short Text | Yes | Yes | Yes | Yes |
| Slug | Short Text<br>Slugify | Yes | Yes | Yes | No |

Ratings:
| Title | Type | Required | Is Index Identifier | Editor Form Fields Tab | Content List Fields Tab |
|-------|------|----------|---------------------|------------------------|------------------------|
| Name | Short Text | Yes | Yes | Yes | Yes |
| Slug | Short Text<br>Slugify | Yes | Yes | Yes | No |
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

## Create and Update Event Instance

To create or update an event, first select whether you want to create or update an event. Then enter the start and end datetime of the event, the event type, and optionally, the series and/or any additional properties.

![](images/creating-and-updating-event.png)

> 📘 Note
> 
> For more information about the API calls used go to [Create and Updates Event](https://developer.nomad-cms.com/docs/create-event)

## Add Live Schedule To Event

To add a live schedule to an event, you need to enter the id of the event you want to add the live schedule to. Either the Primary Livestream Input, or the Primary Livesteam Input URL is required.

![](images/add-live-schedule-to-event.png)

![](images/add-live-schedule-to-event-2.png)

> 📘 Note
> 
> For more information about the API calls used go to [Add Live Schedule to Event](https://developer.nomad-cms.com/docs/add-live-schedule-to-event)

## Extend Live Schedule

To extend a Live Schedule, you need to enter the id of the event with the live schedule, the days you want to extend it to, and the number of weeks you want to extend the live schedule to. Optionally, you can include the datetime in which you want to end the extension.

![](images/extent-live-schedule.png)

> 📘 Note
> 
> For more information about the API calls used go to [Extend Live Schedule](https://developer.nomad-cms.com/docs/extend-live-schedule)

## Get Live Schedule

To get a live schedule of an event, you need to enter the id of the event.

![](images/get-live-schedule.png)

> 📘 Note
> 
> For more information about the API calls used go to [Gets Live Schedule](https://developer.nomad-cms.com/docs/get-live-schedule)

## Start Live Schedule

To start a live schedule of an event, you need to enter the id of the event.

![](images/start-live-schedule.png)

> 📘 Note
> 
> For more information about the API calls used go to [Start Live Schedule](https://developer.nomad-cms.com/docs/start-live-schedule)

## Stop Live Schedule

To stop a live schedule of an event, you need to enter the id of the event.

![](images/stop-live-schedule.png)

> 📘 Note
> 
> For more information about the API calls used go to [Stop Live Schedule](https://developer.nomad-cms.com/docs/stop-live-schedule)

## Deleting Event Instance

To delete an instance, you need the content id, and the content definition id.

![](images/delete-event-instance.png)

> 📘 Note
> 
> For more information about the API calls used go to [Delete Event](https://developer.nomad-cms.com/docs/delete-event)
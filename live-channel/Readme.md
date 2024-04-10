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

## Get Live Channels

To get all live channels, click submit under Get Live Channels.

![](images/get-live-channels.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live Channels](https://developer.nomad-cms.com/docs/get-live-channels)

## Get Live Channel

To get a specific live channel, enter the id of the live channel you want to get.

![](images/get-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live Channel](https://developer.nomad-cms.com/docs/get-live-channel)

## Create Live Channel

To create a live channel, enter the channel name you want to assign the channel. Then enter all the information for the channel.

![](images/create-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Create Live Channel](https://developer.nomad-cms.com/docs/create-live-channel)

## Update Channel

To update a live channel, enter the channel name , the id of the thumbnail image, and the asset id of the archive folder you want to update. Then enter the status of high availability, live clipping, secure output, and output screenshots you want to update. Finally choose the channel type you want to update to. If the channel type is external, you need to enter the url you want to use.

![](images/update-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Update Live Channel](https://developer.nomad-cms.com/docs/update-live-channel)

## Clip Live Channel

To clip a live channel, select the channel you want to clip. Then enter the start time code, and if you want the clip to be more than a frame, the end time code, and the id of the output folder asset. Optionally, add the title, tags, collections, related content, video bit rate, and audio tracks you want to add to the clip.

![](images/clip-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Clip Live Channel](https://developer.nomad-cms.com/docs/clip-live-channel)

## Add Asset Schedule Event to Channel

To add an asset schedule event to a channel, enter the channel id you want to add the asset schedule event to and the asset id and name of the asset. If you set Is Loop to true, it will ignore the duration time code.

![](images/add-asset-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Add Asset Schedule Event](https://developer.nomad-cms.com/docs/add-asset-schedule-event)

## Get Asset Schedule Event

To get an asset schedule event, enter the channel id that the asset schedule event is in and the id of the schedule event.

![](images/get-asset-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Asset Schedule Event](https://developer.nomad-cms.com/docs/get-asset-schedule-event)

## Update Asset Schedule Event

To update an asset schedule event, enter the id of the schedule event, and the id of channel. Then enter the information you want to update.

![](images/update-asset-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Update Asset Schedule Event](https://developer.nomad-cms.com/docs/update-asset-schedule-event)

## Remove Asset Schedule Event from Channel

To remove an asset schedule event from a live channel, enter the id of the channel and the id of the asset schedule event.

![](images/remove-asset-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Remove Asset Schedule Event](https://developer.nomad-cms.com/docs/remove-asset-schedule-event)

## Get Live Inputs

To get all live inputs, click submit under Get Live Inputs.

![](images/get-live-inputs.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live inputs](https://developer.nomad-cms.com/docs/get-live-inputs)

## Get Live Input

To get a specific live input, enter the id of the input you want to get.

![](images/get-live-input.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live Input](https://developer.nomad-cms.com/docs/get-live-input)

## Create Live Input

To create a live input, enter the name you want to assign the input and choose the input type. If the input type is RTMP_PULL, RTP_PUSH, or URL_PULL, you will be asked for a source. If the input type is RTMP_PUSH, you will be asked for a source cidr.

![](images/create-live-input.png)

> 📘 Note
> 
> For more information about the API call used go to [Create Live Input](https://developer.nomad-cms.com/docs/create-live-input)

## Update Live Input

To update a live input, enter the id of the input you want to update. Then enter the name you want to update the input to and choose the input type you want to update to. If the input type is RTMP_PULL, RTP_PUSH, or URL_PULL, you will be asked for a source. If the input type is RTMP_PUSH, you will be asked for a source cidr.

![](images/update-live-input.png)

> 📘 Note
> 
> For more information about the API call used go to [Update Live Input](https://developer.nomad-cms.com/docs/update-live-input)

## Start Channel

To start a live channel, enter the id of the channel you want to start.

![](images/start-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Start Live Channel](https://developer.nomad-cms.com/docs/start-live-channel)

## Stop Channel

To stop a live channel, enter the id of the channel you want to stop.

![](images/stop-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Stop Live Channel](https://developer.nomad-cms.com/docs/stop-live-channel)

## Add Live Input Schedule Event to Channel

To add a live input schedule event to a channel, enter the id of the channel you want to add the input to and the input id and name. Then, optionally, add the additional information needed.

![](images/add-live-input-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Add Input Schedule Event](https://developer.nomad-cms.com/docs/add-input-schedule-event)

## Get Live Input Schedule Event

To get a live input schedule event, enter the id of the channel that the schedule event is located in and the id of the schedule event.

![](images/get-live-input-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Input Schedule Event](https://developer.nomad-cms.com/docs/get-input-schedule-event)

## Update Live Input Schedule Event

To update a live input schedule event, enter the id of the channel that the schedule event is in and the id of the schedule event. Then enter the information you want to update.

![](images/update-live-input-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Update Input Schedule Event](https://developer.nomad-cms.com/docs/update-input-schedule-event)

## Remove Live Input Schedule Event from Live Channel

To remove a live input from a live channel, enter the id of the channel that the schedule event is located in and the id of the schedule event.

![](images/remove-live-input-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Remove Input Schedule Event](https://developer.nomad-cms.com/docs/remove-input-schedule-event)

## Refresh Live Channels

To refresh the live channels, click the button under refresh live channels.

![](images/refresh-live-channels.png)

> 📘 Note
> 
> For more information about the API call used go to [Refresh Live Channels](https://developer.nomad-cms.com/docs/refresh-live-channels)

## Next Event

To get the next event of a live channel, enter the id of the channel you want the next event of.

![](images/next-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Next Event](https://developer.nomad-cms.com/docs/next-event)

## Start Output Tracking

To start tracking the output of a live channel, enter the id of the channel you want to track.

![](images/start-output-tracking.png)

> 📘 Note
> 
> For more information about the API call used go to [Start Output Tracking](https://developer.nomad-cms.com/docs/start-output-tracking)

## Move Schedule Event

To move a schedule event, you need to enter the id of the channel the schedule event is in, the id of the schedule event, and the id of the schedule event you want to place the schedule event you want to move after.

![](images/move-schedule-event.png)

> 📘 Note
> 
> For more information about the API call used go to [Move Schedule Event](https://developer.nomad-cms.com/docs/move-schedule-event)

## Delete Live Channel

To delete a live channel, enter the id of the channel you want to delete and if you want to delete the inputs attached.

![](images/delete-live-channel.png)

> 📘 Note
> 
> For more information about the API call used go to [Delete Live Channel](https://developer.nomad-cms.com/docs/delete-live-channel)

## Delete Live Input

To delete a live input, enter the id of the input you want to delete.

![](images/delete-live-input.png)

> 📘 Note
> 
> For more information about the API call used go to [Delete Live Input](https://developer.nomad-cms.com/docs/delete-live-input)

## Get Live Output Profiles

To get all live output profiles, click submit under Get Live Outputs.

![](images/get-live-outputs.png)

> 📘 Note
>
> For more information about the API call used go to [Get Live Outputs](https://developer.nomad-cms.com/docs/get-live-outputs)

## Get Live Output Profile

To get a specific live output profile, enter the id of the output you want to get.

![](images/get-live-output.png)

> 📘 Note
>
> For more information about the API call used go to [Get Live Output](https://developer.nomad-cms.com/docs/get-live-output)

## Get Live Output Types

To get all live output types, click submit under Get Live Output Types.

![](images/get-live-output-types.png)

> 📘 Note
>
> For more information about the API call used go to [Get Live Output Types](https://developer.nomad-cms.com/docs/get-live-output-types)

## Create Live Output Profile

To create a live output profile, enter the name of the output, choose an output type, and select if the output is active or not. Then, optionally, fill in the rest of the information you want to add.

![](images/create-live-output.png)

> 📘 Note
>
> For more information about the API call used go to [Create Live Output](https://developer.nomad-cms.com/docs/create-live-output)

## Update Live Output Profile

To update a live output profile, enter the id of the output you want to update. Then enter the name of the output, choose an output type, select if the output is active or not, and/or fill in the rest of the information you want to update.

![](images/update-live-output.png)

> 📘 Note
>
> For more information about the API call used go to [Update Live Output](https://developer.nomad-cms.com/docs/update-live-output)

## Delete Live Output Profile

To delete a live output profile, enter the id of the output you want to delete.

![](images/delete-live-output.png)

> 📘 Note
>
> For more information about the API call used go to [Delete Live Output](https://developer.nomad-cms.com/docs/delete-live-output)

## Get Live Output Profile Groups

To get all live output profile groups, click submit under Get Live Output Profile Groups.

![](images/get-live-output-groups.png)

> 📘 Note
>
> For more information about the API call used go to [Get Live Output Profile Groups](https://developer.nomad-cms.com/docs/get-live-output-profile-groups)

## Get Live Output Profile Group

To get a specific live output profile group, enter the id of the output profile group you want to get.

![](images/get-live-output-group.png)

> 📘 Note
>
> For more information about the API call used go to [Get Live Output Profile Group](https://developer.nomad-cms.com/docs/get-live-output-profile-group)

## Create Live Output Profile Group

To create a live output profile group, enter the name of the output profile group. Then select if the output profile group is enabled or not, the manifest type, whether or not to set the output profile group as the default, the live output type, optionally, the archive output profile, and the live output profile(s).

![](images/create-live-output-group.png)

> 📘 Note
>
> For more information about the API call used go to [Create Live Output Profile Group](https://developer.nomad-cms.com/docs/create-live-output-profile-group)

## Update Live Output Profile Group

To update a live output profile group, enter the id of the output profile group you want to update. Then enter the name, select if the output profile group is enabled or not, the manifest type, whether or not to set the output profile group as the default, the live output type, the archive output profile, and/or the live output profile(s) you want to update.

![](images/update-live-output-group.png)

> 📘 Note
>
> For more information about the API call used go to [Update Live Output Profile Group](https://developer.nomad-cms.com/docs/update-live-output-profile-group)

## Delete Live Output Profile Group

To delete a live output profile group, enter the id of the output profile group you want to delete.

![](images/delete-live-output-group.png)

> 📘 Note
>
> For more information about the API call used go to [Delete Live Output Profile Group](https://developer.nomad-cms.com/docs/delete-live-output-profile-group)

## Get Live Operators

To get all live operators, click submit under Get Live Operators.

![](images/get-live-operators.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live Operators](https://developer.nomad-cms.com/docs/get-live-operators)

## Get Live Operator

To get a specific live operator, enter the id of the channel you want to get the live operator of.

![](images/get-live-operator.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Live Operator](https://developer.nomad-cms.com/docs/get-live-operator)

## Start Broadcast

To start a broadcast, enter the id of the channel you want to use for the broadcast. Then enter the preroll and postroll asset id, live input id, related content ids, and tag ids if you want to add them.

![](images/start-broadcast.png)

> 📘 Note
> 
> For more information about the API call used go to [Start Broadcast](https://developer.nomad-cms.com/docs/start-broadcast)

## Cancel Broadcast

To cancel a broadcast, enter the id of the channel associated with the broadcast.

![](images/cancel-broadcast.png)

> 📘 Note
> 
> For more information about the API call used go to [Cancels a Broadcast](https://developer.nomad-cms.com/docs/cancel-broadcast)

## Stop Broadcast

To stop a broadcast, enter the id of the channel associated with the broadcast.

![](images/stop-broadcast.png)

> 📘 Note
> 
> For more information about the API call used go to [Stops a Broadcast](https://developer.nomad-cms.com/docs/stop-broadcast)

## Get Completed Segments

To get all completed segments, enter the id of the channel associated with the broadcast the segments are in.

![](images/get-completed-segments.png)

> 📘 Note
> 
> For more information about the API call used go to [Get Complete Segments](https://developer.nomad-cms.com/docs/get-completed-segments)

## Start Segment

To start a segment, enter the id of the channel associated with the broadcast that you want to start the segment in.

![](images/start-segment.png)

> 📘 Note
> 
> For more information about the API call used go to [Start Segment](https://developer.nomad-cms.com/docs/start-segment)

## Cancel Segment

To cancel a segment, enter the id of the channel associated with the broadcast that you want to cancel the segment of.

![](images/cancel-segment.png)

> 📘 Note
> 
> For more information about the API call used go to [Cancel Segment](https://developer.nomad-cms.com/docs/cancel-segment)

## Complete Segment

To complete a segment, enter the id of the channel. Then enter the ids of the related contents and tags you want to add to the segment.

![](images/complete-segment.png)

> 📘 Note
> 
> For more information about the API call used go to [Complete Segment](https://developer.nomad-cms.com/docs/complete-segment)
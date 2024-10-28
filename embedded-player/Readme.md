# How to use the Embedded Nomad component `wc-player`

1. Put the `wc-player` folder that contains `wc-player.js` along with `style.scss` and other necessary assets into `public` folder.
2. Import the `wc-player.js` in the `index.html` like this:
`<script src="./wc-player/wc-player.js"></script>`
3. Import the `style.scss` in the `index.html` like this:
`<link rel="stylesheet" href="./wc-player/styles.css"></head>`
4. Now you are ready to use the `<wc-player>` web component in App.js like a normal html tag:
`<wc-player></wc-player>`

## Configuration of `wc-player`
1. You have to set the `vep-config` property of `<wc-player>` so that the player can be initialized. 
2. Also you can have a reference to the component like this `ref={this.handleRef}` and then consume the player events in the `App.js`
3. In order to enable sharing you have to set the `supportSharing` property of the `vep-config` to `true`
4. You can control the share icon position by setting `"bottomShareIcon": true`. In this case the icon will be displayed at the bottom. If this value is set to 'false' the share icon will be displayed at the top.
5. Also you can control the sharing url by setting `"shareUrl": "<url>"`. This can be the URL to the Nomad API endpoint that serves up the HTML and metadata needed for social sharing of the asset. Alternatively this can be the URL of the web page the embedded player has been included in.
6. You can also specify which media options you support, setting these `vep-config` properties to `true`: 
`supportSharingFacebook`, `supportSharingTwitter`, `supportSharingLinkedin`, `supportSharingEmail`. If not specified, this defaults to showing all media.
In the example below we support all media except for twitter which is set to `false`.
7. You can disable 'seek' gtm event tracking by setting `"skipGtmSeek": true` in the vepConfig.
8. We can set the quad-view setting `"showTileMode": true` in the config and having specified multiple streams. Currently we display up to 4 videos at the same time
9. In order to use the plain video player without the Pin and Expand controls, you have to set `"showTileMode": false`
10. There is an option to enable debug mode and see some internal logs about the player. Just add the `debug-mode` attribute to the `wc-player`.

| Field | Type | Description |
| --- | --- | --- |
| hideSidebar | boolean | This value determines if the right sidebar panel is shown or hidden |
| showTileMode | boolean (optional) | Setting this value to true will enable the player area to support showing up to 4 simultaneous video streams. This includes showing the additional hover icons for the Pin and Expand controls |
| bitmovinLicenseKey | string (optional) | The Bitmovin Player License Key. This is only needed if the Bitmovin player is configured. |
| bitmovinAnalyticsLicenseKey | string (optional) | The Bitmovin Analytics License Key. This is only needed if you are trying to override the existing Bitmovin Analytics License key that is set in the Bitmovin account. If omitted, the existing Analytics Key defined in the server will be used. |
| googleTagManager | string (optional) | The Google Tag Manager Key. This is an existing GTM account that has previously been setup with the correct mappings to Google Analytics. |
| vepModules | VepModule[] | The Modules define the layout of the player. At least 1 module is required. See below for more details on the VepModule structure. |
| shareUrl | string | This is the URL to the Nomad API endpoint that serves up the HTML and metadata needed for social sharing of the asset. If this value is not set, then it will default to the URL of the web page the embedded player has been included in. |
| bottomShareIcon | boolean (optional) | If sharing is enabled, then this tells the player if it should display the icon in the top or bottom of the player |
| supportSharing | boolean (optional) | This property tells the player if it should show or hide the entire sharing icon in the toolbar |
| supportSharingFacebook | boolean (optional) | The property tells the player if it should display the icon for sharing to Facebook. It defaults to true if not defined explicity |
| supportSharingTwitter | boolean (optional) | The property tells the player if it should display the icon for sharing to Twitter. It defaults to true if not defined explicity |
| supportSharingLinkedin | boolean (optional) | The property tells the player if it should display the icon for sharing to Linkedin. It defaults to true if not defined explicity |
| supportSharingEmail | boolean (optional) | The property tells the player if it should display the icon for sharing via Email. It defaults to true if not defined explicity |
| cookiesForSecureContent | string (optional) | The cookies to set for iOS playback for secure content. |
| liveMode | boolean (optional) | Determines if the player is presented in "live" mode which removes scrubbing capablilities and shows the live indicator |
| debug-mode | boolean (optional) | Setting this to true will enable debug mode and see some internal logs about the player |
| skipGtmSeek | boolean (optional) | Setting this property to true will disable the 'seek' GTM event tracking |
| siteName | string | For GTM events, this is passed into the Analytics record |
| application | string | For GTM events, this is passed into the Analytics record |
| customer | string | For GTM events, this is passed into the Analytics record |
| applicationId | string | For GTM events, this is passed into the Analytics record |


## Connected Mode Properties (These properties are only available when the Nomad JWT token exists for a user login)
| Field | Type | Description |
| --- | --- | --- |
| configBasePath | string | |
| contentDefinitionId | string | |
| logoImageUrl | string | |
| lookupsUrl | string | |
| rootFolderId | string | |
| vepSettings | any | |
| pingIntervalInSeconds | number | |
| expiredSessionRedirectUrl | string | |
| secureCookiesUrl | string | |

## Advanced Properties
| Field | Type | Description |
| --- | --- | --- |
| players | VideoPlayer[] (optional) | |
| webRtcIceServer | string (optional) | |
| webRtcApplication | string | |

## VepModules
| Field | Type | Description |
| --- | --- | --- |
| moduleType | string | The type of the module to configure/display. Currently, the only option is the "streams" module. |
| isEnabled | boolean | Determines if the module is active (shown or used) or not. |
| streams | Stream[] | The list of streams to configure for the "streams" module type. At least 1 stream is required. |

## Stream
| Field | Type | Description |
| --- | --- | --- |
| streamUrl | string | The URL to the video. This value can have an extension of .mp4, .m3u8 or .mpd. It can also contain querystring parameters for the CloudFront access token. |
| isEnabled | boolean | Determines if the stream is active (shown or used) or not. |
| title | string (optional)| The title of the video. This is also sent to the Analytics engine as the Title propery. |
| id | string (optional)| The ID of the video. This is also sent to the Analytics engine as the ID propery. |
| autpPlay | boolean | Determines if the stream should automatically start playing when the video loads. |

## Styling of `wc-player`
1. The share menu panel UI can be changed using these CSS variables, in the public/styles.css:
```
--custom-menu-button-icon--color
--form--submit-button-bg-color
--form--submit-button-txt-color
--form--field-padding
--form--button-padding

```
## Events of `wc-player`
1. In order to play/pause from external button controls you have to set the `force-start` and `force-pause` input properties of the wc-player. 
Then you have to bind the values to an event handler like a button handler. There is a working example in App.js. You can also see in the example below how the two inputs are bound.
2. There is a `playerEventsChanges` event thrown by the wc-player that has a certain type. Here is the current event type list: `sourceloaded`, `play`, `pause` and `ended`.
3. You can refer to some example screenshots in the `screenshots` folder.

```
  componentDidMount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  componentWillUnmount() {
    this.component.addEventListener('playerEventsChanges', this.onPlayerEventChanges);
  }

  onPlayerEventChanges(event) {
    // Handle the wc-player events here
    console.log('React::playerEventsChanges', event);
  }

```
## Analytics
1. There are various bitmovin related analytics sent when interating with the video. 
- customData1: Contains the seek action, when the video is seeked.
- customData2: Contains the value of the video view mode. For example 'fullscreen' or 'standard'.
- customData3: Contains true if the video is muted and false if unmuted.
- customData4: Contains the milestone action displaying the progress of the video
- customData5: Contains the value of assetId if provided or stream.id

## Examples usage of wc-player:

```
<wc-player 
    ref={this.handleRef}
    force-start={this.state.forceStart}
    force-pause={this.state.forcePause}
    force-mute={this.state.forceMute}
    force-unmute={this.state.forceUnmute}
    vep-config='{
        "application": "Embedded",
              "customer": "acme-customer",
              "siteName": "Acme Main Site",
              "hideSidebar": true,
              "supportSharing": true,
	            "shareUrl": "Nomad sharing HTML endpoint URL or website page URL goes here",
              "bottomShareIcon": true,
              "supportSharingFacebook": true,
              "supportSharingTwitter": false,
              "supportSharingLinkedin": true,
              "supportSharingEmail": true,
              "googleTagManager": "GTM-TAGGOESHERE",
              "players": [{ "format": "hls", "player": "videojs" } ],
              "liveMode": false,
              "vepModules": [
                {
                  "moduleType": "streams",
                  "isEnabled": true,
                  "streams": [
                    {
                      "streamUrl": "stream URL goes here",
                      "title": "stream title goes here",
                      "autoplay": true
                    }
                  ]
                }
              ]
    }'></wc-player>
```

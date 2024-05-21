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

| Field | Type | Description |
| --- | --- | --- |
| debug-mode | boolean (optional) | Setting this to true will enable debug mode and see some internal logs about the player |
| showTileMode | boolean (optional) | Setting this value to true will enable the player area to support showing up to 4 simultaneous video streams. This includes showing the additional hover icons for the Pin and Expand controls |
| skipGtmSeek | boolean (optional) | Setting this property to true will disable the 'seek' GTM event tracking |
| shareUrl | string | This is the URL to the Nomad API endpoint that serves up the HTML and metadata needed for social sharing of the asset. If this value is not set, then it will default to the URL of the web page the embedded player has been included in. |
| bottomShareIcon | boolean (optional) | If sharing is enabled, then this tells the player if it should display the icon in the top or bottom of the player |
| supportSharing | boolean (optional) | This property tells the player if it should show or hide the entire sharing icon in the toolbar |
| supportSharingFacebook | boolean (optional) | The property tells the player if it should display the icon for sharing to Facebook. It defaults to true if not defined explicity |
| supportSharingTwitter | boolean (optional) | The property tells the player if it should display the icon for sharing to Twitter. It defaults to true if not defined explicity |
| supportSharingLinkedin | boolean (optional) | The property tells the player if it should display the icon for sharing to Linkedin. It defaults to true if not defined explicity |
| supportSharingEmail | boolean (optional) | The property tells the player if it should display the icon for sharing via Email. It defaults to true if not defined explicity |
| configBasePath | string | |
| googleMapsApiKey | string (optional) | |
| googleTagManager | string (optional) | |
| contentDefinitionId | string | |
| logoImageUrl | string | |
| lookupsUrl | string | |
| vepModules | VepModule[] (optional) | |
| rootFolderId | string | |
| vepSettings | any | |
| siteName | string | |
| players | VideoPlayer[] (optional) | |
| bitmovinLicenseKey | string | |
| bitmovinAnalyticsLicenseKey | string | |
| webRtcIceServer | string (optional) | |
| applicationId | string | |
| pingIntervalInSeconds | number | |
| expiredSessionRedirectUrl | string | |
| application | string | |
| customer | string | |
| hideSidebar | boolean | |
| secureCookiesUrl | string | |
| liveMode | boolean | |
| webRtcApplication | string | |

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

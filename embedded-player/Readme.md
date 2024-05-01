# How to use `wc-player`

1. Put `wc-player` folder that contains `wc-player.js` along with `style.scss` and other necessary assets into `public` folder.
2. Import the `wc-player.js` in the `index.html` like this:
`<script src="./wc-player/wc-player.js"></script>`
3. Import the `style.scss` in the `index.html` like this:
`<link rel="stylesheet" href="./wc-player/styles.css"></head>`
4. Now you are ready to use the `<wc-player>` web component in App.js like a normal html tag:
`<wc-player></wc-player>`

## Configuration of `wc-player`
1. You have to set the `vep-config` property of `<wc-player>` so that the player can be initialized. 
2. Also you can have a reference to the component like this `ref={this.handleRef}` and then consume the player events in the `App.js`
3. In order to play/pause from external button controls you have to set the `force-start` and `force-pause` input properties of the wc-player. 
Then you have to bind the values to a button handler. There is a working example in App.js. You can also see in the example below how the two inputs are bound.
4. In order to enable sharing you have to set the `supportSharing` property of the `vep-config` to `true`
5. You can control the share icon position by setting `"bottomShareIcon": true`. In this case the icon will be displayed at the bottom. If this value is set to 'false' the share icon will be displayed at the top.
6. Also you can control the sharing url by setting `"shareUrl": "<url>"`. This can be the URL to the Nomad API endpoint that serves up the HTML and metadata needed for social sharing of the asset. Alternatively this can be the URL of the web page the embedded player has been included in.
7. You can also specify which media options you support, setting these `vep-config` properties to `true`: 
`supportSharingFacebook`, `supportSharingTwitter`, `supportSharingLinkedin`, `supportSharingEmail`. If not specified, this defaults to showing all media.
In the example below we support all media except for twitter which is set to `false`.
8. You can disable 'seek' gtm event tracking by setting `"skipGtmSeek": true` in the vepConfig.
9. We can set the quad-view setting `"showTileMode": true` in the config and having specified multiple streams. Currently we display up to 4 videos at the same time
10. In order to use the plain video player without the Pin and Expand controls, you have to set `"showTileMode": false`
11. The share menu panel UI can be changed using these CSS variables, in the public/styles.css:
--custom-menu-button-icon--color
--form--submit-button-bg-color
--form--submit-button-txt-color
--form--field-padding
--form--button-padding
12. There is an option to enable debug mode and see some internal logs about the player. Just add the `debug-mode` attribute to the `wc-player`.

There is a `playerEventsChanges` event thrown by the wc-player that has a certain type. Here is the current event type list: `sourceloaded`, `play`, `pause` and `ended`.
You can refer to some example screenshots in the `screenshots` folder.

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

Examples usage of wc-player:

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

## Attributes

| Field | Type | Description |
| --- | --- | --- |
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
| shareUrl | string | |
| bottomShareIcon | boolean (optional) | |
| supportSharing | boolean (optional) | |
import 'dotenv/config';

export default {
  "expo": {
    "name": "MoChat",
    "slug": "MoChat",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
      },
      "softwareKeyboardLayoutMode" : "pan"

    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      api_key: process.env.API_KEY,
      auth_domain: process.env.AUTH_DOMAIN,
      project_id: process.env.PROJECT_ID,
      storage_bucket: process.env.STORAGE_BUCKET,
      messaging_sender_id: process.env.MESSAGING_SENDER_ID,
      app_id: process.env.APP_ID,
      measurement_id: process.env.MEASUREMENT_ID,
      open_ai_api_key: require('dotenv').config().parsed.OPENAI_API_KEY,
      open_ai_url: require('dotenv').config().parsed.OPENAI_URL
    }
  }
}

# <p align="center">Emotional ReactJS</p>
# <p align="center">![Emotional API](logo.png)</p>

--------

# About Emotional ReactJS

Emotional ReactJS is a web application written using ReactJS with TypeScript language to communicate with [**Emotional API**](https://github.com/limitless-brain/emotional-backend).

# Getting Started
### Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/8.x/installation)

Alternative installation is possible without local dependencies relying on [Docker](#docker).

Clone the repository

    git clone git@github.com:limitless-brain/emotional-react.git

Switch to the repo folder

    cd emotional-react

Install all the dependencies using yarn

    yarn install

Copy the example config file and make the required [**configuration**](#configuration-file) changes in the config.ts file

    cp src/core/example.config.ts config.ts

generate development css for tailwind

    yarn postcss

Start the local development server

    yarn start

You can now access the server at http://localhost:3000

**TL;DR command list**

    git clone git@github.com:limitless-brain/emotional-react.git
    cd emotional-react
    yarn install
    cp src/core/example.config.ts config.ts
    yarn postcss
    yarn start

### Firebase
To start you must have firebase account with a new project in order to use collaborate, invite and chat functionalities.
For more information about obtaining web configuration refer to [**official documentation**](https://firebase.google.com/docs/web/setup#config-object).

### Configuration file

```typescript jsx

/**
 * Backend base url
 *
 */
export const BASE_URL = 'your_backend_url'

/**
 * Frontend base url
 *
 */
export const ORIGIN_BASE_URL = 'your_frontend_url'

/**
 * Disable/Enable console logs
 *
 */
export const DEBUG = false;

/**
 * XSRF Token Cookie name
 *
 */
export const XSRF_COOKIE = 'XSRF-TOKEN'

/**
 * Youtube video url
 *
 */
export const YOUTUBE_VIDEO = 'https://www.youtube.com/watch?v='

/*
 * Firebase initialize options
 *
 * Please replace it with your own firebase project setup
 */
export const FIREBASE_INITIALIZE_OPTIONS = {
    apiKey: "your_api_key",
    authDomain: "your.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your.appspot.com",
    messagingSenderId: "your_app_messaging_id",
    appId: "your_app_id",
    measurementId: "your_measurement_id"
}
```

# Functionality Overview
Emotional is music player which utilize youtube embedding functionality to play
the songs, if the song is not embeddable the video will be downloaded, and a link will be provided via Emotional API.

Feel free to explore the project.

## General Functionality
* Authenticate users via Passport (login/signup pages + logout button on user panel)
* Artists
* Albums
* Featured
* Search
* User Interactions
* Playlists

## The general page breakdown looks like this:

* Home page (URL: / )
  * The Wheel Of The Primary Emotions
  * List of preset playlists
* Sign in/Sign up pages (URL: /login, /signup )
  * Use Passport (receive the cookie inside login response)
* Artists page (URL: /artists )
* Albums page (URL: /albums )
* Featured page (Url: /featured)
* ~~Search page (Url: /search?query)~~ removed
* Chat page (url: /chat/room-id)
* User page (url: /users)

# ![Emotional](src/core/providers/emotion/assets/joy_sadness.png)

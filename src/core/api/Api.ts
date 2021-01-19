import axios from "axios"
import Auth from "./Auth";
import Youtube from "./Youtube";
import {BASE_URL} from "../config";
import AI from "./AI";
import Song from "./Song";
import Album from "./Album";
import Artist from "./Artist";
import Playlist from "./Playlist";
import Spotify from "./Spotify";

// axios base url
axios.defaults.baseURL = `${BASE_URL}api/v1`

// auth cookie setup
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'Authorization'

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
axios.defaults.withCredentials = true

/**
 * APIs object which contains all APIs objects
 */
const Api = {
    /**
     * @file Auth contains authentication apis
     */
    auth: {...Auth},

    /**
     * @file Youtube contains youtube apis
     */
    youtube: {...Youtube},

    /**
     * @file AI contains ai apis
     */
    ai: {...AI},

    /**
     * @file Album contains album apis
     */

    album: {...Album},

    /**
     * @file Artist contains artist apis
     */

    artist: {...Artist},

    /**
     * @file Song contains song apis
     */
    song: {...Song},

    /**
     * @file Spotify contains spotify apis
     */
    spotify: {...Spotify},

    /**
     * @file Playlist contains playlist apis
     */
    playlists: {...Playlist},

}

export default Api
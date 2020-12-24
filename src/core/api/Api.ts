import axios from "axios"
import Auth from "./Auth";
import Youtube from "./Youtube";
import {BASE_URL} from "../config";

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
    youtube: {...Youtube}
}

export default Api
import axios from "axios"
import Auth from "./Auth";
import Youtube from "./Youtube";

// axios base url
axios.defaults.baseURL = "http://192.168.0.101:8000/api/v1"

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'Authorization'

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
axios.defaults.withCredentials = true

/**
 * APIs object which contains all APIs objects
 */
const Api = {
    auth: {...Auth},
    youtube: {...Youtube}
}

export default Api
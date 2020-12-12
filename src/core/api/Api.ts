import axios from "axios"
import Auth from "./Auth";

// axios base url
axios.defaults.baseURL = "http://localhost:8000/api/v1"

axios.defaults.xsrfCookieName = 'XSRF-TOKEN'
axios.defaults.xsrfHeaderName = 'Authorization'

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
axios.defaults.withCredentials = true

/**
 * APIs object which contains all APIs objects
 */
const Api = {
    auth: {...Auth}
}

export default Api
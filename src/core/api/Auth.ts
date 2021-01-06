import axios from "axios";

const Auth = {

    /**
     * the method that login the user to the API
     *
     * @param credentials
     * @return {Promise<AxiosResponse<any>>}
     */
    login: async (credentials: object) => {
        return await axios.post('/login', credentials)
    },

    /**
     * the method that signup a new user to the API
     *
     * @param credentials
     * @return {Promise<AxiosResponse<any>>}
     */
    signup: async (credentials: object) => {
        return await axios.post('/signup', credentials)
    },

    /**
     * the method that get user profile from API
     *
     * @param id
     * @return {Promise<AxiosResponse<any>>}
     */
    profile: async (id?: string) => {
        return await axios.get('/user/show', {
            params: id,
        })
    },

    /**
     * the method that logout the user from the API
     * @return {Promise<AxiosResponse<any>>}
     */
    logout: async () => {
        return await axios.get('/logout')
    }
}
export default Auth
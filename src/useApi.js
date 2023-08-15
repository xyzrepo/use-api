import { create } from 'axios';
import { ref, reactive, watch } from 'vue';


/**
 * Create an API instance
 * @param {string} baseURL - The base URL of the API
 * @returns {object} The API instance
 */
function useApi(baseURL) {

    // Create a token ref
    const token = ref(localStorage.getItem('jwt'));
    
    // Create a cache ref
    const cache = ref({});

    // Create an axios instance
    const instance = create({ baseURL });

    if (token.value) {
        // Set the Authorization header for all requests
        instance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    }


    /**
     * Fetch a URI
     * @param {string} uri - The URI to fetch
     * @returns {object} The response data
     * @throws {Error} If the request fails
     */
    const fetcher = async (uri) => {
        if (cache.value[uri]) {
            return cache.value[uri];
        }
        try {
          const response = await instance.get(uri);
          cache.value[uri] = response.data;
          return response.data;
        } catch (error) {
            // strip the slash from the uri in the error message
            throw new Error(`Error fetching ${uri.slice(1)}: ${error}`);
        }
    };

    // Add a request interceptor
    instance.interceptors.response.use(
        
        // Make the response data reactive
        (response) => reactive(response),

        // If the error is a 401, clear the token and reload the page
        (error) => {
            if (error.response && error.response.status === 401) {
                clearToken();
                window.location.reload();
            } else {
                throw error.message;
            }
        }
    );


    /**
     * Set the token in memory and localStorage
     * @param {string} newToken - The new token
     * @returns {void}
     */
    function setToken(newToken) {
        token.value = newToken;
        localStorage.setItem('jwt', newToken);
        instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }


    /**
     * Clear the token from memory and localStorage
     * @returns {void}
     */
    function clearToken() {
        token.value = null;
        localStorage.removeItem('jwt');
        delete instance.defaults.headers.common['Authorization'];
    }

    const auth = {

        /**
         * Log the user in
         * @param {object} credentials - The user credentials
         * @param {string} credentials.identifier - The username or email address
         * @param {string} credentials.password - The password
         * @returns {object} The user object
         */
        async login(credentials) {
            const { data } = await instance.post('/auth/local', credentials);
            setToken(data.jwt);
            return data.user;
        },


        /**
         * Log the user out
         * @returns {void}
         */
        logout: clearToken,


        /**
         * Get the current user
         * @returns {object} The user object
         */
        async getUser() {
            const { data } = await instance.get('/users/me');
            return data;
        },


        /**
         * Register a new user
         * @param {object} data - The user data
         * @param {string} data.username - The username
         * @param {string} data.email - The email address
         * @param {string} data.password - The password
         * @returns {object} The user object
         */
        async register(data) {
            const { data: user } = await instance.post('/auth/local/register', data);
            setToken(user.jwt);
            return user;
        },


        /**
         * Send a password reset email
         * @param {string} email - The email address to send the reset email to
         * @returns {object} The user object
         */
        async forgotPassword(email) {
            const { data } = await instance.post('/auth/forgot-password', { email });
            return data;
        },


        /**
         * Reset password
         * @param {string} token - The token sent to the user's email address
         * @param {string} password - The new password
         * @returns {object} The user object
         */
        async resetPassword(token, password) {
            const { data } = await instance.post('/auth/reset-password', { token, password });
            setToken(data.jwt);
            return data.user;
        },


        /**
         * Verify email address
         * @param {string} token - The token sent to the user's email address
         * @returns {object} The user object
         */
        async verifyEmail(token) {
            const { data } = await instance.post('/auth/email-confirmation', { confirmation: token });
            setToken(data.jwt);
            return data.user;
        },
    };

    const createResource = (contentType) => {
        const data = ref(null);
        const error = ref(null);
        const loading = ref(true);
        const ready = ref(false);

        const fetchAndSetData = async () => {
            try {
                loading.value = true;
                data.value = await fetcher(`/${contentType}`);
                loading.value = false;

            } catch (e) {
                error.value = e.message;
                loading.value = false;

            }
        };

        watch(() => contentType, fetchAndSetData, { immediate: true });

        const resourceActions = reactive({
            data: data,
            error: error,
            loading: loading,
            refresh: fetchAndSetData,
            get: (id) => instance.get(`/${contentType}/${id || ''}`),
            post: (data) => instance.post(`/${contentType}`, data),
            put: (id, data) => instance.put(`/${contentType}/${id}`, data),
            delete: (id) => instance.delete(`/${contentType}/${id}`)
        });
    
        fetchAndSetData();
        
        return resourceActions;
    }
    

    return reactive({ auth, createResource });
}
export default useApi
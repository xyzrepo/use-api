import axios from 'axios';
import { ref, reactive, watch } from 'vue';

function useApi(baseURL) {
    const token = ref(localStorage.getItem('jwt'));
    const cache = ref({});

    const axiosInstance = axios.create({ 
        baseURL,
    });

    if (token.value) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    }

    const fetcher = async (uri) => {
        if (cache.value[uri]) {
            return cache.value[uri];
        }
        try {
          const response = await axiosInstance.get(uri);
          cache.value[uri] = response.data;
          return response.data;
        } catch (error) {
            // strip the slash from the uri in the error message
            throw new Error(`Error fetching ${uri.slice(1)}: ${error}`);
        }
    };

    axiosInstance.interceptors.response.use(
        (response) => reactive(response),
        (error) => {
            if (error.response && error.response.status === 401) {
                clearToken();
                window.location.reload();
            } else {
                // console.log(error);
                throw error.message;
            }
        }
    );

    function setToken(newToken) {
        token.value = newToken;
        localStorage.setItem('jwt', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    }

    function clearToken() {
        token.value = null;
        localStorage.removeItem('jwt');
        delete axiosInstance.defaults.headers.common['Authorization'];
    }

    const auth = {
        async login(credentials) {
            const { data } = await axiosInstance.post('/auth/local', credentials);
            setToken(data.jwt);
            return data.user;
        },

        logout: clearToken,

        async getUser() {
            const { data } = await axiosInstance.get('/users/me');
            return data;
        },

        async register(data) {
            const { data: user } = await axiosInstance.post('/auth/local/register', data);
            setToken(user.jwt);
            return user;
        },

        async forgotPassword(email) {
            const { data } = await axiosInstance.post('/auth/forgot-password', { email });
            return data;
        },

        async resetPassword(token, password) {
            const { data } = await axiosInstance.post('/auth/reset-password', { token, password });
            setToken(data.jwt);
            return data.user;
        },

        async verifyEmail(token) {
            const { data } = await axiosInstance.post('/auth/email-confirmation', { confirmation: token });
            setToken(data.jwt);
            return data.user;
        },
    };

    const createResource = (contentType) => {
        const data = ref(null);
        const error = ref(null);
        const loading = ref(true);

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
            get: (id) => axiosInstance.get(`/${contentType}/${id || ''}`),
            post: (data) => axiosInstance.post(`/${contentType}`, data),
            put: (id, data) => axiosInstance.put(`/${contentType}/${id}`, data),
            delete: (id) => axiosInstance.delete(`/${contentType}/${id}`)
        });
    
        return resourceActions;
    }
    

    return reactive({ auth, createResource });
}
export default useApi
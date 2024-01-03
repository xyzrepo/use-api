import { StrapiOptions, StrapiBaseRequestParams, StrapiResponse } from './types';
import Strapi from "strapi-sdk-js";
export default (options: StrapiOptions): Strapi => {
    const strapi = new Strapi(options);

    const register = async (userData: { username: string, email: string, password: string }): Promise<{ user: any, jwt: string }> => {
        try {
            const response = await strapi.register(userData);
            return response.data;
        } catch (error) {
            console.error("Error occurred while registering a user:", error);
            throw error;
        }
    };

    const login = async (credentials: { identifier: string, password: string }): Promise<{ user: any, jwt: string }> => {
        try {
            const response = await strapi.login(credentials);
            return response.data;
        } catch (error) {
            console.error("Error occurred while logging in:", error);
            throw error;
        }
    };

    const changePassword = async (currentPassword: string, password: string, passwordConfirmation: string): Promise<{ user: any, jwt: string }> => {
        try {
            const response = await strapi.changePassword({ currentPassword, password, passwordConfirmation });
            const { user, jwt } = response.data;
            return { user, jwt };
        } catch (error) {
            console.error("Error occurred while changing password:", error);
            throw error;
        }
    };

    const find = async (model: string, params?: StrapiBaseRequestParams): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.find(model, params);
            return response.data;
        } catch (error) {
            console.error("Error occurred while finding records:", error);
            throw error;
        }
    };

    const findOne = async (contentType: string, id: string | number, params?: StrapiBaseRequestParams): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.findOne(contentType, id, params);
            return response.data;
        } catch (error) {
            console.error("Error occurred while finding a single record:", error);
            throw error;
        }
    };

    const create = async (model: string, data: any): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.create(model, data);
            return response.data;
        } catch (error) {
            console.error("Error occurred while creating a record:", error);
            throw error;
        }
    };

    const update = async (model: string, id: string, data: any): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.update(model, id, data);
            return response.data;
        } catch (error) {
            console.error("Error occurred while updating a record:", error);
            throw error;
        }
    };

    const remove = async (model: string, id: string): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.delete(model, id);
            return response.data;
        } catch (error) {
            console.error("Error occurred while deleting a record:", error);
            throw error;
        }
    };

    const forgotPassword = async (email: string): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.forgotPassword({ email });
            return response.data;
        } catch (error) {
            console.error("Error occurred while sending forgot password email:", error);
            throw error;
        }
    };

    const sendEmailConfirmation = async (email: string): Promise<StrapiResponse<T>> => {
        try {
            const response = await strapi.sendEmailConfirmation({ email });
            return response.data;
        } catch (error) {
            console.error("Error occurred while sending email confirmation:", error);
            throw error;
        }
    };

    const resetPassword = async (code: string, password: string, passwordConfirmation: string): Promise<{ user: any, jwt: string }> => {
        try {
            const response = await strapi.resetPassword({ code, password, passwordConfirmation });
            const { user, jwt } = response.data;
            return { user, jwt };
        } catch (error) {
            console.error("Error occurred while resetting password:", error);
            throw error;
        }
    };

    const authenticateProvider = async (provider: string): Promise<{ user: any, jwt: string }> => {
        try {
            const { user, jwt } = await strapi.authenticateProvider(provider);
            return { user, jwt };
        } catch (error) {
            console.error("Error occurred while authenticating provider:", error);
            throw error;
        }
    };

    const redirectToAuthenticationProvider = (provider: string): void => {
        window.location = strapi.getAuthenticationProvider(provider);
    };

    const setUser = (user: any): void => {
        strapi.setUser(user);
    };

    const fetchUser = async (): Promise<any> => {
        try {
            const response = await strapi.fetchUser();
            return response.data;
        } catch (error) {
            console.error("Error occurred while fetching user:", error);
            throw error;
        }
    };

    return {
        register,
        login,
        find,
        findOne,
        create,
        update,
        remove,
        forgotPassword,
        resetPassword,
        changePassword,
        sendEmailConfirmation,
        authenticateProvider,
        redirectToAuthenticationProvider,
        setUser,
        fetchUser,
        strapi
    };
};;

import http from '../http';
import { ApiClient } from './client';
import backend from './backend/provider/strapi';
import sendEmail from './email/provider'

export { ApiClient, backend, sendEmail };

const api = new ApiClient(http);

export default {
    api,
    backend,
    sendEmail
}

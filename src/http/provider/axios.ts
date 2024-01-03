/**
 * Sends an HTTP request using Axios.
 * @param config The Axios request configuration.
 * @returns A Promise that resolves to the response data.
 * @usage
 * import axios from 'axios';
 * import sendRequest from 'src/http/provider/axios';
 * const config = {
 *   method: 'post',
 *   url: 'https://example.com/api',
 *   headers: {
 *    'Content-Type': 'application/json',
 *   },
 *   data: {
 *     foo: 'bar',
 *   },
 * };
 * sendRequest(config).then((data) => {
 *    console.log(data);
 * });
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default (config: AxiosRequestConfig): Promise<any> => axios({ ...config }).then((response: AxiosResponse) => response.data);


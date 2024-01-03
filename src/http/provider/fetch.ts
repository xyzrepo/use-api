/**
 * Sends an HTTP request using the Fetch API.
 * @param config The Fetch request configuration.
 * @returns A Promise that resolves to the response data.
 * @usage
 * import sendRequest from 'src/http/provider/fetch';
 * const config = {
 *   method: 'POST',
 *   headers: {
 *    'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({
 *     foo: 'bar',
 *   }),
 * };
 * sendRequest('https://example.com/api', config).then((data) => {
 *    console.log(data);
 * });
 */
export default (url: string, config: RequestInit): Promise<any> =>
    fetch(url, config).then((response) => response.json());

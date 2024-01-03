// Import the axios library from the axios file in the same directory
import DefaultProvider from './axios';

// Export all the functions from the http providers
export * from './axios';
export * from './fetch';

// Export the default http provider
export default DefaultProvider
/**
 * This file serves as the entry point for the Strapi backend provider.
 * It imports the necessary modules and exports the backend object.
 */

// Import the `config` object from the `config` file in the same directory
import { config } from './config';

// Import the `sdk` function from the `sdk` file in the same directory
import SDK from './sdk'

/**
 * The `backend` variable is created by calling the `sdk` function with the `config` object as its argument.
 * It represents the Strapi backend provider and provides various functions for interacting with the backend.
 */
const backend = SDK(config)

// Export all the functions from the `sdk` file in the same directory
export * from './sdk'

/**
 * The `backend` variable is exported as the default export of this module.
 * This allows other modules to import the Strapi backend provider using a default import.
 */
export default backend
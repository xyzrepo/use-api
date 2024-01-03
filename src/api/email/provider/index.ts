// Import the `send` function from the `nodemailer` file in the same directory
import { send } from './nodemailer'

// Export all the functions from the `nodemailer` file in the same directory
export * from './nodemailer'
// export * from './custom'
// export * from './plunk'
// export * from './postmark'
// export * from './resend'

// Export the `send` function as the default export
export default send
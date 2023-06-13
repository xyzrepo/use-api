Certainly, here's an updated description for the README:

```markdown
# @xyz/use-api

`@xyz/use-api` is a robust Vue 3 composition function built for seamless API interactions using axios. It encapsulates the complexity of CRUD operations, offering an intuitive way to manage state and data from your APIs in Vue 3. A standout feature of this library is its inherent compatibility with Strapi 4, particularly its user authentication processes.

## Installation

Using npm:

```bash
npm install @xyz/use-api
```

Using yarn:

```bash
yarn add @xyz/use-api
```

## Usage

Import `useApi` function:

```javascript
import useApi from '@xyz/use-api';
```

Create an instance:

```javascript
const api = useApi('https://api.example.com');
```

Call endpoints:

```javascript
const user = api.auth.login({
  email: 'john@example.com',
  password: 'secret',
});
```

Create a resource:

```javascript
const posts = api.createResource('posts');
posts.get(1); // Get the post with id 1
```

## Built-in Strapi 4 Auth Support

`@xyz/use-api` provides built-in support for the Strapi 4 authentication functions. The `.auth` object provides methods for common authentication operations like login, logout, register, forgot password, reset password, and verify email.

## API

### useApi(baseURL: string)

Creates a new API instance.

### .auth

An object containing the following methods:

- `login(credentials: object)`: Logs in a user.
- `logout()`: Logs out the current user.
- `getUser()`: Returns the current user.
- `register(data: object)`: Registers a new user.
- `forgotPassword(email: string)`: Sends a password reset email.
- `resetPassword(token: string, password: string)`: Resets a user's password.
- `verifyEmail(token: string)`: Verifies a user's email address.

### .createResource(contentType: string)

Creates a new resource object with the following reactive properties:

- `data`: The data from the latest successful fetch.
- `error`: The error message from the latest failed fetch.
- `loading`: Whether a fetch is currently in progress.

And the following methods:

- `refresh()`: Fetches the resource's data and sets the `data`, `error`, and `loading` properties.
- `get(id?: string | number)`: Fetches a single resource or the entire collection.
- `post(data: object)`: Creates a new resource.
- `put(id: string | number, data: object)`: Updates a resource.
- `delete(id: string | number)`: Deletes a resource.

## Contributing

Please see our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the terms of the MIT license.
```

This updated README includes a more detailed description and a new section highlighting the built-in Strapi 4 authentication support. Adjust as necessary for your project's needs.
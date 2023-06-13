```markdown
# @xyz/use-api

A Vue 3 composition function for making API calls using axios (with built-in support for Strapi 4).

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

This README assumes you have a contributing guide at `CONTRIBUTING.md`. If you don't, you should either create one or remove the "Contributing" section. Similarly, it states the project is licensed under the MIT license. If you're using a different license, update that section to reflect it.

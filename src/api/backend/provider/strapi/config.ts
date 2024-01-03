export const config = {
    url: "https://api.xyz.dev",
    prefix: "/api",
    store: {
        key: "strapi_jwt",
        useLocalStorage: true,
    },
    axiosOptions: {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            // "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Max-Age": "3600",
            // "Access-Control-Expose-Headers": "Content-Length, Content-Range"

        },
    },
}

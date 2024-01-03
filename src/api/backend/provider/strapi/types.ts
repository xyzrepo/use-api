
interface StrapiConfig {
    url?: string
    store?: StoreConfig
    axiosOptions?: AxiosRequestConfig
}

interface StoreConfig {
    key: string
    useLocalStorage?: boolean
    cookieOptions?: CookieAttributes
}

interface StrapiBaseRequestParams {
    fields?: Array<string>
    populate?: string | Array<string> | Record<string, unknown>
}
interface StrapiRequestParams extends StrapiBaseRequestParams {
    sort?: string | Array<string>
    pagination?: PaginationByOffset | PaginationByPage
    filters?: Record<string, unknown>
    publicationState?: "live" | "preview"
    locale?: StrapiLocale
}
interface PaginationByPage {
    page: number
    pageSize: number
    withCount?: boolean
}
interface PaginationByOffset {
    start: number
    limit: number
    withCount?: boolean
}
type StrapiLocale = | "af" | "af-NA" | "af-ZA" | "agq" ...
interface StrapiResponse<T> {
    data: T
    meta: Record<string, unknown>
}
interface StrapiError {
    data: null
    error: {
        status: number
        name: string
        message: string
        details: Record<string, unknown>
    }
}
type StrapiAuthProvider =
    | "github"
    | "facebook"
    | "google"
    | "cognito"
    | "twitter"
    | "discord"
    | "twitch"
    | "instagram"
    | "vk"
    | "linkedin"
    | "reddit"
    | "auth0"
interface StrapiAuthenticationResponse {
    user: Record<string, unknown>
    jwt: string
}
interface StrapiAuthenticationData {
    identifier: string
    password: string
}
interface StrapiRegistrationData {
    username: string
    email: string
    password: string
}
interface StrapiChangePasswordData {
    currentPassword: string
    password: string
    passwordConfirmation: string
}
interface StrapiForgotPasswordData {
    email: string
}
interface StrapiResetPasswordData {
    code: string
    password: string
    passwordConfirmation: string
}
interface StrapiEmailConfirmationData {
    email: string
}


export interface IUserSession {
    user: {
        name: string
        email: string
        image?: string
    }
    expires: string
}
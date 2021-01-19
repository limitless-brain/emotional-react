export interface IFBUser {
    email: string,
    emailVerified: boolean,
    name: string,
    photo: string | null,
    uid: string,
    chat_channels: string[]
}
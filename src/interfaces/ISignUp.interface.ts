export default interface ISignUp {
    name: string,
    surname: string,
    email: string,
    phone?: string,
    birthAge: string,
    address?: string,
    summary?: string,
    password: string,
    admin: boolean
};
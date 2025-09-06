export class InvalidCredentialsError extends Error {
    constructor() {
        super("E-mail inválido ou senha incorreta");
    }
}
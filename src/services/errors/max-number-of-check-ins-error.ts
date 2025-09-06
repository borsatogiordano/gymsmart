export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super("Número máximo de check-ins atingido para o dia.");
    }
}
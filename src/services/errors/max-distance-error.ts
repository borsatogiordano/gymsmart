export class MaxDistanceError extends Error {
    constructor() {
        super("Você está muito longe do local de check-in.");
    }
}
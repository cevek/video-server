export function assert(condition: any, error: string) {
    if (!condition) {
        throw new Error(error);
    }
}
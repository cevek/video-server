declare module 'co' {
    export default function co<T>(fn:any): Promise<T>;
}

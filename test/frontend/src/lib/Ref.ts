export class Ref<T extends Node> {
    element: T;

    onRender = (element: Node) => {
        this.element = element as T;
    }
}
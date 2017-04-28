export function contains(container: Node, element: Node | null): boolean {
    let node = element;
    while (node) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

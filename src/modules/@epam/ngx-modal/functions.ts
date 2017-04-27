export function contains(container: Node, element: Node): boolean {
    let node = element;
    while (node != null) {
        if (node === container) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

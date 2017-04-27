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

export function removeClass(el: Element, className: string) {
    var newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(el, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        el.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

function hasClass(el: Element, cssClass: string): boolean {
    return ((' ' + el.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + cssClass + ' ') > -1);
}

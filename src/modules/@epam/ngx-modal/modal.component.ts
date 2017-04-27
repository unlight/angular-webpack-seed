import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, Renderer, ViewChild } from '@angular/core';
import { contains } from './functions';
import { DOCUMENT } from '@angular/platform-browser';

// TODO: Move to class
const modalIsOpenClass = '-es-popup-opened';

const focusableSelector = 'a[href], area[href], input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]';

@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `
		<div class="es-popup" [ngClass]="{'-es-open': isOpen, '-es-notification': isNotification}" >
            <section class="es-popup-body" #body>
                <ng-content></ng-content>
            </section>
        </div>
  `
})
export class ModalComponent implements OnDestroy {

    @Input() public title: string;
    @Input() public isOpen: boolean;
    @Input() public isNotification: boolean;
    public content: string;
    @Output() public onClose: EventEmitter<any> = new EventEmitter();
    @Output() public onOpen: EventEmitter<any> = new EventEmitter();
    private removeOnKeyDown: Function;
    private removeOnClick: Function;
    @ViewChild('body') private body: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer,
        private el: ElementRef,
    ) {
    }

    close(event?: any): void {
        this.cleanUp();
        this.onClose.emit(event);
        this.isOpen = false;
    }

    open(event?: any): void {
        this.onOpen.emit(event);
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    // Let tab navigation cycle in the popup body.
    private onTabKeyDown = (e: KeyboardEvent) => {
        if (!this.isOpen) {
            return;
        }
        let focusChanged = false;
        const focusable = <HTMLElement[]>[].slice.call(this.body.nativeElement.querySelectorAll(focusableSelector));
        const isFocusInFirst = (): boolean => {
            return !!(focusable && focusable.length && (e.target || e.srcElement) === focusable[0]);
        };
        const isFocusInLast = (): boolean => {
            return !!(focusable && focusable.length && (e.target || e.srcElement) === focusable[focusable.length - 1]);
        };
        const isFocusOutside = (): boolean => {
            return !(contains(this.body.nativeElement, <Node>(e.target || e.srcElement)));
        };
        const focusFirst = () => {
            if (focusable && focusable.length > 0) {
                focusable[0].focus(); // todo: use renderer2 for focus
                return true;
            }
            return false;
        };
        const focusLast = (): boolean => {
            if (focusable && focusable.length) {
                focusable[focusable.length - 1].focus();
                return true;
            }
            return false;
        };
        if (e.shiftKey) {
            if (isFocusOutside() || isFocusInFirst()) {
                focusChanged = focusLast();
            }
        } else {
            if (isFocusOutside() || isFocusInLast()) {
                focusChanged = focusFirst();
            }
        }
        if (focusChanged) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    private doOnOpen() {
        this.preventBackgroundScrolling();
        this.removeOnClick = this.renderer.listen(this.el.nativeElement, 'click', (e: MouseEvent) => {
            if (this.isOpen) {
                const //overlay = this.el.nativeElement.querySelector('.es-popup'),
                    close = this.body.nativeElement.querySelector('.es-close');
                //if overlay or close button clicked
                if (/*(overlay && e.target === overlay) ||*/ contains(close, <Element>e.target)) {
                    this.close(e);
                }
            }
        });
        this.removeOnKeyDown = this.renderer.listenGlobal('document', 'keydown', (e: KeyboardEvent) => {
            if (e.key) {
                switch (e.key) {
                    case 'Esc':
                    case 'Escape':
                        this.close(e);
                        break;
                    case 'Tab':
                        this.onTabKeyDown(e);
                        break;
                }
            }
        });
    }

    private cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
            this.removeOnKeyDown();
            this.removeOnClick();
        }
    }

    private enableBackgroundScrolling() {
        // remove class '-es-popup-opened' => enables scrollbars on body again
        const body = this.document.querySelector('body');
        if (body) {
            if (body.classList) {
                body.classList.remove(modalIsOpenClass);
            } else {
                body.className = body.className.replace(new RegExp('(^|\\b)' + modalIsOpenClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }

    private preventBackgroundScrolling() {
        // add class '-es-popup-opened' => disables scrollbars on body
        const body = this.document.querySelector('body');
        if (body) {
            if (body.classList) {
                body.classList.add(modalIsOpenClass)
            } else {
                body.className += ' ' + modalIsOpenClass;
            }
        }

    }
}

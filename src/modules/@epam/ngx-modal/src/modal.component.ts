import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, Renderer, ViewChild, Renderer2 } from '@angular/core';
import { contains } from './functions';
import { focusableSelector, OPTIONS, ModalOptions } from './constants';

// TODO: Fix
// require('ngx-modal.css');

@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `<div [class]="options.popupClass" [ngClass]="ngClassValues">
            <section [class]="options.popupBodyClass" #body>
                <ng-content></ng-content>
            </section>
        </div>`
})
export class ModalComponent implements OnDestroy {

    @Input() public isOpen: boolean;
    @Input() public isNotification: boolean;
    @Output() public onClose: EventEmitter<any> = new EventEmitter();
    @Output() public onOpen: EventEmitter<any> = new EventEmitter();
    private removeOnKeyDown: Function;
    private removeOnClick: Function;
    @ViewChild('body') private body: ElementRef;

    constructor(
        @Inject(OPTIONS) private readonly options: ModalOptions,
        private renderer: Renderer, // TODO: Replace by Renderer2
        private renderer2: Renderer2, // TODO: Replace by Renderer2
        private ref: ElementRef,
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

    private get ngClassValues() {
        return {
            [this.options.isOpenClass]: this.isOpen,
            [this.options.isNotificationClass]: this.isNotification,
        };
    }

    // Let tab navigation cycle in the popup body.
    private onTabKeyDown = (e: KeyboardEvent) => {
        if (!this.isOpen) {
            return;
        }
        let focusChanged = false;
        const focusable = Array.from<HTMLElement>(this.body.nativeElement.querySelectorAll(focusableSelector));
        const isFocusInFirst = (): boolean => {
            const [element] = focusable;
            return element && (e.target || e.srcElement) === element;
        };
        const isFocusInLast = (): boolean => {
            const [element] = focusable.slice(-1);
            return element && (e.target || e.srcElement) === element;
        };
        const isFocusOutside = (): boolean => {
            return !(contains(this.body.nativeElement, <Node>(e.target || e.srcElement)));
        };
        const focusFirst = () => {
            if (focusable && focusable.length > 0) {
                const [element] = focusable;
                this.renderer.invokeElementMethod(element, 'focus'); // todo: use renderer2 for focus
                return true;
            }
            return false;
        };
        const focusLast = (): boolean => {
            if (focusable && focusable.length > 0) {
                const [element] = focusable.slice(-1);
                this.renderer.invokeElementMethod(element, 'focus');
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
                // focusChanged = true;
            }
        }
        if (focusChanged) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    private doOnOpen() {
        setTimeout(() => {
            this.renderer.invokeElementMethod(this.body.nativeElement, 'focus');
        });
        this.preventBackgroundScrolling();
        this.removeOnClick = this.renderer.listen(this.ref.nativeElement, 'click', (e: MouseEvent) => {
            if (this.isOpen) {
                //overlay = this.el.nativeElement.querySelector('.es-popup'),
                const close = this.body.nativeElement.querySelector('.es-close');
                //if overlay or close button clicked
                /*(overlay && e.target === overlay) ||*/
                if (contains(close, <Element>e.target)) {
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
        this.backgroundScrolling(true);
    }

    private preventBackgroundScrolling() {
        this.backgroundScrolling(false);
    }

    private backgroundScrolling(value: boolean) {
        const body = document.querySelector('body');
        if (body) {
            const method = (value) ? 'removeClass' : 'addClass';
            this.renderer2[method](body, this.options.popupOpenedClass);
        }
    }
}

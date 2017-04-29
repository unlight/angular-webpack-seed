import { Input, Output, Component, ElementRef, EventEmitter, Inject, OnDestroy, ViewChild, Renderer2, ContentChild, OnInit, HostListener } from '@angular/core';
import { contains } from './functions';
import { focusableSelector, OPTIONS, ModalOptions } from './constants';
import { ModalHeaderComponent } from './modal-header.component';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
/**
 * 1. To make div focusable tabindex was added.
 */
@Component({
    exportAs: 'modal',
    selector: 'modal',
    template: `<div [class]="options.popupClass" [ngClass]="ngClassValues">
            <section [class]="options.bodyClass" tabindex="0" #body>
                <ng-content></ng-content>
            </section>
        </div>`
})
export class ModalComponent implements OnDestroy, OnInit {

    @Input() public isOpen: boolean;
    @Input() public isNotification: boolean;
    @Output() public onClose: EventEmitter<any> = new EventEmitter();
    @Output() public onOpen: EventEmitter<any> = new EventEmitter();
    @ViewChild('body') private body: ElementRef;
    @ContentChild(ModalHeaderComponent) private header: ModalHeaderComponent;
    private closeSubscription: Subscription;

    constructor(
        @Inject(OPTIONS) private readonly options: ModalOptions,
        private renderer: Renderer2,
        private router: Router,
    ) {
    }

    ngOnInit() {
        if (this.header) {
            this.closeSubscription = this.header.closeEventEmitter.subscribe((e: Event) => {
                this.close(e);
            });
        }
    }

    close(event?: any) {
        this.cleanUp();
        this.onClose.emit(event);
        this.isOpen = false;
        if (this.options.routeOnClose) {
            const outlets = this.options.routeOutlets.reduce((acc, outlet) => (acc[outlet] = null, acc), {});
            this.router.navigate([{ outlets }]);
        }
    }

    open(event?: any) {
        this.onOpen.emit(event);
        this.isOpen = true;
        this.doOnOpen();
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    @HostListener('document:keydown', ['$event'])
    keyDownHandler(e: KeyboardEvent) {
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

    private get ngClassValues() {
        return {
            [this.options.isOpenClass]: this.isOpen,
            [this.options.isNotificationClass]: this.isNotification,
        };
    }

    // Let tab navigation cycle in the popup body.
    private onTabKeyDown(e: KeyboardEvent) {
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
            if (focusable.length > 0) {
                const [element] = focusable;
                element && element.focus && element.focus();
                return true;
            }
            return false;
        };
        const focusLast = (): boolean => {
            if (focusable.length > 0) {
                const [element] = focusable.slice(-1);
                element && element.focus && element.focus();
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
    }

    private doOnOpen() {
        setTimeout(() => {
            const ne = this.body.nativeElement;
            ne && ne.focus && ne.focus();
        });
        this.preventBackgroundScrolling();
    }

    private cleanUp() {
        if (this.isOpen) {
            this.enableBackgroundScrolling();
        }
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
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
            this.renderer[method](body, this.options.popupOpenedClass);
        }
    }
}

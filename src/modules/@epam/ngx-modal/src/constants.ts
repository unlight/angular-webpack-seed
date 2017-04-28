import { InjectionToken } from '@angular/core';

const focusable = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'button:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable=true]',
];

export const focusableSelector = focusable.join(',');

export type ModalOptions = {
    popupOpenedClass: string;
    isOpenClass: string;
    isNotificationClass: string;
    popupClass: string;
    popupBodyClass: string;
    headerClass: string;
    footerClass: string;
    contentClass: string;
};

export const defaultOptions: ModalOptions = {
    popupOpenedClass: 'ngx-modal-popup-opened',
    isOpenClass: 'ngx-modal-is-open',
    isNotificationClass: 'ngx-modal-is-notification',
    popupClass: 'ngx-modal-popup',
    popupBodyClass: 'ngx-modal-popup-body',
    headerClass: 'ngx-modal-header',
    footerClass: 'ngx-modal-footer',
    contentClass: 'ngx-modal-content',
}

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');


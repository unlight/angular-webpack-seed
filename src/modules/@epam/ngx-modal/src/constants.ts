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
    bodyClass: string;
    headerClass: string;
    footerClass: string;
    contentClass: string;
    headerCloseClass: string;
    headerCloseContent: string;
    closeOnRouteChange: boolean;
    routeOutlets: string[];
};

export const defaultOptions: ModalOptions = {
    popupOpenedClass: 'ngx-modal-popup-opened',
    isOpenClass: 'ngx-modal-open',
    isNotificationClass: 'ngx-modal-notification',
    popupClass: 'ngx-modal-popup',
    bodyClass: 'ngx-modal-body',
    headerClass: 'ngx-modal-header',
    footerClass: 'ngx-modal-footer',
    contentClass: 'ngx-modal-content',
    headerCloseClass: 'ngx-modal-header-close',
    headerCloseContent: '&times;',
    closeOnRouteChange: true,
    routeOutlets: ['modal'],
};

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');

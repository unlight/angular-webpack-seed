import { ModalOptions } from './types';
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

export const defaultOptions: ModalOptions = {
    isOpenClass: 'ngx-modal-is-open',
    isNotificationClass: 'ngx-modal-is-notification',
}

export const OPTIONS = new InjectionToken<ModalOptions>('ModalOptions');

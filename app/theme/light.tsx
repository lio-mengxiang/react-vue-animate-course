import type { ThemeProps } from './interface';

export const lightTheme: ThemeProps = {
  // base color
  '--brand-color-1': '#f2f3ff',
  '--brand-color-2': '#d9e1ff',
  '--brand-color-3': '#b5c7ff',
  '--brand-color-4': '#8eabff',
  '--brand-color-5': '#618dff',
  '--brand-color-6': '#366ef4',
  '--brand-color-7': '#0052d9',
  '--brand-color-8': '#003cab',
  '--brand-color-9': '#002a7c',
  '--brand-color-10': '#001a57',
  '--warning-color-1': '#FFF9EB',
  '--warning-color-2': '#FFF3D6',
  '--warning-color-3': '#FFE7AD',
  '--warning-color-4': '#FFDA85',
  '--warning-color-5': '#FFCE5C',
  '--warning-color-6': '#FFC233',
  '--warning-color-7': '#FAAF00',
  '--warning-color-8': '#C28800',
  '--warning-color-9': '#8A6100',
  '--warning-color-10': '#523900',
  '--error-color-1': '#fff0ed',
  '--error-color-2': '#ffd8d2',
  '--error-color-3': '#ffb9b0',
  '--error-color-4': '#ff9285',
  '--error-color-5': '#f6685d',
  '--error-color-6': '#d54941',
  '--error-color-7': '#ad352f',
  '--error-color-8': '#881f1c',
  '--error-color-9': '#68070a',
  '--error-color-10': '#490002',
  '--success-color-1': '#e3f9e9',
  '--success-color-2': '#c6f3d7',
  '--success-color-3': '#92dab2',
  '--success-color-4': '#56c08d',
  '--success-color-5': '#2ba471',
  '--success-color-6': '#008858',
  '--success-color-7': '#006c45',
  '--success-color-8': '#005334',
  '--success-color-9': '#003b23',
  '--success-color-10': '#002515',
  '--gray-color-1': '#f9f9f9',
  '--gray-color-2': '#f3f3f3',
  '--gray-color-3': '#e8e8e8',
  '--gray-color-4': '#ddd',
  '--gray-color-5': '#c6c6c6',
  '--gray-color-6': '#a6a6a6',
  '--gray-color-7': '#8b8b8b',
  '--gray-color-8': '#777',
  '--gray-color-9': '#5e5e5e',
  '--gray-color-10': '#4b4b4b',
  '--gray-color-11': '#393939',
  '--gray-color-12': '#2c2c2c',
  '--gray-color-13': '#242424',
  '--gray-color-14': '#181818',

  // brand color status
  '--brand-color': 'var(--brand-color-7)',
  '--brand-color-hover': 'var(--brand-color-6)',
  '--brand-color-focus': 'var(--brand-color-2)',
  '--brand-color-active': 'var(--brand-color-8)',
  '--brand-color-disabled': 'var(--brand-color-3)',

  // warning color status
  '--warning-color': 'var(--warning-color-7)',
  '--warning-color-hover': 'var(--warning-color-6)',
  '--warning-color-focus': 'var(--warning-color-4)',
  '--warning-color-active': 'var(--warning-color-8)',
  '--warning-color-disabled': 'var(--warning-color-5)',

  // error color status
  '--error-color': 'var(--error-color-6)',
  '--error-color-hover': 'var(--error-color-5)',
  '--error-color-focus': 'var(--error-color-2)',
  '--error-color-active': 'var(--error-color-7)',
  '--error-color-disabled': 'var(--error-color-3)',

  // success color status
  '--success-color': 'var(--success-color-5)',
  '--success-color-hover': 'var(--success-color-4)',
  '--success-color-focus': 'var(--success-color-2)',
  '--success-color-active': 'var(--success-color-6)',
  '--success-color-disabled': 'var(--success-color-3)',

  // mask
  '--mask-active': 'rgba(0, 0, 0, 60%)',
  '--mask-disabled': 'rgba(255, 255, 255, 60%)',
  // spin mask
  '--mask-layer-bg': 'rgba(255, 255, 255, 60%)',

  // background color
  '--bg-color-page': 'var(--gray-color-2)',
  '--bg-color-container': '#fff',
  '--bg-color-secondary-container': 'var(--gray-color-1)',
  '--bg-color-container-hover': 'var(--gray-color-1)',
  '--bg-color-container-active': 'var(--gray-color-3)',
  '--bg-color-container-select': '#fff',
  '--bg-color-component': 'var(--gray-color-2)',
  '--bg-color-component-middle': 'var(--gray-color-5)',
  '--bg-color-component-hover': 'var(--gray-color-4)',
  '--bg-color-component-active': 'var(--gray-color-6)',
  '--bg-color-component-disabled': 'var(--gray-color-1)',
  '--bg-color-special-component': '#fff',

  // text color
  '--text-color-primary': 'rgba(0, 0, 0, 90%)',
  '--text-color-secondary': 'rgba(0, 0, 0, 60%)',
  '--text-color-placeholder': 'rgba(0, 0, 0, 40%)',
  '--text-color-disabled': 'rgba(0, 0, 0, 26%)',
  '--text-color-anti': '#fff',
  '--text-color-brand': 'var(--brand-color-7)',
  '--text-color-link': 'var(--brand-color-8)',

  // divide color
  '--border-level-1-color': 'var(--gray-color-3)',
  // border color
  '--border-level-2-color': 'var(--gray-color-4)',

  // shadow color
  '--shadow-1': '0px 2px 10px 0px rgba(0,0,0,.06), 0px 0px 1px 0px rgba(0,0,0,.3)',
  '--shadow-2': '0px 2px 30px 0px rgba(0,0,0,.08), 0px 0px 1px 0px rgba(0,0,0,.3)',
  '--shadow-3': '0px 30px 60px 0px rgba(0,0,0,.12), 0px 0px 1px 0px rgba(0,0,0,.3)',
  '--shadow-inset-top': 'inset 0 .5px 0 #fefefe',
  '--shadow-inset-right': 'inset .5px 0 0 #fefefe',
  '--shadow-inset-bottom': 'inset 0 -.1px 0 #fefefe',
  '--shadow-inset-left': 'inset -.5px 0 0 #fefefe',
  '--shadow-out-top': '0 -1px 0 #e7e7e7',
  '--shadow-out-right': '1px 0 0 #e7e7e7',
  '--shadow-out-bottom': '0 1px 0 #e7e7e7',
  '--shadow-out-left': '-1px 0 0 #e7e7e7',

  // border-radius
  '--border-radius-small': '2px',
  '--border-radius-medium': '4px',
  '--border-radius-large': '8px',
};

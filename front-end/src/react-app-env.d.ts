/// <reference types="react-scripts" />
declare module '*.png';
import { resourcesType } from './i18n/index';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: resourcesType;
  }
}

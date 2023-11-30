import { InjectionToken } from '@angular/core';

export type PortalPosition = {
  left: number;
  top: number;
  translateX?: -100 | -50;
  translateY?: -100 | -50;
};

export const PORTAL_POSITION_TOKEN = new InjectionToken<PortalPosition>(
  'portal-position'
);

export const PORTAL_DATA_TOKEN = new InjectionToken<string[]>('portal-data');

export type InteractionType = 'hover' | 'click';
export type Position = 'above' | 'below' | 'left' | 'right';

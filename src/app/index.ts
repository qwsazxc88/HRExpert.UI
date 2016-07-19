export * from './APP_COMPONENTS';

export * from './Services';
export * from './Model';

import { AppState } from './app.service';
import { API } from './Services';

// Application wide providers
export const APP_PROVIDERS = [
  AppState, API
];

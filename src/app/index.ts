export * from './APP_COMPONENTS';

export * from './Services';
export * from './Model';

import { AppState } from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];

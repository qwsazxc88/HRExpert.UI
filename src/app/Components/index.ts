// export * from './BS_COMPONENTS';
export * from './APP_COMPONENTS';
// export * from './APP_UI_COMPONENTS';
export * from './app/app.component';

import { AppState } from './app/app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];

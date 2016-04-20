export * from './UI/CustomRouter/LoggedInOutlet';
export * from './UI/CustomRouter/router-active.directive';
export * from './UI/TreeView/TreeView.component';

import {LoggedInRouterOutlet} from './UI/CustomRouter/LoggedInOutlet';
import {RouterActive} from './UI/CustomRouter/router-active.directive';
import {TreeView} from './UI/TreeView/TreeView.component';

export const APP_UI_COMPONENTS=[
    LoggedInRouterOutlet,
    RouterActive,
    TreeView]
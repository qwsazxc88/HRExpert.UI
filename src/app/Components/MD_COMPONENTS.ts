//export * from '@angular2-material/button';
//export * from '@angular2-material/toolbar';
//export * from '@angular2-material/input';
//export * from '@angular2-material/checkbox';
//export * from '@angular2-material/radio';
//export * from '@angular2-material/card';
//export * from '@angular2-material/sidenav';
//export * from '@angular2-material/list';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
//import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioGroup} from '@angular2-material/radio';
//import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
//import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
export const MD_COMPONENTS =[
     MATERIAL_DIRECTIVES,
     MD_SIDENAV_DIRECTIVES,
     MD_INPUT_DIRECTIVES,
     //MATERIAL_PROVIDERS,
     MdToolbar
];
/*[
   // MdButton,
   // MdAnchor,
   // MdToolbar,
   // MD_INPUT_DIRECTIVES,
   // MdCheckbox,
    //MdRadioButton,    
    //MdRadioGroup,
    //MD_CARD_DIRECTIVES,
   // MD_SIDENAV_DIRECTIVES
  MATERIAL_DIRECTIVES
  //  MD_LIST_DIRECTIVES
];*/
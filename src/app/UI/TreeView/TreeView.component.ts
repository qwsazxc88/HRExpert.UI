import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'tree-view',
    styles: [require('./treeview.css')],
    template: require('./TreeView.html'),
    directives: [TreeView]
})
export class TreeView {
    @Input() Elements: Array<any>;
    @Input() SelectedElement: any;
    @Output() SelectedElementChange = new EventEmitter();
    toggle(element) {
        if (element.toggled) {
            element.toggled = false;
        } else { element.toggled = true; }
    }
    select(element) {
        this.SelectedElement = element;
        this.SelectedElementChange.emit(element);
    }
}

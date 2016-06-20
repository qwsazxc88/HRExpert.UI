import { Directive, ElementRef, Input, Output, HostListener, EventEmitter  } from '@angular/core';

@Directive({selector: '[fileselector]'})
export class FileSelectDirective {
  private element:ElementRef;
  @Input() SelectedFiles: File[];
  @Input() SelectedFile: File;
  @Output() SelectedFileChange = new EventEmitter();
  @Output() SelectedFilesChange = new EventEmitter();
  public constructor(element:ElementRef) {
    this.element = element;
  }

  public isEmptyAfterSelection():boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  @HostListener('change')
  public onChange():any {
    let files = this.element.nativeElement.files;
    this.SelectedFiles = files;
    this.SelectedFile= files[0];
    this.SelectedFilesChange.emit(this.SelectedFiles);
    this.SelectedFileChange.emit(this.SelectedFile);
  }
}
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  // @HostBinding('style.backgroundColor') backgroundColor: string = '';

  @HostBinding('class.shadow') hasShadow: boolean = false;

  @HostListener('mouseenter') onMouseEnter() {
    // this.backgroundColor = 'yellow';
    this.hasShadow = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.backgroundColor = '';
    this.hasShadow = false;
  }
}

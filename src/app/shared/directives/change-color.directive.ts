import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'white';
  @Input() defaultBackground: string = 'red';
  @Input('appBetterHighlight') highlightColor: string = 'white';
  @HostBinding('style.color') color: string;
  @HostBinding('style.background') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.color = this.defaultColor;
  }

  @HostListener('click') toggle() {
    this.backgroundColor = 'white';
    this.color = 'red';
  }
}

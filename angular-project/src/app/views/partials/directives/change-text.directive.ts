import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeText]'
})
export class ChangeTextOnHoverDirective {

  constructor(private element: ElementRef) { }

  // Le décorateur @HostListener() permet d'écouter un évenement sur l'élément
  // référencé
  @HostListener('mouseenter')
  onMouseEnter() {
    (this.element.nativeElement as HTMLElement).innerHTML = 'TEXT CHANGED';
    (this.element.nativeElement as HTMLElement).style.fontSize = '32px';
  }

}

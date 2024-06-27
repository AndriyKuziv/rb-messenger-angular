import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[customScaling]'
})
export class CustomScalingDirective implements AfterViewInit {
  @Input()
  scale: number = 1.2;

  constructor(private _el: ElementRef) { }

  ngAfterViewInit(): void {
    this._el.nativeElement.style.transform = `scale(${this.scale})`;
  }
}

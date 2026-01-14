import {Directive, ElementRef, HostListener, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
    selector: '[evClickOut]',
    standalone: true
})
export class ClickOutDirective {

    @Input()
    apply = true;
    @Output()
    clickOut = new Subject<MouseEvent>();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event'])
    public onClick(event: MouseEvent): void {
        event.stopPropagation();
        if (this.apply) {
            const clickedInside = this.elementRef.nativeElement.contains(event.target) as boolean;
            if (!clickedInside) {
                this.clickOut.next(event);
            }
        }
    }
}

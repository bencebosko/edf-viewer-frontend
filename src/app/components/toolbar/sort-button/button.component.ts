import {Directive, Input} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Directive()
export abstract class Button {

    @Input()
    buttonText = '';
    @Input()
    buttonClass = '';

    buttonPushed$: Observable<boolean>;

    private readonly ANIMATION_DURATION = 200;
    private _buttonPushed$ = new BehaviorSubject(false);

    constructor() {
        this.buttonPushed$ = this._buttonPushed$.asObservable();
    }

    abstract clickHandler(): void;

    click(): void {
        if (!this._buttonPushed$.value) {
            this._buttonPushed$.next(true);
            setTimeout(() => {
                this.clickHandler();
                this._buttonPushed$.next(false);
            }, this.ANIMATION_DURATION);
        }
    }
}

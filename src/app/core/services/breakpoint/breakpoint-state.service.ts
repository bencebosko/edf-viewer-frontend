import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Breakpoint} from '../../model/breakpoint.model';
import {MAX_WIDTH_TABLET} from '../../constant/app.const';

export class BreakpointStateService {

    currentBreakpoint$: Observable<Breakpoint>;
    isTablet$: Observable<boolean>;

    private _currentBreakpoint = new BehaviorSubject<Breakpoint>(this.getCurrentBreakpoint());

    constructor() {
        this.currentBreakpoint$ = this._currentBreakpoint.asObservable();
        this.isTablet$ = this.currentBreakpoint$.pipe(map(breakpoint => breakpoint === Breakpoint.TABLET));
        fromEvent(window, 'resize').subscribe(() => {
            this._currentBreakpoint.next(this.getCurrentBreakpoint());
        });
    }

    private getCurrentBreakpoint(): Breakpoint {
        const width = window.innerWidth;
        if (width <= MAX_WIDTH_TABLET)
            return Breakpoint.TABLET;
        else {
            return Breakpoint.NORMAL;
        }
    }
}

import {Injectable} from '@angular/core';
import {PopupConfig} from '../../model/popup-config.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {BASE_PATH_POPUPS, POPUP_OUTLET} from '../../constant/app.const';

@Injectable()
export class PopupService {

    popupConfig$: Observable<PopupConfig | null>
    private _popupConfig$ = new BehaviorSubject<PopupConfig | null>(null)

    constructor(private router: Router) {
        this.popupConfig$ = this._popupConfig$.asObservable();
    }

    openModal(popupName: string, config: PopupConfig) {
        this._popupConfig$.next(config);
        this.router.navigate([{outlets: {[POPUP_OUTLET]: [BASE_PATH_POPUPS, popupName]}}]).then();
    }

    close(): void {
        this._popupConfig$.next(null);
        this.router.navigate([{outlets: {[POPUP_OUTLET]: null}}]).then();
    }
}

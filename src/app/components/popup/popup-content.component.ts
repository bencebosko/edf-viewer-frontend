import {Directive} from '@angular/core';
import {PopupService} from '../../core/services/popup/popup.service';

@Directive()
export class PopupContentComponent {

    popupConfig$ = this.popupService.popupConfig$;

    constructor(private popupService: PopupService) {
    }
}

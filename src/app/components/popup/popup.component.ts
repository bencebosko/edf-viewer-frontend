import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ClickOutDirective} from '../../core/directives/click-out.directive';
import {PopupService} from '../../core/services/popup/popup.service';
import {BreakpointStateService} from '../../core/services/breakpoint/breakpoint-state.service';
import {AsyncPipe} from '@angular/common';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    styleUrl: './popup.component.scss',
    imports: [
        ClickOutDirective,
        RouterOutlet,
        AsyncPipe
    ],
    templateUrl: './popup.component.html'
})
export class PopupComponent {

    popupConfig$ = this.popupService.popupConfig$;
    isTablet$ = this.breakpointState.isTablet$;
    popupWidth$ = combineLatest([this.popupConfig$, this.isTablet$]).pipe(map(([popupConfig, isTablet]) => isTablet ? '100%' : popupConfig?.popupWidth ?? 'auto'));

    constructor(private popupService: PopupService, private breakpointState: BreakpointStateService) {
    }

    close(): void {
        this.popupService.close();
    }
}

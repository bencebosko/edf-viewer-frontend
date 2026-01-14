import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {PopupContentComponent} from '../popup-content.component';
import {map} from 'rxjs/operators';

@Component({
    standalone: true,
    templateUrl: './edf-details.component.html',
    styleUrl: './edf-details.component.scss',
    imports: [
        DatePipe,
        AsyncPipe,
        NgIf
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EDFDetails extends PopupContentComponent {
    edfRecord$ = this.popupConfig$.pipe(map(popupConfig => popupConfig?.data ?? null));
}

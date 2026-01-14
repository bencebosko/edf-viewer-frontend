import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Subject} from 'rxjs';
import {EDFListItem} from '../../../core/model/edf-list-item.model';

@Component({
    selector: 'ev-edf-list-item',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './edf-list-item.component.html',
    styleUrl: './edf-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdfListItemComponent {

    @Input()
    edfListItem: EDFListItem | undefined;
    @Output()
    itemClicked = new Subject<string>();

    handleClick(): void {
        if (this.edfListItem) {
            this.itemClicked.next(this.edfListItem.fileName);
        }
    }
}

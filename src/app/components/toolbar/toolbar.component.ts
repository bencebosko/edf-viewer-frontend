import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EdfStateService} from '../../core/services/edf/edf-state.service';
import {SortOrder} from '../../core/model/sort-order.model';
import {AsyncPipe} from '@angular/common';
import {SortButton} from './sort-button/sort-button.component';

@Component({
    selector: 'ev-toolbar',
    standalone: true,
    imports: [
        AsyncPipe,
        SortButton
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

    sortOrder$ = this.edfStateService.sortOrder$;

    constructor(private edfStateService: EdfStateService) {
    }

    reloadListItems(sortOrder: SortOrder): void {
        this.edfStateService.setSortOrder(sortOrder);
        this.edfStateService.loadListItems();
    }
}

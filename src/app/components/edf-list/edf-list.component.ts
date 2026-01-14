import {
    AsyncPipe,
    NgForOf,
    NgIf
} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EdfStateService} from '../../core/services/edf/edf-state.service';
import {EdfListItemComponent} from './edf-list-item/edf-list-item.component';
import {PopupService} from '../../core/services/popup/popup.service';
import {EDF_DETAILS_POPUP} from '../../core/constant/app.const';
import {map} from 'rxjs/operators';
import {PaginatorComponent} from '../paginator/paginator.component';
import {PagingInfo} from '../../core/model/paging-info.model';

@Component({
    selector: 'ev-edf-list',
    standalone: true,
    imports: [
        AsyncPipe,
        EdfListItemComponent,
        NgForOf,
        NgIf,
        PaginatorComponent
    ],
    templateUrl: './edf-list.component.html',
    styleUrl: './edf-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdfListComponent {

    edfListItems$ = this.edfStateService.listItems$;
    pagingInfo$ = this.edfStateService.pagingInfo$;
    isEmpty$ = this.edfListItems$.pipe(map(edfListItems => edfListItems.length === 0));

    constructor(private edfStateService: EdfStateService, private popupService: PopupService) {
    }

    reloadListItems(pagingInfo: PagingInfo): void {
        this.edfStateService.setPagingInfo(pagingInfo);
        this.edfStateService.loadListItems();
    }

    openRecord(fileName: string): void {
        this.edfStateService.getRecord(fileName).subscribe(edfRecord => {
            this.popupService.openModal(EDF_DETAILS_POPUP, {
                popupTitle: 'Record details',
                popupWidth: '750px',
                data: edfRecord
            });
        })
    }


}

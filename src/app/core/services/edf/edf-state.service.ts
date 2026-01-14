import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take} from 'rxjs';
import {EDFListItem} from '../../model/edf-list-item.model';
import {EDFRecord} from '../../model/edf-record.model';
import {EdfService} from './edf.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PagingInfo} from '../../model/paging-info.model';
import {SortOrder} from '../../model/sort-order.model';
import {DEFAULT_PAGE_SIZE, DEFAULT_SORT_ORDER} from '../../constant/app.const';

@Injectable()
export class EdfStateService {

    listItems$: Observable<EDFListItem[]>;
    pagingInfo$: Observable<PagingInfo | null>;
    sortOrder$: Observable<SortOrder>;

    private _edfListItems$ = new BehaviorSubject<EDFListItem[]>([]);
    private _pagingInfo$ = new BehaviorSubject<PagingInfo>(this.getDefaultPagingInfo());
    private _sortOrder$ = new BehaviorSubject<SortOrder>(DEFAULT_SORT_ORDER);

    constructor(private edfService: EdfService) {
        this.listItems$ = this._edfListItems$.asObservable();
        this.pagingInfo$ = this._pagingInfo$.asObservable();
        this.sortOrder$ = this._sortOrder$.asObservable();
    }

    setPagingInfo(pagingInfo: PagingInfo): void {
        this._pagingInfo$.next(pagingInfo);
    }

    getPagingInfo(): PagingInfo {
        return this._pagingInfo$.value;
    }

    setSortOrder(sortOrder: SortOrder): void {
        this._sortOrder$.next(sortOrder);
    }

    getSortOrder(): SortOrder {
        return this._sortOrder$.value;
    }

    loadListItems(): void {
        const page = this.getPagingInfo().page;
        const pageSize = this.getPagingInfo().pageSize;
        const sortOrder = this.getSortOrder();
        this.edfService.getListItems(page, pageSize, sortOrder).pipe(take(1)).subscribe({
            next: page => {
                this._pagingInfo$.next({...page});
                this._edfListItems$.next(page.items)
            },
            error: (httpError: HttpErrorResponse) => {
                console.error(httpError);
                this._pagingInfo$.next(this.getDefaultPagingInfo());
                this._edfListItems$.next([]);
            }
        });
    }

    getRecord(fileName: string): Observable<EDFRecord> {
        return this.edfService.getRecord(fileName).pipe(take(1));
    }

    private getDefaultPagingInfo(): PagingInfo {
        return {
            page: 0,
            pageSize: DEFAULT_PAGE_SIZE,
            totalCount: 0
        };
    }
}

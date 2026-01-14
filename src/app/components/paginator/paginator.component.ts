import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {PagingInfo} from '../../core/model/paging-info.model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
    selector: 'ev-paginator',
    standalone: true,
    imports: [
        AsyncPipe,
        NgIf
    ],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

    @Output()
    pagingInfoChanged = new Subject<PagingInfo>();
    pagingInfo$: Observable<PagingInfo | null>;

    private _pagingInfo$ = new BehaviorSubject<PagingInfo | null>(null);

    constructor() {
        this.pagingInfo$ = this._pagingInfo$.asObservable();
    }

    @Input()
    set pagingInfo(value: PagingInfo | null) {
        this._pagingInfo$.next(value);
    }

    firstPage(): void {
        const currentPaging = this._pagingInfo$.value;
        if (currentPaging) {
            this.selectPage({...currentPaging, page: 0});
        }
    }

    previousPage(): void {
        const currentPaging = this._pagingInfo$.value;
        if (currentPaging) {
            const previousPage = Math.max(currentPaging.page - 1, 0);
            this.selectPage({...currentPaging, page: previousPage});
        }
    }

    nextPage(): void {
        const currentPaging = this._pagingInfo$.value;
        if (currentPaging) {
            const nextPage = Math.min(currentPaging.page + 1, this.calculateLastPage(currentPaging));
            this.selectPage({...currentPaging, page: nextPage});
        }
    }

    lastPage(): void {
        const currentPaging = this._pagingInfo$.value;
        if (currentPaging) {
            const lastPage = this.calculateLastPage(currentPaging);
            this.selectPage({...currentPaging, page: lastPage});
        }
    }

    getPageFromToText(pagingInfo: PagingInfo | null): string {
        if (!pagingInfo) {
            return '';
        }
        const page = pagingInfo.page;
        const pageSize = pagingInfo.pageSize;
        return `${page * pageSize} - ${Math.min((page + 1) * pageSize, pagingInfo.totalCount)}`
    }

    private selectPage(pagingInfo: PagingInfo): void {
        this._pagingInfo$.next(pagingInfo);
        this.pagingInfoChanged.next(pagingInfo);
    }

    private calculateLastPage(pagingInfo: PagingInfo): number {
        if (pagingInfo.totalCount === 0) {
            return 0;
        }
        return Math.floor(pagingInfo.totalCount / pagingInfo.pageSize) + (pagingInfo.totalCount % pagingInfo.pageSize !== 0 ? 1 : 0) - 1;
    }
}

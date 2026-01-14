import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EDFListItem} from '../../model/edf-list-item.model';
import {HttpParamHelper} from '../../helper/http-param-helper';
import {EDFRecord} from '../../model/edf-record.model';
import {Page} from '../../model/page.model';
import {SortOrder} from '../../model/sort-order.model';

@Injectable()
export class EdfService {

    private readonly EDF_RESOURCE = '/api/v1/edf';

    constructor(private httpClient: HttpClient) {
    }

    getListItems(page: number, pageSize: number, sortOrder: SortOrder): Observable<Page<EDFListItem>> {
        const params = HttpParamHelper.createFromObject({page, pageSize, sortOrder});
        return this.httpClient.get<Page<EDFListItem>>(`${this.EDF_RESOURCE}`, {params});
    }

    getRecord(fileName: string): Observable<EDFRecord> {
        return this.httpClient.get<EDFRecord>(`${this.EDF_RESOURCE}/${fileName}`, {});
    }
}

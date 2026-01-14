import {PagingInfo} from './paging-info.model';

export interface Page<T> extends PagingInfo {

    items: T[];
}

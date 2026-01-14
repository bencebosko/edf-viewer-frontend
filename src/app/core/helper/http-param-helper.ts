import {HttpParams} from '@angular/common/http';

export class HttpParamHelper {

    public static createFromObject(value: any): HttpParams {
        let httpParams = new HttpParams();
        if (value && typeof value === 'object') {
            Object.keys(value).forEach(key => {
                httpParams = httpParams.append(key, value[key]);
            })
        }
        return httpParams;
    }
}

import {Route} from '@angular/router';
import {PopupComponent} from './components/popup/popup.component';
import {EDFDetails} from './components/popup/edf-details/edf-details.component';
import {BASE_PATH_POPUPS, EDF_DETAILS_POPUP, POPUP_OUTLET} from './core/constant/app.const';

export const ROUTES: Route[] = [
    {
        path: BASE_PATH_POPUPS,
        component: PopupComponent,
        outlet: POPUP_OUTLET,
        children: [
            {
                path: EDF_DETAILS_POPUP,
                component: EDFDetails
            }
        ]
    }
];

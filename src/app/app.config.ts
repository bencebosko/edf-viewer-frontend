import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {EdfService} from './core/services/edf/edf.service';
import {EdfStateService} from './core/services/edf/edf-state.service';
import {PopupService} from './core/services/popup/popup.service';
import {provideRouter} from '@angular/router';
import {BreakpointStateService} from './core/services/breakpoint/breakpoint-state.service';
import {ROUTES} from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
    providers: [
        provideRouter(ROUTES),
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideHttpClient(),
        [
            {provide: EdfService},
            {provide: EdfStateService},
            {provide: PopupService},
            {provide: BreakpointStateService},
        ]
    ]
};


import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {APP_CONFIG} from './app/app.config';

if (environment.production) {
    window.console.log = () => {
    };
    window.console.info = () => {
    };
}

bootstrapApplication(AppComponent, APP_CONFIG).catch(err => console.error(err));

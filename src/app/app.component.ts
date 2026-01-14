import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EdfStateService} from './core/services/edf/edf-state.service';
import {RouterOutlet} from '@angular/router';
import {EdfListComponent} from './components/edf-list/edf-list.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {POPUP_OUTLET} from './core/constant/app.const';

@Component({
    selector: 'app-root',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './app.component.scss',
    templateUrl: '/app.component.html',
    imports: [
        RouterOutlet,
        EdfListComponent,
        ToolbarComponent
    ]
})
export class AppComponent implements OnInit {

    readonly POPUP_OUTLET = POPUP_OUTLET;

    constructor(private edfStateService: EdfStateService) {
    }

    ngOnInit() {
        this.edfStateService.loadListItems();
    }
}

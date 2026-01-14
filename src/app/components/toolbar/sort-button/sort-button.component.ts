import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {Subject} from 'rxjs';
import {SortOrder} from '../../../core/model/sort-order.model';
import {Button} from './button.component';

@Component({
    selector: 'ev-sort-button',
    standalone: true,
    imports: [
        NgClass,
        AsyncPipe
    ],
    templateUrl: './sort-button.component.html',
    styleUrl: './sort-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortButton extends Button {

    @Input()
    sortOrder: SortOrder | undefined | null;
    @Output()
    sortOrderSelected = new Subject<SortOrder>();

    override clickHandler(): void {
        this.sortOrder = this.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
        this.sortOrderSelected.next(this.sortOrder);
    }

    getSortIconClass(): string {
        return this.sortOrder === SortOrder.ASC ? 'bi-arrow-up' : 'bi-arrow-down';
    }
}

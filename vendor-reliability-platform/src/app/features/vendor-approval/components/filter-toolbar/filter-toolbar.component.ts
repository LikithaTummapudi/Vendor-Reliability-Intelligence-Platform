import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export interface VendorFilter {
  search: string;
  category: string;
  status: string;
  risk: string;
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-filter-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterToolbarComponent {

  @Output()
  filtersChanged = new EventEmitter<VendorFilter>();

  readonly categories = [
    'All',
    'IT Services',
    'Manufacturing',
    'Logistics',
    'Healthcare',
    'Finance'
  ];

  readonly statuses = [
    'All',
    'Pending',
    'Approved',
    'Rejected',
    'Changes Requested'
  ];

  readonly risks = [
    'All',
    'Low',
    'Medium',
    'High'
  ];

  readonly form;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      search: [''],
      category: ['All'],
      status: ['All'],
      risk: ['All'],
      startDate: [null],
      endDate: [null]
    });

    this.form.valueChanges.subscribe(() => this.emitFilters());

  }

  clearFilters(): void {

    this.form.reset({
      search: '',
      category: 'All',
      status: 'All',
      risk: 'All',
      startDate: null,
      endDate: null
    });

    this.emitFilters();

  }

  private emitFilters(): void {

    this.filtersChanged.emit({
      search: this.form.value.search ?? '',
      category: this.form.value.category ?? 'All',
      status: this.form.value.status ?? 'All',
      risk: this.form.value.risk ?? 'All',
      startDate: this.form.value.startDate ?? null,
      endDate: this.form.value.endDate ?? null
    });

  }

}
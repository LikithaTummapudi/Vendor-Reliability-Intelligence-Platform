import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { Vendor } from '../../models/vendor';


@Component({
  selector: 'app-vendor-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorTableComponent implements AfterViewInit, OnChanges {

  @Input() vendors: Vendor[] = [];

  @Output() approve = new EventEmitter<string>();

  @Output() reject = new EventEmitter<string>();

  @Output() view = new EventEmitter<string>();

displayedColumns = [
  'select',
  'company',
  'category',
  'reliability',
  'risk',
  'performance',
  'status',
  'actions'
];

  dataSource = new MatTableDataSource<Vendor>([]);

  selection = new SelectionModel<Vendor>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['vendors']) {
      this.dataSource.data = this.vendors;
    }

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(value: string): void {

    this.dataSource.filter = value.trim().toLowerCase();

  }

  isAllSelected(): boolean {

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;

  }

  toggleAllRows(): void {

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);

  }

  checkboxLabel(row?: Vendor): string {

    if (!row) {
      return this.isAllSelected()
        ? 'Deselect All'
        : 'Select All';
    }

    return this.selection.isSelected(row)
      ? `Deselect ${row.companyName}`
      : `Select ${row.companyName}`;

  }

  getInitials(name: string): string {

  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0,2)
    .toUpperCase();

}

getReliabilityClass(score:number):string{

  if(score>=80) return 'high';

  if(score>=50) return 'medium';

  return 'low';

}

getRiskLabel(score:number):string{

  if(score<=30) return 'Low Risk';

  if(score<=70) return 'Medium Risk';

  return 'High Risk';

}

getRiskClass(score:number):string{

  if(score<=30) return 'low-risk';

  if(score<=70) return 'medium-risk';

  return 'high-risk';

}

getRating(score:number):number{

  return Number((score/20).toFixed(1));

}

getStars(score:number):boolean[]{

  const stars=Math.round(score/20);

  return Array.from({length:5},(_,i)=>i<stars);

}

}
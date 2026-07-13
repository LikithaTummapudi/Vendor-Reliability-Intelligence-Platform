import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BaseChartDirective
} from 'ng2-charts';

@Component({
  selector: 'app-procurement-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './procurement-dashboard.html',
  styleUrl: './procurement-dashboard.css'
})
export class ProcurementDashboard {

  overviewCards = [
  {
    title: 'Total Purchase Orders',
    value: 1284
  },
  {
    title: 'Pending Approvals',
    value: 47
  },
  {
    title: 'Total Spend',
    value: '$4.82M'
  },
  {
    title: 'Active Vendors',
    value: 156
  }
];

purchaseOrders = [
  {
    po: 'PO-2291',
    vendor: 'Meridian Components',
    category: 'Electronics',
    amount: '$126,400',
    status: 'In Transit',
    expected: 'Jul 12'
  },
  {
    po: 'PO-2288',
    vendor: 'Northgate Logistics',
    category: 'Freight',
    amount: '$64,900',
    status: 'Pending',
    expected: 'Jul 15'
  },
  {
    po: 'PO-2277',
    vendor: 'Vertex Materials',
    category: 'Raw Materials',
    amount: '$212,050',
    status: 'Approved',
    expected: 'Jul 9'
  },
  {
    po: 'PO-2265',
    vendor: 'Skyline Freight',
    category: 'Logistics',
    amount: '$38,200',
    status: 'Delivered',
    expected: 'Jul 5'
  }
];

vendors = [
  {
    name: 'Meridian Components',
    score: 94
  },
  {
    name: 'Skyline Freight',
    score: 88
  },
  {
    name: 'Vertex Materials',
    score: 76
  },
  {
    name: 'Northgate Logistics',
    score: 61
  }
];

barChartLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun'
];

barChartData = {
  labels: this.barChartLabels,
  datasets: [
    {
      data: [400, 550, 620, 700, 800, 950],
      label: 'Spend'
    }
  ]
};

barChartOptions = {
  responsive: true
};

deliveryChartData = {
  labels: [
    'Delivered',
    'In Transit',
    'Delayed'
  ],
  datasets: [
    {
      data: [65, 25, 10]
    }
  ]
};

deliveryChartOptions = {
  responsive: true
};

}
import { Routes } from '@angular/router';

import { ContractLayout } from './contract-layout/contract-layout';

import { ContractDashboard } from './contract-dashboard/contract-dashboard';
import { ContractList } from './contract-list/contract-list';
import { AddContract } from './add-contract/add-contract';
import { ContractDetails } from './contract-details/contract-details';
import { ContractRenewal } from './contract-renewal/contract-renewal';
import { ComplianceMonitoring } from './compliance-monitoring/compliance-monitoring';

export const CONTRACT_ROUTES: Routes = [

  {
    path: '',
    component: ContractLayout,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: ContractDashboard
      },

      {
        path: 'contract-list',
        component: ContractList
      },

      {
        path: 'add-contract',
        component: AddContract
      },

      {
        path: 'contract-details',
        component: ContractDetails
      },

      {
        path: 'contract-renewal',
        component: ContractRenewal
      },

      {
        path: 'compliance-monitoring',
        component: ComplianceMonitoring
      }

    ]

  }

];
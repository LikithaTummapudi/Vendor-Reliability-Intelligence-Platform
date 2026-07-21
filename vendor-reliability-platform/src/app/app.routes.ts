import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/layout/main-layout/main-layout';
import { CommunicationWorkspaceComponent } from './features/communication/pages/communication-workspace/communication-workspace.component';
import { ApprovalDashboardComponent } from './features/vendor-approval/pages/approval-dashboard/approval-dashboard.component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: ApprovalDashboardComponent
      },

      {
        path: 'communication',
        component: CommunicationWorkspaceComponent
      },

    ]

  }

];
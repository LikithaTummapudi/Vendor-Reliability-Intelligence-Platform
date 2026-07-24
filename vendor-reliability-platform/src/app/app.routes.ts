import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/layout/main-layout/main-layout';
import { CommunicationWorkspaceComponent } from './features/communication/pages/communication-workspace/communication-workspace.component';
import { ApprovalDashboardComponent } from './features/vendor-approval/pages/approval-dashboard/approval-dashboard.component';
import { CommunicationHistoryComponent } from './features/communication/pages/communication-history/communication-history.component';

import { FileSharingComponent } from './features/communication/components/files/file-sharing/file-sharing.component';
import { EmailNotificationsComponent } from './features/communication/components/email/email-notifications/email-notifications.component';
import { ActivityLogsComponent } from './features/communication/components/activity/activity-logs/activity-logs.component';


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
        path: 'communication',
        component: CommunicationWorkspaceComponent
      },

 ]

  }

];
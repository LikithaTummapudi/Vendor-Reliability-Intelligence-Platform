import { Routes } from '@angular/router';
import { ProcurementDashboard } from './modules/procurement-dashboard/procurement-dashboard';
import { VendorDashboard } from './modules/vendor-dashboard/vendor-dashboard';
import { AdminDashboard } from './modules/admin-dashboard/admin-dashboard';
import { Notifications } from './modules/notifications/notifications';
import { Reports } from './modules/reports/reports';

export const routes: Routes = [
  { path: '', redirectTo: 'procurement', pathMatch: 'full' },
  { path: 'procurement', component: ProcurementDashboard },
  { path: 'vendor', component: VendorDashboard },
  { path: 'admin', component: AdminDashboard },
  { path: 'notifications', component: Notifications },
  { path: 'reports', component: Reports }
];
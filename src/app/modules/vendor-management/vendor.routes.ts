import { Routes } from '@angular/router';
import { VendorDashboard } from './vendor-dashboard/vendor-dashboard';
import { VendorList } from './vendor-list/vendor-list';
import { AddVendor } from './add-vendor/add-vendor';
import { EditVendor } from './edit-vendor/edit-vendor';
import { VendorDetails } from './vendor-details/vendor-details';
import { VendorApproval } from './vendor-approval/vendor-approval';

export const VENDOR_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: VendorDashboard,
    title: 'Vendor Dashboard'
  },
  {
    path: 'list',
    component: VendorList,
    title: 'Vendor List'
  },
  {
    path: 'add',
    component: AddVendor,
    title: 'Add Vendor'
  },
  {
    path: 'edit',
    component: EditVendor,
    title: 'Edit Vendor'
  },
  {
    path: 'edit/:id',
    component: EditVendor,
    title: 'Edit Vendor'
  },
  {
    path: 'details',
    component: VendorDetails,
    title: 'Vendor Details'
  },
  {
    path: 'details/:id',
    component: VendorDetails,
    title: 'Vendor Details'
  },
  {
    path: 'approval',
    component: VendorApproval,
    title: 'Vendor Approval'
  }
];
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Vendor } from '../models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private vendorsSubject = new BehaviorSubject<Vendor[]>(this.mockVendors());

  vendors$ = this.vendorsSubject.asObservable();

  constructor() {}

  getVendors(): Observable<Vendor[]> {
    return this.vendors$;
  }

  getVendor(id: string): Observable<Vendor | undefined> {
    return of(
      this.vendorsSubject.value.find(v => v.id === id)
    );
  }

  approveVendor(id: string): void {

    const updated = this.vendorsSubject.value.map(v => {

      if (v.id === id) {

        return {
          ...v,
          status: 'Approved' as const,
          updatedAt: new Date()
        };

      }

      return v;

    });

    this.vendorsSubject.next(updated);

  }

  rejectVendor(id: string): void {

    const updated = this.vendorsSubject.value.map(v => {

      if (v.id === id) {

        return {
          ...v,
          status: 'Rejected' as const,
          updatedAt: new Date()
        };

      }

      return v;

    });

    this.vendorsSubject.next(updated);

  }

  requestChanges(id: string): void {

    const updated = this.vendorsSubject.value.map(v => {

      if (v.id === id) {

        return {
          ...v,
          status: 'Changes Requested' as const,
          updatedAt: new Date()
        };

      }

      return v;

    });

    this.vendorsSubject.next(updated);

  }

  deleteVendor(id: string): void {

    this.vendorsSubject.next(
      this.vendorsSubject.value.filter(v => v.id !== id)
    );

  }

  private mockVendors(): Vendor[] {

    return [

      {
        id: 'V001',

        companyName: 'TechNova Solutions',

        registrationNumber: 'REG-10001',

        category: 'IT Services',

        contactPerson: 'John Smith',

        email: 'john@technova.com',

        phone: '+1 555-123456',

        address: '125 Business Street',

        city: 'New York',

        state: 'NY',

        country: 'USA',

        establishedYear: 2015,

        status: 'Pending' as const,

        reliabilityScore: 92,

        riskScore: 18,

        createdAt: new Date('2025-01-10'),

        updatedAt: new Date(),

        documents: [

          {
            id: 'D1',
            name: 'GST Certificate',
            type: 'PDF',
            uploadedOn: new Date(),
            verified: true,
            url: '#'
          },

          {
            id: 'D2',
            name: 'Business License',
            type: 'PDF',
            uploadedOn: new Date(),
            verified: true,
            url: '#'
          }

        ],

        timeline: [

          {
            id: 'T1',
            title: 'Vendor Registered',
            description: 'Vendor submitted registration',
            date: new Date(),
            performedBy: 'Vendor'
          },

          {
            id: 'T2',
            title: 'Documents Verified',
            description: 'Compliance documents checked',
            date: new Date(),
            performedBy: 'Compliance Team'
          }

        ]

      },

      {
        id: 'V002',

        companyName: 'Green Logistics',

        registrationNumber: 'REG-10002',

        category: 'Logistics',

        contactPerson: 'Alice Brown',

        email: 'alice@greenlogistics.com',

        phone: '+1 555-876543',

        address: '22 Cargo Road',

        city: 'Dallas',

        state: 'TX',

        country: 'USA',

        establishedYear: 2011,

        status: 'Approved' as const,

        reliabilityScore: 96,

        riskScore: 12,

        createdAt: new Date(),

        updatedAt: new Date(),

        documents: [

          {
            id: 'D3',
            name: 'Insurance',
            type: 'PDF',
            uploadedOn: new Date(),
            verified: true,
            url: '#'
          }

        ],

        timeline: [

          {
            id: 'T3',
            title: 'Approved',
            description: 'Vendor approved',
            date: new Date(),
            performedBy: 'Admin'
          }

        ]

      },

      {
        id: 'V003',

        companyName: 'Alpha Manufacturing',

        registrationNumber: 'REG-10003',

        category: 'Manufacturing',

        contactPerson: 'David Lee',

        email: 'david@alpha.com',

        phone: '+1 555-445566',

        address: 'Industrial Zone',

        city: 'Chicago',

        state: 'IL',

        country: 'USA',

        establishedYear: 2008,

        status: 'Rejected' as const,

        reliabilityScore: 54,

        riskScore: 79,

        createdAt: new Date(),

        updatedAt: new Date(),

        documents: [

          {
            id: 'D4',
            name: 'Factory License',
            type: 'PDF',
            uploadedOn: new Date(),
            verified: false,
            url: '#'
          }

        ],

        timeline: [

          {
            id: 'T4',
            title: 'Rejected',
            description: 'Compliance failure',
            date: new Date(),
            performedBy: 'Compliance Officer'
          }

        ]

      }

    ];

  }

}
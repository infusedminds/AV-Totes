/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TotePackage {
  id: 'package25' | 'package50' | 'custom';
  name: string;
  toteCount: number;
  priceWeek1: number;
  priceAdditionalWeek: number;
  description: string;
  features: string[];
}

export interface InquiryLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  zipCode: string;
  packageId: 'package25' | 'package50' | 'custom';
  durationWeeks: number;
  extraTotesCount: number;
  preferredDeliveryDate: string;
  preferredPickupDate: string;
  specialInstructions?: string;
  totalEstimate: number;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Booked' | 'Completed';
}

export interface ServiceCity {
  name: string;
  zipCodes: string[];
  deliveryFee: number; // 0 for free
  minOrderValue: number;
}

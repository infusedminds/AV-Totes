/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TotePackage, ServiceCity } from '../types';

export const TOTE_PACKAGES: TotePackage[] = [
  {
    id: 'package25',
    name: '25 Tote Package',
    toteCount: 25,
    priceWeek1: 150,
    priceAdditionalWeek: 50,
    description: 'Perfect for a 1-2 bedroom apartment or house. Easy to pack, stack, and move.',
    features: [
      '25 Heavy-duty interlocking blue totes',
      '1 FREE metal moving dolly rental',
      'Free delivery & pickup in AV service areas',
      'Attached interlocking lids (no tape needed)',
      'Sanitized and clean upon arrival',
    ],
  },
  {
    id: 'package50',
    name: '50 Tote Package',
    toteCount: 50,
    priceWeek1: 200,
    priceAdditionalWeek: 75,
    description: 'Designed for a 3-4 bedroom apartment or house. Fits all your major unpacked belongings.',
    features: [
      '50 Heavy-duty interlocking blue totes',
      '2 FREE metal moving dolly rentals',
      'Free delivery & pickup in AV service areas',
      'Attached interlocking lids (no tape needed)',
      'Sanitized and clean upon arrival',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Order Builder',
    toteCount: 0,
    priceWeek1: 0,
    priceAdditionalWeek: 0,
    description: 'Need more than 50 totes or custom configurations? Build your custom moving package.',
    features: [
      'Tailored number of blue plastic totes',
      'FREE moving dolly rentals proportional to size',
      'Attached interlocking lids',
      'Sanitized and clean upon arrival',
      'Customized pricing starting at $4 per extra tote',
    ],
  },
];

export const SERVICE_CITIES: ServiceCity[] = [
  { name: 'Palmdale', zipCodes: ['93550', '93551', '93552', '93591'], deliveryFee: 0, minOrderValue: 150 },
  { name: 'Lancaster', zipCodes: ['93534', '93535', '93536', '93539'], deliveryFee: 0, minOrderValue: 150 },
  { name: 'Rosamond', zipCodes: ['93560'], deliveryFee: 0, minOrderValue: 150 },
  { name: 'Quartz Hill', zipCodes: ['93536'], deliveryFee: 0, minOrderValue: 150 },
  { name: 'Acton', zipCodes: ['93510'], deliveryFee: 25, minOrderValue: 150 },
  { name: 'Littlerock', zipCodes: ['93543'], deliveryFee: 15, minOrderValue: 150 },
  { name: 'Mojave', zipCodes: ['93501'], deliveryFee: 30, minOrderValue: 150 },
];

export const EXTRA_TOTE_PRICES = {
  package25Rate: 5, // Extra totes cost $5 each under 25-tote package
  package50Rate: 4, // Extra totes cost $4 each under 50-tote package
  flatRate: 5,
};

export function calculateTotalEstimate(
  packageId: 'package25' | 'package50' | 'custom',
  weeks: number,
  extraTotesCount: number,
  cityName: string
): number {
  let total = 0;
  const numWeeks = Math.max(1, weeks);

  if (packageId === 'package25') {
    total += 150; // Week 1
    total += (numWeeks - 1) * 50; // Additional weeks
    total += extraTotesCount * EXTRA_TOTE_PRICES.package25Rate;
  } else if (packageId === 'package50') {
    total += 200; // Week 1
    total += (numWeeks - 1) * 75; // Additional weeks
    total += extraTotesCount * EXTRA_TOTE_PRICES.package50Rate;
  } else {
    // Custom package
    // Minimum 10 totes at $6 each or similar, but let's make it a clean sliding scale for custom:
    // Say $5/tote/week with a $100 minimum. Let's make it very clear and fair:
    const baseCount = Math.max(15, extraTotesCount);
    const rate = baseCount >= 40 ? 4 : 5;
    total += baseCount * rate; // Week 1 estimation
    total += (numWeeks - 1) * (baseCount * 1.5); // additional weeks cost 1.5 per tote
  }

  // Add delivery fee for city if applicable
  const city = SERVICE_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (city) {
    total += city.deliveryFee;
  }

  return total;
}

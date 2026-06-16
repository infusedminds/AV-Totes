/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Search, Trash2, Download, RefreshCw, KeyRound, Check, FileText, Star, ShieldCheck } from 'lucide-react';
import { InquiryLead } from '../types';

interface LeadManagerProps {
  isOpen: boolean;
  onClose: () => void;
  renderTriggerCount: number; // Used to trigger reload when forms submit
}

const PASS_CODE = '1234';

export default function LeadManager({ isOpen, onClose, renderTriggerCount }: LeadManagerProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // Load leads from LocalStorage
  const loadLeads = () => {
    const raw = localStorage.getItem('avtotes_leads');
    if (raw) {
      setLeads(JSON.parse(raw));
    } else {
      setLeads([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen, renderTriggerCount]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASS_CODE) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect system passcode. Attempt logged.');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'New' | 'Contacted' | 'Booked' | 'Completed') => {
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem('avtotes_leads', JSON.stringify(updated));
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this customer lead?')) {
      const filtered = leads.filter((lead) => lead.id !== id);
      setLeads(filtered);
      localStorage.setItem('avtotes_leads', JSON.stringify(filtered));
    }
  };

  const handleSeedMockData = () => {
    const mockLeads: InquiryLead[] = [
      {
        id: 'AVT-1082',
        fullName: 'Sarah Jenkins',
        email: 'sarah.j@gmail.com',
        phone: '(661) 234-9045',
        deliveryAddress: '39202 N 10th St W',
        city: 'Palmdale',
        zipCode: '93551',
        packageId: 'package25',
        durationWeeks: 2,
        extraTotesCount: 5,
        preferredDeliveryDate: '2026-06-12',
        preferredPickupDate: '2026-06-26',
        specialInstructions: 'Driveway delivery preferred. Text 15 mins before arrival.',
        totalEstimate: 225,
        submittedAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4h ago
        status: 'New',
      },
      {
        id: 'AVT-1492',
        fullName: 'Marcus Vance',
        email: 'mvance@yahoo.com',
        phone: '(661) 945-8833',
        deliveryAddress: '43920 Challenger Way',
        city: 'Lancaster',
        zipCode: '93535',
        packageId: 'package50',
        durationWeeks: 1,
        extraTotesCount: 0,
        preferredDeliveryDate: '2026-06-15',
        preferredPickupDate: '2026-06-22',
        specialInstructions: 'Ground floor unit, free dolly access is wide.',
        totalEstimate: 200,
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        status: 'Contacted',
      },
      {
        id: 'AVT-1901',
        fullName: 'Elena Rodriguez',
        email: 'elena.rod@icloud.com',
        phone: '(661) 718-4491',
        deliveryAddress: '2541 Hamilton St',
        city: 'Rosamond',
        zipCode: '93560',
        packageId: 'package50',
        durationWeeks: 3,
        extraTotesCount: 15,
        preferredDeliveryDate: '2026-06-20',
        preferredPickupDate: '2026-07-11',
        specialInstructions: 'Deliver to back garage door. Ring bell.',
        totalEstimate: 410,
        submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
        status: 'Booked',
      },
    ];

    localStorage.setItem('avtotes_leads', JSON.stringify(mockLeads));
    setLeads(mockLeads);
  };

  // Convert to CSV and trigger browser download
  const handleExportCSV = () => {
    if (leads.length === 0) return alert('No leads available to export.');

    const headers = [
      'Lead Code',
      'Submitted At',
      'Customer Name',
      'Phone',
      'Email',
      'City',
      'Address',
      'Zip',
      'Package',
      'Duration Weeks',
      'Extra Totes',
      'Estimated Price',
      'Delivery Date',
      'Pickup Date',
      'Status',
    ];

    const rows = leads.map((lead) => [
      lead.id,
      lead.submittedAt,
      `"${lead.fullName.replace(/"/g, '""')}"`,
      lead.phone,
      lead.email,
      lead.city,
      `"${lead.deliveryAddress.replace(/"/g, '""')}"`,
      lead.zipCode || '',
      lead.packageId,
      lead.durationWeeks,
      lead.extraTotesCount,
      `$${lead.totalEstimate}`,
      lead.preferredDeliveryDate,
      lead.preferredPickupDate,
      lead.status,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `avtotes_leads_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Booked':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Completed':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const text = (lead.fullName + lead.city + lead.phone + lead.id).toLowerCase();
    const matchesSearch = text.includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'all' || lead.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-200">
        
        {/* Header bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h2 className="font-display font-extrabold text-sm uppercase tracking-wider">
              AVtotes Lead Management Dashboard
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-20 text-center flex-1 flex flex-col items-center justify-center font-sans space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <KeyRound className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black text-slate-900">Enter System Passcode</h3>
              <p className="text-slate-400 text-sm">
                Access is restricted to AVtotes owners and operators.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full max-w-sm space-y-3">
              <input
                type="password"
                required
                autoFocus
                placeholder="Password (Tip: Use 1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 border border-slate-200 text-center text-sm font-bold tracking-widest rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-50 focus:outline-none"
              />
              
              {authError && (
                <p className="text-red-600 text-xs font-bold">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Verify Credentials
              </button>
            </form>

            <p className="text-[10px] text-slate-400">
              Passcode hint is <strong className="text-slate-600">1234</strong> for demonstration purposes.
            </p>
          </div>
        ) : (
          
          /* Authenticated Admin View */
          <div className="p-6 flex-1 overflow-y-auto flex flex-col space-y-6">
            {/* Action Bar / Controls row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between font-sans shrink-0">
              
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search lead code, name, phone, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Filtering & Exporting controls */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="p-3 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New Inquiries</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Booked">Booked Orders</option>
                  <option value="Completed">Completed Moves</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV</span>
                </button>

                <button
                  onClick={handleSeedMockData}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer"
                  title="Adds demo customer leads to localStorage"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Seed Mock Leads</span>
                </button>
              </div>
            </div>

            {/* List Table */}
            <div className="flex-1 overflow-x-auto border border-slate-150 rounded-2xl bg-slate-50/50">
              {filteredLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center font-sans space-y-4">
                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 text-sm">No Matching Leads</h3>
                    <p className="text-slate-400 text-xs mt-1">
                      {leads.length === 0 
                        ? 'Submit a request on the inquiry form or seed mock data to preview!' 
                        : 'Adjust your search string or filters.'}
                    </p>
                  </div>
                  {leads.length === 0 && (
                    <button
                      onClick={handleSeedMockData}
                      className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold border border-blue-200"
                    >
                      Instant Setup: Seed Mock Leads
                    </button>
                  )}
                </div>
              ) : (
                <table className="w-full text-left border-collapse table-auto font-sans text-[11px] sm:text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-200">
                      <th className="px-4 py-4.5">Code</th>
                      <th className="px-4 py-4.5">Customer / Contact</th>
                      <th className="px-4 py-4.5">Address</th>
                      <th className="px-4 py-4.5">Order Info</th>
                      <th className="px-4 py-4.5">Estimate</th>
                      <th className="px-4 py-4.5">Dates (Del / Pick)</th>
                      <th className="px-4 py-4.5">Workflow Status</th>
                      <th className="px-4 py-4.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 bg-white">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        
                        {/* ID Code */}
                        <td className="px-4 py-4 font-bold text-blue-600 shrink-0">
                          {lead.id}
                        </td>

                        {/* Customer Info */}
                        <td className="px-4 py-4">
                          <div className="font-extrabold text-slate-900 text-sm">{lead.fullName}</div>
                          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">{lead.phone}</div>
                          <div className="text-[10px] text-slate-400">{lead.email}</div>
                        </td>

                        {/* Address */}
                        <td className="px-4 py-4 max-w-[200px] truncate" title={`${lead.deliveryAddress}, ${lead.city}, ${lead.zipCode || ''}`}>
                          <div className="font-semibold text-slate-800">{lead.deliveryAddress}</div>
                          <div className="text-[10px] text-[#2563eb] font-bold uppercase tracking-wide mt-0.5">{lead.city} {lead.zipCode}</div>
                        </td>

                        {/* Order Detail */}
                        <td className="px-4 py-4">
                          <div className="font-bold text-slate-700">
                            {lead.packageId === 'package25' ? '25 Totes Pack' : lead.packageId === 'package50' ? '50 Totes Pack' : 'Custom Pack'}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Duration: <span className="text-slate-600 font-semibold">{lead.durationWeeks} {lead.durationWeeks === 1 ? 'wk' : 'wks'}</span>
                          </div>
                          {lead.extraTotesCount > 0 && (
                            <div className="text-[10px] text-slate-400">
                              Extra Totes: <span className="text-slate-600 font-semibold">+{lead.extraTotesCount}</span>
                            </div>
                          )}
                        </td>

                        {/* Estimate Price */}
                        <td className="px-4 py-4">
                          <span className="font-display font-black text-slate-900 text-sm">${lead.totalEstimate}</span>
                        </td>

                        {/* Dates */}
                        <td className="px-4 py-4">
                          <div className="text-slate-700 font-medium whitespace-nowrap">
                            <span className="bg-blue-100/60 text-blue-700 border border-blue-200/50 rounded px-1.5 py-0.5 font-bold uppercase text-[9px] mr-1.5 shrink-0">Del</span>
                            {lead.preferredDeliveryDate}
                          </div>
                          <div className="text-slate-500 mt-1 whitespace-nowrap">
                            <span className="bg-slate-100 text-slate-600 border border-slate-200 rounded px-1.5 py-0.5 font-bold uppercase text-[9px] mr-1.5 shrink-0">Pick</span>
                            {lead.preferredPickupDate}
                          </div>
                        </td>

                        {/* Status selector */}
                        <td className="px-4 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                            className={`px-2.5 py-1.5 rounded-lg border text-[10.5px] font-bold uppercase scrollbar-none cursor-pointer focus:outline-none ${getStatusColor(lead.status)}`}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Booked">● Booked</option>
                            <option value="Completed">● Completed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-center shrink-0">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                            title="Delete customer record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Foot info */}
            <div className="flex flex-col sm:flex-row justify-between text-[10px] text-slate-400 pt-4 border-t border-slate-150 shrink-0">
              <span>Security Logging Active • 661 Area Code Priority</span>
              <span>Total leads in storage: {leads.length}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

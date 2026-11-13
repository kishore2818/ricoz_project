'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { apiGet, apiPost } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Building2, Plus, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function CompaniesPage() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    industry: '',
    description: '',
    investmentDate: '2024-01-15',
    initialInvestmentAmount: 25000000,
    currentValuation: 35000000,
    ownershipPercentage: 40,
    fundId: '',
    currency: 'USD'
  });

  useEffect(() => {
    fetchInitial();
  }, []);

  async function fetchInitial() {
    try {
      setLoading(true);
      const [compRes, fundRes] = await Promise.all([
        apiGet('/companies'),
        apiGet('/funds')
      ]);

      if (compRes.success) setCompanies(compRes.data);
      if (fundRes.success) {
        setFunds(fundRes.data);
        if (fundRes.data.length > 0 && !form.fundId) {
          setForm(prev => ({ ...prev, fundId: fundRes.data[0]._id }));
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load portfolio companies');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCompany(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await apiPost('/companies', {
        ...form,
        initialInvestmentAmount: parseFloat(form.initialInvestmentAmount),
        currentValuation: parseFloat(form.currentValuation),
        ownershipPercentage: parseFloat(form.ownershipPercentage)
      });
      if (res.success) {
        setShowModal(false);
        fetchInitial();
      }
    } catch (err) {
      alert(err.message || 'Error creating company');
    } finally {
      setSubmitting(false);
    }
  }

  function formatMoney(amount) {
    if (!amount) return '$0';
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${Number(amount).toLocaleString()}`;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Companies</h1>
            <p className="text-sm text-gray-500">
              Active private equity portfolio investments, valuations, and filings
            </p>
          </div>
          {(user?.role === 'Admin' || user?.role === 'Analyst') && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Company
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading portfolio company directory..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : companies.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No companies onboarded"
            description="Add your first portfolio company to track quarterly performance."
            actionLabel="Add Company"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-6">Company Name</th>
                    <th className="py-3 px-6">Industry</th>
                    <th className="py-3 px-6">Fund Vehicle</th>
                    <th className="py-3 px-6">Invested Amount</th>
                    <th className="py-3 px-6">Current Valuation</th>
                    <th className="py-3 px-6">Reporting Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {companies.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        {c.name}
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-600">
                        {c.industry}
                      </td>
                      <td className="py-4 px-6 text-xs font-mono font-medium text-gray-700">
                        {c.fundId?.identifier || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-xs font-medium text-gray-800">
                        {formatMoney(c.initialInvestmentAmount)}
                      </td>
                      <td className="py-4 px-6 text-xs font-bold text-gray-900">
                        {formatMoney(c.currentValuation)}
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={c.reportingStatus} size="sm" />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/companies/${c._id}`}
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for Add Company */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Add Portfolio Company
              </h3>
              <form onSubmit={handleCreateCompany} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Acme Tech Solutions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    placeholder="e.g. Enterprise SaaS / Healthcare IT"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Associated PE Fund *
                  </label>
                  <select
                    required
                    value={form.fundId}
                    onChange={(e) => setForm({ ...form, fundId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {funds.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name} ({f.identifier})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Initial Investment ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.initialInvestmentAmount}
                      onChange={(e) =>
                        setForm({ ...form, initialInvestmentAmount: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Current Valuation ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.currentValuation}
                      onChange={(e) =>
                        setForm({ ...form, currentValuation: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Ownership %
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.ownershipPercentage}
                      onChange={(e) =>
                        setForm({ ...form, ownershipPercentage: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Investment Date
                    </label>
                    <input
                      type="date"
                      value={form.investmentDate}
                      onChange={(e) =>
                        setForm({ ...form, investmentDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                  >
                    {submitting ? 'Adding...' : 'Add Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


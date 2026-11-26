'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { apiGet, apiPost } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Landmark, Plus, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function FundsPage() {
  const { user } = useAuth();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    identifier: '',
    description: '',
    vintageYear: 2026,
    targetSize: 500000000,
    currency: 'USD',
    reportingPeriod: {
      quarter: 'Q3',
      year: 2026
    }
  });

  useEffect(() => {
    fetchFunds();
  }, []);

  async function fetchFunds() {
    try {
      setLoading(true);
      const res = await apiGet('/funds');
      if (res.success) {
        setFunds(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load funds');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFund(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await apiPost('/funds', {
        ...form,
        vintageYear: parseInt(form.vintageYear, 10),
        targetSize: parseFloat(form.targetSize)
      });
      if (res.success) {
        setShowModal(false);
        setForm({
          name: '',
          identifier: '',
          description: '',
          vintageYear: 2026,
          targetSize: 500000000,
          currency: 'USD',
          reportingPeriod: { quarter: 'Q3', year: 2026 }
        });
        fetchFunds();
      }
    } catch (err) {
      alert(err.message || 'Error creating fund');
    } finally {
      setSubmitting(false);
    }
  }

  function formatMoney(amount, currency = 'INR') {
    if (!amount) return '₹0';
    if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1)} Cr`;
    if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)} L`;
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">Investment Funds</span>{' '}
              <span className="block sm:inline">&amp; Mandates</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span className="block sm:inline">Manage fund vehicles,</span>{' '}
              <span className="block sm:inline">capital allocations, and reporting cadences</span>
            </p>
          </div>
          {user?.role === 'Admin' && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Add Fund
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading investment funds..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : funds.length === 0 ? (
          <EmptyState
            icon={Landmark}
            title="No investment funds configured"
            description="Create your first fund vehicle to associate portfolio company investments."
            actionLabel="Create Fund"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {funds.map((f) => (
              <div
                key={f._id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200">
                      {f.identifier}
                    </span>
                    <StatusBadge status={f.status} size="sm" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{f.name}</h2>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                    {f.description || 'No description provided.'}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-100 text-xs">
                    <div>
                      <p className="text-gray-400">Target Capital</p>
                      <p className="font-semibold text-gray-800">
                        {formatMoney(f.targetSize, f.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Vintage Year</p>
                      <p className="font-semibold text-gray-800">{f.vintageYear}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Active Companies</p>
                      <p className="font-semibold text-gray-800">{f.companyCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Reporting Cadence</p>
                      <p className="font-semibold text-gray-800">
                        {f.reportingPeriod?.quarter} {f.reportingPeriod?.year}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <Link
                    href={`/funds/${f._id}`}
                    className="flex items-center justify-between text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Fund Details & Assets <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Add Fund */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-5 sm:p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Add Investment Fund
              </h3>
              <form onSubmit={handleCreateFund} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Fund Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Apex Horizon Growth Capital IV"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Identifier *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.identifier}
                      onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                      placeholder="e.g. APEX-IV-GROWTH"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Vintage Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.vintageYear}
                      onChange={(e) => setForm({ ...form, vintageYear: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Target Fund Size (₹)
                    </label>
                    <input
                      type="number"
                      value={form.targetSize}
                      onChange={(e) => setForm({ ...form, targetSize: e.target.value })}
                      placeholder="e.g. 5000000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={form.currency}
                      onChange={(e) => setForm({ ...form, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Description & Strategy
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Fund thesis, target sectors, check size..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
                  >
                    {submitting ? 'Creating...' : 'Create Fund'}
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


'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function ValuationsPage() {
  const [valuations, setValuations] = useState([]);
  const [funds, setFunds] = useState([]);
  const [selectedFundId, setSelectedFundId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitial();
  }, [selectedFundId]);

  async function fetchInitial() {
    try {
      setLoading(true);
      setError(null);
      let query = selectedFundId ? `?fundId=${selectedFundId}` : '';
      const [valRes, fundRes] = await Promise.all([
        apiGet(`/analytics/valuations${query}`),
        apiGet('/funds')
      ]);

      if (valRes.success) setValuations(valRes.data);
      if (fundRes.success) setFunds(fundRes.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch valuations');
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(amount) {
    if (amount === null || amount === undefined) return '—';
    if (Math.abs(amount) >= 1e7) return `₹${(amount / 1e7).toFixed(1)} Cr`;
    if (Math.abs(amount) >= 1e5) return `₹${(amount / 1e5).toFixed(1)} L`;
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  }

  const chartData = valuations.map((v) => ({
    name: v.companyId?.name || 'Company',
    delta: Math.round((v.valuationChange / 1e7) * 10) / 10,
    growth: v.valuationGrowthPercent
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">Portfolio Valuation</span>{' '}
              <span className="block sm:inline">Analysis &amp; Ledgers</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fair market valuations pursuant to IPEV and ASC 820 mark-to-market guidelines
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <select
              value={selectedFundId}
              onChange={(e) => setSelectedFundId(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Funds</option>
              {funds.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name} ({f.identifier})
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Calculating QoQ valuation movements and cap table changes..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Chart: Valuation Changes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Quarterly Valuation Changes by Portfolio Asset (₹ Crores)
              </h2>
              {chartData.length === 0 ? (
                <p className="text-sm text-gray-500 py-10 text-center">
                  No valuation entries recorded.
                </p>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip formatter={(val) => [`${val >= 0 ? '+' : ''}₹${val} Cr`, 'Valuation Change']} />
                      <Bar dataKey="delta" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.delta >= 0 ? '#10b981' : '#ef4444'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Valuation Records Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Quarterly Mark-to-Market Valuation Ledger
              </h2>
              {valuations.length === 0 ? (
                <p className="text-sm text-gray-500 py-6 text-center">
                  No valuation records found.
                </p>
              ) : (
                <>
                  {/* Mobile / Tablet Responsive Cards: 2 or 3 in each row */}
                  <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {valuations.map((v) => {
                      const isPositive = v.valuationChange > 0;
                      const isNegative = v.valuationChange < 0;

                      return (
                        <div
                          key={v._id}
                          className="bg-slate-50/70 rounded-xl border border-gray-200 p-3.5 shadow-xs flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="text-sm font-bold text-gray-900 leading-tight">
                                  {v.companyId?.name}
                                </h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">
                                  {v.reportingQuarter} {v.reportingYear}
                                </p>
                              </div>
                              <StatusBadge status={v.verificationStatus} size="sm" />
                            </div>

                            <div className="grid grid-cols-2 gap-2 my-2.5 p-2 bg-white rounded-lg border border-gray-100 text-xs">
                              <div>
                                <span className="text-[10px] text-gray-400 block uppercase">Current Val</span>
                                <span className="font-mono font-bold text-gray-900">
                                  {formatMoney(v.currentValuation)}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-gray-400 block uppercase">Initial Cost</span>
                                <span className="font-mono text-gray-700">
                                  {formatMoney(v.initialInvestmentAmount)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-xs">
                            <span
                              className={`inline-flex items-center gap-1 font-bold ${
                                isPositive
                                  ? 'text-emerald-600'
                                  : isNegative
                                  ? 'text-red-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
                              {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
                              {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
                              {isPositive ? '+' : ''}
                              {formatMoney(v.valuationChange)}
                            </span>

                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                isPositive
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : isNegative
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {v.valuationGrowthPercent >= 0 ? '+' : ''}
                              {v.valuationGrowthPercent}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Full Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                          <th className="pb-3">Company</th>
                          <th className="pb-3">Period</th>
                          <th className="pb-3">Initial Cost</th>
                          <th className="pb-3">Prior Valuation</th>
                          <th className="pb-3">Current Valuation</th>
                          <th className="pb-3">Change (₹)</th>
                          <th className="pb-3">Growth (%)</th>
                          <th className="pb-3 text-right">Verification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {valuations.map((v) => {
                          const isPositive = v.valuationChange > 0;
                          const isNegative = v.valuationChange < 0;

                          return (
                            <tr key={v._id} className="hover:bg-gray-50 transition">
                              <td className="py-4 font-semibold text-gray-900">
                                {v.companyId?.name}
                              </td>
                              <td className="py-4 text-xs text-gray-600 font-medium">
                                {v.reportingQuarter} {v.reportingYear}
                              </td>
                              <td className="py-4 text-xs font-medium text-gray-700">
                                {formatMoney(v.initialInvestmentAmount)}
                              </td>
                              <td className="py-4 text-xs text-gray-600">
                                {formatMoney(v.previousValuation)}
                              </td>
                              <td className="py-4 text-xs font-bold text-gray-900">
                                {formatMoney(v.currentValuation)}
                              </td>
                              <td className="py-4 text-xs font-bold">
                                <span
                                  className={`inline-flex items-center gap-1 ${
                                    isPositive
                                      ? 'text-emerald-600'
                                      : isNegative
                                      ? 'text-red-600'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {isPositive && <ArrowUpRight className="w-3.5 h-3.5" />}
                                  {isNegative && <ArrowDownRight className="w-3.5 h-3.5" />}
                                  {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5" />}
                                  {isPositive ? '+' : ''}
                                  {formatMoney(v.valuationChange)}
                                </span>
                              </td>
                              <td className="py-4 text-xs font-bold">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                    isPositive
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : isNegative
                                      ? 'bg-red-50 text-red-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {v.valuationGrowthPercent >= 0 ? '+' : ''}
                                  {v.valuationGrowthPercent}%
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <StatusBadge status={v.verificationStatus} size="sm" />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


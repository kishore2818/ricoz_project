'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { BarChart3, Filter } from 'lucide-react';
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

const METRIC_OPTIONS = [
  'Revenue',
  'EBITDA',
  'Gross Profit',
  'Net Income',
  'Cash Balance',
  'Total Debt',
  'Annual Recurring Revenue (ARR)',
  'Employee Count',
  'Customer Count'
];

export default function KPIAnalyticsPage() {
  const [metricName, setMetricName] = useState('Revenue');
  const [kpis, setKpis] = useState([]);
  const [funds, setFunds] = useState([]);
  const [selectedFundId, setSelectedFundId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFunds();
  }, []);

  useEffect(() => {
    fetchKPIs();
  }, [metricName, selectedFundId]);

  async function fetchFunds() {
    try {
      const res = await apiGet('/funds');
      if (res.success) setFunds(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchKPIs() {
    try {
      setLoading(true);
      setError(null);
      let query = `?metricName=${encodeURIComponent(metricName)}`;
      if (selectedFundId) query += `&fundId=${selectedFundId}`;

      const res = await apiGet(`/analytics/kpis${query}`);
      if (res.success) {
        setKpis(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch KPI analytics');
    } finally {
      setLoading(false);
    }
  }

  const chartData = kpis.map((k) => ({
    name: k.companyId?.name || 'Company',
    value: typeof k.extractedValue === 'number'
      ? (metricName.includes('Count') ? k.extractedValue : Math.round((k.extractedValue / 1e6) * 10) / 10)
      : 0,
    period: `${k.reportingQuarter} ${k.reportingYear}`
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">Portfolio KPI</span>{' '}
              <span className="block sm:inline">Analytics &amp; Benchmarks</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Cross-asset comparative benchmarking and KPI trend analytics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-auto">
              <select
                value={metricName}
                onChange={(e) => setMetricName(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {METRIC_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    Metric: {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={selectedFundId}
                onChange={(e) => setSelectedFundId(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All PE Funds</option>
                {funds.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.name} ({f.identifier})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message={`Compiling ${metricName} metrics across portfolio companies...`} />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Chart */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                {metricName} Comparison {metricName.includes('Count') ? '(Count)' : '(₹ Cr)'}
              </h2>

              {chartData.length === 0 ? (
                <p className="text-sm text-gray-500 py-12 text-center">
                  No reported {metricName} values found for the selected filter.
                </p>
              ) : (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        formatter={(val) => [
                          metricName.includes('Count') ? val : `₹${val} Cr`,
                          metricName
                        ]}
                      />
                      <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? '#1d4ed8' : '#3b82f6'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Detailed Reported Metric Records
              </h2>
              {kpis.length === 0 ? (
                <p className="text-sm text-gray-500 py-6 text-center">
                  No records to display.
                </p>
              ) : (
                <>
                  {/* Mobile / Tablet Responsive Cards: 2 or 3 in each row */}
                  <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {kpis.map((kpi) => (
                      <div
                        key={kpi._id}
                        className="bg-slate-50/70 rounded-xl border border-gray-200 p-3.5 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <h3 className="text-xs font-bold text-gray-900 truncate">
                                {kpi.companyId?.name}
                              </h3>
                              <p className="text-[10px] text-gray-500">
                                {kpi.companyId?.industry} • {kpi.fundId?.identifier}
                              </p>
                            </div>
                            <StatusBadge status={kpi.verificationStatus} size="sm" />
                          </div>

                          <div className="my-2.5 p-2 bg-white rounded-lg border border-gray-100">
                            <span className="text-[10px] text-gray-400 block uppercase font-medium">{metricName}</span>
                            <span className="font-mono font-bold text-base text-gray-900">
                              {kpi.unitOrCurrency === 'USD' || kpi.unitOrCurrency === 'INR' ? '₹' : ''}
                              {Number(kpi.extractedValue).toLocaleString('en-IN')}{' '}
                              {kpi.unitOrCurrency !== 'USD' && kpi.unitOrCurrency !== 'INR' ? kpi.unitOrCurrency : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-[11px] text-gray-500">
                          <span className="font-medium text-gray-700">
                            {kpi.reportingQuarter} {kpi.reportingYear}
                          </span>
                          <span>p. {kpi.sourcePageNumber || 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Full Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                          <th className="pb-3">Company</th>
                          <th className="pb-3">Industry</th>
                          <th className="pb-3">Fund</th>
                          <th className="pb-3">Quarter</th>
                          <th className="pb-3">Value</th>
                          <th className="pb-3">Audit Source</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {kpis.map((kpi) => (
                          <tr key={kpi._id} className="hover:bg-gray-50 transition">
                            <td className="py-3 font-semibold text-gray-900">
                              {kpi.companyId?.name}
                            </td>
                            <td className="py-3 text-xs text-gray-500">
                              {kpi.companyId?.industry}
                            </td>
                            <td className="py-3 text-xs font-mono text-gray-600">
                              {kpi.fundId?.identifier}
                            </td>
                            <td className="py-3 text-xs font-medium text-gray-800">
                              {kpi.reportingQuarter} {kpi.reportingYear}
                            </td>
                            <td className="py-3 font-mono font-bold text-gray-900">
                              {kpi.unitOrCurrency === 'USD' || kpi.unitOrCurrency === 'INR' ? '₹' : ''}
                              {Number(kpi.extractedValue).toLocaleString('en-IN')}{' '}
                              {kpi.unitOrCurrency !== 'USD' && kpi.unitOrCurrency !== 'INR' ? kpi.unitOrCurrency : ''}
                            </td>
                            <td className="py-3 text-xs text-gray-500 max-w-xs truncate">
                              p. {kpi.sourcePageNumber || 1}
                            </td>
                            <td className="py-3 text-right">
                              <StatusBadge status={kpi.verificationStatus} size="sm" />
                            </td>
                          </tr>
                        ))}
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


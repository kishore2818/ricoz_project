'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { ArrowLeft, Building2, UploadCloud, TrendingUp, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchCompanyDetails();
  }, [id]);

  async function fetchCompanyDetails() {
    try {
      setLoading(true);
      const res = await apiGet(`/companies/${id}`);
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load company details');
    } finally {
      setLoading(false);
    }
  }

  function formatMoney(amount) {
    if (!amount) return '$0';
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(1)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(1)}M`;
    return `$${Number(amount).toLocaleString()}`;
  }

  const chartData = (data?.valuations || []).map(v => ({
    period: `${v.reportingQuarter} '${String(v.reportingYear).slice(-2)}`,
    valuation: v.currentValuation / 1e6
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading company profile and quarterly history..." />
          </div>
        ) : error || !data ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error || 'Company not found'}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded">
                      {data.industry}
                    </span>
                    <StatusBadge status={data.reportingStatus} size="sm" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Fund: {data.fundId?.name} ({data.fundId?.identifier})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/documents?companyId=${data._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    <UploadCloud className="w-4 h-4" /> Upload Report
                  </Link>
                </div>
              </div>

              <p className="text-sm text-gray-600 max-w-3xl mb-6">
                {data.description || 'No description available for this portfolio asset.'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg text-xs">
                <div>
                  <span className="text-gray-400">Initial Investment</span>
                  <p className="text-sm font-bold text-gray-900">
                    {formatMoney(data.initialInvestmentAmount)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Current Valuation</span>
                  <p className="text-sm font-bold text-gray-900">
                    {formatMoney(data.currentValuation)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Fund Ownership</span>
                  <p className="text-sm font-bold text-gray-900">
                    {data.ownershipPercentage}%
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Investment Date</span>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(data.investmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Valuation Trajectory Chart */}
            {chartData.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Valuation Trajectory ($ Millions)
                </h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="period" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip formatter={(val) => [`$${val}M`, 'Valuation']} />
                      <Line
                        type="monotone"
                        dataKey="valuation"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Extracted KPIs Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Latest Extracted Financial & Operational KPIs
              </h2>
              {(!data.kpis || data.kpis.length === 0) ? (
                <p className="text-sm text-gray-500 py-6 text-center">
                  No quarterly KPIs extracted yet. Upload a quarterly report to begin analysis.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                        <th className="pb-3">Metric Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Extracted Value</th>
                        <th className="pb-3">Unit</th>
                        <th className="pb-3">Period</th>
                        <th className="pb-3">Audit Source</th>
                        <th className="pb-3 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data.kpis.map((kpi) => (
                        <tr key={kpi._id} className="hover:bg-gray-50 transition">
                          <td className="py-3 font-semibold text-gray-900">
                            {kpi.metricName}
                          </td>
                          <td className="py-3 text-xs text-gray-500">{kpi.category}</td>
                          <td className="py-3 font-mono font-bold text-gray-900">
                            {kpi.extractedValue !== null
                              ? typeof kpi.extractedValue === 'number'
                                ? Number(kpi.extractedValue).toLocaleString()
                                : String(kpi.extractedValue)
                              : '— (Not Reported)'}
                          </td>
                          <td className="py-3 text-xs text-gray-600">{kpi.unitOrCurrency}</td>
                          <td className="py-3 text-xs text-gray-700">
                            {kpi.reportingQuarter} {kpi.reportingYear}
                          </td>
                          <td className="py-3 text-xs text-gray-500 max-w-xs truncate">
                            p. {kpi.sourcePageNumber || 1} ({kpi.sourceSnippet || 'Document'})
                          </td>
                          <td className="py-3 text-right">
                            <StatusBadge status={kpi.verificationStatus} size="sm" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


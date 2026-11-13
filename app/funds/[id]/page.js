'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { ArrowLeft, Building2, Landmark, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function FundDetailPage() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchFundDetail();
  }, [id]);

  async function fetchFundDetail() {
    try {
      setLoading(true);
      const res = await apiGet(`/funds/${id}`);
      if (res.success) {
        setFund(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch fund details');
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <Link
          href="/funds"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Funds
        </Link>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading fund portfolio breakdown..." />
          </div>
        ) : error || !fund ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error || 'Fund not found'}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Fund Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200">
                      {fund.identifier}
                    </span>
                    <StatusBadge status={fund.status} size="sm" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{fund.name}</h1>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/reports?fundId=${fund._id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    Generate LP Report
                  </Link>
                </div>
              </div>

              <p className="text-sm text-gray-600 max-w-3xl mb-6">
                {fund.description || 'No fund description.'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg text-xs">
                <div>
                  <span className="text-gray-400">Target Fund Size</span>
                  <p className="text-sm font-bold text-gray-900">
                    {formatMoney(fund.targetSize)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Vintage Year</span>
                  <p className="text-sm font-bold text-gray-900">{fund.vintageYear}</p>
                </div>
                <div>
                  <span className="text-gray-400">Reporting Quarter</span>
                  <p className="text-sm font-bold text-gray-900">
                    {fund.reportingPeriod?.quarter} {fund.reportingPeriod?.year}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Portfolio Assets</span>
                  <p className="text-sm font-bold text-gray-900">
                    {fund.companies?.length || 0} Assets
                  </p>
                </div>
              </div>
            </div>

            {/* Companies Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Portfolio Companies ({fund.companies?.length || 0})
                </h2>
                <Link
                  href="/companies"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Manage All Companies →
                </Link>
              </div>

              {!fund.companies || fund.companies.length === 0 ? (
                <p className="text-sm text-gray-500 py-8 text-center">
                  No portfolio companies associated with this fund yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                        <th className="pb-3">Company</th>
                        <th className="pb-3">Industry</th>
                        <th className="pb-3">Invested ($)</th>
                        <th className="pb-3">Current Valuation</th>
                        <th className="pb-3">Reporting Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {fund.companies.map((comp) => (
                        <tr key={comp._id} className="hover:bg-gray-50 transition">
                          <td className="py-4 font-semibold text-gray-900">
                            {comp.name}
                          </td>
                          <td className="py-4 text-xs text-gray-600">{comp.industry}</td>
                          <td className="py-4 text-xs font-medium text-gray-800">
                            {formatMoney(comp.initialInvestmentAmount)}
                          </td>
                          <td className="py-4 text-xs font-bold text-gray-900">
                            {formatMoney(comp.currentValuation)}
                          </td>
                          <td className="py-4">
                            <StatusBadge status={comp.reportingStatus} size="sm" />
                          </td>
                          <td className="py-4 text-right">
                            <Link
                              href={`/companies/${comp._id}`}
                              className="text-xs text-blue-600 hover:underline font-semibold"
                            >
                              View Asset
                            </Link>
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


'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MetricsCard from '@/components/MetricsCard';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { apiGet } from '@/services/api';
import {
  Landmark,
  Building2,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Calendar,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
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

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet('/analytics/dashboard');
      if (res.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(num) {
    if (num === null || num === undefined) return '₹0';
    if (num >= 1e7) return `₹${(num / 1e7).toFixed(1)} Cr`;
    if (num >= 1e5) return `₹${(num / 1e5).toFixed(1)} L`;
    if (num >= 1e3) return `₹${(num / 1e3).toFixed(1)}K`;
    return `₹${Number(num).toLocaleString('en-IN')}`;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Portfolio Overview</h1>
            <p className="text-sm text-slate-500 mt-1">
              Institutional PE LP Reporting • Q3 2026 Reporting Cadence
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/documents"
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm shadow-teal-500/20"
            >
              Upload Quarterly Report
            </Link>
            <Link
              href="/reports"
              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition shadow-xs"
            >
              Generate LP Packet
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Aggregating fund metrics and recent document extractions..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
            <p className="font-semibold">Unable to load dashboard</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-3 text-xs bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        ) : !data ? (
          <EmptyState
            icon={FileText}
            title="No reporting data available"
            description="Start by creating a fund and uploading quarterly portfolio company filings."
          />
        ) : (
          <div className="space-y-8">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MetricsCard
                title="Total Funds"
                value={data.totalFunds || 0}
                subtitle="Active PE fund vehicles"
                icon={Landmark}
              />
              <MetricsCard
                title="Portfolio Companies"
                value={data.totalCompanies || 0}
                subtitle="Active portfolio holdings"
                icon={Building2}
              />
              <MetricsCard
                title="Portfolio Valuation"
                value={formatCurrency(data.totalValuation)}
                subtitle="Aggregate mark-to-market"
                icon={TrendingUp}
                trend={`${data.avgRevenueGrowth >= 0 ? '+' : ''}${data.avgRevenueGrowth}% QoQ`}
                trendDirection={data.avgRevenueGrowth >= 0 ? 'up' : 'down'}
              />
              <MetricsCard
                title="Total Portfolio Revenue"
                value={formatCurrency(data.totalPortfolioRevenue)}
                subtitle="LTM quarterly consolidated"
                icon={DollarSign}
              />
            </div>

            {/* Document Pipeline Status Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MetricsCard
                title="Total Documents"
                value={data.totalDocuments || 0}
                subtitle="Uploaded quarterly filings"
                icon={FileText}
              />
              <MetricsCard
                title="Pending Processing"
                value={data.pendingProcessingDocs || 0}
                subtitle="Awaiting AI extraction"
                icon={Clock}
              />
              <MetricsCard
                title="Awaiting Review"
                value={data.needsReviewDocs || 0}
                subtitle="Extracted KPIs for signoff"
                icon={AlertCircle}
              />
              <MetricsCard
                title="Elevated Risks"
                value={data.highRiskCount || 0}
                subtitle="High-severity operational alerts"
                icon={ShieldAlert}
              />
            </div>

            {/* Middle Section: Recent Documents & Recent Risks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Documents Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Recent Quarterly Uploads
                  </h2>
                  <Link
                    href="/documents"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                {(!data.recentDocuments || data.recentDocuments.length === 0) ? (
                  <p className="text-sm text-gray-500 py-6 text-center">
                    No documents uploaded yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase">
                          <th className="pb-3">Document / Company</th>
                          <th className="pb-3">Period</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {data.recentDocuments.map((doc) => (
                          <tr key={doc._id} className="hover:bg-gray-50 transition">
                            <td className="py-3">
                              <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                {doc.originalName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {doc.companyId?.name || 'Unknown'}
                              </p>
                            </td>
                            <td className="py-3 text-xs font-medium text-gray-700">
                              {doc.reportingQuarter} {doc.reportingYear}
                            </td>
                            <td className="py-3">
                              <StatusBadge status={doc.status} size="sm" />
                            </td>
                            <td className="py-3 text-right">
                              <Link
                                href={`/analysis?documentId=${doc._id}`}
                                className="text-xs text-blue-600 hover:underline font-medium"
                              >
                                Review
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Recent Risks Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    AI-Identified Operational Risks
                  </h2>
                  <Link
                    href="/risks"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    View All <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                {(!data.recentRisks || data.recentRisks.length === 0) ? (
                  <p className="text-sm text-gray-500 py-6 text-center">
                    No active risks flagged across portfolio assets.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.recentRisks.map((risk) => (
                      <div
                        key={risk._id}
                        className="p-3.5 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100/70 transition"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              risk.severity === 'High'
                                ? 'bg-red-100 text-red-700'
                                : risk.severity === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {risk.severity} Severity
                          </span>
                          <span className="text-xs text-gray-500">
                            {risk.companyId?.name || 'Portfolio Co'}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {risk.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {risk.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


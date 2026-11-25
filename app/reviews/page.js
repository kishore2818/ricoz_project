'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet, apiPut, apiPost } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Check, X, Edit3, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('kpis'); // 'kpis' | 'analyses'
  const [pendingData, setPendingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editing state for KPI
  const [editingKpiId, setEditingKpiId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editReason, setEditReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet('/reviews/pending');
      if (res.success) {
        setPendingData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load pending review items');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyKPI(kpi) {
    try {
      setActionLoading(true);
      await apiPut(`/reviews/kpi/${kpi._id}`, {
        verificationStatus: 'Verified',
        reason: 'Confirmed by analyst against filing source'
      });
      fetchPending();
    } catch (err) {
      alert(err.message || 'Verification failed');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleSaveKPIEdit(kpiId) {
    try {
      setActionLoading(true);
      const numVal = parseFloat(editValue);
      await apiPut(`/reviews/kpi/${kpiId}`, {
        extractedValue: isNaN(numVal) ? editValue : numVal,
        verificationStatus: 'Corrected',
        reason: editReason || 'Manual adjustment by analyst'
      });
      setEditingKpiId(null);
      setEditValue('');
      setEditReason('');
      fetchPending();
    } catch (err) {
      alert(err.message || 'Correction failed');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleApproveAnalysis(analysisId) {
    try {
      setActionLoading(true);
      await apiPost(`/reviews/analysis/${analysisId}/approve`, {
        reviewerComments: 'Verified and approved for LP investor packet inclusion.'
      });
      fetchPending();
    } catch (err) {
      alert(err.message || 'Approval failed');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRejectAnalysis(analysisId) {
    const reason = prompt('Please provide reason for rejecting this quarterly analysis:');
    if (!reason) return;
    try {
      setActionLoading(true);
      await apiPost(`/reviews/analysis/${analysisId}/reject`, {
        reason
      });
      fetchPending();
    } catch (err) {
      alert(err.message || 'Rejection failed');
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verification & Human-in-the-Loop Signoff</h1>
            <p className="text-sm text-gray-500">
              Audit trail verification • Only approved figures are published to Limited Partner packets
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 gap-4 sm:gap-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'kpis'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pending KPI Verification ({pendingData?.pendingKPIs?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('analyses')}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'analyses'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quarterly Analyses Approval ({pendingData?.pendingAnalyses?.length || 0})
          </button>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Checking pending signoff items and audit queue..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : activeTab === 'kpis' ? (
          /* KPI Verification Tab */
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {!pendingData?.pendingKPIs || pendingData.pendingKPIs.length === 0 ? (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  All extracted KPIs have been verified
                </h3>
                <p className="text-xs text-gray-500">
                  No metrics currently awaiting human review in this queue.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-6">Company</th>
                      <th className="py-3 px-6">Metric Name</th>
                      <th className="py-3 px-6">Extracted Value</th>
                      <th className="py-3 px-6">Confidence</th>
                      <th className="py-3 px-6">Source Evidence</th>
                      <th className="py-3 px-6 text-right">Action Signoff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingData.pendingKPIs.map((kpi) => {
                      const isEditing = editingKpiId === kpi._id;

                      return (
                        <tr key={kpi._id} className="hover:bg-gray-50/80 transition">
                          <td className="py-4 px-6 font-semibold text-gray-900">
                            {kpi.companyId?.name}
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-700 font-medium">
                            {kpi.metricName}
                          </td>
                          <td className="py-4 px-6 font-mono font-bold text-gray-900">
                            {isEditing ? (
                              <div className="space-y-1.5">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="px-2 py-1 border border-blue-400 rounded text-xs w-28 font-mono"
                                  placeholder="New value"
                                />
                                <input
                                  type="text"
                                  value={editReason}
                                  onChange={(e) => setEditReason(e.target.value)}
                                  className="px-2 py-1 border border-gray-300 rounded text-[11px] w-48 block"
                                  placeholder="Audit reason (required)"
                                />
                              </div>
                            ) : (
                              <span>
                                {kpi.extractedValue !== null
                                  ? typeof kpi.extractedValue === 'number'
                                    ? Number(kpi.extractedValue).toLocaleString()
                                    : String(kpi.extractedValue)
                                  : 'null'}{' '}
                                <span className="text-xs text-gray-500 font-normal">
                                  {kpi.unitOrCurrency}
                                </span>
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-xs font-semibold text-gray-700">
                            {Math.round((kpi.confidence || 0) * 100)}%
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-500 max-w-xs truncate" title={kpi.sourceSnippet}>
                            p. {kpi.sourcePageNumber || 1} ({kpi.sourceSnippet || 'Document'})
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            {isEditing ? (
                              <div className="inline-flex items-center gap-1">
                                <button
                                  onClick={() => handleSaveKPIEdit(kpi._id)}
                                  disabled={actionLoading}
                                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingKpiId(null)}
                                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => handleVerifyKPI(kpi)}
                                  disabled={actionLoading}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold"
                                >
                                  <Check className="w-3 h-3" /> Verify
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingKpiId(kpi._id);
                                    setEditValue(kpi.extractedValue || '');
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-xs font-semibold"
                                >
                                  <Edit3 className="w-3 h-3" /> Correct
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Analyses Approval Tab */
          <div className="space-y-4">
            {!pendingData?.pendingAnalyses || pendingData.pendingAnalyses.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  All quarterly filings have been approved
                </h3>
                <p className="text-xs text-gray-500">
                  Ready to compile and generate finalized Limited Partner reporting packets.
                </p>
              </div>
            ) : (
              pendingData.pendingAnalyses.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-gray-900">
                        {item.companyId?.name} — {item.reportingQuarter} {item.reportingYear}
                      </h3>
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.executiveSummary}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.financialHighlights?.slice(0, 3).map((h, i) => (
                        <span key={i} className="text-[11px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleRejectAnalysis(item._id)}
                      disabled={actionLoading}
                      className="flex-1 sm:flex-none text-center px-4 py-2 sm:py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveAnalysis(item._id)}
                      disabled={actionLoading}
                      className="flex-1 sm:flex-none text-center px-4 py-2 sm:py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-xs font-semibold transition shadow-sm"
                    >
                      Approve for LP Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}


'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import EmptyState from '@/components/EmptyState';
import { apiGet } from '@/services/api';
import {
  Brain,
  FileText,
  Building2,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import Link from 'next/link';

function AnalysisContent() {
  const searchParams = useSearchParams();
  const docIdParam = searchParams.get('documentId');

  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState(docIdParam || '');
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingDocs, setFetchingDocs] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (selectedDocId) {
      fetchAnalysis(selectedDocId);
    }
  }, [selectedDocId]);

  async function fetchDocuments() {
    try {
      setFetchingDocs(true);
      const res = await apiGet('/documents');
      if (res.success) {
        setDocuments(res.data);
        if (!selectedDocId && res.data.length > 0) {
          // Select the first completed or needs review doc
          const readyDoc = res.data.find(d => d.status !== 'Uploaded' && d.status !== 'Pending') || res.data[0];
          setSelectedDocId(readyDoc._id);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFetchingDocs(false);
    }
  }

  async function fetchAnalysis(docId) {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet(`/analysis/document/${docId}`);
      if (res.success) {
        setAnalysisData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load analysis for selected document');
      setAnalysisData(null);
    } finally {
      setLoading(false);
    }
  }

  function formatKPIValue(val, unit) {
    if (val === null || val === undefined) return 'null (Not Reported)';
    const num = typeof val === 'number' ? val : Number(val);
    if (isNaN(num)) return String(val);
    if (unit === 'USD' || unit === 'INR' || !unit || unit === '$' || unit === '₹') {
      if (Math.abs(num) >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
      if (Math.abs(num) >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
      return `₹${num.toLocaleString('en-IN')}`;
    }
    return `${num.toLocaleString('en-IN')} ${unit}`;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">AI Document Intelligence</span>{' '}
              <span className="block sm:inline">&amp; Insights</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-normal max-w-xl">
              <span className="block sm:inline">Audit-mapped KPI extractions, operational narrative syntheses,</span>{' '}
              <span className="block sm:inline">and automated risk scoring</span>
            </p>
          </div>
          {/* Document Picker */}
          {documents.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full md:w-auto">
              <label className="text-xs font-semibold text-gray-700 shrink-0">Select Filing:</label>
              <select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                {documents.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.companyId?.name} — {d.reportingQuarter} {d.reportingYear} ({d.originalName})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {fetchingDocs ? (
          <div className="py-24">
            <LoadingSpinner message="Scanning processed document intelligence repository..." />
          </div>
        ) : documents.length === 0 ? (
          <EmptyState
            icon={Brain}
            title="No analyzed documents available"
            description="Upload and process quarterly reports in the Documents section to generate AI analysis."
            actionLabel="Go to Documents"
            onAction={() => window.location.href = '/documents'}
          />
        ) : loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading extracted KPIs, narrative sections, and risk indicators..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : !analysisData ? (
          <p className="text-sm text-gray-500">Select a document to inspect analysis.</p>
        ) : (
          <div className="space-y-8">
            {/* Meta Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {analysisData.document?.companyId?.name}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      Fund: {analysisData.document?.fundId?.identifier}
                    </span>
                    <StatusBadge status={analysisData.document?.status} size="sm" />
                  </div>
                  <h2 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
                    <span className="block sm:inline">Quarterly Disclosure Analysis</span>{' '}
                    <span className="block sm:inline text-teal-700 font-mono text-sm sm:text-base">— {analysisData.document?.reportingQuarter} {analysisData.document?.reportingYear}</span>
                  </h2>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/reviews`}
                    className="w-full sm:w-auto text-center px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm"
                  >
                    Open Review &amp; Signoff
                  </Link>
                </div>
              </div>
            </div>

            {/* Extracted KPIs Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-4">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <span className="block sm:inline">Extracted Financial &amp;</span>{' '}
                    <span className="block sm:inline">Operational Metrics ({analysisData.kpis?.length || 0})</span>
                  </span>
                </h3>
                <span className="text-[11px] sm:text-xs text-gray-400">
                  Strict adherence: Null returned if metric is absent
                </span>
              </div>

              {!analysisData.kpis || analysisData.kpis.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No KPIs extracted for this document.
                </p>
              ) : (
                <>
                  {/* Mobile / Tablet Responsive Cards: 2 or 3 in each row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                    {analysisData.kpis.map((kpi) => (
                      <div
                        key={kpi._id}
                        className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/90 p-3.5 transition-all shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              {kpi.category}
                            </span>
                            <StatusBadge status={kpi.verificationStatus} size="sm" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 mb-1.5">
                            {kpi.metricName}
                          </h4>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-base sm:text-lg font-bold font-mono text-slate-900">
                              {formatKPIValue(kpi.extractedValue, kpi.unitOrCurrency)}
                            </span>
                            {kpi.isCalculated ? (
                              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                                Calculated
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                Reported
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Confidence: <strong className="text-slate-800">{Math.round((kpi.confidence || 0) * 100)}%</strong></span>
                          <span className="truncate max-w-[120px]" title={kpi.sourceSnippet}>
                            p. {kpi.sourcePageNumber || 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Detailed Tabular Breakdown */}
                  <div className="hidden lg:block overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                          <th className="py-3 px-4">KPI Name</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Extracted Value</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Confidence</th>
                          <th className="py-3 px-4">Source Snippet / Page</th>
                          <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {analysisData.kpis.map((kpi) => (
                          <tr key={`table-${kpi._id}`} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-4 font-semibold text-slate-900">{kpi.metricName}</td>
                            <td className="py-3 px-4 text-xs text-slate-500">{kpi.category}</td>
                            <td className="py-3 px-4 font-mono font-bold text-teal-700">
                              {formatKPIValue(kpi.extractedValue, kpi.unitOrCurrency)}
                            </td>
                            <td className="py-3 px-4 text-xs">
                              {kpi.isCalculated ? (
                                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">Calculated</span>
                              ) : (
                                <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">Reported</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs font-semibold text-slate-700">
                              {Math.round((kpi.confidence || 0) * 100)}%
                            </td>
                            <td className="py-3 px-4 text-xs text-slate-500 max-w-xs truncate" title={kpi.sourceSnippet}>
                              p. {kpi.sourcePageNumber || 1} ({kpi.sourceSnippet || 'Document'})
                            </td>
                            <td className="py-3 px-4 text-right">
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

            {/* Operational Narratives (2 or 3 in each row) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <span className="block sm:inline">Institutional Operational</span>{' '}
                  <span className="block sm:inline">Commentary (ILPA Aligned)</span>
                </span>
              </h3>
              {!analysisData.narratives || analysisData.narratives.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No operational commentary extracted.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {analysisData.narratives.map((narr) => (
                    <div
                      key={narr._id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-sm transition flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="line-clamp-1">{narr.sectionTitle}</span>
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed mb-2">
                          {narr.summaryText}
                        </p>
                      </div>
                      {narr.supportingEvidence && (
                        <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                          Source: {narr.supportingEvidence}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Identified Risks Section (2 or 3 in each row) */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  <span className="block sm:inline">Identified Business &amp;</span>{' '}
                  <span className="block sm:inline">Financial Risks ({analysisData.risks?.length || 0})</span>
                </span>
              </h3>
              {!analysisData.risks || analysisData.risks.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No active risks flagged.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {analysisData.risks.map((risk) => (
                    <div
                      key={risk._id}
                      className={`p-4 rounded-xl border shadow-xs flex flex-col justify-between ${
                        risk.severity === 'High'
                          ? 'border-red-200 bg-red-50/40'
                          : risk.severity === 'Medium'
                          ? 'border-amber-200 bg-amber-50/40'
                          : 'border-teal-200 bg-teal-50/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              risk.severity === 'High'
                                ? 'bg-red-100 text-red-800'
                                : risk.severity === 'Medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}
                          >
                            {risk.severity} Severity
                          </span>
                          <span className="text-[11px] text-slate-400 truncate">
                            p. {risk.sourcePage || 1}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 leading-snug">
                          {risk.title}
                        </h4>
                        <p className="text-xs text-slate-700 mb-3 leading-relaxed">
                          {risk.description}
                        </p>
                      </div>
                      <div className="p-2.5 bg-white/90 rounded-lg border border-slate-200/80 text-xs text-slate-800">
                        <span className="font-bold text-slate-900 block mb-0.5">Recommended Action:</span>
                        <span className="text-[11px] text-slate-600">{risk.recommendedAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading analysis..." />}>
      <AnalysisContent />
    </Suspense>
  );
}

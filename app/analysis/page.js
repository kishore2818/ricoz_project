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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Document Intelligence & Insights</h1>
            <p className="text-sm text-gray-500">
              Audit-mapped KPI extractions, operational narrative syntheses, and automated risk scoring
            </p>
          </div>
          {/* Document Picker */}
          {documents.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-700">Select Filing:</label>
              <select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {analysisData.document?.companyId?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Fund: {analysisData.document?.fundId?.identifier}
                    </span>
                    <StatusBadge status={analysisData.document?.status} size="sm" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Quarterly Disclosure Analysis — {analysisData.document?.reportingQuarter} {analysisData.document?.reportingYear}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/reviews`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    Open Review & Signoff
                  </Link>
                </div>
              </div>
            </div>

            {/* Extracted KPIs Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Extracted Financial & Operational Metrics ({analysisData.kpis?.length || 0})
                </h3>
                <span className="text-xs text-gray-400">
                  Strict adherence: Null returned if metric is absent
                </span>
              </div>

              {!analysisData.kpis || analysisData.kpis.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No KPIs extracted for this document.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 text-xs uppercase">
                        <th className="pb-3">KPI Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Extracted Value</th>
                        <th className="pb-3">Unit</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Confidence</th>
                        <th className="pb-3">Source Snippet / Page</th>
                        <th className="pb-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {analysisData.kpis.map((kpi) => (
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
                              : <span className="text-gray-400 italic font-normal">null (Not Reported)</span>}
                          </td>
                          <td className="py-3 text-xs text-gray-600">{kpi.unitOrCurrency}</td>
                          <td className="py-3 text-xs">
                            {kpi.isCalculated ? (
                              <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">
                                Calculated
                              </span>
                            ) : (
                              <span className="text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-medium">
                                Reported
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-xs font-semibold text-gray-700">
                            {Math.round((kpi.confidence || 0) * 100)}%
                          </td>
                          <td className="py-3 text-xs text-gray-500 max-w-xs truncate" title={kpi.sourceSnippet}>
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

            {/* Operational Narratives (9 Standard PE Sections) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                Institutional Operational Commentary (ILPA Aligned)
              </h3>
              {!analysisData.narratives || analysisData.narratives.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No operational commentary extracted.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisData.narratives.map((narr) => (
                    <div
                      key={narr._id}
                      className="p-4 rounded-lg border border-gray-100 bg-gray-50/60 hover:bg-gray-50 transition"
                    >
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        {narr.sectionTitle}
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed mb-2">
                        {narr.summaryText}
                      </p>
                      {narr.supportingEvidence && (
                        <p className="text-[11px] text-gray-400 italic">
                          Source: {narr.supportingEvidence}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Identified Risks Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Identified Business & Financial Risks ({analysisData.risks?.length || 0})
              </h3>
              {!analysisData.risks || analysisData.risks.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  No active risks flagged.
                </p>
              ) : (
                <div className="space-y-4">
                  {analysisData.risks.map((risk) => (
                    <div
                      key={risk._id}
                      className={`p-4 rounded-lg border ${
                        risk.severity === 'High'
                          ? 'border-red-200 bg-red-50/40'
                          : risk.severity === 'Medium'
                          ? 'border-amber-200 bg-amber-50/40'
                          : 'border-blue-200 bg-blue-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            risk.severity === 'High'
                              ? 'bg-red-100 text-red-800'
                              : risk.severity === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {risk.severity} Severity • {risk.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          Source: {risk.sourceDocument || 'Quarterly Filing'} (p. {risk.sourcePage || 1})
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{risk.title}</h4>
                      <p className="text-xs text-gray-700 mb-2">{risk.description}</p>
                      <div className="p-2.5 bg-white rounded border border-gray-200/80 text-xs text-gray-800">
                        <span className="font-semibold text-gray-900">Recommended Action: </span>
                        {risk.recommendedAction}
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

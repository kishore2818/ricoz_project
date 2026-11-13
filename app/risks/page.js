'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { ShieldAlert, AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export default function RisksPage() {
  const [risks, setRisks] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRisks();
  }, []);

  async function fetchRisks() {
    try {
      setLoading(true);
      setError(null);
      // Fetch dashboard metrics which contains populated recent risks, or documents analysis
      const res = await apiGet('/analytics/dashboard');
      if (res.success && res.data.recentRisks) {
        setRisks(res.data.recentRisks);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch risk indicators');
    } finally {
      setLoading(false);
    }
  }

  const filteredRisks = filterSeverity
    ? risks.filter((r) => r.severity === filterSeverity)
    : risks;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Risk Intelligence</h1>
            <p className="text-sm text-gray-500">
              AI-monitored operational vulnerabilities, margin compression alerts, and liquidity flags
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Severities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
            </select>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-800">
          <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <p>
            <span className="font-semibold">Compliance Note:</span> AI-generated risk signals are probabilistic recommendations for investment committee review. They do not constitute final audit conclusions until confirmed by an accredited analyst.
          </p>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Evaluating portfolio disclosure risk profiles..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : filteredRisks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900 mb-1">
              No elevated risk flags found
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              All portfolio disclosures are within normal operating parameters for this reporting period.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRisks.map((risk) => {
              const isHigh = risk.severity === 'High';
              const isMed = risk.severity === 'Medium';

              return (
                <div
                  key={risk._id}
                  className={`bg-white rounded-xl border p-6 shadow-sm flex flex-col justify-between ${
                    isHigh
                      ? 'border-red-300 ring-1 ring-red-100'
                      : isMed
                      ? 'border-amber-200'
                      : 'border-blue-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          isHigh
                            ? 'bg-red-100 text-red-800'
                            : isMed
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {risk.severity} Severity
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {risk.companyId?.name || 'Asset'}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-gray-900 mb-2">
                      {risk.title}
                    </h2>

                    <p className="text-xs text-gray-700 leading-relaxed mb-4">
                      {risk.description}
                    </p>

                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs mb-3 space-y-1">
                      <p className="text-gray-500 font-medium">
                        Evidence: <span className="text-gray-800 italic">{risk.supportingEvidence || 'Stated in quarterly filing'}</span>
                      </p>
                      <p className="text-gray-500 font-medium">
                        Document: <span className="text-gray-800 font-mono text-[11px]">{risk.sourceDocument || 'Filing'} (p. {risk.sourcePage || 1})</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900">
                    <span className="font-bold">Recommended Mitigation Cadence: </span>
                    {risk.recommendedAction}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}


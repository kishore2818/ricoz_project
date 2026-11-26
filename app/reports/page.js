'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import EmptyState from '@/components/EmptyState';
import { apiGet, apiPost } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { FileOutput, Download, Plus, FileText, CheckCircle2, Clock, X } from 'lucide-react';

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState({
    fundId: '',
    reportingQuarter: 'Q3',
    reportingYear: 2026,
    title: '',
    status: 'Approved'
  });

  useEffect(() => {
    fetchInitial();
  }, []);

  async function fetchInitial() {
    try {
      setLoading(true);
      setError(null);
      const [repRes, fundRes] = await Promise.all([
        apiGet('/reports'),
        apiGet('/funds')
      ]);

      if (repRes.success) setReports(repRes.data);
      if (fundRes.success) {
        setFunds(fundRes.data);
        if (fundRes.data.length > 0 && !form.fundId) {
          setForm(prev => ({
            ...prev,
            fundId: fundRes.data[0]._id,
            title: `${fundRes.data[0].name} — Q3 2026 LP Quarterly Investor Packet`
          }));
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load investor reports');
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate(e) {
    e.preventDefault();
    try {
      setGenerating(true);
      const res = await apiPost('/reports/generate', {
        ...form,
        reportingYear: parseInt(form.reportingYear, 10)
      });
      if (res.success) {
        setShowModal(false);
        fetchInitial();
      }
    } catch (err) {
      alert(err.message || 'Report generation failed');
    } finally {
      setGenerating(false);
    }
  }

  function handleDownload(reportId, fileName) {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    // Download via direct link or fetch
    fetch(`${apiUrl}/reports/${reportId}/download`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'LP_Quarterly_Report.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => alert(err.message));
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">Institutional LP</span>{' '}
              <span className="block sm:inline">Investor Packets</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span className="block sm:inline">Generate and download formal ILPA-compliant</span>{' '}
              <span className="block sm:inline">quarterly reporting packets for Limited Partners</span>
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> Generate LP Packet
          </button>
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Retrieving institutional LP reporting archive..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : reports.length === 0 ? (
          <EmptyState
            icon={FileOutput}
            title="No LP investor reports generated yet"
            description="Generate a PDF quarterly investor packet using verified portfolio company extractions."
            actionLabel="Generate Report"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div>
            {/* Mobile / Tablet Cards Grid (2 or 3 in each row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:hidden">
              {reports.map((rep) => (
                <div
                  key={`card-${rep._id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200">
                        {rep.fundId?.identifier}
                      </span>
                      <StatusBadge status={rep.status} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileOutput className="w-4 h-4 text-teal-600 shrink-0" />
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2">
                        {rep.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 py-1.5 px-2 bg-gray-50 rounded-lg mb-3">
                      <span>Period: {rep.reportingQuarter} {rep.reportingYear}</span>
                      <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(rep._id, rep.pdfFileName)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-xs font-bold transition"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF Download
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-6">Report Title</th>
                      <th className="py-3 px-6">Fund Vehicle</th>
                      <th className="py-3 px-6">Reporting Period</th>
                      <th className="py-3 px-6">Generated Date</th>
                      <th className="py-3 px-6">Report Status</th>
                      <th className="py-3 px-6 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reports.map((rep) => (
                      <tr key={rep._id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2.5">
                          <FileOutput className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>{rep.title}</span>
                        </td>
                        <td className="py-4 px-6 text-xs font-mono font-medium text-gray-700">
                          {rep.fundId?.identifier}
                        </td>
                        <td className="py-4 px-6 text-xs font-medium text-gray-800">
                          {rep.reportingQuarter} {rep.reportingYear}
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                          {new Date(rep.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge status={rep.status} size="sm" />
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDownload(rep._id, rep.pdfFileName)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-xs font-bold transition"
                          >
                            <Download className="w-3.5 h-3.5" /> PDF Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Generate Modal */}
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
                Generate Institutional LP Packet
              </h3>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    PE Fund *
                  </label>
                  <select
                    required
                    value={form.fundId}
                    onChange={(e) => {
                      const selFund = funds.find(f => f._id === e.target.value);
                      setForm({
                        ...form,
                        fundId: e.target.value,
                        title: selFund ? `${selFund.name} — ${form.reportingQuarter} ${form.reportingYear} LP Quarterly Investor Packet` : form.title
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {funds.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name} ({f.identifier})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Quarter *
                    </label>
                    <select
                      value={form.reportingQuarter}
                      onChange={(e) => setForm({ ...form, reportingQuarter: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.reportingYear}
                      onChange={(e) => setForm({ ...form, reportingYear: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Packet Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Marking Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Approved">Approved (Final LP Release)</option>
                    <option value="Draft">Draft (Internal Review Only)</option>
                  </select>
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
                    disabled={generating}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
                  >
                    {generating ? 'Compiling PDF Packet...' : 'Compile & Generate PDF'}
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


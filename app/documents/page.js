'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { apiGet, apiPost, apiUpload } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import {
  FileText,
  UploadCloud,
  Play,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Trash2,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [funds, setFunds] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingId, setProcessingId] = useState(null);

  const [form, setForm] = useState({
    fundId: '',
    companyId: '',
    reportingQuarter: 'Q3',
    reportingYear: 2026,
    file: null
  });

  useEffect(() => {
    fetchInitial();
  }, []);

  async function fetchInitial() {
    try {
      setLoading(true);
      const [docsRes, fundsRes, compRes] = await Promise.all([
        apiGet('/documents'),
        apiGet('/funds'),
        apiGet('/companies')
      ]);

      if (docsRes.success) setDocuments(docsRes.data);
      if (fundsRes.success) {
        setFunds(fundsRes.data);
        if (fundsRes.data.length > 0 && !form.fundId) {
          setForm(prev => ({ ...prev, fundId: fundsRes.data[0]._id }));
        }
      }
      if (compRes.success) {
        setCompanies(compRes.data);
        if (compRes.data.length > 0 && !form.companyId) {
          setForm(prev => ({ ...prev, companyId: compRes.data[0]._id }));
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!form.file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(10);
      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('fundId', form.fundId);
      formData.append('companyId', form.companyId);
      formData.append('reportingQuarter', form.reportingQuarter);
      formData.append('reportingYear', form.reportingYear);

      const res = await apiUpload('/documents/upload', formData, (progress) => {
        setUploadProgress(progress);
      });

      if (res.success) {
        setShowModal(false);
        setForm(prev => ({ ...prev, file: null }));
        fetchInitial();
      }
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  async function handleProcess(docId) {
    try {
      setProcessingId(docId);
      const res = await apiPost(`/documents/${docId}/process`, {});
      if (res.success) {
        fetchInitial();
      }
    } catch (err) {
      alert(err.message || 'Processing failed');
    } finally {
      setProcessingId(null);
    }
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              <span className="block sm:inline">Quarterly Document</span>{' '}
              <span className="block sm:inline">Repository &amp; Vault</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span className="block sm:inline">Upload PDF, Excel, and Word quarterly reports</span>{' '}
              <span className="block sm:inline">from portfolio companies for AI extraction</span>
            </p>
          </div>
          {(user?.role === 'Admin' || user?.role === 'Analyst') && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
            >
              <UploadCloud className="w-4 h-4" /> Upload Document
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Scanning document repository..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : documents.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No reports uploaded yet"
            description="Upload portfolio company quarterly statements (PDF, Excel, DOCX, CSV) to trigger automated KPI extraction."
            actionLabel="Upload Report"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div>
            {/* Mobile / Tablet Cards Grid (2 or 3 in each row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:hidden">
              {documents.map((doc) => (
                <div
                  key={`card-${doc._id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200">
                        {doc.fundId?.identifier || 'N/A'}
                      </span>
                      <StatusBadge status={doc.status} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                      <h3 className="text-xs font-bold text-gray-900 truncate" title={doc.originalName}>
                        {doc.originalName}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">{doc.companyId?.name || 'N/A'}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 py-1.5 px-2 bg-gray-50 rounded-lg mb-3">
                      <span>{doc.reportingQuarter} {doc.reportingYear}</span>
                      <span>{formatBytes(doc.fileSize)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
                    {doc.status === 'Uploaded' && (
                      <button
                        onClick={() => handleProcess(doc._id)}
                        disabled={processingId === doc._id}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-xs font-bold transition"
                      >
                        <Play className="w-3.5 h-3.5" />
                        {processingId === doc._id ? 'Analyzing...' : 'Process Document'}
                      </button>
                    )}
                    {(doc.status === 'Needs Review' || doc.status === 'Completed') && (
                      <Link
                        href={`/analysis?documentId=${doc._id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg text-xs font-bold transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Analysis
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-6">File Name</th>
                      <th className="py-3 px-6">Portfolio Company</th>
                      <th className="py-3 px-6">Fund</th>
                      <th className="py-3 px-6">Period</th>
                      <th className="py-3 px-6">File Size</th>
                      <th className="py-3 px-6">Processing Status</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                      <tr key={doc._id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-6 font-medium text-gray-900 flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                          <span className="truncate max-w-[220px]" title={doc.originalName}>
                            {doc.originalName}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-700 font-semibold">
                          {doc.companyId?.name || 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-xs font-mono text-gray-500">
                          {doc.fundId?.identifier || 'N/A'}
                        </td>
                        <td className="py-4 px-6 text-xs font-medium text-gray-800">
                          {doc.reportingQuarter} {doc.reportingYear}
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">
                          {formatBytes(doc.fileSize)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge status={doc.status} size="sm" />
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          {doc.status === 'Uploaded' && (
                            <button
                              onClick={() => handleProcess(doc._id)}
                              disabled={processingId === doc._id}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded text-xs font-semibold"
                            >
                              <Play className="w-3 h-3" />
                              {processingId === doc._id ? 'Analyzing...' : 'Process'}
                            </button>
                          )}
                          {(doc.status === 'Needs Review' || doc.status === 'Completed') && (
                            <Link
                              href={`/analysis?documentId=${doc._id}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded text-xs font-semibold"
                            >
                              <Eye className="w-3 h-3" /> View Analysis
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
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
                Upload Quarterly Report
              </h3>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    PE Fund *
                  </label>
                  <select
                    required
                    value={form.fundId}
                    onChange={(e) => setForm({ ...form, fundId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {funds.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name} ({f.identifier})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Portfolio Company *
                  </label>
                  <select
                    required
                    value={form.companyId}
                    onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Reporting Quarter *
                    </label>
                    <select
                      value={form.reportingQuarter}
                      onChange={(e) =>
                        setForm({ ...form, reportingQuarter: e.target.value })
                      }
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
                      Reporting Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={form.reportingYear}
                      onChange={(e) =>
                        setForm({ ...form, reportingYear: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Report File (PDF, XLSX, XLS, DOCX, CSV) *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.xlsx,.xls,.docx,.csv"
                    onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
                    className="w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>

                {uploading && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 text-right">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

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
                    disabled={uploading}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-semibold transition shadow-sm w-full sm:w-auto"
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
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


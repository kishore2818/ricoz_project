'use client';

import { useEffect, useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { apiGet, apiPost } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import {
  Users,
  Shield,
  UserCheck,
  UserPlus,
  Mail,
  Search,
  Filter,
  X,
  AlertCircle,
  CheckCircle2,
  Lock,
  Building,
  Briefcase
} from 'lucide-react';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Analyst',
    department: 'Private Equity Investment & Portfolio Ops'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);
      const res = await apiGet('/auth/users');
      if (res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.department && u.department.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Metrics
  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === 'Admin').length;
    const analysts = users.filter((u) => u.role === 'Analyst').length;
    const reviewers = users.filter((u) => u.role === 'Reviewer').length;
    return { total, admins, analysts, reviewers };
  }, [users]);

  async function handleCreateUser(e) {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setFormError('Full name must be at least 2 characters');
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError('Please enter a valid corporate email address');
      return;
    }
    if (!form.password || form.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      setSubmitting(true);
      const res = await apiPost('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        department: form.department.trim()
      });

      if (res.success) {
        setFormSuccess('User provisioned successfully!');
        setForm({
          name: '',
          email: '',
          password: '',
          role: 'Analyst',
          department: 'Private Equity Investment & Portfolio Ops'
        });
        setTimeout(() => {
          setShowModal(false);
          setFormSuccess('');
          fetchUsers();
        }, 800);
      }
    } catch (err) {
      setFormError(err.message || 'Failed to create user account');
    } finally {
      setSubmitting(false);
    }
  }

  if (user?.role !== 'Admin') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
          <div className="p-10 bg-amber-50 rounded-2xl border border-amber-200 text-center max-w-xl mx-auto mt-12 shadow-sm">
            <Shield className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900">Restricted Administration Area</h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              User creation and Role-Based Access Control (RBAC) governance is reserved exclusively for System Administrators.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <Shield className="text-teal-600" size={24} />
              User & RBAC Administration
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage internal investment analysts, audit reviewers, and executive administrator privileges.
            </p>
          </div>
          <button
            onClick={() => {
              setFormError('');
              setFormSuccess('');
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-bold shadow-md shadow-teal-500/20 transition-all cursor-pointer w-full sm:w-auto"
          >
            <UserPlus size={16} />
            <span>Add New User</span>
          </button>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Total Users</span>
              <Users size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Registered members</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Admins</span>
              <Shield size={16} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.admins}</p>
            <p className="text-[11px] text-purple-600 font-medium mt-0.5">Full governance</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Analysts</span>
              <UserCheck size={16} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.analysts}</p>
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">Upload & extraction</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <span>Reviewers</span>
              <CheckCircle2 size={16} className="text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.reviewers}</p>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">Audit & sign-off</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-gray-50 border border-gray-200 pl-9 pr-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={15} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 font-medium">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:bg-white focus:border-blue-600 transition"
            >
              <option value="ALL">All Roles ({users.length})</option>
              <option value="Admin">Admins ({stats.admins})</option>
              <option value="Analyst">Analysts ({stats.analysts})</option>
              <option value="Reviewer">Reviewers ({stats.reviewers})</option>
            </select>
          </div>
        </div>

        {/* Content Table */}
        {loading ? (
          <div className="py-24">
            <LoadingSpinner message="Loading user directory..." />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Department</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                        No team members found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block">{u.name}</span>
                            {u._id === user?._id && (
                              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                                (You)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-600">{u.email}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              u.role === 'Admin'
                                ? 'bg-purple-100 text-purple-800'
                                : u.role === 'Reviewer'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-500">{u.department || 'Fund Operations'}</td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-400 text-right">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-lg w-full p-5 sm:p-7 relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Provision New Platform User</h3>
                    <p className="text-xs text-gray-500">Create an authenticated analyst, reviewer, or administrator</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleCreateUser} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Corporate Email <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="vance@apexpe.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-9 pr-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Temporary Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Temporary Password <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="Minimum 6 characters"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-9 pr-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Role & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Assigned Role <span className="text-red-500 font-bold">*</span>
                    </label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                    >
                      <option value="Analyst">Analyst (Upload & Extractions)</option>
                      <option value="Reviewer">Reviewer (Audits & Sign-Off)</option>
                      <option value="Admin">Admin (Full System Governance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Valuation Committee"
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 transition"
                  >
                    {submitting ? 'Creating User...' : 'Provision User'}
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

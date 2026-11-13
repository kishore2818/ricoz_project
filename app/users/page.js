'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatusBadge from '@/components/StatusBadge';
import { apiGet } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Users, Shield, UserCheck, Mail } from 'lucide-react';

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (user?.role !== 'Admin') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 min-w-0 lg:ml-[260px] px-4 pt-20 pb-8 sm:px-6 lg:p-8">
          <div className="p-8 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <Shield className="w-10 h-10 text-amber-600 mx-auto mb-2" />
            <h2 className="text-base font-bold text-gray-900">Restricted Administration Area</h2>
            <p className="text-xs text-gray-600 mt-1">
              User and role management is reserved for System Administrators.
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User & RBAC Management</h1>
            <p className="text-sm text-gray-500">
              Role permissions: Admin (full system access), Analyst (upload & analyze), Reviewer (verification & signoff)
            </p>
          </div>
        </div>

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
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span>{u.name}</span>
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
                      <td className="py-4 px-6 text-xs text-gray-500">{u.department}</td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-gray-400 text-right">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


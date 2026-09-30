'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const AdminEventsPage = () => {
  const [creds, setCreds] = useState('');
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeader = (c) => ({ Authorization: `Basic ${c}` });

  const load = useCallback(async (c) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/event-requests', { headers: authHeader(c) });
      if (res.status === 401) {
        setError('Incorrect username or password');
        setAuthed(false);
        return false;
      }
      const data = await res.json();
      setRequests(data.requests || []);
      setAuthed(true);
      return true;
    } catch (e) {
      setError('Failed to load requests');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const c = btoa(`${username}:${password}`);
    const ok = await load(c);
    if (ok) setCreds(c);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/admin/event-requests/update-status/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader(creds) },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  };

  const exportCSV = () => {
    const cols = ['first_name', 'last_name', 'email', 'company', 'job_title', 'country', 'maturity', 'servicenow_status', 'status', 'submitted_at'];
    const header = cols.join(',');
    const escape = (v) => {
      const s = v == null ? '' : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = requests.map((r) => cols.map((c) => escape(r[c])).join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const badge = (status) => {
    const map = {
      Pending: 'bg-amber-400/20 text-amber-400',
      Confirmed: 'bg-green-500/20 text-green-400',
      Declined: 'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || 'bg-neutral-700 text-neutral-300'}`}>{status}</span>;
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 pt-24">
        <form onSubmit={login} className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-6">Event Requests — Admin</h1>
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <input className="w-full mb-3 px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" className="w-full mb-5 px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold">Sign in</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Event Requests <span className="text-neutral-500 text-base">({requests.length})</span></h1>
          <div className="flex gap-3">
            <Button onClick={() => load(creds)} variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">{loading ? 'Refreshing…' : 'Refresh'}</Button>
            <Button onClick={exportCSV} className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold">Export CSV</Button>
          </div>
        </div>

        <div className="overflow-x-auto border border-neutral-800 rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                {['Name', 'Email', 'Company', 'Title', 'Country', 'Maturity', 'ServiceNow', 'Status', 'Submitted', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 && (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-neutral-500">No requests yet.</td></tr>
              )}
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-neutral-800 text-neutral-300">
                  <td className="px-4 py-3 whitespace-nowrap text-white">{r.first_name} {r.last_name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.company}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.job_title}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.country}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.maturity || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.servicenow_status || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{badge(r.status)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-500">{r.submitted_at ? new Date(r.submitted_at).toLocaleString() : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(r.id, 'Confirmed')} className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs hover:bg-green-500/30">Confirm</button>
                      <button onClick={() => updateStatus(r.id, 'Declined')} className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30">Decline</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;

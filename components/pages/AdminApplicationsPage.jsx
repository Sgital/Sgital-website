'use client';

import React, { useState, useEffect } from 'react';
import { Users, Filter, Download, Eye, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, FileText, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GalleryAdminTab from '@/components/admin/GalleryAdminTab';

const AdminApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'contacts' | 'gallery'
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const statusColors = {
    new: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    reviewed: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    shortlisted: 'bg-green-500/10 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/30',
    responded: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = '';
      const response = await fetch(`${apiUrl}/api/admin/verify`, {
        headers: {
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        }
      });

      if (response.ok) {
        setAuthenticated(true);
        localStorage.setItem('adminAuth', btoa(`${credentials.username}:${credentials.password}`));
        fetchApplications();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const apiUrl = '';
      const auth = localStorage.getItem('adminAuth');
      
      // Fetch both applications and contacts
      const [appsResponse, contactsResponse] = await Promise.all([
        fetch(`${apiUrl}/api/applications/list`, {
          headers: { 'Authorization': `Basic ${auth}` }
        }),
        fetch(`${apiUrl}/api/contact/list`, {
          headers: { 'Authorization': `Basic ${auth}` }
        })
      ]);

      if (appsResponse.ok) {
        const appsData = await appsResponse.json();
        setApplications(appsData.applications || []);
      }
      
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        setContacts(contactsData.contacts || []);
      }
    } catch (err) {
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      const apiUrl = '';
      const auth = localStorage.getItem('adminAuth');
      const formData = new FormData();
      formData.append('status', newStatus);

      const response = await fetch(`${apiUrl}/api/applications/update-status/${appId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Basic ${auth}`
        },
        body: formData
      });

      if (response.ok) {
        fetchApplications();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const apiUrl = '';
      const auth = localStorage.getItem('adminAuth');
      const formData = new FormData();
      formData.append('status', newStatus);

      const response = await fetch(`${apiUrl}/api/contact/update-status/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Basic ${auth}`
        },
        body: formData
      });

      if (response.ok) {
        fetchApplications();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const exportToCSV = () => {
    if (activeTab === 'applications') {
      exportApplicationsCSV();
    } else {
      exportContactsCSV();
    }
  };

  const exportApplicationsCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Experience', 'SN Experience', 'Current Salary', 'Expected Salary', 'Notice Period', 'Status', 'Applied Date'];
    const rows = filteredApplications.map(app => [
      app.name,
      app.email,
      app.contact_number,
      app.position,
      app.total_experience,
      app.servicenow_experience,
      app.current_salary,
      app.expected_salary,
      app.notice_period,
      app.status,
      new Date(app.applied_at).toLocaleDateString()
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportContactsCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Subject', 'Message', 'Status', 'Submitted Date'];
    const rows = filteredContacts.map(contact => [
      contact.name,
      contact.email,
      contact.company || 'N/A',
      contact.phone || 'N/A',
      contact.subject,
      contact.message.replace(/,/g, ';'), // Replace commas in message
      contact.status,
      new Date(contact.submitted_at).toLocaleDateString()
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth) {
      setAuthenticated(true);
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const filteredApplications = applications.filter(app => {
    if (filterPosition !== 'all' && app.position !== filterPosition) return false;
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    return true;
  });

  const filteredContacts = contacts.filter(contact => {
    if (filterStatus !== 'all' && contact.status !== filterStatus) return false;
    return true;
  });

  if (!authenticated) {
    return (
      <>
        
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-neutral-400">Sign in to manage applications</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold py-3"
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      

      <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-neutral-400">
                {activeTab === 'applications' && `${filteredApplications.length} application(s) found`}
                {activeTab === 'contacts' && `${filteredContacts.length} contact(s) found`}
                {activeTab === 'gallery' && `Manage Life at Sgital photos`}
              </p>
            </div>
            <div className="flex gap-3">
              {(activeTab === 'applications' || activeTab === 'contacts') && (
                <>
                  <Button
                    onClick={fetchApplications}
                    variant="outline"
                    className="border-neutral-700 text-white hover:bg-neutral-800"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    onClick={exportToCSV}
                    className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              data-testid="admin-tab-applications"
              onClick={() => setActiveTab('applications')}
              className={`px-5 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'applications'
                  ? 'bg-amber-400 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Job Applications ({applications.length})
            </button>
            <button
              data-testid="admin-tab-contacts"
              onClick={() => setActiveTab('contacts')}
              className={`px-5 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-amber-400 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Contact Messages ({contacts.length})
            </button>
            <button
              data-testid="admin-tab-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`px-5 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-amber-400 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Gallery
            </button>
          </div>

          {/* Filters (only for applications/contacts) */}
          {(activeTab === 'applications' || activeTab === 'contacts') && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-amber-400" />
              <h3 className="text-white font-semibold">Filters</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {activeTab === 'applications' && (
                <div>
                  <label className="block text-neutral-400 text-sm mb-2">Position</label>
                  <select
                    value={filterPosition}
                    onChange={(e) => setFilterPosition(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">All Positions</option>
                    <option value="ServiceNow Senior Consultant">ServiceNow Senior Consultant</option>
                    <option value="ServiceNow Business Analyst">ServiceNow Business Analyst</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-neutral-400 text-sm mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  {activeTab === 'applications' && (
                    <>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </>
                  )}
                  {activeTab === 'contacts' && (
                    <option value="responded">Responded</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          )}

          {/* Blog admin tab removed — blog content now maintained in /app/frontend/src/data/blogData.js */}

          {/* Gallery admin tab */}
          {activeTab === 'gallery' && <GalleryAdminTab />}

          {/* Content based on active tab */}
          {(activeTab === 'applications' || activeTab === 'contacts') && (
            activeTab === 'applications' ? (
            // Applications content
            loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-neutral-400">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Applications Found</h3>
              <p className="text-neutral-400">Applications will appear here once candidates start applying</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app, index) => (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{app.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[app.status]}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-amber-400 font-medium mb-3">{app.position}</p>
                      <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Mail className="w-4 h-4" />
                          {app.email}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Phone className="w-4 h-4" />
                          {app.contact_number}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(app.applied_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedApp(selectedApp?.email === app.email ? null : app)}
                      variant="outline"
                      className="border-neutral-700 text-white hover:bg-neutral-800"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {selectedApp?.email === app.email ? 'Hide' : 'View'}
                    </Button>
                  </div>

                  {selectedApp?.email === app.email && (
                    <div className="mt-6 pt-6 border-t border-neutral-800">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-white font-semibold mb-4">Personal Information</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-neutral-500">Date of Birth:</span>
                              <span className="text-neutral-300 ml-2">{app.dob}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Hometown:</span>
                              <span className="text-neutral-300 ml-2">{app.hometown}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Address:</span>
                              <span className="text-neutral-300 ml-2">{app.contact_address}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Alternate Contact:</span>
                              <span className="text-neutral-300 ml-2">{app.alternate_contact || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-4">Professional Details</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-neutral-500">Total Experience:</span>
                              <span className="text-neutral-300 ml-2">{app.total_experience} years</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">ServiceNow Experience:</span>
                              <span className="text-neutral-300 ml-2">{app.servicenow_experience} years</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Certifications:</span>
                              <span className="text-neutral-300 ml-2">{app.certifications || 'None'}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Job Changes:</span>
                              <span className="text-neutral-300 ml-2">{app.job_changes}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Notice Period:</span>
                              <span className="text-neutral-300 ml-2">{app.notice_period}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-4">Education</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-neutral-500">Secondary:</span>
                              <p className="text-neutral-300 mt-1">{app.secondary_education}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Senior Secondary:</span>
                              <p className="text-neutral-300 mt-1">{app.senior_secondary}</p>
                            </div>
                            <div>
                              <span className="text-neutral-500">Graduation:</span>
                              <p className="text-neutral-300 mt-1">{app.graduation}</p>
                            </div>
                            {app.post_graduation && (
                              <div>
                                <span className="text-neutral-500">Post Graduation:</span>
                                <p className="text-neutral-300 mt-1">{app.post_graduation}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold mb-4">Compensation</h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-neutral-500">Current/Last Salary:</span>
                              <span className="text-neutral-300 ml-2">{app.current_salary}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500">Expected Salary:</span>
                              <span className="text-neutral-300 ml-2">{app.expected_salary}</span>
                            </div>
                            <div className="mt-4">
                              <span className="text-neutral-500">Resume:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <FileText className="w-4 h-4 text-amber-400" />
                                <span className="text-neutral-300 text-xs">{app.resume_filename}</span>
                                {app.resume_s3_url ? (
                                  <a
                                    href={app.resume_s3_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400 hover:text-amber-300 text-xs inline-flex items-center gap-1 ml-2"
                                  >
                                    <Download className="w-3 h-3" />
                                    Download
                                  </a>
                                ) : (
                                  <span className="text-neutral-500 text-xs ml-2">(Email attachment only)</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-neutral-800">
                        <Button
                          onClick={() => updateStatus(app._id || index, 'reviewed')}
                          variant="outline"
                          className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                          disabled={app.status === 'reviewed'}
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Mark Reviewed
                        </Button>
                        <Button
                          onClick={() => updateStatus(app._id || index, 'shortlisted')}
                          variant="outline"
                          className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                          disabled={app.status === 'shortlisted'}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Shortlist
                        </Button>
                        <Button
                          onClick={() => updateStatus(app._id || index, 'rejected')}
                          variant="outline"
                          className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                          disabled={app.status === 'rejected'}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
          ) : (
            // Contacts content
            loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-400">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
                <Mail className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Contact Messages Found</h3>
                <p className="text-neutral-400">Contact form submissions will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-amber-400/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[contact.status]}`}>
                            {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-amber-400 font-medium mb-3">{contact.subject}</p>
                        <div className="grid md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-neutral-400">
                              <Phone className="w-4 h-4" />
                              {contact.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(contact.submitted_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => setSelectedContact(selectedContact?.email === contact.email ? null : contact)}
                        variant="outline"
                        className="border-neutral-700 text-white hover:bg-neutral-800"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {selectedContact?.email === contact.email ? 'Hide' : 'View'}
                      </Button>
                    </div>

                    {selectedContact?.email === contact.email && (
                      <div className="mt-6 pt-6 border-t border-neutral-800">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="text-white font-semibold mb-4">Contact Information</h4>
                            <div className="space-y-3 text-sm">
                              <div>
                                <span className="text-neutral-500">Email:</span>
                                <span className="text-neutral-300 ml-2">{contact.email}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500">Phone:</span>
                                <span className="text-neutral-300 ml-2">{contact.phone || 'Not provided'}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500">Company:</span>
                                <span className="text-neutral-300 ml-2">{contact.company || 'Not provided'}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500">Subject:</span>
                                <span className="text-neutral-300 ml-2">{contact.subject}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-white font-semibold mb-4">Message</h4>
                            <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                              <p className="text-neutral-300 text-sm whitespace-pre-wrap">{contact.message}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-neutral-800">
                          <Button
                            onClick={() => updateContactStatus(contact._id || index, 'reviewed')}
                            variant="outline"
                            className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                            disabled={contact.status === 'reviewed'}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Mark Reviewed
                          </Button>
                          <Button
                            onClick={() => updateContactStatus(contact._id || index, 'responded')}
                            variant="outline"
                            className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                            disabled={contact.status === 'responded'}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Responded
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminApplicationsPage;
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

const ApplicationForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact_address: '',
    dob: '',
    hometown: '',
    contact_number: '',
    alternate_contact: '',
    email: '',
    secondary_education: '',
    senior_secondary: '',
    graduation: '',
    post_graduation: '',
    total_experience: '',
    servicenow_experience: '',
    certifications: '',
    job_changes: '0',
    current_salary: '',
    expected_salary: '',
    notice_period: 'I can join immediately',
    position: job.title
  });
  
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Resume file must be less than 10MB');
        return;
      }
      if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
        setError('Resume must be PDF, DOC, or DOCX format');
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('resume', resume);

      const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${apiUrl}/api/applications/submit`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit application');
      }

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-neutral-400">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Contact Number *</label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Alternate Contact</label>
          <input
            type="tel"
            name="alternate_contact"
            value={formData.alternate_contact}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Hometown *</label>
          <input
            type="text"
            name="hometown"
            value={formData.hometown}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Contact Address *</label>
        <textarea
          name="contact_address"
          value={formData.contact_address}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Secondary Education Details *</label>
        <textarea
          name="secondary_education"
          value={formData.secondary_education}
          onChange={handleChange}
          placeholder="Board, Percentage, Passing Year, Remarks"
          required
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Senior Secondary Education *</label>
        <textarea
          name="senior_secondary"
          value={formData.senior_secondary}
          onChange={handleChange}
          placeholder="Board, Percentage, Passing Year, Optional Subjects"
          required
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Graduation Details *</label>
        <textarea
          name="graduation"
          value={formData.graduation}
          onChange={handleChange}
          placeholder="University, Course/Degree Name, Specialization(s), Percentage, Passing Year"
          required
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Post Graduation (if any)</label>
        <textarea
          name="post_graduation"
          value={formData.post_graduation}
          onChange={handleChange}
          placeholder="University, Percentage, Passing Year, Specialization(s)"
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Total Experience (years) *</label>
          <input
            type="text"
            name="total_experience"
            value={formData.total_experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">ServiceNow Experience (years) *</label>
          <input
            type="text"
            name="servicenow_experience"
            value={formData.servicenow_experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">ServiceNow Certifications</label>
        <input
          type="text"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          placeholder="List your certifications"
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Total Job Changes *</label>
        <select
          name="job_changes"
          value={formData.job_changes}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
        >
          <option value="0">0 (This will be my first job)</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="5+">5+</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Current/Last Salary (Annual CTC) *</label>
          <input
            type="text"
            name="current_salary"
            value={formData.current_salary}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Expected Salary (Annual CTC) *</label>
          <input
            type="text"
            name="expected_salary"
            value={formData.expected_salary}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Notice Period *</label>
        <select
          name="notice_period"
          value={formData.notice_period}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-amber-400 transition-colors"
        >
          <option value="I can join immediately">I can join immediately</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="2-4 weeks">2-4 weeks</option>
          <option value="1-2 months">1-2 months</option>
          <option value="more than 2 months">More than 2 months</option>
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Upload Resume * (PDF, DOC, DOCX - Max 10MB)</label>
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-400 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            <span>{resume ? resume.name : 'Choose file'}</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting || !resume}
          className="flex-1 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-semibold"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;

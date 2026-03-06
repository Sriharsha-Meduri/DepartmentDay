import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_EVENTS } from '../data/mock';

export function Register() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { addRegistration } = useApp();
  const event = MOCK_EVENTS.find(e => e.id === eventId);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    regNo: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    photoUrl: ''
  });

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-4xl font-medium mb-4">Event Not Found</h1>
        <Link to="/events" className="bg-[var(--btn)] text-[var(--btn-text)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors">Back to Events</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      // Mock upload - create object URL
      setFormData({ ...formData, photoUrl: URL.createObjectURL(file) });
      setError('');
    }
  };

  const validateStep1 = () => {
    if (!formData.regNo || formData.regNo.length < 5) return 'Valid Registration Number is required';
    if (!formData.fullName || formData.fullName.length < 2) return 'Full Name must be at least 2 characters';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) return 'Valid Email is required';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) return 'Valid 10-digit Phone Number is required';
    if (!formData.department) return 'Department is required';
    if (!formData.year) return 'Year is required';
    return null;
  };

  const nextStep = () => {
    const err = step === 1 ? validateStep1() : validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      const newReg = {
        id: `REG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        eventId: event.id,
        ...formData,
        date: new Date().toISOString(),
        status: 'Confirmed' as const
      };
      
      addRegistration(newReg);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/events');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-8 lg:px-16 max-w-[800px] mx-auto min-h-screen flex flex-col">
      
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link to={`/event/${event.id}`} className="inline-flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={16} /> Back to Event
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">Register for {event.title}</h1>
        <p className="text-lg opacity-70 font-light">Complete the form below to secure your spot.</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-2 bg-[var(--card-subtle)] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--accent)]"
            initial={{ width: '50%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-sm font-medium opacity-60">Step {step} of 2</span>
      </div>

      <div className="bg-[var(--card)] backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-[var(--card-border)] shadow-lg relative overflow-hidden flex-1">
        
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-[var(--bg)] z-50 flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--highlight)] text-[#0a2e1f] flex items-center justify-center mb-8 shadow-lg">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-medium mb-4">Registration Successful!</h2>
              <p className="opacity-70 font-light text-lg mb-8">Your spot for {event.title} has been confirmed.</p>
              <p className="text-sm font-medium opacity-50 animate-pulse">Redirecting to events...</p>
            </motion.div>
          ) : (
            <motion.form 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col h-full"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-200">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              {step === 1 ? (
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Registration Number *</label>
                    <input 
                      type="text" name="regNo" value={formData.regNo} onChange={handleInputChange}
                      className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light text-[var(--text)]"
                      placeholder="e.g. CS2023001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Full Name *</label>
                    <input 
                      type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                      className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light text-[var(--text)]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Email Address *</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light text-[var(--text)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Phone Number *</label>
                    <input 
                      type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                      className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light text-[var(--text)]"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium opacity-80 mb-2">Department *</label>
                      <select 
                        name="department" value={formData.department} onChange={handleInputChange}
                        className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light appearance-none text-[var(--text)]"
                      >
                        <option value="">Select Dept</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="AIDS">AI & DS</option>
                        <option value="AIML">AI & ML</option>
                        <option value="CST">CST</option>
                        <option value="BME">BME</option>
                        <option value="CHEM">CHEM</option>
                        <option value="MBA">MBA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium opacity-80 mb-2">Year *</label>
                      <select 
                        name="year" value={formData.year} onChange={handleInputChange}
                        className="w-full bg-[var(--input-bg)] border border-[var(--card-border)] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 transition-all font-light appearance-none text-[var(--text)]"
                      >
                        <option value="">Select Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Profile Picture (Optional)</label>
                    <div className="border-2 border-dashed border-[var(--divider)] rounded-2xl p-8 text-center bg-[var(--card-subtle)] hover:bg-[var(--card-hover)] transition-colors relative">
                      <input 
                        type="file" accept="image/*" onChange={handlePhotoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {formData.photoUrl ? (
                        <div className="flex flex-col items-center gap-4">
                          <img src={formData.photoUrl} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                          <span className="text-sm font-medium opacity-60">Click to change</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3 opacity-60">
                          <Upload size={32} />
                          <span className="text-sm font-medium">Drag & drop or click to upload</span>
                          <span className="text-xs font-light">Max size: 2MB</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--divider)]">
                {step === 2 ? (
                  <button type="button" onClick={prevStep} className="px-8 py-4 rounded-full font-medium opacity-60 hover:opacity-100 transition-opacity">
                    Back
                  </button>
                ) : <div></div>}
                
                {step === 1 ? (
                  <button type="button" onClick={nextStep} className="bg-[var(--btn)] text-[var(--btn-text)] px-12 py-4 rounded-full font-medium hover:opacity-90 transition-all shadow-lg">
                    Continue
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[var(--highlight)] text-[#0a2e1f] px-12 py-4 rounded-full font-medium hover:opacity-90 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Processing <div className="w-4 h-4 border-2 border-[#0a2e1f] border-t-transparent rounded-full animate-spin"></div></>
                    ) : 'Confirm Registration'}
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

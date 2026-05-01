"use client";

import React, { useEffect, useState } from "react";
import { AdminConfirmModal } from "@/Components/admin/AdminConfirmModal";

interface IContact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  location?: string;
  category?: string;
  message: string;
  status: string;
  isRead: boolean;
  createdAt: string;
}

export default function InquirePage() {
  const [inquiries, setInquiries] = useState<IContact[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<IContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'New' | 'Read'>('All');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{type: 'read' | 'delete', id: string} | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/contact');
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.data || []);
      }
    } catch (error) {
      console.error("Error fetching inquiries", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    if (filter === 'All') return true;
    if (filter === 'New') return inq.status === 'new' || !inq.isRead;
    if (filter === 'Read') return inq.status === 'read' || inq.isRead;
    return true;
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`);
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status: 'read', isRead: true } : inq));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: 'read', isRead: true } : null);
        }
      }
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contact/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq._id !== id));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (error) {
      console.error("Error deleting inquiry", error);
    }
  };

  const requestMarkAsRead = (id: string) => {
    setConfirmAction({ type: 'read', id });
    setIsConfirmModalOpen(true);
  };

  const requestDelete = (id: string) => {
    setConfirmAction({ type: 'delete', id });
    setIsConfirmModalOpen(true);
  };

  const executeConfirmAction = async () => {
    if (!confirmAction) return;
    const { id, type } = confirmAction;
    if (type === 'read') {
      await handleMarkAsRead(id);
    } else if (type === 'delete') {
      await handleDelete(id);
    }
    setIsConfirmModalOpen(false);
    setConfirmAction(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden -mx-4 md:-mx-12 -mt-4 md:-mt-8">
      {/* Left Side: Inquiries List */}
      <section className={`${selectedInquiry ? 'hidden md:flex' : 'flex'} w-full md:w-2/5 flex-col border-r border-[#404849]/10 bg-[#131313]`}>
        <div className="p-8 pb-4">
          <h3 className="font-headline text-3xl font-bold text-[#e5e2e1] tracking-tight">Client Inquiries</h3>
          <p className="font-body text-sm text-[#c0c8c9] mt-1">Manage and respond to incoming messages</p>

          <div className="flex gap-2 mt-8">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] rounded-lg transition-transform active:scale-95 ${filter === 'All' ? 'bg-[#cec5b6] text-[#353025]' : 'bg-[#2a2a2a] text-[#c0c8c9] hover:text-[#e5e2e1]'}`}>
              All
            </button>
            <button 
              onClick={() => setFilter('New')}
              className={`px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] rounded-lg transition-colors ${filter === 'New' ? 'bg-[#cec5b6] text-[#353025]' : 'bg-[#2a2a2a] text-[#c0c8c9] hover:text-[#e5e2e1]'}`}>
              New
            </button>
            <button 
              onClick={() => setFilter('Read')}
              className={`px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] rounded-lg transition-colors ${filter === 'Read' ? 'bg-[#cec5b6] text-[#353025]' : 'bg-[#2a2a2a] text-[#c0c8c9] hover:text-[#e5e2e1]'}`}>
              Read
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto px-8 py-4 space-y-4">
          {loading ? (
            <div className="text-[#c0c8c9] text-sm py-4">Loading inquiries...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-[#c0c8c9] text-sm py-4">No inquiries found.</div>
          ) : (
            filteredInquiries.map((inquiry) => {
              const isNew = inquiry.status === 'new' || !inquiry.isRead;
              const isSelected = selectedInquiry?._id === inquiry._id;
              return (
                <div 
                  key={inquiry._id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`group relative p-5 rounded-lg border-l-2 transition-all duration-300 cursor-pointer ${
                    isSelected ? 'bg-[#2a2a2a] border-[#cec5b6]' : 
                    isNew ? 'bg-[#20201f] border-[#cec5b6] hover:bg-[#2a2a2a]' : 
                    'bg-[#1b1b1b] border-transparent hover:bg-[#20201f]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    {isNew ? (
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[#cec5b6] bg-[#cec5b6]/10 px-2 py-0.5 rounded">New</span>
                    ) : (
                      <span className="text-[0.6rem] font-bold uppercase tracking-widest text-stone-500 bg-stone-500/10 px-2 py-0.5 rounded">Read</span>
                    )}
                    <span className="text-[0.65rem] text-stone-500 font-body">{formatTime(inquiry.createdAt)}</span>
                  </div>
                  <h4 className={`font-semibold text-base mb-1 transition-colors ${isNew ? 'text-[#e5e2e1] group-hover:text-[#cec5b6]' : 'text-[#c0c8c9] group-hover:text-[#e5e2e1]'}`}>
                    {inquiry.name}
                  </h4>
                  <p className={`text-xs line-clamp-1 mb-4 ${isNew ? 'text-[#c0c8c9] italic' : 'text-stone-600'}`}>"{inquiry.message}"</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.65rem] text-stone-600 font-medium">{formatDate(inquiry.createdAt)}</span>
                    <button className="text-[0.65rem] font-bold uppercase tracking-tighter text-[#c0c8c9] border-b border-[#404849]/30 pb-0.5 hover:text-[#cec5b6] hover:border-[#cec5b6] transition-all">View Details</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Right Side: Inquiry Detail View */}
      <section className={`${selectedInquiry ? 'flex' : 'hidden md:flex'} w-full md:w-3/5 flex-grow flex-col bg-[#0e0e0e]/30 overflow-y-auto`}>
        {selectedInquiry ? (
          <div className="max-w-3xl mx-auto w-full p-6 md:p-12">
            {/* Actions Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="md:hidden flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-[#c0c8c9] hover:text-[#cec5b6] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to List
              </button>
              
              <div className="flex items-center gap-4 ml-auto">
                {(selectedInquiry.status === 'new' || !selectedInquiry.isRead) && (
                  <button onClick={() => requestMarkAsRead(selectedInquiry._id)} className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-[#c0c8c9] hover:text-[#cec5b6] transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Mark as Read
                  </button>
                )}
                <button onClick={() => requestDelete(selectedInquiry._id)} className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-widest text-[#c0c8c9] hover:text-[#ffb4ab] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Delete
                </button>
              </div>
            </div>
            <div className="bg-[#1b1b1b]/40 backdrop-blur-md rounded-xl p-6 sm:p-10 border border-[#404849]/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-[#404849]/10">
                <div className="w-16 h-16 shrink-0 bg-gradient-to-tr from-stone-800 to-stone-600 rounded-full flex items-center justify-center text-2xl font-headline font-bold text-stone-200">
                  {selectedInquiry.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="break-all sm:break-normal flex-grow w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#e5e2e1] mb-1">{selectedInquiry.name}</h2>
                      <p className="text-sm text-[#c0c8c9] font-body">{selectedInquiry.email}</p>
                    </div>
                    {selectedInquiry.category && (
                      <span className="self-start px-3 py-1 bg-[#2a2a2a] text-[#cec5b6] text-[0.65rem] uppercase tracking-widest rounded-full border border-[#404849]/30">
                        {selectedInquiry.category}
                      </span>
                    )}
                  </div>
                  <p className="text-[0.65rem] text-stone-500 uppercase tracking-[0.2em] mt-3">Inquiry received {formatDate(selectedInquiry.createdAt)} {formatTime(selectedInquiry.createdAt) ? `at ${formatTime(selectedInquiry.createdAt)}` : ''}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[#404849]/10">
                <div>
                  <h5 className="text-[0.65rem] font-bold uppercase tracking-widest text-stone-500 mb-1">Phone</h5>
                  <p className="text-[#e5e2e1] text-sm">{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <h5 className="text-[0.65rem] font-bold uppercase tracking-widest text-stone-500 mb-1">Event Date</h5>
                  <p className="text-[#e5e2e1] text-sm">{selectedInquiry.date || 'N/A'}</p>
                </div>
                <div>
                  <h5 className="text-[0.65rem] font-bold uppercase tracking-widest text-stone-500 mb-1">Location</h5>
                  <p className="text-[#e5e2e1] text-sm">{selectedInquiry.location || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h5 className="text-[0.65rem] font-bold uppercase tracking-widest text-[#cec5b6] mb-3">Message</h5>
                  <div className="text-[#c0c8c9] font-body leading-relaxed space-y-4 whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
            </div>

            <AdminConfirmModal
              isOpen={isConfirmModalOpen}
              title={confirmAction?.type === 'delete' ? 'Delete Inquiry' : 'Mark as Read'}
              message={confirmAction?.type === 'delete' ? 'Are you sure you want to permanently delete this inquiry? This action cannot be undone.' : 'Are you sure you want to mark this inquiry as read?'}
              confirmText={confirmAction?.type === 'delete' ? 'Delete' : 'Mark Read'}
              cancelText="Cancel"
              variant={confirmAction?.type === 'delete' ? 'danger' : 'primary'}
              onConfirm={executeConfirmAction}
              onCancel={() => {
                setIsConfirmModalOpen(false);
                setConfirmAction(null);
              }}
            />
          </div>
        ) : (
          <div className="flex bg-[#131313] items-center justify-center flex-grow text-stone-600 text-sm">
            Select an inquiry to view details
          </div>
        )}
      </section>
    </div>
  );
}
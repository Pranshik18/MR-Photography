"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit3, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { AdminConfirmModal } from '@/Components/admin/AdminConfirmModal';

interface Project {
  _id: string;
  title: string;
}

interface Review {
  _id: string;
  clientName: string;
  description: string;
  projectId?: { _id: string; title: string };
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    description: '',
    projectId: '',
    isApproved: true,
  });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'delete' | 'toggleApprove';
    data: Review | null;
  }>({
    isOpen: false,
    type: 'delete',
    data: null,
  });

  const fetchReviewsAndProjects = async () => {
    try {
      setIsLoading(true);
      const [reviewsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/review', { method: "GET", headers: { content: "application/json" } }),
        fetch('/api/user/project?all=true')
      ]);
      
      const reviewsData = await reviewsRes.json();
      const projectsData = await projectsRes.json();

      if (reviewsData.success) {
        setReviews(reviewsData.data);
      } else {
        toast.error(reviewsData.message || 'Failed to load reviews');
      }

      if (projectsData.success) {
        setProjects(projectsData.data);
      }
    } catch (error) {
      toast.error('Network error while loading data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsAndProjects();
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      clientName: '',
      description: '',
      projectId: '',
      isApproved: true,
    });
    setIsAdding(true);
  };

  const openEditForm = async (review: Review) => {
    setEditingId(review._id);
    setFormData({
      clientName: review.clientName,
      description: review.description,
      projectId: review.projectId?._id || '',
      isApproved: review.isApproved,
    });
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId 
        ? `/api/admin/review/${editingId}` 
        : '/api/admin/review';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? 'Review updated successfully' : 'Review added successfully');
        setIsAdding(false);
        setEditingId(null);
        fetchReviewsAndProjects(); 
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteReview = (review: Review) => {
    setModalState({
      isOpen: true,
      type: 'delete',
      data: review,
    });
  };

  const toggleApprovalReq = (review: Review) => {
    setModalState({
      isOpen: true,
      type: 'toggleApprove',
      data: review,
    });
  };

  const handleConfirmAction = async () => {
    if (!modalState.data) return;

    try {
      if (modalState.type === 'delete') {
        const res = await fetch(`/api/admin/review/${modalState.data._id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setReviews(reviews.filter(r => r._id !== modalState.data?._id));
          toast.success('Review deleted successfully');
        } else {
          toast.error('Failed to delete review');
        }
      } else if (modalState.type === 'toggleApprove') {
        const newValue = !modalState.data.isApproved;
        const res = await fetch(`/api/admin/review/${modalState.data._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: modalState.data.clientName,
            description: modalState.data.description,
            projectId: modalState.data.projectId?._id || null,
            isApproved: newValue,
          })
        });

        if (res.ok) {
          setReviews(reviews.map(r => r._id === modalState.data?._id ? { ...r, isApproved: newValue } : r));
          toast.success(newValue ? 'Review approved for public display' : 'Review concealed from public display');
        } else {
          toast.error('Failed to update status');
        }
      }
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setModalState({ isOpen: false, type: 'delete', data: null });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 pb-24 animate-in fade-in duration-700 relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-10"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-on-surface mb-2">
            {isAdding ? (editingId ? "Edit Review" : "Add New Review") : "Review Management"}
          </h2>
          <p className="text-stone-500 text-sm tracking-wide font-light">Curate and refine client testimonials across your site.</p>
        </div>

        {!isAdding ? (
          <button
            onClick={openAddForm}
            className="group flex items-center space-x-3 bg-tertiary text-on-tertiary px-8 py-4 rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-tertiary/10"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Review</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              setIsAdding(false);
              setEditingId(null);
            }}
            className="flex items-center space-x-2 text-stone-500 hover:text-stone-300 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            <span>Back to Archives</span>
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="relative max-w-4xl mx-auto py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <form onSubmit={handleSubmit} className="bg-stone-900/40 backdrop-blur-2xl p-6 sm:p-10 md:p-12 border border-outline-variant/10 shadow-2xl space-y-12 rounded-lg">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="col-span-1 md:col-span-1 group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName || ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface placeholder:text-stone-700 font-body transition-all focus:border-tertiary/40 rounded focus:outline-none"
                  placeholder="e.g. John & Sarah"
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-1 group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Linked Project (Optional)</label>
                <div className="relative">
                  <select
                    value={formData.projectId || ''}
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                    className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface appearance-none font-body transition-all cursor-pointer focus:border-tertiary/40 rounded focus:outline-none"
                  >
                    <option value="" className="bg-stone-950">None (General Review)</option>
                    {projects.map(project => (
                      <option key={project._id} value={project._id} className="bg-stone-950">
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-stone-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 group relative">
                <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-3 ml-1">Testimonial</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full bg-[#0e0e0e] border border-outline-variant/15 px-6 py-5 text-on-surface placeholder:text-stone-700 font-body transition-all focus:border-tertiary/40 rounded focus:outline-none resize-y"
                  placeholder="Write the client's testimonial here..."
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2 group relative flex items-center gap-4 border-t border-outline-variant/5 pt-8">
                <div className="flex flex-col">
                  <label className="block font-label text-[0.7rem] uppercase tracking-[0.15em] text-stone-500 mb-1 ml-1">Published Status</label>
                  <p className="text-[0.6rem] text-stone-600 uppercase tracking-widest ml-1">Make visible on the website</p>
                </div>
                <div className="ml-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      className="sr-only peer" 
                      type="checkbox"
                      checked={formData.isApproved}
                      onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-10 flex flex-col-reverse sm:flex-row items-center justify-end gap-6 sm:gap-8 border-t border-outline-variant/5">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="w-full sm:w-auto font-label text-[0.7rem] uppercase tracking-[0.2em] text-stone-500 hover:text-on-surface transition-colors py-4 sm:py-0"
              >
                Discard Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-tertiary text-on-tertiary font-label text-[0.75rem] uppercase tracking-[0.2em] font-bold px-12 py-5 rounded-lg shadow-xl shadow-tertiary/10 hover:shadow-tertiary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>{editingId ? 'Update Review' : 'Save Review'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 relative">
          {isLoading ? (
             <div className="xl:col-span-2 min-h-[40vh] flex flex-col items-center justify-center space-y-4">
               <Loader2 className="w-10 h-10 text-tertiary animate-spin opacity-50" />
               <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 animate-pulse">Fetching Feedback...</p>
             </div>
          ) : reviews.length === 0 ? (
             <div onClick={openAddForm} className="xl:col-span-2 relative group border-2 border-dashed border-outline-variant/20 p-20 flex flex-col items-center justify-center min-h-[400px] hover:border-tertiary/30 hover:bg-surface-low/20 transition-all duration-500 cursor-pointer rounded-xl">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Plus className="w-8 h-8 text-stone-600 group-hover:text-tertiary transition-colors" />
                </div>
                <h4 className="text-stone-400 font-headline font-bold tracking-widest uppercase text-xs mb-2">Request First Review</h4>
                <p className="text-stone-600 text-[10px] uppercase tracking-widest tracking-wide text-center max-w-[200px]">Add your first amazing client testimonial into the system.</p>
             </div>
          ) : (
            <>
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className={`relative group overflow-hidden glass-panel border border-outline-variant/10 p-8 flex flex-col h-full hover:bg-surface-low/60 transition-all duration-700 rounded-lg ${!review.isApproved ? 'grayscale opacity-60' : ''}`}
                >
                  <div className="absolute top-0 right-0 p-8">
                    <div className="flex items-center space-x-3 bg-surface-lowest/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{review.isApproved ? 'Public' : 'Hidden'}</span>
                      <div 
                        onClick={() => toggleApprovalReq(review)}
                        className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors duration-300 ${review.isApproved ? 'bg-tertiary' : 'bg-stone-800'}`}
                      >
                        <div className={`absolute top-0.5 w-3 h-3 bg-on-tertiary rounded-full transition-all duration-300 ${review.isApproved ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-tertiary font-bold">Client Testimonial</span>
                      <div className="px-2 py-1 rounded text-[8px] uppercase tracking-widest font-black bg-stone-800/40 text-stone-500 border border-stone-800">
                        {review.projectId ? "Linked Project" : "General"}
                      </div>
                    </div>
                    <h3 className="text-3xl font-headline font-extrabold tracking-tight text-stone-100 mb-2">{review.clientName}</h3>
                    {review.projectId && (
                      <p className="text-xs text-tertiary mt-1">
                        Linked to: <span className="font-semibold">{review.projectId.title}</span>
                      </p>
                    )}
                  </div>

                  <blockquote className="text-stone-300 font-light text-sm italic leading-relaxed mb-10 flex-1">
                    "{review.description}"
                  </blockquote>

                  <div className="flex items-center space-x-4 pt-8 border-t border-outline-variant/10">
                    <button
                      onClick={() => openEditForm(review)}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-surface-container-highest/30 text-stone-200 text-[9px] uppercase tracking-widest font-bold hover:bg-tertiary hover:text-on-tertiary transition-all duration-500 rounded"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Details</span>
                    </button>
                    <button
                      onClick={() => deleteReview(review)}
                      className="p-3 bg-surface-lowest/10 text-red-600 hover:text-error hover:bg-error-container/20 transition-all duration-300 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <div 
                onClick={openAddForm}
                className="relative group border border-dashed border-outline-variant/20 p-8 flex flex-col items-center justify-center h-full min-h-[350px] hover:border-tertiary/30 hover:bg-surface-low/20 transition-all duration-500 cursor-pointer rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Plus className="w-6 h-6 text-stone-600 group-hover:text-tertiary transition-colors" />
                </div>
                <h4 className="text-stone-400 font-headline font-bold tracking-widest uppercase text-[10px] mb-2">Log Further Feedback</h4>
                <p className="text-stone-600 text-[10px] text-center max-w-[180px] font-light tracking-wide uppercase">Add another testimonial to showcase.</p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[20%] w-[30%] h-[40%] bg-tertiary-container/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <AdminConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.type === 'delete' ? "Delete Review?" : "Change Visibility?"}
        message={
          modalState.type === 'delete' 
          ? "This action cannot be undone. The review will be permanently removed." 
          : `This review will be moved to ${modalState.data?.isApproved ? 'Private' : 'Public'} archives.`
        }
        confirmText={
          modalState.type === 'delete' 
          ? "Delete Review" 
          : "Update Status"
        }
        variant={modalState.type === 'delete' ? 'danger' : 'primary'}
        onConfirm={handleConfirmAction}
        onCancel={() => setModalState({ isOpen: false, type: 'delete', data: null })}
      />
    </div>
  );
}
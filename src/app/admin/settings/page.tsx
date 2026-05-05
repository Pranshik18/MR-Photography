'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, ShieldCheck, Loader2, Plus, Trash2, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import toast from 'react-hot-toast';
import { AdminConfirmModal } from '@/Components/admin/AdminConfirmModal';

export default function SettingsPage() {
  const { profile, setProfile } = useAdmin();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const homepageFileInputRef = useRef<HTMLInputElement>(null);

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const [isSavingHomepage, setIsSavingHomepage] = useState(false);
  const [homepageSettings, setHomepageSettings] = useState({
    title: '',
    subtitle: '',
    images: [] as { url: string; order: number; alt?: string }[]
  });
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/admin/user');
        const result = await response.json();
        
        if (result.success) {
          setProfile(result.data);
          setAdminProfile(result.data);
          setAvatarPreview(result.data.avatar);
        } else {
          toast.error(result.message || 'Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Connection error');
      } finally {
        setIsInitialLoading(false);
      }
    };

    const fetchHomepage = async () => {
      try {
        const response = await fetch('/api/admin/user/home');
        const result = await response.json();
        if (result.success) {
          setHomepageSettings({
            title: result.data.title || '',
            subtitle: result.data.subtitle || '',
            images: result.data.images || []
          });
        }
      } catch (error) {
        console.error('Error fetching homepage:', error);
      }
    };

    fetchProfile();
    fetchHomepage();
  }, []); 
  useEffect(() => {
    if (profile) {
      setAdminProfile(profile);
      setAvatarPreview(profile.avatar);
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image is too large (max 5MB)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      const response = await fetch('/api/admin/user/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: adminProfile.name,
          email: adminProfile.email,
          bio: adminProfile.bio,
          avatar: avatarPreview !== profile.avatar ? avatarPreview : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setProfile(result.data);
        toast.success('Settings updated successfully');
      } else {
        toast.error(result.message || 'Update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to connect to the server');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleHomepageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHomepage(true);

    try {
      const response = await fetch('/api/admin/user/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepageSettings),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Homepage settings updated');
      } else {
        toast.error(result.message || 'Update failed');
      }
    } catch (error) {
      console.error('Homepage update error:', error);
      toast.error('Connection failed');
    } finally {
      setIsSavingHomepage(false);
    }
  };

  const addHomepageImage = () => {
    homepageFileInputRef.current?.click();
  };

  const handleHomepageImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image is too large (max 10MB)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setHomepageSettings({
            ...homepageSettings,
            images: [
              ...homepageSettings.images, 
              { url: reader.result, order: homepageSettings.images.length }
            ]
          });

          if (homepageFileInputRef.current) homepageFileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeHomepageImage = () => {
    if (imageToDelete !== null) {
      const newImages = homepageSettings.images.filter((_, i) => i !== imageToDelete);

      const reorderedImages = newImages.map((img, i) => ({ ...img, order: i }));
      setHomepageSettings({ ...homepageSettings, images: reorderedImages });
      setIsDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...homepageSettings.images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      const reorderedImages = newImages.map((img, i) => ({ ...img, order: i }));
      setHomepageSettings({ ...homepageSettings, images: reorderedImages });
    }
  };

  const updateHomepageImage = (index: number, field: string, value: string | number) => {
    const newImages = [...homepageSettings.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setHomepageSettings({ ...homepageSettings, images: newImages });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsSavingPassword(true);

    try {
      const response = await fetch('/api/admin/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Password changed successfully');
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        toast.error(result.message || 'Password update failed');
      }
    } catch (error) {
      console.error('Password error:', error);
      toast.error('Failed to reach security server');
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-tertiary animate-spin opacity-50" />
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 animate-pulse">Initializing Studio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto animate-in fade-in duration-700 py-8 md:py-12 pb-24 px-4 sm:px-0">
      <header className="mb-8 md:mb-16">
        <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tighter text-on-surface mb-2">Settings</h2>
        <div className="w-12 h-0.5 bg-tertiary"></div>
      </header>

      <div className="space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 opacity-60">Admin Profile</h3>
            <span className="h-[1px] flex-1 bg-outline-variant/10 ml-6"></span>
          </div>

          <form onSubmit={handleProfileSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 blur-[100px] -mr-32 -mt-32 rounded-full transition-all duration-1000 group-hover:bg-tertiary/10"></div>
            
            <div className="relative flex flex-col md:flex-row gap-10 md:gap-12 items-center md:items-start">
              <div className="flex flex-col items-center group/avatar shrink-0 w-full md:w-auto">
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="relative cursor-pointer rounded-full p-1 border border-outline-variant/10 ring-0 ring-tertiary/20 hover:ring-8 transition-all duration-500">
                  <div className="w-32 h-32 rounded-full overflow-hidden border border-outline-variant/30 transition-transform duration-700 group-hover/avatar:scale-105 relative z-10 flex items-center justify-center bg-surface-container">
                    {avatarPreview ? (
                      <img 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover/avatar:grayscale-0" 
                        src={avatarPreview}
                      />
                    ) : (
                      <Camera className="w-10 h-10 text-stone-600" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity rounded-full z-20">
                    <Camera className="w-8 h-8 text-stone-200" />
                  </div>
                </div>
                <p className="mt-4 font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-hover/avatar:text-tertiary transition-colors">Edit Portrait</p>
              </div>
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10">
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Full Name</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="text" 
                    required
                    value={adminProfile.name || ''}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Email Address</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="email" 
                    required
                    value={adminProfile.email || ''}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Curator's Bio</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide resize-none focus:pl-1" 
                    rows={3}
                    value={adminProfile.bio || ''}
                    onChange={(e) => setAdminProfile({ ...adminProfile, bio: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button 
                disabled={isSavingProfile} 
                type="submit" 
                className="bg-tertiary text-on-tertiary w-full sm:w-auto px-10 py-4 font-body text-[10px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(206,197,182,0.3)] hover:-translate-y-1 transition-all duration-300 rounded-lg disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center space-x-3"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Persisting...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 opacity-60">Homepage Narrative</h3>
            <span className="h-[1px] flex-1 bg-outline-variant/10 ml-6"></span>
          </div>

          <form onSubmit={handleHomepageSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden group">
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Site Title</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="text" 
                    required
                    value={homepageSettings.title}
                    onChange={(e) => setHomepageSettings({ ...homepageSettings, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Subtitle</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="text" 
                    required
                    value={homepageSettings.subtitle}
                    onChange={(e) => setHomepageSettings({ ...homepageSettings, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Hero Archive (Images)</label>
                  <input 
                    type="file" 
                    ref={homepageFileInputRef} 
                    onChange={handleHomepageImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button 
                    type="button" 
                    onClick={addHomepageImage}
                    className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-tertiary hover:text-stone-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Upload New Frame</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homepageSettings.images.map((img, index) => (
                    <div key={index} className="relative group/item aspect-[4/5] rounded-lg overflow-hidden bg-surface-container/30 border border-outline-variant/10 shadow-xl">
                      {img.url ? (
                        <img src={img.url} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-stone-700" />
                        </div>
                      )}
                      

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        <div className="flex justify-between items-start">
                          <div className="bg-tertiary text-on-tertiary text-[9px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                            Frame {index + 1}
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setImageToDelete(index);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex justify-center gap-4 pb-2">
                          <button 
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveImage(index, 'up')}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full disabled:opacity-20 transition-all backdrop-blur-md"
                          >
                            <ChevronUp className="w-5 h-5 text-white" />
                          </button>
                          <button 
                            type="button"
                            disabled={index === homepageSettings.images.length - 1}
                            onClick={() => moveImage(index, 'down')}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full disabled:opacity-20 transition-all backdrop-blur-md"
                          >
                            <ChevronDown className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={addHomepageImage}
                    className="aspect-[4/5] rounded-lg border-2 border-dashed border-outline-variant/10 hover:border-tertiary/40 flex flex-col items-center justify-center gap-3 group/add transition-all bg-surface-container/10"
                  >
                    <Plus className="w-8 h-8 text-stone-700 group-hover/add:text-tertiary transition-colors" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone-600 group-hover/add:text-tertiary/80 transition-colors">Add Frame</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button 
                  disabled={isSavingHomepage} 
                  type="submit" 
                  className="bg-tertiary text-on-tertiary w-full sm:w-auto px-10 py-4 font-body text-[10px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(206,197,182,0.3)] hover:-translate-y-1 transition-all duration-300 rounded-lg disabled:opacity-50 flex items-center justify-center space-x-3"
                >
                  {isSavingHomepage ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Syncing Archive...</span></>
                  ) : (
                    <><Save className="w-4 h-4" /><span>Persist Homepage</span></>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 opacity-60">Authentication & Shield</h3>
            <span className="h-[1px] flex-1 bg-outline-variant/10 ml-6"></span>
          </div>

          <form onSubmit={handlePasswordSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] -ml-24 -mb-24 rounded-full group-hover:bg-primary/10 transition-all duration-1000"></div>
            
            <div className="relative flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
              <div className="flex-1 space-y-8 md:space-y-12">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/5 border border-primary/10">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-headline text-2xl text-stone-200 tracking-tight">Rotate Security Keys</h4>
                </div>

                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-2 group/field">
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Current Password</label>
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
                      placeholder="current code" 
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group/field">
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">New Password</label>
                      <input 
                        className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
                        placeholder="new cipher" 
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 group/field">
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Confirm New Password</label>
                      <input 
                        className="w-full bg-transparent border-b border-outline-variant/40 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
                        placeholder="verify cipher" 
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-72 flex flex-col justify-end space-y-8">
                <div className="glass-panel p-6 bg-surface-lowest/40 border-outline-variant/10 rounded-xl">

                    <div className="mt-4 pt-4 border-t border-outline-variant/5">
                      <p className="text-[9px] text-primary/40 uppercase font-medium leading-relaxed">Regular rotation increases studio operational security.</p>
                    </div>
                </div>

                <button 
                  disabled={isSavingPassword} 
                  type="submit" 
                  className="w-full border border-outline-variant/30 text-stone-200 hover:bg-white hover:text-black hover:border-transparent px-8 py-4 font-body text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-stone-200 flex items-center justify-center space-x-3"
                >
                  {isSavingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Update Security</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <AdminConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Remove Frame?"
        message="Are you sure you want to remove this image from the homepage archive? This will only remove it from the display list, not delete the source file."
        confirmText="Remove Image"
        variant="danger"
        onConfirm={removeHomepageImage}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setImageToDelete(null);
        }}
      />
    </div>
  );
}

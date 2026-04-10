'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Save, ShieldCheck, Loader2 } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { profile, setProfile } = useAdmin();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

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

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Use empty array to ensure this only runs once on mount.

  // Sync state with profile from context if it changes elsewhere
  useEffect(() => {
    if (profile) {
      setAdminProfile(profile);
      setAvatarPreview(profile.avatar);
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size validation (e.g., 5MB)
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
          oldPassword: passwords.current, // Use the field name 'oldPassword' as required by the API
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
    <div className="max-w-4xl animate-in fade-in duration-700 py-8 md:py-12 pb-24">
      <header className="mb-10 md:mb-16">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-on-surface mb-2">Settings</h2>
        <div className="w-12 h-0.5 bg-tertiary"></div>
      </header>

      <div className="space-y-16">
        {/* Section 1: Admin Profile */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 opacity-60">Admin Profile</h3>
            <span className="h-[1px] flex-1 bg-outline-variant/10 ml-6"></span>
          </div>

          <form onSubmit={handleProfileSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 blur-[100px] -mr-32 -mt-32 rounded-full transition-all duration-1000 group-hover:bg-tertiary/10"></div>
            
            <div className="relative flex flex-col md:flex-row gap-12 items-start">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center group/avatar">
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

              {/* Profile Fields */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Full Name</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="text" 
                    required
                    value={adminProfile.name || ''}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Email Address</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1" 
                    type="email" 
                    required
                    value={adminProfile.email || ''}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2 group/field">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Curator's Bio</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide resize-none focus:pl-1" 
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

        {/* Section 2: Security */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 opacity-60">Authentication & Shield</h3>
            <span className="h-[1px] flex-1 bg-outline-variant/10 ml-6"></span>
          </div>

          <form onSubmit={handlePasswordSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] -ml-24 -mb-24 rounded-full group-hover:bg-primary/10 transition-all duration-1000"></div>
            
            <div className="relative flex flex-col lg:flex-row justify-between gap-16">
              <div className="flex-1 space-y-12">
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
                      className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
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
                        className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
                        placeholder="new cipher" 
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 group/field">
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 group-focus-within/field:text-tertiary transition-colors">Confirm New Password</label>
                      <input 
                        className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-all text-sm font-light tracking-wide focus:pl-1 uppercase placeholder:lowercase" 
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
                    <p className="font-body text-[9px] tracking-[0.1em] text-stone-600 uppercase mb-1">Last rotated</p>
                    <p className="text-stone-400 text-xs font-light">Approximately 3 cycles ago</p>
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
    </div>
  );
}

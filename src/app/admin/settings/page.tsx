'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useAdmin } from '../AdminContext';

export default function SettingsPage() {
  const { profile, setProfile } = useAdmin();
  
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [adminProfile, setAdminProfile] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAdminProfile(profile);
    setAvatarPreview(profile.avatar);
  }, [profile]);

  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setProfile({
        ...adminProfile,
        avatar: avatarPreview
      });
      setIsSavingProfile(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (passwords.new !== passwords.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwords.new.length > 0 && passwords.new.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordSuccess(true);
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl animate-in fade-in duration-700 py-8 md:py-12">
      <header className="mb-10 md:mb-16">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-7xl tracking-tighter text-on-surface mb-2">Settings</h2>
        <div className="w-12 h-0.5 bg-tertiary"></div>
      </header>

      <div className="space-y-10 md:space-y-12">
        {/* Section 1: Admin Profile */}
        <section>
          <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 mb-6 md:mb-8 opacity-60">Admin Profile</h3>
          <form onSubmit={handleProfileSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
            <div className="relative flex flex-col md:flex-row gap-12 items-start">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                <div onClick={() => fileInputRef.current?.click()} className="relative group cursor-pointer rounded-full">
                  <div className="w-32 h-32 rounded-full overflow-hidden border border-outline-variant/30 transition-transform duration-700 group-hover:scale-105 relative z-10">
                    <img 
                      alt="Current Profile Preview" 
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                      src={avatarPreview}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full z-20">
                    <Camera className="w-8 h-8 text-stone-200" />
                  </div>
                </div>
                <p className="mt-4 font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Edit Portrait</p>
              </div>

              {/* Profile Fields */}
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Full Name</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                    type="text" 
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Email Address</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                    type="email" 
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Curator's Bio</label>
                  <textarea 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide resize-none" 
                    rows={3}
                    value={adminProfile.bio}
                    onChange={(e) => setAdminProfile({ ...adminProfile, bio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Location</label>
                  <input 
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                    type="text" 
                    value={adminProfile.location}
                    onChange={(e) => setAdminProfile({ ...adminProfile, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            {profileSuccess && (
              <div className="mt-6 -mb-4 text-green-500 font-body text-xs tracking-wider border border-green-500/20 bg-green-500/10 p-3 rounded-md animate-pulse">
                Profile saved successfully.
              </div>
            )}

            <div className="mt-10 md:mt-12 flex justify-end">
              <button disabled={isSavingProfile} type="submit" className="bg-tertiary text-on-tertiary w-full sm:w-auto px-8 py-3 font-body text-[10px] tracking-[0.2em] uppercase font-bold hover:scale-[1.02] transition-transform duration-300 rounded-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2">
                {isSavingProfile ? (
                  <>
                    <div className="w-3 h-3 border-2 border-on-tertiary border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Profile Changes</span>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Section 2: Security */}
        <section>
          <h3 className="font-headline font-bold text-lg tracking-widest uppercase text-stone-400 mb-6 md:mb-8 opacity-60">Security</h3>
          <form onSubmit={handlePasswordSubmit} className="glass-panel p-6 sm:p-8 lg:p-12 rounded-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[80px] -ml-24 -mb-24 rounded-full"></div>
            <div className="relative flex flex-col md:flex-row justify-between gap-12">
              <div className="flex-1 space-y-10">
                <h4 className="font-headline text-2xl text-stone-200 tracking-tight">Reset Password</h4>

                {passwordError && (
                  <div className="-mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-xs font-body tracking-wider">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="-mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500 text-xs font-body tracking-wider animate-pulse">
                    Password updated successfully.
                  </div>
                )}

                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-2">
                    <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Current Password</label>
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                      placeholder="••••••••••••" 
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">New Password</label>
                      <input 
                        className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                        placeholder="••••••••••••" 
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-500">Confirm New Password</label>
                      <input 
                        className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-stone-200 focus:outline-none focus:border-tertiary transition-colors text-sm font-light tracking-wide" 
                        placeholder="••••••••••••" 
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-64 flex flex-col justify-end space-y-6">
                <div className="text-right">
                  <p className="font-body text-[10px] tracking-[0.1em] text-stone-600 uppercase">Last changed 3 months ago</p>
                  <p className="text-[9px] text-stone-700 uppercase mt-1">Recommended every 6 months</p>
                </div>
                <button disabled={isSavingPassword} type="submit" className="w-full border border-outline-variant/30 text-stone-200 hover:bg-tertiary hover:text-on-tertiary hover:border-transparent px-8 py-3 font-body text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-stone-200 flex items-center justify-center space-x-2">
                  {isSavingPassword ? (
                    <>
                      <div className="w-3 h-3 border-2 border-stone-200 border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
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

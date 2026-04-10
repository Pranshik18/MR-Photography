'use client';

import { motion } from 'motion/react';
import { Camera, Bold, Italic, List, Link as LinkIcon, Plus, X, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function AddProject() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProjectContent />
    </Suspense>
  );
}

function AddProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const isEditing = !!projectId;

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [clientName, setClientName] = useState('');
  const [projectRole, setProjectRole] = useState('');

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const [gallery, setGallery] = useState<{file: File, preview: string}[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent memory leaks by revoking object URLs on unmount
  const heroPreviewRef = useRef(heroPreview);
  const galleryRef = useRef(gallery);
  
  useEffect(() => {
    heroPreviewRef.current = heroPreview;
    galleryRef.current = gallery;
  }, [heroPreview, gallery]);

  useEffect(() => {
    return () => {
      if (heroPreviewRef.current) URL.revokeObjectURL(heroPreviewRef.current);
      galleryRef.current.forEach(item => URL.revokeObjectURL(item.preview));
    };
  }, []);

  useEffect(() => {
    if (isEditing) {
      // Simulate fetching project details
      setTitle('Dummy Project Title');
      setSubtitle('Collection • 2024');
      setClientName('Client Name');
      setProjectRole('Lead Photographer');
      setDescription('This is a dummy description for the loaded project.');
    }
  }, [isEditing]);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (heroPreview) URL.revokeObjectURL(heroPreview);
      setHeroImage(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setGallery(prev => [...prev, ...newImages]);
    
    // Clear input so the onChange event fires properly on subsequent selections
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const removeGalleryImage = (index: number) => {
    setGallery(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFormat = (type: 'bold' | 'italic' | 'list' | 'link') => {
    if (!descRef.current) return;
    
    const textarea = descRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = description;
    
    let prefix = '';
    let suffix = '';

    if (type === 'bold') {
      prefix = '**';
      suffix = '**';
    } else if (type === 'italic') {
      prefix = '*';
      suffix = '*';
    } else if (type === 'list') {
      prefix = '\n- ';
    } else if (type === 'link') {
      prefix = '[';
      suffix = '](https://...)';
    }

    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + prefix + (selectedText || (type === 'link' ? 'link text' : 'text')) + suffix + text.substring(end);
    
    setDescription(newText);

    // Keep focus and select the inserted text for easy editing
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || (type === 'link' ? 9 : 4)));
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('clientName', clientName);
    formData.append('projectRole', projectRole);
    if (heroImage) formData.append('heroImage', heroImage);
    gallery.forEach((item, index) => formData.append(`gallery[${index}]`, item.file));

    // Simulate API call processing delay
    setTimeout(() => {
      console.log('Dummy payload:', Array.from(formData.entries()));
      setIsSubmitting(false);
      router.push('/admin/manage-portfolio'); // Navigate back to portfolio dashboard when done
    }, 1500);
  };

  return (
    <div className="py-8 md:py-12 max-w-5xl mx-auto">
      <header className="mb-8 md:mb-12 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-tertiary"></div>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary">Curator Workspace</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
        </div>
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-label uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </header>

      <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 lg:p-16 border border-outline-variant/10 shadow-2xl space-y-10 sm:space-y-12">
        {/* Hero Image Upload */}
        <div className="space-y-4">
          <label className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant block">Hero Image</label>
          <input 
            type="file" 
            ref={heroInputRef} 
            onChange={handleHeroChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={() => heroInputRef.current?.click()}
            className="group relative w-full aspect-[21/9] bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all duration-700 overflow-hidden"
          >
            {heroPreview ? (
              <img 
                src={heroPreview} 
                alt="Hero Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <Camera className="w-12 h-12 text-outline-variant group-hover:text-primary transition-colors duration-500 mb-4" />
                  <p className="font-body text-sm text-outline">Drag and drop cinematic centerpiece or click to browse</p>
                  <p className="font-label text-[9px] text-neutral-600 mt-2 tracking-widest uppercase">RAW, TIFF, or JPEG (Max 50MB)</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Project Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Obsidian Dreams"
              required
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface font-headline text-xl font-light tracking-tight transition-all"
            />
          </div>
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Subtitle</label>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A study in tonal silence"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block">Description</label>
          <div className="border border-outline-variant/20 bg-surface-container-lowest/50">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-outline-variant/10 bg-surface-container-low">
              <button type="button" onClick={() => handleFormat('bold')} className="text-on-surface-variant hover:text-primary transition-colors">
                <Bold className="w-4 h-4 cursor-pointer" />
              </button>
              <button type="button" onClick={() => handleFormat('italic')} className="text-on-surface-variant hover:text-primary transition-colors">
                <Italic className="w-4 h-4 cursor-pointer" />
              </button>
              <button type="button" onClick={() => handleFormat('list')} className="text-on-surface-variant hover:text-primary transition-colors">
                <List className="w-4 h-4 cursor-pointer" />
              </button>
              <button type="button" onClick={() => handleFormat('link')} className="text-on-surface-variant hover:text-primary transition-colors">
                <LinkIcon className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-outline-variant/10">
              <textarea 
                ref={descRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Compose the narrative of this collection..."
                className="w-full h-44 sm:h-64 bg-transparent border-none p-4 sm:p-6 focus:ring-0 text-on-surface font-body leading-relaxed text-sm resize-none outline-none"
              />
              {/* Preview Pane */}
              <div className="p-4 sm:p-6 h-44 sm:h-64 overflow-y-auto bg-[#1a1c1a]/50 text-sm font-body text-on-surface/90">
                {description ? (
                  <div className="prose prose-invert max-w-none prose-p:my-2 prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:list-disc prose-ul:pl-4 prose-strong:text-on-surface">
                    <ReactMarkdown>{description}</ReactMarkdown>
                  </div>
                ) : (
                  <span className="text-on-surface-variant/50 italic select-none">Preview will appear here...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Client</label>
            <input 
              type="text" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Private Commission"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Role</label>
            <input 
              type="text" 
              value={projectRole}
              onChange={(e) => setProjectRole(e.target.value)}
              placeholder="Photographer"
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-end">
            <label className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">Gallery Photos</label>
            <span className="font-body text-[10px] text-primary/60">{gallery.length} uploaded</span>
          </div>
          
          <input 
            type="file" 
            multiple 
            ref={galleryInputRef}
            onChange={handleGalleryChange}
            accept="image/*"
            className="hidden"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Upload Slot */}
            <div 
              onClick={() => galleryInputRef.current?.click()}
              className="aspect-square bg-surface-container-lowest border border-dashed border-outline-variant/40 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors group"
            >
              <Plus className="w-6 h-6 text-outline-variant group-hover:text-primary transition-colors" />
              <span className="font-label text-[8px] uppercase tracking-widest mt-2 text-outline-variant">Add Frame</span>
            </div>
            {/* Preview Items */}
            {gallery.map((photo, i) => (
              <div key={i} className="aspect-square relative group overflow-hidden bg-surface-container-high">
                <img 
                  src={photo.preview} 
                  alt={"" + "Gallery " + i} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeGalleryImage(i);
                    }}
                    className="bg-red-950/80 p-2 rounded-full text-red-300 hover:bg-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Action */}
        <div className="pt-8 sm:pt-10 flex justify-end">
          <motion.button 
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              bg-tertiary text-[#353025] px-10 py-5 rounded-sm font-label font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(206,197,182,0.15)] flex items-center justify-center gap-3 transition-all min-w-[240px]
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-white hover:text-black'}
            `}
          >
            {isSubmitting ? (isEditing ? 'Saving...' : 'Publishing...') : (isEditing ? 'Save Changes' : 'Publish Masterpiece')}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

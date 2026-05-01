'use client';

import { motion } from 'motion/react';
import { Camera, Bold, Italic, List, Link as LinkIcon, Plus, X, ArrowLeft, Check } from 'lucide-react';
import { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Cropper from 'react-easy-crop';

// Helper to create the cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0
): Promise<File | null> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // set canvas size to match the bounding box
  canvas.width = image.width;
  canvas.height = image.height;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(image.width / 2, image.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedArea format is {x, y, width, height}
  // draw cropped image onto new canvas
  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    return null;
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      if (file) {
        resolve(new File([file], "cropped.jpg", { type: "image/jpeg" }));
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, 'image/jpeg');
  });
};

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
  const [projectDate, setProjectDate] = useState('');
  const [projectCategory, setProjectCategory] = useState('');

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const [gallery, setGallery] = useState<{file: File | null, preview: string, publicId?: string}[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cropper State
  const [cropFile, setCropFile] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

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
      const fetchProjectDetails = async () => {
        try {
          const res = await fetch(`/api/user/project/${projectId}`);
          const data = await res.json();
          if (data.success) {
            const p = data.data;
            setTitle(p.title || '');
            setSubtitle(p.subtitle || '');
            setClientName(p.client || '');
            setProjectRole(p.role || '');
            setProjectDate(p.date || '');
            setProjectCategory(p.category || '');
            setDescription(p.description || '');
            if (p.heroImage) {
              setHeroPreview(p.heroImage);
            }
            if (p.images && p.images.length > 0) {
              setGallery(p.images.map((img: any) => ({
                file: null as any,
                preview: img.url,
                publicId: img.publicId, // preserve for existing
              })));
            }
          }
        } catch (error) {
          console.error('Failed to load project details', error);
        }
      };
      
      fetchProjectDetails();
    }
  }, [isEditing, projectId]);

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (cropFile) URL.revokeObjectURL(cropFile);
      const url = URL.createObjectURL(file);
      setCropFile(url);
      setIsCropping(true);
      // clear the input so user can re-upload if they cancel
      if (heroInputRef.current) {
         heroInputRef.current.value = '';
      }
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const finishCrop = async () => {
    if (!cropFile || !croppedAreaPixels) return;
    try {
      const croppedFile = await getCroppedImg(cropFile, croppedAreaPixels);
      if (croppedFile) {
        if (heroPreview) URL.revokeObjectURL(heroPreview);
        setHeroImage(croppedFile);
        setHeroPreview(URL.createObjectURL(croppedFile));
      }
    } catch (e) {
      console.error(e);
      alert("Failed to crop image");
    } finally {
      setIsCropping(false);
      URL.revokeObjectURL(cropFile);
      setCropFile(null);
    }
  };

  const cancelCrop = () => {
    setIsCropping(false);
    if (cropFile) {
      URL.revokeObjectURL(cropFile);
      setCropFile(null);
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
      const item = prev[index];
      if (item.file) {
        URL.revokeObjectURL(item.preview);
      }
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
    if (!heroPreview && !heroImage) {
      alert("Hero image is required");
      return;
    }
    setIsSubmitting(true);

    try {
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };

      let heroBase64 = heroPreview || '';
      if (heroImage) {
        heroBase64 = await fileToBase64(heroImage);
      }

      const galleryBase64 = await Promise.all(
        gallery.map(async (item, index) => ({
          url: item.file ? await fileToBase64(item.file) : item.preview,
          order: index,
          publicId: item.publicId || undefined
        }))
      );

      const payload: any = {
        title,
        subtitle,
        description,
        clientName,
        projectRole,
        date: projectDate,
        category: projectCategory,
        heroImage: heroBase64,
        images: galleryBase64,
      };

      let endpoint = '/api/admin/project/add';
      let method = 'POST';

      if (isEditing) {
        payload.id = projectId;
        endpoint = '/api/admin/project/edit';
        method = 'PUT';
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        router.push('/admin/manage-portfolio');
      } else {
        alert(data.message || (isEditing ? 'Failed to update project' : 'Failed to create project'));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the project');
    } finally {
      setIsSubmitting(false);
    }
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
            // Removed hidden so Cropper modal can be appended correctly relative to container if needed, but it works globally too
            accept="image/*" 
            className="hidden" 
          />
          
          {isCropping && cropFile ? (
            <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="relative w-full max-w-4xl h-[60vh] bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 shadow-2xl">
                 <div className="absolute inset-x-0 inset-y-0 bottom-24">
                  {/* @ts-ignore */}
                  <Cropper
                    image={cropFile}
                    crop={crop}
                    zoom={zoom}
                    aspect={21/9}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                {/* Controls */}
                <div className="absolute bottom-0 w-full h-24 bg-surface/80 backdrop-blur-sm border-t border-outline-variant/20 flex flex-col items-center justify-center gap-2 px-6">
                  <div className="w-full max-w-md flex items-center gap-4">
                    <span className="font-label text-xs uppercase text-on-surface-variant">Zoom</span>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="flex-1 w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={cancelCrop} 
                      className="px-6 py-2 bg-transparent text-white font-label text-xs uppercase tracking-widest hover:text-red-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={finishCrop} 
                      className="px-6 py-2 bg-primary text-black font-label text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <Check className="w-4 h-4" /> Save Crop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div 
            onClick={() => !isCropping && heroInputRef.current?.click()}
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

        {/* Category Only */}
        <div className="max-w-md">
          <div className="relative group">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">Category</label>
            <select 
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="w-full bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-primary text-on-surface-variant font-body text-base transition-all cursor-pointer"
            >
              <option value="" className="text-gray-900">Select Category</option>
              {['WEDDINGS', 'PRE-WEDDING', 'PARTIES', 'TRADITIONS', 'MATERNITY', 'BOUDOIR', 'COMMERCIAL'].map(cat => (
                <option key={cat} value={cat} className="text-gray-900">{cat}</option>
              ))}
            </select>
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

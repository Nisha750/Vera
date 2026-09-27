import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Upload, RefreshCw, X, Shield, Sparkles, Layers, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';

export const StyleCameraPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'camera' ? 'camera' : 'upload';
  const navigate = useNavigate();
  const { products } = useShop();

  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>(initialMode);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedIntent, setMatchedIntent] = useState<'recommendations' | 'outfit' | 'similar' | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your current browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. You can upload a photo instead.');
      } else {
        setCameraError('Camera access unavailable. Please try uploading a photo.');
      }
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCapturedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMatchedIntent(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handleRemovePhoto = () => {
    setCapturedImage(null);
    setMatchedIntent(null);
    stopCamera();
  };

  const handleActionClick = (intent: 'recommendations' | 'outfit' | 'similar') => {
    if (intent === 'outfit') {
      navigate('/outfit-builder');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setMatchedIntent(intent);
    }, 1200);
  };

  // Matched products
  const matchedProducts = products.slice(0, 4);

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-neutral-400 mb-3">
            <Camera className="w-3.5 h-3.5 text-white" />
            <span>Vision Style Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white mb-2">
            VÉRA STYLE CAMERA
          </h1>
          <p className="text-sm text-neutral-400 font-light">
            Capture or upload a photo to explore curated fashion recommendations matched to your unique silhouette and tone.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        {!capturedImage && (
          <div className="flex justify-center mb-8">
            <div className="flex border border-white/20 p-1 bg-neutral-950">
              <button
                onClick={() => {
                  stopCamera();
                  setActiveTab('upload');
                }}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'upload' ? 'bg-white text-black font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('camera');
                  startCamera();
                }}
                className={`flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'camera' ? 'bg-white text-black font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Use Camera</span>
              </button>
            </div>
          </div>
        )}

        {/* Viewport Card */}
        <div className="bg-neutral-950 border border-white/10 max-w-3xl mx-auto p-6 sm:p-8 shadow-2xl relative">
          {/* CAMERA TAB */}
          {!capturedImage && activeTab === 'camera' && (
            <div className="flex flex-col items-center">
              {cameraError ? (
                <div className="py-16 text-center max-w-md">
                  <AlertCircle className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
                  <h3 className="text-lg font-serif text-white mb-2">CAMERA ACCESS UNAVAILABLE</h3>
                  <p className="text-xs text-neutral-400 mb-6">{cameraError}</p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="btn-vera px-6 py-3 bg-white text-black text-xs uppercase tracking-wider"
                  >
                    Switch to Upload
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="relative aspect-[3/4] max-w-md w-full bg-black border border-white/20 overflow-hidden mb-6">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-4 border border-dashed border-white/30 pointer-events-none flex flex-col justify-between p-3">
                      <span className="text-[10px] font-mono text-white/60">LIVE CAMERA PREVIEW</span>
                      <span className="text-[10px] font-mono text-white/60 text-right">ALIGN SILHOUETTE</span>
                    </div>
                  </div>

                  <button
                    onClick={capturePhoto}
                    className="btn-vera px-8 py-3.5 bg-white text-black text-xs uppercase tracking-mega-wide font-medium hover:bg-neutral-200 transition-all shadow-xl flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>CAPTURE PHOTO</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* UPLOAD TAB */}
          {!capturedImage && activeTab === 'upload' && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 hover:border-white/50 transition-colors p-12 text-center cursor-pointer bg-black/40"
            >
              <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">DROP OR SELECT YOUR PHOTO</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
                Supports JPG, PNG, WEBP up to 10MB. Photos are processed locally and never stored without your permission.
              </p>
              <button
                type="button"
                className="btn-vera px-6 py-2.5 border border-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* PHOTO PREVIEW & NEXT ACTION MENU */}
          {capturedImage && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* Photo */}
                <div className="relative w-48 aspect-[3/4] border border-white/20 overflow-hidden flex-shrink-0">
                  <img src={capturedImage} alt="User upload" className="w-full h-full object-cover" />
                </div>

                {/* Photo Actions */}
                <div className="space-y-4 flex-1 text-center sm:text-left">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                      <Check className="w-3.5 h-3.5" /> Photo Successfully Captured
                    </span>
                    <h3 className="text-2xl font-serif text-white mt-1">WHAT WOULD YOU LIKE TO DO?</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Choose an atelier workflow to match your image with VÉRA silhouettes.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={handleRetake}
                      className="px-3 py-1.5 border border-white/20 text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                    >
                      <RefreshCw className="w-3 h-3 inline mr-1" />
                      Retake
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 border border-white/20 text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                    >
                      Replace
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      className="px-3 py-1.5 border border-white/20 text-xs uppercase tracking-wider text-neutral-300 hover:text-rose-400"
                    >
                      <X className="w-3 h-3 inline mr-1" />
                      Remove
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => handleActionClick('recommendations')}
                  disabled={isAnalyzing}
                  className="btn-vera p-4 border border-white/20 hover:border-white text-left transition-all group bg-black/40"
                >
                  <Sparkles className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs uppercase tracking-widest text-white font-medium">Get Style Recommendations</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Discover tailored garments matching your photo's tone.</p>
                </button>

                <button
                  onClick={() => handleActionClick('outfit')}
                  className="btn-vera p-4 border border-white/20 hover:border-white text-left transition-all group bg-black/40"
                >
                  <Layers className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs uppercase tracking-widest text-white font-medium">Build An Outfit</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Compose a 5-layer look around this aesthetic.</p>
                </button>

                <button
                  onClick={() => handleActionClick('similar')}
                  disabled={isAnalyzing}
                  className="btn-vera p-4 border border-white/20 hover:border-white text-left transition-all group bg-black/40"
                >
                  <Camera className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs uppercase tracking-widest text-white font-medium">Explore Similar Styles</p>
                  <p className="text-[11px] text-neutral-400 mt-1">Browse atelier pieces with aligned geometry.</p>
                </button>
              </div>

              {/* Loading State */}
              {isAnalyzing && (
                <div className="py-12 text-center">
                  <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-3" />
                  <p className="text-xs uppercase tracking-mega-wide text-neutral-300">
                    Analyzing Geometry & Tonal Palette...
                  </p>
                </div>
              )}

              {/* Matched Results */}
              {matchedIntent && !isAnalyzing && (
                <div className="pt-8 border-t border-white/10 animate-fade-in">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-mega-wide text-neutral-400">Atelier Match</p>
                      <h3 className="text-xl font-serif text-white">RECOMMENDED PIECES FOR YOUR PHOTO</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {matchedProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Photo Privacy Pledge */}
        <div className="mt-12 p-6 border border-white/10 bg-neutral-950/60 max-w-3xl mx-auto flex items-start gap-4">
          <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-400 space-y-1">
            <p className="text-white uppercase tracking-wider font-medium">VÉRA Photo Privacy Commitment</p>
            <p>
              Your camera feed and uploaded photos are processed exclusively inside your browser session for stylistic analysis. Photos are never stored on external servers or shared publicly without your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

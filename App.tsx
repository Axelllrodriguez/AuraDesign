
import React, { useState, useRef } from 'react';
import { LOGO_URL, VISUAL_STYLES } from './constants';
import { ArtDirection, GeneratedImage, LensGeometry, LightProfile, Environment, Optics, VisualStyle } from './types';
import { generateAIImage, editAIImage } from './services/geminiService';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ImageHistory } from './components/ImageHistory';
import { StyleSelector } from './components/StyleSelector';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [config, setConfig] = useState<ArtDirection>({
    lens: 'medio',
    light: 'noon',
    environment: 'exterior',
    optics: 'source'
  });
  const [refImage, setRefImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRefImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const url = await generateAIImage(prompt, config, refImage);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        config: { ...config },
        timestamp: Date.now(),
      };
      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev].slice(0, 10));
    } catch (error) {
      alert("Error generating image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editPrompt.trim() || !currentImage) return;
    setIsLoading(true);
    try {
      const url = await editAIImage(currentImage.url, editPrompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt: `Edit: ${editPrompt}`,
        config: currentImage.config,
        timestamp: Date.now(),
      };
      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev].slice(0, 10));
      setEditPrompt('');
      setIsEditing(false);
    } catch (error) {
      alert("Error editing image.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for selecting visual style presets
  const handleStyleSelect = (style: VisualStyle) => {
    setConfig(style.config);
  };

  const ControlGroup = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{label}</label>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </div>
  );

  const OptionBtn = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
        active 
          ? 'bg-white text-black border-white' 
          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-inter">
      {/* Navigation */}
      <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Aura Logo" className="h-10 w-10 invert brightness-200" />
          <h1 className="text-xl font-bold tracking-[0.3em]">AURA DESIGN</h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[10px] font-mono text-white/40">NANO BANANA ENGINE</span>
        </div>
      </header>

      <main className="flex-grow max-w-[1600px] mx-auto w-full px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-10">
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight">Art Direction</h2>
              <p className="text-white/40 text-sm">Define the technical parameters of the shot.</p>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describre tu visión..."
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 h-32 focus:outline-none focus:border-white/30 transition-all text-lg placeholder:text-white/10"
            />

            {/* Visual Style Presets Integrated */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Style Presets</label>
              <StyleSelector 
                selectedStyleId={VISUAL_STYLES.find(s => JSON.stringify(s.config) === JSON.stringify(config))?.id || ''} 
                onSelect={handleStyleSelect} 
              />
            </div>

            <div className="space-y-6 p-6 bg-white/5 rounded-3xl border border-white/5">
              <ControlGroup label="Lens Geometry">
                {(['angular', 'medio', 'retrato'] as LensGeometry[]).map(l => (
                  <OptionBtn key={l} active={config.lens === l} onClick={() => setConfig({...config, lens: l})}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </OptionBtn>
                ))}
              </ControlGroup>

              <ControlGroup label="Light Profile">
                {(['dawn', 'noon', 'golden', 'night'] as LightProfile[]).map(lp => (
                  <OptionBtn key={lp} active={config.light === lp} onClick={() => setConfig({...config, light: lp})}>
                    {lp === 'dawn' ? 'Amanecer' : lp === 'noon' ? 'Mediodía' : lp === 'golden' ? 'Golden Hour' : 'Medianoche'}
                  </OptionBtn>
                ))}
              </ControlGroup>

              <div className="grid grid-cols-2 gap-4">
                <ControlGroup label="Environment">
                  {(['interior', 'exterior'] as Environment[]).map(e => (
                    <OptionBtn key={e} active={config.environment === e} onClick={() => setConfig({...config, environment: e})}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}
                    </OptionBtn>
                  ))}
                </ControlGroup>
                <ControlGroup label="Optics">
                  {(['bokeh', 'source'] as Optics[]).map(o => (
                    <OptionBtn key={o} active={config.optics === o} onClick={() => setConfig({...config, optics: o})}>
                      {o === 'bokeh' ? 'Bokeh' : 'Source Asset'}
                    </OptionBtn>
                  ))}
                </ControlGroup>
              </div>

              {/* Image Reference */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Image Reference</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative h-24 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer transition-all overflow-hidden ${
                    refImage ? 'border-white/40' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {refImage ? (
                    <>
                      <img src={refImage} className="w-full h-full object-cover opacity-50" />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setRefImage(null); }}
                        className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white/80 hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">IMAGE ACTIVE</span>
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-[10px] text-white/30 font-bold">DROP IMAGE REFERENCE</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full h-14 bg-white text-black rounded-xl font-bold text-sm tracking-widest hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-20"
            >
              {isLoading ? 'PROCESSING...' : 'GENERATE ASSET'}
            </button>
          </section>
        </div>

        {/* Right: Preview (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="w-full relative">
            {isLoading ? (
              <LoadingSkeleton />
            ) : currentImage ? (
              <div className="group relative w-full aspect-square rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-700">
                <img src={currentImage.url} className="w-full h-full object-cover" />
                
                {/* Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 font-mono">ID: {currentImage.id}</p>
                      <p className="text-sm font-medium max-w-md line-clamp-2">{currentImage.prompt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <a 
                        href={currentImage.url} 
                        download={`aura-${currentImage.id}.png`}
                        className="p-3 bg-white text-black rounded-xl hover:scale-105 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-square rounded-[2.5rem] border border-white/5 bg-[#050505] flex flex-col items-center justify-center">
                 <div className="h-20 w-20 border border-white/10 rounded-full flex items-center justify-center mb-6">
                    <div className="h-10 w-10 border-t border-white/40 rounded-full animate-spin"></div>
                 </div>
                 <p className="text-white/20 font-bold tracking-[0.5em] text-xs">AWAITING MANIFESTATION</p>
              </div>
            )}
          </div>

          {isEditing && currentImage && (
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl animate-in slide-in-from-top-4">
              <div className="flex gap-4">
                <input 
                  type="text"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Instrucciones de edición rápida..."
                  className="flex-grow bg-black border border-white/10 rounded-xl px-4 text-sm"
                />
                <button 
                  onClick={handleEdit}
                  disabled={isLoading || !editPrompt.trim()}
                  className="px-6 py-3 bg-white text-black rounded-xl font-bold text-xs"
                >
                  {isLoading ? 'EDITING...' : 'APPLY'}
                </button>
              </div>
            </div>
          )}

          <ImageHistory history={history} onSelect={setCurrentImage} />
        </div>
      </main>

      <footer className="p-10 text-center opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] tracking-[0.4em] font-bold">THE FUTURE OF CREATIVE DIRECTION IS HERE. AURA DESIGN STUDIO.</p>
      </footer>
    </div>
  );
};

export default App;

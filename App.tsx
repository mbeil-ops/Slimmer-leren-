
import React, { useState, useMemo } from 'react';
import { BookOpen, Lightbulb, Download, Play, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { STRATEGIES, SUBJECT_TIPS } from './constants';
import { SubjectFilter } from './components/SubjectFilter';
import { StrategyCard } from './components/StrategyCard';
import { SubjectType } from './types';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>("Algemeen");
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Filter strategies based on whether they have generic tips or specific subject tips
  const activeStrategy = useMemo(() => 
    STRATEGIES.find(s => s.id === selectedStrategyId), 
  [selectedStrategyId]);

  const specificTipsForSubject = useMemo(() => {
    if (!selectedStrategyId) return [];
    return SUBJECT_TIPS.filter(t => 
      t.subject === selectedSubject && 
      t.strategyId === selectedStrategyId
    );
  }, [selectedSubject, selectedStrategyId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const maxWidth = 170;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(0, 105, 92); // excel-dark
    doc.text("Slim Studeren - Studiekaarten", margin, yPos);
    yPos += 15;

    STRATEGIES.forEach((strategy, index) => {
      // Check if we need a new page
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }

      // Card Container visual separation
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos, margin + maxWidth, yPos);
      yPos += 10;

      // Strategy Title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${strategy.title}`, margin, yPos);
      yPos += 7;

      // Category
      doc.setFontSize(10);
      doc.setTextColor(255, 183, 77); // excel-orange
      doc.setFont("helvetica", "bold");
      doc.text(strategy.category.toUpperCase(), margin, yPos);
      yPos += 8;

      // Description
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(strategy.shortDescription, maxWidth);
      doc.text(descLines, margin, yPos);
      yPos += (descLines.length * 6) + 5;

      // How To Header
      doc.setFontSize(12);
      doc.setTextColor(77, 182, 172); // excel-teal
      doc.setFont("helvetica", "bold");
      doc.text("Hoe werkt het?", margin, yPos);
      yPos += 6;

      // How To Steps
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      strategy.howTo.forEach((step, i) => {
        const stepText = `${i + 1}. ${step}`;
        const stepLines = doc.splitTextToSize(stepText, maxWidth);
        
        if (yPos + (stepLines.length * 5) > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.text(stepLines, margin, yPos);
        yPos += (stepLines.length * 5) + 2;
      });
      
      yPos += 5;

      // Attention (Opgelet)
      if (strategy.attention) {
        if (yPos + 20 > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFontSize(10);
        doc.setTextColor(200, 50, 50); // Red-ish
        doc.setFont("helvetica", "bold");
        doc.text("Opgelet:", margin, yPos);
        
        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "italic");
        const attLines = doc.splitTextToSize(strategy.attention, maxWidth - 15);
        doc.text(attLines, margin + 15, yPos);
        yPos += (attLines.length * 5) + 10;
      } else {
        yPos += 10;
      }
    });

    doc.save("studiekaarten.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col print:bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Left: Compact Video Button */}
          <button 
            onClick={() => setIsVideoModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-excel-teal transition-colors group"
            title="Bekijk de kennisclip"
          >
            <div className="bg-excel-orange text-white rounded-full p-1.5 shadow-sm group-hover:scale-110 transition-transform">
              <Play size={12} fill="currentColor" />
            </div>
            <span className="font-medium">Kennisclip</span>
          </button>

          {/* Right: Download Link */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-excel-teal transition-colors cursor-pointer"
              title="Download de studiekaarten"
            >
              <Download size={20} />
              <span className="hidden sm:inline">Download de studiekaarten</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Wrapper - Hides when printing ONLY if a modal is open */}
      <div className={`flex-grow ${(activeStrategy || isVideoModalOpen) ? 'print:hidden' : ''}`}>
        
        {/* Hero Section */}
        <div className="hero-gradient text-white py-12 px-4 print:bg-white print:text-black print:p-0 print:mb-8">
          <div className="max-w-3xl mx-auto text-center print:text-left">
            <h2 className="text-3xl md:text-5xl font-freeman mb-4 print:text-slate-900 uppercase tracking-wide">EFFECTIEF JEZELF ONTWIKKELEN</h2>
            <p className="text-excel-bg/90 text-lg mb-8 leading-relaxed max-w-2xl mx-auto print:text-slate-600 print:mb-4 lowercase font-sans">
              door slimmer te leren
            </p>
            
            {/* Subject Filter embedded in Hero for prominence */}
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 print:hidden">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-3 font-sans">
                Kies een vak en zie welke strategieën kunnen helpen bij het leren.
              </p>
              <SubjectFilter 
                selectedSubject={selectedSubject} 
                onSelect={setSelectedSubject} 
              />
            </div>

            {/* Print only subject display */}
            <div className="hidden print:block text-left border-b border-gray-200 pb-4 mb-4">
              <span className="font-bold text-slate-800">Geselecteerd vak: </span>
              <span className="text-slate-600">{selectedSubject}</span>
            </div>
          </div>
        </div>

        <main className="max-w-5xl mx-auto px-4 py-8 print:p-0">
          
          {/* Strategy Grid */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-excel-teal print:text-slate-800" />
              <h2 className="text-2xl font-bold text-slate-800">De Strategieën</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
              {STRATEGIES.map((strategy) => {
                // Check if there is a specific tip for this subject and strategy
                const hasSpecificTip = SUBJECT_TIPS.some(t => 
                  t.subject === selectedSubject && t.strategyId === strategy.id
                );

                return (
                  <div key={strategy.id} className="relative group break-inside-avoid">
                     {/* Badge for subject specific content */}
                    {hasSpecificTip && selectedSubject !== "Algemeen" && (
                      <div className="absolute -top-3 -right-2 z-10 bg-excel-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-bounce print:hidden">
                        Tip voor {selectedSubject}!
                      </div>
                    )}
                    <StrategyCard 
                      strategy={strategy} 
                      isSelected={selectedStrategyId === strategy.id}
                      onClick={() => setSelectedStrategyId(strategy.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Button Section - Hidden on Print */}
          <div className="mb-12 print:hidden flex justify-center">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="group relative w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-excel-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-shrink-0 w-16 h-16 bg-excel-orange rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Play className="text-white fill-white ml-1" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-excel-teal transition-colors">
                    Kennisclip slim studeren
                  </h2>
                  <p className="text-slate-600">
                    Bekijk de video voor een visuele uitleg van de effectieve leerstrategieën.
                  </p>
                </div>
              </div>
            </button>
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 print:hidden">
        <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-center gap-3">
          <span className="text-slate-500 text-sm font-medium">
            Mede mogelijk gemaakt door Thomas More
          </span>
          <a href="https://thomasmore.be/nl" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <img 
              src="https://www.thomasmore.be/themes/custom/tm_theme/logo.svg" 
              alt="Thomas More Logo" 
              className="h-8"
              onError={(e) => {
                // Fallback if the logo url fails: hide the image tag to avoid broken icon
                e.currentTarget.style.display = 'none';
              }}
            />
          </a>
        </div>
      </footer>

      {/* Strategy Detail Modal */}
      {activeStrategy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 print:static print:bg-white print:p-0 print:block">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto print:shadow-none print:max-h-none print:max-w-none print:w-full print:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 print:p-0">
              {/* Header of Modal */}
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4 print:border-gray-300">
                <div>
                  <span className="text-excel-orange font-bold text-xs uppercase tracking-wider mb-1 block print:text-slate-600">
                    {activeStrategy.category}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">{activeStrategy.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedStrategyId(null)}
                    className="p-2 hover:bg-gray-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors print:hidden"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                
                {/* General 'How To' */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-gray-300">
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-700 print:text-slate-900">
                    <Lightbulb size={20} className="text-excel-teal print:text-slate-800" />
                    Hoe werkt het?
                  </h3>
                  <ul className="space-y-3">
                    {activeStrategy.howTo.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-600 print:text-slate-800">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-excel-teal text-excel-teal text-sm font-bold flex items-center justify-center print:border-slate-800 print:text-slate-800">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attention Section (Opgelet) */}
                {activeStrategy.attention && (
                   <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 print:bg-white print:border-gray-300 break-inside-avoid">
                    <h3 className="font-bold text-lg mb-2 text-slate-800">Opgelet!</h3>
                    <p className="text-slate-700 leading-relaxed">{activeStrategy.attention}</p>
                   </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end print:hidden">
                <button 
                  onClick={() => setSelectedStrategyId(null)}
                  className="bg-excel-teal hover:bg-excel-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-excel-teal/30"
                >
                  Ik snap het!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal - Retro TV Style */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 print:hidden"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <style>{`
            /* TV Set Styling */
            .tv-set {
              background-color: #3b2d22;
              background-image: linear-gradient(to bottom, #4a3b32, #2a1f18);
              padding: 30px;
              border-radius: 30px;
              box-shadow: 
                0 0 0 10px #1a120d,
                20px 20px 50px rgba(0,0,0,0.8);
              display: flex;
              flex-direction: column;
              align-items: center;
              max-width: 90%;
              width: 700px;
              position: relative;
              border: 4px solid #1a120d;
            }

            /* Screen Container */
            .tv-screen-container {
              background: #000;
              padding: 15px;
              border-radius: 50% 50% 40% 40% / 15%;
              box-shadow: inset 0 0 20px rgba(0,0,0,1);
              width: 100%;
              overflow: hidden;
              position: relative;
            }

            /* The Screen */
            .tv-screen {
              position: relative;
              width: 100%;
              padding-top: 56.25%; /* 16:9 */
              border-radius: 100px / 40px;
              overflow: hidden;
              box-shadow: inset 0 0 40px rgba(0,0,0,0.9);
              background: #111;
            }

            /* Video Wrapper */
            .video-wrapper {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              transform: scale(1.02);
            }
            
            .video-wrapper iframe {
              width: 100%;
              height: 100%;
            }

            /* CRT Overlay */
            .crt-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 2;
              background: 
                linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
              background-size: 100% 4px, 6px 100%;
              box-shadow: 
                inset 0 0 80px rgba(0,0,0,0.7),
                inset 10px 10px 20px rgba(255,255,255,0.05);
              animation: flicker 0.15s infinite;
              border-radius: 100px / 40px;
            }

            /* Controls */
            .tv-controls {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin-top: 20px;
              padding: 0 20px;
            }

            .speaker-grill {
              flex-grow: 1;
              height: 20px;
              margin: 0 20px;
              background-image: linear-gradient(90deg, #1a120d 50%, transparent 50%);
              background-size: 8px 100%;
            }

            .knobs {
              display: flex;
              gap: 15px;
            }

            .knob {
              width: 30px;
              height: 30px;
              background: #1a120d;
              border-radius: 50%;
              box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
              position: relative;
            }
            
            .knob::after {
              content: '';
              position: absolute;
              top: 5px;
              left: 13px;
              width: 4px;
              height: 10px;
              background: #555;
            }

            .power-btn {
              background: #8b0000;
              color: #ccAAAA;
              border: 2px solid #500000;
              padding: 10px 20px;
              font-family: monospace;
              font-weight: bold;
              cursor: pointer;
              box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
              text-transform: uppercase;
              transition: all 0.1s;
            }

            .power-btn:active {
              box-shadow: inset 2px 2px 5px rgba(0,0,0,0.8);
              transform: translateY(2px);
            }

            .power-btn:hover {
              background: #a00000;
              color: #fff;
            }

            @keyframes flicker {
              0% { opacity: 0.95; }
              5% { opacity: 0.85; }
              10% { opacity: 0.95; }
              15% { opacity: 1; }
              100% { opacity: 0.95; }
            }

            @media (max-width: 600px) {
              .tv-set {
                padding: 15px;
                width: 95%;
              }
              .tv-controls {
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
              }
              .speaker-grill {
                display: none;
              }
            }
          `}</style>
          
          <div 
            className="tv-set"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Screen Container */}
            <div className="tv-screen-container">
              <div className="tv-screen">
                <div className="video-wrapper">
                  <iframe 
                    src="https://www.youtube.com/embed/3LxSjpqOu_M" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="crt-overlay" />
              </div>
            </div>

            {/* Controls */}
            <div className="tv-controls">
              <div className="knobs">
                <div className="knob" />
                <div className="knob" />
              </div>
              <div className="speaker-grill" />
              <button className="power-btn" onClick={() => setIsVideoModalOpen(false)}>
                UIT
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;

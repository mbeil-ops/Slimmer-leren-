
import React, { useState, useMemo } from 'react';
import { BookOpen, Lightbulb, Download, Play, X } from 'lucide-react';
import { STRATEGIES, SUBJECT_TIPS } from './constants';
import { SubjectFilter } from './components/SubjectFilter';
import { StrategyCard } from './components/StrategyCard';
import { SubjectType } from './types';
import jsPDF from 'jspdf';

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
    const contentWidth = 170;

    // Helper to check page break
    const checkPageBreak = (height: number) => {
      if (yPos + height > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Slim Studeren - Studiekaarten", margin, yPos);
    yPos += 15;

    STRATEGIES.forEach((strategy, index) => {
      checkPageBreak(60); // Estimate minimum height for a strategy block

      // Strategy Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 105, 92); // Excel Teal
      doc.text(`${index + 1}. ${strategy.title}`, margin, yPos);
      yPos += 8;

      // Category
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(strategy.category, margin, yPos);
      yPos += 8;

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      const descLines = doc.splitTextToSize(strategy.shortDescription, contentWidth);
      doc.text(descLines, margin, yPos);
      yPos += (descLines.length * 6) + 4;

      // How To Header
      checkPageBreak(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Hoe werkt het?", margin, yPos);
      yPos += 6;

      // How To Steps
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      strategy.howTo.forEach((step, i) => {
        const stepText = `${i + 1}. ${step}`;
        const stepLines = doc.splitTextToSize(stepText, contentWidth);
        checkPageBreak(stepLines.length * 5);
        doc.text(stepLines, margin, yPos);
        yPos += (stepLines.length * 5);
      });
      yPos += 4;

      // Attention
      if (strategy.attention) {
        const attText = `Opgelet: ${strategy.attention}`;
        const attLines = doc.splitTextToSize(attText, contentWidth);
        checkPageBreak(attLines.length * 5 + 10);
        
        doc.setTextColor(200, 0, 0); // Dark Red warning
        doc.text(attLines, margin, yPos);
        doc.setTextColor(0, 0, 0); // Reset
        yPos += (attLines.length * 5);
      }

      yPos += 15; // Space between strategies
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

          {/* Right: Subtle Download Button */}
          <div className="flex items-center gap-4">
            {/* VERVANG ONDERSTAANDE URL MET DE WERKELIJKE LOCATIE VAN JE PDF BESTAND INDIEN NODIG */}
            <a 
              href="https://thomasmore.be/sites/default/files/2023-05/Studeerkaarten%20bundel.pdf"
              download="Studeerkaarten bundel.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-excel-teal transition-colors group"
              title="Download de studiekaarten bundel"
            >
              <div className="bg-excel-teal text-white rounded-full p-1.5 shadow-sm group-hover:scale-110 transition-transform">
                <Download size={12} />
              </div>
              <span className="font-medium hidden sm:inline">Download Studeerkaarten Bundel</span>
              <span className="font-medium sm:hidden">Download</span>
            </a>
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
              src="https://media.discordapp.net/attachments/1339893245229207636/1344265538260762696/Thomas_More_logo.png?ex=67c046e7&is=67bef567&hm=c7a38779907f300c3770428d009226d79de7879e8633390cc2ce4df03df8477f&=&format=webp&quality=lossless" 
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

                {/* Subject Specific Tips Section */}
                {specificTipsForSubject.length > 0 && (
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 print:bg-white print:border-gray-300 break-inside-avoid">
                    <h3 className="flex items-center gap-2 font-bold text-lg mb-4 text-slate-800">
                      <Lightbulb size={20} className="text-excel-orange" />
                      Tip voor {selectedSubject}
                    </h3>
                    <ul className="space-y-3">
                      {specificTipsForSubject.map((tip, idx) => (
                        <li key={idx} className="text-slate-700 leading-relaxed print:text-slate-800">
                          • {tip.tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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

      {/* Video Modal - Clean Dark Retro TV Style */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 print:hidden"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <style>{`
            /* 1. DE POP-UP CONTAINER */
            .old-tv {
              background-color: #2a2a2a; /* Dark gray body */
              border: 15px solid #1a1a1a; /* Darker bezel */
              border-radius: 40px; /* Retro rounded corners */
              box-shadow: 
                0 0 50px rgba(0, 0, 0, 0.8), /* Depth shadow */
                inset 0 0 20px rgba(255, 255, 255, 0.05); /* Slight inner gloss */
              padding: 20px;
              position: relative;
              width: 90vw;
              max-width: 700px;
              display: flex;
              flex-direction: column;
              align-items: center;
            }

            /* 2. HET SCHERM FRAME (BEZEL) */
            .screen-frame {
              background: #000;
              border: 4px solid #333; /* Inner dark border */
              border-radius: 15px; /* Sligthly rounded inner screen */
              overflow: hidden;
              position: relative;
              width: 100%;
              /* De 16:9 aspect ratio techniek */
              padding-bottom: 56.25%; 
              height: 0;
              box-shadow: inset 0 0 10px rgba(0,0,0,1); /* Depth */
            }

            /* 3. DE IFRAME */
            .old-tv iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border: none;
              /* No overlay, no filters, just clean video */
            }

            /* 4. DETAILS (Buttons/Speaker) */
            .tv-details {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              margin-top: 15px;
              padding: 0 10px;
            }

            .speaker-grill {
              flex-grow: 1;
              height: 12px;
              margin: 0 20px;
              /* Simpele speaker streepjes */
              background-image: linear-gradient(90deg, #111 50%, transparent 50%);
              background-size: 6px 100%;
              opacity: 0.5;
            }

            .power-button {
              background: #cc3333;
              color: white;
              font-family: monospace;
              border: none;
              border-radius: 4px;
              padding: 5px 15px;
              cursor: pointer;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 12px;
              box-shadow: 2px 2px 0 #880000;
              transition: transform 0.1s, box-shadow 0.1s;
            }

            .power-button:active {
              transform: translateY(2px);
              box-shadow: 0 0 0 #880000;
            }
          `}</style>

          <div 
            className="old-tv"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Screen Area */}
            <div className="screen-frame">
              <iframe 
                src="https://www.youtube.com/embed/3LxSjpqOu_M" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Bottom Details */}
            <div className="tv-details">
              <div className="speaker-grill"></div>
              <button 
                className="power-button" 
                onClick={() => setIsVideoModalOpen(false)}
              >
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

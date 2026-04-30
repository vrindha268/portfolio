import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Code2, Briefcase, BrainCircuit, Terminal, Mail } from 'lucide-react';

const pagesData = [
  { type: 'cover' },
  { title: 'The Manifesto', content: 'Summary & Philosophy' },
  { title: 'The Field Report', content: 'Experience & Projects' },
  { title: 'The Blueprint', content: 'Technical Arsenal' },
];

const MagazinePortfolio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      // Base magazine spread dimensions (two pages side by side)
      const BASE_WIDTH = 1600;
      const BASE_HEIGHT = 1066;
      // Target dimensions (90% of screen to leave a nice border margin)
      const targetHeight = window.innerHeight * 0.90;
      const targetWidth = window.innerWidth * 0.90;
      
      const scaleH = targetHeight / BASE_HEIGHT;
      const scaleW = targetWidth / BASE_WIDTH;
      // Use the smaller scale so it fully fits in the viewport, cap at 1.2x scale max
      setFitScale(Math.min(scaleH, scaleW, 1.2));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  let xShift = "0%";
  if (currentPage === 0) xShift = "-25%";
  else if (currentPage === 4) xShift = "25%";

  const sheets = [
    {
      front: <CoverPage onOpen={() => setCurrentPage(1)} />,
      back: <LeftPageContent pageData={pagesData[1]} pageNumber={1} />
    },
    {
      front: <RightPageContent pageData={pagesData[1]} pageNumber={1} onNext={() => setCurrentPage(2)} onPrev={() => setCurrentPage(0)} />,
      back: <LeftPageContent pageData={pagesData[2]} pageNumber={2} />
    },
    {
      front: <RightPageContent pageData={pagesData[2]} pageNumber={2} onNext={() => setCurrentPage(3)} onPrev={() => setCurrentPage(1)} />,
      back: <LeftPageContent pageData={pagesData[3]} pageNumber={3} />
    },
    {
      front: <RightPageContent pageData={pagesData[3]} pageNumber={3} onNext={() => setCurrentPage(4)} onPrev={() => setCurrentPage(2)} isLast />,
      back: (
        <div className="w-full h-full bg-stone-900 text-stone-300 p-12 flex flex-col justify-center items-center shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
          <h2 className="text-4xl font-black uppercase tracking-[0.3em]">End of File</h2>
          <button onClick={() => setCurrentPage(0)} className="mt-8 border border-stone-500 px-6 py-2 uppercase text-xs tracking-widest hover:bg-stone-700 transition-colors">
            Return to Cover
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center overflow-hidden font-serif">
      <motion.div 
        animate={{ x: xShift, scale: fitScale }}
        initial={{ scale: 0.2, y: '50vh', rotate: -720 }}
        animate={{ 
          x: xShift, 
          y: 0, 
          rotate: 0, 
          scale: fitScale,
          transition: { type: 'spring', damping: 20, stiffness: 60, duration: 1.2 }
        }}
        className="relative w-[1600px] h-[1066px] preserve-3d"
        style={{ perspective: '3000px' }}
      >
        {/* Render all sheets */}
        {sheets.map((sheet, index) => {
          const isFlipped = currentPage > index;
          const zIndex = isFlipped ? index : sheets.length - index;

          return (
            <motion.div
              key={index}
              className="absolute top-0 right-0 w-[800px] h-full preserve-3d origin-left"
              style={{ zIndex }}
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Front side */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-white shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] border-r border-stone-200">
                {sheet.front}
              </div>
              {/* Back side */}
              <div 
                className="absolute inset-0 [backface-visibility:hidden] bg-white shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] border-l border-stone-200" 
                style={{ transform: 'rotateY(180deg)' }}
              >
                {sheet.back}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

/* --- COVER PAGE COMPONENT --- */
const CoverPage = ({ onOpen }: { onOpen: () => void }) => (
  <div className="w-full h-full bg-stone-100 border-8 border-double border-stone-800 p-8 flex flex-col justify-between overflow-hidden relative shadow-[10px_0_30px_rgba(0,0,0,0.2)]">
    {/* Hero Background Image */}
    <div 
      className="absolute inset-0 z-0 opacity-70 mix-blend-darken"
      style={{
        backgroundImage: 'url(/noir_tech_portrait.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }}
    />

    {/* Header */}
    <div className="text-center border-b-4 border-black pb-4 relative z-10 bg-white/30 backdrop-blur-sm p-4 -mx-4 rounded-xl shadow-sm">
      <h2 className="text-sm tracking-[0.3em] font-sans font-black uppercase text-black drop-shadow-md">Special Tech Edition 2026</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mt-2 text-stone-900 drop-shadow-[0_4px_4px_rgba(255,255,255,0.9)]" style={{ WebkitTextStroke: '1px white' }}>THE LOGIC</h1>
      <div className="flex justify-between items-center mt-2 px-1 italic text-lg border-t border-black bg-white/50 py-1">
        <span className="text-black font-semibold">Vol. 01</span>
        <span className="font-bold text-black">PRICE: 0.00 BTC</span>
      </div>
    </div>

    {/* Hero Section */}
    <div className="flex-grow py-8 relative z-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white font-bold rotate-12 text-center leading-tight border-4 border-white shadow-lg z-20">
        NEW DEV <br/> IN CITY!
      </div>
      
      <div className="border-l-4 border-black pl-6 mt-12 bg-white/40 backdrop-blur-sm py-2 pr-4 rounded-r-xl max-w-lg">
        <h3 className="text-5xl font-extrabold leading-tight uppercase text-black drop-shadow-md">
          Cracking the <span className="text-red-700 underline decoration-double">Code Crime</span>
        </h3>
        <p className="mt-4 text-xl font-medium max-w-md text-stone-900 font-bold">
          A Software Developer & Project Manager with logic so sharp, it's almost illegal.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <div className="flex items-center gap-3 bg-black text-white p-2 w-fit">
          <Terminal size={20} />
          <span className="uppercase tracking-widest text-sm">Full-Stack Investigations</span>
        </div>
        <div className="flex items-center gap-3 bg-red-700 text-white p-2 w-fit">
          <Briefcase size={20} />
          <span className="uppercase tracking-widest text-sm">Agile Management Strategy</span>
        </div>
      </div>
    </div>

    {/* Footer/CTA */}
    <div className="border-t-2 border-black pt-4 flex justify-between items-end relative z-10 bg-white/40 backdrop-blur-sm p-4 -mx-4 rounded-xl mt-4">
      <div className="w-2/3">
        <p className="text-xs font-sans uppercase font-bold tracking-tighter text-black drop-shadow-sm">Headline Story:</p>
        <p className="text-2xl font-bold leading-none italic text-black drop-shadow-sm">"How she managed a 500-ticket backlog without breaking a sweat."</p>
      </div>
      <button 
        onClick={onOpen}
        className="group flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
      >
        <span className="text-[10px] uppercase font-black mb-1">Open File</span>
        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          →
        </div>
      </button>
    </div>
  </div>
);

/* --- LEFT PAGE COMPONENT --- */
const LeftPageContent = ({ pageData, pageNumber }: any) => (
  <div 
    className="w-full h-full bg-[#f4f1ea] p-12 overflow-hidden flex flex-col justify-between"
    style={{ backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}
  >
    <div>
      <h2 className="text-4xl font-black border-b-2 border-black mb-6 uppercase italic">{pageData.title}</h2>
      <div className="space-y-6 text-stone-800 leading-relaxed">
        {pageNumber === 1 && (
          <>
            <p className="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
              The summary of a visionary. Balancing the rigid structures of software architecture 
              with the dynamic flow of project leadership.
            </p>
            <div className="bg-stone-200 p-4 border-l-4 border-red-700 italic">
              "Logic is the beginning of wisdom, but creativity is the end of the game."
            </div>
          </>
        )}
        {pageNumber === 2 && (
          <div className="text-sm space-y-4 font-sans">
             <div className="border-b border-stone-300 pb-2">
                <p className="font-bold uppercase tracking-tighter">Project: Neural-Net Dashboard</p>
                <p className="italic text-xs">Role: Lead Dev & PM</p>
             </div>
             <div className="border-b border-stone-300 pb-2">
                <p className="font-bold uppercase tracking-tighter">System: Dark-Mode Ledger</p>
                <p className="italic text-xs">Role: Senior Architect</p>
             </div>
          </div>
        )}
      </div>
    </div>
    <div className="mt-8 text-left font-mono text-base font-bold text-black border-t-2 border-black pt-4">
      PAGE {pageNumber * 2 - 1}
    </div>
  </div>
);

/* --- RIGHT PAGE COMPONENT --- */
const RightPageContent = ({ pageData, pageNumber, onNext, onPrev, isLast }: any) => (
  <div 
    className="w-full h-full bg-[#f4f1ea] p-12 overflow-hidden flex flex-col justify-between"
    style={{ backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}
  >
    <div className="prose prose-stone">
      <p className="uppercase text-[10px] tracking-widest font-sans font-bold text-stone-500 mb-2">Evidence Folder</p>
      <div className="h-64 w-full bg-stone-300 border-2 border-dashed border-stone-400 flex items-center justify-center text-stone-500">
         {/* Replace with your project images */}
         [Visual Evidence Placeholder]
      </div>
    </div>

    <div className="flex justify-between mt-8 items-end border-t-2 border-black pt-4 text-black">
      <button onClick={onPrev} className="uppercase text-sm font-black underline decoration-2 cursor-pointer hover:text-red-700 transition-colors">
        ← Back
      </button>
      <span className="font-mono text-base font-bold">PAGE {pageNumber * 2}</span>
      {!isLast ? (
        <button onClick={onNext} className="uppercase text-sm font-black underline decoration-2 cursor-pointer hover:text-red-700 transition-colors">
          Next Page →
        </button>
      ) : (
        <button onClick={onNext} className="uppercase text-sm font-black underline decoration-2 cursor-pointer hover:text-red-700 transition-colors">
          Close File ✖
        </button>
      )}
    </div>
  </div>
);

export default MagazinePortfolio;

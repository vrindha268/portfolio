import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Code2, Briefcase, BrainCircuit, Terminal, Mail } from 'lucide-react';

const MagazinePortfolio = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    { type: 'cover' },
    { title: 'The Manifesto', content: 'Summary & Philosophy' },
    { title: 'The Field Report', content: 'Experience & Projects' },
    { title: 'The Blueprint', content: 'Technical Arsenal' },
  ];

  // Paper-boy toss animation
  const tossVariants = {
    initial: { x: '-100vw', y: '50vh', rotate: -720, scale: 0.2 },
    animate: { 
      x: 0, 
      y: 0, 
      rotate: -5, 
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 50, duration: 1.2 }
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center p-4 overflow-hidden font-serif">
      <motion.div 
        variants={tossVariants}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-4xl aspect-[3/4] bg-white shadow-2xl preserve-3d"
        style={{ perspective: '2000px' }}
      >
        <AnimatePresence mode="wait">
          {currentPage === 0 ? (
            <CoverPage key="cover" onOpen={() => setCurrentPage(1)} />
          ) : (
            <InsideSpread 
              pageData={pages[currentPage]} 
              pageNumber={currentPage} 
              onNext={() => setCurrentPage((prev) => Math.min(prev + 1, 3))}
              onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* --- COVER PAGE COMPONENT --- */
const CoverPage = ({ onOpen }: { onOpen: () => void }) => (
  <motion.div 
    exit={{ rotateY: -160, transition: { duration: 0.8, ease: "easeInOut" } }}
    style={{ transformOrigin: 'left' }}
    className="absolute inset-0 bg-stone-100 border-8 border-double border-stone-800 p-8 flex flex-col justify-between z-50 shadow-[10px_0_30px_rgba(0,0,0,0.2)]"
  >
    {/* Header */}
    <div className="text-center border-b-4 border-black pb-4">
      <h2 className="text-sm tracking-[0.3em] font-sans font-black uppercase">Special Tech Edition 2026</h2>
      <h1 className="text-8xl font-black uppercase tracking-tighter leading-none mt-2">THE LOGIC</h1>
      <div className="flex justify-between items-center mt-2 px-1 italic text-lg border-t border-black">
        <span>Vol. 01</span>
        <span className="font-bold">PRICE: 0.00 BTC</span>
      </div>
    </div>

    {/* Hero Section */}
    <div className="flex-grow py-8 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white font-bold rotate-12 text-center leading-tight border-4 border-white shadow-lg">
        NEW DEV <br/> IN CITY!
      </div>
      
      <div className="border-l-4 border-black pl-6 mt-12">
        <h3 className="text-5xl font-extrabold leading-tight uppercase">
          Cracking the <span className="text-red-700 underline decoration-double">Code Crime</span>
        </h3>
        <p className="mt-4 text-xl font-medium max-w-md">
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
    <div className="border-t-2 border-black pt-4 flex justify-between items-end">
      <div className="w-2/3">
        <p className="text-xs font-sans uppercase font-bold tracking-tighter">Headline Story:</p>
        <p className="text-2xl font-bold leading-none italic">"How she managed a 500-ticket backlog without breaking a sweat."</p>
      </div>
      <button 
        onClick={onOpen}
        className="group flex flex-col items-center hover:scale-110 transition-transform"
      >
        <span className="text-[10px] uppercase font-black mb-1">Open File</span>
        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          →
        </div>
      </button>
    </div>
  </motion.div>
);

/* --- INSIDE PAGES --- */
const InsideSpread = ({ pageData, pageNumber, onNext, onPrev }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="absolute inset-0 bg-[#f4f1ea] p-12 grid grid-cols-2 gap-8 overflow-hidden"
    style={{ backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}
  >
    {/* Left Column (Static Editorial Style) */}
    <div className="border-r border-stone-400 pr-8">
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

    {/* Right Column (Dynamic Interaction) */}
    <div className="flex flex-col justify-between">
      <div className="prose prose-stone">
        <p className="uppercase text-[10px] tracking-widest font-sans font-bold text-stone-500 mb-2">Evidence Folder</p>
        <div className="h-64 w-full bg-stone-300 border-2 border-dashed border-stone-400 flex items-center justify-center text-stone-500">
           {/* Replace with your project images */}
           [Visual Evidence Placeholder]
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="uppercase text-xs font-black underline decoration-2">← Back</button>
        <span className="font-mono text-sm">PAGE {pageNumber} / 3</span>
        {pageNumber < 3 && (
          <button onClick={onNext} className="uppercase text-xs font-black underline decoration-2">Next Page →</button>
        )}
      </div>
    </div>
  </motion.div>
);

export default MagazinePortfolio;

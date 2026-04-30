import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Code2, Briefcase, BrainCircuit, Terminal, Mail } from 'lucide-react';

const pagesData = [
  { type: 'cover' },
  { title: "THE LEAD INVESTIGATOR'S DOSSIER", content: 'Summary & Philosophy' },
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
    <div className="min-h-screen bg-stone-200 flex items-center justify-center overflow-hidden font-serif antialiased [text-rendering:optimizeLegibility]">
      <div style={{ zoom: fitScale }} className="flex items-center justify-center">
        <motion.div 
          initial={{ y: '50vh', rotate: -720 }}
          animate={{ 
            x: xShift, 
            y: 0, 
            rotate: 0, 
            transition: { type: 'spring', damping: 20, stiffness: 60, duration: 1.2 }
          }}
          className="relative w-[1600px] h-[1066px] preserve-3d"
          style={{ perspective: '3000px', transformStyle: 'preserve-3d', WebkitFontSmoothing: 'antialiased' }}
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
              <div 
                className="absolute inset-0 bg-white shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)] border-r border-stone-200"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                {sheet.front}
              </div>
              {/* Back side */}
              <div 
                className="absolute inset-0 bg-white shadow-[inset_-10px_0_20px_rgba(0,0,0,0.05)] border-l border-stone-200" 
                style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                {sheet.back}
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
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
            <div className="border-b-4 border-double border-black pb-4 mb-6">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">THE MANIFESTO</h3>
              <p className="font-bold text-sm tracking-widest text-red-700">CLASSIFIED DOSSIER - LEVEL 5 CLEARANCE</p>
            </div>
            <p className="font-bold text-lg leading-snug border-l-4 border-black pl-4 mb-6">
              A record of methodologies, strategic interventions, and the unyielding pursuit of flawless execution.
            </p>
            <p className="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left text-justify text-stone-700">
              Every system has its vulnerabilities. Every architecture has its breaking points. The role of a true engineer is not just to patch the cracks, but to anticipate the earthquake. 
            </p>
            <p className="text-justify mt-4 text-stone-700">
              The pages that follow document a history of taking chaos and transforming it into order. From managing sprawling project backlogs to architecting resilient codebases, this dossier serves as both a testament to past operations and a blueprint for future endeavors.
            </p>
            <div className="mt-12 space-y-3 font-mono text-sm border-t-2 border-black pt-4">
              <div className="flex justify-between border-b border-stone-300 pb-1">
                <span>Subject:</span> <span className="font-bold text-black">MEENAKSHI KARNATAKA</span>
              </div>
              <div className="flex justify-between border-b border-stone-300 pb-1">
                <span>Designation:</span> <span className="font-bold text-black">LEAD DEV & PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-300 pb-1">
                <span>Status:</span> <span className="font-bold text-red-700">ACTIVE - ASSIGNING NEXT TICKET</span>
              </div>
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
    <div className="prose prose-stone flex-grow flex flex-col">
      <p className="uppercase text-[10px] tracking-widest font-sans font-bold text-stone-500 mb-2">Evidence Folder</p>
      {pageNumber === 1 ? (
        <>
          <div className="h-[200px] w-full bg-black border-4 border-black flex items-center justify-center text-stone-500 overflow-hidden relative mb-6 shadow-xl shrink-0">
             <img src="/color_detective_alley.png" alt="Color Noir Detective Lead Investigator" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-3 border-b-4 border-black pb-2 text-black drop-shadow-sm">THE ARCHITECT OF ORDER</h3>
              <p className="font-bold text-xl leading-snug border-l-4 border-black pl-4 mb-5 text-stone-900 drop-shadow-sm">
                Tracking the movements of Meenakshi Karnataka—the developer who solves system failures before they become crimes.
              </p>
              
              <div className="text-justify text-lg text-stone-900 font-bold leading-relaxed space-y-4 drop-shadow-sm">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:text-black">
                  In a city drowning in chaotic code and unorganized data, one operative stands out. Meenakshi isn't just a developer; she's a forensic specialist for the digital age. 
                </p>
                <p>
                  From the streets of Bhadradri Kothagudem to the high-stakes servers of Lupyd Media, she has made it her mission to hunt down bugs and deploy scalable justice.
                </p>
                <p className="mt-4 font-black italic border-l-4 border-stone-500 bg-stone-200 p-4 text-xl shadow-inner">
                  "She doesn't just write code; she builds ironclad alibis for every application she touches."
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-black p-4 border-l-[8px] border-red-700 shadow-xl text-white">
              <span className="uppercase text-sm font-bold text-red-500 tracking-widest block mb-1">The Summary</span>
              <span className="font-black italic text-2xl">A NEW PHILOSOPHY OF CODE</span>
            </div>
          </div>
        </>
      ) : pageNumber === 2 ? (
        <>
          <div className="h-[200px] w-full bg-black border-4 border-black flex items-center justify-center text-stone-500 overflow-hidden relative mb-6 shadow-xl shrink-0">
             <img src="/coding_evidence_board.png" alt="Coding Evidence Board" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
          <div className="flex flex-col flex-grow h-full overflow-hidden">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 border-b-4 border-black pb-2 text-black drop-shadow-sm">THE EVIDENCE BOARD</h3>
            <p className="font-bold text-lg uppercase tracking-widest text-red-700 mb-4">WORK EXPERIENCE DOSSIER</p>
            
            <div className="space-y-4 text-stone-900 font-medium">
              {/* Lupyd Media Section */}
              <div className="bg-stone-200 border-l-[6px] border-black p-4 shadow-md relative">
                <div className="absolute -left-3 top-4 w-4 h-4 rounded-full bg-red-600 border-2 border-black shadow-sm"></div>
                <div className="mb-3 border-b-2 border-stone-300 pb-2">
                  <div className="flex justify-between items-end">
                    <span className="font-black text-xl uppercase tracking-tighter">Lupyd Media Private Limited</span>
                    <span className="text-xs font-bold text-stone-600 uppercase">Jan 2025 – Present</span>
                  </div>
                  <span className="text-sm font-bold text-red-700 uppercase tracking-widest block mt-1">STATUS: Lead Undercover Intern</span>
                </div>
                
                <ul className="space-y-3 text-[15px] leading-snug pl-2">
                  <li className="flex gap-2">
                    <span className="font-black text-black shrink-0">The Surveillance System:</span> 
                    <span>Deployed a high-speed Notification System using Kafka to track every movement in real-time.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black text-black shrink-0">The Paper Trail:</span> 
                    <span>Engineered RESTful APIs and integrated third-party services, ensuring no data packet goes missing.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-black text-black shrink-0">The Clean-Up:</span> 
                    <span>Optimized database queries and neutralized bugs through rigorous unit testing, leaving the system cleaner than a wiped hard drive.</span>
                  </li>
                </ul>
              </div>

              {/* Indoctrinate & Training Grounds Section */}
              <div className="bg-stone-200 border-l-[6px] border-black p-4 shadow-md relative mt-4">
                <div className="absolute -left-3 top-4 w-4 h-4 rounded-full bg-stone-500 border-2 border-black shadow-sm"></div>
                <div className="mb-3 border-b-2 border-stone-300 pb-2">
                  <div className="flex justify-between items-end">
                    <span className="font-black text-xl uppercase tracking-tighter">Indoctrinate & Training Grounds</span>
                    <span className="text-xs font-bold text-stone-600 uppercase">2022 – 2023</span>
                  </div>
                  <span className="text-sm font-bold text-red-700 uppercase tracking-widest block mt-1">STATUS: The Specialist</span>
                </div>
                
                <p className="text-[15px] leading-snug font-bold italic pl-4 border-l-4 border-stone-400">
                  "Before hitting the big leagues, she trained the next generation of operatives in the Microsoft Office Suite, sharpening their technical edge for the field."
                </p>
              </div>
            </div>
          </div>
        </>
      ) : pageNumber === 3 ? (
        <>
          <div className="h-[200px] w-full bg-black border-4 border-black flex items-center justify-center text-stone-500 overflow-hidden relative mb-4 shadow-xl shrink-0">
             <img src="/tactical_operator.png" alt="Tactical Operations Interface" className="absolute inset-0 w-full h-full object-cover object-center" />
          </div>
          <div className="flex flex-col flex-grow h-full overflow-hidden">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-1 border-b-4 border-black pb-1 text-black drop-shadow-sm">THE CASE FILES (PROJECTS)</h3>
            
            <div className="space-y-3 mt-2 text-stone-900 font-medium">
              {/* CASE 1 */}
              <div className="border-l-4 border-red-700 pl-3">
                <span className="font-black text-black uppercase tracking-wide block">CASE #1: "Find Me" (The Search & Rescue)</span>
                <p className="text-sm leading-snug"><span className="font-bold text-stone-700">The Mission:</span> Developing a high-stakes Crash Detection Application.</p>
                <p className="text-sm leading-snug"><span className="font-bold text-stone-700">The Tech:</span> Using a tactical stack of React, Capacitor, and Django to alert family members the moment a signal goes dark.</p>
              </div>

              {/* CASE 2 */}
              <div className="border-l-4 border-black pl-3">
                <span className="font-black text-black uppercase tracking-wide block">CASE #2: "Figo" (The Ticket Syndicate)</span>
                <p className="text-sm leading-snug"><span className="font-bold text-stone-700">The Mission:</span> Building a seamless booking network using Next.js and Spring to manage the city's movement without a hitch.</p>
              </div>

              {/* CASE 3 */}
              <div className="border-l-4 border-black pl-3">
                <span className="font-black text-black uppercase tracking-wide block">CASE #3: "Weather Today" (The Oracle)</span>
                <p className="text-sm leading-snug"><span className="font-bold text-stone-700">The Mission:</span> Using Machine Learning (Tensorflow) to predict the unpredictable. She knows when the storm is coming before the first drop hits.</p>
              </div>

              {/* TACTICAL GEAR */}
              <div className="mt-3 pt-3 border-t-4 border-dashed border-stone-400 bg-stone-200 p-3 shadow-inner">
                <p className="font-black text-base uppercase tracking-widest text-red-700 mb-2">The Tactical Gear (Technical Skills)</p>
                <ul className="text-sm space-y-1">
                  <li><span className="font-bold text-black">Primary Weapons:</span> TypeScript (React/Next.js), Python (Django), and Java (Spring).</li>
                  <li><span className="font-bold text-black">Field Equipment:</span> Docker, Git, JIRA, and Trello.</li>
                  <li><span className="font-bold text-black">Special Ops:</span> Project Management, DevOps, and Team Leadership.</li>
                  <li><span className="font-bold text-black">Linguistic Encryption:</span> Fluent in English, Hindi, and Telugu.</li>
                </ul>
              </div>
              
              <p className="mt-2 text-center font-black italic text-base border-y-2 border-black py-2 bg-black text-white shadow-md">
                "In the world of software, there are no accidents—only undiscovered logic."
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="h-64 w-full bg-stone-300 border-2 border-dashed border-stone-400 flex items-center justify-center text-stone-500">
           {/* Replace with your project images */}
           [Visual Evidence Placeholder]
        </div>
      )}
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

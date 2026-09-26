import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Shield,
  Activity,
  Check,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Palette,
  Moon,
  Baby,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Lock,
  Menu,
  Heart,
  Smile,
  CheckCircle2,
  Coffee
} from 'lucide-react';

// Daycare information constants
const DAYCARE_INFO = {
  name: "Little Stars Daycare",
  owner: "Rachel J. Tineo",
  address: "2395 Tiebout Avenue #1-a, Bronx, NY 10458",
  phone: "(646) 620-0119",
  phoneLink: "tel:+16466200119",
  license: "Licensed #875410",
  subsidy: "Accepts Subsidy",
  hours: "Mon - Fri: 7:30 AM - 6:00 PM",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=2395+Tiebout+Avenue+%231-a+Bronx+NY+10458"
};

// 6 Uploaded Images with direct URLs and details
const IMAGES = [
  {
    id: 1,
    url: "https://i.ibb.co/TMRJsm3H/IMG-6441.jpg",
    caption: "Bright Learning Space",
    description: "Our main interactive table where children engage in painting, early math exercises, and educational board activities under loving supervision."
  },
  {
    id: 2,
    url: "https://i.ibb.co/5gtf32Cw/IMG-6440.jpg",
    caption: "Cozy Nap Room",
    description: "A peaceful, climate-controlled space equipped with soft individual seating and resting mats, designed for daily restorative naps."
  },
  {
    id: 3,
    url: "https://i.ibb.co/5x8RBtSS/IMG-6439.jpg",
    caption: "Creative Art Area",
    description: "A wide, stimulating room with early education materials, alphabetical posters, a cozy reading chair, and child-safe play structures."
  },
  {
    id: 4,
    url: "https://i.ibb.co/mrFQzFMB/IMG-6438.jpg",
    caption: "Reading & Story Corner",
    description: "A clean, bright learning table where kids practice coloring and developing their fine motor skills with engaging learning tools."
  },
  {
    id: 5,
    url: "https://i.ibb.co/hx2fJWVz/IMG-6437.jpg",
    caption: "Gated Safe Entrance",
    description: "A secure, double-gated home entrance with educational toys and puzzles to welcome little stars every single morning."
  },
  {
    id: 6,
    url: "https://i.ibb.co/MydwdXDy/IMG-6436.jpg",
    caption: "Play Area Near Park",
    description: "Our daily reading circle time where children listen to stories, develop vocabulary, and build healthy social connections."
  }
];

export default function App() {
  // Navigation Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gallery Lightbox State
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    program: 'Infant Care ($258/wk)',
    preferredDate: '',
    message: ''
  });

  // Form Error State
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Confirmation Modal State (To ensure data integrity)
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lightbox Navigation handlers
  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % IMAGES.length);
    }
  };

  // Form inputs change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Pre-submit validation
  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.parentName.trim()) errors.parentName = "Parent name is required.";
    if (!formData.childName.trim()) errors.childName = "Child name is required.";
    if (!formData.childAge.trim()) errors.childAge = "Child age or estimated age is required.";
    
    // Simple phone check
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (cleanPhone.length < 10) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Simple email check
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.preferredDate) {
      errors.preferredDate = "Please choose a preferred tour date.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Scroll to form if there are errors
      const formElement = document.getElementById('enrollment-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // If valid, open confirmation modal to ensure data integrity
    setValidationErrors({});
    setShowConfirmModal(true);
  };

  // Final submission confirming data integrity
  const handleFinalConfirm = () => {
    // Process submission (simulate database save or email sending)
    setIsSubmitted(true);
  };

  // Reset form after successful tour booking
  const handleCloseSuccess = () => {
    setShowConfirmModal(false);
    setIsSubmitted(false);
    setFormData({
      parentName: '',
      childName: '',
      childAge: '',
      phone: '',
      email: '',
      program: 'Infant Care ($258/wk)',
      preferredDate: '',
      message: ''
    });
  };

  // Quick program selector (auto scroll to form & select program)
  const selectAndScrollToForm = (programName: string) => {
    setFormData(prev => ({ ...prev, program: programName }));
    const formElement = document.getElementById('enrollment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col selection:bg-[#FFD93D]/30 selection:text-slate-900">
      
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-[#FFD93D] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Star className="w-5 h-5 text-amber-800 fill-amber-800" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">
                  Little Stars <span className="text-[#6BCB77]">Daycare</span>
                </span>
              </a>
            </div>

            {/* Zone 2: Nav links, 1-2 word labels, single-line */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#about" className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#FFD93D] decoration-2 transition-colors">
                Meet Rachel
              </a>
              <a href="#gallery" className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#FFD93D] decoration-2 transition-colors">
                Inside Our Home
              </a>
              <a href="#why-us" className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#FFD93D] decoration-2 transition-colors">
                Why Us
              </a>
              <a href="#programs" className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#FFD93D] decoration-2 transition-colors">
                Programs
              </a>
              <a href="#testimonials" className="hover:text-slate-900 hover:underline underline-offset-4 decoration-[#FFD93D] decoration-2 transition-colors">
                Reviews
              </a>
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="hidden sm:flex items-center gap-4">
              <a 
                href={DAYCARE_INFO.phoneLink} 
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-slate-700 bg-stone-100 hover:bg-stone-200 text-sm font-semibold transition-colors shrink-0"
              >
                <Phone className="w-4 h-4 text-[#6BCB77]" />
                <span>(646) 620-0119</span>
              </a>
              <a 
                href="#enrollment-form" 
                className="px-5 py-2.5 rounded-full bg-[#6BCB77] text-white hover:bg-[#5bb867] hover:shadow-md active:scale-98 text-sm font-semibold transition-all shrink-0 whitespace-nowrap"
              >
                Book Free Tour
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F5] border-b border-stone-200 px-4 py-6 space-y-4">
            <nav className="flex flex-col gap-4 text-base font-semibold text-slate-700">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900 transition-colors">
                Meet Rachel
              </a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900 transition-colors">
                Inside Our Home
              </a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900 transition-colors">
                Why Us
              </a>
              <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900 transition-colors">
                Programs
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900 transition-colors">
                Reviews
              </a>
            </nav>
            <div className="pt-4 border-t border-stone-200/50 flex flex-col gap-3">
              <a 
                href={DAYCARE_INFO.phoneLink} 
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-slate-800 font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#6BCB77]" />
                <span>Call Rachel: (646) 620-0119</span>
              </a>
              <a 
                href="#enrollment-form" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 rounded-xl bg-[#6BCB77] text-white font-semibold text-sm text-center shadow-sm hover:bg-[#5bb867]"
              >
                Book Free Tour
              </a>
              <div className="text-center text-xs text-stone-500 font-medium pt-2">
                Licensed Home Daycare · Accepts Subsidy
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-16 px-4 md:px-8 bg-slate-950 overflow-hidden">
        {/* Main hero background: Image 1 with dark overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://i.ibb.co/TMRJsm3H/IMG-6441.jpg" 
            alt="Little Stars Daycare Classroom" 
            className="w-full h-full object-cover object-center transform scale-105 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          {/* Measured Dark Scrim for visual contrast (WCAG AA Compliant) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-slate-950/80" />
        </div>

        {/* Hero Content Area */}
        <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
          
          {/* Super-polished announcement header */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2 rounded-full bg-amber-400/10 border border-[#FFD93D]/30 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6BCB77] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
              Accepting Subsidy
            </span>
            <span className="text-xs text-white/50">·</span>
            <span className="text-xs font-semibold text-white/90">
              Limited Enrolment Spots Open
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-serif text-wrap-balance tracking-tight">
            A Safe, Loving Home Where <br className="hidden sm:inline" />
            <span className="text-[#FFD93D] relative inline-block">
              Little Stars Shine
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#6BCB77]" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,7 C30,2 70,2 100,7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span> <br className="hidden sm:inline" />
            in Fordham Manor
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-stone-200 font-medium leading-relaxed">
            Licensed Home Daycare at <span className="text-white underline decoration-[#FFD93D] decoration-2 underline-offset-4">2395 Tiebout Ave</span> | Gated Entrance | Nap Room | Art & Reading Area
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="#enrollment-form" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6BCB77] text-white hover:bg-[#5bb867] font-bold text-base shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Tour</span>
            </a>
            
            <a 
              href={DAYCARE_INFO.phoneLink} 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 font-bold text-base backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-[#FFD93D]" />
              <span>Call (646) 620-0119</span>
            </a>
          </div>

          {/* Licenses and trust bullets */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium pt-8">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Shield className="w-4 h-4 text-[#6BCB77]" />
              <span>New York State Licensed #{DAYCARE_INFO.license.replace("Licensed #", "")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
              <span>Accepts HRA & ACS Subsidy</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Activity className="w-4 h-4 text-[#6BCB77]" />
              <span>CPR & First Aid Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST ROW (ANTI-STOCK PROOF) ================= */}
      <section className="bg-amber-50/70 border-y border-amber-200/50 py-5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex -space-x-2">
              {/* Little circular crops of our actual images to prove reality */}
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                <img src={IMAGES[0].url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                <img src={IMAGES[2].url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                <img src={IMAGES[4].url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <span className="text-sm font-semibold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#6BCB77] fill-amber-300" />
              Real Photos From Our Daycare — Not Stock Images
            </span>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image 2 - Owner with kids image */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-[#FFD93D]/25 rounded-[32px] transform rotate-2 -z-10" />
            <div className="absolute -inset-4 bg-[#6BCB77]/15 rounded-[32px] transform -rotate-2 -z-10" />
            <div className="relative rounded-[24px] overflow-hidden shadow-xl aspect-[4/5] bg-white group border-4 border-white">
              <img 
                src="https://i.ibb.co/5gtf32Cw/IMG-6440.jpg" 
                alt="Teacher Rachel J. Tineo with daycare babies" 
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
                <p className="text-xs font-bold text-[#FFD93D] uppercase tracking-wide">Daycare Director</p>
                <h4 className="text-lg font-bold">{DAYCARE_INFO.owner}</h4>
                <p className="text-xs text-white/90">NYS Certified & Fully Licensed Provider</p>
              </div>
            </div>
          </div>

          {/* Right Column: Text and Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 rounded-md bg-[#6BCB77]/10 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Nurturing Home-Away-From-Home
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif leading-tight text-wrap-balance">
              Meet Rachel — CPR & First Aid Certified
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                Welcome to Little Stars! As a licensed provider in the Bronx, my mission is to provide a safe, warm, and loving environment that stimulates early learning and self-confidence.
              </p>
              <p className="font-medium text-slate-800">
                We balance safety, education, and fun in a clean gated home with dedicated nap room, art area, and reading corner. Family neighborhood with park nearby, street parking.
              </p>
              <p>
                In our home daycare, your child is not just a student; they are part of our family. We maintain a small cohort size to ensure every little star gets the focused attention they need during these crucial early developmental years.
              </p>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#6BCB77]" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">NYS Licensed</h5>
                  <p className="text-xs text-stone-500">NYS Registration #875410</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-[#FFD93D]" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">CPR & First Aid</h5>
                  <p className="text-xs text-stone-500">Emergency Trained & Certified</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-[#6BCB77]" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">Gated Entrance</h5>
                  <p className="text-xs text-stone-500">Double secure pickup & dropoff</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Smile className="w-4 h-4 text-[#FFD93D]" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">Accepts Subsidy</h5>
                  <p className="text-xs text-stone-500">HRA, ACS & NYC child care funds</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a 
                href="#enrollment-form" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFD93D] text-amber-950 font-bold text-sm hover:shadow-md hover:bg-[#ffe266] transition-all"
              >
                <span>Schedule a Free Tour</span>
              </a>
              <a 
                href={DAYCARE_INFO.phoneLink} 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-slate-700 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#6BCB77]" />
                <span>Call Rachel: (646) 620-0119</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY / FACILITY TOUR (MOST IMPORTANT) ================= */}
      <section id="gallery" className="py-20 bg-stone-100/70 border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
          <div className="inline-block px-3 py-1 rounded-md bg-[#FFD93D]/20 text-amber-950 text-xs font-bold uppercase tracking-wider">
            Photo Tour
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Inside Our Safe & Clean Home
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base">
            Click any picture to expand and read more about our clean, fully-licensed classroom, nap area, and safety setup. 100% genuine photos.
          </p>
        </div>

        {/* 6 Image Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {IMAGES.map((img, index) => (
              <div 
                key={img.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group cursor-pointer bg-white rounded-[20px] p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-200/40"
              >
                {/* Photo frame */}
                <div className="aspect-[4/3] w-full rounded-[14px] overflow-hidden bg-stone-50 relative">
                  <img 
                    src={img.url} 
                    alt={img.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover icon */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Caption & detail info */}
                <div className="pt-4 pb-2 px-1 flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {img.caption}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                      {img.description}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Photo {img.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous image button */}
          <button 
            onClick={handlePrevPhoto}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next image button */}
          <button 
            onClick={handleNextPhoto}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Photo Frame */}
          <div 
            className="max-w-4xl w-full flex flex-col items-center bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking container
          >
            {/* Image content */}
            <div className="w-full relative aspect-[4/3] bg-black max-h-[70vh]">
              <img 
                src={IMAGES[activePhotoIndex].url} 
                alt={IMAGES[activePhotoIndex].caption} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Captions / Details */}
            <div className="w-full bg-stone-900 p-6 text-white border-t border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-[#FFD93D]">
                  {IMAGES[activePhotoIndex].caption}
                </h4>
                <span className="text-xs font-semibold text-[#6BCB77] uppercase tracking-widest">
                  Photo {activePhotoIndex + 1} of {IMAGES.length}
                </span>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed">
                {IMAGES[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= WHY US SECTION ================= */}
      <section id="why-us" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-md bg-[#6BCB77]/10 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Premium Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Why Little Stars Daycare?
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base">
            We provide a licensed, clean, home environment specifically arranged to meet NYS childcare safety and early education standards.
          </p>
        </div>

        {/* 6 Features Grid with Image Crops as backing elements or beautifully integrated visual frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Gated Entrance */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 3 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/5x8RBtSS/IMG-6439.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#6BCB77] flex items-center justify-center mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Gated Entrance</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Equipped with multiple security barriers and double gates at the door, ensuring absolutely controlled pickup, drop-off, and maximum security for children.
            </p>
          </div>

          {/* Card 2: Nap Room */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 4 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/mrFQzFMB/IMG-6438.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFD93D] flex items-center justify-center mb-6">
              <Moon className="w-6 h-6 fill-amber-300 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cozy Nap Room</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Quiet, sanitized space away from play areas. We adhere to safe sleeping guidelines with fresh, individualized linens for each little star to recharge comfortably.
            </p>
          </div>

          {/* Card 3: Art Area */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 3 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/5x8RBtSS/IMG-6439.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#6BCB77] flex items-center justify-center mb-6">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Art Area</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              From finger-painting to modeling clay, our sensory art tables are loaded with safe materials that foster kids' creativity, hand-eye coordination, and imagination.
            </p>
          </div>

          {/* Card 4: Reading Corner */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 4 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/mrFQzFMB/IMG-6438.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFD93D] flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reading Corner</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our cozy story circle encourages early vocabulary, sound recognition, and communication. We feature bilingual children's literature to support native speakers and learners.
            </p>
          </div>

          {/* Card 5: Clean & Nurturing */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 3 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/5x8RBtSS/IMG-6439.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#6BCB77] flex items-center justify-center mb-6">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Clean & Nurturing</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Sanitized daily. We strictly clean toys, highchairs, play carpets, and eating surfaces using baby-safe, eco-friendly disinfecting products.
            </p>
          </div>

          {/* Card 6: Subsidy Accepted */}
          <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Background element: Subtle cropped thumbnail of Image 4 */}
            <div className="absolute right-0 top-0 w-24 h-24 opacity-5 group-hover:scale-110 transition-transform">
              <img src="https://i.ibb.co/mrFQzFMB/IMG-6438.jpg" alt="" className="w-full h-full object-cover rounded-bl-3xl" referrerPolicy="no-referrer" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFD93D] flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Subsidy Accepted</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We proudly partner with NYC program sponsors. We accept ACS, HRA, and local child development subsidies to help Bronx families secure high-end home childcare.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PROGRAMS SECTION ================= */}
      <section id="programs" className="py-20 bg-stone-100/70 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-3 py-1 rounded-md bg-[#FFD93D]/20 text-amber-950 text-xs font-bold uppercase tracking-wider">
              Enrolment Options
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Flexible Programs & Affordable Pricing
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base">
              NYS licensed daycare structured around infant, toddler, and after-school milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Program 1: Infant */}
            <div className="bg-white rounded-[24px] border border-stone-200/50 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
              {/* Cropped top image: Image 2 (sweet toddlers at baby chairs) */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://i.ibb.co/5gtf32Cw/IMG-6440.jpg" 
                  alt="Infant Daycare Program" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Infants
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-slate-900">Infant Care</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#6BCB77] font-mono">$258</span>
                      <span className="text-xs text-stone-500 font-medium">/wk</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Dedicated, warm attention for our youngest stars. We maintain feeding patterns, physical sensory workouts, tummy exercise sessions, and soft resting practices.
                  </p>

                  <ul className="space-y-2 text-stone-600 text-xs font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>One-on-one attention & holding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Daily developmental log sheets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Sanitized infant rest spaces</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => selectAndScrollToForm("Infant Care ($258/wk)")}
                    className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-[#FFD93D] text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors active:scale-98"
                  >
                    Inquire About Infant Care
                  </button>
                </div>
              </div>
            </div>

            {/* Program 2: Toddler */}
            <div className="bg-white rounded-[24px] border-2 border-[#FFD93D] shadow-md overflow-hidden flex flex-col relative transform lg:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 bg-[#FFD93D] text-amber-950 text-[10px] font-extrabold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>

              {/* Cropped top image: Image 4 (curly boy drawing) */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://i.ibb.co/mrFQzFMB/IMG-6438.jpg" 
                  alt="Toddler Daycare Program" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Toddlers
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-slate-900">Toddler Program</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#6BCB77] font-mono">$232</span>
                      <span className="text-xs text-stone-500 font-medium">/wk</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Socialization, structured daily routine, creative fine art activities, and foundational early communication modules that foster physical confidence and speaking skills.
                  </p>

                  <ul className="space-y-2 text-stone-600 text-xs font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Speech development and word play</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Circle time, shapes & alphabets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Creative coloring & sculpting tables</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => selectAndScrollToForm("Toddler Program ($232/wk)")}
                    className="w-full py-3.5 rounded-xl bg-[#6BCB77] text-white hover:bg-[#5bb867] font-bold text-xs uppercase tracking-wider transition-colors active:scale-98 shadow-sm"
                  >
                    Inquire About Toddler Care
                  </button>
                </div>
              </div>
            </div>

            {/* Program 3: After-School */}
            <div className="bg-white rounded-[24px] border border-stone-200/50 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
              {/* Cropped top image: Image 6 (Rachel reading a story) */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://i.ibb.co/MydwdXDy/IMG-6436.jpg" 
                  alt="After School Care Program" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  After-School
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold text-slate-900">After-School Care</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#6BCB77] font-mono">$165</span>
                      <span className="text-xs text-stone-500 font-medium">/wk</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Designed for school-aged little stars. Includes a safe space after dismissal, homework coaching, nutritious afternoon healthy bites, and engaging storytelling circles.
                  </p>

                  <ul className="space-y-2 text-stone-600 text-xs font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Homework assistance & reading blocks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Nutritious after-school snacks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#6BCB77] shrink-0" />
                      <span>Cooperative puzzle and table games</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => selectAndScrollToForm("After-School ($165/wk)")}
                    className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-[#FFD93D] text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors active:scale-98"
                  >
                    Inquire About After-School
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section id="testimonials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-md bg-[#6BCB77]/10 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Parent Love
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Reviews From Neighborhood Families
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base">
            Read what local Fordham Manor mothers and fathers say about Rachel's warm care and the cleanliness of our home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex gap-1 text-[#FFD93D]">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "Rachel is an absolute godsend! My daughter has been attending Little Stars since she was 8 months old. She literally runs to the gate every morning with excitement. The house is always immaculately clean, cozy, and filled with creative crafts."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#6BCB77]/20 flex items-center justify-center text-emerald-800 font-bold text-sm">
                MS
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Maria S.</h5>
                <p className="text-xs text-stone-500">Parent of Evelyn (1.5 years) · Fordham Manor</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex gap-1 text-[#FFD93D]">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "Finding a licensed Bronx daycare that accepts ACS subsidy and holds itself to such high standards of safety and love seemed impossible. But Rachel is amazing. The art activities, reading circle, and dedicated nap corner are absolutely perfect."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#FFD93D]/20 flex items-center justify-center text-amber-800 font-bold text-sm">
                BT
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Brandon T.</h5>
                <p className="text-xs text-stone-500">Parent of Noah (2 years) · Bronx, NY</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex gap-1 text-[#FFD93D]">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-600 text-sm italic leading-relaxed">
                "We love Rachel's daycare! As a parent, safety is my absolute priority. Rachel's gated entrance, CPR certifications, and clear communications make us feel so comfortable. I highly recommend her to anyone looking for home-based childcare in the neighborhood."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#6BCB77]/20 flex items-center justify-center text-emerald-800 font-bold text-sm">
                YR
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-sm">Yasmine R.</h5>
                <p className="text-xs text-stone-500">Parent of Sophia (3 years) · Kingsbridge</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA WITH MAP & BOOKING FORM ================= */}
      <section id="enrollment-form" className="py-20 bg-stone-100/90 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 bg-white rounded-[28px] border border-stone-200/50 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              
              <div className="space-y-4 mb-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6BCB77] uppercase tracking-wide">
                  <Clock className="w-4 h-4" />
                  <span>Free Tour Scheduling</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  Schedule Your Free In-Person Tour
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Fill out the form below to secure a tour time with Rachel. We will contact you back to confirm your booking and child care requirements.
                </p>
              </div>

              {/* Form Entry */}
              <form onSubmit={handlePreSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Parent's Full Name *
                    </label>
                    <input 
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Maria Sanchez"
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.parentName ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                      }`}
                    />
                    {validationErrors.parentName && (
                      <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.parentName}</p>
                    )}
                  </div>

                  {/* Child Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Child's Name *
                    </label>
                    <input 
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleInputChange}
                      placeholder="e.g. Evelyn Sanchez"
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.childName ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                      }`}
                    />
                    {validationErrors.childName && (
                      <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.childName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Child's Age */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Child's Age / Due Date *
                    </label>
                    <input 
                      type="text"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleInputChange}
                      placeholder="e.g. 18 months or Infant"
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.childAge ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                      }`}
                    />
                    {validationErrors.childAge && (
                      <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.childAge}</p>
                    )}
                  </div>

                  {/* Program selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Program of Interest *
                    </label>
                    <select 
                      name="program"
                      value={formData.program}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77] transition-all"
                    >
                      <option value="Infant Care ($258/wk)">Infant Care ($258/wk)</option>
                      <option value="Toddler Program ($232/wk)">Toddler Program ($232/wk)</option>
                      <option value="After-School ($165/wk)">After-School ($165/wk)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. (646) 620-0119"
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.phone ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                      }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.phone}</p>
                    )}
                  </div>

                  {/* Preferred date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Tour Date *
                    </label>
                    <input 
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                        validationErrors.preferredDate ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                      }`}
                    />
                    {validationErrors.preferredDate && (
                      <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.preferredDate}</p>
                    )}
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address (Optional)
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. parent@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${
                      validationErrors.email ? 'border-red-400 focus:ring-red-100' : 'border-stone-200 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77]'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-xs font-semibold mt-1.5">{validationErrors.email}</p>
                  )}
                </div>

                {/* Special instructions */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Any Questions or Special Requirements?
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g. Schedule preferences, allergies, ACS subsidy questions..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#6BCB77]/20 focus:border-[#6BCB77] transition-all"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#6BCB77] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#5bb867] hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Tour with Rachel</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Right Column: Google Maps & Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              {/* Daycare Details Card */}
              <div className="bg-white rounded-[28px] border border-stone-200/50 p-8 shadow-sm space-y-6">
                <h4 className="text-xl font-bold text-slate-900 font-serif">
                  Contact Information
                </h4>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#FFD93D] flex items-center justify-center shrink-0 border border-amber-100">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Daycare Address</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{DAYCARE_INFO.address}</p>
                      <p className="text-xs text-stone-500 mt-0.5">Fordham Manor, Bronx NY</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#6BCB77] flex items-center justify-center shrink-0 border border-emerald-100">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Call Directly</p>
                      <a href={DAYCARE_INFO.phoneLink} className="text-sm font-bold text-slate-800 hover:text-emerald-700 hover:underline mt-0.5 block">
                        {DAYCARE_INFO.phone}
                      </a>
                      <p className="text-xs text-stone-500 mt-0.5">Owner: {DAYCARE_INFO.owner}</p>
                    </div>
                  </div>

                  {/* License Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">State License ID</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{DAYCARE_INFO.license}</p>
                      <p className="text-xs text-[#6BCB77] font-semibold mt-0.5">Registered & Regulated Daycare</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-600 flex items-center justify-center shrink-0 border border-stone-200/50">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Opening Hours</p>
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{DAYCARE_INFO.hours}</p>
                      <p className="text-xs text-stone-500 mt-0.5">Closed Saturdays & Sundays</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href={DAYCARE_INFO.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs uppercase tracking-wider text-center block transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Styled interactive map component */}
              <div className="bg-white rounded-[28px] border border-stone-200/50 shadow-sm overflow-hidden flex-grow flex flex-col justify-between min-h-[250px] relative group">
                {/* Beautiful Mock Map Canvas */}
                <div className="absolute inset-0 bg-[#e5e3df] overflow-hidden flex items-center justify-center">
                  
                  {/* Styled road outlines */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-1/4 left-0 right-0 h-6 bg-white transform -rotate-3" />
                    <div className="absolute bottom-1/3 left-0 right-0 h-8 bg-white transform rotate-6" />
                    <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-white transform rotate-12" />
                    <div className="absolute top-0 bottom-0 right-1/4 w-10 bg-white transform -rotate-6" />
                  </div>

                  {/* Nearby Park Marker */}
                  <div className="absolute top-12 left-16 px-3 py-1 rounded bg-[#6BCB77]/20 border border-[#6BCB77]/40 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6BCB77]" />
                    <span>Tiebout Park</span>
                  </div>

                  {/* Daycare Pinned Marker */}
                  <div className="relative flex flex-col items-center z-10">
                    <div className="relative">
                      {/* Pulse effect */}
                      <span className="absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-30 animate-ping -top-2 -left-2" />
                      <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg border-2 border-white relative">
                        <MapPin className="w-4 h-4 fill-white text-red-500" />
                      </div>
                    </div>
                    <div className="mt-2 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
                      Little Stars Daycare
                    </div>
                  </div>

                  {/* Compass/Grid details */}
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm rounded px-2 py-1 text-[9px] font-mono text-stone-500">
                    2395 Tiebout Ave, Bronx NY
                  </div>
                </div>

                {/* Footer overlay containing direct maps action */}
                <div className="relative p-4 bg-white/95 backdrop-blur-sm border-t border-stone-200/60 z-10 flex justify-between items-center">
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">Fordham Manor Location</p>
                    <p className="text-stone-500">Easy Bronx street parking</p>
                  </div>
                  <a 
                    href={DAYCARE_INFO.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#FFD93D] text-amber-950 text-xs font-bold hover:bg-[#ffe266] transition-colors"
                  >
                    Get Directions
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CONFIRMATION MODAL (DATA INTEGRITY GUARANTEE) ================= */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-[28px] max-w-lg w-full p-8 shadow-2xl border border-stone-100 flex flex-col space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                {/* Standard Confirmation Mode to protect parent data */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#FFD93D] flex items-center justify-center shrink-0">
                    <Info className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">
                      Confirm Your Request
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">
                      Please verify that your daycare tour reservation details are correct before submitting.
                    </p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/50 space-y-4">
                  
                  {/* Item 1: Parent Name */}
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold text-stone-400 uppercase tracking-wider">Parent</span>
                    <span className="col-span-2 font-bold text-slate-800">{formData.parentName}</span>
                  </div>

                  {/* Item 2: Contact Info */}
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold text-stone-400 uppercase tracking-wider">Phone</span>
                    <span className="col-span-2 font-mono font-bold text-slate-800">{formData.phone}</span>
                  </div>

                  {/* Item 3: Email */}
                  {formData.email && (
                    <div className="grid grid-cols-3 text-xs">
                      <span className="font-semibold text-stone-400 uppercase tracking-wider">Email</span>
                      <span className="col-span-2 font-medium text-slate-800 break-all">{formData.email}</span>
                    </div>
                  )}

                  {/* Item 4: Child Info */}
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold text-stone-400 uppercase tracking-wider">Child Info</span>
                    <span className="col-span-2 font-bold text-slate-800">
                      {formData.childName} ({formData.childAge})
                    </span>
                  </div>

                  {/* Item 5: Program selection */}
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold text-stone-400 uppercase tracking-wider">Program</span>
                    <span className="col-span-2 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block w-fit">
                      {formData.program}
                    </span>
                  </div>

                  {/* Item 6: Date */}
                  <div className="grid grid-cols-3 text-xs">
                    <span className="font-semibold text-stone-400 uppercase tracking-wider">Tour Date</span>
                    <span className="col-span-2 font-bold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#6BCB77]" />
                      {new Date(formData.preferredDate + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Item 7: Message */}
                  {formData.message.trim() && (
                    <div className="grid grid-cols-3 text-xs border-t border-stone-200/50 pt-3">
                      <span className="font-semibold text-stone-400 uppercase tracking-wider">Notes</span>
                      <span className="col-span-2 text-stone-600 line-clamp-2 italic">
                        "{formData.message}"
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors"
                  >
                    Go Back & Edit
                  </button>
                  <button 
                    onClick={handleFinalConfirm}
                    className="flex-1 py-3.5 rounded-xl bg-[#6BCB77] hover:bg-[#5bb867] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </>
            ) : (
              /* Submission Success Screen inside modal */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#6BCB77] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-serif">
                    Tour Request Received!
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Thank you, <span className="font-semibold text-slate-800">{formData.parentName}</span>. Your details have been submitted securely to Rachel.
                  </p>
                </div>

                <div className="bg-[#FAF9F5] rounded-2xl p-4 text-xs text-stone-500 border border-stone-200/50 max-w-sm mx-auto space-y-1.5 text-left">
                  <p className="font-bold text-slate-700 text-center pb-1">What happens next?</p>
                  <p>1. Rachel J. Tineo will review your preferred date.</p>
                  <p>2. We will call you directly at <span className="font-bold text-slate-800 font-mono">{formData.phone}</span> within 24 business hours.</p>
                  <p>3. We'll finalize your tour timing and welcome you and your child!</p>
                </div>

                <button 
                  onClick={handleCloseSuccess}
                  className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-stone-400 mt-auto pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            
            {/* Left Zone: Brand Lockup & Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFD93D] flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-800 fill-amber-800" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white font-serif">
                  Little Stars Daycare
                </span>
              </div>
              <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                Licensed home daycare in Fordham Manor, Bronx, NY. We provide a clean, secure, CPR-certified home setting where infants, toddlers, and school-aged children thrive.
              </p>
              <div className="text-xs text-[#6BCB77] font-semibold">
                NYS Licensed Daycare Provider · {DAYCARE_INFO.license}
              </div>
            </div>

            {/* Middle Zone: Quick Navigation */}
            <div className="lg:col-span-3 space-y-4">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#about" className="hover:text-white hover:underline transition-colors">Meet Rachel</a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white hover:underline transition-colors">Inside Our Home (Photo Tour)</a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-white hover:underline transition-colors">Why Choose Us</a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-white hover:underline transition-colors">Programs & Pricing</a>
                </li>
                <li>
                  <a href="#enrollment-form" className="hover:text-white hover:underline transition-colors">Book Free Tour</a>
                </li>
              </ul>
            </div>

            {/* Right Zone: Official details */}
            <div className="lg:col-span-4 space-y-4">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">Location & Contact</h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                {DAYCARE_INFO.address} <br />
                Fordham Manor, Bronx NY
              </p>
              <p className="text-xs font-mono font-bold text-[#FFD93D] block">
                Phone: {DAYCARE_INFO.phone}
              </p>
              <div className="text-xs text-stone-500 font-medium">
                Hours: {DAYCARE_INFO.hours}
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} Little Stars Daycare. All rights reserved. Registered owner: {DAYCARE_INFO.owner}.
            </div>
            <div className="flex gap-4">
              <span>NYS Licensed Daycare #875410</span>
              <span>·</span>
              <span>Accepts ACS & HRA child subsidies</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

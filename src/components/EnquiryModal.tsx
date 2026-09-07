// src/components/EnquiryModal.tsx
"use client";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  courseTitle,
}: EnquiryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        {/* Close Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-semibold transition-colors p-1"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          Course Enquiry
        </h2>
        <p className="text-sm text-slate-500 mb-5">
          Inquiry for:{" "}
          <span className="font-semibold text-blue-600">{courseTitle}</span>
        </p>

        {/* Enquiry Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Your Question
            </label>
            <textarea
              rows={4}
              placeholder="Ask about batch timings, syllabus, placements, discounts etc..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors duration-150 shadow-sm mt-2"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}

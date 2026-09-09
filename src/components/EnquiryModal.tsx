// src/components/EnquiryModal.tsx
"use client";

import { useState } from "react";

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
  // All state string variables properly mapped
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          query,
          course: courseTitle,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Inquiry submitted successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setQuery("");
        onClose();
      } else {
        // 🔥 YAHAN CHANGE KIYA HAI: Agar Zod validation fail hota hai
        if (data.errors) {
          // Saare errors ko nikal kar ek clean message banayein
          const errorMessages = Object.entries(data.errors)
            .map(
              ([field, messages]: any) =>
                `${field.toUpperCase()}: ${messages.join(", ")}`,
            )
            .join("\n");

          alert(`❌ Validation Errors:\n\n${errorMessages}`);
        } else {
          alert(
            "❌ Database error: " + (data.message || "Failed to save inquiry"),
          );
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("❌ Technical failure connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-in fade-in duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-semibold p-1"
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

        {/* Real Dynamic Form Integration */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Your Question
            </label>
            <textarea
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about batch timings, discounts etc..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Trigger Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold py-2.5 rounded-lg text-sm transition-colors duration-150 shadow-sm mt-2"
          >
            {loading ? "Saving into MySQL Database..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

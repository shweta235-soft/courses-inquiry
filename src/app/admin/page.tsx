// src/app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

interface EnquiryRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  query: string;
  adminReply: string | null; // Naya fields add kiya type me
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});

  const fetchEnquiries = async () => {
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Error loading enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleReplySubmit = async (id: number) => {
    const replyText = replies[id];
    if (!replyText || !replyText.trim()) {
      alert("Please type a response before sending!");
      return;
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, replyText }), // Database me replyText bhej rahe hain
      });

      if (res.ok) {
        alert("🎉 Reply successfully saved in MySQL database!");
        setReplies((prev) => ({ ...prev, [id]: "" }));
        fetchEnquiries(); // UI reload karke naya data dikhane ke liye
      } else {
        alert("❌ Failed to save reply.");
      }
    } catch (err) {
      alert("❌ Technical failure connecting to database.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold text-slate-600">
        Connecting to MySQL...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Admin Enquiry Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and view actual database records.
          </p>
        </div>

        {enquiries.length === 0 ? (
          <div className="bg-white border text-center p-12 text-slate-500 rounded-xl">
            No enquiries found.
          </div>
        ) : (
          <div className="space-y-6">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                {/* Header Profile Row */}
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {enq.name}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        ({enq.email} | {enq.phone})
                      </span>
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      Course: <span className="font-bold">{enq.course}</span>
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${enq.status === "Pending" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}
                  >
                    {enq.status}
                  </span>
                </div>

                {/* Student Query Box */}
                <div className="bg-slate-50 rounded-lg p-3.5 mb-4 text-sm text-slate-700 border-l-4 border-slate-400">
                  <span className="font-bold text-slate-800 block mb-0.5">
                    Student's Query:
                  </span>
                  "{enq.query}"
                </div>

                {/* Conditional Reply Logic: Agar reply pehle se hai toh text show karo, nahi toh input box dikhao */}
                <div className="pt-3 border-t border-slate-100">
                  {enq.adminReply ? (
                    <div className="bg-emerald-50 text-emerald-800 rounded-lg p-3.5 text-sm border-l-4 border-emerald-500">
                      <span className="font-bold block mb-0.5">
                        🟢 Your Submitted Response:
                      </span>
                      "{enq.adminReply}"
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                        Send Response
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={replies[enq.id] || ""}
                          onChange={(e) =>
                            setReplies((prev) => ({
                              ...prev,
                              [enq.id]: e.target.value,
                            }))
                          }
                          placeholder="Type response to store in database..."
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-slate-800"
                        />
                        <button
                          onClick={() => handleReplySubmit(enq.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-lg whitespace-nowrap shadow-sm"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

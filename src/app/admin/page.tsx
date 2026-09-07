// src/app/admin/page.tsx
"use client";

// Mock data for UI representation
const dummyEnquiries = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit@gmail.com",
    phone: "+91 9876543210",
    course: "Node.js BootCamp",
    query: "Kya weekend batches available hain?",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@live.com",
    phone: "+91 8765432109",
    course: "Next.js Advanced",
    query: "Is there any placement assistance after this course?",
    status: "Replied",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="mb-8 border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Enquiry Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, review, and respond to student pre-purchase questions
            instantly.
          </p>
        </div>

        {/* Enquiries List */}
        <div className="space-y-6">
          {dummyEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              {/* Top Row: User Details & Status */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {enq.name}
                    <span className="text-xs font-normal text-slate-400">
                      ({enq.email} | {enq.phone})
                    </span>
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mt-0.5">
                    Target Course:{" "}
                    <span className="font-bold">{enq.course}</span>
                  </p>
                </div>

                {/* Dynamic Status Badge */}
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-auto ${
                    enq.status === "Pending"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-green-50 text-green-600 border border-green-200"
                  }`}
                >
                  {enq.status}
                </span>
              </div>

              {/* Middle Row: The Question */}
              <div className="bg-slate-50 rounded-lg p-3.5 mb-4 text-sm text-slate-700 border-l-4 border-slate-300">
                <span className="font-bold text-slate-800 block mb-1">
                  Student's Query:
                </span>
                "{enq.query}"
              </div>

              {/* Bottom Row: Reply Section */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Send Response
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Type your response to send an automated email..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-800"
                  />
                  <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm">
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

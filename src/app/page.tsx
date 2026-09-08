// src/app/page.tsx
"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import EnquiryModal from "@/components/EnquiryModal";

// Dummy courses data API integrate karne se pehle UI check karne ke liye
const dummyCourses = [
  {
    id: 1,
    title: "Complete Node.js Backend BootCamp",
    description:
      "Master Node.js, Express, MongoDB, and REST APIs from scratch with real-world production projects.",
    price: "₹4,999",
  },
  {
    id: 2,
    title: "Advanced Next.js 15 Full-Stack Course",
    description:
      "Learn App Router, Server Actions, Server Components, and advanced optimization techniques in Next.js.",
    price: "₹6,499",
  },
  {
    id: 3,
    title: "MERN Stack Developer Mastery",
    description:
      "Build fully scalable dynamic web applications using MongoDB, Express, React, and Node.js.",
    price: "₹8,999",
  },
];

export default function Home() {
  // Modal toggle aur selected course ke liye local states (sirf UI demo ke liye)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

  const handleOpenModal = (courseTitle: string) => {
    setSelectedCourseTitle(courseTitle);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Main Header Container */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Explore Our Premium Coding Courses
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upgrade your development skills with our industry-grade advanced
            technical programs.
          </p>
        </div>

        {/* Responsive Grid System (Courses List) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnquiryClick={() => handleOpenModal(course.title)}
            />
          ))}
        </div>

        {/* Enquiry Form Overlay Modal */}
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          courseTitle={selectedCourseTitle}
        />
      </div>
    </main>
  );
}

// src/components/CourseCard.tsx
"use client";

// TypeScript Interface course data ke liye
interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
}

interface CourseCardProps {
  course: Course;
  onEnquiryClick: () => void;
}

export default function CourseCard({
  course,
  onEnquiryClick,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Course Image Placeholder */}
        <div className="w-full h-44 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium text-sm">
          📚 {course.title} Image
        </div>

        {/* Course Details */}
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Price and Action Button */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <span className="text-xl font-extrabold text-blue-600">
          {course.price}
        </span>
        <button
          onClick={onEnquiryClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-150 shadow-sm"
        >
          Enquiry Now
        </button>
      </div>
    </div>
  );
}

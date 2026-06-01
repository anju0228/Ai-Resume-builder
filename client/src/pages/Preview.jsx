import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/dashboard/ResumePreview";
import { ArrowLeftIcon } from "lucide-react";
import api from "../config/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const { data } = await api.get(`/api/resumes/get/${resumeId}`);

        setResumeData(data.resumes);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // ✅ No Data Found
  if (!resumeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-500 py-10 border-dashed border-2 border-gray-300 rounded-md">
          <p>Resume not found</p>

          <Link to="/" className="flex items-center justify-center gap-1 mt-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="bg-slate-100 min-h-screen">
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
        classes="py-4 bg-white"
      />
    </div>
  );
};

export default Preview;

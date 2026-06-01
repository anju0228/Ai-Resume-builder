import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/dashboard/ResumePreview";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  Briefcase,
  FolderIcon,
  Sparkles,
  Eye,
  Edit3,
  Download,
} from "lucide-react";

import PersonalInfoForm from "../components/dashboard/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import TemplateSelector from "../components/dashboard/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ExperinceForm from "../components/ExperinceForm";
import Education from "../components/Education";
import Project from "../components/Project";
import Skills from "../components/Skills";

import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    content: {
      personalInfo: {},
      professionalSummary: "",
      experience: [],
      education: [],
      projects: [],
      skills: [],
    },
    template: "classic",
    accentColor: "#3B82F6",
    public: false,
  });

  // ✅ LOAD RESUME (FIXED API)
  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.resume) {
          setResumeData(data.resume);
          document.title = data.resume.title;
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (resumeId && token) loadResume();
  }, [resumeId, token]);

  const sections = [
    { id: "Personal Info", name: "personalInfo", icon: User },
    { id: "Education", name: "education", icon: GraduationCap },
    { id: "Experience", name: "experience", icon: Briefcase },
    { id: "Projects", name: "projects", icon: FolderIcon },
    { id: "Skills", name: "skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  // ✅ SAVE RESUME FIXED
  const saveResume = async () => {
    try {
      const { data } = await api.put(
        "/api/resumes/update",
        {
          resumeId,
          resumeData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setResumeData(data.resume);
      toast.success("Saved!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* HEADER */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/app">
            <ArrowLeftIcon />
          </Link>
          <span>{resumeData.title}</span>
        </div>

        <div className="flex gap-2">
          <TemplateSelector
            selectedTemplate={resumeData.template}
            onChange={(t) =>
              setResumeData((prev) => ({ ...prev, template: t }))
            }
          />
          <button onClick={saveResume} className="bg-indigo-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </header>

      {/* BODY */}
      <main className="flex flex-1">
        {/* LEFT FORM */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{activeSection.id}</h2>

          {activeSection.name === "personalInfo" && (
            <>
              <PersonalInfoForm
                data={resumeData.content.personalInfo}
                onChange={(d) =>
                  setResumeData((prev) => ({
                    ...prev,
                    content: { ...prev.content, personalInfo: d },
                  }))
                }
              />

              <ProfessionalSummaryForm
                data={resumeData.content.professionalSummary}
                onchange={(value) =>
                  setResumeData((prev) => ({
                    ...prev,
                    content: { ...prev.content, professionalSummary: value },
                  }))
                }
                setResumeData={setResumeData}
              />
            </>
          )}

          {activeSection.name === "experience" && (
            <ExperinceForm
              data={resumeData.content.experience}
              onChange={(value) =>
                setResumeData((prev) => ({
                  ...prev,
                  content: { ...prev.content, experience: value },
                }))
              }
            />
          )}

          {activeSection.name === "education" && (
            <Education
              data={resumeData.content.education}
              onChange={(value) =>
                setResumeData((prev) => ({
                  ...prev,
                  content: { ...prev.content, education: value },
                }))
              }
            />
          )}

          {activeSection.name === "projects" && (
            <Project
              data={resumeData.content.projects}
              onChange={(value) =>
                setResumeData((prev) => ({
                  ...prev,
                  content: { ...prev.content, projects: value },
                }))
              }
            />
          )}

          {activeSection.name === "skills" && (
            <Skills
              data={resumeData.content.skills}
              onChange={(value) =>
                setResumeData((prev) => ({
                  ...prev,
                  content: { ...prev.content, skills: value },
                }))
              }
            />
          )}

          {/* NAV */}
          <div className="flex justify-between mt-6">
            <button
              disabled={activeSectionIndex === 0}
              onClick={() => setActiveSectionIndex((p) => p - 1)}
            >
              Back
            </button>

            <button
              disabled={activeSectionIndex === sections.length - 1}
              onClick={() => setActiveSectionIndex((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="w-1/2 bg-gray-100 p-6">
          <ResumePreview data={resumeData} />
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
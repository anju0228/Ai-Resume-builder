import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  UploadCloudIcon,
  FilePenLineIcon,
  TrashIcon,
  PenIcon,
  
  Loader,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import api from "../config/api";


function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();

  // ✅ Load resumes
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(Array.isArray(data.resumes) ? data.resumes : []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) loadAllResumes();
  }, [token]);

  // ✅ Create resume
  const createResume = async (event) => {
    event.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAllResumes((prev) => [...prev, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Upload resume
  const uploadResume = async (event) => {
    event.preventDefault();

    if (!title) {
      toast.error("Please enter resume title");
      return;
    }

    if (!resume) {
      toast.error("Please select a file");
      return;
    }

    try {
      setIsLoading(true);

      const resumeText = await pdfToText(resume);

      const { data } = await api.post(
        "/api/ai/generate-resume",
        { title, resumeData: resumeText },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Edit title
  const Title = async (event) => {
    event.preventDefault();

    try {
      const { data } = await api.put(
        "/api/resumes/update",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResumeId ? { ...r, title } : r)),
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Delete resume
  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      const { data } = await api.delete(`/api/resumes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <p className="text-2xl font-medium mb-6">Welcome, {user?.name}</p>

      {/* ACTION BUTTONS */}
      <div className="flex gap-6 mt-10">
        <button
          onClick={() => setShowCreateResume(true)}
          className="border p-6 rounded-xl"
        >
          <PlusIcon /> Create Resume
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="border p-6 rounded-xl"
        >
          <UploadCloudIcon /> Upload Resume
        </button>
      </div>

      {/* RESUME LIST */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {allResumes.map((resume, i) => {
          const color = colors[i % colors.length];

          return (
            <div
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="p-4 border rounded-xl cursor-pointer"
            >
              <FilePenLineIcon style={{ color }} />
              <p>{resume.title}</p>

              <div className="flex gap-2 mt-2">
                <PenIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                />

                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form onSubmit={createResume} className="bg-white p-6 rounded">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 mb-3"
            />
            <button className="bg-blue-500 text-white px-4 py-2">Create</button>
          </form>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadResume && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <form onSubmit={uploadResume} className="bg-white p-6 rounded">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border p-2 mb-3"
            />

            <label htmlFor="file">
              <div className="border p-4 mb-3 cursor-pointer">
                {resume ? resume.name : "Upload File"}
              </div>
            </label>

            <input
              id="file"
              type="file"
              hidden
              onChange={(e) => setResume(e.target.files[0])}
            />

            <button
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 flex gap-2"
            >
              {isLoading && <Loader className="animate-spin" />}
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import { Briefcase, Plus, Minus, Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../config/api";
import toast from "react-hot-toast";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onChange([...(data || []), newExperience]);
  };

  const removeExperience = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const generateDescription = async (index) => {
    try {
      setGeneratingIndex(index);

      const exp = data[index];
      const prompt = `Enhance this job description: ${exp.description} for the position of ${exp.position} at ${exp.company}`;

      const res = await api.post(
        "/api/ai/enhance-job-description",
        { jobDescription: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateExperience(index, "description", res.data.enhancedDescription);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your work experience details.
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
        >
          <Plus className="size-4" /> Add Experience
        </button>
      </div>

      {data?.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border-dashed border-2 border-gray-300 rounded-md">
          <Briefcase className="size-10 mx-auto mb-4" />
          <p>No experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, index) => (
            <div key={index} className="border p-4 rounded-md relative">
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Minus className="size-4" />
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(index, "endDate", e.target.value)
                  }
                  className="border p-2 rounded"
                />

                <div className="md:col-span-2">
                  <button
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !exp.position ||
                      !exp.company
                    }
                    className="flex items-center gap-1 text-xs mb-2 bg-purple-100 px-2 py-1 rounded disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>

                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
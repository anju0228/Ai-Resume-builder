import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../config/api";

const ProfessionalSummaryForm = ({ data, onchange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);

      const prompt = `Enhance my professional summary: ${data}`;

      const response = await api.post(
        "/api/ai/enhancer-professional-summary",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResumeData((prev) => ({
        ...prev,
        professionalSummary: response.data.enhancedContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Professional Summary</h3>
          <p className="text-sm text-gray-500">
            Write a short summary (3–5 lines) about your experience & skills.
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <textarea
        value={data || ""}
        rows={6}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your professional summary..."
        onChange={(e) => onchange(e.target.value)}
      />
    </div>
  );
};

export default ProfessionalSummaryForm;
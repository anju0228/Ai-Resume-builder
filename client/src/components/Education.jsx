import React from "react";
import { Plus, Minus, Briefcase } from "lucide-react";

const Education = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    };
    onChange([...data, newEducation]);
  };
  const updateEducation = (index, field, value) => {
    const updatedEducation = [...data];
    updatedEducation[index][field] = value;
    onChange(updatedEducation);
  };
  const removeEducation = (index) => {
    const updatedEducation = data.filter((_, i) => i !== index);
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your educational background here.
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-5" /> Add Education
        </button>
      </div>

      {data?.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border-dashed border-2 border-gray-300 rounded-md">
          <Briefcase className="size-10 mx-auto mb-4" />
          <p>No education added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((edu, index) => (
            <div key={index} className="border p-4 rounded-md relative">
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Minus className="size-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      updateEducation(index, "fieldOfStudy", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(index, "startDate", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(index, "endDate", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
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

export default Education;

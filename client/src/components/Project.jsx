import React from "react";
import { Plus, Minus, Briefcase } from "lucide-react";

const Project = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      link: "",
    };
    onChange([...data, newProject]);
  };

  const updateProject = (index, field, value) => {
    const updatedProject = [...data];
    updatedProject[index][field] = value;
    onChange(updatedProject);
  };

  const removeProject = (index) => {
    const updatedProject = data.filter((_, i) => i !== index);
    onChange(updatedProject);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">
            Add your projects here. List your work in reverse chronological
            order.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
        >
          <Plus className="size-5" /> Add Project
        </button>
      </div>

      {data?.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border-dashed border-2 border-gray-300 rounded-md">
          <Briefcase className="size-10 mx-auto mb-4" />
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={index} className="border p-4 rounded-md relative">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Minus className="size-5" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Link
                  </label>
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) =>
                      updateProject(index, "link", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
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

export default Project;

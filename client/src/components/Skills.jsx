import React, { useState } from "react";

const Skills = ({ data, onChange }) => {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      onChange([...data, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const removeSkill = (index) => {
    const updatedSkills = data.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };
  const handlekeyPress = (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  return (
    <div className="space-y-4  ">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Skills</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handlekeyPress}
          placeholder="Enter a skill..."
          className="border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={addSkill}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index}
            className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;

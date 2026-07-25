import { useEffect, useState } from "react";
import { getSkills, createSkill, deleteSkill } from "../services/api";

const categories = ["Languages", "Frontend", "Backend", "Database", "Tools"];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Languages");
  const [loading, setLoading] = useState(true);

  const loadSkills = () => {
    getSkills()
      .then((res) => setSkills(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const skillNames = name
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      for (const skillName of skillNames) {
        await createSkill({ name: skillName, category });
      }
      setName("");
      loadSkills();
    } catch (err) {
      alert("Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    await deleteSkill(id);
    loadSkills();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border border-gray-200 mb-8 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          placeholder="Skill name (e.g. Python)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 w-full sm:w-auto"
        >
          Add Skill
        </button>
      </form>

      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-6">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;

          return (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    {skill.name}
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageSkills;

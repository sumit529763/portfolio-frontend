import { useEffect, useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';

const emptyForm = { title: '', description: '', techStack: '', liveLink: '', githubLink: '', featured: false };

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    getProjects()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadProjects();
    } catch (err) {
      alert('Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      techStack: (project.techStack || []).join(', '),
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      featured: project.featured || false,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    loadProjects();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 mb-8 space-y-4">
        <h2 className="font-bold text-lg text-gray-900">
          {editingId ? 'Edit Project' : 'Add New Project'}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated: React, Node.js, MongoDB)"
          value={form.techStack}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="liveLink"
          placeholder="Live Demo Link"
          value={form.liveLink}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured project
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
          >
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-300 rounded-lg font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            </div>
            <div className="flex gap-3 shrink-0 ml-4">
              <button
                onClick={() => handleEdit(project)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
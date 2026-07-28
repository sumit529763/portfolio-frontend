import { useEffect, useState } from 'react';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../services/api';

const emptyForm = { title: '', organization: '', duration: '', bullets: '' };

const ManageExperience = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadItems = () => {
    getExperience().then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      bullets: form.bullets.split('\n').map((b) => b.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await updateExperience(editingId, payload);
      } else {
        await createExperience(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadItems();
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      organization: item.organization,
      duration: item.duration,
      bullets: (item.bullets || []).join('\n'),
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await deleteExperience(id);
    loadItems();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 mb-8 space-y-3">
        <h2 className="font-bold text-lg text-gray-900">{editingId ? 'Edit Internship' : 'Add Internship'}</h2>
        <input type="text" name="title" placeholder="Title (e.g. AI & Cloud Intern)" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <input type="text" name="organization" placeholder="Organization" value={form.organization} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <input type="text" name="duration" placeholder="Duration (e.g. Jun 2025 - Sep 2025)" value={form.duration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <textarea name="bullets" placeholder="One bullet point per line" value={form.bullets} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <div className="flex gap-3">
          <button type="submit" className="px-5 py-2 bg-gray-900 text-white rounded-lg font-medium">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="px-5 py-2 border border-gray-300 rounded-lg font-medium">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.organization} · {item.duration}</p>
            </div>
            <div className="flex gap-3 shrink-0 ml-4">
              <button onClick={() => handleEdit(item)} className="text-sm font-medium text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-sm font-medium text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageExperience;
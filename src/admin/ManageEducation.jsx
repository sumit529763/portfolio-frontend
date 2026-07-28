import { useEffect, useState } from 'react';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../services/api';

const emptyForm = { degree: '', institution: '', duration: '', score: '' };

const ManageEducation = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadItems = () => {
    getEducation().then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEducation(editingId, form);
      } else {
        await createEducation(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadItems();
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleEdit = (item) => {
    setForm({ degree: item.degree, institution: item.institution, duration: item.duration, score: item.score });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await deleteEducation(id);
    loadItems();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 mb-8 space-y-3">
        <h2 className="font-bold text-lg text-gray-900">{editingId ? 'Edit Education' : 'Add Education'}</h2>
        <input type="text" name="degree" placeholder="Degree (e.g. BCA)" value={form.degree} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <input type="text" name="institution" placeholder="Institution" value={form.institution} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <input type="text" name="duration" placeholder="Duration (e.g. 2023 - 2026)" value={form.duration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <input type="text" name="score" placeholder="Score (e.g. 8.80 CGPA)" value={form.score} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
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
              <h3 className="font-bold text-gray-900">{item.degree}</h3>
              <p className="text-sm text-gray-600">{item.institution} · {item.duration} · {item.score}</p>
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

export default ManageEducation;
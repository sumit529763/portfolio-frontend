import { useEffect, useState } from 'react';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../services/api';

const emptyForm = { title: '', detail: '' };

const ManageAchievements = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadItems = () => {
    getAchievements().then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAchievement(editingId, form);
      } else {
        await createAchievement(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadItems();
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, detail: item.detail });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await deleteAchievement(id);
    loadItems();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 mb-8 space-y-3">
        <h2 className="font-bold text-lg text-gray-900">{editingId ? 'Edit Achievement' : 'Add Achievement'}</h2>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        <textarea name="detail" placeholder="Detail / description" value={form.detail} onChange={handleChange} required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
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
              <p className="text-sm text-gray-600">{item.detail}</p>
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

export default ManageAchievements;
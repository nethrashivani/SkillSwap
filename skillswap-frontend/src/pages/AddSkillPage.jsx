import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSkill } from '../services/skillService';

const CATEGORIES = ['Technology', 'Music', 'Art', 'Language', 'Sports', 'Cooking', 'Other'];

export default function AddSkillPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    instructorName: '',
    experienceYears: '',
    location: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.title.trim()) return 'Title is required';
    if (!form.category) return 'Category is required';
    if (!form.description.trim()) return 'Description is required';
    if (!form.instructorName.trim()) return 'Instructor name is required';
    if (form.experienceYears === '' || form.experienceYears < 0) return 'Valid experience years required';
    if (!form.location.trim()) return 'Location is required';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      setError('');
      await createSkill({ ...form, experienceYears: parseInt(form.experienceYears) });
      setSuccess('Skill created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Failed to create skill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add New Skill</h1>
        </div>

        {/* Error / Success */}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Java Programming"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what you'll teach..."
              rows={3}
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Instructor Name</label>
            <input
              name="instructorName"
              value={form.instructorName}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Experience Years</label>
            <input
              name="experienceYears"
              type="number"
              min="0"
              max="50"
              value={form.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 3"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Chennai"
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Skill'}
          </button>
        </div>
      </div>
    </div>
  );
}
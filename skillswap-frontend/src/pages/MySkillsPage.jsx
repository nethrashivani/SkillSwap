import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMySkills, deleteSkill } from '../services/skillService';
import { getUser, logout } from '../services/authService';

export default function MySkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = getUser();

  const fetchMySkills = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMySkills();
      setSkills(data);
    } catch (_err) {
      setError('Failed to load your skills.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMySkills();
  }, [fetchMySkills]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch (_err) {
      setError('Delete failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-blue-600 text-white py-8 px-4 text-center relative">
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <span className="text-sm text-blue-100">👤 {user?.name}</span>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="text-sm bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition"
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-2">My Skills</h1>
        <p className="text-blue-100">Skills you have posted</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-50 transition mr-2"
        >
          ← Browse All Skills
        </button>
        <button
          onClick={() => navigate('/add')}
          className="mt-4 bg-blue-500 border border-white text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          + Add New Skill
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Loading your skills...</div>
        ) : skills.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">You haven't posted any skills yet.</p>
            <button
              onClick={() => navigate('/add')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              + Add Your First Skill
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <div key={skill.id} className="bg-white rounded-xl shadow hover:shadow-md transition p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                      {skill.category}
                    </span>
                    <span className="text-xs text-gray-400">{skill.experienceYears} yrs exp</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">{skill.title}</h2>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">{skill.description}</p>
                  <p className="text-sm text-gray-600">📍 {skill.location}</p>
                </div>
                <div className="flex gap-2 mt-auto pt-4">
                  <button
                    onClick={() => navigate(`/skills/${skill.id}`)}
                    className="flex-1 text-center text-sm bg-blue-50 text-blue-600 py-1.5 rounded-lg hover:bg-blue-100 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${skill.id}`)}
                    className="flex-1 text-center text-sm bg-yellow-50 text-yellow-600 py-1.5 rounded-lg hover:bg-yellow-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="flex-1 text-center text-sm bg-red-50 text-red-600 py-1.5 rounded-lg hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSkillById, deleteSkill } from '../services/skillService';
import { isLoggedIn, getUser } from '../services/authService';

export default function SkillDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const data = await getSkillById(id);
        setSkill(data);
      } catch (_err) {
        setError('Skill not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkill(id);
      navigate('/');
    } catch (_err) {
      setError('Failed to delete skill.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-lg">
      Loading skill...
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
          Back to Home
        </button>
      </div>
    </div>
  );

  const isOwner = isLoggedIn() && getUser()?.email === skill.ownerEmail;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-xl shadow p-8">

          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            {skill.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-2">{skill.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>👤 {skill.instructorName}</span>
            <span>📍 {skill.location}</span>
            <span>⭐ {skill.experienceYears} years experience</span>
            <span>📅 Posted on {formatDate(skill.createdAt)}</span>
          </div>

          <hr className="mb-6" />

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">About this Skill</h2>
            <p className="text-gray-600 leading-relaxed">{skill.description}</p>
          </div>

          {isOwner ? (
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit/${skill.id}`)}
                className="flex-1 bg-yellow-500 text-white font-semibold py-2.5 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit Skill
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-lg hover:bg-red-600 transition"
              >
                Delete Skill
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 text-blue-600 text-sm px-4 py-3 rounded-lg text-center">
              This skill is posted by {skill.instructorName}. Login with their account to edit or delete.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
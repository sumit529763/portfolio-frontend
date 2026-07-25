import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data))
      .catch((err) => console.error('Failed to load skills:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'];

  return (
    <section id="skills" className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-10"
        >
          Skills
        </motion.h2>

        {loading && <p className="text-gray-400">Loading skills...</p>}

        {!loading && skills.length === 0 && (
          <p className="text-gray-400">
            No skills added yet. Add them from the admin panel.
          </p>
        )}

        <div className="space-y-8">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
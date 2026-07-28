import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['Languages', 'Frontend', 'Backend', 'Database', 'Tools'];

  useEffect(() => {
    getSkills().then((res) => setSkills(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="skills" className="py-24 px-6 bg-paper">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">What I Know</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-10"
        >
          Skills
        </motion.h2>

        {loading && <p className="text-body/60">Loading skills...</p>}
        {!loading && skills.length === 0 && <p className="text-body/60">No skills added yet.</p>}

        <div className="space-y-8">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-body/60 uppercase tracking-wide mb-3">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-4 py-2 bg-white border border-line hover:border-gold/40 rounded-lg text-ink font-medium text-sm transition-colors"
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
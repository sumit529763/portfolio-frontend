import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperience } from '../services/api';

const Experience = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience().then((res) => setItems(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 px-6 bg-ink/[0.02]">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">Where I've Worked</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-10"
        >
          Internship
        </motion.h2>

        {loading && <p className="text-body/60">Loading...</p>}
        {!loading && items.length === 0 && <p className="text-body/60">No internship entries yet.</p>}

        <div className="space-y-6">
          {items.map((exp) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-line hover:border-gold/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-1">
                <div>
                  <h3 className="font-display font-semibold text-ink text-lg">{exp.title}</h3>
                  <p className="text-body">{exp.organization}</p>
                </div>
                <span className="text-sm text-body/60">{exp.duration}</span>
              </div>

              {exp.bullets?.length > 0 && (
                <ul className="space-y-2 text-body text-sm leading-relaxed list-disc list-inside">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
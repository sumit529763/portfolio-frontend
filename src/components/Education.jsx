import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEducation } from "../services/api";

const Education = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEducation()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
          My Journey
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-10"
        >
          Education
        </motion.h2>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-400">No education entries yet.</p>
        )}

        <div className="space-y-6">
          {items.map((edu, i) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-l-2 border-gray-200 pl-6 py-1"
            >
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
              </div>
              <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-1 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">{edu.duration}</span>
                <span className="text-sm font-medium text-gray-900">
                  {edu.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAchievements } from "../services/api";

const Achievements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAchievements()
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
          Recognition
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-10"
        >
          Achievements & Certifications
        </motion.h2>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="text-gray-400">No achievements added yet.</p>
        )}

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <span className="text-xl">🏆</span>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

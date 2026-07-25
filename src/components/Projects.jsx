import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../services/api';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-10"
        >
          Projects
        </motion.h2>

        {loading && <p className="text-gray-400">Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <p className="text-gray-400">
            No projects added yet. Add them from the admin panel.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
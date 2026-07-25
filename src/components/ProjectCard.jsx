import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-2 border-t border-gray-50">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-gray-900 hover:underline inline-flex items-center gap-1"
          >
            Live Demo →
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-gray-600 hover:underline inline-flex items-center gap-1"
          >
            GitHub →
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
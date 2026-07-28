import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-line rounded-xl p-6 hover:border-gold/40 hover:shadow-lg transition-all bg-white"
    >
      <h3 className="font-display text-xl font-semibold text-ink mb-2">{project.title}</h3>
      <p className="text-body mb-4 leading-relaxed">{project.description}</p>

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gold/10 text-golddeep rounded-full text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink hover:text-gold transition-colors">
            Live Demo →
          </a>
        )}
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-body hover:text-gold transition-colors">
            GitHub →
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
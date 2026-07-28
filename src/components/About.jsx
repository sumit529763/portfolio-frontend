import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-paper">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3"
        >
          Who I Am
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-8"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 text-body text-lg leading-relaxed"
        >
          <p>
            I'm a Full Stack Developer with hands-on experience building cloud-native
            and serverless applications. As an AI &amp; Cloud Intern at Hebbale Academy,
            I worked with multi-agent AI systems and AWS Lambda, S3, and DynamoDB to
            build real-time intelligent solutions.
          </p>
          <p>
            I was part of the winning team at the Agentic AI Hackathon 2025, where we
            built the HAWCC platform using Agentic AI frameworks. I enjoy solving
            problems end-to-end — from designing REST APIs and databases to building
            clean, responsive interfaces with React.
          </p>
          <p>
            Currently pursuing my BCA, and continuing on to an MCA, I'm always looking
            to deepen my skills in full-stack development, cloud architecture, and
            applied AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <span className="px-4 py-2 bg-gold/10 border border-gold/30 text-golddeep rounded-full text-sm font-medium">
            🏆 Agentic AI Hackathon 2025 Winner
          </span>
          <span className="px-4 py-2 bg-ink/5 border border-line text-ink rounded-full text-sm font-medium">
            AI &amp; Cloud Intern @ Hebbale Academy
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
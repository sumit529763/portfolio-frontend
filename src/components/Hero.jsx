import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center bg-herobg overflow-hidden px-6">
      {/* Glow orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #c99a3e 0%, transparent 70%)' }}
      />

      <div className="relative max-w-2xl text-center flex flex-col items-center">
        {/* Profile Image with Gold Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-5"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{ background: 'radial-gradient(circle, #c99a3e 0%, transparent 70%)' }}
            />
            <img
              src="/profile.png"
              alt="Sumit Naik"
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gold/60"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 font-medium"
        >
          Full Stack Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-herotext mb-3 leading-tight"
        >
          Sumit Naik
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display italic text-base sm:text-xl text-herotext/70 mb-6 px-2"
        >
          Rooted in purpose. Rising with every build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-5 sm:px-7 py-2.5 sm:py-3 bg-gold text-herobg rounded-full font-medium text-sm sm:text-base hover:bg-golddeep transition-colors"
          >
            View My Work
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-5 sm:px-7 py-2.5 sm:py-3 border border-herotext/30 text-herotext rounded-full font-medium text-sm sm:text-base hover:border-gold hover:text-gold transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-herotext/30 rounded-full mx-auto flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
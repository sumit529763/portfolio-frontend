import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendMessage(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-ink/[0.02]">
      <div className="max-w-2xl mx-auto">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">Let's Talk</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4"
        >
          Get In Touch
        </motion.h2>
        <p className="text-body mb-8">Have an opportunity or want to collaborate? Send me a message.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:border-gold transition-colors"
          />
          <textarea
            name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required
            className="w-full px-4 py-3 bg-white border border-line rounded-lg focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit" disabled={status === 'sending'}
            className="px-7 py-3 bg-ink text-paper rounded-full font-medium hover:bg-gold hover:text-herobg transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && <p className="text-golddeep font-medium">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-600 font-medium">Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
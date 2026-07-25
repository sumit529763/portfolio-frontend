import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendMessage(formData);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Get In Touch
        </motion.h2>
        <p className="text-gray-600 mb-8">
          Have an opportunity or want to collaborate? Send me a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full sm:w-auto px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors disabled:opacity-50 text-base"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-green-600 font-medium">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 font-medium">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
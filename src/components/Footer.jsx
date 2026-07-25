const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Sumit Naik. All rights reserved.
        </p>
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/sumit529763"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sumitnaik52"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="mailto:naiks0234@gmail.com"
            className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Email
          </a>

          <a
            href="/admin/login"
            className="text-gray-300 hover:text-gray-500 text-xs transition-colors"
            title="Admin"
          >
            •
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
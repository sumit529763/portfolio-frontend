import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-gray-900">
          Sumit Naik
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/sumit529763"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sumitnaik52"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-900 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/sumit529763"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sumitnaik52"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

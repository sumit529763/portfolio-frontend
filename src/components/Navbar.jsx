import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-herobg/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-display text-xl font-semibold text-herotext">
            Sumit Naik
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-herotext/70 hover:text-gold transition-colors font-medium text-sm"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://github.com/sumit529763"
            target="_blank"
            rel="noreferrer"
            className="text-herotext/70 hover:text-gold transition-colors text-sm"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sumitnaik52"
            target="_blank"
            rel="noreferrer"
            className="text-herotext/70 hover:text-gold transition-colors text-sm"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          aria-label="Toggle Navigation"
          className="md:hidden text-herotext w-10 h-10 flex items-center justify-center font-bold text-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-herobg px-6 py-4 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-herotext/80 hover:text-gold font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://github.com/sumit529763"
            target="_blank"
            rel="noreferrer"
            className="text-herotext/70 hover:text-gold transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sumitnaik52"
            target="_blank"
            rel="noreferrer"
            className="text-herotext/70 hover:text-gold transition-colors"
          >
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

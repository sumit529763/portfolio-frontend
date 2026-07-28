import { Home, User, Code, Briefcase, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const BottomNav = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-herobg border-t border-white/10 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href.replace('#', '');
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full active:bg-white/5 transition-colors"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? 'text-gold' : 'text-herotext/40'}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-gold' : 'text-herotext/40'}`}>
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
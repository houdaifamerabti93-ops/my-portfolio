import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { Button } from '../ui/Button';
import { triggerHaptic } from '../../lib/haptics';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    triggerHaptic(10);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050510]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="group flex items-center gap-1.5 focus:outline-none cursor-pointer"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00e5ff] transition-colors">
            HOUDAIFA
          </span>
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] inline-block shadow-[0_0_8px_#00e5ff] animate-pulse" />
        </motion.a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ touchAction: 'manipulation' }}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full cursor-pointer select-none ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#8892b0] hover:text-[#eaf2ff] hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Let's Talk
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          onClick={() => {
            triggerHaptic(10);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{ touchAction: 'manipulation' }}
          aria-label="Toggle navigation menu"
          className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#050510]/95 backdrop-blur-2xl border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{ touchAction: 'manipulation' }}
              className="flex items-center justify-between py-3 text-lg font-medium text-[#eaf2ff] hover:text-[#00e5ff] border-b border-white/[0.05] transition-colors cursor-pointer select-none"
            >
              <span>{link.label}</span>
              {activeSection === link.id && (
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
              )}
            </motion.a>
          ))}
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                scrollToSection(e, '#contact');
              }}
              icon={<MessageSquareCode className="w-5 h-5" />}
              iconPosition="left"
            >
              Let's Talk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};


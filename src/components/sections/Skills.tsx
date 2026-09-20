import React, { useState } from 'react';
import { 
  Atom, 
  FileCode2, 
  Boxes, 
  Palette, 
  Sparkles, 
  Server, 
  Database, 
  Layers, 
  Container, 
  GitBranch, 
  Figma, 
  Radio, 
  Cpu
} from 'lucide-react';
import { skillsData, marqueeTechLogos } from '../../lib/data/skills';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Backend', 'Creative 3D', 'DevOps & Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom': return Atom;
      case 'FileCode2': return FileCode2;
      case 'Boxes': return Boxes;
      case 'Palette': return Palette;
      case 'Sparkles': return Sparkles;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Layers': return Layers;
      case 'Container': return Container;
      case 'GitBranch': return GitBranch;
      case 'Figma': return Figma;
      case 'Radio': return Radio;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-[#050510]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#00e5ff]" />
              <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase">
                03 / Technical Weaponry
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Modern tech stack engineered for speed & scale.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-interactive="true"
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#00e5ff] text-[#050510] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'bg-white/[0.04] text-[#8892b0] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Grid of Skills (Lift + Glow) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {filteredSkills.map((skill, index) => {
            const Icon = getIcon(skill.icon);
            return (
              <div
                key={skill.name}
                data-interactive="true"
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#00e5ff]/50 hover:bg-white/[0.05] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_rgba(0,229,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff] group-hover:text-[#ff2d95] group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#8892b0] group-hover:text-white transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-[#8892b0] font-mono mb-4">
                    {skill.highlight}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] rounded-full transition-all duration-700 ease-out group-hover:shadow-[0_0_8px_#00e5ff]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee Ticker of Tech Badges */}
        <div className="relative w-full overflow-hidden py-4 border-t border-b border-white/[0.06]">
          <div className="animate-marquee-right flex items-center gap-8">
            {[...marqueeTechLogos, ...marqueeTechLogos, ...marqueeTechLogos].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#8892b0] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 transition-all cursor-default"
              >
                <span className="font-mono text-xs text-[#00e5ff]">{tech.symbol}</span>
                <span className="font-heading text-sm font-semibold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

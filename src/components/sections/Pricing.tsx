import React from 'react';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { pricingTiers } from '../../lib/data/pricing';
import { PricingTier } from '../../types';
import { Button } from '../ui/Button';

interface PricingProps {
  onSelectTier?: (tier: PricingTier) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const handleSelect = (tier: PricingTier) => {
    if (onSelectTier) {
      onSelectTier(tier);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // prefill budget or message
      const budgetSelect = document.getElementById('budget-select') as HTMLSelectElement | null;
      if (budgetSelect) {
        if (tier.id === 'starter') budgetSelect.value = '$2k–$5k';
        else if (tier.id === 'pro') budgetSelect.value = '$5k–$10k';
        else budgetSelect.value = '$10k+';
      }
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-[#050510]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#8b5cf6]" />
            <span className="text-xs font-mono tracking-widest text-[#8b5cf6] uppercase">
              07 / Investment Tiers
            </span>
            <span className="w-6 h-[1px] bg-[#8b5cf6]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Transparent, value-driven pricing.
          </h2>
          <p className="text-sm sm:text-base text-[#8892b0]">
            No ambiguous hourly billings. Fixed transparent scope, agreed milestones, and full intellectual property ownership.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const isPopular = tier.popular;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#00e5ff]/10 via-white/[0.04] to-white/[0.02] border-2 border-[#00e5ff] shadow-[0_0_40px_rgba(0,229,255,0.2)] lg:-translate-y-3'
                    : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] text-[#050510] text-xs font-heading font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.6)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Top info */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#8892b0]">
                      {tier.badge}
                    </span>
                  </div>

                  <p className="text-sm text-[#8892b0] mb-8 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/[0.08]">
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-xs font-mono text-[#8892b0]">
                        / {tier.period}
                      </span>
                    )}
                  </div>

                  {/* Feature list */}
                  <div className="space-y-3.5 mb-10">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                      What's Included:
                    </div>
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-sm text-white/80">
                        <div className={`mt-0.5 rounded-full p-0.5 ${isPopular ? 'bg-[#00e5ff] text-[#050510]' : 'bg-white/10 text-[#00e5ff]'}`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant={isPopular ? 'primary' : 'secondary'}
                  size="md"
                  fullWidth
                  onClick={() => handleSelect(tier)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {tier.ctaText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

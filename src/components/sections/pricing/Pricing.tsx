'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Leaf, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  badge: 'Pricing Plans',
  mainTitle: 'Sustainable Growth,',
  mainTitleHighlight: 'Transparent Pricing',
  mainDescription:
    'Choose the perfect plan to scale your business sustainably. All plans include our core environmental impact tracking and carbon offset features.',
  billingMonthly: 'Monthly',
  billingAnnual: 'Annual',
  billingAnnualBadge: 'Save 25%',
  plan1Name: 'Starter',
  plan1Description: 'Perfect for small businesses starting their sustainability journey',
  plan1Price: '$29',
  plan1CTA: 'Start Free Trial',
  plan1CTAHref: '/',
  plan2Name: 'Professional',
  plan2Description: 'Ideal for growing companies with advanced sustainability goals',
  plan2Price: '$79',
  plan2Period: '/month',
  plan2Badge: 'Most Popular',
  plan2CTA: 'Start Free Trial',
  plan2CTAHref: '/',
  plan2Trial: '14-day free trial • No credit card required',
  plan3Name: 'Enterprise',
  plan3Description: 'For large organizations with comprehensive ESG requirements',
  plan3Price: 'Custom',
  plan3Badge: 'Best Value',
  plan3CTA: 'Contact Sales',
  plan3CTAHref: '/',
  bottomTitle: 'Need a custom solution?',
  bottomDescription:
    'We work with enterprises to create tailored sustainability solutions that meet your specific industry requirements and compliance needs.',
  bottomCTA: 'Schedule Consultation',
  bottomCTAHref: '/',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: config.plan1Name,
      description: config.plan1Description,
      price: config.plan1Price,
      period: '/month',
      badge: null,
      features: [
        'Carbon footprint tracking',
        'Basic sustainability reports',
        'Up to 50 employees',
        'Email support',
        'Mobile app access',
        'Data export (CSV)',
        'Monthly impact summaries',
      ],
      cta: config.plan1CTA,
      ctaHref: config.plan1CTAHref,
      popular: false,
      icon: Leaf,
    },
    {
      name: config.plan2Name,
      description: config.plan2Description,
      price: config.plan2Price,
      period: config.plan2Period,
      badge: config.plan2Badge,
      features: [
        'Everything in Starter',
        'Advanced analytics dashboard',
        'Up to 500 employees',
        'Priority support',
        'Custom integrations',
        'API access',
        'Automated ESG reporting',
        'Carbon offset marketplace',
        'Team collaboration tools',
      ],
      cta: config.plan2CTA,
      ctaHref: config.plan2CTAHref,
      popular: true,
      icon: TrendingUp,
    },
    {
      name: config.plan3Name,
      description: config.plan3Description,
      price: config.plan3Price,
      period: '',
      badge: config.plan3Badge,
      features: [
        'Everything in Professional',
        'Unlimited employees',
        '24/7 dedicated support',
        'Custom compliance reporting',
        'White-label solutions',
        'Advanced security & SSO',
        'Dedicated account manager',
        'Custom training & onboarding',
        'Multi-location tracking',
      ],
      cta: config.plan3CTA,
      ctaHref: config.plan3CTAHref,
      popular: false,
      icon: Shield,
    },
  ];

  const getAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === 'Custom') return 'Custom';
    const monthly = parseInt(monthlyPrice.replace('$', ''));
    const annual = Math.floor(monthly * 12 * 0.75); // 25% discount
    return `$${annual}`;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/20 text-primary">
            <Leaf className="size-3 mr-2" />
            <span data-editable="badge">{config.badge}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="mainTitle">{config.mainTitle}</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <span data-editable="mainTitleHighlight">{config.mainTitleHighlight}</span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            <span data-editable="mainDescription">{config.mainDescription}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all',
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingMonthly">{config.billingMonthly}</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2',
                billingCycle === 'annual'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span data-editable="billingAnnual">{config.billingAnnual}</span>
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                <span data-editable="billingAnnualBadge">{config.billingAnnualBadge}</span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
                  plan.popular
                    ? 'border-primary/50 shadow-lg shadow-primary/10 lg:scale-105'
                    : 'border-border/50 hover:border-primary/20'
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                      <Star className="size-3 mr-1 fill-current" />
                      <span data-editable="plan2Badge">{plan.badge}</span>
                    </Badge>
                  </div>
                )}

                {/* Background Gradient */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                )}

                <CardHeader className={cn('relative text-center pb-8', plan.popular && 'pt-10')}>
                  {plan.badge && !plan.popular && (
                    <Badge
                      variant="outline"
                      className="mb-4 mx-auto w-fit border-primary/20 text-primary"
                    >
                      <span data-editable="plan3Badge">{plan.badge}</span>
                    </Badge>
                  )}

                  <div className="mb-4 mx-auto w-fit">
                    <div
                      className={cn(
                        'size-12 rounded-lg flex items-center justify-center',
                        plan.popular
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      )}
                    >
                      <IconComponent className="size-6" />
                    </div>
                  </div>

                  <CardTitle className="text-2xl mb-2">
                    <span data-editable={`plan${index + 1}Name`}>{plan.name}</span>
                  </CardTitle>
                  <CardDescription className="text-base mb-6">
                    <span data-editable={`plan${index + 1}Description`}>{plan.description}</span>
                  </CardDescription>

                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plan${index + 1}Price`}>
                        {billingCycle === 'annual' ? getAnnualPrice(plan.price) : plan.price}
                      </span>
                    </span>
                    {plan.period && plan.price !== 'Custom' && (
                      <span className="text-muted-foreground mb-1">
                        <span data-editable="plan2Period">
                          {billingCycle === 'annual' ? '/year' : plan.period}
                        </span>
                      </span>
                    )}
                  </div>

                  {billingCycle === 'annual' && plan.price !== 'Custom' && (
                    <p className="text-sm text-primary mt-2">
                      Save ${parseInt(plan.price.replace('$', '')) * 3}/year
                    </p>
                  )}
                </CardHeader>

                <CardContent className="relative space-y-6">
                  {/* Features List */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="size-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={cn(
                      'w-full text-base py-6',
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        : 'border-primary/20 text-primary hover:bg-primary/5'
                    )}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate(plan.ctaHref)}
                    data-editable-href={`plan${index + 1}CTAHref`}
                    data-href={plan.ctaHref}
                  >
                    {plan.popular && <Zap className="size-4 mr-2" />}
                    <span data-editable={`plan${index + 1}CTA`}>{plan.cta}</span>
                  </Button>

                  {plan.name === config.plan2Name && (
                    <p className="text-center text-sm text-muted-foreground">
                      <span data-editable="plan2Trial">{config.plan2Trial}</span>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <h3 className="text-xl font-semibold mb-4">
              <span data-editable="bottomTitle">{config.bottomTitle}</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              <span data-editable="bottomDescription">{config.bottomDescription}</span>
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/20 text-primary hover:bg-primary/5"
              onClick={() => navigate(config.bottomCTAHref)}
              data-editable-href="bottomCTAHref"
              data-href={config.bottomCTAHref}
            >
              <Leaf className="size-4 mr-2" />
              <span data-editable="bottomCTA">{config.bottomCTA}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

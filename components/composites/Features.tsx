import { Users, Calendar, Heart } from 'lucide-react';
import { cn } from "@/lib/utils"
import { gradients } from "@/config/gradients"

const features = [
  {
    icon: Users,
    title: 'Fetisch-Verein',
    description: 'Ein sicherer Raum für Fetisch-Interessierte in Mecklenburg-Vorpommern'
  },
  {
    icon: Users,
    title: 'Gemeinschaft',
    description: 'Starker Zusammenhalt und gegenseitiger Respekt in unserer Community'
  },
  {
    icon: Calendar,
    title: 'Regelmäßige Events',
    description: 'Workshops, Partys und Treffen für alle Interessierten'
  },
  {
    icon: Heart,
    title: 'Vielfalt',
    description: 'Offenheit und Akzeptanz für alle Fetische und Orientierungen'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-4xl font-bold mb-4",
            gradients.title.primary
          )}>
            Was uns ausmacht
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Tauwerk steht für eine offene und respektvolle Community, in der jeder willkommen ist.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className={cn(
                  "text-xl font-semibold mb-2",
                  gradients.title.primary
                )}>
                  {feature.title}
                </h3>
                <p className="text-foreground/70 text-center">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
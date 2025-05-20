import { Metadata } from 'next'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { gradients } from "@/config/gradients"
import { values, teamMembers } from "@/config/about"
import { PageLayout } from '@/components/composites/PageLayout'

export const metadata: Metadata = {
  title: 'Über uns | Tauwerk',
  description: 'Lernen Sie mehr über Tauwerk und unsere Mission.',
}

export default function AboutPage() {
  return (
    <PageLayout 
      title="Über Tauwerk"
      subtitle="Gemeinsam gestalten wir eine offene und respektvolle Community"
    >
      <div className="space-y-24">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-4xl font-bold text-primary mb-2">2019</div>
            <p className="text-foreground/80">Gründungsjahr</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-4xl font-bold text-primary mb-2">10+</div>
            <p className="text-foreground/80">Aktive Mitglieder</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-4xl font-bold text-primary mb-2">24</div>
            <p className="text-foreground/80">Events pro Jahr</p>
          </div>
        </div>

        {/* Vision Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-4xl font-bold mb-4",
              gradients.title.primary
            )}>
              Unsere Vision
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Wir streben danach, eine lebendige Community zu schaffen, in der Menschen ihre Leidenschaft für Technologie und Innovation teilen können.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className={cn(
                "text-2xl font-semibold",
                gradients.title.primary
              )}>
                Was wir erreichen wollen
              </h3>
              <p className="text-foreground/70">
                Unser Ziel ist es, einen Raum zu schaffen, in dem Menschen ihre Ideen teilen, voneinander lernen und gemeinsam wachsen können. Wir glauben an die Kraft der Gemeinschaft und daran, dass wir gemeinsam mehr erreichen können als jeder für sich allein.
              </p>
              <p className="text-foreground/70">
                Durch regelmäßige Events, Workshops und Networking-Möglichkeiten schaffen wir eine Plattform für den Austausch von Wissen und Erfahrungen. Wir fördern Innovation und Kreativität, indem wir Menschen zusammenbringen, die ihre Leidenschaft für Technologie teilen.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className={cn(
                "text-2xl font-semibold",
                gradients.title.primary
              )}>
                Wie wir das erreichen
              </h3>
              <p className="text-foreground/70">
                Wir organisieren regelmäßige Events und Workshops, die sowohl für Anfänger als auch für Experten interessant sind. Unser Fokus liegt dabei auf praktischem Lernen und dem direkten Austausch zwischen den Teilnehmern.
              </p>
              <p className="text-foreground/70">
                Wir arbeiten eng mit lokalen Unternehmen und Bildungseinrichtungen zusammen, um ein breites Spektrum an Themen abzudecken und unseren Mitgliedern Zugang zu verschiedenen Perspektiven und Ressourcen zu ermöglichen.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-4xl font-bold mb-4",
              gradients.title.primary
            )}>
              Unsere Werte
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Diese Grundwerte bilden das Fundament unserer Community und leiten unser Handeln.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-3">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    gradients.title.primary
                  )}>
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 text-center">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className={cn(
              "text-4xl font-bold mb-4",
              gradients.title.primary
            )}>
              Unser Team
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Die Menschen hinter Tauwerk, die unsere Vision leben und die Community gestalten.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-4 w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold mb-1",
                    gradients.title.primary
                  )}>
                    {member.name}
                  </h3>
                  <p className="text-primary mb-2">{member.position}</p>
                  <p className="text-foreground/70 text-center">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
} 
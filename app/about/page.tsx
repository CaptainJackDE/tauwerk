import { Metadata } from 'next'
import Image from 'next/image'
import { Background } from '@/components/composites/Background'
import { cn } from "@/lib/utils"
import { gradients } from "@/config/gradients"
import { values, teamMembers } from "@/config/about"
import { PageTitle } from "@/components/ui/PageTitle"

export const metadata: Metadata = {
  title: 'Über uns | Tauwerk',
  description: 'Lernen Sie mehr über Tauwerk und unsere Mission.',
}

export default function AboutPage() {
  return (
    <>
      <Background />
      <div className="min-h-screen mt-8">
        {/* Header Section */}
        <section className="relative py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <PageTitle 
                title="Über Tauwerk"
                subtitle="Gemeinsam gestalten wir eine offene und respektvolle Community"
              />
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
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Vision Section */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={cn(
                  "text-4xl font-bold mb-6",
                  gradients.title.primary
                )}>
                  Unsere Vision
                </h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Tauwerk ist ein Fetisch-Verein aus Mecklenburg-Vorpommern, der sich für eine offene und respektvolle Community einsetzt. 
                  Wir bieten einen sicheren Raum für Fetisch-Interessierte, in dem jeder willkommen ist.
                </p>
                <p className="text-lg text-foreground/80">
                  Unser Ziel ist es, eine starke Gemeinschaft aufzubauen, in der sich alle wohlfühlen und ihre Interessen ausleben können. 
                  Durch regelmäßige Events, Workshops und Treffen fördern wir den Austausch und das Miteinander.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/vision.jpg"
                  alt="Unsere Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-24">
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
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className={cn(
                "text-4xl font-bold mb-4",
                gradients.title.primary
              )}>
                Unser Team
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Die engagierten Menschen hinter Tauwerk, die unsere Community gestalten und begleiten.
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
                    <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>
                    <h3 className={cn(
                      "text-xl font-semibold mb-2",
                      gradients.title.primary
                    )}>
                      {member.name}
                    </h3>
                    <p className="text-primary mb-3 font-medium">
                      {member.position}
                    </p>
                    <p className="text-foreground/70 text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="group relative p-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative text-center">
              <h2 className={cn(
                "text-3xl font-bold mb-6",
                gradients.title.primary
              )}>
                Werden Sie Teil unserer Geschichte
              </h2>
              <p className="text-xl text-foreground/90 mb-8 max-w-2xl mx-auto">
                Haben Sie Fragen oder möchten Sie mehr über uns erfahren? Wir freuen uns darauf, von Ihnen zu hören!
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 text-foreground rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
                Kontaktieren Sie uns
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
} 
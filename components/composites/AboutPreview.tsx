import Image from "next/image";

export function AboutPreview() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/about-preview.jpg"
              alt="Tauwerk Community"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Über Tauwerk</h2>
            <p className="text-lg text-foreground/80">
              Tauwerk ist ein Fetisch-Verein aus Mecklenburg-Vorpommern, der
              sich für eine offene und respektvolle Community einsetzt. Wir
              bieten einen sicheren Raum für Fetisch-Interessierte, in dem jeder
              willkommen ist.
            </p>
            <p className="text-lg text-foreground/80">
              Unser Ziel ist es, eine starke Gemeinschaft aufzubauen, in der
              sich alle wohlfühlen und ihre Interessen ausleben können. Durch
              regelmäßige Events, Workshops und Treffen fördern wir den
              Austausch und das Miteinander.
            </p>
            <div className="pt-4">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent/40 backdrop-blur-sm border border-white/20 text-foreground rounded-xl hover:bg-transparent/60 transition-all duration-300"
              >
                Mehr über uns erfahren
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

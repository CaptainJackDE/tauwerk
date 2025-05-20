import { Instagram, Mail } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Werde Teil unserer Community</h2>
          <p className="text-lg text-foreground/80 mb-8">
            Hast du Fragen oder möchtest du mehr über Tauwerk erfahren? 
            Kontaktiere uns gerne - wir freuen uns auf dich!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary/90 text-primary-foreground rounded-xl hover:bg-primary transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              Kontakt
            </a>
            <a 
              href="/join" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent/40 backdrop-blur-sm border border-white/20 text-foreground rounded-xl hover:bg-transparent/60 transition-all duration-300"
            >
              Mitglied werden
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 
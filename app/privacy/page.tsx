import React from "react";
import { PageLayout } from "@/components/composites/PageLayout";

export default function Privacy() {
  return (
    <PageLayout
      title="Datenschutzerklärung"
      subtitle="Informationen zum Umgang mit Ihren Daten"
    >
      <div className="space-y-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="text-xl font-semibold mb-2">Allgemeine Hinweise</h3>
          <p className="mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Datenerfassung auf dieser Website
          </h2>
          <h3 className="text-xl font-semibold mb-2">Cookies</h3>
          <p className="mb-4">
            Diese Website verwendet Cookies. Das sind kleine Textdateien, die
            Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns
            dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu
            machen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Analyse-Tools</h2>
          <p className="mb-4">
            Wir verwenden verschiedene Analyse-Tools, um die Nutzung unserer
            Website zu verbessern. Diese Tools helfen uns, die Nutzung unserer
            Website zu verstehen und zu optimieren.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Ihre Rechte</h2>
          <p className="mb-4">
            Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer Person
            gespeicherten Daten, deren Herkunft und Empfänger und den Zweck der
            Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung
            dieser Daten.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Kontakt</h2>
          <p className="mb-4">
            Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
            personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder
            Löschung von Daten wenden Sie sich bitte an:
          </p>
          <p className="mb-2">[Ihre Kontaktdaten]</p>
        </section>
      </div>
    </PageLayout>
  );
}

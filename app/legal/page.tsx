import React from 'react';

export default function Legal() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
        <p className="mb-2">[Ihr Firmenname]</p>
        <p className="mb-2">[Straße und Hausnummer]</p>
        <p className="mb-2">[PLZ und Ort]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
        <p className="mb-2">Telefon: [Ihre Telefonnummer]</p>
        <p className="mb-2">E-Mail: [Ihre E-Mail-Adresse]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p className="mb-2">[Name des Verantwortlichen]</p>
        <p className="mb-2">[Straße und Hausnummer]</p>
        <p className="mb-2">[PLZ und Ort]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Streitschlichtung</h2>
        <p className="mb-4">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
          <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline ml-1">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className="mb-4">
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </div>
  );
} 
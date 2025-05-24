import React from "react";
import { PageLayout } from "@/components/composites/PageLayout";
import { LEGAL } from "@/config/constants";

export default function Legal() {
  return (
    <PageLayout
      title="Impressum"
      subtitle="Rechtliche Informationen und Kontaktdaten"
    >
      <div className="space-y-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="mb-2">{LEGAL.company.name}</p>
          <p className="mb-2">{LEGAL.company.address.street}</p>
          <p className="mb-2">{LEGAL.company.address.city}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <p className="mb-2">Telefon: {LEGAL.contact.phone}</p>
          <p className="mb-2">E-Mail: {LEGAL.contact.email}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="mb-2">{LEGAL.responsible.name}</p>
          <p className="mb-2">{LEGAL.responsible.address.street}</p>
          <p className="mb-2">{LEGAL.responsible.address.city}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Streitschlichtung</h2>
          <p className="mb-4">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
            <a
              href={LEGAL.disputeResolution.platform}
              className="text-blue-600 hover:underline ml-1"
            >
              {LEGAL.disputeResolution.platform}
            </a>
          </p>
          <p className="mb-4">
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

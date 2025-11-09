# Wartungsmodus - Anleitung

Der Wartungsmodus für Tauwerk ermöglicht es, die Website temporär in einen Wartungszustand zu versetzen, während Administratoren weiterhin Zugang haben.

## 🔧 Konfiguration

### Environment Variables

Erstellen Sie eine `.env.local` Datei im Projektroot mit folgenden Variablen:

```bash
# Wartungsmodus aktivieren/deaktivieren
MAINTENANCE_MODE=false

# Sicheres Password für Wartungsmodus-Bypass
MAINTENANCE_PASSWORD=IhrSicheresPasswordHier123!
```

**Wichtig:**
- Verwenden Sie ein starkes, zufälliges Password
- Setzen Sie `MAINTENANCE_MODE=true` um den Wartungsmodus zu aktivieren
- Setzen Sie `MAINTENANCE_MODE=false` oder entfernen Sie die Variable um ihn zu deaktivieren

## 🚀 Funktionsweise

### Automatische Umleitung
- Wenn `MAINTENANCE_MODE=true` ist, werden alle Besucher automatisch auf `/maintenance` umgeleitet
- API-Routen, statische Assets und Wartungs-Endpunkte sind weiterhin zugänglich

### Administrator-Zugang
1. **Diskrete Eingabe**: Unten rechts auf der Wartungsseite befindet sich ein kleiner, grauer Punkt
2. **Dialog öffnen**: Klick auf den Punkt öffnet den Authentifizierungs-Dialog
3. **Password eingeben**: Geben Sie das in `MAINTENANCE_PASSWORD` konfigurierte Password ein
4. **Zugang erhalten**: Nach erfolgreicher Authentifizierung haben Sie vollen Zugang zur Website

### Sicherheitsfeatures
- **Session-basiert**: Authentifizierung gilt für 4 Stunden
- **Rate Limiting**: 1-Sekunden-Verzögerung bei falschen Password-Versuchen
- **Logging**: Alle Authentifizierungs-Versuche werden protokolliert
- **Sichere Speicherung**: Authentication-Token werden in SessionStorage und Cookies gespeichert

## 🎨 Design

Die Wartungsseite verwendet das bestehende Tauwerk-Design:
- **Glassmorphic UI**: Backdrop-blur und transparente Elemente
- **Responsive**: Funktioniert auf allen Bildschirmgrößen
- **Branded**: Nutzt Tauwerk-Farben und -Gradienten
- **Informativ**: Zeigt geschätzte Dauer und Kontaktinformationen

## 🔒 Sicherheit

### Best Practices
- **Starkes Password**: Mindestens 20 Zeichen mit Buchstaben, Zahlen und Sonderzeichen
- **Rotation**: Ändern Sie das Password regelmäßig
- **Monitoring**: Überwachen Sie die Logs auf verdächtige Aktivitäten
- **Zeitlimit**: Authentifizierung läuft automatisch nach 4 Stunden ab

### Implementierte Schutzmaßnahmen
- **Brute-Force-Schutz**: Verzögerung bei falschen Versuchen
- **Secure Cookies**: Cookies mit `secure` und `samesite=strict` Flags
- **Input Validation**: Server-seitige Validierung aller Eingaben
- **Error Handling**: Sichere Fehlerbehandlung ohne Information Leakage

## 📝 Deployment

### Vercel
```bash
# Environment Variables in Vercel Dashboard setzen:
MAINTENANCE_MODE=true
MAINTENANCE_PASSWORD=IhrSicheresPassword
```

### Lokale Entwicklung
```bash
# .env.local erstellen
cp .env.example .env.local

# Password anpassen
nano .env.local

# Anwendung starten
npm run dev
```

## 🔍 Debugging

### Wartungsmodus testen
1. Setzen Sie `MAINTENANCE_MODE=true` in Ihrer `.env.local`
2. Starten Sie die Anwendung neu
3. Besuchen Sie die Website - Sie sollten zur Wartungsseite umgeleitet werden
4. Klicken Sie auf den grauen Punkt unten rechts
5. Geben Sie Ihr Password ein

### Logs überprüfen
```bash
# Development
npm run dev

# Production (Vercel)
vercel logs
```

## ⚠️ Troubleshooting

### Häufige Probleme

**Problem**: "Server configuration error"
**Lösung**: `MAINTENANCE_PASSWORD` Environment Variable ist nicht gesetzt

**Problem**: Wartungsmodus wird nicht aktiviert
**Lösung**: Server neu starten nach Änderung der Environment Variables

**Problem**: Password wird nicht akzeptiert
**Lösung**: Überprüfen Sie Groß-/Kleinschreibung und Sonderzeichen

**Problem**: Authentifizierung läuft sofort ab
**Lösung**: Überprüfen Sie, ob Cookies im Browser aktiviert sind
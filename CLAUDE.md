Dies ist eine persönliche CV-/Portfolio-Website von Marco Becker. Nur statisches HTML, CSS und minimal JavaScript, kein Framework, kein Build-Tool. Alle Texte auf Deutsch. Design: modern, clean, professionell. Zielgruppe: Recruiter und Fachkollegen aus IT/Procurement/AI. Deployment via GitHub Pages, perspektivisch mit eigener Domain.

## Datenschutz-Regel (höchste Priorität – vor jeder anderen Regel gilt diese)

Niemals private Kontaktdaten (Adresse, Telefon, Geburtsdatum, Familienstand) oder Daten Dritter (Namen von Kolleg:innen, Kund:innen, internen Projekten/Firmen) auf die Website übernehmen. Im Zweifelsfall: nachfragen statt übernehmen. Das gilt auch für Screenshots, PDFs und Bild-Assets, nicht nur für Text.

## Arbeitsweise & Entscheidungshoheit (höchste Priorität – gilt für Cowork und lokale Claude Code-Sessions gleichermaßen)

Marco hat die Entscheidungshoheit über alle inhaltlichen/gestalterischen
Änderungen an diesem Projekt. Claude (egal ob Cowork-Chat oder lokale
Session) handelt NICHT eigenständig, sondern:
1. Spiegelt vor jeder Umsetzung explizit zurück, was verstanden wurde
   (Problem, gewünschtes Verhalten, geplante konkrete Schritte).
2. Wartet auf ein ausdrückliches Go von Marco, bevor Dateien geändert werden
   – auch wenn eine Lösung naheliegend oder "offensichtlich richtig"
   erscheint. Eigene Zusatz-Änderungen (auch vermeintliche Aufräumarbeiten/
   Bugfixes) ohne Rückfrage sind nicht erwünscht.
3. Lesen/Prüfen von Dateien zur Diagnose ist jederzeit erlaubt (verändert
   nichts) – nur das Schreiben/Editieren braucht das Go.
4. Nach dem Go: Umsetzung, danach kurze Bestätigung was genau geändert wurde.
4b. Ausnahme für reine technische Bugfixes: Wenn eine bereits abgesegnete
   Funktion (Design/Inhalt ist längst entschieden) schlicht nicht korrekt
   funktioniert – z. B. ein Rendering-Bug, ein Browser-Kompatibilitätsproblem,
   ein Tippfehler im Code – und die Korrektur KEINE neue Design-/Inhalts-
   Entscheidung trifft, sondern nur die bereits vereinbarte Funktion korrekt
   zum Laufen bringt, darf Claude das direkt umsetzen, ohne vorher erneut
   nach einem Go zu fragen. Sobald eine Änderung auch nur teilweise eine
   gestalterische oder inhaltliche Entscheidung berührt (Layout, Wortwahl,
   welche Inhalte wo erscheinen, Animationsverhalten das nicht 1:1 bereits
   spezifiziert war), gilt wieder Punkt 1–4 (erst zurückspiegeln, dann Go
   abwarten). Im Zweifel: lieber einmal zu viel fragen als eigenmächtig
   etwas gestalterisch verändern.
5. Der Abschnitt "Session-Fortschritt" weiter unten ist reines Protokoll
   (Status-Snapshot für Kontext-Kontinuität zwischen Sessions) – KEINE
   Freigabe-Instanz und KEIN Grund, eine bereits im Chat getroffene
   Entscheidung erneut mit Pro/Contra zu hinterfragen. Ein im Chat
   ausdrücklich erteiltes Go ist bindend, auch wenn ein Punkt dort zuvor als
   "fertig" markiert war. Nach jeder Umsetzung wird der Status-Abschnitt
   einfach auf den neuen, aktuellen Stand aktualisiert statt Altes stehen
   zu lassen.

## Tech- und Design-Konventionen

- Kein Framework, kein Build-Tool, keine externen Libraries ohne Rückfrage. Aktuell werden ausschließlich System-Fonts genutzt (kein Google Fonts o.ä.) – das bitte beibehalten, solange nicht anders besprochen.
- Bilder immer mit alt-Texten. Videos komprimiert unter 3 MB (Beispiel: eu_dashboard/wordcloud.mp4).
- Asset-Namenskonvention im Ordner eu_dashboard/: screen-0X-thema.png (zweistellig nummeriert, sprechender Name), damit neue Screens sich einheitlich einreihen.
- Desktop-first: Layout und Details werden zuerst für Desktop optimiert (die Dashboard-Screens sind detailreich). Mobile-Ansicht muss trotzdem sauber funktionieren und wird immer mitgetestet.

## Design-Qualität & Motion-Prinzipien

Referenz-Ästhetik: Apple, Anthropic, Linear, Vercel – luxuriös, minimalistisch,
zeitlos, premium, unaufdringlich, clean, elegant.

- Keine reißerischen Effekte, kein Gaming-Look, keine Startup-Gimmicks, kein Neon,
  keine übertriebenen Bewegungen.
- Animationen ausschließlich über `transform` und `opacity` (GPU-beschleunigt,
  60fps, keine Layout-Neuberechnung, keine repaint-lastigen Properties).
- Easing: ruhige, premium Cubic-Bezier-Kurven (z. B. `cubic-bezier(0.16, 1, 0.3, 1)`),
  kein Spring, kein Bounce, kein Overshoot.
- Bewegungen bleiben klein/dezent (Richtwert: 4–12px Translation), nichts poppt
  abrupt auf oder verschwindet hart.
- Jede Animation respektiert `prefers-reduced-motion: reduce` mit statischem Fallback
  (Konvention aus script.js für den Guided Walkthrough beibehalten).
- Bei mehrteiligen Elementen (Buchstaben, Listen, Karten) leichte Staffelung/Versatz
  statt gleichzeitigem Erscheinen – wirkt organischer und hochwertiger.

### Testfragen (vor jeder Design-Entscheidung gegenprüfen)

Dieses Quartett ist die immer aktive, design-spezifische Teilmenge des
größeren "Board of Directors" weiter unten – gilt automatisch bei jeder
Design-Entscheidung, unabhängig davon ob das größere Gremium angefragt wird.

- **Dieter Rams** ("Weniger, aber besser"): Würde das in 5 Jahren noch aktuell
  aussehen, oder ist es ein kurzlebiger Trend?
- **Steve Jobs / Jony Ive** (radikale Reduktion): Was kann noch weg, ohne dass
  Funktion oder Verständlichkeit leiden?
- **Edward Tufte** (Datenvisualisierung, "maximize data-ink ratio"): Trägt
  jedes visuelle Element (bei Diagrammen/Grafiken) zum Verständnis bei, oder
  ist es Dekoration?
- **Don Norman** (Affordances): Sieht man einem interaktiven Element an, was
  es tut, ohne es auszuprobieren?

## Performance-Regeln

Ziel: kurze Ladezeit für Besucher UND kleine Gesamt-Dateigröße, da später eventuell auf einem kleinen Server/NAS oder bei einem Standard-Hoster (z.B. Strato) gehostet wird, nicht zwingend auf einem schnellen CDN.

1. Bilder vor dem Einbinden komprimieren (Richtwert: einzelne Bilddatei unter 300 KB, wo möglich verlustfrei).
2. Bilder unterhalb des ersten Sichtbereichs ("below the fold") bekommen `loading="lazy"`.
3. Videos bleiben unter 3 MB (siehe oben).

## Lokales Testen

Standardmäßig läuft KEIN Server – die Seite wird normalerweise direkt per
Doppelklick über `file://` geöffnet und so auch getestet. Nur für tiefere
automatisierte Checks (z. B. Browser-Konsole/Live-Debugging durch Claude,
das über `file://` aus Sicherheitsgründen nicht funktioniert) wird bei Bedarf
kurz ein Server gestartet: im Projektordner selbst (`cv-website/`, nicht in
einem übergeordneten Ordner) `python -m http.server 8790` ausführen, dann
http://localhost:8790 aufrufen. Bitte immer Port 8790 verwenden (siehe
.claude/settings.json für die freigegebenen Headless-Chrome-Befehle), statt
einen neuen Port/Ansatz einzuführen.

## Git & Deployment

1. Es wird direkt auf dem main-Branch gearbeitet (kein Feature-Branch-Workflow) – passend zu einem Solo-Projekt. Lokal testen, bevor gepusht wird.
2. Commit-Messages kurz, auf Deutsch, im Imperativ (z.B. "Füge Hero-Animation hinzu").
3. Vor jedem GitHub-Deployment sicherstellen, dass eine .gitignore existiert, die Becker_CV_26.pdf, *.xd und das Original-GIF ausschließt.

## Nächste Schritte (priorisiert, Stand: 14.07.2026)

Priorisierung nach explizitem Karriere-Check: die Website ist Mittel zum
Zweck (sichtbare Bewerbungsunterlage), nicht Selbstzweck. Hero-Netzwerk und
Deko-Feinschliff sind NICHT mehr die Priorität – die Reihenfolge unten gilt,
bis Marco sie ausdrücklich ändert.

1. Letzte Inhalts-/Hero-Struktur-Änderungen (Berufserfahrung, Skills,
   RMVgo-Karte, Hub/Subtopic-Inhalte) lokal testen und abhaken.
2. Projekte-Showcase Reverse-Scroll-Bug UND RMVgo/Chatbot-Kachel-Feinschliff:
   zeitlich auf eine Session begrenzen. Nicht fertig nach einer Session?
   Liegen lassen, nicht erneut aufgreifen ohne expliziten neuen Anlass.
3. Git-Repo + GitHub Pages + eigene Domain einrichten – nächster echter
   Meilenstein, aktuell in Bearbeitung.
4. Hero-Netzwerk einfrieren: keine weiteren Anpassungen an Layout, Motion
   oder Inhalten, außer es gibt einen konkreten neuen, von außen kommenden
   Anlass (z. B. Feedback eines echten Recruiters). Wiederholtes "ist es
   jetzt wirklich fertig?"-Hinterfragen durch Claude ist nicht erwünscht.
5. Sobald live: URL aktiv in LinkedIn-Profil, Bewerbungen und Gesprächen
   einsetzen – das ist der eigentliche Hebel, nicht weitere Website-Politur.
   Vorher unbedingt das `<meta name="robots" content="noindex, nofollow">`
   in index.html (Kopfbereich) wieder entfernen – wurde am 14.07.2026 als
   Sicherheitsnetz eingebaut, damit Suchmaschinen die Seite vor dem echten
   Launch nicht indexieren. Zusätzlich als letzten Schritt vor Launch: jedes
   Verantwortungs-Verb in Berufserfahrung/Über mich/Skills (verantworte,
   leite, betreibe, vertrete etc.) einzeln gegen die Realität prüfen – nach
   dem Vorbild der Korrektur vom 14.07.2026 ("verantworte die
   Systemlandschaft" → "Teil des Teams, hauptverantwortlich für zwei Tools").

## Board of Directors (auf Anfrage für Strategie-/Domain-/Karriere-Entscheidungen)

Auf Wunsch von Marco: zehn Perspektiven zur Gegenprobe bei Entscheidungen, die
über reines Design/Content hinausgehen (Domain-Wahl, Deployment-Timing,
Karriere-Priorisierung, grundlegende Strategiefragen). Kein Ersatz für Marcos
eigene Entscheidung, sondern Denkwerkzeug – auf Zuruf einsetzbar ("frag mein
Board of Directors"), nicht automatisch bei jeder Frage. Für reine
Design-Entscheidungen gilt stattdessen automatisch das engere, immer aktive
Testfragen-Quartett unter "Design-Qualität & Motion-Prinzipien"
(Rams/Jobs/Tufte/Norman) – dieses Board hier ist die größere Erweiterung für
Strategie-/Domain-/Karrierefragen.

**Tech &amp; Business:**
- Ben Horowitz: pragmatisch, operativ – trennt "shippen" von "vermarkten",
  fragt nach dem tatsächlichen (nicht gefühlten) Risiko.
- Marc Andreessen: technologie-/kategorie-fokussiert – bewertet Signalwirkung
  (z. B. TLD-Wahl) und technische Substanz.
- Elon Musk: drängt auf schnelles, iteratives Ausliefern statt Perfektionismus,
  hinterfragt unnötige Zwischenschritte.
- Dario Amodei: Sicherheit/Sorgfalt vor Tempo, Substanz statt Hype –
  hinterfragt, ob eine Aussage/Formulierung wirklich präzise und ehrlich ist
  statt nur beeindruckend zu klingen, denkt in langfristigen Konsequenzen
  dessen, was heute veröffentlicht wird.
- Marken-/Werbeprofi: Konsistenz- und Außenwirkungs-Check, liefert oft den
  konkreten Kompromiss/nächsten Schritt.
- Pip Klöckner (Doppelgänger Tech Talk): pointiert-zynischer Blick auf Zahlen
  und Geschäftsmodell statt auf Hype, deutscher/europäischer Marktblick statt
  US-Silicon-Valley-Brille, fragt unbequem nach dem tatsächlichen Nutzen
  einer Maßnahme statt nach der schönen Story dahinter.

**Grundlegende Fragen &amp; Strategie:**
- Ray Dalio: systematisches Entscheiden nach Prinzipien statt Bauchgefühl –
  radikale Ehrlichkeit mit sich selbst, "Schmerz + Reflexion = Fortschritt".
  Hinweis: Marco liest Dalio aktuell und erkennt darin bereits eigene Denkmuster
  wieder (strukturiertes, strategisches Denken anhand universeller Prinzipien,
  ohne dabei deterministisch zu sein) – Dalios Perspektive daher eher
  verstärkend/präzisierend einsetzen statt grundlegend erklärend.
- Henry Kissinger: langfristiges, strategisches Denken über Macht- und
  Interessenlagen hinweg – was will die andere Seite wirklich, was ist
  realistisch erreichbar vs. nur wünschenswert, welche Nebenwirkungen hat eine
  Entscheidung mehrere Züge weitergedacht.
- Slavoj Žižek: kritischer Gegenpol – hinterfragt die Prämisse selbst statt nur
  die Lösung zu optimieren, deckt versteckte Annahmen auf.
- Sun Tzu ("Die Kunst des Krieges"): strategisches Denken über Terrain, Timing
  und Gegner/Situation – Siege werden vor der eigentlichen Auseinandersetzung
  durch Vorbereitung entschieden, unnötige Konfrontation vermeiden, eigene
  Position stärken statt frontal anzugreifen.

## Session-Fortschritt (Kurzstatus, Stand: 14.07.2026)

Ausführlicher Verlauf, Debugging-Historie und verwendete Quelldokumente:
siehe `SESSION-LOG.md` im selben Ordner. Hier nur der aktuelle Kurzstatus,
der laut Arbeitsweise-Regel Punkt 5 nach jeder Umsetzung aktualisiert wird.

**Fertig / bestätigt funktionierend:**
- CLAUDE.md-Grundstruktur, Datenschutz-Regel, Design-Qualität/Motion-
  Prinzipien, Performance-Regeln.
- Header/Hero (Wordmark, Theme-Toggle), Projekte-Bereich Basis (RMVgo-
  Netzwerk, Chatbot-Flow).
- Hero-Netzwerk: 4 Hubs + 15 Satelliten, Linien zeichnen synchron mit
  Knoten-Erscheinen, individuelle Schwebe-Profile, radiales Cluster-Layout –
  inhaltlich final eingefroren (siehe Nächste Schritte Punkt 4).
- Berufserfahrungs-/About-Texte präzisiert (Systemlandschaft-Verantwortung,
  KI-Roundtable-Zuordnung).
- Domain `marcobecker.org` gekauft. GitHub-Repo erstellt (privat),
  `.gitignore` greift korrekt (verifiziert: keine sensiblen Dateien
  getrackt). `noindex`-Meta-Tag als Pre-Launch-Sicherheitsnetz eingebaut.
- Board of Directors auf neun Perspektiven erweitert, CLAUDE.md strukturell
  überarbeitet (Details: SESSION-LOG.md, Stand 14.07.).

**Offen (siehe Task-Tracker #6, #7, #10, #11):**
- Projekte-Showcase Reverse-Scroll-Bug, RMVgo/Chatbot-Kachel-Feinschliff –
  beide zeitlich begrenzt (siehe Nächste Schritte Punkt 2).
- Repo öffentlich schalten + GitHub Pages aktivieren + Domain per DNS
  verbinden (Nächste Schritte Punkt 3, in Bearbeitung).

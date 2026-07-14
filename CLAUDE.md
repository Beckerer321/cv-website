Dies ist eine persönliche CV-/Portfolio-Website von Marco Becker. Nur statisches HTML, CSS und minimal JavaScript, kein Framework, kein Build-Tool. Alle Texte auf Deutsch. Design: modern, clean, professionell. Zielgruppe: Recruiter und Fachkollegen aus IT/Procurement/AI. Deployment via GitHub Pages, perspektivisch mit eigener Domain.

## Datenschutz-Regel (höchste Priorität – vor jeder anderen Regel gilt diese)

Niemals private Kontaktdaten (Adresse, Telefon, Geburtsdatum, Familienstand) oder Daten Dritter (Namen von Kolleg:innen, Kund:innen, internen Projekten/Firmen) auf die Website übernehmen. Im Zweifelsfall: nachfragen statt übernehmen. Das gilt auch für Screenshots, PDFs und Bild-Assets, nicht nur für Text.

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

## Board of Directors (auf Anfrage für Strategie-/Domain-/Karriere-Entscheidungen)

Auf Wunsch von Marco: acht Perspektiven zur Gegenprobe bei Entscheidungen, die
über reines Design/Content hinausgehen (Domain-Wahl, Deployment-Timing,
Karriere-Priorisierung, grundlegende Strategiefragen). Kein Ersatz für Marcos
eigene Entscheidung, sondern Denkwerkzeug – auf Zuruf einsetzbar ("frag mein
Board of Directors"), nicht automatisch bei jeder Frage.

**Tech &amp; Business:**
- Ben Horowitz: pragmatisch, operativ – trennt "shippen" von "vermarkten",
  fragt nach dem tatsächlichen (nicht gefühlten) Risiko.
- Marc Andreessen: technologie-/kategorie-fokussiert – bewertet Signalwirkung
  (z. B. TLD-Wahl) und technische Substanz.
- Elon Musk: drängt auf schnelles, iteratives Ausliefern statt Perfektionismus,
  hinterfragt unnötige Zwischenschritte.
- Marken-/Werbeprofi: Konsistenz- und Außenwirkungs-Check, liefert oft den
  konkreten Kompromiss/nächsten Schritt.

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

## Session-Fortschritt (Stand: 13.07.2026)

Kontext für die nächste Session (Cowork-Chat oder lokale Claude Code-Session
in VS Code – beide arbeiten am selben Ordner): Arbeitsweise ist etabliert,
dass Konzeption/Planung im Cowork-Chat läuft und von dort exportierbare,
copy-paste-fertige Prompts für die lokale Claude Code-Session (VS Code,
Terminal/Browser-Zugriff) erzeugt werden. Cowork selbst nimmt i.d.R. keine
direkten Datei-Edits an index.html/style.css/script.js vor.

**Fertig / bestätigt funktionierend:**
- CLAUDE.md-Struktur (dieses Dokument) inkl. Datenschutz-Regel, Design-
  Qualität/Motion-Prinzipien, Performance-Regeln.
- Header/Hero: Buchstaben-Wordmark "Marco Becker" mit Scroll-Collapse (nur
  M/B bleiben sichtbar), Hell/Dunkel-Toggle mit Anti-FOUC-Script, mehrere
  Kontrast-Bugs in beiden Themes gefixt (--hero-node-bg, --hero-line-color,
  --border).
- Projekte-Bereich: RMVgo-Kachel-Netzwerk (echte App-Screenshots, Adresse
  aus Datenschutzgründen ersetzt durch neutrale Orte), Chatbot-Architektur-
  Flow (horizontal, barrierefrei nach aria-hidden-Fix, mit Quellenangabe
  zur zitierten Publikation).
- Hero-Netzwerk ("Knowledge Graph" im Hintergrund): 4 Hub-Badges (simultan)
  + 10 Subtopic-Badges (simultan danach), Linien zeichnen sich erst NACH
  ihrem Zielknoten von Hub zu Subtopic ein (getTotalLength()-basiertes
  stroke-dasharray/-dashoffset in JS; die zwischenzeitlich getestete SVG
  pathLength-Technik wurde wieder verworfen, da pathLength auf <line>-
  Elementen browserübergreifend unzuverlässig unterstützt wird und
  gestrichelte statt durchgehende Linien verursachte), jeder Knoten hat eine eigene Schwebe-
  Logik (x/y/xy/vibrate-Profile) inkl. mitgeführter Linien-Endpunkte,
  radiales Cluster-Layout (jeder Hub + seine Subtopics eng gruppiert,
  deutliche Lücke zwischen den vier Gruppen). Bug behoben: "Stakeholder-
  Management" hängt jetzt korrekt an "Product Ownership" (H3) statt an
  "Change & AI-Adoption". prefers-reduced-motion geprüft (Chrome-Flag
  --force-prefers-reduced-motion): sofortiger statischer Endzustand.
  Zweiter, hartnäckigerer Linien-Bug gefunden und behoben (per Live-Debugging
  über Claude-in-Chrome direkt im Browser, nicht nur über Screenshots):
  stroke-dasharray wurde nur einmal beim Laden auf die damalige Linienlänge
  gesetzt, aber die Endpunkte bewegen sich durch die Schwebe-Logik laufend
  mit – dadurch driftete die echte Länge vom fixen Dasharray-Wert auseinander
  und erzeugte ein sich wiederholendes Strich-Lücke-Muster (v. a. bei Linien
  an stark bewegten Knoten wie H3/H4). Fix: dasharray wird in der tick()-
  Schleife bei jeder Positions-Aktualisierung neu aus der aktuellen
  getTotalLength() berechnet.

**Offen (siehe Task-Tracker #3, #5, #6, #7):**
- Projekte-Showcase (3-Layer: Kamera-Float + Parallax + scroll-gekoppeltes
  Wachsen/Schrumpfen) insgesamt noch NICHT als fertig bestätigt: Vorwärts-
  Scroll (Box wächst beim Runterscrollen) funktioniert, Rückwärts-Scroll
  (Box soll beim Hochscrollen wieder schrumpfen) vermutlich nicht – noch
  nicht diagnostiziert.
- RMVgo/Chatbot-Feinschliff: 📱-Emoji als Hub-Icon wirkt "billig" und soll
  ersetzt werden, Kachel-Schwebeanimation ist zu gleichförmig, Bildunterschriften
  brauchen besseres Layout/Typografie, Anthropic-artige "Tiles fahren
  prominent heraus"-Qualität fehlt noch.
- Setup & Publishing (GitHub Pages, eigene Domain) – noch nicht begonnen.

**Quelldokumente/Assets, die in dieser Session verwendet wurden:**
- `Becker_CV_26.pdf` – Ausgangsdaten für alle CV-Inhalte (Rolle bei der
  DZ BANK, Projekte, Skills). Wird laut .gitignore-Regel nicht mit hochgeladen.
- `Gen_AI/id-5147.pdf` – öffentliches, CC-lizenziertes Fachpaper (Breiter,
  Lohmann, Stahl, Zilmans, Reischl-Lenz, Gimpel: "Generative KI in der
  Finanzbranche... am Beispiel der DZ BANK AG", HMD Praxis der
  Wirtschaftsinformatik 2025, DOI 10.1365/s40702-025-01166-8) – Quelle für
  die Chatbot-Architektur-Grafik; Marco ist NICHT Autor, wird nur als
  Hintergrundquelle zitiert (Link im Chatbot-Flow eingebaut).
- `rmvgo/` – App-Screenshots (rmvgo_startscreen.png, rmvgo_abfahrten_ffm.png,
  rmvgo_abfahrten_ffm_2.png, rmvgo_ticket.png, rmvgo_verbindung.png,
  rmvgo_bikesharing.png, appstore_rmvgo.png). Ursprünglich enthielt ein
  Screenshot die private Adresse "Schneidmühlweg 74" – wurde erkannt und
  durch neutrale Screenshots (Start: Frankfurt/Aschaffenburg Hauptbahnhof)
  ersetzt.
- `eu_dashboard/` – 7 Screens (screen-01-overview bis screen-07-methodik)
  für den Guided Walkthrough des European Dashboard (Masterthesis), plus
  komprimiertes wordcloud.mp4 (<3MB) als Lightbox-Finale.
- Diverse Anthropic.com-Referenz-Screenshots (Hero-Netzwerk-Optik,
  Scroll-Showcase-Kino-Modus) – dienten nur als visuelle Referenz, keine
  Assets, keine Übernahme von Fremdinhalten.
- Extern generierte Motion-Spezifikationen (aus einem anderen KI-Tool,
  teils React/Next.js/Tailwind/Framer-Motion-basiert) wurden jedes Mal in
  Vanilla HTML/CSS/JS übersetzt, um CLAUDE.md's No-Framework-Regel zu
  wahren – dieses Muster hat sich wiederholt und sollte bei zukünftigen
  externen Prompts weiterhin beachtet werden.

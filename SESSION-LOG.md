# Session-Log – CV-Website Marco Becker

Ausführlicher Verlauf und Debugging-Historie zu diesem Projekt. Für die
aktuellen Regeln und den Kurzstatus siehe CLAUDE.md – diese Datei ist reines
Archiv, keine Regel-Quelle, und muss nicht bei jeder Session aktuell
gehalten werden (im Gegensatz zum Kurzstatus in CLAUDE.md).

## Stand 13.07.2026

Kontext: Arbeitsweise etabliert, dass Konzeption/Planung im Cowork-Chat läuft
und von dort exportierbare, copy-paste-fertige Prompts für die lokale Claude
Code-Session (VS Code, Terminal/Browser-Zugriff) erzeugt werden. Cowork
selbst nimmt i. d. R. keine direkten Datei-Edits an
index.html/style.css/script.js vor.

**Fertig / bestätigt funktionierend:**
- CLAUDE.md-Struktur inkl. Datenschutz-Regel, Design-Qualität/Motion-
  Prinzipien, Performance-Regeln.
- Header/Hero: Buchstaben-Wordmark "Marco Becker" mit Scroll-Collapse (nur
  M/B bleiben sichtbar), Hell/Dunkel-Toggle mit Anti-FOUC-Script, mehrere
  Kontrast-Bugs in beiden Themes gefixt (--hero-node-bg, --hero-line-color,
  --border).
- Projekte-Bereich: RMVgo-Kachel-Netzwerk (echte App-Screenshots, Adresse aus
  Datenschutzgründen ersetzt durch neutrale Orte), Chatbot-Architektur-Flow
  (horizontal, barrierefrei nach aria-hidden-Fix, mit Quellenangabe zur
  zitierten Publikation).
- Hero-Netzwerk ("Knowledge Graph" im Hintergrund): 4 Hub-Badges (simultan) +
  10 Subtopic-Badges (simultan danach), Linien zeichnen sich erst NACH ihrem
  Zielknoten von Hub zu Subtopic ein (getTotalLength()-basiertes
  stroke-dasharray/-dashoffset in JS; die zwischenzeitlich getestete SVG
  pathLength-Technik wurde wieder verworfen, da pathLength auf <line>-
  Elementen browserübergreifend unzuverlässig unterstützt wird und
  gestrichelte statt durchgehende Linien verursachte), jeder Knoten hat eine
  eigene Schwebe-Logik (x/y/xy/vibrate-Profile) inkl. mitgeführter
  Linien-Endpunkte, radiales Cluster-Layout (jeder Hub + seine Subtopics eng
  gruppiert, deutliche Lücke zwischen den vier Gruppen). Bug behoben:
  "Stakeholder-Management" hängt jetzt korrekt an "Product Ownership" (H3)
  statt an "Change & AI-Adoption". prefers-reduced-motion geprüft
  (Chrome-Flag --force-prefers-reduced-motion): sofortiger statischer
  Endzustand. Zweiter, hartnäckigerer Linien-Bug gefunden und behoben (per
  Live-Debugging über Claude-in-Chrome direkt im Browser, nicht nur über
  Screenshots): stroke-dasharray wurde nur einmal beim Laden auf die damalige
  Linienlänge gesetzt, aber die Endpunkte bewegen sich durch die
  Schwebe-Logik laufend mit – dadurch driftete die echte Länge vom fixen
  Dasharray-Wert auseinander und erzeugte ein sich wiederholendes
  Strich-Lücke-Muster (v. a. bei Linien an stark bewegten Knoten wie H3/H4).
  Fix: dasharray wird in der tick()-Schleife bei jeder
  Positions-Aktualisierung neu aus der aktuellen getTotalLength() berechnet.

**Offen (Stand 13.07.):**
- Projekte-Showcase (3-Layer: Kamera-Float + Parallax + scroll-gekoppeltes
  Wachsen/Schrumpfen) insgesamt noch NICHT als fertig bestätigt: Vorwärts-
  Scroll (Box wächst beim Runterscrollen) funktioniert, Rückwärts-Scroll (Box
  soll beim Hochscrollen wieder schrumpfen) vermutlich nicht – noch nicht
  diagnostiziert.
- RMVgo/Chatbot-Feinschliff: 📱-Emoji als Hub-Icon wirkt "billig" und soll
  ersetzt werden, Kachel-Schwebeanimation ist zu gleichförmig,
  Bildunterschriften brauchen besseres Layout/Typografie, Anthropic-artige
  "Tiles fahren prominent heraus"-Qualität fehlt noch.
- Setup & Publishing (GitHub Pages, eigene Domain) – noch nicht begonnen.

**Quelldokumente/Assets, die verwendet wurden:**
- `Becker_CV_26.pdf` – Ausgangsdaten für alle CV-Inhalte (Rolle bei der
  DZ BANK, Projekte, Skills). Wird laut .gitignore-Regel nicht mit
  hochgeladen.
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
- `eu_dashboard/` – 7 Screens (screen-01-overview bis screen-07-methodik) für
  den Guided Walkthrough des European Dashboard (Masterthesis), plus
  komprimiertes wordcloud.mp4 (<3MB) als Lightbox-Finale.
- Diverse Anthropic.com-Referenz-Screenshots (Hero-Netzwerk-Optik,
  Scroll-Showcase-Kino-Modus) – dienten nur als visuelle Referenz, keine
  Assets, keine Übernahme von Fremdinhalten.
- Extern generierte Motion-Spezifikationen (aus einem anderen KI-Tool, teils
  React/Next.js/Tailwind/Framer-Motion-basiert) wurden jedes Mal in Vanilla
  HTML/CSS/JS übersetzt, um CLAUDE.md's No-Framework-Regel zu wahren –
  dieses Muster hat sich wiederholt und sollte bei zukünftigen externen
  Prompts weiterhin beachtet werden.

## Stand 14.07.2026

- Domain `marcobecker.org` bei INWX gekauft (marcobecker.de und .com waren
  bereits vergeben). Das SSL-Zusatzprodukt "Trust Provider DV SSL" bewusst
  nicht gebucht – GitHub Pages stellt für Custom Domains automatisch
  kostenloses SSL über Let's Encrypt.
- GitHub-Repo erstellt (Anzeige-Name "Lebenslauf-Website" unter Beckerer321,
  lokaler Ordner/Remote-Name `cv-website`), aktuell privat. `.gitignore` vor
  dem allerersten Commit angelegt (Becker_CV_26.pdf, *.xd, Original-GIF,
  Gen_AI/id-5147.pdf, .claude/settings.local.json) – per Dateiliste auf
  GitHub verifiziert: keine dieser Dateien wurde versehentlich mitcommitted.
- Berufserfahrungs-Texte präzisiert: "Verantworte die
  Procurement-Systemlandschaft" (About-Sektion + Berufserfahrung-Bullet) war
  zu weitreichend formuliert – Marco ist Teil des Teams, nicht
  Hauptverantwortlicher für die gesamte Systemlandschaft, sondern konkret für
  Ausschreibungstool und GenAI-Chatbot. Korrigiert entsprechend. KI-Roundtable-
  Bullet korrigiert: war fälschlich als Kolleg:innen-Schulungsformat
  dargestellt, tatsächlich ein Austauschformat mit Einkaufsorganisationen
  anderer Konzerngesellschaften; Schulung/AI-Adoption bleibt als eigene,
  separate Aktivität im selben Bullet erhalten.
- Temporäres `<meta name="robots" content="noindex, nofollow">` in
  index.html eingebaut als Sicherheitsnetz gegen Suchmaschinen-Indexierung
  vor dem eigentlichen Launch (siehe CLAUDE.md "Nächste Schritte" Punkt 5 für
  den Entfernungs-Reminder).
- "Board of Directors" in CLAUDE.md eingeführt und erweitert: Ben Horowitz,
  Marc Andreessen, Elon Musk, Dario Amodei, Marken-/Werbeprofi (Tech &
  Business) sowie Ray Dalio, Henry Kissinger, Slavoj Žižek, Sun Tzu
  (Grundlegende Fragen & Strategie).
- CLAUDE.md strukturell überarbeitet (auf Wunsch, nach Board-of-Directors-
  Review): Arbeitsweise-Sektion nach oben verschoben (direkt nach
  Datenschutz-Regel, da ebenfalls "höchste Priorität"), Testfragen und Board
  of Directors gegenseitig verlinkt (Testfragen = immer aktive
  Design-Teilmenge, Board = größere On-Demand-Erweiterung), Precision-Check
  vor Launch in Punkt 5 der Nächste-Schritte-Liste ergänzt, diese
  Session-Log-Datei aus CLAUDE.md ausgelagert (vorher: "Session-Fortschritt"-
  Abschnitt machte über ein Drittel des Dokuments aus).

**Offen (Stand 14.07., siehe auch Task-Tracker):**
- Repo öffentlich schalten (GitHub-Free-Plan-Limit: Pages funktioniert nur
  bei öffentlichen Repos, nicht bei privaten).
- GitHub Pages aktivieren (Settings → Pages, Branch main).
- Domain `marcobecker.org` per DNS bei INWX mit GitHub Pages verbinden
  (A-Records auf GitHub-IPs, CNAME-Datei im Repo).
- Projekte-Showcase Reverse-Scroll-Bug – noch nicht diagnostiziert.
- RMVgo/Chatbot-Kachel-Feinschliff – 📱-Emoji, Schwebeanimation,
  Bildunterschriften-Typografie.

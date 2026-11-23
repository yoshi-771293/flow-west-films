/* ============================================================================
 * Flow West Films — Blog content (single source of truth)
 * ----------------------------------------------------------------------------
 * Read by blog.jsx (rendering) AND scripts/seo-prerender (routes + schema).
 * Add a post = add an object here, then add its rewrite in vercel.json
 * (/blog/<slug> -> /_pre/blog__<slug>.html), the sitemap entry, and rebuild.
 * Voice: German, "Du", short declarative sentences, first person for opinions.
 * Block types: { p: "text" } · { ul: [..] } · { ol: [..] }
 * English: optional `en: { title, metaTitle, metaDesc, eyebrow, answer, intro, sections, faq, cta }` on a post.
 *   blog.jsx shows it when the visitor switches to EN; posts without `en` stay German (with a notice).
 *   The prerendered HTML and schema are always German.
 * ========================================================================== */
window.FWF_POSTS = [
  {
    slug: "was-kostet-ein-ki-werbefilm",
    title: "Was kostet ein KI-Werbefilm? Preise, Pakete und versteckte Kosten",
    metaTitle: "KI Werbefilm Kosten: Preise ab 2.500 € | Flow West Films",
    metaDesc: "Was kostet ein KI-Werbefilm? Ehrliche Preisspannen von 2.000 bis 10.000 €, was im Paket steckt und was KI-Projekte teurer macht als gedacht.",
    eyebrow: "Kosten",
    date: "2026-10-12",
    readMin: 4,
    answer: "Ein KI-Werbefilm kostet im Einstieg zwischen 2.000 und 5.000 €. Ein Content-Paket mit rund 15 kurzen Ad-Videos startet bei ca. 2.500 €. Kommt ein Realdreh dazu, landest Du eher zwischen 5.000 und 10.000 €. Den Preis bestimmen vor allem die Zahl der Deliverables, die Korrekturrunden und die Frage, ob vor Ort gedreht wird. Länge und Anzahl der Szenen kommen dazu.",
    intro: ["KI-Video spart Dir Set, Crew und Reisen. Es spart Dir nicht den Anspruch an den Film. Deshalb lässt sich der Preis nicht pro Sekunde rechnen.", "Hier siehst Du, was Du in welcher Preisklasse bekommst, wo das Geld hingeht und woran Projekte teurer werden."],
    sections: [
      {
        h: "Das bekommst Du für 2.000 bis 5.000 €",
        blocks: [
          { p: "Im Einstieg hast Du zwei sinnvolle Wege." },
          { ul: [
            "Imagefilm mit Cutdowns: ein Film, der Deine Marke erzählt, plus ein paar abgeleitete Versionen. Zum Beispiel ein vertikaler Cut oder ein kurzer, trailerartiger Schnitt, den Du direkt als Anzeige schalten kannst.",
            "Content-Paket für rund 2.500 €: UGC-Ads oder Ad-Creatives. Typisch sind etwa 15 Videos mit je 15 bis 30 Sekunden, je nach Aufwand und Motion Graphics zwischen 10 und 20. Eine Korrekturschleife ist enthalten."
          ] },
          { p: "Nicht enthalten ist in dieser Preisklasse ein Dreh vor Ort. Sobald jemand vor die Kamera muss, etwa für ein Interview, ändert sich der Preis deutlich." }
        ]
      },
      {
        h: "Was zwischen 5.000 und 10.000 € dazukommt",
        blocks: [
          { p: "Ab 5.000 € bekommst Du meist mehr Deliverables oder eine hybride Produktion: ein Teil KI, ein Teil gedreht vor Ort. Hybrid ist deutlich aufwendiger. Es kommen VFX, Greenscreen, Locations, Equipment-Miete, mehr Crew, Reisen und Versicherungen dazu. Dafür bekommst Du mehr Material und höhere Qualität für Dein Geld." },
          { p: "Ein Rechenbeispiel: Du buchst einen Imagefilm für rund 5.000 €. Am selben Tag drehen wir vor Ort ein Testimonial und ein paar Ads, bei denen wir die Performance teilweise real filmen. Zusammen landest Du bei etwa 10.000 €." }
        ]
      },
      {
        h: "Wohin das Geld bei einem KI-Spot wirklich geht",
        blocks: [
          { p: "Viele erwarten, dass die Kosten im Generieren stecken. Die meiste Zeit fließt aber in Schnitt, Sounddesign und Color Grading. Also genau in das, was einen Spot nach Film aussehen und klingen lässt. Davor stehen Skript und Look-Entwicklung." },
          { p: "Beim Realdreh verteilt sich das Budget anders: Crew, Equipment, Verpflegung, Anreise und manchmal Übernachtungen. Die Postproduktion kommt danach trotzdem noch obendrauf, samt Korrekturschleife. Bei KI fällt der Aufbau vor Ort weg. Schnitt, Sound und Grading bleiben." }
        ]
      },
      {
        h: "Was KI-Projekte teurer macht, als Kunden erwarten",
        blocks: [
          { p: "Zwei Dinge treiben den Preis immer wieder nach oben." },
          { ol: [
            "Korrekturrunden. Eine Änderung ist nie nur ein neuer Shot. Sie zieht sich durch Schnitt, Sound und Grading. Wer in fünf Runden jeweils nur eine Kleinigkeit ändert, bezahlt am Ende einen anderen Film als den bestellten.",
            "Die Zahl der Deliverables. Ein Hero-Film ist ein Projekt. Ein Hero-Film plus sechs Cutdowns in verschiedenen Formaten ist ein anderes. Jedes Format will geschnitten, vertont und geprüft werden."
          ] },
          { p: "So hältst Du die Kosten im Griff: Skript und Look vorab freigeben, Feedback pro Runde bündeln und vorher festlegen, welche Formate Du wirklich brauchst." }
        ]
      },
      {
        h: "So liest Du ein Angebot",
        blocks: [
          { p: "Vier Fragen, die jedes Angebot für einen KI-Werbefilm beantworten sollte:" },
          { ul: [
            "Wie viele Videos und Formate sind enthalten?",
            "Wie viele Korrekturschleifen sind inklusive?",
            "Ist ein Dreh vor Ort dabei, und was kostet er?",
            "Welche Nutzungsrechte bekommst Du? Bei uns sind volle Nutzungsrechte für Paid, Organic, Sales und interne Nutzung inklusive."
          ] },
          { p: "Ein Angebot, das diese Punkte offen lässt, wird später teurer. Das gilt für jeden Anbieter." }
        ]
      }
    ],
    faq: [
      ["Was kostet ein KI-Werbefilm?", "Im Einstieg zwischen 2.000 und 5.000 €. Ein Content-Paket mit rund 15 kurzen Videos startet bei ca. 2.500 €, hybride Produktionen mit Dreh vor Ort liegen eher zwischen 5.000 und 10.000 €. Ein konkretes Festpreisangebot gibt es nach einem 30-minütigen Call."],
      ["Ist ein KI-Werbefilm günstiger als ein Realdreh?", "In der Regel ja, weil Set, Crew und Reisen wegfallen. Schnitt, Sounddesign und Grading kosten aber bei KI genauso Zeit wie bei jedem anderen Film."],
      ["Was ist im Content-Paket für rund 2.500 € enthalten?", "Etwa 15 Videos mit je 15 bis 30 Sekunden als UGC-Ads oder Ad-Creatives und eine Korrekturschleife. Ein Dreh vor Ort ist nicht enthalten."],
      ["Was kostet es, wenn ich einen Dreh vor Ort brauche?", "Dann wird es deutlich teurer: mehr Crew, Equipment, Verpflegung, Anreise und gegebenenfalls Übernachtungen, dazu Postproduktion und Korrekturschleife. Hybride Produktionen kombinieren KI und Realdreh sinnvoll."],
      ["Wie vermeide ich, dass es teurer wird als geplant?", "Skript und Look vorab freigeben, Feedback pro Runde bündeln und vorher festlegen, welche Formate Du brauchst."]
    ],
    related: ["ki-werbespot-erstellen-kfc-spec-ad", "warum-ki-werbung-billig-aussieht"],
    cta: { h: "Du willst einen konkreten Preis für Dein Projekt?", sub: "30 Minuten Call. Danach bekommst Du ein Festpreisangebot." }
  },

  {
    slug: "ki-werbespot-erstellen-kfc-spec-ad",
    title: "KI-Werbespot erstellen: So entstand unser KFC Spec Ad in 3 Tagen",
    metaTitle: "KI Werbespot erstellen: Making-of KFC Spec Ad | Flow West Films",
    metaDesc: "KI-Werbespot erstellen, Schritt für Schritt: Wie unser KFC Spec Ad in 2 bis 3 Tagen entstand. Skript, Look, Generierung, Schnitt, Sound und Learnings.",
    eyebrow: "Making-of",
    date: "2026-10-12",
    readMin: 4,
    answer: "Unser KFC Spec Ad ist in zwei bis drei Tagen entstanden: Skript, Look-Entwicklung, Generierung mit Seedance 2.5, Schnitt und Sounddesign in Premiere. Der Aufwand steckt nicht im Tool, sondern in der Vorarbeit. Genau dort würde ich beim nächsten Mal noch mehr Zeit investieren. Wichtig: Das ist ein Spec Ad, also ein freies Projekt ohne Auftrag und ohne Verbindung zur Marke.",
    intro: ["Ein Spec Ad ist ein Spot, den wir ohne Auftrag produzieren. Er zeigt, was KI-Produktion mit Filmhandwerk leisten kann.", "Hier siehst Du, wie das KFC Spec Ad Schritt für Schritt entstanden ist, mit allen Tools und mit dem, was ich anders machen würde."],
    sections: [
      {
        h: "Die Idee: ein Western-Duell gegen das schnellste Fried Chicken der Welt",
        blocks: [
          { p: "Ein Revolverheld läuft in eine staubige Westernstadt, es kommt zum Quick Draw. Die Idee war ein Duell wie aus dem Western und zugleich ein Augenzwinkern auf das ganze Genre. Der Moment, auf den alles zuläuft: der Schuss. Danach folgt eine Zeitlupe, in der Flüssigkeit durch die Luft fliegt. Es ist die Sauce, die der Spot bewirbt." }
        ]
      },
      {
        h: "Schritt 1: Skript und Konzept",
        blocks: [
          { p: "Jeder KI-Film beginnt wie ein echter: mit einer klaren Idee und einem Skript. Das war die Phase, in der ich beim KFC Spec Ad zu wenig Zeit investiert habe. Würde ich den Spot heute noch einmal machen, ginge ein größerer Teil der drei Tage ins Konzept, bevor irgendein Shot generiert wird." }
        ]
      },
      {
        h: "Schritt 2: Look, Charaktere und Locations festlegen",
        blocks: [
          { p: "Bevor ein Shot entsteht, bauen wir die Welt. Mit Nano Banana Pro erstellen wir Character Sheets, Location-Templates und Referenzblätter. Sie sorgen dafür, dass Figuren und Orte über alle Shots hinweg gleich aussehen. Fehlt dieser Schritt, entsteht ein typischer Schwachpunkt vieler KI-Spots: Figur und Location wechseln von Shot zu Shot." }
        ]
      },
      {
        h: "Schritt 3: Shots generieren",
        blocks: [
          { p: "Die Videos haben wir mit Seedance 2.5 generiert. Einstellung für Einstellung, nach Shotlist. Wer hier ohne Plan startet, generiert viel und nutzt wenig." }
        ]
      },
      {
        h: "Schritt 4: Schnitt und Sound",
        blocks: [
          { p: "Geschnitten und vertont haben wir in Premiere. Für Musik und Sound-Effekte nutzen wir Bibliotheken wie Suno und Epidemic Sound. Der Sound entscheidet, ob aus aneinandergereihten Clips ein Spot wird." }
        ]
      },
      {
        h: "Warum der Sound über den Spot entscheidet",
        blocks: [
          { p: "Generierte Clips klingen nach nichts. Erst Musik, Atmosphäre und Sound-Effekte geben ihnen Gewicht. Deshalb ist Sound bei jedem Spot ein eigener Arbeitsschritt und kein Anhängsel." }
        ]
      },
      {
        h: "Der Shot, auf den ich stolz bin",
        blocks: [
          { p: "Das Duell. Die Einstellungen werden immer enger: von der Totalen über die Naheinstellung bis zu extremen Close-ups. Nur die Augen. Nur die Fingerspitzen am Holster, an der Waffe. Dann der Schuss." },
          { p: "Danach kippt der Spot in Bullet Time: Flüssigkeit fliegt wie mit hoher Bildrate gefilmt durch die Luft, und es ist die KFC-Sauce. Der Aufbau erzeugt Spannung, die Auflösung ist ein Witz über das Western-Genre selbst. Beides zusammen macht den Moment aus." }
        ]
      },
      {
        h: "Was ich beim nächsten Mal anders mache",
        blocks: [
          { p: "Mehr Zeit für Skript und Konzept, bevor ich generiere. Ein klares Skript macht jeden Shot gezielter. Und ein gezielter Shot spart Versuche." }
        ]
      },
      {
        h: "Der Ablauf auf einen Blick",
        blocks: [
          { ol: [
            "Idee und Skript",
            "Look, Charaktere und Locations als Referenzen festlegen",
            "Shots generieren, nach Shotlist",
            "Schnitt, Sounddesign und Musik",
            "Export in den Formaten, die Du brauchst"
          ] }
        ]
      },
      {
        h: "Was Du für Dein Projekt mitnimmst",
        blocks: [
          { ul: [
            "Plane Zeit fürs Skript ein, bevor Du generierst.",
            "Lege Figuren und Locations mit Referenzen fest.",
            "Behandle Schnitt und Sound als eigene Schritte, nicht als Nachgedanken."
          ] }
        ]
      }
    ],
    faq: [
      ["Wie lange dauert es, einen KI-Werbespot zu erstellen?", "Unser KFC Spec Ad ist in zwei bis drei Tagen von der Idee bis zum fertigen Export entstanden. Die Dauer hängt von Länge, Anzahl der Shots und Korrekturschleifen ab."],
      ["Welche Tools braucht man für einen KI-Werbespot?", "Für das KFC Spec Ad: Seedance 2.5 für die Videogenerierung, Nano Banana Pro für Character Sheets, Location-Templates und Referenzblätter, Premiere für Schnitt und Sounddesign sowie Bibliotheken wie Suno und Epidemic Sound für Musik und Sound-Effekte."],
      ["Ist das KFC-Video ein echter Auftrag von KFC?", "Nein. Es ist ein Spec Ad, ein freies Projekt von Flow West Films ohne Auftrag und ohne Verbindung zur Marke."],
      ["Was kostet ein KI-Werbespot?", "Im Einstieg zwischen 2.000 und 5.000 €. Was in den Preisklassen steckt, steht im Beitrag zu den KI-Werbefilm-Kosten."]
    ],
    related: ["was-kostet-ein-ki-werbefilm", "warum-ki-werbung-billig-aussieht"],
    cta: { h: "Du willst so einen Spot für Deine Marke?", sub: "30 Minuten Call. Wir klären Idee, Umfang und Preis." }
  },

  {
    slug: "warum-ki-werbung-billig-aussieht",
    title: "Warum die meiste KI-Werbung billig aussieht und was Du dagegen tust",
    metaTitle: "KI Werbung Qualität: Warum sie billig aussieht | Flow West Films",
    metaDesc: "KI Werbung Qualität: Die fünf Fehler, an denen Du schlechte KI-Spots sofort erkennst, und was in der ersten Stunde passiert, damit sie wie Film aussehen.",
    eyebrow: "Qualität",
    date: "2026-10-12",
    readMin: 4,
    answer: "KI-Werbung sieht billig aus, weil die Vorarbeit fehlt, nicht weil die KI es nicht kann. Die fünf Fehler, die ich ständig sehe: schwacher oder fehlender Sound, Figuren und Produkte, die von Shot zu Shot anders aussehen, wechselnde Locations, schwache Performance und ein KI-Look ohne Korn und Partikel. Das Gegenmittel steht in der ersten Stunde: Skript, Look und Shotlist festlegen wie bei einem echten Dreh.",
    intro: ["Billig ist ein Eindruck. Er entsteht in den ersten Sekunden und hat selten mit dem Tool zu tun. Er entsteht aus Dingen, die sich vorher lösen lassen."],
    sections: [
      {
        h: "Die fünf Fehler, die ich täglich sehe",
        blocks: [
          { ol: [
            "Schwacher oder fehlender Sound. Ohne Sounddesign ist jeder Clip nur ein bewegtes Bild. Sound macht aus Bildern einen Film.",
            "Inkonsistente Figuren und Produkte. Gesicht, Kleidung, Auto, Verpackung: alles verändert sich leicht von Shot zu Shot. Das Auge merkt es sofort, auch wenn der Kopf es nicht benennen kann.",
            "Inkonsistente Locations. Der Raum in Shot drei ist ein anderer als in Shot zwei. So baut kein Zuschauer eine Welt im Kopf zusammen.",
            "Schwache Performance. Leere Gesichter, Gesten ohne Absicht. Auch eine generierte Szene braucht Schauspiel.",
            "Der KI-Look. Zu glatt, zu sauber, seltsame Grafiken. Es sieht aus wie KI und nicht wie Footage mit Korn und Partikeln, wie man es von einer echten Kamera kennt."
          ] }
        ]
      },
      {
        h: "Was ich in der ersten Stunde tue und die meisten überspringen",
        blocks: [
          { ol: [
            "Ein echtes Skript oder Beat Sheet schreiben. Story und Tempo stehen, bevor ich ein Tool öffne.",
            "Look und Referenzen festlegen. Farbe, Licht, Stimmung, dazu Charaktere und Locations als Referenzen. So wird nicht jeder Shot neu erfunden.",
            "Die Shotlist bauen wie bei einem echten Dreh. Einstellungsgrößen, Kamerabewegung, Reihenfolge. Jeder Shot hat einen Job."
          ] },
          { p: "Das ist Vorproduktion. Sie ist der Unterschied zwischen einem Spot und einem Haufen Clips." }
        ]
      },
      {
        h: "Ein Frame, der zeigt, warum Präzision wirkt",
        blocks: [
          { p: "Im Wilson Spec Ad schlägt ein Spieler den Ball zurück über das Netz. Die Kamera folgt dem Ball über das Netz und umkreist ihn. Wir sehen Haare und Texturen, alles in Zeitlupe." },
          { p: "Der Shot funktioniert, weil wir der Kamera genau gesagt haben, was sie tun soll und wie lange. Diese Genauigkeit sorgt für einen realistischen Look. Und sie verkauft den letzten Moment des Spots, bevor er zum Schluss kommt. Auch das Wilson-Video ist ein Spec Ad, also ein freies Projekt ohne Auftrag der Marke." }
        ]
      },
      {
        h: "Warum Vorproduktion bei KI genauso zählt wie beim Dreh",
        blocks: [
          { p: "Bei einem echten Dreh zwingt Dich der Tag am Set zur Planung. Crew, Licht und Location kosten Geld. Bei KI fehlt dieser Zwang, denn Generieren geht schnell. Genau das verführt dazu, ohne Plan loszulegen. Das Ergebnis sind viele Clips und kein Film." }
        ]
      },
      {
        h: "Welcher Schritt welchen Fehler löst",
        blocks: [
          { ul: [
            "Das Skript sichert Tempo und Performance. Jede Szene hat einen Zweck.",
            "Referenzen halten Figuren, Produkte und Locations über alle Shots stabil.",
            "Die Shotlist macht die Kamera präzise, wie im Wilson-Beispiel oben.",
            "Sounddesign und Grading sind eigene Schritte. Korn und Partikel gehören ins Finish, damit nichts nach glatter KI-Grafik aussieht."
          ] }
        ]
      },
      {
        h: "Woran Du gute KI-Werbung erkennst",
        blocks: [
          { p: "Wenn Du KI-Werbung einkaufst, stell Deinem Dienstleister drei Fragen:" },
          { ul: [
            "Gibt es ein Skript, das ich vorab freigeben kann?",
            "Sehe ich Referenzen für Look, Figuren und Locations, bevor generiert wird?",
            "Gibt es eine Shotlist und ein echtes Sounddesign?"
          ] },
          { p: "Wer darauf keine Antwort hat, liefert am Ende genau das, was Du in der Timeline täglich siehst." }
        ]
      }
    ],
    faq: [
      ["Warum sieht KI-Werbung oft billig aus?", "Meist fehlt die Vorarbeit: kein Skript, keine festen Referenzen für Look, Figuren und Locations, keine Shotlist und kein echtes Sounddesign. Dazu kommen der glatte KI-Look ohne Korn und Partikel und schwache Performance."],
      ["Woran erkenne ich gute KI-Werbung?", "An konsistenten Figuren, Produkten und Locations, an starkem Sounddesign, glaubwürdiger Performance und einem Look, der nach Kamera-Footage mit Korn und Partikeln aussieht statt nach glatter KI-Grafik."],
      ["Kann KI-Werbung wie ein echter Film aussehen?", "Ja, wenn Vorarbeit und Handwerk stimmen: Skript, Look-Referenzen, Shotlist, Sounddesign und Grading. Unsere Spec Ads für Wilson und KFC sind Beispiele dafür."],
      ["Was kostet gute KI-Werbung?", "Im Einstieg zwischen 2.000 und 5.000 €. Wie sich der Preis zusammensetzt, steht im Beitrag zu den KI-Werbefilm-Kosten."]
    ],
    related: ["ki-werbespot-erstellen-kfc-spec-ad", "was-kostet-ein-ki-werbefilm"],
    cta: { h: "Du willst KI-Werbung, die nach Film aussieht?", sub: "30 Minuten Call. Wir schauen auf Deine Marke und Dein Ziel." }
  },

  {
    slug: "done-for-you-marketing-agentur-vs-einmalprojekt",
    title: "Done for you oder Einmalprojekt? Warum ein Imagefilm allein Dein Marketing nicht löst",
    metaTitle: "Done for you Marketing Agentur vs. Einmalprojekt | Flow West Films",
    metaDesc: "Done for you Marketing Agentur oder Einmalprojekt? Warum ein Imagefilm allein nicht reicht und was ein Service für rund 4.000 € im Monat übernimmt.",
    eyebrow: "Done for you",
    date: "2026-10-20",
    readMin: 4,
    answer: "Bei einem Einmalprojekt wie einem Imagefilm bekommst Du genau ein Stück: das Video. Social Media, Ads, Schnitt und Auswertung bleiben bei Dir. Bei einem Done-for-you-Service übernimmt die Agentur das laufende Marketing: Content, Ads und Performance, dazu Check-ins und Reports. Bei uns liegt das in der Größenordnung eines Vollzeitgehalts, rund 4.000 € im Monat. Dafür bleibt Deine Zeit bei dem, was Du gut kannst und gern tust.",
    intro: ["Ein Imagefilm sieht gut aus. Er klärt aber nicht, wer danach Dein Marketing macht. Genau hier liegt der Unterschied zwischen einem Einmalprojekt und einem Done-for-you-Service."],
    sections: [
      {
        h: "Was ein Einmalprojekt liefert und was es Dir überlässt",
        blocks: [
          { p: "Nimm einen Imagefilm. Er wird produziert, Dein Unternehmen sieht online besser aus, das Projekt ist abgeschlossen. Danach geht die Arbeit erst richtig los." },
          { p: "Auf Social Media musst Du aktiv bleiben: Content filmen, schneiden und posten. Bei den Ads ist es dasselbe. Jemand muss sie erstellen, jemand muss sie schneiden, und jemand muss das Performance Marketing steuern: schwache Ads abschalten, gute optimieren." },
          { p: "Ein Einmalprojekt erledigt ein Stück. Es ist kein fertiger Service. Der Rest bleibt liegen, wenn ihn niemand übernimmt." }
        ]
      },
      {
        h: "Was bei Done for you passiert",
        blocks: [
          { ul: [
            "Content: Filmen, Schneiden und Posten übernimmt die Agentur.",
            "Ads: Die Agentur erstellt und schneidet die Ads.",
            "Performance: Sie steuert die Kampagnen, schaltet schwache Ads ab und optimiert die guten.",
            "Reporting: Du bekommst Check-ins und Reports und siehst, was passiert."
          ] },
          { p: "Du behältst den Überblick, ohne die Arbeit selbst zu machen." }
        ]
      },
      {
        h: "Warum die meisten Unternehmer es sonst nie tun",
        blocks: [
          { p: "Wenn Du Marketing nicht magst, wirst Du es nicht regelmäßig machen. Das ist keine Schwäche, sondern ein ehrlicher Blick auf Deine Zeit. Content, Ads und Auswertung brauchen Kontinuität. Ohne sie bleibt der Imagefilm ein schönes Video auf der Website." },
          { p: "Es bleiben zwei ehrliche Wege: Du machst es selbst, oder Du gibst es ab." }
        ]
      },
      {
        h: "Was Done for you kostet",
        blocks: [
          { p: "Bei Flow West Films liegt ein Done-for-you-Service in der Größenordnung eines Vollzeitgehalts, rund 4.000 € im Monat. Du bezahlst damit nicht ein einzelnes Video, sondern Marketing, das dauerhaft läuft." },
          { p: "Das ist mehr als ein Einmalprojekt. Es ist aber auch ein anderes Produkt: Ein Einmalprojekt kauft Dir ein Ergebnis. Done for you kauft Dir Zeit und Kontinuität." }
        ]
      },
      {
        h: "Wann ein Einmalprojekt reicht",
        blocks: [
          { p: "Ein Einmalprojekt ist die richtige Wahl, wenn Du intern jemanden hast, der Content, Ads und Auswertung übernimmt. Dann liefert das Projekt das Material, und Dein Team macht daraus laufendes Marketing." }
        ]
      },
      {
        h: "Der Selbsttest: Brauchst Du Done for you?",
        blocks: [
          { p: "Beantworte fünf Fragen:" },
          { ol: [
            "Wer filmt regelmäßig neuen Content?",
            "Wer schneidet ihn?",
            "Wer postet und bleibt auf Social Media aktiv?",
            "Wer erstellt und schneidet Deine Ads?",
            "Wer wertet die Ads aus, schaltet schwache ab und optimiert die guten?"
          ] },
          { p: "Wenn Du bei mehr als einer Frage „niemand“ sagst, bleibt Dein Marketing liegen. Dann ist Done for you die ehrlichere Lösung." }
        ]
      }
    ],
    faq: [
      ["Was bedeutet Done for you im Marketing?", "Die Agentur übernimmt das laufende Marketing komplett: Content filmen, schneiden und posten, Ads erstellen und steuern, Ergebnisse auswerten. Du bekommst Check-ins und Reports und gibst Feedback, statt selbst zu arbeiten."],
      ["Was ist der Unterschied zwischen Done for you und einem Einmalprojekt?", "Ein Einmalprojekt wie ein Imagefilm liefert ein einzelnes Ergebnis. Social Media, Ads und Performance bleiben bei Dir. Done for you übernimmt diese laufende Arbeit."],
      ["Was kostet Done-for-you-Marketing bei Flow West Films?", "In der Größenordnung eines Vollzeitgehalts, rund 4.000 € im Monat. Ein konkretes Angebot gibt es nach einem 30-minütigen Call."],
      ["Brauche ich nach einem Imagefilm noch laufendes Marketing?", "Ja, wenn Du Reichweite und Anfragen willst. Der Film ist das Material. Social Media, Ads und deren Optimierung muss danach jemand betreiben."],
      ["Wann reicht ein Einmalprojekt?", "Wenn Du intern jemanden hast, der Content, Ads und Auswertung übernimmt."]
    ],
    related: ["was-kostet-ein-ki-werbefilm", "warum-ki-werbung-billig-aussieht"],
    cta: { h: "Du willst Dein Marketing abgeben?", sub: "30 Minuten Call. Wir klären, was Du abgeben willst und was es kostet.", link: { to: "full-service", label: "Mehr zum Full Service von Flow West Films →" } }
  },

  {
    slug: "unternehmensfilm-stuttgart",
    title: "Unternehmensfilm Stuttgart: Kosten, Ablauf und was danach kommt",
    metaTitle: "Unternehmensfilm Stuttgart: Kosten & Ablauf | Flow West Films",
    metaDesc: "Unternehmensfilm Stuttgart: Was er kostet, wie der Ablauf aussieht und warum Du mit einem Film allein nur die Hälfte bekommst. Ehrlich erklärt.",
    eyebrow: "Unternehmensfilm",
    date: "2026-10-27",
    readMin: 4,
    answer: "Ein Unternehmensfilm in Stuttgart kostet im Einstieg zwischen 2.000 und 5.000 €. Das gilt auch für Produktvideo und Produktfilm. Der Preis hängt an der Zahl der Videos, Korrekturrunden und der Frage, ob vor Ort gedreht wird. Mit Dreh, Testimonial und weiteren Ads sind es eher 10.000 €. Entscheidend ist aber nicht der Preis des Films, sondern ob aus ihm ein System aus Kurzvideos wird, das Anfragen bringt.",
    intro: ["Ein Unternehmensfilm liegt auf Deiner Website, und danach passiert wenig. Das ist der häufigste Verlauf, wenn nur der Film bestellt wird.", "Als KI-Filmagentur zeigen wir Dir hier alles zum Thema Unternehmensfilm Stuttgart: was er kostet, wie die Videoproduktion abläuft und was Du zusätzlich brauchst, damit er sich auszahlt."],
    sections: [
      {
        h: "Was ein Unternehmensfilm heute leisten muss",
        blocks: [
          { p: "Früher war ein Unternehmensfilm ein Aushängeschild: schön, ruhig, einmal gedreht. Heute entscheidet jemand in Sekunden, ob er weiterschaut. Der Film muss deshalb zwei Dinge können. Er schafft Vertrauen auf Deiner Website. Und er liefert das Material für kurze Videos, die in Anzeigen und auf Social Media laufen." },
          { p: "Wer nur den langen Film bestellt, hat ein Video. Wer ihn von Anfang an für beide Aufgaben plant, hat eine Grundlage für Marketing." }
        ]
      },
      {
        h: "Unternehmensfilm Stuttgart: Was er kostet",
        blocks: [
          { p: "Im Einstieg liegst Du zwischen 2.000 und 5.000 €. Dafür bekommst Du entweder einen Imagefilm mit Cutdowns oder ein Content-Paket für rund 2.500 €, mit etwa 15 Kurzvideos von je 15 bis 30 Sekunden und einer Korrekturschleife." },
          { p: "Ein Dreh vor Ort ist in dieser Klasse nicht enthalten. Sobald Menschen vor die Kamera müssen, braucht es mehr Crew, Equipment, Verpflegung und je nach Ort auch Anreise. Ein Beispiel: Imagefilm für rund 5.000 €, dazu ein Testimonial und teilweise real gedrehte Ads am selben Drehtag. Zusammen sind das etwa 10.000 €." },
          { p: ["Die Details zu Paketen und Preistreibern findest Du im Beitrag „", { to: "blog/was-kostet-ein-ki-werbefilm", text: "Was kostet ein KI-Werbefilm?" }, "“. Beispiele und unser Vorgehen siehst Du auf der Seite ", { to: "imagefilm-stuttgart", text: "Unternehmensfilm Stuttgart" }, "."] }
        ]
      },
      {
        h: "Wie die Produktion abläuft",
        blocks: [
          { p: "Wir sitzen in Stuttgart. Ein Dreh bei Dir vor Ort bedeutet für uns kurze Wege. Der Ablauf ist bei jedem Projekt ähnlich:" },
          { ol: [
            "Skript und Look. Wir klären, was der Film sagen soll, und legen Look und Referenzen fest, bevor irgendetwas gedreht oder generiert wird.",
            "Produktion. Je nach Projekt KI-gestützt, vor Ort gedreht oder beides kombiniert.",
            "Schnitt, Sound und Grading. Hier entsteht der Look, der den Film nach Film aussehen lässt. Es ist auch der größte Zeitblock.",
            "Korrekturrunde. Du bündelst Dein Feedback, wir setzen es um.",
            "Cutdowns und Formate. Aus dem Film entstehen kurze Versionen für Anzeigen und Social Media."
          ] },
          { p: "Wer Skript und Look früh freigibt, spart die meisten Korrekturen." }
        ]
      },
      {
        h: "Produktvideo, Produktfilm und Reels aus Stuttgart",
        blocks: [
          { p: "Neben dem Unternehmensfilm produzieren wir Produktvideos und Produktfilme sowie vertikale Kurzvideos für Reels und Anzeigen. Es ist dieselbe Videoproduktion in Stuttgart, nur kürzer und für den Feed gebaut." },
          { p: "Der Unterschied liegt im Einsatz. Der Unternehmensfilm erzählt, wer Du bist. Ein Produktvideo zeigt ein Produkt in wenigen Sekunden, und ein Kurzvideo für Reels oder Ads hat ein Ziel: einen Klick oder eine Anfrage." }
        ]
      },
      {
        h: "Das Problem mit dem Einzelfilm",
        blocks: [
          { p: "Nehmen wir ein Beispiel aus dem Autohaus. Viele Autohäuser filmen ihre Fahrzeuge mit dem Handy: einmal ums Auto laufen, hochladen, fertig. Das Video zeigt das Auto, aber nichts, was Deine Marke von der des Händlers nebenan unterscheidet. Es gibt keine Geschichte und keinen Grund, bei Dir statt dort zu kaufen." },
          { p: "Ein guter Unternehmensfilm löst das Problem nur zur Hälfte. Er gibt Dir Vertrauen und eine Linie. Aber Autohäuser, Handwerksbetriebe oder Dienstleister brauchen danach laufend neue Videos, damit Anzeigen und Social Media nicht stillstehen." }
        ]
      },
      {
        h: "Besser: Film plus Content-System",
        blocks: [
          { p: "Statt einen einzelnen Film zu bestellen, planst Du ein kleines System:" },
          { ul: [
            "Ein Hauptfilm, der Deine Marke erzählt und auf der Website Vertrauen aufbaut.",
            "Kurze Ad-Creatives, die daraus entstehen und laufend neu bestückt werden.",
            "Meta Ads auf Facebook und Instagram, die diese Videos vor die richtigen Leute bringen."
          ] },
          { p: "Wenn Du eine Meta Ads Agentur in Stuttgart suchst, achte darauf, dass dieselbe Agentur die Videos produziert. Die Videos entscheiden mit, ob eine Anzeige funktioniert. Wer Creative und Ads trennt, verliert Zeit bei jeder Abstimmung." },
          { p: ["Wenn Du das nicht selbst betreiben willst, geht das auch als Done-for-you-Service. Den Unterschied zum Einmalprojekt erkläre ich im Beitrag „", { to: "blog/done-for-you-marketing-agentur-vs-einmalprojekt", text: "Done for you oder Einmalprojekt?" }, "“."] }
        ]
      }
    ],
    faq: [
      ["Was kostet ein Unternehmensfilm in Stuttgart?", "Im Einstieg zwischen 2.000 und 5.000 €. Mit Dreh vor Ort, Testimonial und zusätzlichen Ads sind es eher 10.000 €. Ein konkretes Festpreisangebot gibt es nach einem 30-minütigen Call."],
      ["Wie läuft die Produktion eines Unternehmensfilms ab?", "Skript und Look, Produktion, Schnitt mit Sound und Grading, eine Korrekturrunde und danach Cutdowns für Anzeigen und Social Media."],
      ["Ist ein Dreh vor Ort nötig?", "Nicht immer. Imagefilme und Content-Pakete lassen sich KI-gestützt produzieren. Für Interviews und Testimonials wird vor Ort gedreht. Beides lässt sich kombinieren."],
      ["Was macht eine KI-Filmagentur?", "Eine KI-Filmagentur produziert Filme und Werbespots mit KI-Werkzeugen, die von Filmemachern inszeniert werden. Bei uns heißt das: Skript, Look, Schnitt, Sound und Grading wie bei jeder Filmproduktion, nur ohne den Aufbau am Set. Bei Bedarf kombinieren wir KI mit einem Dreh vor Ort."],
      ["Produziert ihr auch Produktvideos und Produktfilme in Stuttgart?", "Ja. Produktvideos und Kurzvideos für Reels und Anzeigen sind Teil unserer Videoproduktion in Stuttgart. Sie lassen sich als Content-Paket mit rund 15 Videos bestellen."],
      ["Schaltet ihr auch Meta Ads?", "Ja. Wir erstellen die Ad-Creatives und können die Anzeigen auf Facebook und Instagram auch betreuen, auswerten und optimieren, im Rahmen unseres Done-for-you-Services."],
      ["Reicht ein Unternehmensfilm für mein Marketing?", "Allein meist nicht. Der Film schafft Vertrauen. Für Reichweite und Anfragen brauchst Du zusätzlich laufend neue Kurzvideos und Anzeigen."],
      ["Wie viele Korrekturrunden sind enthalten?", "Im Content-Paket eine. Wer Skript und Look vorab freigibt und sein Feedback bündelt, braucht meist weniger."]
    ],
    related: ["was-kostet-ein-ki-werbefilm", "done-for-you-marketing-agentur-vs-einmalprojekt"],
    cta: { h: "Du planst einen Unternehmensfilm in Stuttgart?", sub: "30 Minuten Call. Wir klären Ziel, Umfang und Preis.", link: { to: "imagefilm-stuttgart", label: "Mehr zu Imagefilm und Unternehmensfilm in Stuttgart →" } }
  },

  {
    slug: "meta-ads-creatives-psychologie",
    title: "Meta Ads Creatives: Die Psychologie hinter Anzeigen, die verkaufen",
    metaTitle: "Meta Ads Creatives: Was wirklich verkauft | Flow West Films",
    metaDesc: "Warum Deine Meta Ads nicht verkaufen: fünf Prinzipien aus der Werbepsychologie für Ad Creatives, mit Checkliste und einem Beispiel von ROAS 2 auf 14.",
    eyebrow: "Ad Creatives",
    date: "2026-11-13",
    readMin: 4,
    answer: "Meta Ads verkaufen, wenn jemand in wenigen Sekunden versteht, was Du anbietest, was er davon hat und was er tun soll. Die meisten Anzeigen scheitern nicht am Budget, sondern am Creative: Es ist austauschbar, zu voll oder erzählt von Dir statt vom Kunden. Fünf Prinzipien aus der Werbepsychologie machen den Unterschied.",
    intro: ["Zwei Bücher erklären gut, warum die meisten Anzeigen nicht verkaufen: „Building a StoryBrand“ von Donald Miller und „Positioning“ von Al Ries und Jack Trout. Beide sagen im Kern dasselbe. Der Kopf Deines Kunden ist voll. Wer dort ankommen will, muss einfacher sein als alle anderen.", "Hier siehst Du, was das für Deine Ad Creatives auf Facebook und Instagram heißt, egal ob Du sie selbst baust oder mit einer Meta Ads Agentur in Stuttgart arbeitest. Am Ende steht eine Checkliste für den Livegang."],
    sections: [
      {
        h: "1. Wer verwirrt, verliert",
        blocks: [
          { p: "Im Feed bekommt Deine Anzeige einen Wimpernschlag Aufmerksamkeit. Wer sie in dieser Zeit nicht versteht, scrollt weiter. Miller nennt das den Grunzen-Test: Könnte ein Höhlenmensch nach ein paar Sekunden drei Fragen beantworten?" },
          { ul: [
            "Was bietest Du an?",
            "Was habe ich davon?",
            "Was soll ich jetzt tun?"
          ] },
          { p: "Zeig Deine Anzeige einem Fremden und nimm sie nach fünf Sekunden weg. Kann er die drei Fragen beantworten? Wenn nicht, liegt das Problem im Creative, nicht im Targeting." }
        ]
      },
      {
        h: "2. Mach den Kunden zum Helden, nicht Dich",
        blocks: [
          { p: "Viele Anzeigen erzählen von der Firma: Gründungsjahr, Auszeichnungen, Teamfoto. Damit konkurrierst Du mit dem Kunden um die Hauptrolle. Er sucht aber keinen zweiten Helden. Er sucht jemanden, der ihm hilft." },
          { p: "Ein Beispiel für ein Autohaus. Statt „Seit 1985 Ihr starker Partner“ zeigt die Anzeige das Problem und den nächsten Schritt: „Dein nächstes Auto ohne Verkaufsdruck: Probefahrt in zwei Klicks buchen.“ Die zweite Version handelt vom Käufer." }
        ]
      },
      {
        h: "3. Eine Anzeige, eine Idee",
        blocks: [
          { p: "Ries und Trout beschreiben, dass der Kopf pro Kategorie nur wenige Marken behält. Wer alles sagt, bleibt nirgends hängen. Das gilt auch für eine einzelne Anzeige: ein Creative, eine Idee, ein Versprechen." },
          { p: ["Deshalb legen wir die Idee fest, bevor etwas produziert wird. Bei unserem ", { to: "blog/ki-werbespot-erstellen-kfc-spec-ad", text: "KFC-Spec-Ad" }, ", einem freien Projekt ohne Markenauftrag, war das die wichtigste Lehre: mehr Zeit in Skript und Konzept, bevor etwas generiert wird."] }
        ]
      },
      {
        h: "4. Verlust wiegt schwerer als Gewinn",
        blocks: [
          { p: "Menschen reagieren stärker darauf, etwas zu verlieren, als darauf, etwas zu gewinnen. Das ist ein gut belegtes Muster aus der Verhaltensökonomie. Für Anzeigen heißt das: Zeig, was es kostet, nichts zu ändern." },
          { p: ["Dosiere es wie Salz. Eine Prise macht das Gericht, zu viel verdirbt es. Ein Satz wie „", { to: "blog/warum-ki-werbung-billig-aussieht", text: "Billige Creatives" }, " sind die teuersten Medien, die Du je kaufst“ reicht. Panik wirkt unglaubwürdig."] }
        ]
      },
      {
        h: "5. Beweis schlägt Versprechen",
        blocks: [
          { p: "Jede Agentur verspricht Ergebnisse. Deshalb zählt, was Du zeigst: ein konkretes Ergebnis, ein echter Kunde, eine Zahl. Bei der Marke Weinzeit stieg der Return on Ad Spend von 2 auf 14. Der wichtigste Hebel waren die Creatives." },
          { p: ["Psychologie liefert Dir die Hypothese. Entscheiden tut der Test: mehrere Varianten laufen lassen, Gewinnern Budget geben, schwache Motive abschalten. Wer nur ein Creative hat, kann nichts testen. Wie viele Videos dafür nötig sind und was ein Content-Paket kostet, steht im Beitrag „", { to: "blog/was-kostet-ein-ki-werbefilm", text: "Was kostet ein KI-Werbefilm?" }, "“."] },
          { p: ["Wenn Du das Testen nicht selbst betreiben willst, geht das auch als Done-for-you-Service. Den Unterschied zum Einmalprojekt erkläre ich im Beitrag „", { to: "blog/done-for-you-marketing-agentur-vs-einmalprojekt", text: "Done for you oder Einmalprojekt?" }, "“. Und wenn Du zusätzlich einen Hauptfilm für Deine Website planst, findest Du Kosten und Ablauf im Beitrag „", { to: "blog/unternehmensfilm-stuttgart", text: "Unternehmensfilm Stuttgart: Kosten, Ablauf und was danach kommt" }, "“."] }
        ]
      },
      {
        h: "Die Checkliste vor dem Livegang",
        blocks: [
          { p: "Prüfe jede Anzeige gegen diese fünf Fragen:" },
          { ol: [
            "Versteht ein Fremder nach fünf Sekunden, was Du anbietest, was er davon hat und was er tun soll?",
            "Handelt die Anzeige vom Kunden und seinem Problem, nicht von Deiner Firma?",
            "Steht genau eine Idee im Mittelpunkt?",
            "Zeigt sie, was es kostet, nichts zu tun, in einem Satz und ohne Drama?",
            "Gibt es einen Beweis, den man sehen oder nachrechnen kann?"
          ] },
          { p: "Fällt eine Antwort auf „nein“, produziere nicht weiter. Überarbeite zuerst das Konzept." }
        ]
      }
    ],
    faq: [
      ["Was ist ein Ad Creative?", "Das Video oder Bild einer Anzeige samt Hook, Text und Handlungsaufforderung. Das Creative entscheidet im Feed, ob jemand stehen bleibt."],
      ["Warum verkaufen meine Meta Ads nicht?", "Oft liegt es am Creative: Es ist austauschbar, unklar oder sagt zu viel auf einmal. Prüfe es zuerst gegen die Checkliste, bevor Du Budget oder Targeting änderst."],
      ["Wie viele Creatives brauche ich zum Testen?", "Mehrere Varianten, damit Du Gewinner von schwachen Motiven trennen kannst. Unser Content-Paket startet mit rund 15 Kurzvideos von je 15 bis 30 Sekunden."],
      ["Worauf achte ich bei einer Meta Ads oder Facebook Ads Agentur in Stuttgart?", "Auf Ergebnisse mit Zahlen statt Reichweite und darauf, dass Creative und Anzeigenschaltung zusammen gedacht werden. Die Videos entscheiden mit, ob eine Anzeige funktioniert."],
      ["Kann KI Ad Creatives erstellen?", "Ja. Wir produzieren Ad Creatives KI-gestützt und inszenieren sie wie einen Film. Entscheidend bleibt das Konzept: Eine schwache Idee wird durch KI nicht besser."]
    ],
    related: ["warum-ki-werbung-billig-aussieht", "was-kostet-ein-ki-werbefilm", "done-for-you-marketing-agentur-vs-einmalprojekt", "unternehmensfilm-stuttgart"],
    cta: { h: "Du suchst eine Meta Ads Agentur in Stuttgart?", sub: "30 Minuten Call. Wir klären, was Deine Anzeigen bremst.", link: { to: "social-media-ads", label: "Mehr zu Meta Ads und Ad Creatives von Flow West Films →" } }
  },
  {
    slug: "marketing-aus-sicht-des-kunden",
    title: "Marketing aus Sicht des Kunden: Was Dein Käufer denkt, bevor er bucht",
    metaTitle: "Videoproduktion Stuttgart: Marketing aus Kundensicht | Flow West Films",
    metaDesc: "Marketing aus Kundensicht: 8 Bausteine und eine Checkliste, die zeigen, was Dein Käufer denkt, bevor er eine Videoproduktion in Stuttgart bucht.",
    eyebrow: "Marketing",
    date: "2026-11-23",
    readMin: 7,
    answer: "Marketing wirkt, wenn Du es mit den Augen Deines Kunden planst. Er kauft keinen Film, sondern einen Zustand. Still fragt er sich, ob er Dir trauen kann, was es kostet und was passiert, wenn es schiefgeht. Wer diese Fragen beantwortet, bevor der Kunde sie stellt, gewinnt den Auftrag. Acht Bausteine zeigen, wie.",
    intro: ["Die meisten Websites erzählen von der Firma: Gründungsjahr, Leistungen, Team. Dein Kunde liest etwas anderes. Er prüft, ob hier sein Problem gelöst wird und ob er mit der Entscheidung gut dasteht.", "Dieser Beitrag dreht die Perspektive um. Er stützt sich auf Chris Dos Buch „Pocket Full of Do“, in dem Do Lehren seiner Lehrer sammelt, etwa von Blair Enns und Seth Godin, sowie auf „Building a StoryBrand“ und „Positioning“. Am Ende steht eine Checkliste, mit der Du Dein eigenes Marketing aus Kundensicht prüfst."],
    sections: [
      {
        h: "1. Dein Kunde kauft einen Zustand, kein Produkt",
        blocks: [
          { p: "Seth Godins Beispiel ist der Bohrer. Das Merkmal: eine diamantbesetzte Spitze. Der Vorteil: Sie bohrt durch mehr Materialien. Der Nutzen: Der Kunde bringt sein Heimwerkerprojekt zu Ende und ist stolz darauf. Gekauft wird der Nutzen." },
          { p: "Übertrag das auf Video. Das Merkmal: 15 Kurzvideos mit je 15 bis 30 Sekunden. Der Vorteil: Du kannst mehrere Varianten gegeneinander testen. Der Nutzen: Du weißt, welche Botschaft verkauft, statt es zu raten. Die meisten Seiten hören beim Merkmal auf." },
          { p: "Hinter dem Nutzen steht oft ein emotionaler Wunsch: Ruhe, Stolz, das Gefühl, richtig entschieden zu haben. Do schreibt, dass solche Wünsche häufig mehr wiegen als die rationalen Anforderungen. Wer nur Leistungen aufzählt, spricht an dieser Stelle nicht mit seinem Kunden." }
        ]
      },
      {
        h: "2. Schreib den inneren Monolog Deines Kunden auf",
        blocks: [
          { p: "Do beginnt sein Buch mit einer Lektion aus der Sicht des Kunden: Kenn mich, erkenne, was ich brauche, mach mir das Leben leicht, achte auf mich, belohne mich. Dafür musst Du Deinen Kunden so genau kennen, dass Du ihn in einer Menge erkennst. Seine Markenwahl verrät ihn. Wer einen Audi A8 fährt, mag Luxus, mag es aber nicht, damit anzugeben. Marken sind Selbstporträts." },
          { p: "Schreib auf, was ein Geschäftsführer in Stuttgart denkt, wenn er über ein Video für sein Unternehmen nachdenkt:" },
          { ul: [
            "Was kostet das, und ist das fair?",
            "Kann ich dem Anbieter trauen, oder verspricht er nur?",
            "Was passiert, wenn das Ergebnis nicht gefällt?",
            "Wie viel Zeit kostet mich das selbst?",
            "Wie sieht das aus, wenn mein Team oder mein Partner es sieht?",
            "Was habe ich am Ende in der Hand, das ich nutzen kann?"
          ] },
          { p: "Beantworte jede dieser Fragen auf Deiner Seite, bevor er sie stellen muss. Hilfreich ist es, das Gefühl beim Namen zu nennen: Du bist nicht unentschlossen. Du willst nur keine falsche Entscheidung treffen. Wer sich verstanden fühlt, verteidigt sich weniger." }
        ]
      },
      {
        h: "3. Sei dort, wo er sucht, und gib ihm einen Grund",
        blocks: [
          { p: "Dale Carnegie mochte Erdbeeren mit Sahne. Weil Fische aber Würmer mögen, köderte er den Haken mit Würmern. Frag also nicht, was Du anbieten willst, sondern was der Kunde sucht." },
          { p: "Dazu gehören zwei Schritte. Erstens: Wo sucht er? Bei Google nach „Videoproduktion Stuttgart“ oder „Meta Ads Agentur Stuttgart“, auf Instagram oder bei KI-Assistenten, die er nach Empfehlungen fragt. Zweitens: Was passiert, wenn er auf Deiner Seite landet? Eine Galerie sagt nur, dass Du es kannst. Ein Grund sagt, warum er gerade Dich wählen sollte." },
          { p: "Eine Lehre aus der Werbeproduktion kommt hinzu: Menschen geben ihr Geld nach einer Anzeige kaum noch aus, weil sie eine Anzeige sehen. Sie geben es für eine Kultur aus, zu der sie gehören wollen. Ein Spot, der wie ein Preisschild mit Button aussieht, wird übersprungen. Ein Spot, der wie ein Filmausschnitt wirkt, bleibt hängen." }
        ]
      },
      {
        h: "4. Er sucht einen Spezialisten, keinen Allrounder",
        blocks: [
          { p: "Do sagt es so: Du bestellst keine Pizza an der Sushi-Bar. Wenn ein Problem schwierig wird, sucht der Kunde jemanden, der genau dieses Problem löst. Ries und Trout beschreiben denselben Effekt: Der Kopf behält pro Kategorie nur wenige Namen. Wer alles ein bisschen anbietet, taucht in keiner Liste auf." },
          { p: "Das verlangt ein Opfer. Wenn Du Dich klar positionierst, sprichst Du einige Interessenten nicht mehr an. Dafür verstehen die anderen sofort, dass Du für sie gemeint bist. Frag Dich: Für wen genau bist Du die erste Wahl, und welchen einen Satz soll Dein Kunde über Dich weitersagen können?" }
        ]
      },
      {
        h: "5. Er vergleicht, was er kennt: Setz den Anker",
        blocks: [
          { p: "Ohne Kontext ist nichts teuer oder günstig. Wer keine Zahl nennt, überlässt den Anker dem Wettbewerb, nämlich dem letzten Angebot, das Dein Kunde bekommen hat. Do rät deshalb, die erste Zahl selbst zu nennen." },
          { p: "Darum veröffentlichen wir Spannen. Der Einstieg liegt zwischen 2.000 und 5.000 €. Ein Content-Paket mit rund 15 Kurzvideos startet bei etwa 2.500 €. Hybride Produktionen mit Dreh vor Ort landen eher zwischen 5.000 und 10.000 €. Die Details findest Du im Beitrag „Was kostet ein KI-Werbefilm?“." },
          { p: "Ein zweiter Gedanke aus dem Buch: Bei einem einzigen Preis vergleicht der Kunde Dich mit anderen Anbietern. Bei drei Optionen vergleicht er Dich mit Dir selbst. Und wenn jemand sagt, er habe kein Budget, heißt das selten, dass kein Geld da ist. Meist fließt es in etwas, das ihm wichtiger ist. Frag, was wichtig genug wäre." }
        ]
      },
      {
        h: "6. Wo Du nichts erklärst, erfindet er eine Geschichte",
        blocks: [
          { p: "Do hielt die Finanzen seines Studios geheim. Die Folge: Seine Manager gaben zu viel aus, weil sie die Budgets für willkürlich hielten. Als er die Zahlen offenlegte, änderte sich das Verhalten sofort. Fehlende Information füllen Menschen mit Vermutungen, und die sind selten besser als die Wahrheit." },
          { p: "Für Deine Website heißt das: Eine Zahl ohne Kontext wirkt verdächtig. Nenn immer die Zahl, den Zusammenhang und die Quelle. Ein Beispiel ist unser KFC-Spot. Er ist ein freies Projekt ohne Markenauftrag, und das schreiben wir dazu. So zeigt er Können und Eigeninitiative. Unmarkiert würde er Misstrauen wecken, auch gegenüber den echten Kundenprojekten." }
        ]
      },
      {
        h: "7. Er will diagnostiziert werden, nicht angepitcht",
        blocks: [
          { p: "Do vergleicht gute Beratung mit einem Arztbesuch. Der Patient sagt, warum er kommt. Der Arzt fragt nach, bildet eine Vermutung und lässt sie prüfen. Erst dann folgt die Behandlung. Wer ein Rezept schreibt, bevor er untersucht hat, handelt nicht wie ein Experte." },
          { p: "Fragen führen das Gespräch. Gute Fragen sind: Was treibt die Anfrage gerade an? Was passiert, wenn Ihr nichts ändert? Was kostet Dich das heute, in Geld, Zeit und Nerven? Diese letzte Frage ist tiefer als „Warum hast Du noch nicht angefangen?“, weil sie die Kosten des Nichtstuns sichtbar macht." },
          { p: "Bei uns beginnt ein Gespräch deshalb mit Fragen, nicht mit einem Angebot. Auch unser Ad-Check auf start.flowwestfilms.de folgt dieser Logik: kostenlos, unverbindlich, in etwa 90 Sekunden." }
        ]
      },
      {
        h: "8. Er will nicht überrascht werden",
        blocks: [
          { p: "Do rechnet mit einer einfachen Formel: Zufriedenheit ist die Wirklichkeit geteilt durch die Erwartung. Wer zu viel verspricht, muss beim Liefern scheitern. Versprich weniger, liefere mehr." },
          { p: "Dazu gehört, vorab zu sagen, was der Kunde bekommt. Bei uns sind das ein Festpreis nach dem 30-Minuten-Call, Nutzungsrechte für Paid, Organic, Sales und interne Nutzung und vorher festgelegte Korrekturschleifen. Wer das vor dem Kauf weiß, erlebt nach dem Kauf keine bösen Überraschungen." }
        ]
      },
      {
        h: "Die Checkliste: Dein Marketing durch die Augen Deines Kunden",
        blocks: [
          { p: "Geh Deine Website und Deine Anzeigen mit diesen Fragen durch:" },
          { ol: [
            "Beschreibst Du den Nutzen für den Kunden oder nur Deine Leistung?",
            "Beantwortet die Seite die sechs stillen Fragen, ohne dass er anrufen muss?",
            "Findet er Dich dort, wo er sucht, und bekommt er sofort einen Grund, Dich zu wählen?",
            "Ist klar, für wen Du die erste Wahl bist?",
            "Hast Du eine Preisspanne genannt, bevor es ein anderer tut?",
            "Hat jede Zahl und jedes Beispiel einen Kontext?",
            "Fragst Du, bevor Du anbietest?",
            "Versprichst Du nur, was Dein Prozess jedes Mal liefert?"
          ] },
          { p: "Schon die Antworten auf zwei oder drei dieser Fragen zeigen Dir, wo Dein Kunde heute abspringt." },
          { p: "Marketing aus Kundensicht ist keine Technik, sondern eine Haltung. Du beantwortest die Fragen, die Dein Kunde ohnehin stellt. Je früher Du das tust, desto weniger Reibung gibt es bis zum Anruf." }
        ]
      }
    ],
    faq: [
      ["Was bedeutet Marketing aus Kundensicht?", "Du planst Botschaft, Angebot und Ablauf von der Frage aus, was Dein Kunde denkt, fühlt und braucht, nicht von der Frage, was Du anbieten möchtest. Der Kunde ist die Hauptfigur, Du bist der Berater."],
      ["Wie finde ich heraus, was meine Kunden denken?", "Frag bestehende Kunden, warum sie Dich statt eines anderen Anbieters gewählt haben, und frag Interessenten, die abgesprungen sind, wofür sie sich entschieden haben. Schreib ihre Worte wörtlich auf. Sie sind Dein bestes Rohmaterial für Texte."],
      ["Worauf achte ich bei der Wahl einer Videoproduktion in Stuttgart?", "Auf Ergebnisse statt Showreel, auf eine Preisspanne vorab, auf klare Nutzungsrechte und festgelegte Korrekturschleifen. Außerdem darauf, ob der Anbieter erst fragt und dann anbietet."],
      ["Muss ich Preise auf meiner Website nennen?", "Nicht zwingend. Eine Spanne setzt aber den Anker, bevor es ein anderer tut, und filtert Anfragen heraus, die nicht passen. Auf unseren Seiten nennen wir keine Preise, im Blog zeigen wir Spannen."],
      ["Was ist der Unterschied zwischen Merkmal, Vorteil und Nutzen?", "Das Merkmal ist eine Eigenschaft Deines Angebots. Der Vorteil sagt, was sie ermöglicht. Der Nutzen zeigt, was der Kunde dadurch erreicht oder fühlt. Gekauft wird der Nutzen."]
    ],
    related: ["done-for-you-marketing-agentur-vs-einmalprojekt", "was-kostet-ein-ki-werbefilm"],
    cta: { h: "Du willst Marketing, das Deinen Kunden versteht?", sub: "30 Minuten Call. Wir fragen zuerst nach Deiner Situation, dann sprechen wir über das Angebot.", link: { to: "ki-videoproduktion", label: "Mehr zur KI-Videoproduktion von Flow West Films →" } },
    en: {
      title: "Marketing From Your Customer’s Point of View: What Your Buyer Thinks Before They Book",
      metaTitle: "Video Production Stuttgart: Customer-First Marketing | Flow West Films",
      metaDesc: "Customer-first marketing: eight building blocks and a checklist that show what your buyer thinks before booking video production in Stuttgart.",
      eyebrow: "Marketing",
      answer: "Marketing works when you plan it through your customer’s eyes. They don’t buy a film, they buy an outcome. Quietly, they ask themselves whether they can trust you, what it costs and what happens if it goes wrong. Answer those questions before they ask them and you win the job. Eight building blocks show how.",
      intro: ["Most websites talk about the company: founding year, services, team. Your customer reads something else. They check whether their problem gets solved here and whether the decision will make them look good.", "This article turns the perspective around. It draws on Chris Do’s book “Pocket Full of Do,” in which Do collects lessons from his teachers, such as Blair Enns and Seth Godin, as well as on “Building a StoryBrand” and “Positioning.” A checklist at the end lets you review your own marketing from the customer’s side."],
      sections: [
        {
          h: "1. Your customer buys an outcome, not a product",
          blocks: [
            { p: "Seth Godin’s example is the drill. The feature: a diamond-coated bit. The advantage: it drills through more materials. The benefit: the customer finishes their DIY project and is proud of it. The benefit is what gets bought." },
            { p: "Apply that to video. The feature: 15 short videos of 15 to 30 seconds each. The advantage: you can test several variants against each other. The benefit: you know which message sells instead of guessing. Most websites stop at the feature." },
            { p: "Behind the benefit there is often an emotional wish: peace of mind, pride, the feeling of having decided right. Do writes that such wishes often weigh more than the rational requirements. If all you do is list services, you aren’t talking to your customer at this point." }
          ]
        },
        {
          h: "2. Write down your customer’s inner monologue",
          blocks: [
            { p: "Do opens his book with a lesson from the customer’s point of view: know me, see what I need, make my life easy, pay attention to me, reward me. For that you have to know your customer so well that you would spot them in a crowd. Their choice of brand gives them away. Someone who drives an Audi A8 likes luxury but doesn’t like showing it off. Brands are self-portraits." },
            { p: "Write down what a managing director in Stuttgart thinks when they consider a video for their company:" },
            { ul: [
              "What does it cost, and is that fair?",
              "Can I trust this provider, or is it all promises?",
              "What happens if I don’t like the result?",
              "How much of my own time will this take?",
              "How will it look when my team or my partner sees it?",
              "What will I have in hand at the end that I can actually use?"
            ] },
            { p: "Answer each of these questions on your site before they have to ask. It helps to name the feeling: you’re not indecisive. You just don’t want to make the wrong decision. People who feel understood get less defensive." }
          ]
        },
        {
          h: "3. Be where they search, and give them a reason",
          blocks: [
            { p: "Dale Carnegie liked strawberries with cream. But because fish prefer worms, he baited the hook with worms. So don’t ask what you want to offer. Ask what the customer is looking for." },
            { p: "That takes two steps. First: where do they search? On Google for “video production Stuttgart” or “Meta ads agency Stuttgart,” on Instagram, or with AI assistants they ask for recommendations. Second: what happens when they land on your site? A gallery only says that you can do it. A reason says why they should choose you in particular." },
            { p: "One more lesson from ad production: people hardly spend their money because they see an ad anymore. They spend it on a culture they want to belong to. A spot that looks like a price tag with a button gets skipped. A spot that feels like a clip from a film sticks." }
          ]
        },
        {
          h: "4. They want a specialist, not a generalist",
          blocks: [
            { p: "Do puts it like this: you don’t order pizza at a sushi bar. When a problem gets difficult, the customer looks for someone who solves exactly that problem. Ries and Trout describe the same effect: the mind keeps only a few names per category. If you offer a little of everything, you don’t appear on any list." },
            { p: "That takes a sacrifice. If you position yourself clearly, you stop appealing to some prospects. In return, the others understand right away that you are meant for them. Ask yourself: who exactly are you the first choice for, and what single sentence should your customer be able to pass on about you?" }
          ]
        },
        {
          h: "5. They compare what they know: set the anchor",
          blocks: [
            { p: "Without context, nothing is expensive or cheap. If you don’t name a number, you leave the anchor to the competition, namely the last quote your customer received. That’s why Do advises naming the first number yourself." },
            { p: "That’s why we publish ranges. Entry level is between €2,000 and €5,000. A content package with around 15 short videos starts at about €2,500. Hybrid productions with an on-location shoot land more in the €5,000 to €10,000 range. You’ll find the details in our article “What does an AI commercial cost?” (in German)." },
            { p: "A second idea from the book: with a single price, the customer compares you with other providers. With three options, they compare you with yourself. And when someone says they have no budget, that rarely means there is no money. Usually it is flowing into something more important to them. Ask what would be important enough." }
          ]
        },
        {
          h: "6. Where you explain nothing, they invent a story",
          blocks: [
            { p: "Do kept his studio’s finances secret. The result: his managers overspent because they thought the budgets were arbitrary. When he opened up the numbers, behavior changed immediately. People fill missing information with assumptions, and those are rarely better than the truth." },
            { p: "For your website that means: a number without context looks suspicious. Always give the number, the context and the source. One example is our KFC spot. It is a self-initiated project with no brand commission, and we say so. That way it shows skill and initiative. Unlabeled, it would breed distrust, including toward the real client projects." }
          ]
        },
        {
          h: "7. They want to be diagnosed, not pitched",
          blocks: [
            { p: "Do compares good consulting to a visit to the doctor. The patient says why they have come. The doctor asks follow-up questions, forms a hypothesis and has it tested. Only then comes the treatment. Someone who writes a prescription before examining the patient isn’t acting like an expert." },
            { p: "Questions lead the conversation. Good ones are: What is driving the inquiry right now? What happens if you change nothing? What is that costing you today, in money, time and nerves? That last question goes deeper than “Why haven’t you started yet?” because it makes the cost of doing nothing visible." },
            { p: "That’s why a conversation with us starts with questions, not an offer. Our Ad Check at start.flowwestfilms.de follows the same logic: free, no obligation, in about 90 seconds." }
          ]
        },
        {
          h: "8. They don’t want to be surprised",
          blocks: [
            { p: "Do uses a simple formula: satisfaction is reality divided by expectation. If you promise too much, you are bound to fail on delivery. Promise less, deliver more." },
            { p: "That includes saying up front what the customer gets. With us that is a fixed-price offer after the 30-minute call, usage rights for paid, organic, sales and internal use, and correction rounds agreed in advance. If you know that before buying, you get no nasty surprises afterwards." }
          ]
        },
        {
          h: "The checklist: your marketing through your customer’s eyes",
          blocks: [
            { p: "Go through your website and your ads with these questions:" },
            { ol: [
              "Do you describe the benefit to the customer, or only your own service?",
              "Does the page answer the six silent questions without them having to call?",
              "Do they find you where they search, and do they get an immediate reason to choose you?",
              "Is it clear who you are the first choice for?",
              "Have you named a price range before someone else does?",
              "Does every number and example come with context?",
              "Do you ask before you offer?",
              "Do you promise only what your process delivers every single time?"
            ] },
            { p: "Your answers to just two or three of these questions will show you where your customer drops off today." },
            { p: "Customer-first marketing isn’t a technique, it’s a mindset. You answer the questions your customer is asking anyway. The earlier you do it, the less friction there is until the call." }
          ]
        }
      ],
      faq: [
        ["What does customer-first marketing mean?", "You plan message, offer and process starting from what your customer thinks, feels and needs, not from what you want to offer. The customer is the main character and you are their guide."],
        ["How do I find out what my customers think?", "Ask existing customers why they chose you over another provider, and ask prospects who dropped out what they chose instead. Write down their words verbatim. They are your best raw material for copy."],
        ["What should I look for when choosing a video production company in Stuttgart?", "Results rather than a showreel, a price range up front, clear usage rights and fixed correction rounds. Also whether the provider asks first and offers second."],
        ["Do I have to show prices on my website?", "Not necessarily. But a range sets the anchor before someone else does, and it filters out inquiries that don’t fit. On our pages we show no prices; on the blog we show ranges."],
        ["What is the difference between feature, advantage and benefit?", "The feature is a property of your offer. The advantage says what it makes possible. The benefit shows what the customer achieves or feels as a result. The benefit is what gets bought."]
      ],
      cta: { h: "Want marketing that understands your customer?", sub: "30-minute call. We ask about your situation first, then we talk about the offer.", link: { to: "ki-videoproduktion", label: "More about AI video production at Flow West Films →" } }
    }
  }
];

/* ============================================================================
 * Flow West Films — Blog content (single source of truth)
 * ----------------------------------------------------------------------------
 * Read by blog.jsx (rendering) AND scripts/seo-prerender (routes + schema).
 * Add a post = add an object here, then add its rewrite in vercel.json
 * (/blog/<slug> -> /_pre/blog__<slug>.html), the sitemap entry, and rebuild.
 * Voice: German, "Du", short declarative sentences, first person for opinions.
 * Block types: { p: "text" } · { ul: [..] } · { ol: [..] }
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
  }
];

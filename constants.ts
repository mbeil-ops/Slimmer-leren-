import { Category, Strategy, SubjectTip } from './types';

export const STRATEGIES: Strategy[] = [
  {
    id: 'flashcards',
    title: 'Flashcards',
    category: Category.TEST_JEZELF,
    shortDescription: 'Oefenkaartjes met vraag op voorkant, antwoord op achterkant.',
    howTo: [
      'Maak kaartjes: Begrip/Vraag voorop, Definitie/Antwoord achterop.',
      'Draai het kaartje om en controleer je antwoord.',
      'Werk de stapel af tot je alles kent.',
      'Tip: Gebruik tools zoals Quizlet, NotebookLM of papieren kaartjes.'
    ],
    iconName: 'Layers'
  },
  {
    id: 'braindump',
    title: 'Braindumps',
    category: Category.TEST_JEZELF,
    shortDescription: 'Schrijf alles op wat je weet op een leeg blad zonder te spieken.',
    howTo: [
      'Neem een leeg vel papier.',
      'Schrijf het onderwerp in het midden.',
      'Noteer in 3-5 minuten alles wat je je herinnert.',
      'Pak daarna je boek erbij en vul aan met een andere kleur pen.'
    ],
    iconName: 'Brain'
  },
  {
    id: 'vragen',
    title: 'Jezelf Vragen Stellen',
    category: Category.HERKNEED,
    shortDescription: 'Bedenk vragen bij de stof (Wie, Wat, Waar, Waarom, Hoe).',
    howTo: [
      'Lees een stuk tekst.',
      'Stel vragen: Waarom is dit zo? Hoe werkt dit?',
      'Verbind het met wat je al weet.',
      'Schrijf de vragen op en gebruik ze later als oefentoets.'
    ],
    iconName: 'MessageCircleQuestion'
  },
  {
    id: 'tekenen',
    title: 'Tekenen',
    category: Category.HERKNEED,
    shortDescription: 'Maak processen visueel door ze te tekenen.',
    howTo: [
      'Lees de tekst of bekijk de video.',
      'Sluit je boek.',
      'Teken het proces of concept uit je hoofd.',
      'Controleer met het boek of je tekening klopt.'
    ],
    iconName: 'PenTool'
  },
  {
    id: 'uitleggen',
    title: 'Uitleggen',
    category: Category.HERKNEED,
    shortDescription: 'Leg de stof uit aan jezelf of iemand anders.',
    howTo: [
      'Doe alsof je docent bent.',
      'Leg het hardop uit in simpele taal.',
      'Als je vastloopt, weet je welk stuk je nog moet bestuderen.'
    ],
    iconName: 'Mic'
  },
  {
    id: 'mappen',
    title: 'Mappen (Mindmap)',
    category: Category.HERKNEED,
    shortDescription: 'Maak schema’s om verbanden te zien.',
    howTo: [
      'Zet het hoofdonderwerp in het midden.',
      'Maak takken voor deelonderwerpen.',
      'Gebruik kleuren en lijnen om relaties aan te geven.',
      'Doe dit bij voorkeur uit je hoofd (als test).'
    ],
    iconName: 'Network'
  },
  {
    id: 'cornell',
    title: 'Cornell Methode',
    category: Category.HERKNEED,
    shortDescription: 'Gestructureerd samenvatten met een test-kolom.',
    howTo: [
      'Verdeel je blad in: Linkerkolom (kernwoorden), Rechterkolom (notities), Onderkant (samenvatting).',
      'Dek rechts af en test jezelf met de linkerkolom.',
      'Vat onderaan de les samen in 2 zinnen.'
    ],
    iconName: 'FileText'
  },
  {
    id: 'voorbeelden',
    title: 'Uitgewerkte Voorbeelden',
    category: Category.OEFEN_SLIM,
    shortDescription: 'Bestudeer stap-voor-stap oplossingen.',
    howTo: [
      'Bekijk een volledig uitgewerkte som of antwoord.',
      'Analyseer elke stap: Waarom doen ze dit?',
      'Dek de oplossing af en probeer het zelf.',
      'Vergelijk je eigen werk met het voorbeeld.'
    ],
    iconName: 'ListChecks'
  },
  {
    id: 'afwisselen',
    title: 'Afwisselen (Interleaving)',
    category: Category.OEFEN_SLIM,
    shortDescription: 'Wissel verschillende soorten opgaven af.',
    howTo: [
      'Maak niet 20 sommen van type A en dan 20 van type B.',
      'Maak: A, B, C, B, A, C.',
      'Dit traint je brein om de juiste strategie te kiezen.'
    ],
    iconName: 'Shuffle'
  },
  {
    id: 'gespreid',
    title: 'Gespreid Studeren',
    category: Category.PLANNING,
    shortDescription: 'Leer in korte blokken verspreid over de tijd.',
    howTo: [
      'Niet stampen de avond van tevoren.',
      'Plan: Dag 1 leren, Dag 3 herhalen, Dag 7 testen.',
      'Herhaling zorgt dat het in je langetermijngeheugen blijft.'
    ],
    iconName: 'CalendarClock'
  }
];

// Data extracted from the provided HTML tables
export const SUBJECT_TIPS: SubjectTip[] = [
  // AARDRIJKSKUNDE
  { subject: "Aardrijkskunde", strategyId: "tekenen", tip: "Teken bijv. een vulkaan, delta of waterkringloop om processen visueel te maken en beter te onthouden. Gebruik bij voorkeur alleen beeldtaal en geen tekst." },
  { subject: "Aardrijkskunde", strategyId: "flashcards", tip: "Maak flashcards van begrippen zoals 'migratie' of 'verstedelijking'. Gebruik ze ook om de lesstof aan iemand anders uit te leggen." },
  { subject: "Aardrijkskunde", strategyId: "braindump", tip: "Na iedere les of na het leren voor een toets: schrijf alles op wat je nog weet over bijv. platentektoniek zonder boek. Controleer daarna." },
  { subject: "Aardrijkskunde", strategyId: "mappen", tip: "Gebruik mindmaps voor processen. Bijv: zeewater -> verwarming -> verdamping -> wolken -> neerslag. Gebruik pijlen voor oorzaak-gevolg." },
  { subject: "Aardrijkskunde", strategyId: "vragen", tip: "Stel inzichtsvragen in plaats van alleen begripsvragen. Vraag 'Waardoor verandert dit?' of 'Wat is het gevolg van X voor Y?'" },
  { subject: "Aardrijkskunde", strategyId: "gespreid", tip: "Verdeel het werk: paragraaf per dag + herhaling vorige dag. Ideaal voor het leren van topografie." },
  
  // WISKUNDE
  { subject: "Wiskunde", strategyId: "flashcards", tip: "Leer formules en begrippen uit je hoofd. Zet diagrammen of grafieken op kaartjes om verschillende representatievormen te koppelen." },
  { subject: "Wiskunde", strategyId: "braindump", tip: "Noteer alles over een leerdoel (bijv. 'Stelling van Pythagoras'). Schrijf het stappenplan en de formules op die erbij horen." },
  { subject: "Wiskunde", strategyId: "afwisselen", tip: "Oefen vaardigheden door elkaar. Maak na 5 opgaven van type A een opgave van type B. Dit daagt je brein uit." },
  { subject: "Wiskunde", strategyId: "voorbeelden", tip: "Bestudeer de theorieblokken en uitgewerkte voorbeelden. Dek de laatste stap af en probeer die zelf in te vullen." },
  { subject: "Wiskunde", strategyId: "mappen", tip: "Teken grafieken en figuren en geef zoveel mogelijk kenmerken en eigenschappen aan met kleuren." },

  // GESCHIEDENIS
  { subject: "Geschiedenis", strategyId: "flashcards", tip: "Voorkant: Begrip/Persoon/Keerpunt. Achterkant: Betekenis in eigen woorden. Overhoor elkaar." },
  { subject: "Geschiedenis", strategyId: "braindump", tip: "Schrijf per tekstkopje (A, B, C) alles op. Deel in categorieën: sociaal-economisch, politiek-militair, cultureel." },
  { subject: "Geschiedenis", strategyId: "vragen", tip: "Stel bij afbeeldingen de vragen: Wie, Wat, Waar, Wanneer, Waarom? Zoek naar oorzaken, gevolgen, continuïteit en verandering." },
  { subject: "Geschiedenis", strategyId: "mappen", tip: "Maak een tijdlijn of mindmap met begrippen en personen. Verbind ze met pijlen (oorzaak-gevolg)." },
  { subject: "Geschiedenis", strategyId: "cornell", tip: "Maak een Cornell-samenvatting per paragraaf. Noteer kernbegrippen links en uitleg rechts." },
  { subject: "Geschiedenis", strategyId: "gespreid", tip: "Oriëntatiekennis is herhaling. Leer onderwerp 1. Later: herhaal 1, leer 2. Later: herhaal 1+2, leer 3." },

  // ENGELS & MVT
  { subject: "Engels", strategyId: "tekenen", tip: "Teken de woorden die je moet leren, zodat je makkelijker kunt beschrijven wat iets is zonder te vertalen." },
  { subject: "Engels", strategyId: "flashcards", tip: "Noteer niet alleen NL-EN, maar ook synoniemen, antonymen en de woordvorm. Oefen ook literaire begrippen." },
  { subject: "Engels", strategyId: "vragen", tip: "Maak zelf toetsvragen over je leesboek of artikel. Stel elkaar aan het begin van de les 1 vraag over de vorige les." },
  { subject: "Engels", strategyId: "uitleggen", tip: "Leg het plot van je boek of film uit aan jezelf in het Engels (hardop!)." },
  { subject: "Engels", strategyId: "mappen", tip: "Maak een 'Plot Hill' of mindmap van literary elements (setting, point of view, context)." },
  { subject: "Engels", strategyId: "afwisselen", tip: "Grammatica: Oefen tijden (tenses) door elkaar. Vaardigheden: Wissel lezen af met luisteren (TED talk) over hetzelfde onderwerp." },
  
  // MODERNE VREEMDE TALEN (MVT)
  { subject: "Moderne Vreemde Talen", strategyId: "flashcards", tip: "Leer woorden en zinnen met flashcards. Dit kan digitaal, maar het liefst nog op papier." },
  { subject: "Moderne Vreemde Talen", strategyId: "tekenen", tip: "Bij grammatica en boektoetsen kun je verbanden aangeven door deze schematisch weer te geven." },
  { subject: "Moderne Vreemde Talen", strategyId: "uitleggen", tip: "Leg aan jezelf uit hoe je een grammaticaregel toe moet passen." },
  { subject: "Moderne Vreemde Talen", strategyId: "voorbeelden", tip: "Bij ontleden en toepassing van naamvallen: geef zelf een voorbeeldzin waarbij je de zinsdelen aangeeft met kleuren." },
  { subject: "Moderne Vreemde Talen", strategyId: "gespreid", tip: "Verdeel woordenlijsten in kleinere stukken en herhaal regelmatig (meerdere malen dagelijks)." },
  { subject: "Moderne Vreemde Talen", strategyId: "afwisselen", tip: "Wissel af: schrijf woordjes, maar laat jezelf ook horen. Maak rubrieken of een verhaal met de te leren woorden." },

  // NATUURKUNDE
  { subject: "Natuurkunde", strategyId: "flashcards", tip: "Maak kaartjes met grootheden, eenheden en symbolen. Gebruik ze om formules te leren." },
  { subject: "Natuurkunde", strategyId: "tekenen", tip: "Maak bij elke vraag een schets van de situatie. Dit helpt je hersenen de stof te begrijpen." },
  { subject: "Natuurkunde", strategyId: "mappen", tip: "Maak per paragraaf een concept map van alle begrippen met de bijbehorende formules." },
  { subject: "Natuurkunde", strategyId: "braindump", tip: "Doe een braindump direct na het lezen van een paragraaf. Herhaal dit na 1 dag." },
  { subject: "Natuurkunde", strategyId: "voorbeelden", tip: "Oefen de systematische probleemaanpak: Gegeven, Gevraagd, Formule, Berekening, Eenheid." },

  // SCHEIKUNDE
  { subject: "Scheikunde", strategyId: "flashcards", tip: "Leer symbolen en elementen. Of begrippen per hoofdstuk." },
  { subject: "Scheikunde", strategyId: "vragen", tip: "Vraag bij een opgave: Welke oplossingsstrategie heb ik nodig? Welke basiskennis hoort hierbij?" },
  { subject: "Scheikunde", strategyId: "mappen", tip: "Maak per paragraaf een mindmap van belangrijke begrippen en formules." },
  { subject: "Scheikunde", strategyId: "voorbeelden", tip: "Schrijf reactievergelijkingen en structuurformules volledig uit bij het oefenen. Controleer elke stap." },
  { subject: "Scheikunde", strategyId: "afwisselen", tip: "Maak aan het eind van het hoofdstuk opgaven door elkaar (Test jezelf)." },

  // BIOLOGIE
  { subject: "Biologie", strategyId: "vragen", tip: "Stel de vragen: Wat is de functie van het geheel? Hoe werken onderdelen samen? Wat is het nadeel als een onderdeel ontbreekt?" },
  { subject: "Biologie", strategyId: "vragen", tip: "Jojoën: Verbind processen aan organisatieniveaus (Cel -> Orgaan -> Organisme -> Ecosysteem)." },
  { subject: "Biologie", strategyId: "mappen", tip: "Maak een conceptmap waarin je verschillende biologische concepten uit het hoofdstuk verbindt." },

  // NEDERLANDS
  { subject: "Nederlands", strategyId: "voorbeelden", tip: "Bekijk voorbeeldteksten. Let op opbouw, signaalwoorden en argumentatie. Vergelijk jouw tekst met het model." },
  { subject: "Nederlands", strategyId: "braindump", tip: "Schrijf alles op wat je weet over tekststructuren, spellingregels of stijlfiguren. Vul daarna aan." },
  { subject: "Nederlands", strategyId: "afwisselen", tip: "Wissel af tussen lezen, schrijven en spelling. Gebruik de Pomodoro techniek." },
  { subject: "Nederlands", strategyId: "cornell", tip: "Vat tekststructuren of grammaticaregels samen in een Cornell-schema." },

  // KUNST ALGEMEEN (Previously BEVO / KUBE)
  { subject: "Kunst Algemeen", strategyId: "voorbeelden", tip: "Bestudeer beeldaspecten aan de hand van visuele voorbeelden. Hoe is het toegepast?" },
  { subject: "Kunst Algemeen", strategyId: "gespreid", tip: "Oefen regelmatig met reflecteren op wat je ziet of gemaakt hebt." },
  
  // MUZIEK
  { subject: "Muziek", strategyId: "uitleggen", tip: "Leer de theorie en check jezelf door luistervragen te maken." },
  { subject: "Muziek", strategyId: "oefenen", tip: "Oefen je speelpartij altijd met een beat/metronoom voor de juiste flow en timing." },

  // ALGEMEEN
  { subject: "Algemeen", strategyId: "flashcards", tip: "Gebruik voor begrippen, woordjes (NL-Vreemde taal) of symbolen." },
  { subject: "Algemeen", strategyId: "braindump", tip: "Dump je geheugen op papier voor je begint met leren om te zien wat je al weet." },
  { subject: "Algemeen", strategyId: "cornell", tip: "Gebruik Cornell voor aantekeningen tijdens de les. Dek rechts af en toets jezelf links." },
  { subject: "Algemeen", strategyId: "afwisselen", tip: "Wissel vakken en type opdrachten af voor betere concentratie en dieper leren." }
];
/* ============================================================
   BANQUE DE QUESTIONS :Examen Aspirants & Chefs Guides 2026
   Source : 10 modules officiels de la session MJA Mali 2026
   (Conférence Générale / Adventist Youth Ministries)

   POOL   : réservoir de questions par type
            .qcm   = choix unique (corrigé automatiquement, champ "correct")
            .court = réponse courte (corrigée par le responsable)
            .cas   = cas pratique  (corrigé par le responsable)
   COMPO  : composition de chaque épreuve (combien de chaque type)
   NIVEAU : libellés des épreuves
   chaque question porte "mod" (module) => le tirage couvre TOUS les modules
   Pour enrichir : ajoute des objets dans POOL.qcm / POOL.court / POOL.cas
   ============================================================ */

const NIVEAU = {
  1:{ titre:"Épreuve 1 : Examen complet",     desc:"Couvre l'ensemble des modules (QCM et réponses courtes)" },
  2:{ titre:"Épreuve 2 : Approfondissement",  desc:"Compréhension et cas pratiques sur tous les modules" },
  3:{ titre:"Épreuve 3 : Application",        desc:"Cas pratiques et analyse approfondie" },
};

/* Composition de chaque épreuve (le tirage couvre tous les modules) */
const COMPO = {
  1:{ qcm:40, court:10, cas:0 },  // 50 questions (~2h) : examen complet, majorite QCM
  2:{ qcm:40, court:8,  cas:2 },  // 50 questions : plus exigeante, majorite QCM
  3:{ qcm:38, court:8,  cas:4 },  // 50 questions : application, majorite QCM
};

/* Pondération par complexité ; la note est ensuite ramenée sur 20 */
const POINTS = { qcm:1, court:2, cas:3 };

/* ============================================================
   CORRIGÉS OFFICIELS des questions ouvertes (courtes + cas).
   Sourcés des manuels d'administration (Aventuriers / Explorateurs,
   Conférence Générale) et de gcyouthministries.org.
   Affichés au responsable pour corriger, et au candidat sur sa copie.
   ============================================================ */
const CORRIGE = {
  // Réponses courtes
  "co-m1-1":"Le trépied : Physique, Mental (intellectuel) et Spirituel.",
  "co-m1-2":"Le globe signifie que l'Explorateur vit dans le monde mais n'est pas du monde, et rappelle la mission mondiale (porter l'Évangile au monde entier en sa génération).",
  "co-m2-1":"L'église, le foyer (la famille) et l'école, qui s'unissent pour aider l'enfant à grandir (Proverbes 22.6).",
  "co-m3-1":"Bleu = loyauté ; Rouge = sacrifice du Christ (Jean 3.16) ; Blanc = pureté (Matthieu 5.8) ; Or = excellence (Job 23.10).",
  "co-m3-2":"L'octogone = la perfection et la complétude du caractère du leader formé par Dieu ; le globe = la Grande Commission (Matthieu 28.19), porter le message au monde entier.",
  "co-m4-1":"Le But, la Devise, l'Engagement, la Promesse et la Loi.",
  "co-m4-2":"Un membre actif = présence régulière + progression dans les classes progressives + service à l'église locale.",
  "co-m5-1":"Ami (bleu), Compagnon (rouge), Explorateur (vert), Pionnier (gris), Voyageur (bordeaux), Guide (or).",
  "co-m6-1":"Au choix parmi : Petit Agneau (4 ans), Castor Curieux (5 ans), Abeille Active (6 ans), Rayon de Soleil (7 ans), Constructeur (8 ans), Main Utile (9 ans).",
  "co-m7-1":"Pour exprimer et renforcer l'unité de la JA : une seule voix, un même rythme, un même cœur. C'est l'esprit d'ensemble et la solennité ; toute la troupe agit comme un seul corps.",
  "co-m7-2":"1) Drapeau National, 2) Drapeau Chrétien, 3) Drapeau JA, 4) Drapeau Chef Guide, 5) Drapeau des Explorateurs, 6) Drapeau des Aventuriers.",
  "co-m8-1":"Reconnaître ceux qui ont complété leur classe ; Inspirer ceux qui ne se sont pas encore engagés ; Informer l'Église et la communauté ; Communiquer les plans d'avenir.",
  "co-m9-1":"Une table, l'emblème JA, les tableaux de la Loi et de la Promesse, le drapeau JA et le drapeau national, 1 grande bougie blanche (15 cm), 6 bougies colorées (10 cm) pour les 6 classes, 8 bougies (Loi), 7 bougies (Promesse), 1 bougie blanche par candidat.",
  "co-m9-2":"« Voulez-vous parler ? » → « Oui chef, nous voulons prendre notre engagement. » « Dans quel but ? » → « Pour annoncer Christ au monde entier en notre génération. »",
  "co-m10-1":"Le jeune tourne le dos au monde pour suivre les traces du Maître (Christ) et marcher selon la volonté de Dieu : il vit dans le monde mais n'est pas du monde.",
  "co-m10-2":"Parce que l'uniforme complet compte un nombre précis d'éléments (11). S'il en manque un seul, il n'est plus conforme ni complet ; c'est pourquoi les uniformes sont notés à l'inspection. C'est une question de discipline et de rigueur.",
  // Cas pratiques
  "ca-m1-1":"Le Club des Explorateurs (10-15 ans) est un ministère de l'église qui développe le jeune sur les plans physique, mental et spirituel, surtout par l'exemple. Son but : « Le Message Adventiste au monde entier en ma génération ». Il forme le caractère chrétien, la foi et le leadership.",
  "ca-m2-1":"Réponse créative : l'activité doit relier les trois piliers. Exemple : un projet de service préparé à l'école, soutenu par les parents au foyer, puis présenté et béni à l'église. Évaluer la cohérence avec église + foyer + école.",
  "ca-m3-1":"Octogone = perfection/complétude du caractère du leader ; Globe = la Grande Commission (Matthieu 28.19), mission mondiale ; Étoiles = les classes progressives ; Trois flammes = le message des trois anges (Apocalypse 14).",
  "ca-m4-1":"Parce que « Chef Guide » est le grade/niveau de formation le plus élevé, mais il exerce son service dans le club des Aventuriers OU des Explorateurs de son église. Il n'existe donc pas de club distinct : le Chef Guide encadre les clubs existants.",
  "ca-m5-1":"Associer chaque classe à une image : Ami (bleu = ciel), Compagnon (rouge = sacrifice), Explorateur (vert = forêt/création), Pionnier (gris = traces), Voyageur (bordeaux = voyage/service), Guide (or = couronne/excellence). Ciel → Sacrifice → Forêt → Traces → Voyage → Couronne.",
  "ca-m6-1":"Rayon de Soleil : 7 ans, couleur orange, verset Matthieu 5.14 (« Vous êtes la lumière du monde »). On aide l'enfant à comprendre le grand récit biblique (création, péché, salut, retour de Jésus), par des activités adaptées et les premiers campings en famille, dans la joie et la sécurité ; récompenses : écussons.",
  "ca-m7-1":"Au moins 6 étapes dans l'ordre, ex. : appel à l'ordre ; mise en rangs par unités ; entrée du garde-couleurs ; serment au drapeau national ; serment à la Bible ; récitation du But, de la Devise, de la Promesse et de la Loi ; chant à l'unisson ; hissage des couleurs (drapeau national en dernier) ; rapport des capitaines et présences ; inspection ; culte d'ouverture.",
  "ca-m8-1":"Du plus jeune au plus âgé : Aventuriers (6-9 ans, les parents remettent les insignes) ; Éclaireurs/Explorateurs (10-15 ans, présidé par le Chef de la Mission) ; Ambassadeurs (16-21 ans) ; Chefs Guides (22 ans et +, présidé par le Chef de l'Union ou son représentant).",
  "ca-m9-1":"Table au-devant ; emblème JA au centre, tableau de la Loi d'un côté et de la Promesse de l'autre ; grande bougie (15 cm) au centre, les 6 bougies des classes devant ; drapeau national à droite, drapeau JA à gauche (face à l'assistance) ; Explorateurs assis en « V », candidats à l'intérieur ; Directeur à droite de la table, Président à gauche.",
  "ca-m9-2":"Parce que c'est un engagement solennel devant Dieu et devant les hommes : le jeune décide officiellement d'entrer dans la famille JA. Cela officialise son individualité spirituelle face à Christ et sa solidarité avec la communauté, d'une importance comparable au baptême chez l'adulte.",
  "ca-m10-1":"Principe violé : l'honnêteté dans le port des insignes (on ne porte que les insignes correspondant à des aptitudes réellement maîtrisées). Conséquences : danger réel (s'il est sollicité pour sauver quelqu'un, il met une vie en péril, y compris la sienne) et perte de crédibilité. On ne décore jamais sa tenue d'une aptitude qu'on n'a pas.",
  "ca-m10-2":"Bas vert olive ; chemise blanche (grands événements) ; foulard et écharpe verts des Explorateurs avec la glissière ; tous les insignes du grade et des spécialisations réellement acquis ; coiffure (béret, casquette, calot ou chapeau) ; chaussures et ceinture noires ; tenue propre et complète (les 11 éléments).",
};

const POOL = {
  /* ----------------------- QCM ----------------------- */
  qcm:[
    // Module 1 :Philosophie des Explorateurs
    {id:"q-m1-1",mod:"Philosophie Explorateurs",q:"Le Club des Explorateurs s'adresse aux jeunes de :",opts:["6 à 9 ans","10 à 15 ans","16 à 21 ans","4 à 9 ans"],correct:1},
    {id:"q-m1-2",mod:"Philosophie Explorateurs",q:"La devise de la Jeunesse Adventiste est :",opts:["L'amour du Christ nous presse","Toujours prêt","Servir Dieu d'abord","La foi en action"],correct:0},
    {id:"q-m1-3",mod:"Philosophie Explorateurs",q:"Dans l'emblème des Explorateurs, le triangle inversé représente :",opts:["La Trinité","La foi qui grandit","La montagne","Le danger"],correct:1},
    {id:"q-m1-4",mod:"Philosophie Explorateurs",q:"« Explorateur » désigne le club ; « Éclaireur » désigne :",opts:["Un autre club","Le grade","Le drapeau","Le chant"],correct:1},
    // Module 2 :Philosophie des Aventuriers
    {id:"q-m2-1",mod:"Philosophie Aventuriers",q:"Le Club des Aventuriers s'adresse aux enfants de :",opts:["4 à 9 ans","6 à 9 ans","10 à 12 ans","0 à 5 ans"],correct:0},
    {id:"q-m2-2",mod:"Philosophie Aventuriers",q:"Quel est le verset fondateur du Club des Aventuriers ?",opts:["Jean 3.16","Proverbes 22.6","Psaume 23","Exode 20.8"],correct:1},
    {id:"q-m2-3",mod:"Philosophie Aventuriers",q:"Dans la philosophie des Aventuriers, trois institutions s'unissent pour l'enfant :",opts:["L'école, l'État et l'église","L'église, le foyer et l'école","Le foyer, le club et l'hôpital","L'église, le club et l'État"],correct:1},
    {id:"q-m2-4",mod:"Philosophie Aventuriers",q:"L'engagement de l'Aventurier est :",opts:["« Pour l'amour de Jésus, je ferai toujours de mon mieux »","« Toujours prêt à servir »","« Je veux être pur et loyal »","« L'amour du Christ me presse »"],correct:0},
    // Module 3 :Logos JA
    {id:"q-m3-1",mod:"Logos JA",q:"Dans les logos JA, la couleur bleue représente :",opts:["La pureté","La loyauté","Le sacrifice","L'excellence"],correct:1},
    {id:"q-m3-2",mod:"Logos JA",q:"La couleur rouge (écarlate) représente :",opts:["Le sacrifice du Christ","La nature","La royauté","Le feu"],correct:0},
    {id:"q-m3-3",mod:"Logos JA",q:"La couleur or (jaune) représente :",opts:["La richesse","L'excellence","Le soleil","La joie"],correct:1},
    {id:"q-m3-4",mod:"Logos JA",q:"Le logo des Chefs Guides a la forme d'un :",opts:["Cercle","Triangle","Octogone","Carré"],correct:2},
    {id:"q-m3-5",mod:"Logos JA",q:"Les trois flammes du logo Chef Guide rappellent :",opts:["La Trinité","Le message des trois anges","Les trois couleurs","Les trois classes"],correct:1},
    {id:"q-m3-6",mod:"Logos JA",q:"Combien d'étoiles entourent le globe sur le logo des Chefs Guides ?",opts:["Quatre","Cinq","Six","Huit"],correct:2},
    {id:"q-m3-7",mod:"Logos JA",q:"Que représentent les étoiles du logo des Chefs Guides ?",opts:["Les fruits de l'Esprit","Les classes progressives","Les continents du monde","Les douze apôtres"],correct:1},
    {id:"q-m3-8",mod:"Logos JA",q:"Au centre du logo des Chefs Guides figure :",opts:["Une croix","Un globe (le monde)","Une flamme","Un livre ouvert"],correct:1},
    // Module 4 :Fondements JA
    {id:"q-m4-1",mod:"Fondements JA",q:"Combien de classes progressives compte le Club des Explorateurs ?",opts:["4","5","6","7"],correct:2},
    {id:"q-m4-2",mod:"Fondements JA",q:"Combien y a-t-il d'idéaux de la Jeunesse Adventiste ?",opts:["3","4","5","6"],correct:2},
    {id:"q-m4-3",mod:"Fondements JA",q:"Un Chef Guide exerce son service :",opts:["Dans un club de Chefs Guides","Dans le club Aventuriers ou Explorateurs","Uniquement à l'Union","Nulle part en particulier"],correct:1},
    {id:"q-m4-4",mod:"Fondements JA",q:"La classe « Ami » correspond à l'âge de :",opts:["10 ans","12 ans","14 ans","9 ans"],correct:0},
    // Module 5 :Origine des classes
    {id:"q-m5-1",mod:"Origine des classes",q:"Le sigle « MV » signifie :",opts:["Mouvement de la Vie","Missionnaires Volontaires","Mission Victoire","Maîtres Volontaires"],correct:1},
    {id:"q-m5-2",mod:"Origine des classes",q:"La couleur de la classe Pionnier est :",opts:["Verte","Grise","Bordeaux","Or"],correct:1},
    {id:"q-m5-3",mod:"Origine des classes",q:"La couleur de la classe Guide est :",opts:["Or","Bleu","Rouge","Vert"],correct:0},
    {id:"q-m5-4",mod:"Origine des classes",q:"Les deux premières classes créées (1922) sont :",opts:["Explorateur et Pionnier","Ami et Compagnon","Voyageur et Guide","Ami et Guide"],correct:1},
    // Module 6 :Petits groupes des Aventuriers
    {id:"q-m6-1",mod:"Petits groupes",q:"Le petit groupe « Petit Agneau » concerne les enfants de :",opts:["4 ans","6 ans","9 ans","5 ans"],correct:0},
    {id:"q-m6-2",mod:"Petits groupes",q:"Le groupe « Main Utile » a pour couleur :",opts:["Jaune","Orange","Bordeaux","Vert"],correct:2},
    {id:"q-m6-3",mod:"Petits groupes",q:"Le groupe « Castor Curieux » concerne les enfants de :",opts:["5 ans","7 ans","9 ans","4 ans"],correct:0},
    {id:"q-m6-4",mod:"Petits groupes",q:"Le groupe « Abeille Active » a pour couleur :",opts:["Bleu clair","Jaune","Orange","Bordeaux"],correct:1},
    // Module 7 :Cérémonies d'ouverture et de clôture
    {id:"q-m7-1",mod:"Cérémonies",q:"Lors de la montée des couleurs, le drapeau national est hissé :",opts:["En premier","En dernier","Au milieu","Il n'est pas hissé"],correct:1},
    {id:"q-m7-2",mod:"Cérémonies",q:"Le chant d'ouverture doit être exécuté :",opts:["En solo","À l'unisson","En silence","Par le directeur seul"],correct:1},
    {id:"q-m7-3",mod:"Cérémonies",q:"À la clôture, le drapeau national est récupéré :",opts:["En premier","En dernier","Au hasard","Il reste hissé"],correct:0},
    {id:"q-m7-4",mod:"Cérémonies",q:"Dans l'ordre des drapeaux, le premier (position d'honneur) est :",opts:["Le drapeau JA","Le drapeau National","Le drapeau des Explorateurs","Le drapeau Chrétien"],correct:1},
    // Module 8 :Investiture
    {id:"q-m8-1",mod:"Investiture",q:"La cérémonie d'investiture sert à remettre au jeune :",opts:["Le foulard","L'insigne de classe","Le diplôme","La bougie"],correct:1},
    {id:"q-m8-2",mod:"Investiture",q:"Chez les Aventuriers, les insignes sont remis par :",opts:["Le pasteur","Les parents","Le directeur","Le secrétaire"],correct:1},
    {id:"q-m8-3",mod:"Investiture",q:"Selon le Manuel, le Club des Explorateurs n'est pas :",opts:["Une société secrète","Un ministère d'église","Un club de jeunes","Une organisation mondiale"],correct:0},
    {id:"q-m8-4",mod:"Investiture",q:"Combien d'objectifs officiels a la cérémonie d'investiture ?",opts:["2","3","4","5"],correct:2},
    // Module 9 :Incorporation
    {id:"q-m9-1",mod:"Incorporation",q:"« Incorporation » vient du latin in corpus, qui signifie :",opts:["Sortir du corps","Faire entrer dans le corps","Le corps saint","Corps et esprit"],correct:1},
    {id:"q-m9-2",mod:"Incorporation",q:"La grande bougie de 15 cm symbolise :",opts:["La Loi JA","La Promesse JA","L'Esprit du mouvement JA","Le candidat"],correct:2},
    {id:"q-m9-3",mod:"Incorporation",q:"Pendant l'incorporation, les Explorateurs sont assis en forme de :",opts:["Cercle","Ligne","« V »","Carré"],correct:2},
    {id:"q-m9-4",mod:"Incorporation",q:"Le nombre de bougies représentant la Loi JA est :",opts:["6","7","8","10"],correct:2},
    // Module 10 :Tenue JA
    {id:"q-m10-1",mod:"Tenue JA",q:"La couleur kaki symbolise :",opts:["La pureté","L'endurance et la persévérance","La loyauté","Le sacrifice"],correct:1},
    {id:"q-m10-2",mod:"Tenue JA",q:"Le foulard JA se porte :",opts:["La pointe devant","La pointe dans le dos","Noué à la ceinture","Sur la tête"],correct:1},
    {id:"q-m10-3",mod:"Tenue JA",q:"Un uniforme complet compte :",opts:["7 éléments","9 éléments","11 éléments","15 éléments"],correct:2},
    {id:"q-m10-4",mod:"Tenue JA",q:"La tenue A se porte :",opts:["Pour les sorties et les camps","Pour les grands événements et cérémonies","À la maison","Pour le sport"],correct:1},
    // ===== AJOUTS (à valider) — Module Nœuds & matelotage =====
    {id:"q-no-1",mod:"Nœuds",q:"À quoi sert principalement le nœud de chaise ?",opts:["Relier deux cordes","Faire une boucle fixe qui ne se resserre pas","Raccourcir une corde","Tendre une toile de tente"],correct:1},
    {id:"q-no-2",mod:"Nœuds",q:"À quoi sert le nœud plat ?",opts:["Relier deux cordes de même grosseur","Faire une boucle","Grimper à un arbre","Lester une ligne"],correct:0},
    {id:"q-no-3",mod:"Nœuds",q:"Le nœud plat est aussi appelé :",opts:["Nœud de chaise","Nœud carré","Nœud de cabestan","Nœud de pêcheur"],correct:1},
    {id:"q-no-4",mod:"Nœuds",q:"Quel nœud sert à amarrer rapidement une corde à un poteau ou une perche ?",opts:["Le nœud plat","Le nœud de chaise","Le nœud de cabestan","Le nœud de huit"],correct:2},
    {id:"q-no-5",mod:"Nœuds",q:"Pour relier deux cordes de grosseurs différentes, on utilise :",opts:["Le nœud plat","Le nœud d'écoute","Le nœud de chaise","Le nœud de cabestan"],correct:1},
    {id:"q-no-6",mod:"Nœuds",q:"Le nœud de huit sert surtout à :",opts:["Faire un nœud d'arrêt en bout de corde","Relier deux cordes","Faire une boucle coulante","Attacher deux perches"],correct:0},
    // ===== AJOUTS (à valider) — compléments ancrés sur des faits déjà présents dans la banque =====
    {id:"q-m4-5",mod:"Fondements JA",q:"La Loi de la Jeunesse Adventiste compte combien d'articles ?",opts:["6","7","8","10"],correct:2},
    {id:"q-m7-5",mod:"Cérémonies",q:"Combien de drapeaux comporte une cérémonie JA complète ?",opts:["4","5","6","7"],correct:2},
    {id:"q-m4-6",mod:"Fondements JA",q:"À quel âge un jeune passe-t-il du Club des Aventuriers au Club des Explorateurs ?",opts:["8 ans","9 ans","10 ans","12 ans"],correct:2},
    {id:"q-m10-5",mod:"Tenue JA",q:"Quelle est la couleur de la tenue de terrain JA, symbole de persévérance ?",opts:["Bleu marine","Kaki","Vert olive","Gris"],correct:1},
    {id:"q-m2-5",mod:"Philosophie Aventuriers",q:"« Instruis l'enfant selon la voie qu'il doit suivre… » est tiré de :",opts:["Jean 3.16","Proverbes 22.6","Psaume 23","Matthieu 19.14"],correct:1},
    {id:"q-m3-9",mod:"Logos JA",q:"Combien de flammes figurent sur l'emblème de la Jeunesse Adventiste ?",opts:["Deux","Trois","Quatre","Cinq"],correct:1},
  ],

  /* --------------------- RÉPONSES COURTES --------------------- */
  court:[
    {id:"co-m1-1",mod:"Philosophie Explorateurs",q:"Citez les trois dimensions du trépied de la philosophie des Explorateurs."},
    {id:"co-m1-2",mod:"Philosophie Explorateurs",q:"Que signifie le globe présent dans l'emblème des Explorateurs ?"},
    {id:"co-m2-1",mod:"Philosophie Aventuriers",q:"Quels sont les trois piliers qui s'unissent dans la philosophie des Aventuriers ?"},
    {id:"co-m3-1",mod:"Logos JA",q:"Donnez la signification des couleurs bleu, rouge, blanc et or."},
    {id:"co-m3-2",mod:"Logos JA",q:"Que représentent l'octogone et le globe dans le logo des Chefs Guides ?"},
    {id:"co-m3-3",mod:"Logos JA",q:"Combien d'étoiles compte le logo des Chefs Guides et que symbolisent-elles ?"},
    {id:"co-m4-1",mod:"Fondements JA",q:"Citez les 5 idéaux de la Jeunesse Adventiste."},
    {id:"co-m4-2",mod:"Fondements JA",q:"Qu'est-ce qu'un « membre actif » du club ?"},
    {id:"co-m5-1",mod:"Origine des classes",q:"Citez les 6 classes progressives avec leur couleur."},
    {id:"co-m6-1",mod:"Petits groupes",q:"Citez trois petits groupes du Club des Aventuriers avec leur âge."},
    {id:"co-m7-1",mod:"Cérémonies",q:"Pourquoi le chant d'ouverture se fait-il à l'unisson ?"},
    {id:"co-m7-2",mod:"Cérémonies",q:"Citez, dans l'ordre, les 6 drapeaux d'une cérémonie JA."},
    {id:"co-m8-1",mod:"Investiture",q:"Citez les 4 objectifs de la cérémonie d'investiture."},
    {id:"co-m9-1",mod:"Incorporation",q:"Citez le matériel principal nécessaire à une cérémonie d'incorporation."},
    {id:"co-m9-2",mod:"Incorporation",q:"Quel est le dialogue d'engagement entre le Directeur et les candidats ?"},
    {id:"co-m10-1",mod:"Tenue JA",q:"Expliquez pourquoi le foulard se porte la pointe dans le dos."},
    {id:"co-m10-2",mod:"Tenue JA",q:"Pourquoi un uniforme auquel il manque un seul élément n'est-il plus un uniforme ?"},
    {id:"co-no-1",mod:"Nœuds",q:"Citez quatre types de nœuds que vous connaissez."},
    {id:"co-no-2",mod:"Nœuds",q:"À quoi sert le nœud de chaise ? Donnez un exemple d'utilisation concrète."},
  ],

  /* ------------------------- CAS PRATIQUES ------------------------- */
  cas:[
    {id:"ca-m1-1",mod:"Philosophie Explorateurs",q:"Un parent vous demande à quoi sert le Club des Explorateurs et quel est son but. Rédigez votre réponse."},
    {id:"ca-m2-1",mod:"Philosophie Aventuriers",q:"Proposez une activité pour des Aventuriers qui associe l'église, le foyer et l'école, conformément à la philosophie du club."},
    {id:"ca-m3-1",mod:"Logos JA",q:"Expliquez la symbolique complète du logo des Chefs Guides : octogone, globe, étoiles et trois flammes."},
    {id:"ca-m4-1",mod:"Fondements JA",q:"Expliquez pourquoi il n'existe pas de « club des Chefs Guides »."},
    {id:"ca-m5-1",mod:"Origine des classes",q:"Expliquez un moyen mnémotechnique pour retenir l'ordre et la couleur des 6 classes progressives."},
    {id:"ca-m6-1",mod:"Petits groupes",q:"On vous confie le groupe « Rayon de Soleil » (7 ans). Décrivez comment vous l'encadrez (couleur, verset, esprit)."},
    {id:"ca-m7-1",mod:"Cérémonies",q:"Décrivez, dans l'ordre, au moins 6 étapes d'une cérémonie d'ouverture JA."},
    {id:"ca-m8-1",mod:"Investiture",q:"Vous organisez une investiture. Décrivez l'ordre de passage des sections et qui préside chaque section."},
    {id:"ca-m9-1",mod:"Incorporation",q:"Disposez une salle pour une cérémonie d'incorporation : table, bougies, drapeaux, et position du Directeur et du Président."},
    {id:"ca-m9-2",mod:"Incorporation",q:"Expliquez pourquoi la cérémonie d'incorporation est comparée au baptême."},
    {id:"ca-m10-1",mod:"Tenue JA",q:"Un chef porte l'insigne de natation sans savoir nager. Quel principe est violé et quelles peuvent être les conséquences ?"},
    {id:"ca-m10-2",mod:"Tenue JA",q:"Décrivez la tenue A complète d'un Explorateur pour une investiture (bas, haut, foulard, accessoires)."},
    {id:"ca-no-1",mod:"Nœuds",q:"Vous installez un campement. Décrivez deux nœuds que vous utiliseriez, leur usage précis et où les employer."},
  ],
};

/* ============================================================
   RÉFÉRENCES (sources officielles GC Youth Ministries) — éditables ici.
   refFor(q) = référence spécifique de la question (REFS_Q) sinon celle du module (REFS).
   Remplace par les titres/sections exacts de ton manuel MJA Mali si besoin.
   ============================================================ */
const REFS = {
  "Philosophie Explorateurs":"Manuel d'administration des Explorateurs (GC) + classe Explorateur",
  "Philosophie Aventuriers":"Manuel d'administration des Aventuriers (GC)",
  "Logos JA":"AY Honors – Drapeaux (GC) + Manuel d'admin. (emblème mondial)",
  "Fondements JA":"Manuel d'administration des Explorateurs (GC) – Idéaux JA (But, Devise, Vœu, Loi)",
  "Origine des classes":"Classes progressives JA (GC) – d'Ami à Guide",
  "Petits groupes":"Manuel d'administration des Aventuriers (GC) – petits groupes",
  "Cérémonies":"Manuel d'administration des Explorateurs (GC) – Cérémonies",
  "Investiture":"Manuel d'administration des Explorateurs (GC) – Investiture",
  "Incorporation":"Manuel d'administration des Explorateurs (GC) – Incorporation (Induction)",
  "Tenue JA":"Spécifications de l'uniforme Explorateur (GC)",
  "Nœuds":"AY Honors – Nœuds (GC)"
};
const REFS_Q = {
  "q-m1-2":"2 Corinthiens 5:14 (devise JA « L'amour du Christ nous presse »)",
  "q-m2-2":"Proverbes 22:6 (verset fondateur des Aventuriers)",
  "q-m2-5":"Proverbes 22:6"
};
function refFor(q){ return (typeof REFS_Q!=='undefined'&&REFS_Q[q.id]) || (typeof REFS!=='undefined'&&REFS[q.mod]) || ''; }

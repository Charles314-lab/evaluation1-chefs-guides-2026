/* ============================================================
   BANQUE DE QUESTIONS — Examen Aspirants & Chefs Guides 2026
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
  1:{ titre:"Épreuve 1 — Examen complet",     desc:"Couvre l'ensemble des modules (QCM et réponses courtes)" },
  2:{ titre:"Épreuve 2 — Approfondissement",  desc:"Compréhension et cas pratiques sur tous les modules" },
  3:{ titre:"Épreuve 3 — Application",        desc:"Cas pratiques et analyse approfondie" },
};

/* Composition de chaque épreuve (le tirage couvre tous les modules) */
const COMPO = {
  1:{ qcm:20, court:10, cas:0 },  // 30 questions : l'examen normal et complet
  2:{ qcm:14, court:10, cas:3 },  // 27 questions : version plus exigeante
  3:{ qcm:10, court:10, cas:6 },  // 26 questions : application / analyse
};

/* Pondération par complexité ; la note est ensuite ramenée sur 20 */
const POINTS = { qcm:1, court:2, cas:3 };

const POOL = {
  /* ----------------------- QCM ----------------------- */
  qcm:[
    // Module 1 — Philosophie des Explorateurs
    {id:"q-m1-1",mod:"Philosophie Explorateurs",q:"Le Club des Explorateurs s'adresse aux jeunes de :",opts:["6 à 9 ans","10 à 15 ans","16 à 21 ans","4 à 9 ans"],correct:1},
    {id:"q-m1-2",mod:"Philosophie Explorateurs",q:"La devise de la Jeunesse Adventiste est :",opts:["L'amour du Christ nous presse","Toujours prêt","Servir Dieu d'abord","La foi en action"],correct:0},
    {id:"q-m1-3",mod:"Philosophie Explorateurs",q:"Dans l'emblème des Explorateurs, le triangle inversé représente :",opts:["La Trinité","La foi qui grandit","La montagne","Le danger"],correct:1},
    {id:"q-m1-4",mod:"Philosophie Explorateurs",q:"« Explorateur » désigne le club ; « Éclaireur » désigne :",opts:["Un autre club","Le grade","Le drapeau","Le chant"],correct:1},
    // Module 2 — Philosophie des Aventuriers
    {id:"q-m2-1",mod:"Philosophie Aventuriers",q:"Le Club des Aventuriers s'adresse aux enfants de :",opts:["4 à 9 ans","6 à 9 ans","10 à 12 ans","0 à 5 ans"],correct:0},
    {id:"q-m2-2",mod:"Philosophie Aventuriers",q:"Quel est le verset fondateur du Club des Aventuriers ?",opts:["Jean 3.16","Proverbes 22.6","Psaume 23","Exode 20.8"],correct:1},
    {id:"q-m2-3",mod:"Philosophie Aventuriers",q:"Dans la philosophie des Aventuriers, trois institutions s'unissent pour l'enfant :",opts:["L'école, l'État et l'église","L'église, le foyer et l'école","Le foyer, le club et l'hôpital","L'église, le club et l'État"],correct:1},
    {id:"q-m2-4",mod:"Philosophie Aventuriers",q:"L'engagement de l'Aventurier est :",opts:["« Pour l'amour de Jésus, je ferai toujours de mon mieux »","« Toujours prêt à servir »","« Je veux être pur et loyal »","« L'amour du Christ me presse »"],correct:0},
    // Module 3 — Logos JA
    {id:"q-m3-1",mod:"Logos JA",q:"Dans les logos JA, la couleur bleue représente :",opts:["La pureté","La loyauté","Le sacrifice","L'excellence"],correct:1},
    {id:"q-m3-2",mod:"Logos JA",q:"La couleur rouge (écarlate) représente :",opts:["Le sacrifice du Christ","La nature","La royauté","Le feu"],correct:0},
    {id:"q-m3-3",mod:"Logos JA",q:"La couleur or (jaune) représente :",opts:["La richesse","L'excellence","Le soleil","La joie"],correct:1},
    {id:"q-m3-4",mod:"Logos JA",q:"Le logo des Chefs Guides a la forme d'un :",opts:["Cercle","Triangle","Octogone","Carré"],correct:2},
    {id:"q-m3-5",mod:"Logos JA",q:"Les trois flammes du logo Chef Guide rappellent :",opts:["La Trinité","Le message des trois anges","Les trois couleurs","Les trois classes"],correct:1},
    // Module 4 — Fondements JA
    {id:"q-m4-1",mod:"Fondements JA",q:"Combien de classes progressives compte le Club des Explorateurs ?",opts:["4","5","6","7"],correct:2},
    {id:"q-m4-2",mod:"Fondements JA",q:"Combien y a-t-il d'idéaux de la Jeunesse Adventiste ?",opts:["3","4","5","6"],correct:2},
    {id:"q-m4-3",mod:"Fondements JA",q:"Un Chef Guide exerce son service :",opts:["Dans un club de Chefs Guides","Dans le club Aventuriers ou Explorateurs","Uniquement à l'Union","Nulle part en particulier"],correct:1},
    {id:"q-m4-4",mod:"Fondements JA",q:"La classe « Ami » correspond à l'âge de :",opts:["10 ans","12 ans","14 ans","9 ans"],correct:0},
    // Module 5 — Origine des classes
    {id:"q-m5-1",mod:"Origine des classes",q:"Le sigle « MV » signifie :",opts:["Mouvement de la Vie","Missionnaires Volontaires","Mission Victoire","Maîtres Volontaires"],correct:1},
    {id:"q-m5-2",mod:"Origine des classes",q:"La couleur de la classe Pionnier est :",opts:["Verte","Grise","Bordeaux","Or"],correct:1},
    {id:"q-m5-3",mod:"Origine des classes",q:"La couleur de la classe Guide est :",opts:["Or","Bleu","Rouge","Vert"],correct:0},
    {id:"q-m5-4",mod:"Origine des classes",q:"Les deux premières classes créées (1922) sont :",opts:["Explorateur et Pionnier","Ami et Compagnon","Voyageur et Guide","Ami et Guide"],correct:1},
    // Module 6 — Petits groupes des Aventuriers
    {id:"q-m6-1",mod:"Petits groupes",q:"Le petit groupe « Petit Agneau » concerne les enfants de :",opts:["4 ans","6 ans","9 ans","5 ans"],correct:0},
    {id:"q-m6-2",mod:"Petits groupes",q:"Le groupe « Main Utile » a pour couleur :",opts:["Jaune","Orange","Bordeaux","Vert"],correct:2},
    {id:"q-m6-3",mod:"Petits groupes",q:"Le groupe « Castor Curieux » concerne les enfants de :",opts:["5 ans","7 ans","9 ans","4 ans"],correct:0},
    {id:"q-m6-4",mod:"Petits groupes",q:"Le groupe « Abeille Active » a pour couleur :",opts:["Bleu clair","Jaune","Orange","Bordeaux"],correct:1},
    // Module 7 — Cérémonies d'ouverture et de clôture
    {id:"q-m7-1",mod:"Cérémonies",q:"Lors de la montée des couleurs, le drapeau national est hissé :",opts:["En premier","En dernier","Au milieu","Il n'est pas hissé"],correct:1},
    {id:"q-m7-2",mod:"Cérémonies",q:"Le chant d'ouverture doit être exécuté :",opts:["En solo","À l'unisson","En silence","Par le directeur seul"],correct:1},
    {id:"q-m7-3",mod:"Cérémonies",q:"À la clôture, le drapeau national est récupéré :",opts:["En premier","En dernier","Au hasard","Il reste hissé"],correct:0},
    {id:"q-m7-4",mod:"Cérémonies",q:"Dans l'ordre des drapeaux, le premier (position d'honneur) est :",opts:["Le drapeau JA","Le drapeau National","Le drapeau des Explorateurs","Le drapeau Chrétien"],correct:1},
    // Module 8 — Investiture
    {id:"q-m8-1",mod:"Investiture",q:"La cérémonie d'investiture sert à remettre au jeune :",opts:["Le foulard","L'insigne de classe","Le diplôme","La bougie"],correct:1},
    {id:"q-m8-2",mod:"Investiture",q:"Chez les Aventuriers, les insignes sont remis par :",opts:["Le pasteur","Les parents","Le directeur","Le secrétaire"],correct:1},
    {id:"q-m8-3",mod:"Investiture",q:"Selon le Manuel, le Club des Explorateurs n'est pas :",opts:["Une société secrète","Un ministère d'église","Un club de jeunes","Une organisation mondiale"],correct:0},
    {id:"q-m8-4",mod:"Investiture",q:"Combien d'objectifs officiels a la cérémonie d'investiture ?",opts:["2","3","4","5"],correct:2},
    // Module 9 — Incorporation
    {id:"q-m9-1",mod:"Incorporation",q:"« Incorporation » vient du latin in corpus, qui signifie :",opts:["Sortir du corps","Faire entrer dans le corps","Le corps saint","Corps et esprit"],correct:1},
    {id:"q-m9-2",mod:"Incorporation",q:"La grande bougie de 15 cm symbolise :",opts:["La Loi JA","La Promesse JA","L'Esprit du mouvement JA","Le candidat"],correct:2},
    {id:"q-m9-3",mod:"Incorporation",q:"Pendant l'incorporation, les Explorateurs sont assis en forme de :",opts:["Cercle","Ligne","« V »","Carré"],correct:2},
    {id:"q-m9-4",mod:"Incorporation",q:"Le nombre de bougies représentant la Loi JA est :",opts:["6","7","8","10"],correct:2},
    // Module 10 — Tenue JA
    {id:"q-m10-1",mod:"Tenue JA",q:"La couleur kaki symbolise :",opts:["La pureté","L'endurance et la persévérance","La loyauté","Le sacrifice"],correct:1},
    {id:"q-m10-2",mod:"Tenue JA",q:"Le foulard JA se porte :",opts:["La pointe devant","La pointe dans le dos","Noué à la ceinture","Sur la tête"],correct:1},
    {id:"q-m10-3",mod:"Tenue JA",q:"Un uniforme complet compte :",opts:["7 éléments","9 éléments","11 éléments","15 éléments"],correct:2},
    {id:"q-m10-4",mod:"Tenue JA",q:"La tenue A se porte :",opts:["Pour les sorties et les camps","Pour les grands événements et cérémonies","À la maison","Pour le sport"],correct:1},
  ],

  /* --------------------- RÉPONSES COURTES --------------------- */
  court:[
    {id:"co-m1-1",mod:"Philosophie Explorateurs",q:"Citez les trois dimensions du trépied de la philosophie des Explorateurs."},
    {id:"co-m1-2",mod:"Philosophie Explorateurs",q:"Que signifie le globe présent dans l'emblème des Explorateurs ?"},
    {id:"co-m2-1",mod:"Philosophie Aventuriers",q:"Quels sont les trois piliers qui s'unissent dans la philosophie des Aventuriers ?"},
    {id:"co-m3-1",mod:"Logos JA",q:"Donnez la signification des couleurs bleu, rouge, blanc et or."},
    {id:"co-m3-2",mod:"Logos JA",q:"Que représentent l'octogone et le globe dans le logo des Chefs Guides ?"},
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
  ],
};

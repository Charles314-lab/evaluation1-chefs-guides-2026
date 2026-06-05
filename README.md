# Examen des Aspirants Chefs Guides 2026 — MJA Mali

Application web d'examen en ligne pour la formation des Aspirants Chefs Guides
(Ministère de la Jeunesse Adventiste — Mali).

## Fichiers
- `index.html` — l'examen (côté candidat)
- `admin.html` — le dashboard responsable (suivi en direct, correction, statistiques, exports)
- `questions.js` — la banque de questions (10 modules)
- `config.js` — configuration Supabase
- `supabase_schema.sql` — schéma de la base de données

## Fonctionnement
- Examen de 30 questions (QCM + réponses rédigées), couvrant les 10 modules.
- Notation sur 20 pondérée par complexité (QCM 1, réponse courte 2, cas pratique 3).
- Difficulté progressive à chaque sortie de page ; 3 sorties = disqualification.
- Données enregistrées dans Supabase (multi-postes, temps réel).
- Le candidat consulte sa copie corrigée via l'identifiant communiqué par le responsable.

*L'amour du Christ nous presse.*

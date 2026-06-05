-- ============================================================
--  Examen Aspirants & Chefs Guides 2026  —  schéma Supabase
--  À exécuter dans : Supabase  >  SQL Editor  >  New query  >  Run
-- ============================================================

create table if not exists public.exam_sessions (
  id           text primary key,            -- identifiant de session (généré par l'app)
  nom          text not null,
  eglise       text,
  grade        text,
  table_no     int,
  place        text,
  level        int  default 1,              -- épreuve atteinte (1, 2 ou 3)
  exits        int  default 0,              -- nombre de sorties de page
  status       text default 'in-progress',  -- in-progress | submitted | disqualified
  score        int  default 0,
  max_auto     int  default 0,
  rallonge     int,                          -- minutes de rallonge accordées (le cas échéant)
  selected     jsonb,                        -- questions tirées pour ce candidat
  answers      jsonb,                        -- réponses du candidat
  manual       jsonb,                        -- points attribués par le responsable
  created_at   timestamptz default now(),
  submitted_at timestamptz
);

-- Temps réel : le dashboard se met à jour automatiquement
alter publication supabase_realtime add table public.exam_sessions;

-- Sécurité (contexte interne) : la clé publique "anon" peut insérer / lire / mettre à jour.
-- Suffisant pour un examen interne. Si tu veux verrouiller la lecture, on ajoutera une
-- authentification pour le seul espace responsable.
alter table public.exam_sessions enable row level security;

create policy "lecture publique"     on public.exam_sessions for select using (true);
create policy "insertion publique"   on public.exam_sessions for insert with check (true);
create policy "mise a jour publique" on public.exam_sessions for update using (true);

import React, { useEffect, useRef, useState } from "react";
import {
  MapPin, Search, ShoppingBag, PartyPopper, GraduationCap, Compass,
  UtensilsCrossed, BarChart3, ArrowRight, ArrowUpRight, Menu, X,
  Star, MessageCircle, Handshake, Sparkles, ChevronRight
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FALY MiRay — Landing page                                          */
/*  Tokens dérivés de la charte graphique validée (V1, Août 2026)      */
/* ------------------------------------------------------------------ */
const C = {
  navy: "#0D1321",
  navySoft: "#161F33",
  navyLine: "#232E47",
  gold: "#D4AF37",
  goldSoft: "#E8CD6B",
  white: "#FFFFFF",
  slate: "#8992A6",
  slateDark: "#6B7280",
  ivory: "#F7F4EE",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const disp = { fontFamily: "Poppins, sans-serif" };
const mono = { fontFamily: "'IBM Plex Mono', monospace" };

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { href: "#probleme", label: "Le constat" },
  { href: "#ecosysteme", label: "Écosystème" },
  { href: "#modele", label: "Modèle" },
  { href: "#preuve", label: "Preuve de concept" },
  { href: "#rejoindre", label: "Rejoindre" },
];

const PERSONAS = [
  { icon: Handshake, title: "Artiste / artisan", need: "Talent réel, mais visibilité, clients et outils de vente insuffisants." },
  { icon: UtensilsCrossed, title: "Restaurant / hôtel", need: "Cherche clients, prestataires ou animations sans disposer du bon réseau." },
  { icon: Compass, title: "Touriste / vacancier", need: "Où manger, quoi visiter, quel événement suivre : l'information est dispersée." },
  { icon: GraduationCap, title: "Jeune talent", need: "Une compétence, mais pas de premier client ni de passerelle vers le marché." },
  { icon: BarChart3, title: "Entreprise", need: "Perd du temps à chercher des prestataires ou des données fiables sur le marché local." },
  { icon: MapPin, title: "Territoire", need: "Une richesse culturelle et touristique sous-valorisée, faute d'agrégation." },
];

const POLES = [
  { key: "Connect", desc: "Cœur numérique : profils, recherche, mise en relation, réservation, avis, carte.", icon: Compass },
  { key: "Shop", desc: "Marketplace de produits artistiques, artisanaux et locaux — en ligne et en stand.", icon: ShoppingBag },
  { key: "Show", desc: "Événementiel et laboratoire de marché. Asian Show Toliara en est le premier test.", icon: PartyPopper },
  { key: "Talenta", desc: "Formation et professionnalisation des jeunes vers des débouchés concrets.", icon: GraduationCap },
  { key: "Kolontsaina", desc: "Découverte culturelle et touristique : lieux, artisans, parcours, contenus de territoire.", icon: Sparkles },
  { key: "Sakafo", desc: "Valorisation gastronomique : restaurants, producteurs, expériences culinaires.", icon: UtensilsCrossed },
  { key: "Consulting", desc: "Études de marché, stratégie commerciale et accompagnement des porteurs d'offre.", icon: BarChart3 },
];

const VALUE_ROWS = [
  { actor: "Client / famille", need: "Trouver rapidement une solution fiable", gain: "Temps gagné, choix, confiance" },
  { actor: "Touriste", need: "Découvrir une destination et ses acteurs", gain: "Une expérience locale plus riche" },
  { actor: "Artiste / artisan", need: "Clients et visibilité", gain: "Ventes, missions, notoriété" },
  { actor: "Restaurant / hôtel", need: "Clientèle, animation, prestataires", gain: "Trafic, revenus, différenciation" },
  { actor: "Jeune talent", need: "Accès au marché", gain: "Compétences, portfolio, revenus" },
  { actor: "Entreprise", need: "Prestataires et intelligence marché", gain: "Sourcing, gain de temps" },
];

const REVENUE = [
  { src: "Commissions", ex: "Vente marketplace, réservation" },
  { src: "Abonnements pro", ex: "Restaurant, hôtel, boutique, prestataire" },
  { src: "Services premium", ex: "Profil sponsorisé, campagne locale" },
  { src: "Événementiel", ex: "Billetterie, stands, sponsoring" },
  { src: "Consulting", ex: "Études, stratégie marketing" },
  { src: "Formation", ex: "Ateliers MiRay Talenta" },
];

const ROADMAP = [
  { ph: "Phase 1", place: "Toliara", desc: "Connect + profils partenaires + recherche + Show + catalogue Shop limité." },
  { ph: "Phase 2", place: "Densifier", desc: "Marketplace complète, Talenta, Kolontsaina, carte touristique." },
  { ph: "Phase 3", place: "Monétiser", desc: "Abonnements pro, réservation, données, Consulting." },
  { ph: "Phase 4", place: "Répliquer", desc: "Extension vers d'autres villes, modèle testé et adaptable." },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-px" style={{ backgroundColor: C.gold }} />
      <span style={{ ...mono, color: C.gold }} className="text-[11px] tracking-[0.2em] uppercase">{children}</span>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

/* Signature element: constellation of nodes converging on the MiRay mark */
function ConnectionGraphic() {
  const nodes = [
    { x: 40, y: 60, l: "Artisan" }, { x: 40, y: 170, l: "Restaurant" }, { x: 40, y: 280, l: "Talent" },
    { x: 460, y: 60, l: "Touriste" }, { x: 460, y: 170, l: "Entreprise" }, { x: 460, y: 280, l: "Territoire" },
  ];
  return (
    <svg viewBox="0 0 500 340" className="w-full h-auto" style={{ maxHeight: 380 }}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.35" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="170" r="90" fill="url(#glow)" />
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={n.x} y1={n.y} x2="250" y2="170" stroke={C.gold} strokeOpacity="0.55" strokeWidth="1.2"
            strokeDasharray="4 5" className="miray-line" style={{ animationDelay: `${i * 0.35}s` }} />
          <circle cx={n.x} cy={n.y} r="4.5" fill={C.navy} stroke={C.goldSoft} strokeWidth="1.4" />
          <text x={n.x} y={n.y + (n.x < 250 ? -14 : -14)} textAnchor="middle" fill={C.slate} fontSize="11" style={mono}>{n.l}</text>
        </g>
      ))}
      {/* central handshake mark, simplified */}
      <g transform="translate(250,170)">
        <circle r="34" fill={C.navy} stroke={C.gold} strokeWidth="1.6" />
        <path d="M-14 -8 C -14 -16, -4 -18, 0 -10 C 4 -18, 14 -16, 14 -8 C 14 2, 4 10, 0 16 C -4 10, -14 2, -14 -8 Z"
          fill="none" />
        <circle cx="-9" cy="-6" r="5.5" fill={C.gold} />
        <circle cx="9" cy="-6" r="5.5" fill={C.white} />
        <path d="M-9 -1 Q0 10 9 -1" stroke={C.goldSoft} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      <style>{`
        .miray-line { stroke-dashoffset: 40; animation: mirayDash 3.2s linear infinite; }
        @keyframes mirayDash { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
export default function FalyMirayLanding({ onEnter }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: C.navy, ...disp }} className="min-h-screen w-full overflow-x-hidden">
      <style>{FONTS}</style>

      {/* ---------------- NAV ---------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{ backgroundColor: scrolled ? "rgba(13,19,33,0.88)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", borderBottom: scrolled ? `1px solid ${C.navyLine}` : "1px solid transparent" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <MirayMark size={26} />
            <span className="text-lg font-extrabold" style={{ color: C.white }}>FALY<span style={{ color: C.gold }}>MiRay</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-[13px] font-medium hover:opacity-100 transition-opacity"
                style={{ color: C.slate, opacity: 0.9 }}>{l.label}</a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#rejoindre" className="text-[13px] font-semibold px-4 py-2 rounded-full transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: C.gold, color: C.navy }}>Devenir partenaire</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(m => !m)}>
            {menuOpen ? <X color={C.white} size={22} /> : <Menu color={C.white} size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-5 flex flex-col gap-4" style={{ backgroundColor: C.navy, borderBottom: `1px solid ${C.navyLine}` }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: C.white }}>{l.label}</a>
            ))}
            <a href="#rejoindre" onClick={() => setMenuOpen(false)} className="text-sm font-semibold px-4 py-2.5 rounded-full text-center" style={{ backgroundColor: C.gold, color: C.navy }}>Devenir partenaire</a>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="relative pt-36 pb-20 px-5 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Plateforme malgache · Découverte · Mise en relation · Commerce</Eyebrow>
            <h1 className="text-[2.6rem] leading-[1.05] md:text-6xl font-extrabold" style={{ color: C.white }}>
              Ensemble,<br /><span style={{ color: C.gold }}>créons des</span><br />opportunités.
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed max-w-md" style={{ color: C.slate }}>
              FALY MiRay relie les personnes qui cherchent une solution aux acteurs locaux capables de la leur fournir — artisans, restaurants, hôtels, talents, événements. Une seule plateforme pour découvrir, se relier et créer de la valeur, à Toliara puis à Madagascar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#preuve" className="group inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full" style={{ backgroundColor: C.gold, color: C.navy }}>
                Découvrir le modèle <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#ecosysteme" className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full" style={{ border: `1px solid ${C.navyLine}`, color: C.white }}>
                Voir l'écosystème
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <Stat n="7" l="pôles d'activité" />
              <Stat n="300+" l="participants — 1ʳᵉ preuve" />
              <Stat n="1" l="plateforme, un lien" />
            </div>
          </Reveal>
          <Reveal>
            <ConnectionGraphic />
          </Reveal>
        </div>
      </section>

      {/* ---------------- IDENTITY / MEANING ---------------- */}
      <section className="px-5 md:px-8 py-16" style={{ borderTop: `1px solid ${C.navyLine}`, borderBottom: `1px solid ${C.navyLine}` }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            { w: "FALY", m: "Joie, épanouissement", d: "La satisfaction créée lorsqu'une relation débouche sur une solution ou une opportunité." },
            { w: "MI", m: "Action", d: "Agir, chercher, entreprendre, entrer en relation." },
            { w: "RAY", m: "Individu", d: "Chaque personne, talent, client, entreprise ou acteur du territoire." },
            { w: "MiRay", m: "Se relier", d: "Des individus qui agissent pour se connecter et créer de la valeur ensemble." },
          ].map((x, i) => (
            <Reveal key={i}>
              <div style={{ ...mono, color: C.gold }} className="text-2xl mb-2">{x.w}</div>
              <div className="text-sm font-semibold mb-1.5" style={{ color: C.white }}>{x.m}</div>
              <p className="text-[12.5px] leading-relaxed" style={{ color: C.slate }}>{x.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PROBLEM ---------------- */}
      <section id="probleme" className="px-5 md:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Eyebrow>Le constat</Eyebrow>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold max-w-2xl leading-tight" style={{ color: C.white }}>
              L'offre locale existe déjà. Elle reste difficile à trouver.
            </h2>
            <p className="mt-4 text-sm max-w-xl" style={{ color: C.slate }}>
              Le problème n'est pas l'absence de talents, de produits ou de services à Madagascar. C'est la fragmentation : l'offre et la demande existent, mais elles se rencontrent difficilement.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERSONAS.map((p, i) => (
              <Reveal key={i}>
                <div className="h-full rounded-2xl p-5" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                  <p.icon size={20} color={C.gold} />
                  <div className="mt-3 text-sm font-semibold" style={{ color: C.white }}>{p.title}</div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: C.slate }}>{p.need}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 rounded-2xl p-6 md:p-8 text-center" style={{ background: `linear-gradient(120deg, ${C.navySoft}, #1c2947)`, border: `1px solid ${C.gold}` }}>
              <p className="text-base md:text-lg italic" style={{ color: C.goldSoft }}>
                « FALY MiRay ne fait pas tout. Il fait une seule chose : il connecte l'offre locale à la demande. »
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ECOSYSTEM ---------------- */}
      <section id="ecosysteme" className="px-5 md:px-8 py-24" style={{ backgroundColor: C.navySoft, borderTop: `1px solid ${C.navyLine}`, borderBottom: `1px solid ${C.navyLine}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Eyebrow>L'écosystème</Eyebrow>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold max-w-2xl leading-tight" style={{ color: C.white }}>
              Sept pôles, un seul lien.
            </h2>
            <p className="mt-4 text-sm max-w-xl" style={{ color: C.slate }}>
              Ces pôles sont les services d'une même entreprise. Leur rôle est de renforcer la plateforme, pas de fonctionner comme des entités isolées.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POLES.map((p, i) => (
              <Reveal key={i} className={i === 0 ? "lg:col-span-2" : ""}>
                <div className="h-full rounded-2xl p-6 flex flex-col justify-between" style={{ backgroundColor: C.navy, border: `1px solid ${C.navyLine}` }}>
                  <div className="flex items-center justify-between">
                    <p.icon size={22} color={C.gold} />
                    <span style={{ ...mono, color: C.slateDark }} className="text-[10px]">0{i + 1}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-base font-bold" style={{ color: C.white }}>MiRay <span style={{ color: C.gold }}>{p.key}</span></div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: C.slate }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- VALUE + REVENUE ---------------- */}
      <section id="modele" className="px-5 md:px-8 py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow>Qui gagne quoi</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-6" style={{ color: C.white }}>
              Client satisfait, partenaire gagnant, plateforme rémunérée.
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.navyLine}` }}>
              {VALUE_ROWS.map((r, i) => (
                <div key={i} className="grid grid-cols-2 gap-3 px-5 py-3.5" style={{ backgroundColor: i % 2 ? C.navySoft : "transparent", borderTop: i ? `1px solid ${C.navyLine}` : "none" }}>
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: C.white }}>{r.actor}</div>
                    <div className="text-[11.5px] mt-0.5" style={{ color: C.slate }}>{r.need}</div>
                  </div>
                  <div className="flex items-center text-[12px] font-medium" style={{ color: C.gold }}>{r.gain}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-2">
            <Eyebrow>Modèle de revenus</Eyebrow>
            <h3 className="text-lg font-bold mb-6" style={{ color: C.white }}>Diversifié dès l'amorçage</h3>
            <div className="flex flex-col gap-2.5">
              {REVENUE.map((r, i) => (
                <div key={i} className="rounded-xl px-4 py-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                  <div className="text-[13px] font-semibold" style={{ color: C.gold }}>{r.src}</div>
                  <div className="text-[11.5px] mt-0.5" style={{ color: C.slate }}>{r.ex}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ROADMAP ---------------- */}
      <section className="px-5 md:px-8 py-24" style={{ backgroundColor: C.navySoft, borderTop: `1px solid ${C.navyLine}`, borderBottom: `1px solid ${C.navyLine}` }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <Eyebrow>Feuille de route</Eyebrow>
            <h2 className="text-3xl md:text-[2.6rem] font-extrabold max-w-2xl leading-tight" style={{ color: C.white }}>
              Construire la densité avant l'expansion.
            </h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-4 gap-px" style={{ backgroundColor: C.navyLine }}>
            {ROADMAP.map((r, i) => (
              <Reveal key={i}>
                <div className="h-full p-6" style={{ backgroundColor: C.navySoft }}>
                  <span style={{ ...mono, color: C.gold }} className="text-xs">{r.ph}</span>
                  <div className="mt-2 text-base font-bold" style={{ color: C.white }}>{r.place}</div>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: C.slate }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROOF OF CONCEPT ---------------- */}
      <section id="preuve" className="px-5 md:px-8 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Origine &amp; apprentissage</Eyebrow>
            <h2 className="text-3xl font-extrabold leading-tight mb-4" style={{ color: C.white }}>
              Asian Show Toliara : première preuve de capacité.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: C.slate }}>
              Premier laboratoire terrain de MiRay Show : mobilisation d'une communauté, activation de partenaires, test d'expériences culturelles et observation directe de la demande. Ces données ne prouvent pas encore la viabilité de FALY MiRay dans son ensemble, mais elles démontrent une première capacité d'exécution.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat n="300+" l="participants mobilisés" big />
              <Stat n="20" l="membres d'équipe" big />
              <Stat n="82,6%" l="notes 4 ou 5 sur 5" big />
              <Stat n="91,3%" l="intention de revenir" big />
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl p-6" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.gold}` }}>
              <PartyPopper size={20} color={C.gold} />
              <p className="mt-4 text-sm italic leading-relaxed" style={{ color: C.goldSoft }}>
                « Asian Show Toliara n'est plus le centre du projet : il devient le premier laboratoire de MiRay Show et une preuve de capacité d'exécution. »
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- APP PREVIEW ---------------- */}
      <section className="px-5 md:px-8 py-24" style={{ backgroundColor: C.ivory }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <MiniPhone />
          </Reveal>
          <Reveal>
            <Eyebrow>MiRay Connect</Eyebrow>
            <h2 className="text-3xl font-extrabold leading-tight mb-4" style={{ color: C.navy }}>
              L'application qui relie l'offre locale à ceux qui la cherchent.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: C.slateDark }}>
              Recherche, catégories, carte, fiches vérifiées, messagerie directe et réservation — MiRay Connect est le cœur numérique de l'écosystème. Un prototype cliquable est disponible séparément pour tester le parcours complet.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Manger", "Hôtels", "Artisans", "Événements", "Shop", "Talents"].map(t => (
                <span key={t} className="text-[11.5px] font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: C.navy, color: C.goldSoft }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section id="rejoindre" className="px-5 md:px-8 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
          <MirayMark size={480} />
        </div>
        <Reveal className="relative">
          <Eyebrow>Rejoindre</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-extrabold max-w-2xl mx-auto leading-tight" style={{ color: C.white }}>
            Devenez partenaire fondateur de l'écosystème.
          </h2>
          <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: C.slate }}>
            Artisan, restaurant, hôtel, talent ou entreprise : rejoignez la première vague de partenaires MiRay Connect à Toliara.
          </p>
          <form className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Votre adresse e-mail"
              className="flex-1 rounded-full px-5 py-3.5 text-sm outline-none"
              style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}`, color: C.white }} />
            <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full whitespace-nowrap" style={{ backgroundColor: C.gold, color: C.navy }}>
              Être recontacté <ArrowUpRight size={15} />
            </button>
          </form>
        </Reveal>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="px-5 md:px-8 py-10" style={{ borderTop: `1px solid ${C.navyLine}` }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MirayMark size={20} />
            <span className="text-sm font-semibold" style={{ color: C.white }}>FALY MiRay</span>
          </div>
          <span style={{ ...mono, color: C.slateDark }} className="text-[11px] tracking-wide uppercase">Toliara · Madagascar · 2026</span>
          <span className="text-[12px]" style={{ color: C.slate }}>Ensemble, créons des opportunités.</span>
        </div>
      </footer>

      {onEnter && (
        <button
          onClick={onEnter}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 text-sm font-semibold px-5 py-3.5 rounded-full shadow-lg"
          style={{ backgroundColor: C.gold, color: C.navy }}
        >
          Accéder à l'application <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Stat({ n, l, big }) {
  return (
    <div>
      <div style={{ ...mono, color: C.gold }} className={big ? "text-2xl" : "text-lg"}>{n}</div>
      <div className="text-[10.5px] mt-0.5 leading-snug" style={{ color: C.slate }}>{l}</div>
    </div>
  );
}

function MirayMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M8 20 C 8 55, 30 75, 45 90 C 40 78, 42 68, 50 62" stroke={C.gold} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M92 20 C 92 55, 70 75, 55 90 C 60 78, 58 68, 50 62" stroke={C.white} strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="14" r="9" fill={C.gold} />
      <circle cx="76" cy="14" r="9" fill={C.white} />
    </svg>
  );
}

function MiniPhone() {
  const items = [
    { t: "Le Zebu", s: "Restaurant · 4,6", c: "linear-gradient(135deg,#7a2e2e,#c65b3f)" },
    { t: "Sunset Hôtel", s: "Hôtel · 4,7", c: "linear-gradient(135deg,#1d4e63,#3f8fa8)" },
    { t: "Atelier Mahatsara", s: "Artisanat · 4,8", c: "linear-gradient(135deg,#3a2b52,#8a5cd6)" },
  ];
  return (
    <div className="mx-auto rounded-[2.2rem] p-2.5 shadow-2xl" style={{ backgroundColor: "#050810", maxWidth: 300 }}>
      <div className="rounded-[1.7rem] overflow-hidden" style={{ backgroundColor: C.navy }}>
        <div className="h-5 flex items-center justify-center"><div className="w-20 h-3.5 rounded-b-xl" style={{ backgroundColor: "#050810" }} /></div>
        <div className="px-4 pb-5 pt-1">
          <div className="flex items-center gap-2">
            <MirayMark size={20} />
            <div>
              <div className="text-[9px]" style={{ color: C.slate }}>Vous êtes à</div>
              <div className="text-[11px] font-semibold flex items-center gap-1" style={{ color: C.white }}><MapPin size={10} color={C.gold} />Toliara</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
            <Search size={13} color={C.slate} />
            <span className="text-[11px]" style={{ color: C.slate }}>Rechercher un lieu, un talent…</span>
          </div>
          <div className="mt-4 text-[11px] font-semibold" style={{ color: C.white }}>Autour de vous</div>
          <div className="mt-2 flex flex-col gap-2">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl p-2" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: it.c }} />
                <div>
                  <div className="text-[11px] font-medium" style={{ color: C.white }}>{it.t}</div>
                  <div className="text-[10px] flex items-center gap-1" style={{ color: C.slate }}><Star size={9} fill={C.gold} color={C.gold} />{it.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-around py-2.5" style={{ backgroundColor: C.navySoft, borderTop: `1px solid ${C.navyLine}` }}>
          {[MapPin, Compass, MessageCircle, ChevronRight].map((Icon, i) => (
            <Icon key={i} size={14} color={i === 1 ? C.gold : C.slate} />
          ))}
        </div>
      </div>
    </div>
  );
}

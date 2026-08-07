import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Bell, Star, ChevronLeft, Home, ShoppingBag, CalendarDays,
  User, Heart, MessageCircle, Phone, ChevronRight, Sparkles, Filter,
  UtensilsCrossed, Hammer, Building2, PartyPopper, GraduationCap, Wrench,
  Share2, BadgeCheck, Clock, X, Newspaper, Send, Globe2, CheckCheck,
  Compass, Landmark, ChefHat, BarChart3, Locate
} from "lucide-react";
import { uploadImage } from "./services/cloudinary.js";

// ---------------------------------------------------------------
// FALY MiRay — Charte graphique validée
// ---------------------------------------------------------------
const C = {
  navy: "#0D1321",
  navySoft: "#161F33",
  navyLine: "#232E47",
  gold: "#D4AF37",
  goldSoft: "#E8CD6B",
  white: "#FFFFFF",
  slate: "#6B7280",
  ivory: "#F7F4EE",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`;

// ---------------------------------------------------------------
// Data
// ---------------------------------------------------------------
const CATEGORIES = [
  { key: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { key: "artisans", label: "Artisans", icon: Hammer },
  { key: "hotels", label: "Hôtels", icon: Building2 },
  { key: "evenements", label: "Événements", icon: PartyPopper },
  { key: "formations", label: "Formations", icon: GraduationCap },
  { key: "services", label: "Services", icon: Wrench },
];

const LISTINGS = [
  { id: 1, cat: "restaurants", name: "Or'Aura", tag: "Restaurant asiatique", rating: 4.8, reviews: 62, loc: "Toliara Centre", img: "linear-gradient(135deg,#8a5a2b,#d9a441)", desc: "Cuisine d'inspiration asiatique valorisant les produits locaux. Partenaire de la première édition d'Asian Show Toliara.", price: "Repas dès 8 000 Ar", verified: true },
  { id: 2, cat: "restaurants", name: "Le Baobab Bleu", tag: "Restaurant • Fruits de mer", rating: 4.6, reviews: 41, loc: "Front de mer", img: "linear-gradient(135deg,#1d4e63,#3f8fa8)", desc: "Vue sur mer, spécialités locales et fruits de mer frais du jour.", price: "Repas dès 12 000 Ar", verified: true },
  { id: 3, cat: "restaurants", name: "Chez Miora", tag: "Cuisine malgache", rating: 4.4, reviews: 29, loc: "Ankilifaly", img: "linear-gradient(135deg,#7a2e2e,#c65b3f)", desc: "Cantine familiale, plats traditionnels et menu du jour à petit prix.", price: "Repas dès 5 000 Ar", verified: false },
  { id: 4, cat: "artisans", name: "Atelier Famadihana", tag: "Artisanat • Cosplay & couture", rating: 4.9, reviews: 37, loc: "Toliara Centre", img: "linear-gradient(135deg,#3a2b52,#8a5cd6)", desc: "Création de costumes, accessoires et pièces personnalisées. Repéré via Asian Talent.", price: "Sur devis", verified: true },
  { id: 5, cat: "artisans", name: "Vahatra Craft", tag: "Bijoux & objets locaux", rating: 4.7, reviews: 18, loc: "Mahavatse", img: "linear-gradient(135deg,#2b4a2f,#6fae65)", desc: "Bijoux en matières locales, raphia et bois flotté travaillés à la main.", price: "Dès 6 000 Ar", verified: false },
  { id: 6, cat: "hotels", name: "Ecolodge Anakao", tag: "Hôtel • Bord de mer", rating: 4.9, reviews: 84, loc: "Anakao", img: "linear-gradient(135deg,#0f3d3e,#28897f)", desc: "Bungalows face à l'océan, à 40 minutes de Toliara en bateau.", price: "Dès 95 000 Ar / nuit", verified: true },
  { id: 7, cat: "hotels", name: "Hôtel Le Lagon", tag: "Hôtel • Centre-ville", rating: 4.3, reviews: 52, loc: "Toliara Centre", img: "linear-gradient(135deg,#1d3557,#457b9d)", desc: "Hôtel central, piscine et restaurant partenaire.", price: "Dès 60 000 Ar / nuit", verified: true },
  { id: 8, cat: "evenements", name: "Asian Show Toliara — Édition 2027", tag: "MiRay Show • Laboratoire de marché", rating: 4.9, reviews: 23, loc: "Toliara", img: "linear-gradient(135deg,#7a1f2b,#d4af37)", desc: "Culture asiatique, cosplay, gaming, danse et restauration. Premier test grandeur nature de MiRay Show.", price: "Billet dès 3 000 Ar", verified: true, date: "12 juillet 2027" },
  { id: 9, cat: "evenements", name: "Marché Nocturne Kolontsaina", tag: "MiRay Kolontsaina", rating: 4.5, reviews: 15, loc: "Front de mer", img: "linear-gradient(135deg,#3d2b1f,#c98a3e)", desc: "Marché artisanal et culturel en soirée, produits et créateurs locaux.", price: "Entrée libre", verified: false, date: "Chaque dernier vendredi du mois" },
  { id: 10, cat: "formations", name: "MiRay Talenta — Initiation Couture", tag: "Formation • Talenta", rating: 4.8, reviews: 12, loc: "Toliara Centre", img: "linear-gradient(135deg,#4a3728,#b98b4e)", desc: "Atelier pratique pour transformer une passion couture en activité rémunérée.", price: "15 000 Ar / session", verified: true },
  { id: 11, cat: "formations", name: "Atelier Photographie Mobile", tag: "Formation • Talenta", rating: 4.6, reviews: 9, loc: "En ligne + présentiel", img: "linear-gradient(135deg,#22313f,#5b7c99)", desc: "Apprendre à photographier ses créations et son activité avec un smartphone.", price: "10 000 Ar / session", verified: false },
  { id: 12, cat: "services", name: "MiRay Consulting", tag: "Étude de marché & stratégie", rating: 5.0, reviews: 6, loc: "Toliara", img: "linear-gradient(135deg,#0d1321,#6b7280)", desc: "Accompagnement des porteurs de projet : étude de marché, stratégie commerciale, positionnement.", price: "Sur devis", verified: true },
];

const SHOP_ITEMS = [
  { id: 1, name: "Costume cosplay sur-mesure", seller: "Atelier Famadihana", price: "85 000 Ar", img: "linear-gradient(135deg,#3a2b52,#8a5cd6)" },
  { id: 2, name: "Collier raphia & bois flotté", seller: "Vahatra Craft", price: "12 000 Ar", img: "linear-gradient(135deg,#2b4a2f,#6fae65)" },
  { id: 3, name: "Peinture — Baobabs au couchant", seller: "Raketaka Design", price: "45 000 Ar", img: "linear-gradient(135deg,#7a2e2e,#c65b3f)" },
  { id: 4, name: "Coffret épices & vanille", seller: "Chez Miora", price: "18 000 Ar", img: "linear-gradient(135deg,#4a3728,#b98b4e)" },
  { id: 5, name: "Accessoire cosplay — set d'oreilles", seller: "Atelier Famadihana", price: "9 000 Ar", img: "linear-gradient(135deg,#22313f,#5b7c99)" },
  { id: 6, name: "Panier tressé raphia", seller: "Vahatra Craft", price: "14 000 Ar", img: "linear-gradient(135deg,#1d3557,#457b9d)" },
];

const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

// ---------------------------------------------------------------
// Les 7 pôles MiRay — accessibles depuis le bouton central
// ---------------------------------------------------------------
const POLES = [
  { key: "connect", label: "MiRay Connect", desc: "Recherche, carte et mise en relation", icon: Compass },
  { key: "shop", label: "MiRay Shop", desc: "Marketplace artisanale et locale", icon: ShoppingBag },
  { key: "show", label: "MiRay Show", desc: "Événements et laboratoire de marché", icon: PartyPopper },
  { key: "talenta", label: "MiRay Talenta", desc: "Formation et professionnalisation", icon: GraduationCap },
  { key: "kolontsaina", label: "MiRay Kolontsaina", desc: "Découverte culturelle et touristique", icon: Landmark },
  { key: "sakafo", label: "MiRay Sakafo", desc: "Gastronomie et producteurs locaux", icon: ChefHat },
  { key: "consulting", label: "MiRay Consulting", desc: "Études de marché et stratégie", icon: BarChart3 },
];

// Position déterministe (non géographique) de chaque fiche sur la carte stylisée MiRay Explorer
function mapPos(id) {
  const seedX = (id * 53) % 100;
  const seedY = (id * 31 + 17) % 100;
  return { x: 10 + (seedX / 100) * 80, y: 12 + (seedY / 100) * 68 };
}

// ---------------------------------------------------------------
// Actualités — sources nationales, internationales et locales (gratuites)
// ---------------------------------------------------------------
const NEWS_FILTERS = [
  { key: "toutes", label: "Toutes" },
  { key: "toliara", label: "Toliara" },
  { key: "madagascar", label: "Madagascar" },
  { key: "international", label: "International" },
  { key: "culture", label: "Culture & Geek" },
];

const NEWS = [
  { id: 1, scope: "toliara", source: "Toliara Actu", init: "TA", color: "#7a1f2b", title: "Marché nocturne Kolontsaina : forte affluence ce week-end", snippet: "Artisans et producteurs locaux ont vu leurs ventes progresser lors de la dernière édition du marché nocturne du front de mer.", time: "Il y a 2 h", free: true },
  { id: 2, scope: "madagascar", source: "Newsmada", init: "NM", color: "#1d3557", title: "Tourisme : légère hausse des arrivées internationales au 2ᵉ trimestre", snippet: "Les chiffres provisoires publiés par le ministère du Tourisme montrent une reprise progressive de la fréquentation.", time: "Il y a 4 h", free: true },
  { id: 3, scope: "madagascar", source: "Madagascar Tribune", init: "MT", color: "#2b4a2f", title: "Jeunesse et numérique : un nouveau programme d'appui à l'entrepreneuriat", snippet: "Un dispositif public-privé vise à accompagner les jeunes porteurs de projets dans les régions.", time: "Il y a 6 h", free: true },
  { id: 4, scope: "international", source: "RFI Afrique", init: "RFI", color: "#0d1321", title: "Océan Indien : coopération régionale renforcée sur l'économie bleue", snippet: "Plusieurs États de la région annoncent de nouveaux accords de coopération économique et environnementale.", time: "Il y a 7 h", free: true },
  { id: 5, scope: "international", source: "BBC Afrique", init: "BBC", color: "#c1121f", title: "Croissance des industries créatives en Afrique : un secteur à fort potentiel", snippet: "Un rapport souligne l'essor rapide des filières culturelles et créatives sur le continent.", time: "Il y a 9 h", free: true },
  { id: 6, scope: "toliara", source: "Radio Filiarivo", init: "RF", color: "#3a2b52", title: "Météo : ciel dégagé attendu toute la semaine sur Toliara", snippet: "Les prévisions locales annoncent des conditions favorables pour les activités touristiques et événementielles.", time: "Hier", free: true },
  { id: 7, scope: "culture", source: "Otaku Mada", init: "OM", color: "#8a5cd6", title: "Cosplay : la scène malgache de plus en plus visible sur les réseaux", snippet: "De jeunes créateurs locaux gagnent en notoriété grâce aux publications de leurs costumes faits main.", time: "Hier", free: true },
  { id: 8, scope: "culture", source: "K-pop Mada Community", init: "KM", color: "#d4af37", title: "Nouvelle vague de fans de K-pop à Madagascar", snippet: "Les groupes de danse amateurs se multiplient dans les grandes villes du pays, dont Toliara.", time: "Il y a 2 j", free: true },
  { id: 9, scope: "madagascar", source: "INSTAT Info", init: "IN", color: "#457b9d", title: "Indicateurs économiques : croissance stable au dernier trimestre", snippet: "Les services, le tourisme et les télécommunications restent les principaux moteurs de la croissance.", time: "Il y a 2 j", free: true },
];

// ---------------------------------------------------------------
// Small UI atoms
// ---------------------------------------------------------------
function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
      style={{
        backgroundColor: active ? C.gold : "rgba(255,255,255,0.06)",
        color: active ? C.navy : C.white,
        border: `1px solid ${active ? C.gold : C.navyLine}`,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star size={12} fill={C.gold} color={C.gold} />
      <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold">{rating}</span>
    </span>
  );
}

function ListingCard({ item, onClick, wide }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl overflow-hidden shrink-0 ${wide ? "w-[220px]" : "w-full"}`}
      style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}
    >
      <div className="h-24 relative" style={{ background: item.img }}>
        {item.verified && (
          <div className="absolute top-2 right-2 rounded-full p-1" style={{ backgroundColor: "rgba(13,19,33,0.7)" }}>
            <BadgeCheck size={14} color={C.gold} />
          </div>
        )}
        <div className="absolute bottom-2 left-2 rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(13,19,33,0.75)" }}>
          <Stars rating={item.rating} />
        </div>
      </div>
      <div className="p-2.5">
        <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold leading-tight truncate">{item.name}</div>
        <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px] mt-0.5 truncate">{item.tag}</div>
        <div className="flex items-center gap-1 mt-1.5" style={{ color: C.slate }}>
          <MapPin size={11} />
          <span className="text-[11px]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.loc}</span>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------
// Screens
// ---------------------------------------------------------------
function TopBar({ title, onBack, right }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="p-1 -ml-1 rounded-full" style={{ color: C.white }}>
            <ChevronLeft size={22} />
          </button>
        )}
        <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-base font-semibold">{title}</span>
      </div>
      {right}
    </div>
  );
}

function Logo({ size = 26, mono = false }) {
  const a = mono ? C.navy : C.gold;
  const b = mono ? C.navy : C.white;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="34" cy="24" r="10" fill={a} />
      <circle cx="68" cy="24" r="10" fill={b} />
      <path d="M16 64 C18 40, 36 36, 44 48 L50 58" stroke={a} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M84 64 C82 40, 64 36, 56 48 L50 58" stroke={b} strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="60" r="7" fill={a} />
    </svg>
  );
}

function HomeScreen({ onOpenListing, search, setSearch, category, setCategory, onOpenNews }) {
  const filtered = useMemo(() => {
    let l = LISTINGS;
    if (category) l = l.filter(i => i.cat === category);
    if (search.trim()) {
      const s = search.toLowerCase();
      l = l.filter(i => i.name.toLowerCase().includes(s) || i.tag.toLowerCase().includes(s) || i.loc.toLowerCase().includes(s));
    }
    return l;
  }, [search, category]);

  const featured = LISTINGS.filter(i => i.rating >= 4.7).slice(0, 5);
  const events = LISTINGS.filter(i => i.cat === "evenements");

  return (
    <div className="pb-4">
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <div>
              <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[10px] leading-none">Vous êtes à</div>
              <div className="flex items-center gap-1" style={{ color: C.white }}>
                <MapPin size={12} color={C.gold} />
                <span style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold">Toliara, Madagascar</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onOpenNews} className="p-2 rounded-full" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <Newspaper size={16} color={C.white} />
            </button>
            <button className="p-2 rounded-full relative" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <Bell size={16} color={C.white} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ backgroundColor: C.gold }} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
          <Search size={16} color={C.slate} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un lieu, un talent, un produit…"
            className="bg-transparent outline-none w-full text-sm"
            style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}
          />
          <Filter size={15} color={C.gold} />
        </div>

        <div className="mt-3 rounded-2xl p-3 flex items-center justify-between" style={{ background: `linear-gradient(120deg, ${C.navy}, #1c2947)`, border: `1px solid ${C.gold}` }}>
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} color={C.gold} />
              <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[11px] font-semibold uppercase tracking-wide">MiRay Show</span>
            </div>
            <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold mt-1 leading-tight">Asian Show Toliara<br/>revient en 2027</div>
          </div>
          <button
            onClick={() => onOpenListing(LISTINGS.find(i => i.id === 8))}
            className="text-xs font-semibold rounded-full px-3 py-2 shrink-0"
            style={{ backgroundColor: C.gold, color: C.navy, fontFamily: "Poppins, sans-serif" }}
          >
            Découvrir
          </button>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold mb-2">Catégories</div>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map(c => {
            const Icon = c.icon;
            const active = category === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCategory(active ? null : c.key)}
                className="rounded-xl py-3 flex flex-col items-center gap-1.5"
                style={{ backgroundColor: active ? C.gold : C.navySoft, border: `1px solid ${active ? C.gold : C.navyLine}` }}
              >
                <Icon size={17} color={active ? C.navy : C.gold} />
                <span className="text-[10.5px] font-medium" style={{ color: active ? C.navy : C.white, fontFamily: "Poppins, sans-serif" }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!category && !search && (
        <>
          <div className="mt-5 px-4 flex items-center justify-between">
            <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold">À la une</span>
            <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[11px] flex items-center gap-0.5">Tout voir <ChevronRight size={12} /></span>
          </div>
          <div className="mt-2 pl-4 flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {featured.map(item => (
              <ListingCard key={item.id} item={item} wide onClick={() => onOpenListing(item)} />
            ))}
            <div className="w-1 shrink-0" />
          </div>

          <div className="mt-5 px-4 flex items-center justify-between">
            <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold">Événements à ne pas manquer</span>
          </div>
          <div className="mt-2 px-4 flex flex-col gap-2">
            {events.map(item => (
              <button key={item.id} onClick={() => onOpenListing(item)} className="rounded-xl p-2.5 flex items-center gap-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                <div className="w-14 h-14 rounded-lg shrink-0" style={{ background: item.img }} />
                <div className="text-left min-w-0">
                  <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold truncate">{item.name}</div>
                  <div className="flex items-center gap-1 mt-1" style={{ color: C.slate }}>
                    <Clock size={11} />
                    <span className="text-[10.5px]" style={{ fontFamily: "Poppins, sans-serif" }}>{item.date}</span>
                  </div>
                </div>
                <ChevronRight size={16} color={C.slate} className="ml-auto shrink-0" />
              </button>
            ))}
          </div>
        </>
      )}

      {(category || search) && (
        <div className="mt-4 px-4">
          <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold mb-2">
            {category ? CAT_LABEL[category] : "Résultats"} <span style={{ color: C.slate }} className="font-normal">({filtered.length})</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {filtered.map(item => (
              <ListingCard key={item.id} item={item} onClick={() => onOpenListing(item)} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-8" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>
                Aucun résultat pour l'instant.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ExplorerScreen({ onOpenListing, search, setSearch, category, setCategory }) {
  const filtered = useMemo(() => {
    let l = LISTINGS.filter(i => i.cat !== "formations" && i.cat !== "services");
    if (category) l = l.filter(i => i.cat === category);
    if (search.trim()) {
      const s = search.toLowerCase();
      l = l.filter(i => i.name.toLowerCase().includes(s) || i.tag.toLowerCase().includes(s) || i.loc.toLowerCase().includes(s));
    }
    return l;
  }, [search, category]);
  const [pinned, setPinned] = useState(filtered[0]?.id ?? null);
  const active = LISTINGS.find(i => i.id === pinned) || filtered[0];

  return (
    <div className="pb-4 flex flex-col h-full">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
          <Search size={16} color={C.slate} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un lieu…"
            className="bg-transparent outline-none w-full text-sm"
            style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}
          />
          <Filter size={15} color={C.gold} />
        </div>
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <Pill active={!category} onClick={() => setCategory(null)}>Tout</Pill>
          {CATEGORIES.filter(c => c.key !== "formations" && c.key !== "services").map(c => (
            <Pill key={c.key} active={category === c.key} onClick={() => setCategory(category === c.key ? null : c.key)}>{c.label}</Pill>
          ))}
        </div>
      </div>

      {/* Carte stylisée MiRay — positions non géographiques, à but illustratif */}
      <div className="relative mx-4 mt-3 rounded-2xl overflow-hidden shrink-0" style={{ height: 240, backgroundColor: "#101a30", border: `1px solid ${C.navyLine}` }}>
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"h" + i} x1="0" y1={i * 12} x2="100" y2={i * 12} stroke={C.navyLine} strokeWidth="0.3" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"v" + i} x1={i * 12} y1="0" x2={i * 12} y2="100" stroke={C.navyLine} strokeWidth="0.3" />
          ))}
        </svg>
        <div className="absolute rounded-full" style={{ width: 14, height: 14, left: "48%", top: "46%", backgroundColor: "rgba(212,175,55,0.18)" }} />
        <div className="absolute rounded-full" style={{ width: 7, height: 7, left: "calc(48% + 3.5px)", top: "calc(46% + 3.5px)", backgroundColor: C.gold }} />
        {filtered.map(item => {
          const pos = mapPos(item.id);
          const isActive = active && item.id === active.id;
          return (
            <button
              key={item.id}
              onClick={() => setPinned(item.id)}
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="rounded-full p-1.5 shadow" style={{ backgroundColor: isActive ? C.gold : C.navySoft, border: `1.5px solid ${isActive ? C.goldSoft : C.navyLine}` }}>
                <MapPin size={13} color={isActive ? C.navy : C.gold} fill={isActive ? C.navy : "none"} />
              </div>
            </button>
          );
        })}
        <button className="absolute bottom-2.5 right-2.5 p-2 rounded-full" style={{ backgroundColor: "rgba(13,19,33,0.75)" }}>
          <Locate size={14} color={C.gold} />
        </button>
      </div>

      {active && (
        <button onClick={() => onOpenListing(active)} className="mx-4 mt-3 rounded-2xl p-2.5 flex items-center gap-3 text-left" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
          <div className="w-14 h-14 rounded-xl shrink-0" style={{ background: active.img }} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-[13px] font-semibold truncate">{active.name}</span>
              {active.verified && <BadgeCheck size={12} color={C.gold} className="shrink-0" />}
            </div>
            <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px] truncate mt-0.5">{active.tag}</div>
            <div className="flex items-center gap-1 mt-1"><Star size={10} fill={C.gold} color={C.gold} /><span className="text-[10.5px]" style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}>{active.rating}</span><span className="text-[10.5px]" style={{ color: C.slate }}>· {active.loc}</span></div>
          </div>
          <ChevronRight size={16} color={C.slate} className="shrink-0" />
        </button>
      )}

      <div className="px-4 mt-4">
        <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold mb-2">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""} autour de vous
        </div>
        <div className="flex flex-col gap-2">
          {filtered.map(item => (
            <button key={item.id} onClick={() => setPinned(item.id)} className="rounded-xl p-2 flex items-center gap-2.5 text-left"
              style={{ backgroundColor: active?.id === item.id ? "rgba(212,175,55,0.08)" : "transparent", border: `1px solid ${active?.id === item.id ? C.gold : "transparent"}` }}>
              <div className="w-9 h-9 rounded-lg shrink-0" style={{ background: item.img }} />
              <div className="min-w-0 flex-1">
                <div className="text-[11.5px] font-medium truncate" style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}>{item.name}</div>
                <div className="text-[10px] truncate" style={{ color: C.slate }}>{item.loc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PolesSheet({ onClose, onSelect }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(5,8,16,0.6)" }} onClick={onClose} />
      <div className="relative rounded-t-3xl p-5 pb-6" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}`, borderBottom: "none" }}>
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: C.navyLine }} />
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold">Les pôles MiRay</span>
          <button onClick={onClose}><X size={18} color={C.slate} /></button>
        </div>
        <p className="text-[11.5px] mb-4" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>Un seul écosystème, sept manières de créer des opportunités.</p>
        <div className="grid grid-cols-2 gap-2.5">
          {POLES.map(p => (
            <button key={p.key} onClick={() => onSelect(p.key)} className="rounded-2xl p-3 text-left flex flex-col gap-2" style={{ backgroundColor: C.navy, border: `1px solid ${C.navyLine}` }}>
              <p.icon size={18} color={C.gold} />
              <div>
                <div className="text-[11.5px] font-semibold" style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}>{p.label}</div>
                <div className="text-[10px] mt-0.5 leading-snug" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>{p.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsScreen() {
  const [filter, setFilter] = useState("toutes");
  const [open, setOpen] = useState(null);
  const filtered = filter === "toutes" ? NEWS : NEWS.filter(n => n.scope === filter);
  return (
    <div className="pb-4">
      <TopBar title="Actualités" right={<Newspaper size={18} color={C.gold} />} />
      <p className="px-4 text-xs" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>
        Nouvelles gratuites — médias nationaux, internationaux et locaux, agrégés dans MiRay.
      </p>
      <div className="mt-3 pl-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {NEWS_FILTERS.map(f => (
          <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>{f.label}</Pill>
        ))}
        <div className="w-1 shrink-0" />
      </div>

      <div className="px-4 mt-3 flex flex-col gap-2.5">
        {filtered.map(n => (
          <button key={n.id} onClick={() => setOpen(open === n.id ? null : n.id)} className="rounded-xl p-3 text-left" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: n.color }}>
                <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-[9px] font-bold">{n.init}</span>
              </div>
              <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10.5px] font-semibold">{n.source}</span>
              {n.free && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: "rgba(212,175,55,0.15)", color: C.gold, fontFamily: "Poppins, sans-serif" }}>Gratuit</span>
              )}
              <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[10px] ml-auto shrink-0">{n.time}</span>
            </div>
            <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-[12.5px] font-semibold mt-2 leading-snug">{n.title}</div>
            <p style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className={`text-[11px] mt-1 leading-relaxed ${open === n.id ? "" : "line-clamp-2"}`}>
              {n.snippet}
            </p>
            {open === n.id && (
              <div className="flex items-center gap-1 mt-2" style={{ color: C.gold }}>
                <Globe2 size={11} />
                <span className="text-[10px]" style={{ fontFamily: "Poppins, sans-serif" }}>Article relayé depuis {n.source} — accès gratuit</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ item, onBack, favs, toggleFav, onMessage }) {
  const [tab, setTab] = useState("apropos");
  const isFav = favs.includes(item.id);
  return (
    <div className="pb-6">
      <div className="h-44 relative" style={{ background: item.img }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,19,33,0.15), rgba(13,19,33,0.9))" }} />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <button onClick={onBack} className="p-2 rounded-full" style={{ backgroundColor: "rgba(13,19,33,0.6)" }}>
            <ChevronLeft size={18} color={C.white} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full" style={{ backgroundColor: "rgba(13,19,33,0.6)" }}>
              <Share2 size={16} color={C.white} />
            </button>
            <button onClick={() => toggleFav(item.id)} className="p-2 rounded-full" style={{ backgroundColor: "rgba(13,19,33,0.6)" }}>
              <Heart size={16} color={isFav ? C.gold : C.white} fill={isFav ? C.gold : "none"} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          {item.verified && (
            <div className="flex items-center gap-1 mb-1">
              <BadgeCheck size={13} color={C.gold} />
              <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10.5px] font-semibold uppercase tracking-wide">Profil vérifié MiRay</span>
            </div>
          )}
          <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold leading-tight">{item.name}</div>
          <div style={{ color: C.goldSoft, fontFamily: "Poppins, sans-serif" }} className="text-xs">{item.tag}</div>
        </div>
      </div>

      <div className="px-4 mt-3 flex items-center gap-3">
        <div className="flex items-center gap-1"><Star size={13} fill={C.gold} color={C.gold} /><span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold">{item.rating}</span><span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-xs">({item.reviews || 0} avis)</span></div>
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: C.navyLine }} />
        <div className="flex items-center gap-1"><MapPin size={13} color={C.slate} /><span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-xs">{item.loc}</span></div>
      </div>

      <div className="px-4 mt-4 flex gap-1 border-b" style={{ borderColor: C.navyLine }}>
        {[["apropos", "À propos"], ["produits", "Produits"], ["avis", "Avis"], ["contact", "Contact"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-3 py-2 text-xs font-medium relative" style={{ color: tab === k ? C.gold : C.slate, fontFamily: "Poppins, sans-serif" }}>
            {l}
            {tab === k && <div className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full" style={{ backgroundColor: C.gold }} />}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4">
        {tab === "apropos" && (
          <div>
            <p style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm leading-relaxed opacity-90">{item.desc}</p>
            <div className="mt-4 rounded-xl p-3 flex items-center justify-between" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-xs">Tarif indicatif</span>
              <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold">{item.price}</span>
            </div>
          </div>
        )}
        {tab === "produits" && (
          <div className="grid grid-cols-2 gap-2.5">
            {SHOP_ITEMS.filter(s => s.seller === item.name).length === 0 && (
              <div className="col-span-2 text-center py-6" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} >Aucun produit publié pour l'instant.</div>
            )}
            {SHOP_ITEMS.filter(s => s.seller === item.name).map(p => (
              <div key={p.id} className="rounded-xl overflow-hidden" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                <div className="h-20" style={{ background: p.img }} />
                <div className="p-2">
                  <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-[11px] font-medium truncate">{p.name}</div>
                  <div style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold mt-0.5">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "avis" && (
          <div className="flex flex-col gap-3">
            {[{n:"Nirina R.", t:"Expérience excellente, très professionnel et ponctuel.", r:5},{n:"Tojo A.", t:"Très satisfait, je recommande à tous ceux qui passent à Toliara.", r:4}].map((rv, i) => (
              <div key={i} className="rounded-xl p-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold">{rv.n}</span>
                  <div className="flex items-center gap-0.5">{Array.from({length:rv.r}).map((_,k)=><Star key={k} size={11} fill={C.gold} color={C.gold} />)}</div>
                </div>
                <p style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11.5px] mt-1.5">{rv.t}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "contact" && (
          <div className="flex flex-col gap-2.5">
            <div className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <Phone size={16} color={C.gold} />
              <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs">+261 34 00 000 00</span>
            </div>
            <div className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <MapPin size={16} color={C.gold} />
              <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs">{item.loc}, Toliara</span>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto px-4 py-3 flex gap-2" style={{ backgroundColor: C.navy, borderTop: `1px solid ${C.navyLine}` }}>
        <button onClick={() => onMessage(item)} className="flex-1 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold" style={{ backgroundColor: C.navySoft, color: C.white, border: `1px solid ${C.navyLine}`, fontFamily: "Poppins, sans-serif" }}>
          <MessageCircle size={14} /> Contacter
        </button>
        <button className="flex-1 rounded-xl py-2.5 text-xs font-semibold" style={{ backgroundColor: C.gold, color: C.navy, fontFamily: "Poppins, sans-serif" }}>
          Réserver / Commander
        </button>
      </div>
    </div>
  );
}

function ShopScreen({ onOpenListing }) {
  return (
    <div className="pb-4">
      <TopBar title="MiRay Shop" right={<ShoppingBag size={18} color={C.gold} />} />
      <p className="px-4 text-xs" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>
        Marketplace des créations artistiques, artisanales et culturelles locales.
      </p>
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        {SHOP_ITEMS.map(p => {
          const seller = LISTINGS.find(l => l.name === p.seller);
          return (
            <button key={p.id} onClick={() => seller && onOpenListing(seller)} className="rounded-xl overflow-hidden text-left" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <div className="h-24" style={{ background: p.img }} />
              <div className="p-2.5">
                <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-[11.5px] font-medium leading-tight">{p.name}</div>
                <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[10px] mt-1 truncate">{p.seller}</div>
                <div style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold mt-1">{p.price}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShowScreen({ onOpenListing }) {
  const events = LISTINGS.filter(i => i.cat === "evenements");
  return (
    <div className="pb-4">
      <TopBar title="MiRay Show" right={<PartyPopper size={18} color={C.gold} />} />
      <p className="px-4 text-xs" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>
        Événementiel et laboratoire de marché du réseau MiRay.
      </p>
      <div className="px-4 mt-3 rounded-xl p-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.gold}` }}>
        <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10.5px] font-semibold uppercase">Origine du projet</span>
        <p style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs mt-1 leading-relaxed opacity-90">
          Asian Show Toliara reste un actif fondateur de FALY MiRay : plus de 300 participants mobilisés, une première communauté active, et une preuve de capacité d'exécution locale.
        </p>
      </div>
      <div className="px-4 mt-3 flex flex-col gap-2.5">
        {events.map(item => (
          <button key={item.id} onClick={() => onOpenListing(item)} className="rounded-xl overflow-hidden text-left" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
            <div className="h-28 relative" style={{ background: item.img }}>
              <div className="absolute bottom-2 left-2 rounded-full px-2 py-0.5" style={{ backgroundColor: "rgba(13,19,33,0.75)" }}>
                <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10px] font-semibold">{item.date}</span>
              </div>
            </div>
            <div className="p-2.5">
              <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold">{item.name}</div>
              <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[10.5px] mt-1">{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MessagesListScreen({ conversations, onOpen }) {
  const sorted = [...conversations].sort((a, b) => b.lastAt - a.lastAt);
  return (
    <div className="pb-4">
      <TopBar title="Messages" right={<MessageCircle size={18} color={C.gold} />} />
      <p className="px-4 text-xs" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>
        Discutez directement avec les acteurs locaux — clients et professionnels se parlent en direct.
      </p>
      <div className="px-4 mt-3 flex flex-col gap-2">
        {sorted.length === 0 && (
          <div className="rounded-xl p-5 text-center" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
            <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px]">Touchez « Contacter » sur une fiche pour démarrer une conversation.</span>
          </div>
        )}
        {sorted.map(c => {
          const last = c.messages[c.messages.length - 1];
          return (
            <button key={c.id} onClick={() => onOpen(c.id)} className="rounded-xl p-3 flex items-center gap-3 text-left" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <div className="w-11 h-11 rounded-full shrink-0" style={{ background: c.actorImg }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold truncate">{c.actorName}</span>
                  <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[9.5px] shrink-0 ml-1">{last?.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {last?.from === "me" && <CheckCheck size={11} color={C.gold} />}
                  <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px] truncate">{last?.text}</span>
                </div>
              </div>
              {c.unread > 0 && (
                <div className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: C.gold, width: 18, height: 18 }}>
                  <span style={{ color: C.navy, fontFamily: "Poppins, sans-serif" }} className="text-[9px] font-bold">{c.unread}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatScreen({ conversation, onBack, onSend }) {
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    onSend(conversation.id, text.trim());
    setText("");
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2" style={{ borderBottom: `1px solid ${C.navyLine}` }}>
        <button onClick={onBack} className="p-1 -ml-1" style={{ color: C.white }}><ChevronLeft size={22} /></button>
        <div className="w-8 h-8 rounded-full shrink-0" style={{ background: conversation.actorImg }} />
        <div className="min-w-0">
          <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold truncate">{conversation.actorName}</div>
          <div style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10px]">En ligne sur MiRay</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5" style={{ scrollbarWidth: "none" }}>
        {conversation.messages.map((m, i) => (
          <div key={i} className={`max-w-[75%] rounded-2xl px-3 py-2 ${m.from === "me" ? "self-end" : "self-start"}`}
            style={{ backgroundColor: m.from === "me" ? C.gold : C.navySoft, border: m.from === "me" ? "none" : `1px solid ${C.navyLine}` }}>
            <p style={{ color: m.from === "me" ? C.navy : C.white, fontFamily: "Poppins, sans-serif" }} className="text-[12.5px] leading-snug">{m.text}</p>
            <div className={`flex items-center gap-1 mt-1 ${m.from === "me" ? "justify-end" : ""}`}>
              <span style={{ color: m.from === "me" ? "rgba(13,19,33,0.6)" : C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[9px]">{m.time}</span>
              {m.from === "me" && <CheckCheck size={11} color="rgba(13,19,33,0.6)" />}
            </div>
          </div>
        ))}
      </div>

      <div className="px-3 py-3 flex items-center gap-2" style={{ borderTop: `1px solid ${C.navyLine}`, backgroundColor: C.navy }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Écrire un message…"
          className="flex-1 rounded-full px-4 py-2.5 text-xs outline-none"
          style={{ backgroundColor: C.navySoft, color: C.white, border: `1px solid ${C.navyLine}`, fontFamily: "Poppins, sans-serif" }}
        />
        <button onClick={send} className="rounded-full p-2.5 shrink-0" style={{ backgroundColor: C.gold }}>
          <Send size={15} color={C.navy} />
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ favs, onOpenListing }) {
  const favItems = LISTINGS.filter(i => favs.includes(i.id));
  const [cloudImage, setCloudImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const testCloudinary = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setUploadError("");
      const result = await uploadImage(file);
      setCloudImage(result.url);
    } catch (err) {
      setUploadError(err?.message || "Échec de l’upload.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  const menu = [
    { label: "Mes réservations", icon: CalendarDays },
    { label: "Mes commandes MiRay Shop", icon: ShoppingBag },
    { label: "MiRay Talenta — mon parcours", icon: GraduationCap },
    { label: "Paramètres", icon: Wrench },
  ];
  return (
    <div className="pb-4">
      <TopBar title="Mon profil" />
      <div className="px-4 flex items-center gap-3 mt-1">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: C.gold }}>
          <User size={24} color={C.navy} />
        </div>
        <div>
          <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold">Bienvenue sur MiRay</div>
          <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px]">Toliara, Madagascar</div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold mb-2 flex items-center gap-1.5"><Heart size={13} color={C.gold} /> Mes favoris ({favItems.length})</div>
        {favItems.length === 0 ? (
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
            <span style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px]">Touchez le cœur sur un profil pour l'ajouter ici.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {favItems.map(item => <ListingCard key={item.id} item={item} onClick={() => onOpenListing(item)} />)}
          </div>
        )}
      </div>

      <div className="px-4 mt-4 flex flex-col gap-2">
        {menu.map((m, i) => {
          const Icon = m.icon;
          return (
            <button key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
              <Icon size={16} color={C.gold} />
              <span style={{ color: C.white, fontFamily: "Poppins, sans-serif" }} className="text-xs flex-1 text-left">{m.label}</span>
              <ChevronRight size={14} color={C.slate} />
            </button>
          );
        })}
      </div>

      <div className="px-4 mt-4 rounded-xl p-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.gold}55` }}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold" style={{ color: C.white, fontFamily: "Poppins, sans-serif" }}>Test photo Cloudinary</div>
            <div className="text-[10px] mt-0.5" style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }}>JPG, PNG ou WEBP · 5 Mo max</div>
          </div>
          <label className="rounded-lg px-3 py-2 text-[10.5px] font-semibold cursor-pointer" style={{ backgroundColor: C.gold, color: C.navy, fontFamily: "Poppins, sans-serif" }}>
            {uploading ? "Envoi…" : "Choisir"}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={testCloudinary} disabled={uploading} className="hidden" />
          </label>
        </div>
        {uploadError && <div className="text-[10px] mt-2" style={{ color: "#fca5a5", fontFamily: "Poppins, sans-serif" }}>{uploadError}</div>}
        {cloudImage && (
          <div className="mt-3">
            <img src={cloudImage} alt="Test Cloudinary" className="w-full h-32 object-cover rounded-xl" />
            <div className="text-[9.5px] mt-1.5 break-all" style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }}>✓ Image envoyée sur Cloudinary</div>
          </div>
        )}
      </div>

      <div className="px-4 mt-4 rounded-xl p-3" style={{ backgroundColor: C.navySoft, border: `1px solid ${C.navyLine}` }}>
        <span style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }} className="text-[10.5px] font-semibold uppercase">Ensemble, créons des opportunités</span>
        <p style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-[11px] mt-1 leading-relaxed">
          FALY MiRay relie l'offre locale — talents, commerçants, restaurants, hôtels, événements — à celles et ceux qui la recherchent.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// App shell
// ---------------------------------------------------------------
// Barre de navigation à 5 entrées, alignée sur la planche de marque validée :
// Accueil · Explorer · [MiRay — bouton central] · Messages · Profil.
// Boutique, Show, Talenta, Kolontsaina, Sakafo et Consulting sont réunis
// dans la feuille "Pôles MiRay" ouverte par le bouton central.
const TABS_LEFT = [
  { key: "home", label: "Accueil", icon: Home },
  { key: "explorer", label: "Explorer", icon: Compass },
];
const TABS_RIGHT = [
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "profile", label: "Profil", icon: User },
];

const INITIAL_CONVERSATIONS = [
  {
    id: "orAura", actorName: "Or'Aura", actorImg: LISTINGS[0].img, unread: 1, lastAt: 3,
    messages: [
      { from: "actor", text: "Bonjour ! Merci pour votre message, comment pouvons-nous vous aider ?", time: "10:12" },
      { from: "me", text: "Bonjour, avez-vous une table disponible ce samedi soir ?", time: "10:14" },
      { from: "actor", text: "Oui, il nous reste de la place à partir de 19h. Combien de personnes ?", time: "10:16" },
    ],
  },
  {
    id: "atelierFamadihana", actorName: "Atelier Famadihana", actorImg: LISTINGS[3].img, unread: 0, lastAt: 1,
    messages: [
      { from: "me", text: "Bonjour, est-il possible de commander un costume sur mesure ?", time: "Hier" },
      { from: "actor", text: "Bonjour ! Bien sûr, dites-m'en plus sur le personnage et vos mesures.", time: "Hier" },
    ],
  },
];

export default function FalyMirayPrototype() {
  const [tab, setTab] = useState("home");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [favs, setFavs] = useState([1, 4]);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleFav = (id) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const openListing = (item) => setSelected(item);
  const closeListing = () => setSelected(null);

  const selectPole = (key) => {
    setSheetOpen(false);
    if (key === "connect") { setTab("explorer"); setCategory(null); setSearch(""); }
    else if (key === "shop") { setTab("shop"); }
    else if (key === "show") { setTab("show"); }
    else if (key === "talenta") { setTab("home"); setCategory("formations"); setSearch(""); }
    else if (key === "kolontsaina") { setTab("explorer"); setCategory(null); setSearch("Kolontsaina"); }
    else if (key === "sakafo") { setTab("explorer"); setCategory("restaurants"); setSearch(""); }
    else if (key === "consulting") { openListing(LISTINGS.find(i => i.id === 12)); }
  };

  const startConversation = (item) => {
    const id = String(item.id);
    setConversations(prev => {
      if (prev.find(c => c.id === id)) return prev;
      return [...prev, {
        id, actorName: item.name, actorImg: item.img, unread: 0, lastAt: Date.now(),
        messages: [{ from: "actor", text: `Bonjour, bienvenue chez ${item.name} ! Comment pouvons-nous vous aider ?`, time: "Maintenant" }],
      }];
    });
    setSelected(null);
    setActiveConvId(id);
    setTab("messages");
  };

  const sendMessage = (convId, text) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      return { ...c, lastAt: Date.now(), messages: [...c.messages, { from: "me", text, time: "Maintenant" }] };
    }));
    // Réponse simulée de l'acteur pour illustrer l'échange en direct
    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id !== convId) return c;
        return { ...c, lastAt: Date.now(), messages: [...c.messages, { from: "actor", text: "Message reçu, nous revenons vers vous rapidement !", time: "Maintenant" }] };
      }));
    }, 1100);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" style={{ backgroundColor: C.ivory }}>
      <style>{FONT_IMPORT}</style>

      <div className="hidden md:flex flex-col items-start max-w-xs mr-10 gap-4">
        <Logo size={40} />
        <div>
          <div style={{ color: C.navy, fontFamily: "Poppins, sans-serif" }} className="text-2xl font-extrabold leading-tight">FALY<br/><span style={{ color: C.gold }}>MiRay</span></div>
          <div style={{ color: C.slate, fontFamily: "Poppins, sans-serif" }} className="text-xs mt-2 tracking-wide uppercase">Ensemble, créons des opportunités</div>
        </div>
        <p style={{ color: C.navy, fontFamily: "Poppins, sans-serif" }} className="text-sm leading-relaxed opacity-80">
          Prototype cliquable de <strong>MiRay Connect</strong> — l'application mobile qui relie l'offre locale de Toliara (restaurants, artisans, hôtels, événements, talents) à celles et ceux qui la recherchent.
        </p>
        <div className="flex flex-col gap-1.5 text-xs" style={{ color: C.navy, fontFamily: "Poppins, sans-serif" }}>
          <div>→ Testez l'onglet Explorer : recherche, catégories et carte MiRay</div>
          <div>→ Ouvrez une fiche, puis « Contacter » pour discuter en direct</div>
          <div>→ Touchez le bouton central pour parcourir les 7 pôles MiRay</div>
          <div>→ Consultez les Actus depuis l'icône journal de l'accueil</div>
        </div>
      </div>

      {/* Phone frame */}
      <div className="relative rounded-[2.2rem] p-2.5 shadow-2xl" style={{ backgroundColor: "#050810" }}>
        <div className="w-[360px] h-[760px] rounded-[1.7rem] overflow-hidden relative flex flex-col" style={{ backgroundColor: C.navy }}>
          {/* notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 rounded-b-2xl z-20" style={{ backgroundColor: "#050810" }} />

          <div className={`flex-1 ${activeConvId && tab === "messages" ? "overflow-hidden" : "overflow-y-auto"}`} style={{ scrollbarWidth: "none" }}>
            {selected ? (
              <DetailScreen item={selected} onBack={closeListing} favs={favs} toggleFav={toggleFav} onMessage={startConversation} />
            ) : tab === "messages" && activeConvId ? (
              <ChatScreen
                conversation={conversations.find(c => c.id === activeConvId)}
                onBack={() => setActiveConvId(null)}
                onSend={sendMessage}
              />
            ) : (
              <>
                {tab === "home" && <HomeScreen onOpenListing={openListing} search={search} setSearch={setSearch} category={category} setCategory={setCategory} onOpenNews={() => setTab("news")} />}
                {tab === "explorer" && <ExplorerScreen onOpenListing={openListing} search={search} setSearch={setSearch} category={category} setCategory={setCategory} />}
                {tab === "news" && <NewsScreen />}
                {tab === "shop" && <ShopScreen onOpenListing={openListing} />}
                {tab === "show" && <ShowScreen onOpenListing={openListing} />}
                {tab === "messages" && <MessagesListScreen conversations={conversations} onOpen={setActiveConvId} />}
                {tab === "profile" && <ProfileScreen favs={favs} onOpenListing={openListing} />}
              </>
            )}

            {sheetOpen && <PolesSheet onClose={() => setSheetOpen(false)} onSelect={selectPole} />}
          </div>

          {tab === "news" && !selected && (
            <button onClick={() => setTab("home")} className="absolute top-3 left-3 z-30 p-2 rounded-full" style={{ backgroundColor: "rgba(13,19,33,0.7)" }}>
              <ChevronLeft size={18} color={C.white} />
            </button>
          )}

          {!selected && !(activeConvId && tab === "messages") && (
            <div className="flex items-center justify-around py-2 shrink-0 relative" style={{ backgroundColor: C.navySoft, borderTop: `1px solid ${C.navyLine}` }}>
              {TABS_LEFT.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button key={t.key} onClick={() => { setTab(t.key); setActiveConvId(null); }} className="flex flex-col items-center gap-0.5 px-1.5">
                    <Icon size={17} color={active ? C.gold : C.slate} />
                    <span className="text-[8.5px] font-medium" style={{ color: active ? C.gold : C.slate, fontFamily: "Poppins, sans-serif" }}>{t.label}</span>
                    {active && <div className="w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
                  </button>
                );
              })}

              <button onClick={() => setSheetOpen(true)} className="flex flex-col items-center -mt-6">
                <span className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: C.gold, border: `3px solid ${C.navySoft}` }}>
                  <Logo size={22} mono />
                </span>
                <span className="text-[8px] font-medium mt-0.5" style={{ color: C.gold, fontFamily: "Poppins, sans-serif" }}>Pôles</span>
              </button>

              {TABS_RIGHT.map(t => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <button key={t.key} onClick={() => { setTab(t.key); if (t.key !== "messages") setActiveConvId(null); }} className="flex flex-col items-center gap-0.5 px-1.5 relative">
                    <Icon size={17} color={active ? C.gold : C.slate} />
                    {t.key === "messages" && conversations.some(c => c.unread > 0) && (
                      <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
                    )}
                    <span className="text-[8.5px] font-medium" style={{ color: active ? C.gold : C.slate, fontFamily: "Poppins, sans-serif" }}>{t.label}</span>
                    {active && <div className="w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

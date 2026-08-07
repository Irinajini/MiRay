import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ShieldCheck, LogIn, Eye, LogOut, Users, Store, CalendarDays, ShoppingBag } from 'lucide-react';
import FalyMirayUserApp from './FalyMirayUserApp.jsx';
import Landing from './Landing.jsx';
import { auth, db, firebaseReady, googleProvider } from './firebase.js';

const C = { navy:'#0D1321', navySoft:'#161F33', gold:'#D4AF37', white:'#FFFFFF', slate:'#6B7280', ivory:'#F7F4EE' };

function Login({ onPreview }) {
  const google = async () => {
    if (!firebaseReady) return alert("Configuration Firebase manquante.");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
      alert("Connexion Google impossible. Vérifiez que Google est activé dans Firebase Authentication et que le domaine du site est autorisé.");
    }
  };
  const guest = async () => {
    if (!firebaseReady) return onPreview();
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.warn("Anonymous Auth indisponible, passage en mode aperçu.", error);
      onPreview();
    }
  };
  return <div className="min-h-screen flex items-center justify-center p-5" style={{background:C.navy}}>
    <div className="w-full max-w-sm rounded-3xl p-6" style={{background:C.navySoft,border:`1px solid ${C.gold}55`}}>
      <img src="/faly-miray-logo.png" alt="FALY MiRay" className="w-44 mx-auto rounded-2xl" />
      <h1 className="text-2xl font-bold mt-5 text-center">FALY <span style={{color:C.gold}}>MiRay</span></h1>
      <p className="text-sm text-center mt-2" style={{color:C.slate}}>Une seule identité utilisateur : découvrir, acheter, publier, vendre et trouver des opportunités.</p>
      <button onClick={google} className="w-full mt-5 rounded-xl py-3 font-semibold flex items-center justify-center gap-2" style={{background:C.gold,color:C.navy}}><LogIn size={18}/> Continuer avec Google</button>
      <button onClick={guest} className="w-full mt-3 rounded-xl py-3 font-medium flex items-center justify-center gap-2" style={{border:`1px solid #27324a`,color:C.white}}><Eye size={18}/> Mode découverte</button>
    </div>
  </div>;
}

function AdminDashboard({ user }) {
  const cards = [
    ['Utilisateurs', '—', Users], ['Pages professionnelles', '—', Store], ['Produits', '—', ShoppingBag], ['Événements', '—', CalendarDays],
  ];
  return <div className="min-h-screen p-6" style={{background:C.ivory,color:C.navy}}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div><div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck color={C.gold}/> Administration FALY MiRay</div><p className="text-sm mt-1" style={{color:C.slate}}>Validation, modération et pilotage de l'écosystème.</p></div>
        <button onClick={()=>signOut(auth)} className="px-4 py-2 rounded-xl flex items-center gap-2" style={{background:C.navy,color:C.white}}><LogOut size={16}/> Déconnexion</button>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-8">{cards.map(([label,value,Icon])=><div key={label} className="rounded-2xl bg-white p-5 shadow-sm"><Icon color={C.gold}/><div className="text-2xl font-bold mt-3">{value}</div><div className="text-sm" style={{color:C.slate}}>{label}</div></div>)}</div>
      <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm"><h2 className="font-semibold">MVP Admin</h2><p className="text-sm mt-2" style={{color:C.slate}}>Le socle est prêt pour brancher les collections Firestore : users, pages, products, opportunities, events, reports et transactions. Les droits admin doivent être attribués via Custom Claims, jamais par un champ modifiable côté client.</p></div>
    </div>
  </div>;
}

export default function App() {
  const [user, setUser] = useState(undefined);
  const [admin, setAdmin] = useState(false);
  const [preview, setPreview] = useState(false);
  const [pastLanding, setPastLanding] = useState(false);

  useEffect(() => {
    if (!firebaseReady) { setUser(null); return; }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) { setAdmin(false); return; }
      const token = await u.getIdTokenResult(true);
      setAdmin(token.claims.admin === true);
      if (!u.isAnonymous) {
        await setDoc(doc(db,'users',u.uid), { uid:u.uid, displayName:u.displayName||'', email:u.email||'', photoURL:u.photoURL||'', updatedAt:serverTimestamp() }, { merge:true });
      }
    });
  }, []);

  if (user === undefined) return <div className="min-h-screen grid place-items-center" style={{background:C.navy}}>Chargement…</div>;
  if (!user && !preview && !pastLanding) return <Landing onEnter={()=>setPastLanding(true)} />;
  if (!user && !preview) return <Login onPreview={()=>setPreview(true)} />;
  if (admin) return <AdminDashboard user={user} />;
  return <FalyMirayUserApp />;
}

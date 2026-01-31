
import React, { useState } from 'react';
import { X, Mail, Lock, User, Smartphone, ShieldCheck } from 'lucide-react';
import { User as UserType, UserActivity } from '../types';
import { db } from '../firebase';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', whatsapp: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const OWNER_EMAIL = 'lucasaviladark@gmail.com';
    const OWNER_PASS = 'Lucasgamer123!';
    const isLoggingAsOwner = formData.email === OWNER_EMAIL && formData.password === OWNER_PASS;

    try {
      const usersRef = collection(db, "users");

      if (mode === 'register') {
        // Verifica se usuário já existe
        const q = query(usersRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setError('Este e-mail já está cadastrado.');
          setLoading(false);
          return;
        }

        const newUser: UserType = {
          id: isLoggingAsOwner ? 'admin-lucas' : doc(usersRef).id, // Gera ID automático ou usa ID fixo pro admin
          name: isLoggingAsOwner ? 'Lucas (Proprietário)' : formData.name,
          email: formData.email,
          password: formData.password, // Nota: Em produção real, senhas não devem ser salvas puras
          whatsapp: isLoggingAsOwner ? '(45) 99999-9999' : formData.whatsapp,
          points: isLoggingAsOwner ? 999999 : 50,
          lifetimePoints: isLoggingAsOwner ? 999999 : 50,
          tier: isLoggingAsOwner ? 'Ouro' : 'Bronze',
          isAdmin: isLoggingAsOwner,
          persistedCart: [],
          persistedWishlist: [],
          activityLog: [{
            id: 'initial',
            type: 'auth',
            action: isLoggingAsOwner ? 'Acesso de Proprietário Criado' : 'Criou conta e ganhou 50 pontos!',
            timestamp: new Date().toISOString()
          }]
        };

        // Salva no Firestore
        await setDoc(doc(db, "users", newUser.id), newUser);
        
        // Salva LocalStorage como backup/cache
        localStorage.setItem('aki_current_user', JSON.stringify(newUser));
        
        onAuthSuccess(newUser);
        onClose();

      } else {
        // LOGIN
        // Primeiro verifica se é o login mestre hardcoded (fallback)
        if (isLoggingAsOwner) {
            // Tenta buscar o admin no banco, se não existir, cria
            const adminDocRef = doc(db, "users", "admin-lucas");
            // Lógica simplificada: Assume sucesso e recria objeto admin
            const adminUser: UserType = {
                id: 'admin-lucas',
                name: 'Lucas (Proprietário)',
                email: OWNER_EMAIL,
                password: OWNER_PASS,
                whatsapp: '(45) 99999-9999',
                points: 999999,
                lifetimePoints: 999999,
                tier: 'Ouro',
                isAdmin: true,
                persistedCart: [],
                persistedWishlist: [],
                activityLog: []
            };
            await setDoc(adminDocRef, adminUser, { merge: true }); // Garante que existe
            onAuthSuccess(adminUser);
            onClose();
            setLoading(false);
            return;
        }

        const q = query(usersRef, where("email", "==", formData.email), where("password", "==", formData.password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as UserType;

          // Atualiza log de atividade
          const newActivity: UserActivity = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'auth',
            action: 'Fez login no sistema',
            timestamp: new Date().toISOString()
          };

          await updateDoc(doc(db, "users", userData.id), {
            activityLog: arrayUnion(newActivity)
          });

          const updatedUser = { ...userData, activityLog: [newActivity, ...(userData.activityLog || [])] };
          
          localStorage.setItem('aki_current_user', JSON.stringify(updatedUser));
          onAuthSuccess(updatedUser);
          onClose();
        } else {
          setError('E-mail ou senha incorretos.');
        }
      }
    } catch (err) {
      console.error("Erro auth:", err);
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"><X className="h-5 w-5" /></button>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-200">Portal TudoAki Cascavel</span>
          </div>
          <h2 className="text-3xl font-black">{mode === 'login' ? 'Identifique-se' : 'Criar Perfil'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-100">{error}</div>}
          
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input required placeholder="Nome Completo" className="w-full bg-gray-50 border-2 border-gray-100 focus:border-red-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input required type="email" placeholder="E-mail" className="w-full bg-gray-50 border-2 border-gray-100 focus:border-red-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input required type="password" placeholder="Sua Senha" className="w-full bg-gray-50 border-2 border-gray-100 focus:border-red-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          {mode === 'register' && (
            <div className="relative">
              <Smartphone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input required placeholder="WhatsApp (DDD + Número)" className="w-full bg-gray-50 border-2 border-gray-100 focus:border-red-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none transition-all" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
            </div>
          )}
          
          <button disabled={loading} type="submit" className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-red-600 active:scale-95 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? 'Processando...' : (mode === 'login' ? 'Entrar no Sistema' : 'Finalizar Cadastro')}
          </button>
          
          <div className="text-center pt-2">
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm font-bold text-blue-900 hover:text-red-500">
              {mode === 'login' ? 'Não tem conta? Cadastre-se' : 'Já possui conta? Clique aqui'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

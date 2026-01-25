
import React, { useState } from 'react';
import { X, Mail, Lock, User, Smartphone, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { User as UserType, UserActivity } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', whatsapp: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('aki_users') || '[]');

    // Lógica especial para o Dono
    const isAdminAccount = formData.email === 'lucasaviladark@gmail.com' && formData.password === 'Lucasgamer123!';

    if (mode === 'register') {
      if (users.find((u: any) => u.email === formData.email)) {
        setError('Este e-mail já está cadastrado.');
        return;
      }

      const newUser: UserType = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        whatsapp: formData.whatsapp,
        points: 50,
        lifetimePoints: 50,
        tier: 'Bronze',
        isAdmin: isAdminAccount,
        persistedCart: [],
        persistedWishlist: [],
        activityLog: [{
          id: 'initial',
          type: 'auth',
          action: isAdminAccount ? 'Login de Proprietário Ativado' : 'Criou conta e ganhou 50 pontos de boas-vindas!',
          timestamp: new Date().toISOString()
        }]
      };

      users.push(newUser);
      localStorage.setItem('aki_users', JSON.stringify(users));
      localStorage.setItem('aki_current_user', JSON.stringify(newUser));
      onAuthSuccess(newUser);
      onClose();
    } else {
      let user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      // Se for o admin tentando logar mas ainda não registrou no "banco de dados" local
      if (!user && isAdminAccount) {
        user = {
          id: 'admin-lucas',
          name: 'Lucas (Proprietário)',
          email: formData.email,
          password: formData.password,
          whatsapp: 'Administrador',
          points: 999999,
          lifetimePoints: 999999,
          tier: 'Ouro',
          isAdmin: true,
          persistedCart: [],
          persistedWishlist: [],
          activityLog: [{ id: 'admin-init', type: 'auth', action: 'Acesso Administrativo', timestamp: new Date().toISOString() }]
        };
        users.push(user);
        localStorage.setItem('aki_users', JSON.stringify(users));
      }

      if (user) {
        const loginActivity: UserActivity = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'auth',
          action: user.isAdmin ? 'Acessou o Painel Administrativo' : 'Fez login no sistema',
          timestamp: new Date().toISOString()
        };
        user.activityLog = [loginActivity, ...(user.activityLog || [])].slice(0, 50);
        localStorage.setItem('aki_users', JSON.stringify(users.map((u: any) => u.id === user.id ? user : u)));
        localStorage.setItem('aki_current_user', JSON.stringify(user));
        onAuthSuccess(user);
        onClose();
      } else {
        setError('E-mail ou senha incorretos.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"><X className="h-5 w-5" /></button>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Acesso Restrito</span>
          </div>
          <h2 className="text-3xl font-black">{mode === 'login' ? 'Bem-vindo!' : 'Nova Conta'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-100">{error}</div>}
          {mode === 'register' && (
            <input required placeholder="Nome Completo" className="w-full bg-gray-50 border-2 rounded-2xl px-5 py-3" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          )}
          <input required type="email" placeholder="E-mail" className="w-full bg-gray-50 border-2 rounded-2xl px-5 py-3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input required type="password" placeholder="Senha" className="w-full bg-gray-50 border-2 rounded-2xl px-5 py-3" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          {mode === 'register' && (
            <input required placeholder="WhatsApp" className="w-full bg-gray-50 border-2 rounded-2xl px-5 py-3" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
          )}
          <button type="submit" className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-red-600 transition-all">
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
          <div className="text-center pt-2">
            <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm font-bold text-blue-900">
              {mode === 'login' ? 'Criar nova conta' : 'Já tenho conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;

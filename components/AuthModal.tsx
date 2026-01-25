
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

    // Credenciais mestras do Proprietário
    const OWNER_EMAIL = 'lucasaviladark@gmail.com';
    const OWNER_PASS = 'Lucasgamer123!';
    const isLoggingAsOwner = formData.email === OWNER_EMAIL && formData.password === OWNER_PASS;

    if (mode === 'register') {
      if (users.find((u: any) => u.email === formData.email)) {
        setError('Este e-mail já está cadastrado.');
        return;
      }

      const newUser: UserType = {
        id: isLoggingAsOwner ? 'admin-lucas' : Math.random().toString(36).substr(2, 9),
        name: isLoggingAsOwner ? 'Lucas (Proprietário)' : formData.name,
        email: formData.email,
        password: formData.password,
        whatsapp: isLoggingAsOwner ? '(45) 99999-9999' : formData.whatsapp,
        points: isLoggingAsOwner ? 999999 : 50,
        lifetimePoints: isLoggingAsOwner ? 999999 : 50,
        tier: isLoggingAsOwner ? 'Ouro' : 'Bronze',
        isAdmin: isLoggingAsOwner, // Ativa permissões se os dados baterem
        persistedCart: [],
        persistedWishlist: [],
        activityLog: [{
          id: 'initial',
          type: 'auth',
          action: isLoggingAsOwner ? 'Acesso de Proprietário Criado' : 'Criou conta e ganhou 50 pontos!',
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
      
      // Caso especial: Se os dados baterem com o dono mas ele não estiver no "banco" local ainda
      if (!user && isLoggingAsOwner) {
        user = {
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
          activityLog: [{ id: 'admin-init', type: 'auth', action: 'Login Administrativo Forçado', timestamp: new Date().toISOString() }]
        };
        users.push(user);
        localStorage.setItem('aki_users', JSON.stringify(users));
      }

      if (user) {
        // Garantia extra: se logar com os dados de dono, força o isAdmin como true no objeto da sessão
        if (isLoggingAsOwner) {
          user.isAdmin = true;
          user.tier = 'Ouro';
        }

        const loginActivity: UserActivity = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'auth',
          action: user.isAdmin ? 'Acessou o Painel Administrativo' : 'Fez login no sistema',
          timestamp: new Date().toISOString()
        };
        
        user.activityLog = [loginActivity, ...(user.activityLog || [])].slice(0, 50);
        
        // Atualiza o banco de dados local com o estado mais recente
        const updatedUsers = users.map((u: any) => u.id === user.id ? user : u);
        localStorage.setItem('aki_users', JSON.stringify(updatedUsers));
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
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Portal TudoAki Cascavel</span>
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
          
          <button type="submit" className="w-full bg-red-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-red-600 active:scale-95 transition-all mt-4">
            {mode === 'login' ? 'Entrar no Sistema' : 'Finalizar Cadastro'}
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

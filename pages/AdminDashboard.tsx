
import React, { useMemo } from 'react';
import { User as UserIcon, Smartphone, Mail, Calendar, Users, ShoppingBag, TrendingUp, ArrowLeft, MessageCircle, Copy } from 'lucide-react';
import { User } from '../types';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ currentUser }: { currentUser: User | null }) => {
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const allUsers: User[] = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('aki_users') || '[]');
    // Filtra para não mostrar o próprio admin na lista de clientes, se preferir
    return users.filter((u: any) => u.email !== 'lucasaviladark@gmail.com');
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado para a área de transferência!');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
              <ArrowLeft className="h-3 w-3" /> Painel da Minha Conta
            </Link>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">Gestão de Clientes Cascavel</h1>
            <p className="text-gray-500 font-medium">Você tem acesso aos dados sensíveis de {allUsers.length} clientes.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-2xl text-red-500"><TrendingUp /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Faturamento Base</p>
              <p className="text-sm font-bold text-green-600">Sincronizado via LocalDB</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Users size={120} /></div>
            <p className="text-blue-200 text-xs font-black uppercase mb-2">Clientes</p>
            <h2 className="text-5xl font-black">{allUsers.length}</h2>
          </div>
          {/* Outros cards informativos poderiam entrar aqui */}
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-black text-blue-900 flex items-center gap-3">
              <UserIcon className="text-red-500" /> Banco de Dados de Usuários
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Nome do Cliente</th>
                  <th className="px-8 py-5">WhatsApp / Contato</th>
                  <th className="px-8 py-5">E-mail</th>
                  <th className="px-8 py-5">Nível Atual</th>
                  <th className="px-8 py-5 text-center">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center font-black shadow-lg">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-blue-900 group-hover:text-red-500 transition-colors">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                          <Smartphone className="h-3 w-3 text-green-600" />
                          {user.whatsapp}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(user.whatsapp)}
                          className="p-1.5 text-gray-400 hover:text-blue-900 transition-colors"
                          title="Copiar Número"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-medium text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                        ${user.tier === 'Ouro' ? 'bg-amber-100 text-amber-600' : 
                          user.tier === 'Prata' ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-600'}`}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <a 
                          href={`https://wa.me/55${user.whatsapp.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20"
                        >
                          <MessageCircle className="h-4 w-4" /> Chamar Agora
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allUsers.length === 0 && (
            <div className="p-20 text-center text-gray-400">
              <Users className="mx-auto mb-4 opacity-10" size={80} />
              <p className="font-bold text-lg">Ainda não há clientes registrados além de você.</p>
              <p className="text-sm">Os novos cadastros aparecerão aqui em tempo real.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

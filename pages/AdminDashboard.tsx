
import React, { useMemo } from 'react';
import { User as UserIcon, Smartphone, Mail, Calendar, Users, ShoppingBag, TrendingUp, ArrowLeft, MessageCircle } from 'lucide-react';
import { User } from '../types';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = ({ currentUser }: { currentUser: User | null }) => {
  // Verificação de segurança adicional
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  const allUsers: User[] = useMemo(() => {
    return JSON.parse(localStorage.getItem('aki_users') || '[]');
  }, []);

  const totalClients = allUsers.length;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/account" className="inline-flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:underline mb-2">
              <ArrowLeft className="h-3 w-3" /> Voltar à minha conta
            </Link>
            <h1 className="text-4xl font-black text-blue-900 tracking-tighter">Painel de Controle TudoAki</h1>
            <p className="text-gray-500 font-medium">Bem-vindo, Lucas. Aqui está a gestão completa do seu marketplace.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 rounded-2xl text-red-500"><TrendingUp /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Status do Sistema</p>
              <p className="text-sm font-bold text-green-600">Online & Sincronizado</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><Users size={120} /></div>
            <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-2">Total de Clientes</p>
            <h2 className="text-5xl font-black">{totalClients}</h2>
            <p className="text-sm text-blue-300 mt-4">Novos cadastros em Cascavel</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">AkiPoints em Circulação</p>
            <h2 className="text-4xl font-black text-blue-900">
              {allUsers.reduce((acc, u) => acc + (u.points || 0), 0).toLocaleString()}
            </h2>
            <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-bold">
              <TrendingUp className="h-4 w-4" /> Fidelização em Alta
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Pedidos Simulados</p>
            <h2 className="text-4xl font-black text-blue-900">142</h2>
            <p className="text-xs text-gray-500 mt-4">Dados de conversão do mês atual</p>
          </div>
        </div>

        {/* Clientes Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-blue-900 flex items-center gap-3">
              <UserIcon className="text-red-500" /> Lista de Clientes Ativos
            </h3>
            <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Total: {allUsers.length}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Cliente</th>
                  <th className="px-8 py-5">WhatsApp</th>
                  <th className="px-8 py-5">AkiPoints</th>
                  <th className="px-8 py-5">Nível</th>
                  <th className="px-8 py-5">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-black">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-900">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Smartphone className="h-3 w-3 text-red-500" />
                        {user.whatsapp}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-blue-900">{user.points}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                        ${user.tier === 'Ouro' ? 'bg-amber-100 text-amber-600' : 
                          user.tier === 'Prata' ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-600'}`}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <a 
                        href={`https://wa.me/55${user.whatsapp.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors inline-block"
                        title="Falar no WhatsApp"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {allUsers.length === 0 && (
            <div className="p-20 text-center text-gray-400">
              <Users className="mx-auto mb-4 opacity-20" size={60} />
              <p className="font-bold">Nenhum cliente cadastrado ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

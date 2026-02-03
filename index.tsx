import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RefreshCw, AlertTriangle, Trash2 } from 'lucide-react';

// Fixed: Made children optional to resolve missing property error in JSX usage
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

// Error Boundary para capturar telas brancas (crashes)
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fixed: Explicitly declared state property to resolve "Property 'state' does not exist" error
  public state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Aplicação encontrou um erro crítico:", error, errorInfo);
  }

  handleReset = () => {
    // Limpa dados locais corrompidos
    localStorage.clear();
    sessionStorage.clear();
    
    // Tenta limpar caches do navegador
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }

    // Recarrega a página
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center font-sans">
          <div className="bg-red-100 p-6 rounded-full mb-6 animate-bounce">
             <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Ops! Algo deu errado.</h1>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
            O aplicativo encontrou um erro inesperado. Isso geralmente acontece por falha na conexão ou dados antigos salvos.
          </p>
          
          <div className="flex flex-col gap-3 w-full max-w-xs">
             <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-all active:scale-95"
             >
                <RefreshCw size={20} /> Tentar Novamente
             </button>
             
             <button 
                onClick={this.handleReset}
                className="w-full py-4 bg-white border-2 border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-2"
             >
                <Trash2 size={20} /> Limpar e Reiniciar
             </button>
          </div>
          
          <div className="mt-12 p-4 bg-slate-100 rounded-xl w-full max-w-sm overflow-hidden text-left">
             <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Detalhes do Erro:</p>
             <p className="text-[10px] text-red-400 font-mono break-all line-clamp-4">
                {this.state.error?.toString() || 'Erro desconhecido'}
             </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
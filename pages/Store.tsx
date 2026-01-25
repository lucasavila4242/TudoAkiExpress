
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  CheckCircle2, 
  LayoutGrid, 
  ChevronRight, 
  ChevronLeft,
  Truck 
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const ITEMS_PER_PAGE = 6;

const Store = ({ 
  addToCart, 
  wishlist, 
  toggleWishlist 
}: { 
  addToCart: (p: Product) => void,
  wishlist: string[],
  toggleWishlist: (id: string) => void
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('relevant');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showDeliveryToday, setShowDeliveryToday] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, showOnlyInStock, showDeliveryToday]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (showOnlyInStock) {
      result = result.filter(p => p.stock > 0);
    }

    if (showDeliveryToday) {
      result = result.filter(p => p.deliveryToday);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategory, sortBy, showOnlyInStock, showDeliveryToday]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-blue-900">Nossa Loja</h1>
            <p className="text-gray-500 text-sm">Mostrando {filteredProducts.length} produtos de qualidade em Cascavel.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 rounded-xl px-5 py-3 pr-10 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant">Mais Relevantes</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="md:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm font-bold text-gray-700">
              <Filter className="h-4 w-4" /> Filtros
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-64 space-y-8 sticky top-24 h-fit">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <div>
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-red-500" /> Categorias
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat 
                        ? 'bg-blue-50 text-blue-900 font-bold' 
                        : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-red-500" /> Filtros Rápidos
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={showOnlyInStock}
                      onChange={() => setShowOnlyInStock(!showOnlyInStock)}
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${showOnlyInStock ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                      {showOnlyInStock && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-900">Em estoque</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={showDeliveryToday}
                      onChange={() => setShowDeliveryToday(!showDeliveryToday)}
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${showDeliveryToday ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                      {showDeliveryToday && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-900">Entrega Hoje</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 p-6 rounded-3xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-xs font-bold text-blue-200 uppercase mb-2">Dica Pro</p>
                <p className="text-sm font-medium leading-relaxed mb-4">Pedidos feitos até as 13:00 são entregues no mesmo dia em Cascavel!</p>
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase cursor-pointer hover:underline">
                  Saiba mais <ChevronRight className="h-3 w-3" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform">
                <Truck className="w-32 h-32" />
              </div>
            </div>
          </aside>

          {/* Product Grid & Pagination */}
          <div className="flex-1 space-y-12">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                  {paginatedProducts.map(p => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onAddToCart={addToCart} 
                      isWishlisted={wishlist.includes(p.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-12 h-12 rounded-xl text-sm font-black transition-all ${
                              currentPage === pageNum
                              ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                              : 'bg-white border border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-gray-100 p-8 rounded-full mb-6">
                  <LayoutGrid className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Ops! Nenhum produto encontrado</h3>
                <p className="text-gray-500 max-w-sm">Tente ajustar seus filtros ou pesquisar por outro termo.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setShowOnlyInStock(false);
                    setShowDeliveryToday(false);
                  }}
                  className="mt-6 text-red-500 font-bold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

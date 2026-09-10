import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './pages/HomeView';
import { ProcessGuideView } from './pages/ProcessGuideView';
import { SelectionMethodsView } from './pages/SelectionMethodsView';
import { DecisionTreeView } from './pages/DecisionTreeView';
import { RequestGuideView } from './pages/RequestGuideView';
import { ContractGuideView } from './pages/ContractGuideView';
import { FAQView } from './pages/FAQView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for Cmd+K / Ctrl+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTree = () => {
    setCurrentPage('tree');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Application Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onStartTree={handleStartTree}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {currentPage === 'home' && (
          <HomeView onNavigate={handleNavigate} onStartTree={handleStartTree} />
        )}
        {currentPage === 'process' && <ProcessGuideView />}
        {currentPage === 'methods' && <SelectionMethodsView />}
        {currentPage === 'tree' && <DecisionTreeView onNavigate={handleNavigate} />}
        {currentPage === 'request-guide' && <RequestGuideView />}
        {currentPage === 'contract-guide' && <ContractGuideView />}
        {currentPage === 'faq' && <FAQView />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Fast Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(page) => handleNavigate(page)}
        onStartTree={handleStartTree}
      />
    </div>
  );
}

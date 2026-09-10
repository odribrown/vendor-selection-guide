import React, { useState } from 'react';
import { PageId } from '../types';
import {
  FileText,
  Compass,
  GitFork,
  FileEdit,
  FileSignature,
  HelpCircle,
  Home,
  Menu,
  X,
  Search,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onStartTree: () => void;
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onStartTree,
  onSearchOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'process' as PageId, label: '업체선정 절차', icon: Compass },
    { id: 'methods' as PageId, label: '선정방식 종류', icon: FileText },
    { id: 'tree' as PageId, label: '선정방식 찾기', icon: GitFork, isHighlight: true },
    { id: 'request-guide' as PageId, label: '품의서 가이드', icon: FileEdit },
    { id: 'contract-guide' as PageId, label: '전자계약 가이드', icon: FileSignature },
    { id: 'faq' as PageId, label: 'FAQ', icon: HelpCircle },
  ];

  const handleNav = (page: PageId) => {
    if (page === 'tree') {
      onStartTree();
    } else {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <button
            type="button"
            id="brand-home-link"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  외주 업체선정 가이드
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium block">
                외주구매 및 계약 지침 시스템
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Clean, Balanced & Well-Spaced */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isHighlight = item.isHighlight;

              if (isHighlight) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    id={`nav-${item.id}`}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Search Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-open-quick-search"
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200 shadow-2xs"
              title="빠른 검색"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">통합 검색</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 bg-white border border-slate-200 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.isHighlight && !isActive && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                    추천진단
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

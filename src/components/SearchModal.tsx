import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { Search, X, ArrowRight, FileText, HelpCircle, GitFork, Shield } from 'lucide-react';
import methodsData from '../data/selectionMethods.json';
import faqData from '../data/faq.json';
import processData from '../data/processSteps.json';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, targetId?: string) => void;
  onStartTree: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onStartTree,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const items: Array<{
      category: string;
      title: string;
      snippet: string;
      icon: any;
      action: () => void;
    }> = [];

    // Search methods
    for (const m of methodsData) {
      if (
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.applicableCases.some((c) => c.toLowerCase().includes(q))
      ) {
        items.push({
          category: '업체선정 방식',
          title: m.name,
          snippet: m.tagline,
          icon: FileText,
          action: () => {
            onNavigate('methods', m.id);
            onClose();
          },
        });
      }
    }

    // Search process steps
    for (const s of processData) {
      if (
        s.title.toLowerCase().includes(q) ||
        s.shortSummary.toLowerCase().includes(q) ||
        s.responsibleDepartment.toLowerCase().includes(q) ||
        s.keyTasks.some((t) => t.toLowerCase().includes(q))
      ) {
        items.push({
          category: '선정 절차',
          title: `Step ${s.stepNumber}. ${s.title} (${s.responsibleDepartment})`,
          snippet: s.shortSummary,
          icon: Shield,
          action: () => {
            onNavigate('process', `step-${s.stepNumber}`);
            onClose();
          },
        });
      }
    }

    // Search FAQ
    for (const f of faqData) {
      if (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        items.push({
          category: '자주 묻는 질문 (FAQ)',
          title: `${f.num}. ${f.question}`,
          snippet: f.answer,
          icon: HelpCircle,
          action: () => {
            onNavigate('faq', f.id);
            onClose();
          },
        });
      }
    }

    // Trigger decision tree option
    if ('선정방식 찾기 decision tree 분기 추천'.includes(q)) {
      items.push({
        category: '의사결정 도구',
        title: '내 과업에 맞는 선정방식 찾기 (Decision Tree)',
        snippet: '질문과 선택지를 통해 적합한 입찰/선정 방식을 단계별로 추천받습니다.',
        icon: GitFork,
        action: () => {
          onStartTree();
          onClose();
        },
      });
    }

    return items;
  }, [query, onNavigate, onStartTree, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="quick-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            id="input-quick-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어 입력 (예: 단독/수의, 소액구매, RFP, 보증보험, 최저가...)"
            autoFocus
            className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs sm:text-[13px] font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md"
          >
            ESC 닫기
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p>궁금한 키워드를 입력하시면 관련 선정방식, 절차, FAQ를 즉시 찾아드립니다.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {['단독/수의', '소액구매 3개사', '제안서 평가입찰', '긴급유지보수', '전자계약 보증보험'].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 text-xs sm:text-[13px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-full transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-[15px]">
              <p>&apos;{query}&apos;에 대한 검색 결과가 없습니다.</p>
              <p className="text-xs sm:text-[13px] text-slate-400 mt-1">
                철자를 확인하시거나 다른 키워드로 검색해 보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="px-2 text-xs sm:text-[13px] font-semibold text-slate-500">
                검색 결과 ({results.length}건)
              </p>
              {results.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <h5 className="text-[15px] sm:text-base font-bold text-slate-900 truncate">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-[13px] sm:text-sm text-slate-600 mt-1 line-clamp-1">
                        {item.snippet}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 mt-2 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

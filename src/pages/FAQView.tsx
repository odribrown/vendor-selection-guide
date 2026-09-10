import React, { useState } from 'react';
import faqDataRaw from '../data/faq.json';
import { FAQItem } from '../types';
import {
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

export const FAQView: React.FC = () => {
  const faqs = faqDataRaw as FAQItem[];
  // Start with all questions collapsed so standard answers are hidden initially
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '단독/수의', '소액구매', '입찰절차', '예산계획', '계약형태'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const all: Record<string, boolean> = {};
    faqs.forEach((f) => {
      all[f.id] = true;
    });
    setOpenIds(all);
  };

  const handleCollapseAll = () => {
    setOpenIds({});
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory =
      selectedCategory === '전체' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div id="faq-view" className="space-y-3.5 animate-fade-in">
      {/* Compact Header */}
      <div className="border-b border-slate-200 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ⑥
            </span>
            <span className="text-xs text-slate-400 font-medium">실무 질의응답</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            자주 묻는 질문 (FAQ)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            협업부서 실무 빈출 질문 목록입니다. 질문을 클릭하시면 답변을 확인하실 수 있습니다.
          </p>
        </div>

        {/* Expand / Collapse Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExpandAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            모두 펼치기
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            모두 접기
          </button>
        </div>
      </div>

      {/* Sleek Search & Category Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="faq-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="질문 검색 (예: 단독/수의, 소액구매, 현장설명회, 입찰예산, 단가계약...)"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Slim, Single-Screen High-Density Accordion List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            검색 결과와 일치하는 질문이 없습니다.
          </div>
        ) : (
          filteredFaqs.map((item) => {
            const isOpen = !!openIds[item.id];

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="transition-colors"
              >
                {/* Slim Question Row Trigger with relaxed padding */}
                <button
                  type="button"
                  id={`btn-toggle-${item.id}`}
                  onClick={() => toggleAccordion(item.id)}
                  className={`w-full px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isOpen ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-8 h-6 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      {item.num}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded shrink-0">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-slate-900 truncate">
                      {item.question}
                    </span>
                  </div>

                  <div className="text-slate-400 shrink-0 ml-3">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Body - Clearly differentiated background & smaller typography */}
                {isOpen && (
                  <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-100/80 border-t border-slate-200 border-l-4 border-l-indigo-500 animate-in fade-in duration-100">
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded text-[10px] font-bold bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Discrete Mandatory Notice */}
      <MandatoryNotice />
    </div>
  );
};

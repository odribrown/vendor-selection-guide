import React from 'react';
import { PageId } from '../types';
import {
  Compass,
  FileText,
  GitFork,
  FileEdit,
  FileSignature,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onStartTree: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onStartTree }) => {
  const menuCards = [
    {
      id: 'process' as PageId,
      num: '01',
      title: '업체선정 절차',
      tagline: '5단계 표준 프로세스 및 부서별 역할',
      badge: '표준 절차',
      icon: Compass,
      action: () => onNavigate('process'),
    },
    {
      id: 'methods' as PageId,
      num: '02',
      title: '선정방식 종류',
      tagline: '사내 계약 방식별 정의 및 적용 기준',
      badge: '방식별 기준',
      icon: FileText,
      action: () => onNavigate('methods'),
    },
    {
      id: 'tree' as PageId,
      num: '03',
      title: '선정방식 찾기',
      tagline: '맞춤형 의사결정 질의응답 진단',
      badge: '추천 진단',
      isRecommend: true,
      icon: GitFork,
      action: onStartTree,
    },
    {
      id: 'request-guide' as PageId,
      num: '04',
      title: '품의서 작성 가이드',
      tagline: '품의서 본문 및 예산계획 작성 기준',
      badge: '품의 가이드',
      icon: FileEdit,
      action: () => onNavigate('request-guide'),
    },
    {
      id: 'contract-guide' as PageId,
      num: '05',
      title: '전자계약 가이드',
      tagline: '계약 체결 수칙 및 나이스다큐 안내',
      badge: '계약 체결',
      icon: FileSignature,
      action: () => onNavigate('contract-guide'),
    },
    {
      id: 'faq' as PageId,
      num: '06',
      title: '자주 묻는 질문 (FAQ)',
      tagline: '현업 실무 빈출 문의 및 처리 기준',
      badge: '실무 Q&A',
      icon: HelpCircle,
      action: () => onNavigate('faq'),
    },
  ];

  return (
    <div id="home-view" className="space-y-4 animate-fade-in">
      {/* Top Banner - Sleek, Compact & High-Impact */}
      <section className="rounded-xl bg-slate-900 text-white px-4 py-3 sm:px-5 sm:py-3.5 border border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 shrink-0 self-start sm:self-auto">
            외주구매·계약 지원
          </span>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
            외주 용역·구매 입찰 및 계약 종합 가이드
          </h1>
          <span className="hidden md:inline text-xs text-slate-400 font-normal">
            | 맞춤 진단부터 전자계약 체결까지
          </span>
        </div>

        <button
          type="button"
          id="hero-btn-start-tree"
          onClick={onStartTree}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
          <span>선정방식 맞춤 진단</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* 6 Category Cards - Scaled to fit comfortably on a single screen */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>주요 업무 가이드</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">총 6개 카테고리</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {menuCards.map((card) => {
            const Icon = card.icon;
            const isRecommend = card.isRecommend;

            return (
              <div
                key={card.id}
                id={`card-menu-${card.id}`}
                onClick={card.action}
                className={`px-5 py-4 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-xs hover:-translate-y-0.5 ${
                  isRecommend
                    ? 'bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-800 hover:border-indigo-600'
                    : 'bg-white hover:bg-slate-50/90 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Number & Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isRecommend
                          ? 'bg-white/15 text-white shadow-xs'
                          : 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          isRecommend
                            ? 'bg-indigo-800/80 text-indigo-200 border border-indigo-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {card.badge}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isRecommend ? 'text-indigo-300' : 'text-slate-400'
                        }`}
                      >
                        {card.num}
                      </span>
                    </div>
                  </div>

                  {/* Prominent Title */}
                  <h3
                    className={`text-base sm:text-lg font-bold tracking-tight mb-1 transition-colors ${
                      isRecommend
                        ? 'text-white'
                        : 'text-slate-900 group-hover:text-indigo-600'
                    }`}
                  >
                    {card.title}
                  </h3>

                  {/* Concise Tagline */}
                  <p
                    className={`text-xs leading-normal ${
                      isRecommend ? 'text-indigo-200' : 'text-slate-500'
                    }`}
                  >
                    {card.tagline}
                  </p>
                </div>

                {/* Bottom Navigation Link */}
                <div
                  className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs font-semibold ${
                    isRecommend
                      ? 'border-white/10 text-indigo-300 group-hover:text-white'
                      : 'border-slate-100 text-slate-400 group-hover:text-indigo-600'
                  }`}
                >
                  <span>바로가기</span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                      isRecommend
                        ? 'bg-white/10 group-hover:bg-white/20 text-white'
                        : 'bg-slate-100 group-hover:bg-indigo-50 text-slate-500 group-hover:text-indigo-600'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Discrete 1-line Footer Notice */}
      <MandatoryNotice />
    </div>
  );
};

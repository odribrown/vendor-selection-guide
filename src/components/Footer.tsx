import React from 'react';
import { PageId } from '../types';
import { Home, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: System Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                외주 업체선정 가이드
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              본 시스템은 회사 협업부서 임직원의 구매·입찰·용역 업체선정 업무 효율성과 절차적 정당성을 제고하기 위해 구축된 사내 표준 업무 가이드 프로그램입니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>정적 룰 베이스(Rule-based) 구동 / 외부 데이터 전송 및 AI API 미사용</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              주요 가이드
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('process')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  업체선정 절차
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('methods')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  선정방식 종류
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tree')}
                  className="hover:text-white transition-colors cursor-pointer text-blue-400 font-semibold"
                >
                  내 과업에 맞는 선정방식 찾기
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('request-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  품의서 필수 첨부서류 및 예산계획
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference Board */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              관련 규정 및 문의
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1">
                <span>규정 및 지침 게시판</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </li>
              <li className="text-slate-500">
                [입찰 프로세스] 「입찰프로세스_개정 4차」
              </li>
              <li className="pt-2 text-slate-400">
                <span className="font-semibold text-slate-300">주관부서 :</span> 외주구매팀
              </li>
              <li className="text-slate-400">
                <span className="font-semibold text-slate-300">운영환경 :</span> 정적 웹 앱 (GitHub Pages 호환)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Notice from Professional Polish Design */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-amber-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Notice</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ※ 본 프로그램은 업체선정 방식을 참고하기 위한 도구입니다. 세부 기준 및 예외사항은 &apos;규정 및 지침&apos; 게시판의 관련 규정을 반드시 확인하시기 바랍니다.
            </p>
          </div>
          <p className="shrink-0 text-[10px] text-slate-500 font-medium">
            Internal Operation Tool. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

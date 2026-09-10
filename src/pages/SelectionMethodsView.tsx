import React, { useState } from 'react';
import methodsData from '../data/selectionMethods.json';
import { SelectionMethod } from '../types';
import {
  FileCheck,
  CheckCircle2,
  X,
  ChevronRight,
  FileText,
  Sparkles,
  Info,
  BadgeCheck,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

interface MethodVisualConfig {
  categoryLabel: string;
  badgeStyle: string;
  borderHover: string;
  keyCondition: string;
  docShort: string;
  topLineColor: string;
}

export const SelectionMethodsView: React.FC = () => {
  const methods = methodsData as SelectionMethod[];
  const [selectedMethod, setSelectedMethod] = useState<SelectionMethod | null>(null);

  // Accurate visual configuration matching selectionMethods.json
  const methodVisuals: Record<number, MethodVisualConfig> = {
    1: {
      categoryLabel: '수익창출',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      borderHover: 'hover:border-emerald-400 hover:shadow-emerald-500/10',
      keyCondition: '별도 입찰 불필요 (계약검토 상신)',
      docShort: '(재무그룹)계약검토품의',
      topLineColor: 'bg-emerald-500',
    },
    2: {
      categoryLabel: '비상대응',
      badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200/80',
      borderHover: 'hover:border-amber-400 hover:shadow-amber-500/10',
      keyCondition: '사전보고 필수 (선조치 후보고)',
      docShort: '(기타업무)긴급보수 결과보고',
      topLineColor: 'bg-amber-500',
    },
    3: {
      categoryLabel: '기술·정성평가',
      badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/80',
      borderHover: 'hover:border-blue-400 hover:shadow-blue-500/10',
      keyCondition: '시행안·RFP·평가표 필수',
      docShort: '(외주구매)업체선정 요청품의',
      topLineColor: 'bg-blue-500',
    },
    4: {
      // Corrected: Method 4 is 단독/수의 입찰
      categoryLabel: '예외수의',
      badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200/80',
      borderHover: 'hover:border-purple-400 hover:shadow-purple-500/10',
      keyCondition: '3대 사유 소명 (시행안·RFP·사유서)',
      docShort: '(외주구매)업체선정 요청품의',
      topLineColor: 'bg-purple-500',
    },
    5: {
      // Corrected: Method 5 is 최저가 입찰
      categoryLabel: '가격경쟁',
      badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      borderHover: 'hover:border-indigo-400 hover:shadow-indigo-500/10',
      keyCondition: '동일 규격·품질 (시행안·RFP·현설서)',
      docShort: '(외주구매)업체선정 요청품의',
      topLineColor: 'bg-indigo-500',
    },
    6: {
      // Corrected: Method 6 is 소액구매 (1백만원 이하 기준)
      categoryLabel: '간소화',
      badgeStyle: 'bg-teal-50 text-teal-700 border-teal-200/80',
      borderHover: 'hover:border-teal-400 hover:shadow-teal-500/10',
      keyCondition: '1백만원 이하 (3사 비교견적 필수)',
      docShort: '(외주구매)업체선정 요청품의',
      topLineColor: 'bg-teal-500',
    },
  };

  const getVisual = (num: number): MethodVisualConfig => {
    return methodVisuals[num] || methodVisuals[1];
  };

  return (
    <div id="selection-methods-view" className="space-y-3.5 animate-fade-in">
      {/* Compact Page Header */}
      <div className="border-b border-slate-200 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ②
            </span>
            <span className="text-xs text-slate-400 font-medium">선정방식 사전</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            선정방식 종류 알아보기
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            사내 주요 6대 외주 업체선정 방식입니다. 각 카드를 클릭하면 상세 기준과 필수 구비 서류를 확인할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/80 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>총 6개 선정방식</span>
        </div>
      </div>

      {/* 6 High-Density Compact Cards (Engineered to fit into a single page view) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {methods.map((m) => {
          const visual = getVisual(m.num);

          return (
            <div
              key={m.id}
              id={`method-card-${m.id}`}
              onClick={() => setSelectedMethod(m)}
              className={`relative bg-white rounded-xl border border-slate-200/90 ${visual.borderHover} p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col justify-between group overflow-hidden`}
            >
              {/* Top Accent Color Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${visual.topLineColor}`} />

              <div>
                {/* Header Row: Method Title + Category Badge (No icon box, No STEP number) */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-base sm:text-[17px] font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {m.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${visual.badgeStyle}`}
                  >
                    {visual.categoryLabel}
                  </span>
                </div>

                {/* Brief Summary / Tagline */}
                <p className="text-xs text-slate-600 leading-snug line-clamp-2 min-h-[32px]">
                  {m.tagline || m.description}
                </p>

                {/* Key Spec Badges */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="text-slate-400 shrink-0">품의양식:</span>
                    <span className="font-semibold text-slate-700 truncate">{visual.docShort}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-slate-400 shrink-0">핵심기준:</span>
                    <span className="font-medium text-slate-700 truncate">{visual.keyCondition}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Line */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                <span>자세히 보기</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-slate-400 group-hover:text-indigo-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Notice */}
      <MandatoryNotice />

      {/* Detail Modal */}
      {selectedMethod && (() => {
        const visual = getVisual(selectedMethod.num);

        return (
          <div
            id="method-detail-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setSelectedMethod(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header without icon */}
              <div className="px-6 py-4.5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
                <div>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-1.5 ${visual.badgeStyle}`}>
                    {visual.categoryLabel}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedMethod.name}
                  </h2>
                </div>
                <button
                  type="button"
                  id="btn-close-method-modal"
                  onClick={() => setSelectedMethod(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {/* 개요 안내 박스 */}
                <div className="bg-indigo-50/70 border border-indigo-200/80 p-3.5 rounded-xl text-sm sm:text-[15px] text-slate-800 leading-relaxed font-medium flex items-start gap-2.5">
                  <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-950">방식 개요: </span>
                    <span>{selectedMethod.description}</span>
                  </div>
                </div>

                {/* 상신 품의서 안내 */}
                {selectedMethod.officialDocType && (
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-500 text-xs block font-medium">상신 품의서 양식</span>
                      <span className="font-bold text-indigo-600 text-sm sm:text-base mt-0.5 block">
                        {selectedMethod.officialDocType}
                      </span>
                    </div>
                    <span className="text-xs sm:text-[13px] px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold shadow-2xs">
                      {visual.keyCondition}
                    </span>
                  </div>
                )}

                {/* 필수 구비 서류 (매출성 계약 및 긴급유지보수는 제외) */}
                {selectedMethod.requiredDocs && selectedMethod.requiredDocs.length > 0 && selectedMethod.id !== 'method-1' && selectedMethod.id !== 'method-2' && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                      <FileCheck className="w-4.5 h-4.5 text-indigo-600" />
                      <span>필수 구비 서류</span>
                    </h4>
                    <div className="space-y-1.5">
                      {selectedMethod.requiredDocs.map((doc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-[13px] sm:text-sm text-slate-800 py-2 px-3 bg-slate-50 rounded-lg border border-slate-200/60"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                          <span className="font-medium">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 주요 특징 및 진행 유의사항 */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    <span>주요 특징 및 진행 유의사항</span>
                  </h4>
                  <ul className="space-y-2 text-[13px] sm:text-sm text-slate-700">
                    {selectedMethod.keyCharacteristics.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 참고 사항 */}
                {selectedMethod.officialNote && (
                  <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60 leading-relaxed">
                    <span className="font-bold text-amber-900 mr-1.5">※ 공식 지침 참고:</span>
                    <span className="text-slate-800 font-medium">{selectedMethod.officialNote}</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  id="btn-close-method-modal-footer"
                  onClick={() => setSelectedMethod(null)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

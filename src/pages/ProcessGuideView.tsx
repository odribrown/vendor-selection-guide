import React, { useState } from 'react';
import processData from '../data/processSteps.json';
import { ProcessStep } from '../types';
import {
  CheckCircle2,
  Building2,
  Info,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

export const ProcessGuideView: React.FC = () => {
  const steps = processData as ProcessStep[];
  const [modalStep, setModalStep] = useState<ProcessStep | null>(null);

  // Distinct theme accents per step for intuitive visual flow
  const stepColors: Record<number, { badgeBg: string; badgeText: string; cardBorder: string; activeRing: string; deptBg: string; deptText: string }> = {
    1: { badgeBg: 'bg-blue-600 text-white', badgeText: 'text-blue-700', cardBorder: 'hover:border-blue-500', activeRing: 'ring-blue-500/20', deptBg: 'bg-blue-50 text-blue-700 border-blue-200/80', deptText: 'text-blue-700' },
    2: { badgeBg: 'bg-indigo-600 text-white', badgeText: 'text-indigo-700', cardBorder: 'hover:border-indigo-500', activeRing: 'ring-indigo-500/20', deptBg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', deptText: 'text-indigo-700' },
    3: { badgeBg: 'bg-teal-600 text-white', badgeText: 'text-teal-700', cardBorder: 'hover:border-teal-500', activeRing: 'ring-teal-500/20', deptBg: 'bg-teal-50 text-teal-700 border-teal-200/80', deptText: 'text-teal-700' },
    4: { badgeBg: 'bg-amber-600 text-white', badgeText: 'text-amber-700', cardBorder: 'hover:border-amber-500', activeRing: 'ring-amber-500/20', deptBg: 'bg-amber-50 text-amber-700 border-amber-200/80', deptText: 'text-amber-700' },
    5: { badgeBg: 'bg-emerald-600 text-white', badgeText: 'text-emerald-700', cardBorder: 'hover:border-emerald-500', activeRing: 'ring-emerald-500/20', deptBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', deptText: 'text-emerald-700' },
  };

  const handlePrevStep = () => {
    if (!modalStep) return;
    const prevIdx = modalStep.stepNumber - 2;
    if (prevIdx >= 0) {
      setModalStep(steps[prevIdx]);
    }
  };

  const handleNextStep = () => {
    if (!modalStep) return;
    const nextIdx = modalStep.stepNumber;
    if (nextIdx < steps.length) {
      setModalStep(steps[nextIdx]);
    }
  };

  return (
    <div id="process-guide-view" className="space-y-4 animate-fade-in">
      {/* Compact Page Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ①
            </span>
            <span className="text-xs text-slate-400 font-medium">표준 구매·입찰 절차</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            업체선정 절차
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            요청품의 상신부터 전자계약 체결까지 5단계 표준 프로세스입니다. 각 단계를 클릭하면 상세 내용을 팝업으로 확인할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70 self-start sm:self-auto shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>카드 클릭 시 상세 팝업 오픈</span>
        </div>
      </div>

      {/* Main Diagram Centric View - Fits Screen Comfortably */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>업체선정 5단계 순차 프로세스 흐름도</span>
          </h2>
          <span className="text-xs text-indigo-600 font-medium">
            5개 단계 순차 진행
          </span>
        </div>

        {/* 5-Step Horizontal Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {steps.map((step, idx) => {
            const color = stepColors[step.stepNumber] || stepColors[1];

            return (
              <div
                key={step.stepNumber}
                id={`step-card-${step.stepNumber}`}
                onClick={() => setModalStep(step)}
                className={`relative flex flex-col justify-between p-4 sm:p-4.5 rounded-xl border border-slate-200 bg-white ${color.cardBorder} hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group`}
              >
                <div>
                  {/* Top Badges: Step No. */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${color.badgeBg}`}
                    >
                      STEP 0{step.stepNumber}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {step.title}
                  </h3>

                  {/* Responsible Dept Badge (Highlighted 요청팀 상신 / 외주구매팀 상신) */}
                  <div
                    className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-md border ${color.deptBg}`}
                  >
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{step.responsibleDepartment}</span>
                  </div>
                </div>

                {/* Arrow indicator between steps (desktop only) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 items-center justify-center text-[10px] shadow-2xs pointer-events-none">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Card Action Button */}
                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span>상세내용 보기</span>
                  <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Guide Bar */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong className="text-slate-800">진행 안내:</strong> 각 단계를 클릭하시면 <strong>주요 진행 업무</strong>와 <strong>핵심 검토 체크포인트</strong>를 팝업으로 상세히 확인하실 수 있습니다.
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono shrink-0">
            총 5단계 표준 프로세스
          </span>
        </div>
      </div>

      {/* Mandatory Notice */}
      <MandatoryNotice />

      {/* Detail Popup Modal */}
      {modalStep && (
        <div
          id="process-step-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setModalStep(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-slate-900 text-white flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-[13px] font-bold font-mono px-2 py-0.5 bg-indigo-600 text-white rounded">
                    STEP 0{modalStep.stepNumber}
                  </span>
                  <span className="text-xs sm:text-[13px] text-indigo-300 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    담당: {modalStep.responsibleDepartment}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                  0{modalStep.stepNumber}. {modalStep.title}
                </h3>
              </div>
              <button
                type="button"
                id="btn-close-step-modal"
                onClick={() => setModalStep(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Description Box */}
              <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-xl text-sm sm:text-[15px] text-slate-800 leading-relaxed font-medium flex items-start gap-2.5">
                <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-950">단계 개요: </span>
                  <span>{modalStep.description}</span>
                </div>
              </div>

              {/* Key Tasks */}
              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200/80 space-y-2.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600" />
                  <span>주요 진행 업무</span>
                </h4>
                <ul className="space-y-2">
                  {modalStep.keyTasks.map((task, i) => (
                    <li key={i} className="text-[13px] sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checkpoints (if any for this step) */}
              {modalStep.checkpoints && modalStep.checkpoints.length > 0 && (
                <div className="bg-amber-50/50 rounded-xl p-4 sm:p-5 border border-amber-200/70 space-y-2.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-600" />
                    <span>핵심 검토 체크포인트</span>
                  </h4>
                  <ul className="space-y-2">
                    {modalStep.checkpoints.map((cp, i) => (
                      <li key={i} className="text-[13px] sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{cp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Docs (if applicable) */}
              {modalStep.requiredDocs && modalStep.requiredDocs.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 block mb-2">
                    관련 주요 구비 및 산출 서류:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalStep.requiredDocs.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-xs sm:text-[12.5px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Guide Reference Notice (e.g. 품의서 가이드 or 전자계약 가이드 안내) */}
              {modalStep.guideNotice && (
                <div className="bg-indigo-50/80 border border-indigo-200/90 p-3.5 rounded-xl text-xs sm:text-sm text-indigo-950 font-semibold flex items-center gap-2.5">
                  <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                  <span>{modalStep.guideNotice}</span>
                </div>
              )}
            </div>

            {/* Modal Footer: Prev / Next / Close */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
              <button
                type="button"
                id="btn-modal-prev-step"
                disabled={modalStep.stepNumber === 1}
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전 단계</span>
              </button>

              <span className="font-mono font-bold text-slate-400 text-xs sm:text-sm">
                {modalStep.stepNumber} / {steps.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-modal-next-step"
                  disabled={modalStep.stepNumber === steps.length}
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors cursor-pointer text-slate-700"
                >
                  <span>다음 단계</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setModalStep(null)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-colors cursor-pointer text-xs sm:text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

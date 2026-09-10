import React, { useState } from 'react';
import contractDataRaw from '../data/contractGuide.json';
import { ContractStep } from '../types';
import {
  ShieldCheck,
  Maximize2,
  FileCheck,
  AlertTriangle,
  FileText,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ContractDiagramModal } from '../components/ContractDiagramModal';
import { MandatoryNotice } from '../components/MandatoryNotice';

export const ContractGuideView: React.FC = () => {
  const contractData = contractDataRaw;
  const writingRules = contractData.contractWritingRules;
  const steps: ContractStep[] = contractData.steps as ContractStep[];

  // View mode tab: 'writing' = 계약서 작성 7대 가이드, 'electronic' = 전자계약 5단계 프로세스
  const [activeTab, setActiveTab] = useState<'writing' | 'electronic'>('writing');
  const [modalOpen, setModalOpen] = useState(false);

  // 선택된 수칙 번호 (기본 1번)
  const [activeRuleNum, setActiveRuleNum] = useState<number>(1);
  // 선택된 전자계약 단계 번호 (기본 1번)
  const [activeStepNum, setActiveStepNum] = useState<number>(1);

  const selectedRule = writingRules.find((r) => r.num === activeRuleNum) || writingRules[0];
  const activeStep = steps.find((s) => s.step === activeStepNum) || steps[0];

  return (
    <div id="contract-guide-view" className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ⑤
            </span>
            <span className="text-xs text-slate-500 font-medium">계약 표준 지침</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            계약서 작성 및 전자계약 가이드
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            왼쪽 목록에서 항목을 선택하면 오른쪽에서 세부 규정 및 실무 체크포인트를 즉시 확인할 수 있습니다.
          </p>
        </div>

        {/* Top Tab Switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            id="tab-btn-writing-guide"
            onClick={() => setActiveTab('writing')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'writing'
                ? 'bg-white text-indigo-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>작성 7대 수칙</span>
          </button>
          <button
            type="button"
            id="tab-btn-electronic-process"
            onClick={() => setActiveTab('electronic')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'electronic'
                ? 'bg-white text-indigo-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>전자계약 5단계</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 계약서 작성 7대 수칙 (왼쪽 세로 목록 + 오른쪽 상세 내용) */}
      {activeTab === 'writing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-150">
          {/* LEFT COLUMN: 7대 수칙 세로 목록 (제목 위주로 크게 배치) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                7대 수칙 목차 선택
              </span>
              <span className="text-xs font-semibold text-slate-400">
                총 {writingRules.length}개 수칙
              </span>
            </div>

            <div className="space-y-2.5">
              {writingRules.map((rule) => {
                const isSelected = rule.num === activeRuleNum;
                const isRule7 = rule.num === 7;

                return (
                  <button
                    key={rule.num}
                    type="button"
                    id={`nav-rule-item-${rule.num}`}
                    onClick={() => setActiveRuleNum(rule.num)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3.5 group relative ${
                      isSelected
                        ? isRule7
                          ? 'bg-amber-950 text-white border-amber-800 shadow-md ring-2 ring-amber-300'
                          : 'bg-indigo-900 text-white border-indigo-800 shadow-md ring-2 ring-indigo-300'
                        : isRule7
                        ? 'bg-amber-50/40 hover:bg-amber-50 text-slate-900 border-amber-200 hover:border-amber-300 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Rule Number Box */}
                    <div
                      className={`w-10 h-10 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : isRule7
                          ? 'bg-amber-100 text-amber-900 group-hover:bg-amber-200'
                          : 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100'
                      }`}
                    >
                      0{rule.num}
                    </div>

                    {/* Core Title Only */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm sm:text-base font-bold truncate ${
                            isSelected ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {rule.title}
                        </h3>
                        {isRule7 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isSelected ? 'bg-amber-800 text-amber-200' : 'bg-amber-100 text-amber-800'
                          }`}>
                            필수주의
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Chevron Indicator */}
                    <div className="shrink-0 self-center">
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'text-white translate-x-0.5'
                            : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom 3 Must-Know Checklist Notice */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-sm space-y-2.5 mt-4">
              <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase block">
                계약 체결 전 3대 필수 확인사항
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>계약번호:</strong> 나이스다큐 '업체선정품의 번호'와 반드시 일치</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>법인명:</strong> '아이파크리조트(주)파크로쉬' 정확 명기 (약칭 금지)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>개인정보:</strong> 위수탁 처리 수반 시 두레이 사전 결재 필수</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 선택된 수칙의 상세 내용 (원문 전체 시원하게 표시) */}
          <div className="lg:col-span-7 xl:col-span-7 min-w-0 space-y-5">
            {/* Sleek Minimal Rule Header (No bulky card box, no keyword badges) */}
            <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">
                  RULE 0{selectedRule.num}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-800">
                  {selectedRule.num}. {selectedRule.title}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={selectedRule.num === 1}
                  onClick={() => setActiveRuleNum(selectedRule.num - 1)}
                  className="p-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="이전 수칙"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-slate-400 px-1">
                  {selectedRule.num} / {writingRules.length}
                </span>
                <button
                  type="button"
                  disabled={selectedRule.num === writingRules.length}
                  onClick={() => setActiveRuleNum(selectedRule.num + 1)}
                  className="p-1 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  title="다음 수칙"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rule Detail Items */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>세부 규정 및 작성 가이드</span>
                </h3>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  {selectedRule.tag}
                </span>
              </div>

              {/* For Rule 1, place the second item as attached note inside the first box */}
              {selectedRule.num === 1 ? (
                <div className="space-y-3">
                  {/* Item 1 with Attached Note */}
                  <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-2.5">
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2"></span>
                      <span>과업별 표준계약서 양식 중 택1</span>
                    </div>
                    {/* 별첨 내용 */}
                    <div className="ml-4 p-2.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2 font-medium">
                      <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>※ HDC리조트 표준 필수 조항 X → 과업별 세부 계약서 사용</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2"></span>
                    <span>임의 양식 사용 금지 (단, 업체에서 업체양식 사용 요구 시 제한적 사용 가능)</span>
                  </div>

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              ) : selectedRule.num === 4 ? (
                /* For Rule 4, show structured table */
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>계약 유형에 따라 아래의 서류를 반드시 사전 구비하여 전자계약에 첨부하십시오.</span>
                  </div>

                  {selectedRule.table && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3 w-32 bg-slate-100/90">계약 구분</th>
                            <th className="p-3">필수 제출 서류</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {selectedRule.table.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 font-bold text-indigo-950 bg-slate-50/50">{row.category}</td>
                              <td className="p-3 text-slate-800 font-medium leading-relaxed">{row.documents}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              ) : selectedRule.num === 5 ? (
                /* For Rule 5, single box containing the first item with its two sub-items */
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3">
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2"></span>
                      <span>아래 항목 반드시 구분하여 명시</span>
                    </div>

                    <div className="ml-4 space-y-2 pt-1 border-t border-slate-200/60">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>부가세 포함 여부 (예 : 부가세 별도 / 부가세 포함)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>일시금 / 월별 / 회당 등 금액 기준 명시</span>
                      </div>
                    </div>
                  </div>

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              ) : selectedRule.num === 6 ? (
                /* For Rule 6, single box containing the first item with sub-items and examples */
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 space-y-3">
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2"></span>
                      <span>아래 항목 반드시 포함하여 작성</span>
                    </div>

                    <div className="ml-4 space-y-2 pt-1 border-t border-slate-200/60">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>세금계산서 발행 시점</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>지급 기한 (세금계산서 발행후 OO일 이내)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>지급방식 (일시납 / 분할 / 월별 / 분기별 등)</span>
                      </div>

                      {/* 실무 작성 예시 블록 */}
                      <div className="mt-2.5 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 space-y-1.5 text-xs text-indigo-950 font-medium">
                        <div className="text-[11px] font-bold text-indigo-700 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" />
                          <span>실무 작성 예시</span>
                        </div>
                        <div className="pl-3 space-y-1 text-slate-700">
                          <div>• 예시 1) 공사 완료 후 세금계산서 발행 및 발행 후 60일 이내 지급</div>
                          <div>• 예시 2) 매월 말 세금계산서 발행 후 30일 이내 지급</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              ) : selectedRule.num === 7 ? (
                /* For Rule 7, enhanced readable cards */
                <div className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>전자계약(나이스다큐) 상신 전 반드시 숙지해야 할 3대 핵심 주의사항입니다.</span>
                  </div>

                  {/* 3대 핵심 주의사항 카드 */}
                  <div className="space-y-3">
                    {/* 카드 1: 계약번호 & 수정 불가 */}
                    <div className="bg-slate-50/90 rounded-xl border border-slate-200/90 p-4 space-y-2.5 hover:border-rose-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 font-mono text-xs font-bold flex items-center justify-center">
                            01
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            계약번호 기입 및 상신 후 수정 불가
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          상신 전 필수 점검
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-rose-100 text-xs font-bold text-rose-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>나이스다큐 계약번호 = 승인된 업체선정품의 문서번호</span>
                      </div>
                      <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 leading-relaxed font-medium">
                        <li>나이스다큐 계약번호 입력란에 승인 완료된 '업체선정품의 번호'를 정확히 기입해야 합니다.</li>
                        <li>결재 상신 후에는 시스템상 본문 수정 및 첨부서류 추가가 일체 불가합니다.</li>
                        <li>서류 누락이나 오기재 확인 시 즉시 결재 취소 후 처음부터 재상신해야 합니다.</li>
                      </ul>
                    </div>

                    {/* 카드 2: 법인명 표기 */}
                    <div className="bg-slate-50/90 rounded-xl border border-slate-200/90 p-4 space-y-2.5 hover:border-indigo-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 font-mono text-xs font-bold flex items-center justify-center">
                            02
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            파크로쉬 사업장 계약주체 법인명 표기
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          법인명 준수
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-indigo-100 text-xs font-bold text-indigo-950 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                        <span>계약주체 표기: '아이파크리조트(주)파크로쉬'로 기재 必</span>
                      </div>
                      <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 leading-relaxed font-medium">
                        <li>파크로쉬 사업장 관련 계약 건의 계약주체는 반드시 <strong>'아이파크리조트(주)파크로쉬'</strong>로 기재 必</li>
                        <li>'파크로쉬', '아이파크리조트' 등 임의 약칭 사용은 법적 효력 상실 위험이 있어 엄격히 금지됩니다.</li>
                      </ul>
                    </div>

                    {/* 카드 3: 개인정보 위탁처리 */}
                    <div className="bg-slate-50/90 rounded-xl border border-slate-200/90 p-4 space-y-2.5 hover:border-amber-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-mono text-xs font-bold flex items-center justify-center">
                            03
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            개인정보 위탁처리 수반 시 사전 승인
                          </h4>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          사전 결재 必
                        </span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-amber-100 text-xs font-bold text-amber-950 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>그룹웨어 두레이(Dooray) 품의 선진행 및 승인 서류 필수 첨부</span>
                      </div>
                      <ul className="space-y-1 pl-4 list-disc text-xs text-slate-700 leading-relaxed font-medium">
                        <li>고객 및 임직원 개인정보 처리가 수반되는 위탁 계약은 두레이로 '개인정보위수탁계약 신청서'를 선진행해야 합니다.</li>
                        <li>두레이 승인이 완료된 후 관련 승인 서류를 전자계약 첨부서류로 필히 등록하십시오.</li>
                        <li><span className="text-amber-900 font-bold">※ 개인정보 관련 실무 문의처:</span> 재무그룹 김명준 차장</li>
                      </ul>
                    </div>
                  </div>

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              ) : (
                /* Default list rendering for other rules */
                <div className="space-y-2.5">
                  {selectedRule.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/90 flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium hover:border-slate-300 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </div>
                  ))}

                  {selectedRule.caution && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{selectedRule.caution}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 나이스다큐 전자계약 5단계 (왼쪽 세로 목록 + 오른쪽 상세 내용) */}
      {activeTab === 'electronic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-150">
          {/* LEFT COLUMN: 전자계약 5단계 세로 목록 (핵심 제목 위주로 크게 배치) */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                전자계약 5단계 선택
              </span>
              <span className="text-xs font-semibold text-slate-400">
                총 {steps.length}단계
              </span>
            </div>

            <div className="space-y-2.5">
              {steps.map((step) => {
                const isSelected = step.step === activeStepNum;

                return (
                  <button
                    key={step.step}
                    type="button"
                    id={`nav-step-item-${step.step}`}
                    onClick={() => setActiveStepNum(step.step)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3.5 group relative ${
                      isSelected
                        ? 'bg-indigo-900 text-white border-indigo-800 shadow-md ring-2 ring-indigo-300'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Step Number Box */}
                    <div
                      className={`w-10 h-10 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100'
                      }`}
                    >
                      0{step.step}
                    </div>

                    {/* Core Title & Actor (No cluttered subtitles) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isSelected ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          STEP {step.step}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                            isSelected
                              ? 'bg-indigo-800 text-indigo-100 border border-indigo-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {step.actor}
                        </span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold truncate ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Chevron Indicator */}
                    <div className="shrink-0 self-center">
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'text-white translate-x-0.5'
                            : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Original Diagram Modal Button Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  전자계약 다이어그램 원본
                </span>
                <span className="text-[10px] font-mono text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                  고해상도 원본
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                나이스다큐 전체 결재 및 서명 흐름도를 원본 이미지로 확대 열람할 수 있습니다.
              </p>
              <button
                type="button"
                id="btn-open-contract-diagram"
                onClick={() => setModalOpen(true)}
                className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>다이어그램 전체 화면 열람</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 선택된 단계의 상세 내용 (원문 전체 표시) */}
          <div className="lg:col-span-7 xl:col-span-7 min-w-0 space-y-5">
            {/* Step Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                    STEP 0{activeStep.step}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                    진행 주체: {activeStep.actor}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={activeStep.step === 1}
                    onClick={() => setActiveStepNum(activeStep.step - 1)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="이전 단계"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-1">
                    {activeStep.step} / {steps.length}
                  </span>
                  <button
                    type="button"
                    disabled={activeStep.step === steps.length}
                    onClick={() => setActiveStepNum(activeStep.step + 1)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="다음 단계"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {activeStep.step}. {activeStep.title}
              </h2>

              {/* Step Summary Box */}
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{activeStep.summary}</span>
              </div>
            </div>

            {/* 2-Section Grid: Key Tasks & Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Key Tasks */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>주요 수행 업무</span>
                </h3>
                <div className="space-y-2">
                  {activeStep.details.map((act, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-indigo-600 font-bold mt-0.5">•</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoints */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>핵심 체크포인트</span>
                </h3>
                <div className="space-y-2">
                  {activeStep.checkpoints.map((cp, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-amber-500 font-bold mt-0.5">•</span>
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Notice */}
      <MandatoryNotice />

      {/* High-Res Diagram Modal */}
      <ContractDiagramModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

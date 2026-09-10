import React, { useState } from 'react';
import guideDataRaw from '../data/requestGuide.json';
import {
  FileText,
  DollarSign,
  ShieldAlert,
  ShoppingBag,
  Table,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Info,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

interface SectionItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  summary: string;
  badge: string;
  icon: React.ElementType;
}

export const RequestGuideView: React.FC = () => {
  const guideData = guideDataRaw;
  const [activeSectionId, setActiveSectionId] = useState<string>('attachments');
  const [selectedAttachment, setSelectedAttachment] = useState<typeof guideData.sections[0]['items'][0] | null>(null);
  const [hoveredBudgetIdx, setHoveredBudgetIdx] = useState<number | null>(null);
  const [selectedBudgetCol, setSelectedBudgetCol] = useState<{
    idx: number;
    name: string;
    headerLine1: string;
    headerLine2?: string;
    valLine1: string;
    valLine2?: string;
    example: string;
    description: string;
    guide: string;
  } | null>(null);

  // 4대 섹션 목록 정의 (세로 메뉴 항목)
  const sections: SectionItem[] = [
    {
      id: 'attachments',
      num: '01',
      title: '필수 첨부서류 4종',
      subtitle: '시행안 · RFP · 현장설명서 · 평가표',
      summary: '업체선정 요청 품의 시 반드시 구비해야 하는 필수 및 조건부 첨부서류',
      badge: '필수 4종',
      icon: FileText,
    },
    {
      id: 'budgetPlan',
      num: '02',
      title: '예산계획 작성법',
      subtitle: '품의서 본문 7대 필수 항목 산정',
      summary: '품의서 예산 테이블에 기재해야 하는 7대 필수 항목 및 연간 기준 산정 원칙',
      badge: '7대 항목',
      icon: DollarSign,
    },
    {
      id: 'soleSourceReasons',
      num: '03',
      title: '단독/수의 3대 사유',
      subtitle: '타당성 · 가격 적정성 · 업체 적격성',
      summary: '단독·수의계약 요청 시 품의서 본문에 누락 없이 구체적으로 소명해야 하는 핵심 사유',
      badge: '소명 기준',
      icon: ShieldAlert,
    },
    {
      id: 'smallPurchase',
      num: '04',
      title: '소액구매 작성 가이드',
      subtitle: '기준금액 이하 3개사 비교견적 요건',
      summary: '소액구매 간소화 진행 시 준수해야 하는 3개사 비교견적 요건 및 작성 가이드',
      badge: '3사 비교',
      icon: ShoppingBag,
    },
  ];

  const currentSection = sections.find((s) => s.id === activeSectionId) || sections[0];

  return (
    <div id="request-guide-view" className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ④
            </span>
            <span className="text-xs text-slate-500 font-medium">품의서 작성 요령</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            업체선정 요청 품의서 작성 가이드
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            왼쪽 목록에서 작성 항목을 선택하고, 오른쪽에서 구체적인 작성 기준과 서식을 확인하세요.
          </p>
        </div>

        {/* Notice Board Link Tag */}
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 flex items-center gap-2 self-start sm:self-auto">
          <FileSpreadsheet className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            표준 RFP·평가표 서식: <strong className="text-indigo-900">{guideData.noticeBoardRef.board}</strong>
          </span>
        </div>
      </div>

      {/* Main 2-Column Split Layout: Left Large Vertical Navigation + Right Detailed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Large Vertical Navigation List (lg:col-span-4 or 5) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-2.5">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              가이드 목차 선택
            </span>
            <span className="text-xs font-semibold text-slate-400">
              총 {sections.length}개 분야
            </span>
          </div>

          <div className="space-y-2.5">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isSelected = sec.id === activeSectionId;

              return (
                <button
                  key={sec.id}
                  type="button"
                  id={`nav-guide-item-${sec.id}`}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3.5 group relative ${
                    isSelected
                      ? 'bg-indigo-900 text-white border-indigo-800 shadow-md ring-2 ring-indigo-300'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Left Number & Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Text Content - Core Title Only */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          isSelected ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        SECTION {sec.num}
                      </span>
                    </div>

                    <h3
                      className={`text-base font-bold truncate ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {sec.title}
                    </h3>
                  </div>

                  {/* Active Indicator Chevron */}
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

          {/* Notice Box in sidebar */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5 mt-4">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>작성 전 중요 확인사항</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              본 가이드의 모든 양식 및 기준은 사내 외주구매 표준 프로세스에 따르며, 승인권자 전결 기준 및 두레이 상신 서식에 맞춰 정확히 작성되어야 합니다.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Rich Detailed Content Display (lg:col-span-8) */}
        <div className="lg:col-span-8 xl:col-span-8 min-w-0 space-y-3.5">
          {/* Clean Section Summary (No redundant badge boxes) */}
          <div className="pb-2 border-b border-slate-200">
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {currentSection.summary}
            </p>
          </div>

          {/* TAB 1: 필수 첨부서류 4종 상세 내용 (제목 중심 카드 & 클릭 시 상세 팝업) */}
          {activeSectionId === 'attachments' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3 text-xs text-indigo-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-medium">
                    서류 카드를 클릭하면 <strong>필수 기재 항목</strong>과 <strong>실무 작성 팁</strong> 팝업창이 열립니다.
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200/80 shrink-0">
                  총 4종 서류
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {guideData.sections[0].items.map((item, idx) => (
                  <div
                    key={idx}
                    id={`attachment-card-${idx}`}
                    onClick={() => setSelectedAttachment(item)}
                    className="bg-white rounded-xl border border-slate-200/90 p-4.5 shadow-2xs hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Badge & Sequence */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                            item.requiredType === '필수 첨부'
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200/70'
                              : item.requiredType === '평가입찰 시 필수'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/70'
                              : 'bg-amber-100 text-amber-800 border border-amber-200/70'
                          }`}
                        >
                          {item.requiredType}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          서류 0{idx + 1}
                        </span>
                      </div>

                      {/* Document Name */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>

                      {/* 1-Line Description */}
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-1">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom Action Hint */}
                    <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <span>자세한 내용 확인하기</span>
                      <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all shadow-2xs">
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 예산계획 작성법 상세 내용 */}
          {activeSectionId === 'budgetPlan' && (() => {
            const budgetColumns = [
              {
                idx: 0,
                headerLine1: '예산사용',
                headerLine2: '(월)',
                name: '예산사용(월)',
                valLine1: '26.10 ~ 27.09',
                valLine2: null,
                example: '26.10 ~ 27.09',
                description: '해당 과업의 예산이 실제 사용(집행)되는 계약 기간을 기재합니다.',
                guide: '단발성 지급인 경우 지급 예정 월(예: 26.10), 연간 용역/계약인 경우 전체 사용 기간(예: 26.10 ~ 27.09)을 명확히 표기합니다.',
              },
              {
                idx: 1,
                headerLine1: '오더부서',
                headerLine2: '(코드/코드명)',
                name: '오더부서(코드/코드명)',
                valLine1: 'C000000',
                valLine2: '외주구매팀',
                example: 'C000000 / 외주구매팀',
                description: '예산을 집행하고 주관하는 부서의 조직 코드와 부서명을 기재합니다.',
                guide: 'ERP 상에 등록된 정규 오더부서 코드(예: C000000)와 부서명(예: 외주구매팀)을 정확히 병기합니다.',
              },
              {
                idx: 2,
                headerLine1: '원가요소',
                headerLine2: '(코드/코드명)',
                name: '원가요소(코드/코드명)',
                valLine1: '55000000',
                valLine2: '지급수수료 기타',
                example: '55000000 / 지급수수료 기타',
                description: '비용이 회계 처리되는 ERP 원가 계정과목 코드와 계정명을 기재합니다.',
                guide: '정확한 원가요소 계정코드(예: 55000000)와 계정명(예: 지급수수료 기타)을 기재하여 회계 검토 지연을 방지합니다.',
              },
              {
                idx: 3,
                headerLine1: '경영예산',
                headerLine2: null,
                name: '경영예산',
                valLine1: '150,000,000',
                valLine2: null,
                example: '150,000,000원',
                description: '해당 원가요소(오더부서/계정과목)에 연간 편성된 전체 경영예산 총액을 기재합니다.',
                guide: 'ERP 예산관리 화면에서 승인된 당해 연도 확정 경영예산 총액을 확인하여 기재합니다.',
              },
              {
                idx: 4,
                headerLine1: '잔액',
                headerLine2: null,
                name: '잔액',
                valLine1: '85,000,000',
                valLine2: null,
                example: '85,000,000원',
                description: '현재 시점 기준 해당 원가요소의 실제 가용 예산 잔액을 기재합니다.',
                guide: '기집행 금액 및 기상신(결재 진행 중)된 금액을 차감한 실제 가용 잔액을 기재합니다. 잔액 부족 시 사전 예산 전용이 필요합니다.',
              },
              {
                idx: 5,
                headerLine1: '금회입찰예산',
                headerLine2: null,
                name: '금회입찰예산',
                valLine1: '45,000,000',
                valLine2: null,
                example: '45,000,000원',
                description: '금번 업체선정 과업에 소요되는 총 예정 예산액을 기재합니다.',
                guide: '연간 기준으로 작성하며, 1년 이상 장기 계약의 경우 연간 금액 기준으로 산출하여 기재합니다. (단가계약의 경우 전년도 수량 및 실적 기준 연간 예산 산정)',
              },
              {
                idx: 6,
                headerLine1: '산출근거',
                headerLine2: null,
                name: '산출근거',
                valLine1: '전년 계약단가 X 전년 연간 실적 수량(예상)',
                valLine2: null,
                example: '전년 계약단가 X 전년 연간 실적 수량(예상)',
                description: '금회 입찰예산이 도출된 구체적인 산출 공식과 계산 근거를 명시합니다.',
                guide: '전년 계약단가, 연간 실적 수량(예상치), 견적 조사 내역 등 객관적인 산출 공식을 구체적으로 작성합니다.',
              },
            ];

            const activeHoveredCol = hoveredBudgetIdx !== null ? budgetColumns[hoveredBudgetIdx] : null;

            return (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* 1. TOP: Interactive Sample Table Preview (표준 표 서식 예시) */}
                <div className="border border-slate-300 rounded-xl overflow-visible bg-white shadow-2xs">
                  {/* Table Card Header */}
                  <div className="bg-slate-900 text-white px-4 py-3 rounded-t-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold tracking-tight">
                        품의서 본문 내 예산계획 표준 표 서식 예시
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-indigo-200 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-800">
                        항목을 클릭하면 상세 해설 팝업 확인
                      </span>
                      <span className="text-[11px] text-slate-400">단위: 원, 부가세 별도</span>
                    </div>
                  </div>

                  {/* The Budget Table */}
                  <div className="overflow-x-auto p-3 sm:p-4 bg-slate-50/50 pb-28 sm:pb-32">
                    <table className="w-full text-xs border-collapse border border-slate-300 bg-white">
                      <thead>
                        <tr>
                          {budgetColumns.map((col) => {
                            const isHovered = hoveredBudgetIdx === col.idx;
                            return (
                              <th
                                key={col.idx}
                                onMouseEnter={() => setHoveredBudgetIdx(col.idx)}
                                onMouseLeave={() => setHoveredBudgetIdx(null)}
                                onClick={() => setSelectedBudgetCol(col)}
                                title="클릭하여 상세 해설 보기"
                                className={`relative p-2.5 sm:p-3 text-center border border-slate-300 transition-all duration-150 cursor-pointer select-none ${
                                  isHovered
                                    ? 'bg-indigo-100/90 text-indigo-950 font-bold ring-2 ring-inset ring-indigo-500'
                                    : 'bg-[#f4f5f7] text-slate-800 font-semibold hover:bg-indigo-50 hover:text-indigo-900'
                                }`}
                              >
                                <div className="flex flex-col items-center justify-center leading-tight">
                                  <span>{col.headerLine1}</span>
                                  {col.headerLine2 && (
                                    <span className="text-[11px] font-normal text-slate-600 mt-0.5">
                                      {col.headerLine2}
                                    </span>
                                  )}
                                </div>

                                {/* Floating Tooltip Box on Hover (Positioned below header so title is not obscured) */}
                                {isHovered && (
                                  <div
                                    className={`absolute top-full mt-2 w-64 sm:w-72 z-50 p-3 bg-slate-900 text-white rounded-xl shadow-2xl text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${
                                      col.idx === 1
                                        ? 'left-0'
                                        : col.idx === 6
                                        ? 'right-0'
                                        : 'left-1/2 -translate-x-1/2'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-1 text-xs font-bold text-indigo-300 mb-1">
                                      <div className="flex items-center gap-1.5">
                                        <Info className="w-3.5 h-3.5 shrink-0" />
                                        <span>{col.name}</span>
                                      </div>
                                      <span className="text-[10px] text-indigo-400 font-normal">클릭하여 열기</span>
                                    </div>
                                    <p className="text-[11px] text-slate-200 leading-relaxed mb-2">
                                      {col.description}
                                    </p>
                                    <div className="text-[10px] text-slate-200 bg-slate-800 p-2 rounded-lg border border-slate-700 leading-normal">
                                      <span className="text-amber-300 font-bold">산출 기준:</span> {col.guide}
                                    </div>
                                    {/* Arrow pointing up */}
                                    <div
                                      className={`absolute bottom-full border-4 border-transparent border-b-slate-900 ${
                                        col.idx === 1
                                          ? 'left-6'
                                          : col.idx === 6
                                          ? 'right-6'
                                          : 'left-1/2 -translate-x-1/2'
                                      }`}
                                    />
                                  </div>
                                )}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {budgetColumns.map((col) => {
                            const isHovered = hoveredBudgetIdx === col.idx;
                            return (
                              <td
                                key={col.idx}
                                onMouseEnter={() => setHoveredBudgetIdx(col.idx)}
                                onMouseLeave={() => setHoveredBudgetIdx(null)}
                                onClick={() => setSelectedBudgetCol(col)}
                                title="클릭하여 상세 해설 보기"
                                className={`p-2.5 sm:p-3 text-center border border-slate-300 transition-all duration-150 cursor-pointer ${
                                  isHovered
                                    ? 'bg-indigo-50/90 text-indigo-950 font-bold ring-2 ring-inset ring-indigo-400'
                                    : 'bg-white text-slate-800 hover:bg-slate-50'
                                }`}
                              >
                                {col.valLine2 ? (
                                  <div className="flex flex-col items-center justify-center leading-tight">
                                    <span className="font-mono">{col.valLine1}</span>
                                    <span className="text-slate-600 mt-0.5">{col.valLine2}</span>
                                  </div>
                                ) : (
                                  <span className={col.idx >= 3 && col.idx <= 5 ? 'font-mono' : ''}>
                                    {col.valLine1}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Active Guidance Banner under table */}
                  <div className="p-3.5 border-t border-slate-200 bg-white">
                    {activeHoveredCol ? (
                      <div
                        onClick={() => setSelectedBudgetCol(activeHoveredCol)}
                        className="flex items-start gap-3 bg-indigo-50/80 border border-indigo-200/90 p-3 rounded-xl transition-all cursor-pointer hover:bg-indigo-100/70"
                      >
                        <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {activeHoveredCol.idx + 1}
                        </div>
                        <div className="min-w-0 space-y-1 flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-indigo-950">
                                {activeHoveredCol.name}
                              </span>
                              <span className="text-[11px] font-mono text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                                예시: {activeHoveredCol.example}
                              </span>
                            </div>
                            <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
                              상세 팝업 보기 <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {activeHoveredCol.description}
                          </p>
                          <p className="text-xs text-slate-600 font-medium">
                            <strong className="text-slate-800">산출 원칙:</strong> {activeHoveredCol.guide}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>
                            표의 각 항목(헤더 및 데이터 셀)을 클릭하면 세부 해설 및 작성 기준 팝업이 표시됩니다.
                          </span>
                        </div>
                        <span className="text-[11px] text-indigo-600 font-medium hidden sm:inline">
                          마우스 오버 시 미리보기 제공
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Notice */}
                  <div className="px-4 py-2.5 bg-amber-50/80 border-t border-amber-200/70 text-xs text-amber-900 rounded-b-xl flex items-start sm:items-center gap-2 leading-relaxed">
                    <span className="font-bold shrink-0">※ 금회입찰예산 산정 필수 원칙:</span>
                    <span>1년 이상 장기 계약의 경우 반드시 연간 금액 기준으로 산출하며, 단가계약의 경우 전년도 수량 및 실적을 기준으로 연간 예산을 산정하여 기재합니다.</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 3: 단독/수의 요청사유 3대 필수 소명 상세 내용 */}
          {activeSectionId === 'soleSourceReasons' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {guideData.sections[2].reasons.map((r, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between shadow-2xs hover:border-indigo-300 transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100">
                          {r.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">사유 0{idx + 1}</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">
                        {r.key}
                      </h4>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Q. {r.question}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          작성 권장 체크포인트
                        </span>
                        {r.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                            <span className="text-indigo-600 font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: 소액구매 작성 가이드 상세 내용 */}
          {activeSectionId === 'smallPurchase' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Keywords Summary Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                  #기준금액 이하
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                  #3개사 비교견적
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                  #동일규격·동일조건
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200">
                  #최저가 원칙
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                  #분할발주 금지
                </span>
              </div>

              {/* Keyword-focused Readable Guide Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-2xs hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      복수 경쟁
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">경쟁 원칙</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    단독/수의 계약 불가 (복수 경쟁 원칙)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    소액구매는 복수 견적 경쟁을 전제로 하는 간소화 절차입니다. 특정 단독 업체와의 수의계약은 소액구매로 진행할 수 없으며 단독/수의 입찰 절차를 거쳐야 합니다.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-2xs hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      비교 견적
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">3개사 이상</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    동일 규격 3개사 비교견적서 첨부
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    동일한 품명, 규격, 수량 및 납품 조건에 대해 유효한 3개사 이상의 견적서 또는 공인된 가격 비교 자료를 품의서에 필히 첨부해야 합니다.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-2xs hover:border-indigo-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      선정 기준
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">최저가 우선</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    최저가 업체 선정 및 예외 시 사유 소명
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    견적 비교 결과 최저가 업체를 선정하는 것이 원칙입니다. 긴급 납기나 품질 등 불가피한 사유로 차순위 업체를 선정할 경우 명확한 사유를 품의서에 소명해야 합니다.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5 shadow-2xs hover:border-rose-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-100">
                      분할 금지
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    고의 분할 발주(쪼개기) 엄격 제한
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    소액구매 기준금액을 회피하기 위해 동일한 과업이나 품목을 시기 또는 수량별로 쪼개어 분할 발주하는 행위는 사내 구매 규정상 엄격히 금지됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Notice */}
      <MandatoryNotice />

      {/* Detail Modal for Selected Attachment Document */}
      {selectedAttachment && (
        <div
          id="attachment-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedAttachment(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
              <div>
                <span
                  className={`inline-block text-xs sm:text-[13px] font-bold px-3 py-0.5 rounded-md mb-1.5 ${
                    selectedAttachment.requiredType === '필수 첨부'
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200/70'
                      : selectedAttachment.requiredType === '평가입찰 시 필수'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/70'
                      : 'bg-amber-100 text-amber-800 border border-amber-200/70'
                  }`}
                >
                  {selectedAttachment.requiredType}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedAttachment.name}
                </h2>
              </div>
              <button
                type="button"
                id="btn-close-attachment-modal"
                onClick={() => setSelectedAttachment(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* Document Summary / Purpose Callout */}
              <div className="bg-indigo-50/70 border border-indigo-200/80 p-3.5 rounded-xl text-sm sm:text-[15px] text-slate-800 leading-relaxed font-medium flex items-start gap-2.5">
                <Info className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-950">문서 목적: </span>
                  <span>{selectedAttachment.summary}</span>
                </div>
              </div>

              {/* Required Details List */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600" />
                  <span>필수 기재 항목</span>
                </h4>
                <div className="space-y-2 py-1">
                  {selectedAttachment.details.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-[13px] sm:text-sm text-slate-800 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5"></span>
                      <span className="font-medium">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Writing Tip (시행안은 제외) */}
              {!selectedAttachment.name.includes('시행안') && 'tip' in selectedAttachment && selectedAttachment.tip && (
                <div className="bg-amber-50/70 border border-amber-200/70 p-3.5 rounded-xl text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <span className="font-bold text-amber-950 flex items-center gap-1 mb-1">
                    💡 실무 작성 팁
                  </span>
                  <p className="text-amber-800">{selectedAttachment.tip}</p>
                </div>
              )}

              {/* Standard Form Download Reference (시행안은 제외) */}
              {!selectedAttachment.name.includes('시행안') && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                  <FileSpreadsheet className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800">표준 서식 다운로드: </span>
                    <span>
                      {'downloadRoute' in selectedAttachment && selectedAttachment.downloadRoute
                        ? `${selectedAttachment.downloadRoute}하시기 바랍니다.`
                        : `${guideData.noticeBoardRef.board} 내 『${guideData.noticeBoardRef.docName}』에서 최신 양식을 다운로드하여 작성하시기 바랍니다.`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                id="btn-close-attachment-modal-footer"
                onClick={() => setSelectedAttachment(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Budget Table Column (예시에서 키워드 누르면 뜨는 상세 해설) */}
      {selectedBudgetCol && (
        <div
          id="budget-col-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedBudgetCol(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
              <div>
                <span className="inline-block text-xs sm:text-[13px] font-bold px-2.5 py-0.5 rounded-md mb-1 bg-indigo-100 text-indigo-800 border border-indigo-200">
                  예산 테이블 필수 항목 0{selectedBudgetCol.idx + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedBudgetCol.name}
                </h2>
              </div>
              <button
                type="button"
                id="btn-close-budget-col-modal"
                onClick={() => setSelectedBudgetCol(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs sm:text-sm">
              {/* Form Value Sample */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-700 text-xs sm:text-sm">표준 서식 표기 예시</span>
                <span className="font-mono font-bold text-sm text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-2xs">
                  {selectedBudgetCol.example}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>항목 정의 및 설명</span>
                </h4>
                <p className="text-slate-800 text-[13px] sm:text-sm leading-relaxed pl-5.5">
                  {selectedBudgetCol.description}
                </p>
              </div>

              {/* Guide / Calculation Principle */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>산출 원칙 및 실무 작성 기준</span>
                </h4>
                <p className="text-slate-800 text-[13px] sm:text-sm leading-relaxed pl-5.5">
                  {selectedBudgetCol.guide}
                </p>
              </div>

              {/* Special Warning Callout for 금회입찰예산 */}
              {selectedBudgetCol.name.includes('금회입찰예산') && (
                <div className="p-3.5 bg-amber-50 border border-amber-300/80 rounded-xl text-amber-900 leading-relaxed space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs sm:text-sm text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>장기계약 필수 준수 사항</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-800 font-medium">
                    1년 이상 장기 계약의 경우 반드시 <strong>연간 금액 기준으로 산출</strong>하여 기재하십시오. (전체 계약기간 총액이 아닌 연간 환산 금액 기준)
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                id="btn-close-budget-col-modal-footer"
                onClick={() => setSelectedBudgetCol(null)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

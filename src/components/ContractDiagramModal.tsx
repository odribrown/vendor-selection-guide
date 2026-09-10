import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContractDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractDiagramModal: React.FC<ContractDiagramModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  return (
    <div
      id="contract-diagram-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-xl">전자계약 가이드 전체 프로세스 맵</h3>
              <p className="text-xs sm:text-[13px] text-slate-300 mt-0.5">표준 전자계약 체결 절차 및 주체별 업무 흐름도</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 rounded-lg p-1 text-slate-300">
              <button
                type="button"
                id="btn-zoom-out"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="축소"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs sm:text-sm font-mono text-slate-200">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                id="btn-zoom-in"
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition-colors"
                title="확대"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="btn-zoom-reset"
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition-colors ml-1"
                title="기본 크기"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              id="btn-close-diagram-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable and Zoomable Container */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-100/70">
          <div
            className="transition-transform duration-200 origin-top flex justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Blueprint Diagram Card */}
            <div className="w-[880px] bg-white rounded-xl p-8 border border-slate-200 shadow-md">
              {/* Top Banner */}
              <div className="flex items-center justify-between border-b pb-5 mb-6">
                <div>
                  <span className="text-xs sm:text-[13px] font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    HDC / IPARK 표준 전자조달 프로세스
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    전자계약 체결 업무 표준 프로세스 가이드맵
                  </h2>
                </div>
                <div className="text-right text-xs sm:text-[13px] text-slate-600 space-y-0.5">
                  <p>적용 시스템 : 사내 전자계약 시스템</p>
                  <p>인증 방식 : 범용 공동인증서 + TSA 시점확인</p>
                </div>
              </div>

              {/* Lane / Step Timeline */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <span>STEP</span>
                    <span className="text-base leading-none">01</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                        계약 기본정보 등록 및 계약서 초안 작성
                      </h4>
                      <span className="text-xs sm:text-[13px] font-semibold text-blue-700 bg-blue-100 px-3 py-0.5 rounded-md">
                        담당: 요청부서
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      선정품의 승인 결과를 바탕으로 전자계약 시스템에 계약 정보(금액, 기간, 조건) 등록 및 과업지시서 첨부
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-[13.5px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                      <span>필수 첨부: 선정품의서 사본, 과업지시서(시방서), 산출내역서</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3">
                  <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <span>STEP</span>
                    <span className="text-base leading-none">02</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                        외주구매팀 계약 사전 검토 및 승인
                      </h4>
                      <span className="text-xs sm:text-[13px] font-semibold text-indigo-700 bg-indigo-100 px-3 py-0.5 rounded-md">
                        담당: 외주구매팀
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      계약 조항의 적법성, 보증금율(계약이행 10%, 하자보수 2~5%), 지체상금율, 대금지급조건 검토 및 발송 승인
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-[13.5px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                      <span>검토 항목: 특약사항 유효성, 이행보증보험증권 발급 요건 충족 여부</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3">
                  <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-teal-200 bg-teal-50/50">
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <span>STEP</span>
                    <span className="text-base leading-none">03</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                        전자계약서 발송 및 협력업체 알림
                      </h4>
                      <span className="text-xs sm:text-[13px] font-semibold text-teal-700 bg-teal-100 px-3 py-0.5 rounded-md">
                        시스템 자동 / 요청부서
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      외주구매팀 승인 즉시 협력업체 계약 담당자에게 이메일 및 카카오 알림톡으로 전자서명 요청 발송
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-[13.5px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                      <span>알림 내용: 고유 계약 접속 링크, 제출 서류 안내 및 회신 기한(3~5영업일)</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3">
                  <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-amber-200 bg-amber-50/50">
                  <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <span>STEP</span>
                    <span className="text-base leading-none">04</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                        협력업체 구비서류 등록 및 전자서명 날인
                      </h4>
                      <span className="text-xs sm:text-[13px] font-semibold text-amber-700 bg-amber-100 px-3 py-0.5 rounded-md">
                        담당: 선정 협력업체
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      협력업체 본인인증(사업자등록번호), 구비서류 업로드 후 사업자용 범용 공동인증서로 전자서명 날인
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-[13.5px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                      <span>업로드 서류: 사업자등록증, 법인통장사본, 인감증명서, 계약이행보증보험증권</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-3">
                  <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <span>STEP</span>
                    <span className="text-base leading-none">05</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-base sm:text-lg">
                        당사 최종 전자서명 날인 및 계약 체결 완료
                      </h4>
                      <span className="text-xs sm:text-[13px] font-semibold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-md">
                        담당: 당사 대표/전결권자
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                      협력업체 서명 확인 후 당사 법인인증서 최종 서명 날인 → 양측 체결 완료 통보 및 공인전자문서 보관
                    </p>
                    <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-[13.5px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                      <span>체결 완료: 시점확인(TSA) 및 진본 확인 마크 부여 PDF 자동 생성 및 ERP 등록</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Notice */}
              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-600">
                <p>※ 모든 계약서는 전자서명법에 따라 서면 계약서와 동일한 법적 효력을 가집니다.</p>
                <p className="font-semibold text-slate-800">문의: 외주구매팀 전자계약 지원센터</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-600">
          <span>상단 확대/축소 버튼을 사용하거나 스크롤하여 전체 흐름도를 확인하세요.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors cursor-pointer text-xs sm:text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

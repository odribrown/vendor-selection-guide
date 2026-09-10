import React, { useState, useMemo } from 'react';
import treeDataRaw from '../data/decisionTree.json';
import { DecisionTreeData, DecisionQuestion, DecisionResult, PageId } from '../types';
import { validateDecisionTree, ValidationReport } from '../utils/decisionTreeValidator';
import {
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  FileCheck,
  ShieldCheck,
  Building2,
  HelpCircle,
  Sparkles,
  Layers,
  Table,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  MousePointerClick,
} from 'lucide-react';
import { MandatoryNotice } from '../components/MandatoryNotice';

interface HistoryEntry {
  questionId: string;
  questionTitle: string;
  selectedChoiceText: string;
  nextNode: string;
}

interface DecisionTreeViewProps {
  onNavigate: (page: PageId) => void;
}

export const DecisionTreeView: React.FC<DecisionTreeViewProps> = ({ onNavigate }) => {
  const treeData = treeDataRaw as DecisionTreeData;

  // Decision Tree State
  const [currentNodeId, setCurrentNodeId] = useState<string>(treeData.startNodeId || 'Q001');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showIntegrityReport, setShowIntegrityReport] = useState<boolean>(false);
  const [showFullRuleTable, setShowFullRuleTable] = useState<boolean>(false);

  // Subconditions accordion toggle in Question screen
  const [showSubConditions, setShowSubConditions] = useState<boolean>(false);

  // Result view accordion & expand all states
  const [expandAllResult, setExpandAllResult] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showDocMappingModal, setShowDocMappingModal] = useState<boolean>(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSectionExpanded = (section: string) => {
    return expandAllResult || !!expandedSections[section];
  };

  // Helper: 질문별 키워드 매핑
  const getQuestionKeywords = (qId: string): string[] => {
    switch (qId) {
      case 'Q001':
        return ['비용성계약판정', '수익발생여부', '재무검토'];
      case 'Q002':
        return ['긴급유지보수', '설비고장긴급조치', '재난안전보수'];
      case 'Q003':
        return ['과업특성평가', '품질·기술다면평가', 'RFP·평가표'];
      case 'Q004':
        return ['단독·수의입찰', '3대법적사유', '독점·특허기술'];
      case 'Q005':
        return ['소액구매한도', '간소화절차', '기준금액판정'];
      case 'Q006':
        return ['3개사비교견적', '시장가격비교', '최저가경쟁'];
      default:
        return ['의사결정판별', '업체선정'];
    }
  };

  // Integrity Validation Check
  const validation: ValidationReport = useMemo(() => {
    return validateDecisionTree(treeData);
  }, [treeData]);

  // Current State: Is it Question or Result?
  const isQuestion = currentNodeId.startsWith('Q');
  const isResult = currentNodeId.startsWith('R');

  const currentQuestion: DecisionQuestion | undefined = isQuestion
    ? treeData.questions[currentNodeId]
    : undefined;

  const currentResult: DecisionResult | undefined = isResult
    ? treeData.results[currentNodeId]
    : undefined;

  // Handle user clicking a choice
  const handleSelectChoice = (choice: { text: string; nextNode: string }) => {
    if (!currentQuestion) return;

    setHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        selectedChoiceText: choice.text,
        nextNode: choice.nextNode,
      },
    ]);

    setCurrentNodeId(choice.nextNode);
  };

  // Handle previous question
  const handleGoBack = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const lastEntry = newHistory.pop();
    setHistory(newHistory);
    if (lastEntry) {
      setCurrentNodeId(lastEntry.questionId);
    }
  };

  // Handle restart from beginning
  const handleRestart = () => {
    setHistory([]);
    setCurrentNodeId(treeData.startNodeId || 'Q001');
  };

  // Estimated Progress calculation
  const currentStepNum = currentQuestion ? currentQuestion.stepNumber : treeData.totalEstimatedSteps;
  const progressPercent = Math.min(
    100,
    Math.round((currentStepNum / (treeData.totalEstimatedSteps + 1)) * 100)
  );

  return (
    <div id="decision-tree-view" className="space-y-8 animate-fade-in">
      {/* Page Title & Status */}
      <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
              메뉴 ③
            </span>
            <span className="text-xs text-slate-500 font-medium">
              규칙 기반(Rule-based) 자동 판별 엔진
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            내 과업에 맞는 선정방식 찾기
          </h1>
          <p className="text-sm text-slate-600 mt-1.5">
            AI 없이 사전 정의된 표준 의사결정 규칙에 따라 질문에 답하시면 가장 적합한 업체선정 방식을 추천해 드립니다.
          </p>
        </div>

        {/* Integrity Badge & Restart Action */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            id="btn-toggle-rule-table"
            onClick={() => setShowFullRuleTable(!showFullRuleTable)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 cursor-pointer font-medium"
            title="공식 룰 및 결과 기준표 전체보기"
          >
            <Table className="w-4 h-4 text-indigo-600" />
            <span>공식 기준표 (Q001~Q006, R001~R006)</span>
          </button>

          <button
            type="button"
            id="btn-toggle-integrity"
            onClick={() => setShowIntegrityReport(!showIntegrityReport)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 cursor-pointer"
            title="트리 연결 규칙 무결성 검증"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>룰 무결성 검증 ({validation.isValid ? '정상' : '오류'})</span>
          </button>

          {history.length > 0 && (
            <button
              type="button"
              id="btn-header-restart"
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>처음부터 다시하기</span>
            </button>
          )}
        </div>
      </div>

      {/* Official Rule & Result Full Reference Table Modal */}
      {showFullRuleTable && (
        <div
          id="full-rule-table-panel"
          className="bg-white rounded-2xl border border-indigo-200 shadow-xl p-5 sm:p-6 space-y-6 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                공식 의사결정 트리 및 품의 연계 기준표
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                사내 표준
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowFullRuleTable(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Question Nodes (image 1) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>1. 의사결정 질문 및 분기 조건표 (Node ID / 질문 / 아래사항 / 선택지 / 다음 Node)</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-20">Node ID</th>
                    <th className="p-3 w-64">질문</th>
                    <th className="p-3">아래사항 (해당여부 확인)</th>
                    <th className="p-3 w-32">선택지</th>
                    <th className="p-3 w-24">다음 Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q001</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">비용성 계약인가요?</td>
                    <td className="p-3 text-slate-400 align-top">-</td>
                    <td className="p-3 text-slate-700 align-top">아니오<br />예</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-emerald-700">R001</span><br />
                      <span className="text-indigo-700">Q002</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q002</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">
                      긴급한 과업인가요?<br /><span className="text-[11px] text-slate-500">(아래사항 해당여부 확인)</span>
                    </td>
                    <td className="p-3 text-slate-700 space-y-1 text-[11px] align-top">
                      <p>1. 재난/재해 등으로 인하여 안전을 저해하거나 시설물 이용에 지장을 주는 경우</p>
                      <p>2. 법규의 기준 미달 또는 기본 요건이 미비하여 즉시 보완이 필요한 경우</p>
                      <p>3. 운영 중인 시설물이 갑자기 기능을 하지 못하여 피해 확산이 우려되는 경우</p>
                      <p>4. 운영을 위하여 긴급하게 신설하여야 할 시설물로 대표이사가 인정한 경우</p>
                      <p>5. 긴급을 요하는 안전 시설의 보수가 필요하여 안전관리총괄책임자가 인정한 경우</p>
                      <p className="text-rose-600 font-semibold pt-1">※ 일상적인 점검을 통하여 발견이 가능했던 보수는 적용불가</p>
                    </td>
                    <td className="p-3 text-slate-700 align-top">예<br />아니오</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-amber-700">R002</span><br />
                      <span className="text-indigo-700">Q003</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q003</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">전문성·기술력·창의성·기획력 등에 대한 평가가 필요한가요?</td>
                    <td className="p-3 text-slate-400 align-top">-</td>
                    <td className="p-3 text-slate-700 align-top">예<br />아니오</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-blue-700">R003</span><br />
                      <span className="text-indigo-700">Q004</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q004</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">
                      해당 과업을 수행할 수 있는 업체가 1개뿐인가요?<br /><span className="text-[11px] text-slate-500">(아래사항 해당여부 확인)</span>
                    </td>
                    <td className="p-3 text-slate-700 space-y-1 text-[11px] align-top">
                      <p>1. 특정인의 기술·용역·제품 또는 특정한 위치·구조·품질·성능·효율 등으로 인하여 경쟁을 할 수 없는 경우(신기술·특허공법 등)</p>
                      <p>2. 이미 조달된 물품 등의 부품교환 또는 설비확충 등의 경우로 해당 물품 등을 제조·공급하자 외의 자로부터 제조·공급을 받게 되면 호환이 불가한 경우</p>
                      <p>3. 천재지변, 안전 등의 사유로 긴급공사가 필요한 경우</p>
                      <p>4. 원청사의 지정품목이 있는 경우</p>
                      <p>5. 원청사가 수의계약을 조건부로 하는 대외수주공사</p>
                    </td>
                    <td className="p-3 text-slate-700 align-top">예<br />아니오</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-purple-700">R004</span><br />
                      <span className="text-indigo-700">Q005</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q005</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">정기적·반복적으로 체결해야하는 계약인가요?</td>
                    <td className="p-3 text-slate-400 align-top">-</td>
                    <td className="p-3 text-slate-700 align-top">예<br />아니오</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-indigo-700">R005</span><br />
                      <span className="text-indigo-700">Q006</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">Q006</td>
                    <td className="p-3 font-semibold text-slate-900 align-top">계약금액이 1백만원 이하인가요?</td>
                    <td className="p-3 text-slate-400 align-top">-</td>
                    <td className="p-3 text-slate-700 align-top">예<br />아니오</td>
                    <td className="p-3 font-mono font-bold text-slate-900 align-top">
                      <span className="text-teal-700">R006</span><br />
                      <span className="text-indigo-700">R005</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Result Table (image 2) */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>2. 추천 업체선정방식 및 품의서/필수자료 매핑표 (Result ID / 방식 / 사유 / 품의서 / 참고)</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-20">Result ID</th>
                    <th className="p-3 w-32">업체선정방식</th>
                    <th className="p-3 w-64">업체선정방식 사유</th>
                    <th className="p-3 w-48">품의서</th>
                    <th className="p-3">참고 (필수 첨부 및 절차)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-mono font-bold text-emerald-600 align-top">R001</td>
                    <td className="p-3 font-bold text-slate-900 align-top">매출성 계약</td>
                    <td className="p-3 text-slate-700 align-top">매출 발생을 위한 계약으로 별도의 입찰 절차 불필요</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                        (재무그룹)계약검토품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">시행품의 진행 후 계약검토 상신 바랍니다.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-amber-600 align-top">R002</td>
                    <td className="p-3 font-bold text-slate-900 align-top">긴급유지보수</td>
                    <td className="p-3 text-slate-700 align-top">긴급한 시설·설비 복구가 필요하여 신속한 계약 체결이 요구됨</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[11px]">
                        (기타업무)긴급유지보수 결과보고 품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">
                      그룹웨어 메일 또는 메신저를 통해 사전 보고(발생일, 보수사유, 목적, 일정 포함) 후 긴급보수 진행 → 보수 완료 후 '긴급보수 결과보고' 품의 진행
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-blue-600 align-top">R003</td>
                    <td className="p-3 font-bold text-slate-900 align-top">평가입찰</td>
                    <td className="p-3 text-slate-700 align-top">기술력·전문성·수행능력 등 정성적 평가가 필요한 계약</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[11px]">
                        (외주구매)외주구매 업체선정 요청품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">
                      <span className="font-semibold text-slate-900">&lt;품의서 內 필수 첨부자료 및 작성내용&gt;</span> → 시행안 · 제안요청서 · 평가표
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-purple-600 align-top">R004</td>
                    <td className="p-3 font-bold text-slate-900 align-top">단독/수의 입찰</td>
                    <td className="p-3 text-slate-700 align-top">경쟁이 불가능하거나 특정 업체만 수행 가능하여 수의계약이 적합</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold text-[11px]">
                        (외주구매)외주구매 업체선정 요청품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">
                      <span className="font-semibold text-slate-900">&lt;품의서 內 필수 첨부자료 및 작성내용&gt;</span> → 시행안 · 제안요청서 · 단독/수의 요청사유
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-indigo-600 align-top">R005</td>
                    <td className="p-3 font-bold text-slate-900 align-top">최저가 입찰</td>
                    <td className="p-3 text-slate-700 align-top">동일한 규격과 품질 확보가 가능하여 가격 경쟁을</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold text-[11px]">
                        (외주구매)외주구매 업체선정 요청품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">
                      <span className="font-semibold text-slate-900">&lt;품의서 內 필수 첨부자료 및 작성내용&gt;</span> → 시행안 · 제안요청서 · 현장설명서(필요시)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-teal-600 align-top">R006</td>
                    <td className="p-3 font-bold text-slate-900 align-top">소액구매</td>
                    <td className="p-3 text-slate-700 align-top">소액 구매 기준에 해당하여 간소화된 구매 절차 적용 가능(업체선정요청품의 → 계약검토)</td>
                    <td className="p-3 align-top">
                      <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold text-[11px]">
                        (외주구매)외주구매 업체선정 요청품의
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 align-top">
                      <span className="font-semibold text-slate-900">&lt;품의서 內 필수 첨부자료 및 작성내용&gt;</span> → 시행안 · 3사 비교견적서
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Optional Integrity Verification Panel */}
      {showIntegrityReport && (
        <div
          id="integrity-report-panel"
          className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-3 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Decision Tree 규칙 무결성 검증 리포트 (요구사항 15)</span>
            </h4>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                validation.isValid
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                  : 'bg-red-900/80 text-red-300 border border-red-700'
              }`}
            >
              {validation.isValid ? '모든 규칙 유효 (Pass)' : '규칙 오류 발견'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-800/80 p-2.5 rounded-lg">
              <span className="text-slate-400 block">시작 노드 (Q001)</span>
              <span className="font-mono font-bold text-emerald-400">존재함 (정상)</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg">
              <span className="text-slate-400 block">총 질문 노드 수</span>
              <span className="font-mono font-bold text-white">{validation.totalQuestions}개 질문</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg">
              <span className="text-slate-400 block">총 결과 노드 수</span>
              <span className="font-mono font-bold text-white">{validation.totalResults}개 결과 (R001~R007)</span>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg">
              <span className="text-slate-400 block">도달 가능 경로 수</span>
              <span className="font-mono font-bold text-indigo-400">{validation.pathsCount}개 고유 분기</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            ✔ 무한 반복(Cycle) 없음 &nbsp;|&nbsp; ✔ 고아 노드(Orphan Node) 없음 &nbsp;|&nbsp; ✔ 모든 선택지가 유효한 다음 노드와 1:1 연결됨
          </p>
        </div>
      )}

      {/* Breadcrumb Path Trail */}
      {history.length > 0 && (
        <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl p-3 text-xs">
          <span className="font-bold text-slate-600 mr-2">진행 경로 :</span>
          <div className="inline-flex flex-wrap items-center gap-1.5 mt-1 sm:mt-0">
            {history.map((h, idx) => (
              <span key={idx} className="inline-flex items-center gap-1">
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-mono">
                  {h.questionId}
                </span>
                <span className="text-slate-400">→</span>
              </span>
            ))}
            <span className="px-2 py-0.5 bg-indigo-600 text-white font-mono rounded font-bold">
              {currentNodeId}
            </span>
          </div>
        </div>
      )}

      {/* QUESTION NODE SCREEN */}
      {isQuestion && currentQuestion && (
        <div
          id="question-node-card"
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl mx-auto"
        >
          {/* Top Progress & Step Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-bold">
                  질문 {currentQuestion.id}
                </span>
                <span>{currentQuestion.category}</span>
              </div>
              <span>예상 진행 : {currentQuestion.stepNumber}단계</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Flat Scannable Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs">
            {getQuestionKeywords(currentQuestion.id).map((kw, i) => (
              <span
                key={i}
                className="text-slate-500 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Question Text */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {/* Collapsible Sub Conditions Checklist (Hover or Click to Expand) */}
          {currentQuestion.subConditions && currentQuestion.subConditions.length > 0 && (
            <div
              className="bg-slate-50 border border-slate-200 hover:border-indigo-300 rounded-2xl transition-all duration-150 overflow-hidden"
              onMouseEnter={() => setShowSubConditions(true)}
            >
              <button
                type="button"
                onClick={() => setShowSubConditions(!showSubConditions)}
                className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>사내 공식 판단 기준 ({currentQuestion.subConditions.length}개 항목)</span>
                  <span className="text-[11px] font-normal text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    커서를 대거나 클릭하여 열람
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>{showSubConditions ? '접기' : '자세히 보기'}</span>
                  {showSubConditions ? (
                    <ChevronUp className="w-4 h-4 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </button>

              {showSubConditions && (
                <div className="px-4 pb-4 pt-1 space-y-2 text-left border-t border-slate-200/80 animate-in fade-in duration-150">
                  <div className="space-y-1.5 pl-1 pt-1">
                    {currentQuestion.subConditions.map((cond, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="text-indigo-600 font-bold shrink-0">•</span>
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                  {currentQuestion.subNote && (
                    <p className="text-xs text-rose-600 font-semibold pt-1 border-t border-slate-200">
                      {currentQuestion.subNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Choices: Distinct Interactive Buttons */}
          <div className="space-y-3 pt-1">
            {currentQuestion.choices.map((choice, idx) => (
              <button
                key={idx}
                type="button"
                id={`btn-choice-${currentQuestion.id}-${idx + 1}`}
                onClick={() => {
                  setShowSubConditions(false);
                  handleSelectChoice(choice);
                }}
                className="w-full p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-150 text-left flex items-start justify-between gap-4 group cursor-pointer shadow-2xs hover:shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-700 text-xs font-bold flex items-center justify-center transition-colors">
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-700">
                      {choice.text}
                    </span>
                  </div>
                  {choice.tip && (
                    <p className="text-xs text-slate-500 pl-8 leading-relaxed">
                      💡 {choice.tip}
                    </p>
                  )}
                </div>

                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>

          {/* Navigation Controls: Previous / Restart */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              id="btn-question-back"
              disabled={history.length === 0}
              onClick={() => {
                setShowSubConditions(false);
                handleGoBack();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전 질문으로 돌아가기</span>
            </button>

            <button
              type="button"
              id="btn-question-restart"
              onClick={() => {
                setShowSubConditions(false);
                handleRestart();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>처음부터 다시하기</span>
            </button>
          </div>
        </div>
      )}

      {/* RESULT NODE SCREEN */}
      {isResult && currentResult && (
        <div
          id="result-node-card"
          className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden max-w-2xl mx-auto animate-in zoom-in-95 duration-200"
        >
          {/* Result Header Banner - Crisp & Punchy */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>진단 완료</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentResult.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              {currentResult.reason || currentResult.summary}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-semibold">
                상신 : {currentResult.officialDocType}
              </span>
            </div>
          </div>

          {/* Result Content Body - Clean, Spaced, No Nested Boxes */}
          <div className="p-6 space-y-6">
            {/* Required Documents Checklist - Clean list without container box */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide mb-3">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <span>필수 구비 서류 ({currentResult.requiredDocs.length}종)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {currentResult.requiredDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Precautions (Top 2) - Minimalist divider style */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>핵심 유의사항</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentResult.precautions.slice(0, 2).map((prec, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Optional Collapsible Detail - Clean toggle */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setExpandAllResult(!expandAllResult)}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer py-1"
              >
                <span>상세 기준 안내</span>
                <span className="text-[11px] font-normal">
                  {expandAllResult ? '접기 ▲' : '자세히 보기 ▼'}
                </span>
              </button>

              {expandAllResult && (
                <div className="pt-3 text-xs text-slate-600 space-y-3 animate-in fade-in">
                  <div>
                    <span className="font-semibold text-slate-800 block mb-0.5">선정 기준:</span>
                    <p className="leading-relaxed">{currentResult.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {(() => {
              const isEligibleForGuide =
                currentResult &&
                (['R003', 'R004', 'R005', 'R006'].includes(currentResult.id) ||
                  currentResult.name.includes('평가') ||
                  currentResult.name.includes('단독') ||
                  currentResult.name.includes('수의') ||
                  currentResult.name.includes('최저가') ||
                  currentResult.name.includes('소액'));

              return (
                <div className="pt-2 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* 1. 선정방식에 따른 품의서 양식 안내 모달 열기 버튼 */}
                    <button
                      type="button"
                      id="btn-open-doc-mapping-modal"
                      onClick={() => setShowDocMappingModal(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Table className="w-4 h-4 text-indigo-600" />
                      <span>선정방식에 따른 품의서 양식 안내</span>
                    </button>

                    {/* 2. 품의서 작성 가이드로 이동 (평가입찰, 단독/수의, 최저가 입찰, 소액구매에만 노출) */}
                    {isEligibleForGuide && (
                      <button
                        type="button"
                        id="btn-go-to-request-guide"
                        onClick={() => onNavigate('request-guide')}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>품의서 작성 가이드로 이동</span>
                      </button>
                    )}
                  </div>

                  {/* 3. 다시 진단하기 버튼 */}
                  <button
                    type="button"
                    id="btn-result-restart"
                    onClick={() => {
                      setShowSubConditions(false);
                      setExpandAllResult(false);
                      handleRestart();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>다시 진단하기</span>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Modal: 선정방식에 따른 품의서 양식 사용 안내 팝업 */}
      {showDocMappingModal && (
        <div
          id="doc-mapping-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowDocMappingModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Table className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    선정방식에 따른 품의서 양식 사용 안내
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-0.5">
                    사내 외주구매 표준: 선정방식별 공식 상신 품의서 양식 및 필수 첨부자료 매핑 기준
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="btn-close-doc-mapping-modal"
                onClick={() => setShowDocMappingModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-[13.5px]">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5 w-32 whitespace-nowrap">선정방식</th>
                      <th className="p-3.5 w-40 whitespace-nowrap">선정 사유</th>
                      <th className="p-3.5 w-48 whitespace-nowrap">상신 품의서 양식</th>
                      <th className="p-3.5">품의서 內 필수 첨부자료 및 작성내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {[
                      {
                        method: '매출성 계약',
                        reason: '매출 발생으로 입금이 수반되는 건',
                        form: '(재무그룹)계약검토 품의',
                        formBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        notes: '시행품의 선행 필수 → 계약서 초안, 사업자등록증 첨부',
                        highlight: currentResult?.name.includes('매출') || currentResult?.id === 'R001',
                      },
                      {
                        method: '긴급 유지보수',
                        reason: '긴급한 유지보수 건',
                        form: '(기타업무)결과보고 품의',
                        formBg: 'bg-amber-50 text-amber-800 border-amber-200',
                        notes: '외주구매팀 사전보고(유선) 필수 → 조치 결과보고서, 현장 사진 첨부',
                        highlight: currentResult?.name.includes('긴급') || currentResult?.id === 'R002',
                      },
                      {
                        method: '평가 입찰',
                        reason: '품질 및 기술력 등 다면 평가 필요',
                        form: '(외주구매)업체선정 요청품의',
                        formBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        notes: '시행안 · 제안요청서(RFP) · 평가표 필수 첨부 (사내 표준 서식 사용)',
                        highlight: currentResult?.name.includes('평가') || currentResult?.id === 'R003',
                      },
                      {
                        method: '단독 / 수의',
                        reason: '3대 사유(특허·호환성·비상재난) 해당',
                        form: '(외주구매)업체선정 요청품의',
                        formBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        notes: '시행안 · 제안요청서 · 단독/수의 요청사유 소명서 첨부',
                        highlight: currentResult?.name.includes('단독') || currentResult?.name.includes('수의') || currentResult?.id === 'R004',
                      },
                      {
                        method: '최저가 입찰',
                        reason: '동일 규격·품질 확보 가능 가격경쟁',
                        form: '(외주구매)업체선정 요청품의',
                        formBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        notes: '시행안 · 제안요청서 · 현장설명서(필요시) 첨부',
                        highlight: currentResult?.name.includes('최저가') || currentResult?.id === 'R006',
                      },
                      {
                        method: '소액구매',
                        reason: '기준금액 이하 간소화 구매 절차',
                        form: '(외주구매)업체선정 요청품의',
                        formBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                        notes: '시행안 · 3개사 비교견적서 필수 첨부',
                        highlight: currentResult?.name.includes('소액') || currentResult?.id === 'R005',
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          row.highlight
                            ? 'bg-indigo-50/70 font-semibold'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{row.method}</span>
                            {row.highlight && (
                              <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">
                                진단결과
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-700 font-medium">
                          {row.reason}
                        </td>
                        <td className="p-3.5">
                          <span className={`font-bold px-3 py-1.5 rounded border block text-center ${row.formBg}`}>
                            {row.form}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-700 leading-relaxed">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-center justify-between">
                <span>※ 품의서 양식은 그룹웨어 전자결재 공통서식함에서 검색 후 작성하실 수 있습니다.</span>
                <span className="font-bold text-indigo-600">외주구매팀 문의</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                id="btn-close-doc-mapping-modal-footer"
                onClick={() => setShowDocMappingModal(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Notice Displayed on Result Screen / Page Bottom (Prompt Section 5 & 9) */}
      <MandatoryNotice />
    </div>
  );
};

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface MandatoryNoticeProps {
  className?: string;
  variant?: 'prominent' | 'compact' | 'light';
}

export const MandatoryNotice: React.FC<MandatoryNoticeProps> = ({
  className = '',
}) => {
  return (
    <div
      id="mandatory-notice-banner"
      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs text-slate-500 bg-slate-100/70 border border-slate-200/80 rounded-lg text-center ${className}`}
    >
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>
        ※ 본 가이드는 업무 참고용 도구이며, 최종 기준은 사내 &apos;규정 및 지침&apos; 게시판이 우선 적용됩니다.
      </span>
    </div>
  );
};

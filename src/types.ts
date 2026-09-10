export type PageId =
  | 'home'
  | 'process'
  | 'methods'
  | 'tree'
  | 'request-guide'
  | 'contract-guide'
  | 'faq';

export interface DecisionChoice {
  text: string;
  nextNode: string;
  tip?: string;
  badge?: string;
}

export interface DecisionQuestion {
  id: string;
  stepNumber: number;
  title: string;
  question: string;
  description?: string;
  category?: string;
  badge?: string;
  subConditions?: string[];
  subNote?: string;
  choices: DecisionChoice[];
}

export interface DecisionResult {
  id: string;
  methodId: string;
  name: string;
  badge: string;
  badgeColor: string;
  reason: string;
  officialDocType: string;
  officialNote: string;
  requiredAttachmentSummary?: string;
  summary: string;
  description: string;
  keyCriteria: string[];
  precautions: string[];
  requiredDocs: string[];
  approvalNotes: string;
  relatedFaqIds: string[];
}

export interface DecisionTreeData {
  startNodeId: string;
  totalEstimatedSteps: number;
  questions: Record<string, DecisionQuestion>;
  results: Record<string, DecisionResult>;
}

export interface SelectionMethod {
  id: string;
  num: number;
  name: string;
  shortName: string;
  category: '일반/경쟁' | '긴급/특수' | '간소화' | '상담';
  badgeColor: string;
  officialReason?: string;
  officialDocType?: string;
  officialNote?: string;
  requiredAttachmentSummary?: string;
  tagline: string;
  description: string;
  keyCharacteristics: string[];
  applicableCases: string[];
  requiredDocs: string[];
  approvalFlow: string[];
  precautions: string[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  responsibleDepartment: string;
  actionType: '상신' | '시행' | '검토' | '체결';
  tagColor: string;
  shortSummary: string;
  description: string;
  keyTasks: string[];
  requiredDocs: string[];
  checkpoints: string[];
  approxDuration?: string;
  guideNotice?: string;
}

export interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  highlight?: string;
}

export type FAQItem = FaqItem;

export interface ContractStep {
  step: number;
  title: string;
  actor: string;
  actorBadge: string;
  tagColor: string;
  summary: string;
  details: string[];
  checkpoints: string[];
  requiredDocs: string[];
}

export interface RequestGuideSection {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  content: any;
}

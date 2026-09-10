import { DecisionTreeData } from '../types';

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalQuestions: number;
  totalResults: number;
  allReachableResults: string[];
  unreachableResults: string[];
  pathsCount: number;
}

export function validateDecisionTree(data: DecisionTreeData): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const questionIds = Object.keys(data.questions);
  const resultIds = Object.keys(data.results);

  // 1. Check Q001 exists
  if (!data.questions['Q001']) {
    errors.push("시작 노드인 'Q001' 질문이 정의되어 있지 않습니다.");
  }

  if (data.startNodeId !== 'Q001') {
    warnings.push(`startNodeId가 'Q001'이 아닌 '${data.startNodeId}'로 지정되어 있습니다.`);
  }

  // 2. Check each question
  for (const qId of questionIds) {
    const q = data.questions[qId];
    if (!q.choices || q.choices.length === 0) {
      errors.push(`질문 노드 [${qId}]에 선택지가 없습니다.`);
      continue;
    }

    for (let i = 0; i < q.choices.length; i++) {
      const choice = q.choices[i];
      if (!choice.nextNode) {
        errors.push(`질문 노드 [${qId}]의 ${i + 1}번째 선택지에 연결된 nextNode가 비어 있습니다.`);
        continue;
      }

      const nextNode = choice.nextNode;
      const isQuestion = nextNode.startsWith('Q');
      const isResult = nextNode.startsWith('R');

      if (!isQuestion && !isResult) {
        errors.push(
          `질문 노드 [${qId}]의 선택지가 올바른 접두사('Q' 또는 'R')를 가진 노드를 참조하지 않습니다: '${nextNode}'`
        );
      }

      if (isQuestion && !data.questions[nextNode]) {
        errors.push(
          `질문 노드 [${qId}]의 선택지가 존재하지 않는 질문 노드 [${nextNode}]를 참조하고 있습니다.`
        );
      }

      if (isResult && !data.results[nextNode]) {
        errors.push(
          `질문 노드 [${qId}]의 선택지가 존재하지 않는 결과 노드 [${nextNode}]를 참조하고 있습니다.`
        );
      }
    }
  }

  // 3. Check for infinite cycles and reachability using DFS
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const reachableResults = new Set<string>();
  let pathsCount = 0;

  function traverse(nodeId: string, currentPath: string[]): boolean {
    if (recStack.has(nodeId)) {
      errors.push(`무한 순환(Cycle)이 감지되었습니다: ${[...currentPath, nodeId].join(' -> ')}`);
      return false;
    }

    if (nodeId.startsWith('R')) {
      if (data.results[nodeId]) {
        reachableResults.add(nodeId);
        pathsCount++;
        return true;
      } else {
        errors.push(`존재하지 않는 결과 노드 도달: ${nodeId}`);
        return false;
      }
    }

    const question = data.questions[nodeId];
    if (!question) {
      errors.push(`존재하지 않는 질문 노드 참조: ${nodeId}`);
      return false;
    }

    recStack.add(nodeId);
    visited.add(nodeId);

    let allValid = true;
    for (const choice of question.choices) {
      const valid = traverse(choice.nextNode, [...currentPath, nodeId]);
      if (!valid) allValid = false;
    }

    recStack.delete(nodeId);
    return allValid;
  }

  if (data.questions['Q001']) {
    traverse('Q001', []);
  }

  // 4. Check unreachable results
  const unreachableResults: string[] = [];
  for (const rId of resultIds) {
    if (!reachableResults.has(rId)) {
      warnings.push(`결과 노드 [${rId}] (${data.results[rId].name})에 도달하는 경로가 없습니다.`);
      unreachableResults.push(rId);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalQuestions: questionIds.length,
    totalResults: resultIds.length,
    allReachableResults: Array.from(reachableResults).sort(),
    unreachableResults,
    pathsCount,
  };
}

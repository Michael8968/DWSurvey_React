import { Question } from '../dw-survey-parse';

export const dwGetQuestionScore = (question: Question): number => {
  if (!question.quAttr?.scoreAttr) {
    return 0;
  }
  return question.quAttr.scoreAttr.maxScore || 0;
};

export const dwGetQuestionScoreText = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  return score > 0 ? `${score}分` : '不计分';
};

export const dwGetQuestionScoreColor = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return '#999999';
  } else if (score <= 5) {
    return '#52c41a';
  } else if (score <= 10) {
    return '#1890ff';
  } else if (score <= 20) {
    return '#faad14';
  } else {
    return '#f5222d';
  }
};

export const dwGetQuestionScoreIcon = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return 'icon-score-0';
  } else if (score <= 5) {
    return 'icon-score-5';
  } else if (score <= 10) {
    return 'icon-score-10';
  } else if (score <= 20) {
    return 'icon-score-20';
  } else {
    return 'icon-score-50';
  }
};

export const dwGetQuestionScoreLevel = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return '不计分';
  } else if (score <= 5) {
    return '简单';
  } else if (score <= 10) {
    return '一般';
  } else if (score <= 20) {
    return '困难';
  } else {
    return '极难';
  }
};

export const dwGetQuestionScoreLevelColor = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return '#999999';
  } else if (score <= 5) {
    return '#52c41a';
  } else if (score <= 10) {
    return '#1890ff';
  } else if (score <= 20) {
    return '#faad14';
  } else {
    return '#f5222d';
  }
};

export const dwGetQuestionScoreLevelIcon = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return 'icon-level-0';
  } else if (score <= 5) {
    return 'icon-level-1';
  } else if (score <= 10) {
    return 'icon-level-2';
  } else if (score <= 20) {
    return 'icon-level-3';
  } else {
    return 'icon-level-4';
  }
};

export const dwGetQuestionScoreLevelText = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return '不计分';
  } else if (score <= 5) {
    return '简单';
  } else if (score <= 10) {
    return '一般';
  } else if (score <= 20) {
    return '困难';
  } else {
    return '极难';
  }
};

export const dwGetQuestionScoreLevelDesc = (question: Question): string => {
  const score = dwGetQuestionScore(question);
  if (score <= 0) {
    return '此题不计分';
  } else if (score <= 5) {
    return '此题较简单，分值较低';
  } else if (score <= 10) {
    return '此题难度一般，分值适中';
  } else if (score <= 20) {
    return '此题较难，分值较高';
  } else {
    return '此题极难，分值很高';
  }
}; 
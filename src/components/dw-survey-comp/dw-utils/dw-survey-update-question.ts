import { v4 as uuidV4 } from 'uuid';
import { Question, Survey, Option } from './dw-survey-parse';

export const dwResetQuestionRefreshValue = (question: Question): Question => {
  const newQuestion = { ...question };
  newQuestion.id = uuidV4();
  newQuestion.quFocusObj = {
    quFocus: false,
    quMoreOptionShowEdit: false,
    quMoreOptionShow: false,
    quScorePopoverShow: false,
    quScaleTextPopoverShow: false
  };
  return newQuestion;
};

export const dwResetSurveyQuestionRefreshValue = (survey: Survey): Survey => {
  const newSurvey = { ...survey };
  newSurvey.questions = newSurvey.questions.map(question => dwResetQuestionRefreshValue(question));
  return newSurvey;
};

export const dwSurveyQuAddOption = (survey: Survey, index: number): void => {
  const question = survey.questions[index];
  if (!question.quOptions) {
    question.quOptions = [];
  }

  const newOption: Option = {
    id: uuidV4(),
    optionText: '',
    optionValue: '',
    isOther: false,
    isBlank: false,
    isRequired: false,
    isScore: false,
    score: 0,
    isLogic: false,
    logicType: '',
    logicValue: '',
    logicQuId: '',
    logicQuOptionId: '',
    isShow: true,
    isShowOption: true,
    isShowOptionText: true,
    isShowOptionValue: true,
    isShowOptionScore: true,
    isShowOptionLogic: true,
    isShowOptionOther: true,
    isShowOptionBlank: true,
    isShowOptionRequired: true,
    isShowOptionShow: true,
    isShowOptionShowOption: true,
    isShowOptionShowOptionText: true,
    isShowOptionShowOptionValue: true,
    isShowOptionShowOptionScore: true,
    isShowOptionShowOptionLogic: true,
    isShowOptionShowOptionOther: true,
    isShowOptionShowOptionBlank: true,
    isShowOptionShowOptionRequired: true,
    isShowOptionShowOptionShow: true
  };

  question.quOptions.push(newOption);
};

export const dwSurveyQuUpdateOption = (survey: Survey, index: number, optionIndex: number, option: Partial<Option>): void => {
  const question = survey.questions[index];
  if (question.quOptions && question.quOptions[optionIndex]) {
    question.quOptions[optionIndex] = { ...question.quOptions[optionIndex], ...option };
  }
};

export const dwSurveyQuDeleteOption = (survey: Survey, index: number, optionIndex: number): void => {
  const question = survey.questions[index];
  if (question.quOptions) {
    question.quOptions.splice(optionIndex, 1);
  }
};

export const dwSurveyQuMoveOption = (survey: Survey, index: number, oldIndex: number, newIndex: number): void => {
  const question = survey.questions[index];
  if (question.quOptions) {
    const option = question.quOptions[oldIndex];
    question.quOptions.splice(oldIndex, 1);
    question.quOptions.splice(newIndex, 0, option);
  }
};

export const dwSurveyQuUpdateTitle = (survey: Survey, index: number, title: string): void => {
  const question = survey.questions[index];
  if (question.quTitleObj) {
    question.quTitleObj.dwText = title;
    question.quTitleObj.dwHtml = title;
  }
};

export const dwSurveyQuUpdateNote = (survey: Survey, index: number, note: string): void => {
  const question = survey.questions[index];
  if (question.quNoteObj) {
    question.quNoteObj.dwText = note;
    question.quNoteObj.dwHtml = note;
  }
};

export const dwSurveyQuUpdateAttr = (survey: Survey, index: number, attr: Partial<Question['quAttr']>): void => {
  const question = survey.questions[index];
  if (question.quAttr) {
    question.quAttr = { ...question.quAttr, ...attr };
  }
};

export const dwSurveyQuUpdateLogic = (survey: Survey, index: number, logic: any): void => {
  const question = survey.questions[index];
  if (question.questionLogics) {
    question.questionLogics = logic;
  }
};

export const dwSurveyQuUpdateOptionScore = (survey: Survey, index: number, optionIndex: number, score: number): void => {
  const question = survey.questions[index];
  if (question.quOptions && question.quOptions[optionIndex]) {
    question.quOptions[optionIndex].score = score;
  }
};

interface OptionLogic {
  logicType: string;
  logicValue: string;
  logicQuId: string;
  logicQuOptionId: string;
}

export const dwSurveyQuUpdateOptionLogic = (survey: Survey, index: number, optionIndex: number, logic: OptionLogic): void => {
  const question = survey.questions[index];
  if (question.quOptions && question.quOptions[optionIndex]) {
    question.quOptions[optionIndex].logicType = logic.logicType;
    question.quOptions[optionIndex].logicValue = logic.logicValue;
    question.quOptions[optionIndex].logicQuId = logic.logicQuId;
    question.quOptions[optionIndex].logicQuOptionId = logic.logicQuOptionId;
  }
}; 
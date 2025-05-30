import { Question } from '../types';

export function getQuestionAnswerData(question: Question): void {
  const quType = question.quType;
  if (quType === 'FILLBLANK') {
    if (question.answer === undefined || question.answer === null) {
      question.answer = '';
    }
  } else if (quType === 'MULTIFILLBLANK') {
    const quMultiFillblanks = question.quMultiFillblanks;
    if (quMultiFillblanks && quMultiFillblanks.length > 0) {
      quMultiFillblanks.forEach((item) => {
        if (item.inputText === undefined || item.inputText === null) {
          item.inputText = '';
        }
      });
    }
  } else if (quType === 'RADIO') {
    const quRadios = question.quRadios;
    if (quRadios && quRadios.length > 0) {
      quRadios.forEach((item) => {
        if (item.checked === undefined || item.checked === null) {
          item.checked = false;
        }
        if (item.otherText === undefined || item.otherText === null) {
          item.otherText = '';
        }
      });
    }
  } else if (quType === 'CHECKBOX') {
    const quCheckboxs = question.quCheckboxs;
    if (quCheckboxs && quCheckboxs.length > 0) {
      quCheckboxs.forEach((item) => {
        if (item.checked === undefined || item.checked === null) {
          item.checked = false;
        }
        if (item.otherText === undefined || item.otherText === null) {
          item.otherText = '';
        }
      });
    }
  }
} 
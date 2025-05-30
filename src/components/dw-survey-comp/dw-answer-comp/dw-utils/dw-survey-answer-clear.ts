export function clearSurveyAnswer(survey: any) {
  const questions = survey.questions;
  if (questions !== undefined) {
    console.debug("questions", questions);
    questions.map((item: any, index: number) => {
      console.debug("item", item);
      clearQuestionAnswerData(item);
    });
  }
}

export function clearQuestionAnswerData(question: any) {
  const quType = question.quType;
  if (quType === "RADIO") {
    clearQuRadioAnswerData(question);
  } else if (quType === "CHECKBOX") {
    clearQuCheckboxAnswerData(question);
  } else if (quType === "ORDERQU") {
    clearQuOrderByAnswerData(question);
  } else if (quType === "MULTIFILLBLANK") {
    clearQuMFbkAnswerData(question);
  } else if (quType === "SCORE") {
    // anQuestion.anScores = []
    clearQuScoreAnswerData(question);
  } else if (quType === "FILLBLANK") {
    clearQuFbkAnswerData(question);
  } else if (quType === "UPLOADFILE") {
    clearQuUploadAnswerData(question);
  }
  if (question.hasOwnProperty("anQuestion")) delete question.anQuestion;
  // if (question.hasOwnProperty('validateObj')) delete question.validateObj
  question.validateObj = { errorText: "", isOk: true, isAnswerOk: false };
}

function clearQuRadioAnswerData(question: any) {
  const quRadios = question.quRadios;
  quRadios.map((option: any, index: number) => {
    option.checked = false;
  });
}

function clearQuCheckboxAnswerData(question: any) {
  const quCheckboxs = question.quCheckboxs;
  quCheckboxs.map((option: any, index: number) => {
    option.checked = false;
  });
}

function clearQuOrderByAnswerData(question: any) {
  const quOrderbys = question.quOrderbys;
  quOrderbys.forEach((option: any, itemIndex: number) => {
    option.checked = false;
    option.orderIndex = 0;
  });
}

function clearQuMFbkAnswerData(question: any) {
  const quMultiFillblanks = question.quMultiFillblanks;
  quMultiFillblanks.map((option: any, index: number) => {
    option.inputText = "";
  });
}

function clearQuScoreAnswerData(question: any) {
  const quScores = question.quScores;
  quScores.map((option: any, index: number) => {
    option.checked = false;
    option.answerScore = 0;
  });
}

function clearQuFbkAnswerData(question: any) {
  question.answer = null;
}

function clearQuUploadAnswerData(question: any) {
  if (question.hasOwnProperty("upFileList")) {
    question.upFileList = null;
  }
}

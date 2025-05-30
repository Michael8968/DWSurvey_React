export interface Survey {
  dwEsSurveyAnswer: Answer;
  firstLoadAnswer: boolean;
  questions: Question[];
  surveyAttrs: {
    opoqAttr?: {
      enabled: boolean;
    };
  };
  pageAttr: {
    pageSize: number;
    curPage: number;
    begin: number | null;
    end: number | null;
  };
  answerProgress: {
    totalAnQu: number;
    completeAnQu: number;
    percentage: number;
  };
}

export interface Question {
  dwId: string;
  quType: string;
  quTitleObj: {
    dwHtml: string;
    dwText: string;
    dwPlaceholder: string;
    isNew: boolean;
  };
  quNoteObj: {
    dwHtml: string;
    dwText: string;
    dwPlaceholder: string;
    isNew: boolean;
  };
  quFocusObj?: {
    dwHtml: string;
    dwText: string;
    dwPlaceholder: string;
    isNew: boolean;
  };
  quRadios?: Array<{
    dwId: string;
    checked: boolean;
    otherText?: string;
  }>;
  quCheckboxs?: Array<{
    dwId: string;
    checked: boolean;
    otherText?: string;
  }>;
  quOrderbys?: Array<{
    dwId: string;
    checked: boolean;
    orderIndex?: number;
  }>;
  quMultiFillblanks?: Array<{
    dwId: string;
    inputText?: string;
  }>;
  quScores?: Array<{
    dwId: string;
    checked: boolean;
    answerScore?: number;
  }>;
  quRows?: Array<{
    dwId: string;
    rowCols?: Array<{
      dwId: string;
      checked: boolean;
      answerValue: any;
      tempEmptyOption?: boolean;
    }>;
    answerValue?: number;
    sliderAnswerValue?: number;
  }>;
  quCols?: Array<{
    dwId: string;
    tempEmptyOption?: boolean;
  }>;
  quAttr: {
    inputAttr?: {
      commonAttr: {
        checkType: string;
        placeholder: string;
        defaultValue?: string;
        isRequired?: boolean;
      };
      dateTimeAttr?: {
        attrs: string[];
      };
    };
  };
  answer?: any;
  upFileList?: Array<{
    response: {
      data: Array<{
        location: string;
        filename: string;
      }>;
    };
    name: string;
  }>;
  showQu: boolean;
  logicIsHide: boolean;
  pageIndex: number;
  anQuestion?: AnQuestion;
  questionLogics?: Array<{
    logicType: string;
    logicCondition: string;
    logicValue: string;
    logicQuId: string;
    logicQuItemId: string;
  }>;
}

export interface Answer {
  anQuestions: AnQuestion[];
}

export interface AnQuestion {
  quDwId: string;
  anRadio?: {
    optionDwId: string;
    otherText?: string;
  };
  anCheckboxs?: Array<{
    optionDwId: string;
    otherText?: string;
  }>;
  anOrders?: Array<{
    optionDwId: string;
    orderNum: number;
  }>;
  anMFbks?: Array<{
    optionDwId: string;
    answer: string;
  }>;
  anScores?: Array<{
    optionDwId: string;
    answerScore: number;
  }>;
  anFbk?: {
    answer: string;
  };
  anUploadFiles?: Array<{
    filePath: string;
    fileName: string;
  }>;
  anMatrixRadios?: Array<{
    rowDwId: string;
    colDwId: string;
  }>;
  anMatrixCheckboxes?: Array<{
    rowDwId: string;
    rowAnCheckboxs: Array<{
      optionDwId: string;
    }>;
  }>;
  anMatrixFbks?: Array<{
    rowDwId: string;
    rowAnFbks: Array<{
      optionDwId: string;
      answer: string;
    }>;
  }>;
  anMatrixScales?: Array<{
    rowDwId: string;
    answerScore: number;
  }>;
} 
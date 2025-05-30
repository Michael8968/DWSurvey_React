interface OptionTitleObj {
  dwText: string;
}

interface Option {
  dwId: string;
  optionTitleObj: OptionTitleObj;
  anCount?: number;
  avgScore?: number;
  avgOrder?: number;
  percent?: string;
  tempEmptyOption?: boolean;
}

interface QuRow {
  dwId: string;
  anCount?: number;
  avgScore?: number;
  rowCols?: Array<{
    dwText: string;
    dwId: string;
    anCount: number;
  }>;
}

interface Question {
  dwId: string;
  quType: string;
  quTypeName?: string;
  quRadios?: Option[];
  quCheckboxs?: Option[];
  quScores?: Option[];
  quOrderbys?: Option[];
  quMultiFillblanks?: Option[];
  quRows?: QuRow[];
  quCols?: Option[];
  anCount?: number;
  paramInt02?: number;
  quStatOptions?: Array<{
    optionName: string;
    anCount: number | string;
    percent: string;
    orderNum?: null;
    avgOrder?: string;
  }>;
}

interface Survey {
  questions: Question[];
}

interface SurveyAggMaps {
  countRadio?: {
    [key: string]: {
      docCount: number;
    };
  };
  countCheckbox?: {
    [key: string]: {
      docCount: number;
    };
  };
  optionStats?: {
    [key: string]: {
      statsAvg: number;
    };
  };
  count_matrix_radio?: {
    [key: string]: {
      docCount: number;
      rowAnAggMap?: {
        [key: string]: {
          docCount: number;
        };
      };
    };
  };
  count_matrix_checkbox?: {
    [key: string]: {
      docCount: number;
      rowAnAggMap?: {
        [key: string]: {
          docCount: number;
        };
      };
    };
  };
  countQu?: {
    [key: string]: {
      docCount: number;
    };
  };
}

export function chartDataParse(survey: Survey, surveyAggMaps: SurveyAggMaps): void {
  const questions = survey.questions;
  questions.forEach((question) => {
    let quAnCount = 0;
    const quType = question.quType;

    if (quType === 'RADIO' && question.quRadios) {
      question.quRadios.forEach((option) => {
        if (surveyAggMaps.countRadio) {
          const radioAgg = surveyAggMaps.countRadio;
          for (const key in radioAgg) {
            if (Object.prototype.hasOwnProperty.call(radioAgg, key)) {
              const value = radioAgg[key].docCount;
              if (option.dwId === key) {
                option.anCount = value;
                quAnCount += option.anCount || 0;
                break;
              }
            }
          }
        }
      });
    } else if (quType === 'CHECKBOX' && question.quCheckboxs) {
      question.quCheckboxs.forEach((option) => {
        if (surveyAggMaps.countCheckbox) {
          const checkboxAgg = surveyAggMaps.countCheckbox;
          for (const key in checkboxAgg) {
            if (Object.prototype.hasOwnProperty.call(checkboxAgg, key)) {
              const value = checkboxAgg[key].docCount;
              if (option.dwId === key) {
                option.anCount = value;
                quAnCount += option.anCount || 0;
                break;
              }
            }
          }
        }
      });
    } else if (quType === 'SCORE' && question.quScores) {
      question.quScores.forEach((option) => {
        if (surveyAggMaps.optionStats) {
          const optionStats = surveyAggMaps.optionStats;
          for (const key in optionStats) {
            if (Object.prototype.hasOwnProperty.call(optionStats, key)) {
              const value = optionStats[key].statsAvg;
              if (option.dwId === key) {
                option.avgScore = value;
                break;
              }
            }
          }
        }
      });
    } else if (quType === 'ORDERQU' && question.quOrderbys) {
      question.quOrderbys.forEach((option) => {
        if (surveyAggMaps.optionStats) {
          const optionStats = surveyAggMaps.optionStats;
          for (const key in optionStats) {
            if (Object.prototype.hasOwnProperty.call(optionStats, key)) {
              const value = optionStats[key].statsAvg;
              if (option.dwId === key) {
                option.avgOrder = value;
                break;
              }
            }
          }
        }
      });
    } else if ((quType === 'MATRIX_SCALE' || quType === 'MATRIX_SLIDER') && question.quRows) {
      question.quRows.forEach((option) => {
        if (surveyAggMaps.optionStats) {
          const optionStats = surveyAggMaps.optionStats;
          for (const key in optionStats) {
            if (Object.prototype.hasOwnProperty.call(optionStats, key)) {
              const value = optionStats[key].statsAvg;
              if (option.dwId === key) {
                option.avgScore = value;
                break;
              }
            }
          }
        }
      });
    } else if (quType === 'MATRIX_RADIO' && question.quRows && question.quCols) {
      question.quRows.forEach((rowOption) => {
        if (surveyAggMaps.count_matrix_radio) {
          const countMatrixRadio = surveyAggMaps.count_matrix_radio;
          for (const rowKey in countMatrixRadio) {
            if (Object.prototype.hasOwnProperty.call(countMatrixRadio, rowKey)) {
              const rowCountResult = countMatrixRadio[rowKey];
              const rowDocCount = rowCountResult.docCount;
              if (rowOption.dwId === rowKey) {
                rowOption.anCount = rowDocCount;
                const rowCols: Array<{ dwText: string; dwId: string; anCount: number }> = [];
                const rowAnAggMap = rowCountResult.rowAnAggMap;
                if (rowAnAggMap != null && question.quCols) {
                  question.quCols.forEach((quCol) => {
                    const colDwId = quCol.dwId;
                    if (!quCol.tempEmptyOption) {
                      const quRowCol = { dwText: quCol.optionTitleObj.dwText, dwId: colDwId, anCount: 0 };
                      for (const rowColKey in rowAnAggMap) {
                        if (Object.prototype.hasOwnProperty.call(rowAnAggMap, rowColKey)) {
                          const rowColDocCount = rowAnAggMap[rowColKey].docCount;
                          if (colDwId === rowColKey) {
                            quRowCol.anCount = rowColDocCount;
                          }
                        }
                      }
                      rowCols.push(quRowCol);
                    }
                  });
                }
                rowOption.rowCols = rowCols;
              }
            }
          }
        }
      });
    } else if (quType === 'MATRIX_CHECKBOX' && question.quRows && question.quCols) {
      question.quRows.forEach((rowOption) => {
        if (surveyAggMaps.count_matrix_checkbox) {
          const countMatrixCheckbox = surveyAggMaps.count_matrix_checkbox;
          for (const rowKey in countMatrixCheckbox) {
            if (Object.prototype.hasOwnProperty.call(countMatrixCheckbox, rowKey)) {
              const rowCountResult = countMatrixCheckbox[rowKey];
              const rowDocCount = rowCountResult.docCount;
              if (rowOption.dwId === rowKey) {
                rowOption.anCount = rowDocCount;
                const rowCols: Array<{ dwText: string; dwId: string; anCount: number }> = [];
                const rowAnAggMap = rowCountResult.rowAnAggMap;
                if (rowAnAggMap != null && question.quCols) {
                  question.quCols.forEach((quCol) => {
                    const colDwId = quCol.dwId;
                    if (!quCol.tempEmptyOption) {
                      const quRowCol = { dwText: quCol.optionTitleObj.dwText, dwId: colDwId, anCount: 0 };
                      for (const rowColKey in rowAnAggMap) {
                        if (Object.prototype.hasOwnProperty.call(rowAnAggMap, rowColKey)) {
                          const rowColDocCount = rowAnAggMap[rowColKey].docCount;
                          if (colDwId === rowColKey) {
                            quRowCol.anCount = rowColDocCount;
                          }
                        }
                      }
                      rowCols.push(quRowCol);
                    }
                  });
                }
                rowOption.rowCols = rowCols;
              }
            }
          }
        }
      });
    }

    if (surveyAggMaps.countQu) {
      const quAgg = surveyAggMaps.countQu;
      for (const key in quAgg) {
        if (Object.prototype.hasOwnProperty.call(quAgg, key)) {
          const value = quAgg[key].docCount;
          if (question.dwId === key) {
            quAnCount = value;
            break;
          }
        }
      }
    }
    question.anCount = quAnCount;
  });
}

export function anCountStats(questions: Question[]): void {
  questions.forEach((questionData) => {
    let count = questionData.anCount || 0;
    let quOptionsObj: Option[] | undefined;

    switch (questionData.quType) {
      case 'CHECKBOX':
        questionData.quTypeName = '多选题';
        quOptionsObj = questionData.quCheckboxs;
        break;
      case 'RADIO':
        questionData.quTypeName = '单选题';
        quOptionsObj = questionData.quRadios;
        break;
      case 'FILLBLANK':
        questionData.quTypeName = '填空题';
        break;
      case 'SCORE':
        questionData.quTypeName = '评分题';
        quOptionsObj = questionData.quScores;
        break;
      case 'ORDERQU':
        questionData.quTypeName = '排序题';
        quOptionsObj = questionData.quOrderbys;
        break;
      case 'MULTIFILLBLANK':
        questionData.quTypeName = '多项填空题';
        quOptionsObj = questionData.quMultiFillblanks;
        break;
      default:
        questionData.quTypeName = questionData.quType;
    }

    const quStatOptions: Array<{
      optionName: string;
      anCount: number | string;
      percent: string;
      orderNum?: null;
      avgOrder?: string;
    }> = [];

    if (
      ['RADIO', 'CHECKBOX', 'SCORE', 'ORDERQU', 'MULTIFILLBLANK'].includes(questionData.quType) &&
      quOptionsObj
    ) {
      quOptionsObj.forEach((item) => {
        let quStatOption;
        if (['RADIO', 'CHECKBOX'].includes(questionData.quType)) {
          let anCount = item.anCount || 0;
          if (count === 0) count = 1;
          item.anCount = anCount;
          const bfbFloat = (item.anCount / count) * 100;
          const percent = bfbFloat.toFixed(2);
          item.percent = percent;
          quStatOption = {
            optionName: item.optionTitleObj.dwText,
            anCount: item.anCount,
            percent
          };
        } else if (questionData.quType === 'SCORE') {
          let avgScore = item.avgScore || 0;
          item.avgScore = avgScore;
          const bfbFloat = (avgScore / (questionData.paramInt02 || 1)) * 100;
          const percent = bfbFloat.toFixed(2);
          const anAvgScore = avgScore.toFixed(2);
          quStatOption = {
            optionName: item.optionTitleObj.dwText,
            anCount: anAvgScore,
            percent
          };
        } else if (questionData.quType === 'ORDERQU') {
          let avgOrder = item.avgOrder || 0;
          item.avgOrder = avgOrder;
          const bfbFloat =
            avgOrder !== 0
              ? ((quOptionsObj.length - avgOrder) / quOptionsObj.length) * 100
              : 0;
          const percent = bfbFloat.toFixed(2);
          const anAvgOrder = avgOrder.toFixed(2);
          quStatOption = {
            optionName: item.optionTitleObj.dwText,
            anCount: avgOrder !== 0 ? quOptionsObj.length - avgOrder : 0,
            orderNum: null,
            percent,
            avgOrder: anAvgOrder
          };
        } else if (questionData.quType === 'MULTIFILLBLANK') {
          let anCount = item.anCount || 0;
          if (count === 0) count = 1;
          item.anCount = anCount;
          const bfbFloat = (item.anCount / count) * 100;
          const percent = bfbFloat.toFixed(2);
          item.percent = percent;
          quStatOption = {
            optionName: item.optionTitleObj.dwText,
            anCount: item.anCount,
            percent
          };
        }
        if (quStatOption) {
          quStatOptions.push(quStatOption);
        }
      });
    }
    questionData.quStatOptions = quStatOptions;
  });
}

export const dwAnswerChart = {
  chartDataParse,
  anCountStats
}; 
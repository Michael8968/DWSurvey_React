import {v4 as uuidV4} from 'uuid'

export function getSurveyAnswerData (survey: any) {
  // 基于survey questions 构建答题数据模型
  const surveyDwId = survey.dwId
  const anUser = {userId: null, userName: null}
  const anTime = {bgAnDate: null, endAnDate: null, totalTime: 0}
  const anIp = {ip: null, city: null, addr: null}
  const anState = {anQuNum: 0, isEff: 1, handleState: 0}
  const isDelete = 0
  const answerDwId = uuidV4() // 答卷ID，记录在数据库原始记录表中,实现没有起对作用
  const surveyId = survey.id
  const sid = survey.sid
  const answerCommon = {surveyId, sid, surveyDwId, answerDwId, anUser, anTime, anIp, anState, isDelete}
  const surveyAnswer = {answerCommon, anQuestions: []}
  const questions = survey.questions
  let totalAnQuNum = 0
  if (questions !== undefined) {
    surveyAnswer.anQuestions = questions.map((item: any, index: number) => {
      const anQuestion = getQuestionAnswerData(item)
      if (item.hasOwnProperty('item') && item.isAn) totalAnQuNum++
      return anQuestion
    })
  }
  surveyAnswer.answerCommon.anState.anQuNum = totalAnQuNum
  return surveyAnswer
}

export function getQuestionAnswerData (question: any) {
  const quType = question.quType
  const anQuestion = {quDwId: question.dwId, quType: quType}
  question.isAn = false
  if (quType === 'RADIO') {
    getQuRadioAnswerData(question, anQuestion)
  } else if (quType === 'CHECKBOX') {
    getQuCheckboxAnswerData(question, anQuestion)
  } else if (quType === 'ORDERQU') {
    getQuOrderByAnswerData(question, anQuestion)
  } else if (quType === 'MULTIFILLBLANK') {
    getQuMFbkAnswerData(question, anQuestion)
  } else if (quType === 'SCORE') {
    // anQuestion.anScores = []
    getQuScoreAnswerData(question, anQuestion)
  } else if (quType === 'FILLBLANK') {
    getQuFbkAnswerData(question, anQuestion)
  } else if (quType === 'UPLOADFILE') {
    getQuUploadAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_RADIO') {
    getQuMatrixRadioAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_CHECKBOX') {
    getQuMatrixCheckboxAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_INPUT') {
    getQuMatrixInputAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_SCALE') {
    getQuMatrixScaleAnswerData(question, anQuestion)
  } else if (quType === 'MATRIX_SLIDER') {
    getQuMatrixScaleAnswerData(question, anQuestion)
  }
  question.anQuestion = anQuestion
  return anQuestion
}

function getQuRadioAnswerData (question: any, anQuestion: any) {
  const quRadios = question.quRadios
  quRadios.map((option: any, index: number) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
      question.isAn = true
    }
  })
}

function getQuCheckboxAnswerData (question: any, anQuestion: any) {
  const quCheckboxs = question.quCheckboxs
  anQuestion.anCheckboxs = []
  quCheckboxs.map((option: any, index: number) => {
    if (option.hasOwnProperty('checked') && option.checked) {
      anQuestion.anCheckboxs.push({optionDwId: option.dwId, otherText: option.otherText})
      question.isAn = true
    }
  })
}

function getQuFbkAnswerData (question: any, anQuestion: any) {
  anQuestion.anFbk = {answer: question.answer}
  question.isAn = true
}

function getQuMFbkAnswerData (question: any, anQuestion: any) {
  const quMultiFillblanks = question.quMultiFillblanks
  anQuestion.anMFbks = []
  quMultiFillblanks.map((option: any, index: number) => {
    if (option.hasOwnProperty('inputText') && option.inputText!=='') {
      anQuestion.anMFbks.push({optionDwId: option.dwId, answer: option.inputText})
      question.isAn = true
    }
  })
}

function getQuUploadAnswerData (question: any, anQuestion: any) {
  anQuestion.anUploadFiles = []
  if (question.hasOwnProperty('upFileList')) {
    const quUpFileList = question.upFileList
    if (quUpFileList!==undefined && quUpFileList!==null) {
      quUpFileList.forEach((item: any, index: number) => {
        if (item.hasOwnProperty('response') && item.response.hasOwnProperty('data')) {
          if (item.response.data!=null) {
            const responseData = item.response.data
            responseData.forEach((responseItem: any) => {
              const anUploadFile = {filePath: responseItem.location, fileName: responseItem.filename}
              anQuestion.anUploadFiles.push(anUploadFile)
              question.isAn = true
            })
          }
        }
      })
    }
  }
}

function getQuScoreAnswerData (question: any, anQuestion: any) {
  const quScores = question.quScores
  anQuestion.anScores = []
  quScores.map((option: any, index: number) => {
    if (option.hasOwnProperty('checked') && option.checked && option.hasOwnProperty('answerScore')) {
      anQuestion.anScores.push({optionDwId: option.dwId, answerScore: option.answerScore})
      question.isAn = true
    }
  })
}

function getQuOrderByAnswerData (question: any, anQuestion: any) {
  console.debug('getQuOrderByAnswerData question', question)
  // anQuestion = question.anQuestion
  console.debug('anQuestion', anQuestion)
  const quOrderbys = question.quOrderbys
  anQuestion.anOrders = []
  quOrderbys.forEach((option: any, itemIndex: number) => {
    if (option.hasOwnProperty('checked') && option.checked && option.orderIndex>0) {
      anQuestion.anOrders.push({optionDwId: option.dwId, orderNum: option.orderIndex})
      question.isAn = true
    }
  })
}

function getQuMatrixRadioAnswerData (question: any, anQuestion: any) {
  const quRows = question.quRows
  const anQuRows: any[] = []
  quRows.map((rowOption: any, index: number) => {
    const rowCols = rowOption.rowCols
    rowCols.map((rowColOption: any, index: number) => {
      if (rowColOption.hasOwnProperty('checked') && rowColOption.checked) {
        // anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
        anQuRows.push({rowDwId: rowOption.dwId, colDwId: rowColOption.dwId, quAnScore: 0})
        question.isAn = true
      }
    })
  })
  anQuestion.anMatrixRadios = anQuRows
}

function getQuMatrixCheckboxAnswerData (question: any, anQuestion: any) {
  const quRows = question.quRows
  const anQuRows: any[] = []
  quRows.map((rowOption: any, index: number) => {
    const rowCols = rowOption.rowCols
    const anQuRowCols: any[] = []
    rowCols.map((rowColOption: any, index: number) => {
      if (rowColOption.hasOwnProperty('checked') && rowColOption.checked) {
        // anQuestion.anRadio = {optionDwId: option.dwId, otherText: option.otherText}
        anQuRowCols.push({optionDwId: rowColOption.dwId, otherText: null})
        question.isAn = true
      }
    })
    if (anQuRowCols.length>0) {
      anQuRows.push({rowDwId: rowOption.dwId, rowAnCheckboxs: anQuRowCols, rowAnScore: 0})
    }
  })
  anQuestion.anMatrixCheckboxes = anQuRows
}

function getQuMatrixInputAnswerData (question: any, anQuestion: any) {
  const quRows = question.quRows
  const anQuRows: any[] = []
  quRows.map((rowOption: any, index: number) => {
    const rowCols = rowOption.rowCols
    const anQuRowCols: any[] = []
    rowCols.map((rowColOption: any, index: number) => {
      if (rowColOption.answerValue!==null && rowColOption.answerValue!==undefined && rowColOption.answerValue.length>0) {
        anQuRowCols.push({optionDwId: rowColOption.dwId, answer: rowColOption.answerValue})
        question.isAn = true
      }
    })
    anQuRows.push({rowDwId: rowOption.dwId, rowAnFbks: anQuRowCols})
  })
  anQuestion.anMatrixFbks = anQuRows
}

function getQuMatrixScaleAnswerData (question: any, anQuestion: any) {
  const quRows = question.quRows
  const anQuRows: any[] = []
  quRows.map((rowOption: any, index: number) => {
    const answerValue = rowOption.answerValue
    if (answerValue!==null && answerValue!==undefined) {
      anQuRows.push({rowDwId: rowOption.dwId, answerScore: answerValue, rowAnScore: 0})
      question.isAn = true
    }
  })
  console.debug('anQuRows', anQuRows)
  anQuestion.anMatrixScales = anQuRows
}

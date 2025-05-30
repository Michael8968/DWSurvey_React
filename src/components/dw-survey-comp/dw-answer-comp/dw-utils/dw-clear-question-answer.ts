export function clearQuestionAnswer (question: any) {
  const anQuestion: any = {quDwId: question.dwId, quType: question.quType}
  const quType = question.quType
  if (quType === 'RADIO') {
    clearAnOptionRadioCheckbox(question, question.quRadios)
  } else if (quType === 'CHECKBOX') {
    clearAnOptionRadioCheckbox(question, question.quCheckboxs)
    anQuestion.anCheckboxs = []
  } else if (quType === 'ORDERQU') {
    clearAnOptionOrderby(question, question.quOrderbys)
    anQuestion.anOrders = []
  } else if (quType === 'FILLBLANK') {
    question.answer = null
  } else if (quType === 'MULTIFILLBLANK') {
    clearAnOptionMfbk(question, question.quMultiFillblanks)
    anQuestion.anMFbks = []
  } else if (quType === 'SCORE') {
    clearAnOptionScore(question, question.quScores)
    anQuestion.anScores = []
  } else if (quType === 'MATRIX_RADIO') {
    clearAnOptionMatrixRadio(question, question.quRows)
    anQuestion.anMatrixRadios = []
  } else if (quType === 'MATRIX_CHECKBOX') {
    clearAnOptionMatrixCheckbox(question, question.quRows)
    anQuestion.anMatrixCheckboxes = []
  } else if (quType === 'MATRIX_INPUT') {
    clearAnOptionMatrixInput(question, question.quRows)
    anQuestion.anMatrixFbks = []
  } else if (quType==='MATRIX_SCALE') {
    clearAnOptionMatrixScale(question, question.quRows)
    anQuestion.anMatrixScales = []
  } else if (quType === 'MATRIX_SLIDER') {
    clearAnOptionMatrixScale(question, question.quRows)
    anQuestion.anMatrixScales = []
  }
  question.anQuestion = anQuestion
}

function clearAnOptionRadioCheckbox (question: any, quOptions: any[]) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption: any, optionIndex: number) => {
      quOption.checked = false
      quOption.otherText = null
    })
  }
}

function clearAnOptionOrderby (question: any, quOptions: any[]) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption: any, optionIndex: number) => {
      quOption.checked = false
      quOption.orderIndex = 0
      quOption.otherText = null
    })
  }
}

function clearAnOptionMfbk (question: any, quOptions: any[]) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption: any, optionIndex: number) => {
      quOption.inputText = null
    })
  }
}

function clearAnOptionScore (question: any, quOptions: any[]) {
  if (quOptions !==null && quOptions.length>0) {
    quOptions.forEach((quOption, optionIndex) => {
      quOption.checked = false
      quOption.answerScore = 0
    })
  }
}

function clearAnOptionMatrixRadio (question: any, quRows: any[]) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption: any, index: number) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption: any, index: number) => {
        rowColOption.checked = false
      })
    })
  }
}

function clearAnOptionMatrixCheckbox (question: any, quRows: any[]) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption: any, index: number) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption: any, index: number) => {
        rowColOption.checked = false
      })
    })
  }
}

function clearAnOptionMatrixInput (question: any, quRows: any[]) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption: any, index: number) => {
      const rowCols = rowOption.rowCols
      rowCols.map((rowColOption: any, index: number) => {
        rowColOption.answerValue = null
      })
    })
  }
}

function clearAnOptionMatrixScale (question: any, quRows: any[]) {
  if (quRows !==null && quRows.length>0) {
    quRows.map((rowOption: any, index: number) => {
      rowOption.answerValue = null
    })
  }
}

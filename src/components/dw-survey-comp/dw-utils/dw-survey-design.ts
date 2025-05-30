
export function logicNum (questionLogics: any[], loginType: string) {
  let loginNum = 0
  if (questionLogics!==null) {
    questionLogics.forEach((item: any, index: number) => {
      if (item.logicType === loginType) loginNum++
    })
  }
  return loginNum
}

export function curQuAfterQus (questions: any[], quIndex: number) {
  const newQuestions: any[] = []
  if (questions !== null) {
    let quNum = 1
    questions.forEach((item, index) => {
      if (item.quType !== 'PAGETAG' && item.quType !== 'PARAGRAPH') {
        item.quNum = quNum++
        if (index > quIndex) newQuestions.push(item)
      }
    })
  }
  return newQuestions
}

export function getQuOptions (question: any) {
  const quType = question.quType
  if (quType === 'RADIO') {
    return question.quRadios
  } else if (quType === 'CHECKBOX') {
    return question.quCheckboxs
  } else if (quType === 'ORDERQU') {
    return question.quOrderbys
  } else if (quType === 'MULTIFILLBLANK') {
    return question.quMultiFillblanks
  } else if (quType === 'SCORE') {
    return question.quScores
  }
}

export function clearSurveyJson (survey: any) {
  const questions: any[] = survey.questions
  if (questions !== null) {
    questions.forEach((item: any, index: number) => {
    })
  }
}

export function getSurveyJsonSimple (surveyJsonText: string) {
  const newSurvey = JSON.parse(surveyJsonText)
  newSurvey.questions = []
  return newSurvey
}

export function getSaveSurveyJsonText (surveyJson: any) {
  const surveyJsonText = JSON.stringify(surveyJson)
  const newSurvey = JSON.parse(surveyJsonText)
  clearSurveyTempPage(newSurvey)
  return newSurvey
}
export function clearSurveyTempPage (survey: any) {
  const questions: any[] = survey.questions
  if (questions !== null) {
    questions.forEach((item: any, index: number) => {
      if (item.quType==='PAGETAG' && item.hasOwnProperty('tempPage')) questions.splice(index, 1)
    })
  }
}

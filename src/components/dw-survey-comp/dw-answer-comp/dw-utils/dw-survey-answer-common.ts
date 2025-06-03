import {dwSurveyJsonBySurveyId} from '../api/dw-survey-answer'
import {parseSurvey} from '../../dw-utils/dw-survey-parse'
import {getQuestionAnswerData} from '../../dw-utils/dw-survey-answer'
import {validateQuestion} from '../../dw-utils/dw-survey-answer-validate.ts'
import {surveyAnswerLocalStorage} from './dw-survey-answer-utils.ts'
import {answerSurveyProgress} from './dw-survey-answer-progress.ts'
import {dwSurveyAnswerLogic} from './dw-survey-answer-logic.ts'

/**
 * 根据SurveyId 取 surveyJson
 * @param params
 * @param successCallback
 * @param noJsonCallback
 */
export const getSurveyAnswerJsonBySurveyId = async (params: any, successCallback: any, noJsonCallback: any) => {
  // 先看看有没有JSON，有就取JSON数据。没有再取原来的Survey结构数据进行转换
  const response = await dwSurveyJsonBySurveyId(params)
  const httpResult = response.data
  if (httpResult.resultCode === 200) {
    const surveyAnswerResult = httpResult.data
    if (surveyAnswerResult.hasOwnProperty('answerCheckResult') && surveyAnswerResult.hasOwnProperty('surveyJson')) {
      const answerCheckResult = surveyAnswerResult.answerCheckResult
      const surveyJson = surveyAnswerResult.surveyJson
      if (surveyJson!==null && surveyJson.hasOwnProperty('surveyJsonText') && surveyJson.surveyJsonText !== null && surveyJson.surveyJsonText!=='') {
        successCallback(parseSurvey(JSON.parse(surveyJson.surveyJsonText)), answerCheckResult)
      } else {
        noJsonCallback(answerCheckResult)
      }
    }
  }
}

export function answerQuEventCommon (survey: any, quIndex: any) {
  /*
  getQuestionAnswerData(this.survey.questions[this.quIndex])
  validateQuestion(this.survey.questions[this.quIndex])
  surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)*/
  // answerQuEventCommonExt(survey, quIndex, false) // 可以控制选项第一次不直接显示验证提示
  answerQuEventCommonExt(survey, quIndex, false)
}

export function answerQuEventCommonExt (survey: any, quIndex: any, showOptionError: any) {
  /*
  getQuestionAnswerData(this.survey.questions[this.quIndex])
  validateQuestion(this.survey.questions[this.quIndex])
  surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(this.survey)*/
  if ((survey.questions[quIndex].hasOwnProperty('showOptionError') && !survey.questions[quIndex].showOptionError && showOptionError) || !survey.questions[quIndex].hasOwnProperty('showOptionError')) {
    // survey.questions[quIndex].showOptionError = showOptionError // 此处暂时禁用，因为在方法内部进行了处理
  }
  getQuestionAnswerData(survey.questions[quIndex])
  dwSurveyAnswerLogic(survey, quIndex)
  validateQuestion(survey.questions[quIndex])
  surveyAnswerLocalStorage.saveSurveyAnswer2LocalStorage(survey)
  answerSurveyProgress(survey)
}

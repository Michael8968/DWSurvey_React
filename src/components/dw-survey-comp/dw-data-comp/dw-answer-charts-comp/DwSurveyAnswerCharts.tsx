import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { dwSurveyAnswerStatsV6 } from '../api/dw-survey-answer-data';
import { getDesignSurveyJsonBySurveyId } from '../../dw-utils/dw-survey-common';
import DwSurveyChartsCommon from './DwSurveyChartsCommon';
import { dwAnswerChart } from './js/dw-answer-charts';

interface Question {
  id: string;
  quType: string;
  quRows?: Array<{
    dwId: string;
    rowCols?: Array<{
      dwId: string;
      answerValue: any;
    }>;
  }>;
  quCols?: Array<{
    dwId: string;
  }>;
}

interface Survey {
  questions: Question[];
}

const DwSurveyAnswerCharts: React.FC = () => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [surveyAggStats, setSurveyAggStats] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const { dwSurveyId } = useParams<{ dwSurveyId: string }>();

  const initSurveyData = (surveyData: Survey) => {
    const updatedQuestions = surveyData.questions.map((question) => {
      if (
        question.quType === 'MATRIX_RADIO' ||
        question.quType === 'MATRIX_CHECKBOX' ||
        question.quType === 'MATRIX_INPUT'
      ) {
        const updatedQuRows = question.quRows?.map((quOption) => ({
          ...quOption,
          rowCols: question.quCols?.map((quColOption) => ({
            dwId: quColOption.dwId,
            answerValue: null
          }))
        }));
        return { ...question, quRows: updatedQuRows };
      }
      return question;
    });
    return { ...surveyData, questions: updatedQuestions };
  };

  const surveyState = () => {
    if (!dwSurveyId) return;

    const params = { surveyId: dwSurveyId };
    getDesignSurveyJsonBySurveyId(params, (surveyData: Survey) => {
      console.debug('design survey', surveyData);
      const updatedSurvey = initSurveyData(surveyData);
      setSurvey(updatedSurvey);

      dwSurveyAnswerStatsV6(params).then((response) => {
        console.debug('dwSurveyAnswerStatsV6 response', response);
        const responseResult = response.data;
        const resultCode = responseResult.resultCode;

        if (resultCode === 200) {
          setSurveyAggStats(responseResult.data);
          // 加工统计数据
          dwAnswerChart.chartDataParse(updatedSurvey, responseResult.data);
          // 生成统计报表数据
          dwAnswerChart.anCountStats(updatedSurvey.questions);
          setQuestions(updatedSurvey.questions);
        } else {
          setResultMsg('统计服务不可用，可能是Es服务没有启用！');
        }
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    surveyState();
  }, [dwSurveyId]);

  return (
    <div>
      <Spin spinning={loading}>
        {questions.map((item, index) => (
          <DwSurveyChartsCommon
            key={item.id}
            id={item.id}
            index={index}
            question={item}
          />
        ))}
        {resultMsg && (
          <div style={{ color: 'gray', padding: '20px 0' }}>{resultMsg}</div>
        )}
      </Spin>
    </div>
  );
};

export default DwSurveyAnswerCharts; 
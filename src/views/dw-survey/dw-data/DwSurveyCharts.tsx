import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';
import DwSurveyChartsCommon from './DwsurveyChartsCommon';
import { msgInfo } from '@/utils/message';
import { dwSurveyReport } from '@/api/survey';

interface QuestionOption {
  id: string;
  optionName: string;
  anCount?: number;
  percent?: string;
  avgScore?: number;
  orderNum?: number;
}

interface Question {
  id: string;
  quType: string;
  quTypeName: string;
  anCount: number;
  paramInt02?: number;
  quCheckboxs?: QuestionOption[];
  quRadios?: QuestionOption[];
  quScores?: QuestionOption[];
  quOrderbys?: QuestionOption[];
  quMultiFillblanks?: QuestionOption[];
  quStatOptions: {
    optionName: string;
    anCount: number | string;
    percent: string;
    orderNum?: number;
  }[];
}

const DwSurveyCharts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    surveyChartData();
  }, []);

  const surveyChartData = async () => {
    try {
      const response = await dwSurveyReport(id);
      const resultData = response.data.data;
      const processedQuestions = resultData.questions;

      if (processedQuestions.length <= 0) {
        msgInfo('问卷还没有任何题目');
        setLoading(false);
        return;
      }

      for (let i = 0; i < processedQuestions.length; i++) {
        const questionData = processedQuestions[i];
        let count = questionData.anCount;
        let quOptionsObj: QuestionOption[] | undefined;

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

        const quStatOptions = [];
        if (['RADIO', 'CHECKBOX', 'SCORE', 'ORDERQU', 'MULTIFILLBLANK'].includes(questionData.quType) && quOptionsObj) {
          for (let j = 0; j < quOptionsObj.length; j++) {
            const item = quOptionsObj[j];
            let quStatOption;

            switch (questionData.quType) {
              case 'RADIO':
              case 'CHECKBOX':
                const anCount = item.anCount || 0;
                if (count === 0) count = 1;
                const bfbFloat = anCount / count * 100;
                const percent = bfbFloat.toFixed(2);
                quOptionsObj[j].percent = percent;
                quStatOption = {
                  optionName: item.optionName,
                  anCount: anCount,
                  percent: percent
                };
                break;

              case 'SCORE':
                const avgScore = item.avgScore || 0;
                const scorePercent = (avgScore / (questionData.paramInt02 || 1) * 100).toFixed(2);
                const anAvgScore = avgScore.toFixed(2);
                quStatOption = {
                  optionName: item.optionName,
                  anCount: anAvgScore,
                  percent: scorePercent
                };
                break;

              case 'ORDERQU':
                const orderPercent = ((quOptionsObj.length - j) / ((1 + quOptionsObj.length) * quOptionsObj.length / 2) * 100).toFixed(2);
                quStatOption = {
                  optionName: item.optionName,
                  anCount: quOptionsObj.length - j,
                  orderNum: j + 1,
                  percent: orderPercent
                };
                break;

              case 'MULTIFILLBLANK':
                const multiAnCount = item.anCount || 0;
                if (count === 0) count = 1;
                const multiPercent = (multiAnCount / count * 100).toFixed(2);
                quOptionsObj[j].percent = multiPercent;
                quStatOption = {
                  optionName: item.optionName,
                  anCount: multiAnCount,
                  percent: multiPercent
                };
                break;
            }

            if (quStatOption) {
              quStatOptions.push(quStatOption);
            }
          }
        }

        processedQuestions[i].quStatOptions = quStatOptions;
      }

      setQuestions(processedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch survey chart data:', error);
      setLoading(false);
    }
  };

  return (
    <DwSurveyDcsWrapper id={id} isSurveyChart={true}>
      {(survey) => (
        <Spin spinning={loading}>
          {questions.map((item, index) => (
            <DwSurveyChartsCommon
              key={item.id}
              id={item.id}
              index={index}
              question={item}
            />
          ))}
        </Spin>
      )}
    </DwSurveyDcsWrapper>
  );
};

export default DwSurveyCharts; 
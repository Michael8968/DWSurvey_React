import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import DwDesignSurveyCore from './DwDesignSurveyCore';
import { getDesignSurveyJsonBySurveyId } from '../../dw-utils/dw-survey-common';

interface Survey {
  surveyNameObj: {
    dwHtml: string;
    dwText: string;
  };
  surveyDetail: {
    surveyNodeObj: {
      dwHtml: string;
      dwText: string;
    };
  };
  questions: Array<{
    quTitleObj: {
      dwHtml: string;
      dwText: string;
    };
    quType: string;
    quCheckboxs?: Array<{
      id: string;
      optionTitleObj: {
        dwHtml: string;
        dwText: string;
      };
      itemClick: boolean;
    }>;
    quRadios?: Array<{
      id: string;
      optionTitleObj: {
        dwHtml: string;
        dwText: string;
      };
      itemClick: boolean;
    }>;
  }>;
  surveyTest: string;
  curEditObj: Array<{
    itemClick: boolean;
  }>;
}

interface RouteParams {
  dwSurveyId: string;
}

const DwDesignSurveyMain: React.FC = () => {
  const routeParams = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    loadSurvey();
  }, []);

  const loadSurvey = () => {
    const surveyId = routeParams.dwSurveyId;
    const requestParams = { surveyId };
    getDesignSurveyJsonBySurveyId(requestParams, (surveyData: Survey) => {
      console.debug('design survey', surveyData);
      setSurvey(surveyData);
      setLoading(false);
    });
  };

  return (
    <Spin spinning={loading}>
      <DwDesignSurveyCore
        value={survey}
        onChange={setSurvey}
        className="user-select-none"
      />
    </Spin>
  );
};

export default DwDesignSurveyMain; 
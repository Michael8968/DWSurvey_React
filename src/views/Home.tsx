import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasRoleOrPermCode } from '@/utils/common';
import { dwFooterUtils } from '@/components/dw-survey-comp/dw-utils/dw-common/dw-footer-util';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isToSurveyOrTask();
  }, []);

  const isToSurveyOrTask = () => {
    dwFooterUtils.setLayout('lr');
    if (hasRoleOrPermCode(['DWSURVEY_SUPER_ADMIN', 'SUPER_ADMIN', 'ENT_ADMIN', 'DEPT_ADMIN', 'PROJECT_ADMIN', 'QT_SURVEY_LIST'])) {
      navigate('/v6/lr/dw/survey');
    } else {
      navigate('/v6/lr/dw/user');
    }
  };

  return <div>Home</div>;
};

export default Home; 
import React, { useEffect, useState } from 'react';
import { questionComps } from './api/dw-design-survey-api';
import DwDesignTopBottomLayout from './dw-design-survey-layouts/dw-tb-layout/DwDesignTopBottomLayout';
import DwDesignLeftRightLayout from './dw-design-survey-layouts/dw-lr-layout/DwDesignLeftRightLayout';
import '../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
import '../../../../assets/css/design-survey.css';

interface Survey {
  designLayout?: string;
  [key: string]: any;
}

interface Props {
  value: Survey | null;
  onChange: (survey: Survey) => void;
  className?: string;
}

const DwDesignSurveyCore: React.FC<Props> = ({ value: survey, onChange, className }) => {
  const [surveyId, setSurveyId] = useState('');
  const [drag, setDrag] = useState(false);
  const [headerQuToolbarStyle, setHeaderQuToolbarStyle] = useState('');
  const [containerLRStyle, setContainerLRStyle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [radio, setRadio] = useState('1');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    loadDesignSurveyData();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onStart = () => {
    setDrag(true);
  };

  const onEnd = () => {
    setDrag(false);
  };

  const loadDesignSurveyData = () => {
    questionComps().then((response) => {
      console.debug('response');
      console.debug(response);
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        setQuestions(httpResult.data);
      }
    });
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const headerHeight = 60;
    if (scrollTop >= headerHeight) {
      setHeaderQuToolbarStyle('top:0px;');
      const newTop1 = scrollTop - headerHeight;
      setContainerLRStyle(`top:${newTop1}px;`);
    } else {
      const newTop = headerHeight - scrollTop;
      setHeaderQuToolbarStyle(`top:${newTop}px;`);
      setContainerLRStyle('top:0px;');
    }
  };

  const documentClick = () => {
    // 注释掉的代码
    /*
    const curObjs = survey.curEditObj;
    for (let i = 0; i < curObjs.length; i++) {
      survey.curEditObj[i].itemClick = false;
    }
    */
  };

  if (!survey) {
    return null;
  }

  return (
    <div className={className}>
      {survey.hasOwnProperty('designLayout') && survey.designLayout === 'TB' ? (
        <DwDesignTopBottomLayout value={survey} onChange={onChange} />
      ) : (
        <DwDesignLeftRightLayout value={survey} onChange={onChange} />
      )}
    </div>
  );
};

export default DwDesignSurveyCore; 
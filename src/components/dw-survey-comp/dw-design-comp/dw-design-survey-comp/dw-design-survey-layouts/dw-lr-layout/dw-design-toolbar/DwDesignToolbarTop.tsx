import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Switch, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { dwSaveSurveyJson } from '../../../api/dw-design-survey-api';
import { clearSurveyJson, getSaveSurveyJsonText, getSurveyJsonSimple } from '../../../../../dw-utils/dw-survey-design';
import { dwFooterUtils } from '../../../../../dw-utils/dw-common/dw-footer-util';

interface Survey {
  id: string;
  sid: string;
  [key: string]: any;
}

interface Props {
  survey: Survey;
}

const DwDesignToolbarTop: React.FC<Props> = ({ survey }) => {
  const [isAutoSave, setIsAutoSave] = useState(true);
  const [autoSaveTime, setAutoSaveTime] = useState(30);
  const [prevPath, setPrevPath] = useState('/v6');
  const navigate = useNavigate();
  const { dwSurveyId } = useParams();

  useEffect(() => {
    if (isAutoSave) {
      startIntervalSaveSurvey();
    }
    dwFooterUtils.isLayoutLr((footerInfo) => setPrevPath('/v6/lr'));
    return () => {
      stopIntervalSaveSurvey();
    };
  }, []);

  const startIntervalSaveSurvey = () => {
    const intervalId = setInterval(() => {
      saveSurveyFun(null);
      setAutoSaveTime(20);
    }, 20000);

    const timeIntervalId = setInterval(() => {
      setAutoSaveTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeIntervalId);
    };
  };

  const stopIntervalSaveSurvey = () => {
    // 清除定时器的逻辑在 useEffect 的清理函数中处理
  };

  const setSurvey = () => {
    stopIntervalSaveSurvey();
    saveSurveyFun(() => {
      navigate(`${prevPath}/dw/survey/c/attr/${dwSurveyId}`);
    });
  };

  const saveSurvey = () => {
    saveSurveyFun(null);
  };

  const devSurvey = () => {
    stopIntervalSaveSurvey();
    previewSurvey();
  };

  const previewSurvey = () => {
    saveSurveyFun(() => {
      navigate(`/v6/diaowen/dw-preview-style/survey/${dwSurveyId}`);
    });
  };

  const saveSurveyFun = async (callback?: () => void) => {
    const surveyId = survey.id;
    const sid = survey.sid;
    clearSurveyJson(survey);
    const surveyJsonText = JSON.stringify(getSaveSurveyJsonText(survey));
    const surveyJsonSimple = JSON.stringify(getSurveyJsonSimple(surveyJsonText));
    const data = { surveyId, sid, surveyJsonText, surveyJsonSimple };

    try {
      const response = await dwSaveSurveyJson(data);
      const httpResult = response.data;
      if (httpResult.hasOwnProperty('resultCode') && httpResult.resultCode === 200) {
        message.success('保存成功！');
        callback?.();
      } else {
        message.error('保存失败！');
      }
    } catch (error) {
      console.error('Failed to save survey:', error);
      message.error('保存失败！');
    }
  };

  return (
    <div style={{ padding: '6px 0' }}>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Button type="text" size="small" style={{ padding: '5px' }} onClick={devSurvey}>
            <i className="fa-regular fa-pen-to-square" />&nbsp;题目编辑
          </Button>
          <Button type="text" size="small" style={{ padding: '5px', color: '#575757' }} onClick={devSurvey}>
            <i className="fa-solid fa-palette" />&nbsp;样式设计
          </Button>
          <Button type="text" size="small" style={{ padding: '5px', color: '#575757' }} onClick={setSurvey}>
            <i className="fa-solid fa-gear" />&nbsp;问卷设置
          </Button>
        </Col>
        <Col span={6}>
          <div style={{ textAlign: 'right', paddingRight: '10px' }}>
            <span className="autoSave" style={{ marginRight: '10px', fontSize: '12px' }}>
              <Switch
                checked={isAutoSave}
                onChange={(checked) => setIsAutoSave(checked)}
                checkedChildren="自动保存"
              />
              <span style={{ color: '#afafb0' }}>({autoSaveTime})</span>
            </span>
            <Button type="primary" size="small" onClick={devSurvey}>
              <i className="fa fa-paper-plane" />&nbsp;发布
            </Button>
            <Button size="small" onClick={saveSurvey}>
              <i className="fa-solid fa-floppy-disk" />&nbsp;保存
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DwDesignToolbarTop; 
import React from 'react';
import { Button, Input, message } from 'antd';
import DwSurveyDcsWrapperV6 from '@/components/common/DwSurveyDcsWrapperV6';
import { CopyOutlined, LinkOutlined, DownloadOutlined } from '@ant-design/icons';

const DwAnswerUrlV6: React.FC = () => {
  // 复制地址
  const copyActiveCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success('复制成功');
    } catch {
      message.warning('该浏览器不支持自动复制');
    }
  };

  // 下载二维码
  const downloadAnswerImg = (imgSrc: string) => {
    window.location.href = imgSrc;
  };

  return (
    <DwSurveyDcsWrapperV6 isAnswerUrlV6={true}>
      {({ survey }: any) => (
        <>
          <div>
            <div className="dw-dcs-main-title">
              <h4>答卷地址</h4>
              <div className="dw-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
            </div>
            <div className="dw-dcs-main-content">
              <div className="dw-dcs-main-title">
                <div className="dw-dcs-main-p">V6新版答卷地址</div>
              </div>
              <Input value={survey?.answerUrlV6} readOnly style={{ width: 500 }} />
              <Button.Group>
                <Button type="primary" icon={<CopyOutlined />} onClick={() => copyActiveCode(survey?.answerUrlV6)}>
                  复制地址
                </Button>
                <a href={survey?.answerUrlV6} target="_blank" rel="noopener noreferrer">
                  <Button icon={<LinkOutlined />}>打开{survey?.surveyTypeSimpleName}</Button>
                </a>
              </Button.Group>
            </div>
          </div>
          <div>
            <div className="dw-dcs-main-title">
              <h4>二维码地址</h4>
              <div className="dw-dcs-main-p">通过手机扫一扫，或下载二维码，即可进行问卷数据收集。</div>
            </div>
            <div className="dw-dcs-main-content">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={survey?.answerUrlQR} alt="二维码" style={{ border: '1px solid #f1f2f5', width: 120, height: 120 }} />
                <Button type="primary" icon={<DownloadOutlined />} style={{ marginLeft: 10 }} onClick={() => downloadAnswerImg(`${survey?.answerUrlQR}&down=1`)}>
                  下载二维码
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </DwSurveyDcsWrapperV6>
  );
};

export default DwAnswerUrlV6; 
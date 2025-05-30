import React from 'react';
import { Button, Input, Row, Col, Image, message } from 'antd';
import { CopyOutlined, LinkOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Clipboard from 'clipboard';

interface Survey {
  answerUrl: string;
  answerUrl1: string;
  answerUrlQR: string;
}

interface Props {
  survey: Survey;
}

const DwAnswerUrlMain: React.FC<Props> = ({ survey }) => {
  const downloadAnswerImg = (imgSrc: string) => {
    console.debug(imgSrc);
    window.location.href = imgSrc;
  };

  const copyActiveCode = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    const clipboard = new Clipboard(e.currentTarget, { text: () => text });
    
    clipboard.on('success', () => {
      message.success('复制成功');
      clipboard.off('error');
      clipboard.off('success');
      clipboard.destroy();
    });

    clipboard.on('error', () => {
      message.warning('该浏览器不支持自动复制');
      clipboard.off('error');
      clipboard.off('success');
      clipboard.destroy();
    });

    clipboard.onClick(e);
  };

  return (
    <div>
      <div>
        <div className="dw-dcs-main-title">
          <h4>答卷地址</h4>
          <div className="dw-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
        </div>
        <div className="dw-dcs-main-content">
          <div className="dw-dcs-main-title">
            <div className="dw-dcs-main-p">简短地址：此地址只支持现代浏览器</div>
          </div>
          <Input 
            id="copyCodeInput" 
            value={survey.answerUrl} 
            readOnly 
            style={{ width: 500 }} 
          />
          <Button.Group>
            <Button 
              type="primary" 
              icon={<CopyOutlined />} 
              onClick={(e) => copyActiveCode(e, survey.answerUrl)}
            >
              复制地址
            </Button>
            <Link to={survey.answerUrl} target="_blank">
              <Button 
                icon={<LinkOutlined />} 
                style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              >
                打开问卷
              </Button>
            </Link>
          </Button.Group>
        </div>
        <div className="dw-dcs-main-content">
          <div className="dw-dcs-main-title">
            <div className="dw-dcs-main-p">
              兼容地址：此地址支持所有浏览器中使用，如IE等。
            </div>
          </div>
          <Input 
            id="copyCodeInput" 
            value={survey.answerUrl1} 
            readOnly 
            style={{ width: 500 }} 
          />
          <Button.Group>
            <Button 
              type="primary" 
              icon={<CopyOutlined />} 
              onClick={(e) => copyActiveCode(e, survey.answerUrl1)}
            >
              复制地址
            </Button>
            <Link to={survey.answerUrl1} target="_blank">
              <Button 
                icon={<LinkOutlined />} 
                style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              >
                打开问卷
              </Button>
            </Link>
          </Button.Group>
        </div>
      </div>
      <div>
        <div className="dw-dcs-main-title">
          <h4>二维码地址</h4>
          <div className="dw-dcs-main-p">通过手机扫一扫，或下载二维码，即可进行问卷数据收集。</div>
        </div>
        <div className="dw-dcs-main-content">
          <Row align="middle">
            <Col span={4}>
              <Image
                src={survey.answerUrlQR}
                className="dw-dcs-main-img"
                placeholder={
                  <div className="image-slot">
                    加载中<span className="dot">...</span>
                  </div>
                }
              />
            </Col>
            <Col span={20}>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                style={{ marginLeft: 10 }}
                onClick={() => downloadAnswerImg(`${survey.answerUrlQR}&down=1`)}
              >
                下载二维码
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DwAnswerUrlMain; 
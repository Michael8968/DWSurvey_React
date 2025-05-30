import React from 'react';
import { Button, Input, Row, Col, Image, message } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';
import Clipboard from 'clipboard';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';

const DwAnswerWeixin: React.FC = () => {
  const copyActiveCode = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    const clipboard = new Clipboard(e.currentTarget, { text: () => text });
    
    clipboard.on('success', () => {
      message.success('复制成功');
      clipboard.destroy();
    });

    clipboard.on('error', () => {
      message.warning('该浏览器不支持自动复制');
      clipboard.destroy();
    });

    clipboard.onClick(e);
  };

  return (
    <div>
      <DwSurveyDcsWrapper isAnswerWx={true}>
        {({ survey }) => (
          <>
            <div>
              <div className="dw-dcs-main-title">
                <h4>通过微信二维码发送或分享给好友</h4>
                <div className="dw-dcs-main-p">通过手机扫一扫，或下载二维码，发送或分享给好友，即可进行问卷数据收集。</div>
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
                    >
                      下载二维码
                    </Button>
                    <div className="dw-dcs-main-p" style={{ padding: 10 }}>
                      通过手机扫一扫，或下载二维码，即可进行问卷数据收集。
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <div className="dw-dcs-main-title">
                <h4>微信公众号分享</h4>
                <div className="dw-dcs-main-p">通过微信公众号，发送或分享给被访者。</div>
              </div>
              <div className="dw-dcs-main-content">
                <div style={{ backgroundColor: '#F1F1F1', padding: 10 }}>
                  <Row gutter={20} align="middle">
                    <Col span={8}>
                      <div className="dw-dcs-main-wx-step">1、使用微信扫一扫功能。</div>
                      <Image
                        src="/static/diaowen/images/img1/weixin_collect1.jpg"
                        className="dw-dcs-main-img"
                        placeholder={
                          <div className="image-slot">
                            加载中<span className="dot">...</span>
                          </div>
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <div className="dw-dcs-main-wx-step">2、打开问卷后，点击右上角的"分享"按钮。</div>
                      <Image
                        src="/static/diaowen/images/img1/weixin_collect2.jpg"
                        className="dw-dcs-main-img"
                        placeholder={
                          <div className="image-slot">
                            加载中<span className="dot">...</span>
                          </div>
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <div className="dw-dcs-main-wx-step">3、选择"发送给朋友"或"分享到朋友圈"</div>
                      <Image
                        src="/static/diaowen/images/img1/weixin_collect3.jpg"
                        className="dw-dcs-main-img"
                        placeholder={
                          <div className="image-slot">
                            加载中<span className="dot">...</span>
                          </div>
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div>
              <div className="dw-dcs-main-title">
                <h4>通过微信公众号</h4>
                <div className="dw-dcs-main-p">复制下面的问卷链接到QQ，Email等工具中直接发给被用户</div>
              </div>
              <div className="dw-dcs-main-content">
                <div>
                  <Input 
                    id="copyCodeInput" 
                    value={survey.answerUrl} 
                    readOnly 
                    style={{ width: 400 }} 
                  />
                  <Button.Group>
                    <Button 
                      type="primary" 
                      icon={<CopyOutlined />} 
                      onClick={(e) => copyActiveCode(e, survey.answerUrl)}
                    >
                      复制地址
                    </Button>
                  </Button.Group>
                </div>
                <div style={{ padding: 10, backgroundColor: '#F1F1F1', marginTop: 20 }}>
                  <Row gutter={20} align="top">
                    <Col span={8}>
                      <div className="dw-dcs-main-wx-step">1、打开公众账号。</div>
                      <Image
                        src="/static/diaowen/images/img1/weixin_b_s3.png"
                        className="dw-dcs-main-img"
                        placeholder={
                          <div className="image-slot">
                            加载中<span className="dot">...</span>
                          </div>
                        }
                      />
                    </Col>
                    <Col span={8}>
                      <div className="dw-dcs-main-wx-step">2、将链接放入公众号中确认后推送文章。</div>
                      <Image
                        src="/static/diaowen/images/img1/weixin_b_s4.jpeg"
                        className="dw-dcs-main-img"
                        placeholder={
                          <div className="image-slot">
                            加载中<span className="dot">...</span>
                          </div>
                        }
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </>
        )}
      </DwSurveyDcsWrapper>
    </div>
  );
};

export default DwAnswerWeixin; 
import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Radio, ColorPicker, Slider, InputNumber, message } from 'antd';
import { CopyOutlined, RightOutlined } from '@ant-design/icons';
import Clipboard from 'clipboard';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';

const DwSiteComp: React.FC = () => {
  const [color1, setColor1] = useState('#409EFF');
  const [color2, setColor2] = useState('#FFFFFF');
  const [value, setValue] = useState(60);
  const [radio, setRadio] = useState('右边');
  const [siteCompCode, setSiteCompCode] = useState(
    '<div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target=\'_blank\' id="dwsurveyWebSiteFixedA" href="" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">问卷调查</a></div>'
  );

  const copyActiveCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode');
    if (webSiteElementCode) {
      setSiteCompCode(webSiteElementCode.innerHTML);
    }
    
    const clipboard = new Clipboard(e.currentTarget, { text: () => siteCompCode });
    
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

  const handleSlider = (val: number) => {
    setValue(val);
    let posHeight = window.innerHeight - val * 10;
    if (posHeight < 0) {
      posHeight = 0;
    }
    const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode');
    const webSiteElement = document.getElementById('dwsurveyWebSiteFixed');
    if (webSiteElement) {
      webSiteElement.style.top = posHeight + 'px';
    }
    if (webSiteElementCode) {
      setSiteCompCode(webSiteElementCode.innerHTML);
    }
  };

  const handleLRButton = (val: string) => {
    setRadio(val);
    const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode');
    const webSiteElement = document.getElementById('dwsurveyWebSiteFixed');
    if (webSiteElement) {
      if (val === '左边') {
        webSiteElement.style.left = '0px';
        webSiteElement.style.right = 'auto';
      } else {
        webSiteElement.style.left = 'auto';
        webSiteElement.style.right = '0px';
      }
    }
    if (webSiteElementCode) {
      setSiteCompCode(webSiteElementCode.innerHTML);
    }
  };

  const handleBgColor = (color: string) => {
    setColor1(color);
    const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode');
    const webSiteElement = document.getElementById('dwsurveyWebSiteFixedA');
    if (webSiteElement) {
      webSiteElement.style.backgroundColor = color;
    }
    if (webSiteElementCode) {
      setSiteCompCode(webSiteElementCode.innerHTML);
    }
  };

  const handleTextColor = (color: string) => {
    setColor2(color);
    const webSiteElementCode = document.getElementById('dwsurveyWebAnswerCompCode');
    const webSiteElement = document.getElementById('dwsurveyWebSiteFixedA');
    if (webSiteElement) {
      webSiteElement.style.color = color;
    }
    if (webSiteElementCode) {
      setSiteCompCode(webSiteElementCode.innerHTML);
    }
  };

  return (
    <div>
      <DwSurveyDcsWrapper isSiteComp={true}>
        {({ survey }) => (
          <>
            <div>
              <div className="dw-dcs-main-title">
                <h4>通过网站挂件快速收集问卷</h4>
                <div className="dw-dcs-main-p">复制右边生成的挂件代码，放入网站Footer页中即可实现全站带有答卷挂件。</div>
              </div>
              <div className="dw-dcs-main-content"></div>
            </div>
            <div>
              <Row>
                <Col span={8}>
                  <div className="site-comp-left">
                    <div className="site-comp-left-title">风格设置</div>
                    <div>
                      <Row>
                        <Col span={16}>
                          <div className="dw-c-from-item">
                            挂件位置：
                            <Radio.Group 
                              value={radio} 
                              size="small" 
                              onChange={(e) => handleLRButton(e.target.value)}
                            >
                              <Radio.Button value="左边">左边</Radio.Button>
                              <Radio.Button value="右边">右边</Radio.Button>
                            </Radio.Group>
                          </div>
                          <div className="dw-c-from-item dw-c-from-item-color">
                            <span>背景颜色：</span>
                            <ColorPicker 
                              value={color1} 
                              onChange={(color) => handleBgColor(color.toHexString())} 
                            />
                          </div>
                          <div className="dw-c-from-item dw-c-from-item-color">
                            <span>文字颜色：</span>
                            <ColorPicker 
                              value={color2} 
                              onChange={(color) => handleTextColor(color.toHexString())} 
                            />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="dw-c-from-item">
                            <div>挂件高度：</div>
                            <div style={{ marginTop: 15 }}>
                              <Slider
                                value={value}
                                vertical
                                style={{ height: 200 }}
                                onChange={handleSlider}
                              />
                            </div>
                            <div style={{ paddingTop: 15 }}>
                              <InputNumber
                                value={value}
                                min={1}
                                max={100}
                                controls={true}
                                size="small"
                                onChange={handleSlider}
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col span={2} style={{ textAlign: 'center', color: 'rgb(211, 211, 211)' }}>
                  <RightOutlined />
                </Col>
                <Col span={14}>
                  <div className="site-comp-right">
                    <div>
                      <Input.TextArea
                        value={siteCompCode}
                        autoSize={{ minRows: 2, maxRows: 8 }}
                        disabled
                      />
                    </div>
                    <div style={{ paddingTop: 10 }}>
                      <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        style={{ width: '100%' }}
                        onClick={copyActiveCode}
                      >
                        复制挂件代码
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              <div dangerouslySetInnerHTML={{ __html: survey.siteCompCodeRoot }} />
            </div>
          </>
        )}
      </DwSurveyDcsWrapper>
    </div>
  );
};

export default DwSiteComp; 
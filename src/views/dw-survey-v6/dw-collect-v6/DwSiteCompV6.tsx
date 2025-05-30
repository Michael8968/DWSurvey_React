import React, { useState, useRef } from 'react';
import { Row, Col, Radio, Slider, InputNumber, Input, Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import DwSurveyDcsWrapperV6 from '@/components/common/DwSurveyDcsWrapperV6';

const defaultCode = `<div id="dwsurveyWebSiteFixed" style="position: fixed; right: 0px; left: auto; top: 520px; z-index: 99999;"><a target='_blank' id="dwsurveyWebSiteFixedA" href="" style="background-color: rgb(24, 144, 255); width: 15px; display: block; padding: 10px 6px 10px 10px; color: white; cursor: pointer; float: right; vertical-align: middle; text-decoration: none; font-size: 12px; box-sizing: content-box; line-height: 20px;">问卷调查</a></div>`;

const DwSiteCompV6: React.FC = () => {
  const [color1, setColor1] = useState('#409EFF');
  const [color2, setColor2] = useState('#FFFFFF');
  const [value, setValue] = useState(60);
  const [radio, setRadio] = useState('右边');
  const [siteCompCode, setSiteCompCode] = useState(defaultCode);
  const codeRef = useRef<HTMLDivElement>(null);

  // 复制代码
  const copyActiveCode = async () => {
    try {
      await navigator.clipboard.writeText(siteCompCode);
      message.success('复制成功');
    } catch {
      message.warning('该浏览器不支持自动复制');
    }
  };

  // 挂件高度
  const handleSlider = (val: number) => {
    setValue(val);
    // 这里可以根据实际需求动态生成代码
  };

  // 挂件位置
  const handleLRButton = (val: string) => {
    setRadio(val);
    // 这里可以根据实际需求动态生成代码
  };

  // 背景颜色
  const handleBgColor = (color: string) => {
    setColor1(color);
    // 这里可以根据实际需求动态生成代码
  };

  // 文字颜色
  const handleTextColor = (color: string) => {
    setColor2(color);
    // 这里可以根据实际需求动态生成代码
  };

  return (
    <DwSurveyDcsWrapperV6 isSiteComp={true}>
      {({ survey }: any) => (
        <>
          <div className="dw-dcs-main-title">
            <h4>通过网站挂件快速收集问卷</h4>
            <div className="dw-dcs-main-p">复制右边生成的挂件代码，放入网站Footer页中即可实现全站带有答卷挂件。</div>
          </div>
          <div className="dw-dcs-main-content"></div>
          <Row>
            <Col span={8}>
              <div className="site-comp-left">
                <div className="site-comp-left-title">风格设置</div>
                <Row>
                  <Col span={16}>
                    <div className="dw-c-from-item">挂件位置：
                      <Radio.Group value={radio} size="small" onChange={e => handleLRButton(e.target.value)}>
                        <Radio.Button value="左边">左边</Radio.Button>
                        <Radio.Button value="右边">右边</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="dw-c-from-item dw-c-from-item-color">
                      <span>背景颜色：</span>
                      <input type="color" value={color1} onChange={e => handleBgColor(e.target.value)} style={{ marginLeft: 8, width: 32, height: 32, border: 'none', background: 'none' }} />
                    </div>
                    <div className="dw-c-from-item dw-c-from-item-color">
                      <span>文字颜色：</span>
                      <input type="color" value={color2} onChange={e => handleTextColor(e.target.value)} style={{ marginLeft: 8, width: 32, height: 32, border: 'none', background: 'none' }} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="dw-c-from-item">
                      <div>挂件高度：</div>
                      <div style={{ marginTop: 15 }}>
                        <Slider
                          vertical
                          min={1}
                          max={100}
                          value={value}
                          onChange={handleSlider}
                          style={{ height: 200 }}
                        />
                      </div>
                      <div style={{ paddingTop: 15 }}>
                        <InputNumber min={1} max={100} value={value} onChange={val => setValue(Number(val))} size="small" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={2} style={{ textAlign: 'center', color: 'rgb(211, 211, 211)' }}>
              <span style={{ fontSize: 24 }}>&rarr;</span>
            </Col>
            <Col span={14}>
              <div className="site-comp-right">
                <div>
                  <Input.TextArea value={siteCompCode} autoSize={{ minRows: 2, maxRows: 8 }} disabled />
                </div>
                <div style={{ paddingTop: 10 }}>
                  <Button type="primary" icon={<CopyOutlined />} style={{ width: '100%' }} onClick={copyActiveCode}>
                    复制挂件代码
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <div ref={codeRef} dangerouslySetInnerHTML={{ __html: survey?.siteCompCodeRoot || '' }} />
        </>
      )}
    </DwSurveyDcsWrapperV6>
  );
};

export default DwSiteCompV6; 
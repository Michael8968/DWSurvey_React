import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col } from 'antd';
import DwDesignHeader from './comp/DwDesignHeader';
import DwDesignToolbar from './dw-design-toolbar/DwDesignToolbar';
import DwDesignContainerBodyCenter from '../../dw-design-survey-common/dw-design-survey-body/DwDesignContainerBodyCenter';
import DwDesignContainerBodyLeft from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-left/DwDesignContainerBodyLeft';
import DwDesignContainerBodyRight from '../../dw-design-survey-common/dw-design-survey-body/dw-design-body-right/DwDesignContainerBodyRight';
import DwFooter from '../../../../../layouts/DwFooter';
import { resetOtherClickItem } from '../../../../dw-utils/dw-survey-update-item-click';
import '../../../../../../assets/css/font-dwsurvey-1.4/iconfont.css';
import '../../../../../../assets/css/design-survey.css';

const { Header, Content } = Layout;

interface Survey {
  [key: string]: any;
}

interface Props {
  value: Survey | null;
  onChange: (survey: Survey) => void;
}

interface StyleState {
  top: string | number;
  index: number;
}

interface ContainerBodyStyle {
  marginTop: string;
  marginBottom: string;
}

const DwDesignTopBottomLayout: React.FC<Props> = ({ value: survey, onChange }) => {
  const toolsWrapRef = useRef<HTMLDivElement>(null);
  const designContainerBodyRef = useRef<any>(null);
  const [drag, setDrag] = useState(false);
  const [headerQuToolbarStyle, setHeaderQuToolbarStyle] = useState<StyleState>({ top: 60, index: 200 });
  const [containerLRStyle, setContainerLRStyle] = useState<StyleState>({ top: 0, index: 100 });
  const [lrContentHeight, setLrContentHeight] = useState(157);
  const [containerBodyStyle, setContainerBodyStyle] = useState<ContainerBodyStyle>({ marginTop: '157px', marginBottom: '0' });

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onStart = () => {
    setDrag(true);
  };

  const onEnd = () => {
    setDrag(false);
    resetStyleIndex();
  };

  const resetStyleIndex = () => {
    setHeaderQuToolbarStyle(prev => ({ ...prev, index: 200 }));
    setContainerLRStyle(prev => ({ ...prev, index: 100 }));
  };

  const onStartToolbar = () => {
    onStart();
    resetStyleIndex();
  };

  const onStartDragContainer = () => {
    onStart();
    setHeaderQuToolbarStyle(prev => ({ ...prev, index: 20 }));
    setContainerLRStyle(prev => ({ ...prev, index: 10 }));
  };

  const onStartRight = () => {
    onStart();
    setHeaderQuToolbarStyle(prev => ({ ...prev, index: 100 }));
    setContainerLRStyle(prev => ({ ...prev, index: 200 }));
  };

  const calculateCenterMarginTop = (): number => {
    let marginTop = 157;
    const windowInnerHeight = window.innerHeight;
    if (windowInnerHeight > 1280) marginTop = 160;
    setContainerBodyStyle(prev => ({ ...prev, marginTop: `${marginTop}px` }));
    return marginTop;
  };

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const headerHeight = 60;
    const centerMarginTop = calculateCenterMarginTop();
    const lrUnContentHeight = 60; // 60 是左右去掉非内容区域的高度

    if (scrollTop >= headerHeight) {
      const newTop1 = scrollTop - headerHeight;
      const lrHeight = window.innerHeight - centerMarginTop - lrUnContentHeight;
      console.debug('lrHeight', lrHeight);
      setHeaderQuToolbarStyle(prev => ({ ...prev, top: '0px' }));
      setContainerLRStyle(prev => ({ ...prev, top: `${newTop1}px` }));
      setLrContentHeight(lrHeight);
    } else {
      const newTop = headerHeight - scrollTop;
      console.debug('window.innerHeight', window.innerHeight);
      const lrHeight = window.innerHeight - (centerMarginTop + newTop) - lrUnContentHeight;
      setHeaderQuToolbarStyle(prev => ({ ...prev, top: `${newTop}px` }));
      setContainerLRStyle(prev => ({ ...prev, top: '0px' }));
      setLrContentHeight(lrHeight);
    }
  };

  const documentClick = () => {
    if (survey) {
      resetOtherClickItem(survey, -1);
    }
  };

  if (!survey) {
    return (
      <div style={{ fontSize: 16, textAlign: 'center', padding: 100, height: '100vh', backgroundColor: 'white', color: '#202120' }}>
        加载中...
      </div>
    );
  }

  return (
    <div onClick={documentClick}>
      <div className="dw-design-container">
        <Layout>
          <Header className="header" style={{ backgroundColor: 'var(--dw-primary-bg-color)' }}>
            <DwDesignHeader survey={survey as any} />
          </Header>
          <Content style={{ padding: 0 }}>
            <div style={{ minHeight: 600 }}>
              <div>
                <div
                  id="tools_wrap"
                  ref={toolsWrapRef}
                  style={{
                    top: headerQuToolbarStyle.top,
                    zIndex: headerQuToolbarStyle.index
                  }}
                >
                  <DwDesignToolbar
                    survey={survey as any}
                    onStartDrag={onStartToolbar}
                    onEndDrag={onEnd}
                  />
                </div>

                <div style={containerBodyStyle}>
                  <div className="dw-container-body">
                    <Row gutter={10} style={{ margin: 0 }}>
                      <Col span={4}>
                        <div
                          style={{
                            top: containerLRStyle.top,
                            zIndex: containerLRStyle.index
                          }}
                          className="dw-container-body-center-left dw-container-body-lr"
                        >
                          <DwDesignContainerBodyLeft
                            survey={survey as any}
                            lrContentHeight={lrContentHeight}
                          />
                        </div>
                      </Col>
                      <Col span={16}>
                        <DwDesignContainerBodyCenter
                          survey={survey as any}
                          onStartDragContainer={onStartDragContainer}
                          onEndDrag={onEnd}
                        />
                      </Col>
                      <Col span={4}>
                        <div
                          style={{
                            top: containerLRStyle.top,
                            zIndex: containerLRStyle.index
                          }}
                          className="dw-container-body-center-right dw-container-body-lr"
                        >
                          <DwDesignContainerBodyRight
                            survey={survey as any}
                            lrContentHeight={lrContentHeight}
                            onStartDragRight={onStartRight}
                            onEndDrag={onEnd}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DwFooter />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default DwDesignTopBottomLayout; 
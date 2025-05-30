import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Radio, Button } from 'antd';
import { dwFooterUtils } from '../../dw-survey-comp/dw-utils/dw-common/dw-footer-util';
import './SwitchLayoutDialog.css';

const SwitchLayoutDialog: React.FC = () => {
  const [layout, setLayout] = useState('tb');
  const [dialogVisible, setDialogVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dwFooterUtils.isLayoutLr(() => {
      setLayout('lr');
    });
  }, []);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const layoutConfirm = () => {
    // 保存配置
    dwFooterUtils.setLayout(layout);
    // 执行切换
    const routePath = location.pathname;
    if (layout === 'tb') {
      // 上下结构
      const newPath = routePath.replace('/v6/lr/', '/v6/');
      navigate(newPath);
    } else if (layout === 'lr') {
      // 左右结构
      if (!(routePath.indexOf('/v6/lr/') >= 0)) {
        const newPath = routePath.replace('/v6/', '/v6/lr/');
        navigate(newPath);
      }
    }
    setDialogVisible(false);
  };

  return (
    <Modal
      title="切换布局"
      open={dialogVisible}
      onCancel={() => setDialogVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setDialogVisible(false)}>
          取 消
        </Button>,
        <Button key="confirm" type="primary" onClick={layoutConfirm}>
          确 定
        </Button>,
      ]}
      width="30%"
    >
      <div>
        <div style={{ fontSize: '14px', paddingBottom: '20px', lineHeight: '20px' }}>
          系统默认提供两套布局方案，切换可以查看，更多可自定义。
        </div>
        <div>
          <Radio.Group value={layout} onChange={(e) => setLayout(e.target.value)}>
            <Radio.Button value="tb">
              <i className="fa-solid fa-laptop"></i> 上下布局
            </Radio.Button>
            <Radio.Button value="lr">
              <i className="fa-solid fa-border-top-left"></i> 左右布局
            </Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ fontSize: '12px', padding: '20px 0', color: 'darkgrey' }}>
          提示：本修改只对当前会话有效，要永久生效需要修改后端配置
        </div>
      </div>
    </Modal>
  );
};

export default SwitchLayoutDialog; 
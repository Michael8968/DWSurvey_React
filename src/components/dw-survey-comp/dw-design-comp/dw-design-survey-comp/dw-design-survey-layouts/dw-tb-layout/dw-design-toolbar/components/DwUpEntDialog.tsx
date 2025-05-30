import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const DwUpEntDialog: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const openDialog = () => {
    setDialogVisible(true);
  };

  const gotoDw = () => {
    window.open('https://www.diaowen.net?s0=oss&v1=2501&e5=dsm0', '_blank');
  };

  return (
    <Modal
      title="提示"
      open={dialogVisible}
      onCancel={() => setDialogVisible(false)}
      width={600}
      footer={[
        <Button key="upgrade" type="primary" onClick={gotoDw}>
          了解一下
        </Button>
      ]}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>
          需要更多题型吗？企业版支持多达&nbsp;<span style={{ color: '#ce6105' }}>50多种题型</span>，赶快了解一下吧！
        </div>
        <div style={{ fontSize: 13, color: '#9d9d9d', marginTop: 10 }}>提示：设计数据已经自动保存</div>
      </div>
    </Modal>
  );
};

export default DwUpEntDialog; 
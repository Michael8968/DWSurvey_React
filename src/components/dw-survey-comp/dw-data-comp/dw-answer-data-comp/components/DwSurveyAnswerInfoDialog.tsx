import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import DwSurveyAnswerReview from '../DwSurveyAnswerReview';

interface PadPhoneAnBodySpan {
  xs: { span: number; offset: number };
  sm: { span: number; offset: number };
  md: { span: number; offset: number };
  lg: { span: number; offset: number };
  xl: { span: number; offset: number };
}

interface Props {
  onRefreshData?: () => void;
}

export interface DwSurveyAnswerInfoDialogRef {
  openDialog: (row: any) => void;
}

const DwSurveyAnswerInfoDialog = forwardRef<DwSurveyAnswerInfoDialogRef, Props>(({ onRefreshData }, ref) => {
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [row, setRow] = useState<any>(null);

  const padPhoneAnBodySpan: PadPhoneAnBodySpan = {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
    md: { span: 24, offset: 0 },
    lg: { span: 24, offset: 0 },
    xl: { span: 24, offset: 0 }
  };

  useImperativeHandle(ref, () => ({
    openDialog: (row: any) => {
      setDialogFormVisible(true);
      setRow(row);
      console.debug('row', row);
    }
  }));

  const closeDialog = () => {
    setRow(null);
  };

  return (
    <div>
      <Modal
        title="答卷数据"
        open={dialogFormVisible}
        onCancel={() => setDialogFormVisible(false)}
        width="60%"
        footer={[
          <button key="close" onClick={() => setDialogFormVisible(false)}>
            关闭
          </button>
        ]}
        destroyOnClose
        afterClose={closeDialog}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: '0 20px' }}>
          {row && (
            <div style={{ height: 600, overflow: 'scroll' }}>
              <DwSurveyAnswerReview
                dwEsSurveyAnswer={row}
                padPhoneAnBodySpan={padPhoneAnBodySpan}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
});

export default DwSurveyAnswerInfoDialog; 
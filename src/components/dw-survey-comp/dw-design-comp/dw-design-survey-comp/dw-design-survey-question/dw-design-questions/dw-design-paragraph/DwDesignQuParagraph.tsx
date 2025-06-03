import React, { useState } from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Form } from 'antd';

interface Survey {
  [key: string]: any;
}

interface DwDesignQuParagraphProps {
  index?: number;
  survey?: Survey;
  'onUpdate-survey'?: (updatedSurvey: Survey) => void;
}

const DwDesignQuParagraph: React.FC<DwDesignQuParagraphProps> = () => {
  const [inputText, setInputText] = useState('');

  return (
    <Form>
      <div style={{ fontSize: '12px' }}>
        <div style={{ color: '#c6c6c7' }}>
          <WarningOutlined /> 请在上方输入段落的标题或备注
        </div>
      </div>
    </Form>
  );
};

export default DwDesignQuParagraph;
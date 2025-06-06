import React, { useState } from 'react';
import { Select } from 'antd';

interface OptionTitleObj {
  dwText: string;
  dwHtml: string;
}

interface Option {
  optionTitleObj: OptionTitleObj;
}

interface Props {
  index: number;
  options: Option[];
  survey: any;
  quType: string;
  onUpdateOptions: (options: Option[]) => void;
}

const DwQuOptionCommon4: React.FC<Props> = ({ index, options, survey, quType, onUpdateOptions }) => {
  const [value, setValue] = useState<string | string[] | null>(null);

  const handleChange = (val: string | string[]) => {
    setValue(val);
  };

  return (
    <div>
      <Select
        value={value}
        mode={quType === 'CHECKBOX' ? 'multiple' : undefined}
        placeholder="请选择"
        onChange={handleChange}
      >
        {options.map((item, optionIndex) => (
          <Select.Option
            key={`fa_${optionIndex}`}
            label={item.optionTitleObj.dwHtml}
            value={item.optionTitleObj.dwHtml}
          >
            {item.optionTitleObj.dwHtml}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default DwQuOptionCommon4; 
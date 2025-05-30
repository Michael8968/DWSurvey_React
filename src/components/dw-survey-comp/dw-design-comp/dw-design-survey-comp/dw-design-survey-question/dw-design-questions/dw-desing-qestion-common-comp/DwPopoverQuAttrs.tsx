import React from 'react';
import { Popover } from 'element-react';
import DwQuAttrs from './dw-qu-attrs/DwQuAttrs';
import './DwPopoverQuAttrs.scss';

interface QuFocusObj {
  quFocus: boolean;
  quSetShow: boolean;
  quLogicShow: boolean;
  quMoreOptionShow: boolean;
  quMoreOptionShowEdit: boolean;
  quScorePopoverShow: boolean;
  quScaleTextPopoverShow: boolean;
  quMoreOptionColShow: boolean;
}

interface Question {
  quFocusObj: QuFocusObj;
}

interface Survey {
  questions: Question[];
}

interface Props {
  value: Survey;
  index: number;
  popoverTitle?: string;
  onClickItem?: () => void;
  onChange: (survey: Survey) => void;
  children: React.ReactNode;
}

const DwPopoverQuAttrs: React.FC<Props> = ({
  value,
  index,
  popoverTitle = '题目属性',
  onClickItem,
  onChange,
  children
}) => {
  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const newSurvey = { ...value };
    newSurvey.questions[index].quFocusObj.quSetShow = true;
    onChange(newSurvey);
  };

  return (
    <Popover
      value={value.questions[index].quFocusObj.quSetShow}
      trigger="manual"
      placement="right-start"
      width={600}
      popperClass="dw-qu-set-popper"
    >
      <DwQuAttrs
        value={value}
        index={index}
        onChange={onChange}
      />
      <div onClick={clickShowPopoverEvent}>{children}</div>
    </Popover>
  );
};

export default DwPopoverQuAttrs; 
import React, { useState, useRef } from 'react';
import DwTextEditLabel from './DwTextEditLabel';

interface Value {
  dwHtml: string;
  dwText: string;
  [key: string]: any;
}

interface Survey {
  curEditObj: Array<{ itemClick: boolean }>;
  [key: string]: any;
}

interface Props {
  value: Value;
  survey: Survey;
  index: number;
  onUpdateInput: (value: { dwText: string; dwHtml: string }) => void;
}

const DwTextEditLabelCommon: React.FC<Props> = ({ value, survey, index, onUpdateInput }) => {
  const [itemStatus, setItemStatus] = useState({
    itemHover: false,
    itemClick: false
  });
  const curEditLabelRef = useRef<any>(null);

  const clickItem = () => {
    // 注释掉的代码
    /*
    if (this.itemIndex === 0) {
      this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
    }
    this.survey.curEditObj[this.itemIndex].itemClick = true
    const curObjs = this.survey.curEditObj
    for (let i = 0; i < curObjs.length; i++) {
      if (i !== this.itemIndex) {
        this.survey.curEditObj[i].itemClick = false
      }
    }*/
  };

  const upItemClick = (visible: boolean) => {
    /*
    if (this.itemIndex === 0) {
      this.itemIndex = this.survey.curEditObj.push({itemClick: true})-1
    }
    this.survey.curEditObj[this.itemIndex].itemClick = true*/
    setItemStatus(prev => ({ ...prev, itemClick: visible }));
  };

  const mouseleaveItem = () => {
    setItemStatus(prev => ({ ...prev, itemHover: false }));
  };

  const mouseoverItem = () => {
    setItemStatus(prev => ({ ...prev, itemHover: true }));
  };

  const upValue = (html: { dwText: string; dwHtml: string }) => {
    console.debug('html', html);
    onUpdateInput(html);
  };

  const editFocus = () => {
    setItemStatus(prev => ({ ...prev, itemClick: true }));
    if (curEditLabelRef.current) {
      curEditLabelRef.current.editFocus();
    }
  };

  return (
    <div onClick={clickItem} onMouseOver={mouseoverItem} onMouseLeave={mouseleaveItem}>
      <DwTextEditLabel
        ref={(ref: any) => (curEditLabelRef.current = ref)}
        value={value}
        itemStatus={itemStatus}
        onUpItemClick={upItemClick}
        onUpValue={upValue}
        onUpdateInput={onUpdateInput}
      />
    </div>
  );
};

export default DwTextEditLabelCommon; 
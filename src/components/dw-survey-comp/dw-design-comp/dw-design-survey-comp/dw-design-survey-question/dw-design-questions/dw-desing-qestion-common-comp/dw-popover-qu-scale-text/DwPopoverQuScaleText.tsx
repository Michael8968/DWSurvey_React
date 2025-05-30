import React, { useState } from 'react';
import { Popover, Tag, Input, Button } from 'element-react';

interface QuFocusObj {
  quScaleTextPopoverShow: boolean;
}

interface ScaleAttr {
  min?: number;
  max?: number;
}

interface SliderAttr {
  min?: number;
  max?: number;
}

interface QuAttr {
  scaleAttr?: ScaleAttr;
  sliderAttr?: SliderAttr;
}

interface OptionTitleObj {
  dwHtml: string;
  dwText: string;
  dwPlaceholder: string;
  isRefreshValue: boolean;
}

interface QuRow {
  lr: {
    left: { optionTitleObj: OptionTitleObj };
    right: { optionTitleObj: OptionTitleObj };
  };
}

interface Question {
  quType: string;
  quFocusObj: QuFocusObj;
  quAttr: QuAttr;
  quRows: QuRow[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  index: number;
  survey: Survey;
  popoverTitle?: string;
  textPlaceholder?: string;
  addOrEdit?: string;
  onClickItem?: () => void;
  onChange: (survey: Survey) => void;
  children: React.ReactNode;
}

const DwPopoverQuScaleText: React.FC<Props> = ({
  index,
  survey,
  popoverTitle = '批量配置极点文本',
  textPlaceholder = '请输入需要批量新增加的选项内容，每行一个。',
  addOrEdit = 'add',
  onClickItem,
  onChange,
  children,
}) => {
  const [leftText, setLeftText] = useState<string>('');
  const [rightText, setRightText] = useState<string>('');

  const question = survey.questions[index];
  const isMatrixScale = question.quType === 'MATRIX_SCALE';
  const attr = isMatrixScale ? question.quAttr.scaleAttr : question.quAttr.sliderAttr;

  const showPopoverLoad = () => {
    // 可以在这里添加初始化逻辑
  };

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const newSurvey = { ...survey };
    newSurvey.questions[index].quFocusObj.quScaleTextPopoverShow = true;
    onChange(newSurvey);
    setLeftText('');
    setRightText('');
  };

  const clickTag = (keyword: string) => {
    setLeftText(`很不${keyword}`);
    setRightText(`非常${keyword}`);
  };

  const configBtnEvent = () => {
    const newSurvey = { ...survey };
    const question = newSurvey.questions[index];
    const quType = question.quType;

    if (quType === 'MATRIX_SCALE' || quType === 'MATRIX_SLIDER') {
      const quRows = question.quRows;
      quRows.forEach(quRow => {
        quRow.lr.left.optionTitleObj = {
          dwHtml: leftText,
          dwText: leftText,
          dwPlaceholder: '请输入选项内容',
          isRefreshValue: true,
        };
        quRow.lr.right.optionTitleObj = {
          dwHtml: rightText,
          dwText: rightText,
          dwPlaceholder: '请输入选项内容',
          isRefreshValue: true,
        };
      });
      onChange(newSurvey);
    }
  };

  return (
    <Popover
      value={question.quFocusObj.quScaleTextPopoverShow}
      trigger="manual"
      placement="right"
      popperClass="dw-popover-more-options"
      onShow={showPopoverLoad}
    >
      <div style={{ display: 'block' }}>
        <div style={{ fontSize: 14, paddingBottom: 5 }}>{popoverTitle}</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ padding: 0 }}>
            <Tag onClick={() => clickTag('满意')}>满意度</Tag>
            <Tag onClick={() => clickTag('重要')}>重要性</Tag>
            <Tag onClick={() => clickTag('欢迎')}>欢迎度</Tag>
            <Tag onClick={() => clickTag('认同')}>认同度</Tag>
            <Tag onClick={() => clickTag('愿意')}>愿意度</Tag>
            <Tag onClick={() => clickTag('可能')}>可能性</Tag>
          </div>
          {attr?.min !== undefined && (
            <div style={{ padding: 0 }}>
              <div style={{ padding: 5 }}>{attr.min}分文案：</div>
              <Input value={leftText} onChange={setLeftText} />
            </div>
          )}
          {attr?.max !== undefined && (
            <div style={{ padding: 0 }}>
              <div style={{ padding: 5 }}>{attr.max}分文案：</div>
              <Input value={rightText} onChange={setRightText} />
            </div>
          )}
        </div>
        <div style={{ padding: 5 }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: 13, marginRight: 5, color: 'darkgrey' }}>
              提示：确定后会把此题所有的左右极点文字进行统一替换
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" size="small" style={{ marginTop: 5 }} onClick={configBtnEvent}>
              确定
            </Button>
          </div>
        </div>
      </div>
      <div onClick={clickShowPopoverEvent}>{children}</div>
    </Popover>
  );
};

export default DwPopoverQuScaleText; 
import React from 'react';
import { Popover, Table, TableColumn, InputNumber } from 'element-react';
import { caleDesignSurveySumScore } from '../../../../../../dw-utils/dw-common/dw-survey-design-score';

interface QuFocusObj {
  quScorePopoverShow: boolean;
}

interface OptionTitleObj {
  dwText: string;
}

interface Option {
  optionTitleObj: OptionTitleObj;
  scoreNum: number;
}

interface Question {
  quType: string;
  quFocusObj: QuFocusObj;
  quRadios?: Option[];
  quCheckboxs?: Option[];
  quCols?: Option[];
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

const DwPopoverSetQuScore: React.FC<Props> = ({
  index,
  survey,
  popoverTitle = '配置选项分值',
  textPlaceholder = '请输入需要批量新增加的选项内容，每行一个。',
  addOrEdit = 'add',
  onClickItem,
  onChange,
  children,
}) => {
  const question = survey.questions[index];

  const showPopoverLoad = () => {
    // 可以在这里添加初始化逻辑
  };

  const clickShowPopoverEvent = () => {
    onClickItem?.();
    const newSurvey = { ...survey };
    newSurvey.questions[index].quFocusObj.quScorePopoverShow = true;
    onChange(newSurvey);
  };

  const inputNumberChange = () => {
    caleDesignSurveySumScore(survey, index);
  };

  const renderTable = () => {
    if (question.quType === 'RADIO' && question.quRadios) {
      return (
        <Table data={question.quRadios}>
          <TableColumn prop="optionTitleObj.dwText" label="选项内容" width={520} />
          <TableColumn label="选项分值" width={180}>
            {(row: Option) => (
              <InputNumber
                value={row.scoreNum}
                size="small"
                onChange={inputNumberChange}
              />
            )}
          </TableColumn>
        </Table>
      );
    }

    if (question.quType === 'CHECKBOX' && question.quCheckboxs) {
      return (
        <Table data={question.quCheckboxs}>
          <TableColumn prop="optionTitleObj.dwText" label="选项内容" width={520} />
          <TableColumn label="选项分值" width={180}>
            {(row: Option) => (
              <InputNumber
                value={row.scoreNum}
                size="small"
                onChange={inputNumberChange}
              />
            )}
          </TableColumn>
        </Table>
      );
    }

    if ((question.quType === 'MATRIX_RADIO' || question.quType === 'MATRIX_CHECKBOX') && question.quCols) {
      return (
        <Table data={question.quCols.slice(1)}>
          <TableColumn prop="optionTitleObj.dwText" label="列标题" width={520} />
          <TableColumn label="列分值" width={180}>
            {(row: Option) => (
              <InputNumber
                value={row.scoreNum}
                size="small"
                onChange={inputNumberChange}
              />
            )}
          </TableColumn>
        </Table>
      );
    }

    return null;
  };

  return (
    <Popover
      value={question.quFocusObj.quScorePopoverShow}
      trigger="manual"
      placement="right"
      popperClass="dw-popover-more-options"
      onShow={showPopoverLoad}
    >
      <div style={{ display: 'block' }}>
        <div style={{ fontSize: 14, paddingBottom: 5 }}>{popoverTitle}</div>
        <div>{renderTable()}</div>
        <div style={{ textAlign: 'right', padding: 5 }}>
          <span style={{ fontSize: 13, marginRight: 5, color: 'darkgrey' }}>
            提示：点击框外任意区域关闭当前弹出框
          </span>
        </div>
      </div>
      <div onClick={clickShowPopoverEvent}>{children}</div>
    </Popover>
  );
};

export default DwPopoverSetQuScore; 
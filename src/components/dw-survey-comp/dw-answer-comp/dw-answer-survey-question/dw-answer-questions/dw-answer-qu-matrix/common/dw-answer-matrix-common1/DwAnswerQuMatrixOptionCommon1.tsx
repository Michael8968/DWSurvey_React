import React from 'react';
import { Input, message } from 'antd';
import DwHtmlLabelCommon from '../../../../../dw-answer-survey-common/DwHtmlLabelCommon';
import { answerQuEventCommon } from '../../../../../dw-utils/dw-survey-answer-common';
import { showReadNotify } from '../../../../../../dw-utils/dw-common/dw-msg-common';
import './DwAnswerQuMatrixOptionCommon1.css';

interface DwAnswerQuMatrixOptionCommon1Props {
  index: number;
  survey: any;
  quType: string;
  onSurveyChange: (survey: any) => void;
}

const DwAnswerQuMatrixOptionCommon1: React.FC<DwAnswerQuMatrixOptionCommon1Props> = ({ index = 0, survey = {}, quType = '', onSurveyChange }) => {
  const resetOtherRadio = (rowIndex: number, colIndex: number) => {
    const newSurvey = { ...survey };
    newSurvey.questions[index].quRows[rowIndex].rowCols.forEach((item: any, idx: number) => {
      item.checked = idx === colIndex;
    });
    onSurveyChange(newSurvey);
  };

  const clickItem = (rowIndex: number, colIndex: number) => {
    if (survey.readonly) return showReadNotify('readonly');

    const newSurvey = { ...survey };
    const rowCols = newSurvey.questions[index].quRows[rowIndex].rowCols;

    if (quType === 'MATRIX_RADIO') {
      resetOtherRadio(rowIndex, colIndex);
    } else if (quType === 'MATRIX_CHECKBOX') {
      rowCols[colIndex].checked = !rowCols[colIndex].checked;
      onSurveyChange(newSurvey);
    }

    onBlur();
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newSurvey = { ...survey };
    newSurvey.questions[index].quRows[rowIndex].rowCols[colIndex].answerValue = value;
    onSurveyChange(newSurvey);
  };

  const onBlur = () => {
    answerQuEventCommon(survey, index);
  };

  if (!survey.questions?.[index]?.quCols || survey.questions[index].quCols.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: 0 }}>
      <div>
        <div style={{ overflowX: 'scroll', width: '100%', display: 'block' }}>
          <table>
            <thead>
              <tr>
                <td 
                  colSpan={survey.questions[index].quCols.length - 1} 
                  className="dw-matrix-row-title-td" 
                  style={{ padding: '0 0 5px 0' }}
                >
                  <div className="dw-display-flex">
                    <div style={{ 
                      position: 'sticky', 
                      left: 0, 
                      zIndex: 1, 
                      paddingLeft: '5px', 
                      fontSize: '12px', 
                      color: '#afafb0'
                    }}>
                      如显示不全，试试在矩阵表区域左右滑动
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                  </div>
                </td>
              </tr>
              <tr className="dw-el-radio-checkbox-tr">
                {survey.questions[index].quCols.map((colOption: any) => (
                  !colOption.tempEmptyOption && (
                    <td key={`col_${colOption.dwId}`} className="matrix-title-td">
                      <DwHtmlLabelCommon value={colOption.optionTitleObj} />
                    </td>
                  )
                ))}
              </tr>
            </thead>
            <tbody>
              {survey.questions[index].quRows.map((rowOption: any, rowOptionIndex: number) => (
                <React.Fragment key={`matrix-rowOption-${rowOption.dwId}`}>
                  <tr>
                    <td 
                      colSpan={survey.questions[index].quCols.length - 1} 
                      className="dw-matrix-row-title-td" 
                      style={{ textAlign: 'left' }}
                    >
                      <div className="dw-display-flex">
                        <div style={{ position: 'sticky', left: 0, zIndex: 1, paddingLeft: '5px' }}>
                          <DwHtmlLabelCommon value={rowOption.optionTitleObj} />
                        </div>
                        <div style={{ flexGrow: 1 }}></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="dw-el-radio-checkbox-tr">
                    {survey.questions[index].quCols.map((colOption: any, colIndex: number) => (
                      !colOption.tempEmptyOption && (
                        <td 
                          key={`matrix-colOption-content-${colIndex}`} 
                          onClick={() => clickItem(rowOptionIndex, colIndex)}
                        >
                          {quType === 'MATRIX_RADIO' && (
                            <div className="dw-qu-item-el-checkbox-radio dw-item-checked matrix-item">
                              {rowOption.rowCols[colIndex].checked ? (
                                <i className="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-solid fa-circle-dot animate__animated animate__tada dw-checked" />
                              ) : (
                                <i className="dw-qu-item-el-checkbox-radio-icon dw-radio-icon fa-regular fa-circle" />
                              )}
                            </div>
                          )}
                          {quType === 'MATRIX_CHECKBOX' && (
                            <div className="dw-qu-item-el-checkbox-radio dw-item-checked matrix-item">
                              {rowOption.rowCols[colIndex].checked ? (
                                <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-solid fa-square-check animate__animated animate__tada dw-checked" />
                              ) : (
                                <i className="dw-qu-item-el-checkbox-radio-icon dw-checkbox-icon fa-regular fa-square" />
                              )}
                            </div>
                          )}
                          {quType === 'MATRIX_INPUT' && (
                            <div style={{ padding: '5px' }}>
                              <Input
                                value={rowOption.rowCols[colIndex].answerValue}
                                placeholder="请输入"
                                onChange={(e) => handleInputChange(rowOptionIndex, colIndex, e.target.value)}
                                onBlur={onBlur}
                              />
                            </div>
                          )}
                        </td>
                      )
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DwAnswerQuMatrixOptionCommon1;
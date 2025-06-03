import React, { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Tooltip } from 'antd';
import DwColOptionCommon1 from './components/DwColOptionCommon1';
import DwRowOptionCommon1 from './components/DwRowOptionCommon1';
import DwPopoverMoreOptions from '../../../dw-desing-qestion-common-comp/DwPopoverMoreOptions';
import { dwSurveyQuAddMatrixColOption } from '../../../../../../../dw-utils/dw-survey-update-question';
import { resetOtherClickItem } from '../../../../../../../dw-utils/dw-survey-update-item-click';
import './DwQuMatrixOptionCommon1.scss';

interface Survey {
  clientBrowser: {
    matrixWidth: number;
  };
  questions: Array<{
    quType: string;
    quCols: any[];
    quRows: any[];
    quFocusObj: {
      quFocus: boolean;
      quSetShow: boolean;
      quLogicShow: boolean;
      quMoreOptionShow: boolean;
      quMoreOptionShowEdit: boolean;
      quScorePopoverShow: boolean;
      quScaleTextPopoverShow: boolean;
      quMoreOptionColShow: boolean;
    };
  }>;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwQuMatrixOptionCommon1: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  const openDelay = 300;

  const handleAddQuItem = () => {
    const quOption: any = {
      id: null,
      optionTitleObj: {
        dwHtml: '选项内容',
        dwText: '选项内容',
        dwPlaceholder: '请输入内容',
        isRefreshValue: true
      },
      itemClick: true,
      tempEmptyOption: false
    };
    quOption.dwId = uuidV4();
    const newSurvey = dwSurveyQuAddMatrixColOption(survey, index, quOption);
    onChange?.(newSurvey);
    resetOtherClickItem(survey, -1);
  };

  const handleClickItem = () => {
    resetOtherClickItem(survey, index);
    const newSurvey = { ...survey };
    newSurvey.questions[index].quFocusObj = {
      quFocus: true,
      quSetShow: false,
      quLogicShow: false,
      quMoreOptionShow: false,
      quMoreOptionShowEdit: false,
      quScorePopoverShow: false,
      quScaleTextPopoverShow: false,
      quMoreOptionColShow: false
    };
    onChange?.(newSurvey);
  };

  return (
    <div style={{ padding: '10px 0' }}>
      <div className="dw-display-flex" style={{ alignItems: 'flex-start' }}>
        <div style={{ flexGrow: 1 }}>
          <div 
            style={{ 
              width: `${survey.clientBrowser.matrixWidth}px`,
              overflow: 'scroll'
            }} 
            className="dw-matrix-table-content"
          >
            <div style={{ padding: '5px 0', width: '100%' }}>
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
            </div>
            <div>
              <table style={{ 
                textAlign: 'center',
                borderSpacing: 0,
                minWidth: '100%',
                maxWidth: 'none'
              }}>
                <DwColOptionCommon1
                  value={survey.questions[index].quCols}
                  survey={survey}
                  index={index}
                  quType={survey.questions[index].quType}
                  onChange={(value) => {
                    const newSurvey = { ...survey };
                    newSurvey.questions[index].quCols = value;
                    onChange?.(newSurvey);
                  }}
                />
                <DwRowOptionCommon1
                  value={survey.questions[index].quRows}
                  survey={survey as any}
                  index={index}
                  quType={survey.questions[index].quType}
                  onChange={(value) => {
                    const newSurvey = { ...survey };
                    newSurvey.questions[index].quRows = value;
                    onChange?.(newSurvey);
                  }}
                />
              </table>
            </div>
          </div>
        </div>
        <div className="dw-text-align-center" style={{ width: '50px' }}>
          <Tooltip
            title="增加新列"
            placement="right"
          >
            <div 
              className="dw-question-toolbar dw-margin-bottom-10"
              onClick={handleAddQuItem}
            >
              <i className="dw-cursor-pointer dw-event-icon dw-event-color fa fa-plus" aria-hidden="true"></i>
            </div>
          </Tooltip>
          <DwPopoverMoreOptions
            value={survey}
            index={index}
            addOrEdit="addCol"
            onClickItem={handleClickItem}
            onChange={onChange as any}
          >
            <Tooltip
              title="批量增加"
              placement="right"
            >
              <div className="dw-question-toolbar dw-margin-bottom-10">
                <i className="dw-cursor-pointer dw-event-color fa fa-list-ul" aria-hidden="true"></i>
              </div>
            </Tooltip>
          </DwPopoverMoreOptions>
        </div>
      </div>
    </div>
  );
};

export default DwQuMatrixOptionCommon1; 
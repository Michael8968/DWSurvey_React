import React from 'react';
import { Select, InputNumber, Button, Empty } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { logicNum, curQuAfterQus, getQuOptions } from '../../../../../../../dw-utils/dw-survey-design';

const Option = Select.Option;

interface QuestionLogic {
  dwId: string;
  ckQuId?: string;
  cgQuItemId: string[] | string | null;
  skQuId: string[] | string | null;
  logicType: string;
  geLe?: string;
  scoreNum?: number;
  error?: boolean;
}

interface OptionObj {
  dwId: string;
  optionTitleObj: { dwText: string };
}

interface Question {
  dwId: string;
  quNum: number;
  quType: string;
  quTitleObj: { dwText: string };
  questionLogics: QuestionLogic[];
  quCheckboxs?: OptionObj[];
  quRadios?: OptionObj[];
  quOptions?: OptionObj[];
}

interface Survey {
  questions: Question[];
}

interface Props {
  value: Survey;
  index: number;
  logicType: string;
  onChange: (survey: Survey) => void;
}

const DwQuLogicShowGo: React.FC<Props> = ({ value, index, logicType, onChange }) => {
  const question = value.questions[index];
  const logicList = question.questionLogics.filter(item => item.logicType === logicType);
  const options = getQuOptions(question);
  const questions = curQuAfterQus(value.questions, index);

  const handleChange = (updateFn: (survey: Survey) => void) => {
    const newSurvey = { ...value };
    updateFn(newSurvey);
    onChange(newSurvey);
  };

  const addQuLogic = () => {
    handleChange(survey => {
      const questionLogic: QuestionLogic = {
        dwId: uuidV4(),
        ckQuId: '',
        cgQuItemId: null,
        skQuId: null,
        logicType,
        geLe: '',
        scoreNum: 0,
        error: false,
      };
      survey.questions[index].questionLogics.push(questionLogic);
    });
  };

  const deleteQuLogic = (itemOptionIndex: number) => {
    handleChange(survey => {
      survey.questions[index].questionLogics.splice(itemOptionIndex, 1);
    });
  };

  return (
    <div style={{ padding: '0 10px' }}>
      <div>
        {logicNum(question.questionLogics, logicType) > 0 ? (
          logicList.map((item, itemOptionIndex) => (
            <div key={`logic_${itemOptionIndex}`}>
              {item.error && (
                <div style={{ color: 'red', fontSize: 12 }}>请确认每个配置项都有合适的值</div>
              )}
              <div className="dw-design-logic-item">
                {(question.quType === 'FILLBLANK' || question.quType === 'UPLOADFILE') ? (
                  <span>如果本题被回答，</span>
                ) : (
                  <>
                    <span>如果本题选项</span>
                    <Select
                      value={item.cgQuItemId || []}
                      placeholder="请选择本题选项"
                      style={{ width: 130 }}
                      size="small"
                      mode="multiple"
                      onChange={(val: string[] | string) => handleChange(survey => {
                        survey.questions[index].questionLogics[itemOptionIndex].cgQuItemId = val;
                      })}
                    >
                      {options.map((option: OptionObj, optionIndex: number) => (
                        <Option key={`quOption_${optionIndex}`} value={option.dwId}>
                          {option.optionTitleObj.dwText}
                        </Option>
                      ))}
                    </Select>
                    {question.quType === 'ORDERQU' && (
                      <>
                        排名
                        <Select
                          value={item.geLe}
                          placeholder="请选择关系"
                          style={{ width: 70 }}
                          size="small"
                          onChange={(val: string) => handleChange(survey => {
                            survey.questions[index].questionLogics[itemOptionIndex].geLe = val;
                          })}
                        >
                          <Option value="LTE">小于等于</Option>
                          <Option value="GTE">大于等于</Option>
                          <Option value="LT">小于</Option>
                          <Option value="GT">大于</Option>
                        </Select>
                        <InputNumber
                          value={item.scoreNum}
                          controls={false}
                          size="small"
                          style={{ width: 60 }}
                          onChange={(val) => handleChange(survey => {
                            survey.questions[index].questionLogics[itemOptionIndex].scoreNum = val || 0;
                          })}
                        />
                        名，
                      </>
                    )}
                    {question.quType === 'SCORE' && (
                      <>
                        得分
                        <Select
                          value={item.geLe}
                          placeholder="请选择关系"
                          style={{ width: 70 }}
                          size="small"
                          onChange={(val: string) => handleChange(survey => {
                            survey.questions[index].questionLogics[itemOptionIndex].geLe = val;
                          })}
                        >
                          <Option value="LTE">小于等于</Option>
                          <Option value="GTE">大于等于</Option>
                          <Option value="LT">小于</Option>
                          <Option value="GT">大于</Option>
                        </Select>
                        <InputNumber
                          value={item.scoreNum}
                          controls={false}
                          size="small"
                          style={{ width: 60 }}
                          onChange={(val) => handleChange(survey => {
                            survey.questions[index].questionLogics[itemOptionIndex].scoreNum = val || 0;
                          })}
                        />
                        分，
                      </>
                    )}
                    {question.quType === 'MULTIFILLBLANK' && <span>被回答，</span>}
                    {!(question.quType === 'ORDERQU' || question.quType === 'SCORE' || question.quType === 'MULTIFILLBLANK') && <span>被选项，</span>}
                  </>
                )}
                {item.logicType === 'GO' && <span>则跳转</span>}
                {item.logicType === 'SHOW' && <span>则显示</span>}
                <Select
                  value={item.skQuId || (logicType === 'SHOW' ? [] : '')}
                  mode={logicType === 'SHOW' ? 'multiple' : 'tags'}
                  placeholder="请选择题目"
                  style={{ width: 130 }}
                  size="small"
                  onChange={(val: string[] | string) => handleChange(survey => {
                    survey.questions[index].questionLogics[itemOptionIndex].skQuId = val;
                  })}
                >
                  {questions.map((q: Question, questionIndex: number) => (
                    <Option key={`question_${questionIndex}`} value={q.dwId}>
                      {`Q${q.quNum}、${q.quTitleObj.dwText}`}
                    </Option>
                  ))}
                </Select>
                <Button
                  icon="el-icon-delete"
                  size="small"
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteQuLogic(itemOptionIndex)}
                />
              </div>
            </div>
          ))
        ) : (
          <Empty description="暂无相关逻辑数据">
            <Button type="primary" size="small" icon="el-icon-plus" onClick={addQuLogic}>
              新增逻辑
            </Button>
          </Empty>
        )}
        <div style={{ marginTop: 10 }}>
          <Button type="primary" size="small" icon="el-icon-plus" onClick={addQuLogic}>
            新增逻辑
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DwQuLogicShowGo; 
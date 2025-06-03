import React, { useEffect, useRef, useState } from 'react';
import { Table, Progress, Tabs } from 'antd';
import type { TabsProps, TableColumnType } from 'antd';
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { UniversalTransition, LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { echartsThemeConfig } from '../../../../utils/dw-theme/echarts-theme';

echarts.use([
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  LabelLayout
]);

interface QuTitleObj {
  dwText: string;
}

interface OptionTitleObj {
  dwText: string;
}

interface QuStatOption {
  optionName: string;
  percent: string;
  anCount: number;
  avgOrder?: number;
}

interface RowCol {
  dwText: string;
  percent: string;
  anCount: number;
}

interface QuRow {
  dwId: string;
  optionTitleObj: OptionTitleObj;
  rowCols: RowCol[];
}

interface Question {
  id: string;
  quType: string;
  quTypeName: string;
  quTitleObj: QuTitleObj;
  quStatOptions: QuStatOption[];
  quRows?: QuRow[];
  anCount?: number;
}

interface DwSurveyChartsCommonProps {
  question: Question;
  index: number;
}

const DwSurveyChartsCommon: React.FC<DwSurveyChartsCommonProps> = ({ question, index }) => {
  const [activeName, setActiveName] = useState('bar');
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      echarts.registerTheme('dw-echarts-theme', echartsThemeConfig);
      loadChart(chartRef.current, 'bar');
    }
  }, [question]);

  const handleClick: TabsProps['onChange'] = (key: string) => {
    setActiveName(key);
    if (chartRef.current) {
      loadChart(chartRef.current, key);
    }
  };

  const loadChart = (chartDom: HTMLElement, type: string) => {
    const myChart = echarts.init(chartDom, 'dw-echarts-theme');
    const option = buildOption(question, type);
    option && myChart.setOption(option);
  };

  const buildOption = (questionData: Question, type: string) => {
    const items: string[] = [];
    const itemValues: number[] = [];
    const itemNameValues: Array<{ value: number; name: string }> = [];
    const quStatOptions = questionData.quStatOptions;

    for (let i = 0; i < quStatOptions.length; i++) {
      items.push(quStatOptions[i].optionName);
      itemValues.push(quStatOptions[i].anCount);
      itemNameValues.push({
        value: quStatOptions[i].anCount,
        name: quStatOptions[i].optionName
      });
    }

    let yAxisShow = true;
    if (questionData.quType === 'ORDERQU') {
      yAxisShow = false;
    }

    let option;
    if (type === 'line' || type === 'bar') {
      option = {
        xAxis: {
          nameTextStyle: {},
          nameGap: 20,
          axisLabel: {
            rotate: -10,
            interval: 0
          },
          type: 'category',
          data: items
        },
        yAxis: {
          type: 'value',
          show: yAxisShow
        },
        series: [
          {
            type: type,
            data: itemValues
          }
        ]
      };
    } else if (type === 'pie') {
      option = {
        series: [
          {
            type: 'pie',
            data: itemNameValues
          }
        ]
      };
    }

    return option;
  };

  const getColumnLabel = () => {
    switch (question.quType) {
      case 'SCORE':
      case 'MATRIX_SCALE':
      case 'MATRIX_SLIDER':
        return '占总分比例';
      case 'ORDERQU':
        return '排名占总名次比';
      case 'MULTIFILLBLANK':
        return '填写比例';
      default:
        return '频次比例';
    }
  };

  const renderTable = () => {
    const columns: TableColumnType<QuStatOption>[] = [
      {
        title: '题目选项',
        dataIndex: 'optionName',
        key: 'optionName'
      },
      {
        title: getColumnLabel(),
        key: 'percent',
        width: 330,
        render: (text: string, record: QuStatOption) => (
          <Progress
            percent={parseFloat(record.percent)}
            strokeWidth={26}
            showInfo={true}
            strokeColor="white"
          />
        )
      }
    ];

    if (['RADIO', 'CHECKBOX', 'MATRIX_RADIO', 'MATRIX_CHECKBOX'].includes(question.quType)) {
      columns.push({
        title: '频次',
        key: 'anCount',
        width: 130,
        render: (text: string, record: QuStatOption) => <span>{record.anCount} 次</span>
      });
    } else if (['SCORE', 'MATRIX_SCALE', 'MATRIX_SLIDER'].includes(question.quType)) {
      columns.push({
        title: '平均分',
        key: 'anCount',
        width: 130,
        render: (text: string, record: QuStatOption) => <span>{record.anCount} 分</span>
      });
    } else if (question.quType === 'ORDERQU') {
      columns.push({
        title: '名次平均值',
        key: 'avgOrder',
        width: 130,
        render: (text: string, record: QuStatOption) => <span>{record.avgOrder} 名</span>
      });
    } else if (question.quType === 'MULTIFILLBLANK') {
      columns.push({
        title: '填写次数',
        key: 'anCount',
        width: 130,
        render: (text: string, record: QuStatOption) => <span>{record.anCount} 次</span>
      });
    }

    return <Table dataSource={question.quStatOptions} columns={columns} pagination={false} />;
  };

  const renderMatrixTable = () => {
    return question.quRows?.map((quRow) => (
      <div key={`matrix_chart_${quRow.dwId}`}>
        <div style={{ padding: '5px 0' }}>
          <div>
            <div style={{ fontWeight: 'bold', padding: '5px', background: '#eee' }}>
              {quRow.optionTitleObj.dwText}
            </div>
          </div>
          <div style={{ padding: '0 5px' }}>
            <Table
              dataSource={quRow.rowCols}
              columns={[
                {
                  title: '题目选项',
                  dataIndex: 'dwText',
                  key: 'dwText'
                },
                {
                  title: '频次比例',
                  key: 'percent',
                  width: 330,
                  render: (text: string, record: RowCol) => (
                    <Progress
                      percent={parseFloat(record.percent)}
                      strokeWidth={26}
                      showInfo={true}
                      strokeColor="white"
                    />
                  )
                },
                {
                  title: '频次',
                  key: 'anCount',
                  width: 130,
                  render: (text: string, record: RowCol) => <span>{record.anCount} 次</span>
                }
              ]}
              pagination={false}
            />
          </div>
        </div>
      </div>
    ));
  };

  const items: TabsProps['items'] = [
    {
      key: 'bar',
      label: '柱状图',
      children: <div ref={chartRef} className="dwsurveyMain" style={{ width: '100%', height: '400px' }} />
    },
    {
      key: 'line',
      label: '拆线图',
      children: <div className="dwsurveyMain" style={{ width: '100%', height: '400px' }} />
    },
    {
      key: 'pie',
      label: '拼状图',
      children: <div className="dwsurveyMain" style={{ width: '100%', height: '400px' }} />
    },
    {
      key: 'barY',
      label: '条形图',
      children: <div className="dwsurveyMain" style={{ width: '100%', height: '400px' }} />
    }
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
        <span>{index + 1}、</span>
        <span dangerouslySetInnerHTML={{ __html: question.quTitleObj.dwText }} />
        <span>【{question.quTypeName}】</span>
      </div>
      {['RADIO', 'CHECKBOX', 'SCORE', 'ORDERQU', 'MULTIFILLBLANK', 'MATRIX_SCALE', 'MATRIX_SLIDER'].includes(
        question.quType
      ) && (
        <>
          {renderTable()}
          <div>
            <Tabs activeKey={activeName} items={items} onChange={handleClick} />
          </div>
        </>
      )}
      {['MATRIX_RADIO', 'MATRIX_CHECKBOX'].includes(question.quType) && (
        <>
          {renderMatrixTable()}
          <div>
            <Tabs activeKey={activeName} items={items} onChange={handleClick} />
          </div>
        </>
      )}
      {!['RADIO', 'CHECKBOX', 'SCORE', 'ORDERQU', 'MULTIFILLBLANK', 'MATRIX_SCALE', 'MATRIX_SLIDER', 'MATRIX_RADIO', 'MATRIX_CHECKBOX'].includes(
        question.quType
      ) && (
        <div style={{ padding: '30px' }}>填写回答：{question.anCount} 份</div>
      )}
    </div>
  );
};

export default DwSurveyChartsCommon; 
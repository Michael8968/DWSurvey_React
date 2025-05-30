import React, { useEffect, useRef, useState } from 'react';
import { Table, Progress, Tabs } from 'antd';
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { UniversalTransition, LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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

interface QuestionOption {
  optionName: string;
  anCount: number | string;
  percent: string;
  orderNum?: number;
}

interface Question {
  id: string;
  quType: string;
  quTypeName: string;
  quTitle: string;
  anCount: number;
  quStatOptions: QuestionOption[];
}

interface Props {
  question: Question;
  index: number;
}

const DwsurveyChartsCommon: React.FC<Props> = ({ question, index }) => {
  const [activeName, setActiveName] = useState('bar');
  const chartRefs = useRef<{ [key: string]: echarts.ECharts | null }>({});

  useEffect(() => {
    const chartDom = document.getElementById(`chart-${question.id}-${activeName}`);
    if (chartDom) {
      loadChart(chartDom, activeName);
    }
  }, [activeName, question]);

  const handleClick = (key: string) => {
    setActiveName(key);
  };

  const loadChart = (chartDom: HTMLElement, type: string) => {
    if (chartRefs.current[type]) {
      chartRefs.current[type]?.dispose();
    }
    const myChart = echarts.init(chartDom);
    chartRefs.current[type] = myChart;
    const option = buildOption(question, type);
    option && myChart.setOption(option);
  };

  const buildOption = (questionData: Question, type: string) => {
    const items: string[] = [];
    const itemValues: (number | string)[] = [];
    const itemNameValues: { value: number | string; name: string }[] = [];

    questionData.quStatOptions.forEach((option) => {
      items.push(option.optionName);
      itemValues.push(option.anCount);
      itemNameValues.push({
        value: option.anCount,
        name: option.optionName
      });
    });

    const yAxisShow = questionData.quType !== 'ORDERQU';

    switch (type) {
      case 'line':
      case 'bar':
        return {
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
              data: itemValues,
              type: type
            }
          ]
        };

      case 'barY':
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            show: yAxisShow
          },
          yAxis: {
            type: 'category',
            data: items
          },
          series: [
            {
              type: 'bar',
              data: itemValues
            }
          ]
        };

      case 'pie':
        return {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: itemNameValues,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

      default:
        return null;
    }
  };

  const columns = [
    {
      title: '题目选项',
      dataIndex: 'optionName',
      key: 'optionName',
      render: (text: string) => <div dangerouslySetInnerHTML={{ __html: text }} />
    },
    {
      title: question.quType === 'SCORE'
        ? '占总分比例'
        : question.quType === 'ORDERQU'
        ? '排名比例'
        : question.quType === 'MULTIFILLBLANK'
        ? '填写比例'
        : '频次比例',
      key: 'percent',
      width: 330,
      render: (_: any, record: QuestionOption) => (
        <Progress
          percent={parseFloat(record.percent)}
          strokeWidth={26}
          showInfo={true}
        />
      )
    },
    ...(question.quType === 'RADIO' || question.quType === 'CHECKBOX'
      ? [
          {
            title: '频次',
            dataIndex: 'anCount',
            key: 'anCount',
            width: 130,
            align: 'center' as const,
            render: (text: number) => `${text} 次`
          }
        ]
      : []),
    ...(question.quType === 'SCORE'
      ? [
          {
            title: '平均分',
            dataIndex: 'anCount',
            key: 'anCount',
            width: 130,
            align: 'center' as const,
            render: (text: string) => `平均 ${text} 分`
          }
        ]
      : []),
    ...(question.quType === 'ORDERQU'
      ? [
          {
            title: '排名',
            dataIndex: 'orderNum',
            key: 'orderNum',
            width: 130,
            align: 'center' as const,
            render: (text: number) => `第 ${text} 名`
          }
        ]
      : []),
    ...(question.quType === 'MULTIFILLBLANK'
      ? [
          {
            title: '填写次数',
            dataIndex: 'anCount',
            key: 'anCount',
            width: 130,
            align: 'center' as const,
            render: (text: number) => `${text} 次`
          }
        ]
      : [])
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
        <span>{index + 1}、</span>
        <span dangerouslySetInnerHTML={{ __html: question.quTitle }} />
        <span>【{question.quTypeName}】</span>
      </div>
      {(question.quType === 'FILLBLANK' || question.quType === 'UPLOADFILE') && (
        <div style={{ padding: '30px' }}>填写回答：{question.anCount} 份</div>
      )}
      {question.quType !== 'FILLBLANK' && question.quType !== 'UPLOADFILE' && (
        <>
          <Table
            columns={columns}
            dataSource={question.quStatOptions}
            rowKey="optionName"
            pagination={false}
          />
          <div>
            <Tabs activeKey={activeName} onChange={handleClick}>
              <Tabs.TabPane tab="柱状图" key="bar">
                <div
                  id={`chart-${question.id}-bar`}
                  style={{ width: '100%', height: '400px' }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="拆线图" key="line">
                <div
                  id={`chart-${question.id}-line`}
                  style={{ width: '100%', height: '400px' }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="拼状图" key="pie">
                <div
                  id={`chart-${question.id}-pie`}
                  style={{ width: '100%', height: '400px' }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="条形图" key="barY">
                <div
                  id={`chart-${question.id}-barY`}
                  style={{ width: '100%', height: '400px' }}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default DwsurveyChartsCommon; 
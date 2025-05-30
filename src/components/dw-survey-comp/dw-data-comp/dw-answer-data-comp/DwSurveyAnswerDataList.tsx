import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Table, Button, Form, Input, DatePicker, 
  Modal, Select, Progress, message, Space, 
  Row, Col, Tooltip, Popconfirm 
} from 'antd';
import { 
  EyeOutlined, DeleteOutlined, 
  ExportOutlined, ReloadOutlined 
} from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { TableColumnsType } from 'antd/es/table';
import { dwSurveyAnswerDeleteByEs } from '@/api/dw-survey';
import {
  dwSurveyAnswerExportLogInfo,
  dwSurveyAnswerExportSync,
  dwSurveyAnswerListV6
} from '../api/dw-survey-answer-data';
import { secondsToHms } from '../../dw-utils/dw-common/dw-common-1';
import dwAuthorized from '@/utils/dw-authorized';
import DwSurveyAnswerInfoDialog from './components/DwSurveyAnswerInfoDialog';

interface Survey {
  surveyType?: string;
  surveyAttrs?: {
    scoreAttr: {
      enabled: boolean;
    };
  };
}

interface AnswerCommon {
  answerId: string;
  anIp: {
    ip: string;
    city: string | null;
  };
  anTime: {
    endAnDate: string;
    totalTime: number | null;
  };
  anState: {
    anQuNum: number | null;
  };
  sumScore: number | null;
}

interface TableItem {
  answerCommon: AnswerCommon;
  esId: string;
}

interface FormData {
  ip: string | null;
  city: string | null;
  anTime: [string, string] | null;
  handleState: number;
}

interface PageData {
  pageSize: number;
  pageNo: number;
  totalItems: number;
  result: TableItem[];
}

const { RangePicker } = DatePicker;

interface Props {
  survey: Survey | null;
}

const DwSurveyAnswerDataList: React.FC<Props> = ({ survey }) => {
  const { dwSurveyId } = useParams<{ dwSurveyId: string }>();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [expUpQu, setExpUpQu] = useState(0);
  const [form] = Form.useForm();
  const [handleState, setHandleState] = useState(100);
  const [threadMax, setThreadMax] = useState(2000);
  const [expDataContent, setExpDataContent] = useState(1);
  const [isProgress, setIsProgress] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [exportLogId, setExportLogId] = useState<string | null>(null);
  const exportLogInfoInterval = useRef<NodeJS.Timeout | null>(null);
  const dwAnswerInfoDialogRef = useRef<any>(null);

  useEffect(() => {
    queryList(1);
    return () => {
      if (exportLogInfoInterval.current) {
        clearInterval(exportLogInfoInterval.current);
      }
    };
  }, []);

  const queryList = async (pageNo: number) => {
    setCurrentPage(pageNo);
    const maxTotal = 10000;
    if ((pageNo - 1) * pageSize >= maxTotal) {
      message.warning('提示：一次查询只展示前1万条数据，如果要查看更多可以修改查询条件，请缩小查询范围！', 10);
      setCurrentPage(Math.floor(maxTotal / pageSize) - 1);
      return;
    }

    const formValues = await form.validateFields();
    const anTime = { bgAnDate: null, endAnDate: null };
    if (formValues.anTime) {
      anTime.bgAnDate = formValues.anTime[0].format('YYYY-MM-DD HH:mm:ss');
      anTime.endAnDate = formValues.anTime[1].format('YYYY-MM-DD HH:mm:ss');
    }

    const params = {
      surveyId: dwSurveyId,
      pageNo: currentPage,
      bgAnDate: anTime.bgAnDate,
      endAnDate: anTime.endAnDate,
      ip: formValues.ip,
      city: formValues.city
    };

    try {
      const response = await dwSurveyAnswerListV6(params);
      const page: PageData = response.data;
      setPageSize(page.pageSize);
      setCurrentPage(page.pageNo);
      setTotal(page.totalItems);
      setTableData(page.result);
    } catch (error) {
      message.error('获取数据失败');
    }
  };

  const handleDelete = async (record: TableItem) => {
    try {
      const data = {
        id: [record.answerCommon.answerId],
        esId: [record.esId]
      };
      const response = await dwSurveyAnswerDeleteByEs(data);
      if (response.data.resultCode === 200) {
        message.success('删除成功，即将刷新数据。');
        setTimeout(() => queryList(1), 2000);
      } else {
        message.error('删除答卷失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const resetSearch = () => {
    form.resetFields();
    queryList(1);
  };

  const answerView = (record: TableItem) => {
    dwAnswerInfoDialogRef.current?.openDialog(record);
  };

  const handleExport = () => {
    setDialogFormVisible(true);
    setPercentage(0);
    setExportLogId(null);
    setIsProgress(false);
  };

  const executeExportData = async () => {
    setIsProgress(true);
    const params = {
      surveyId: dwSurveyId,
      expUpQu,
      handleState,
      threadMax,
      expDataContent
    };

    try {
      const response = await dwSurveyAnswerExportSync(params);
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        const resultData = httpResult.data;
        setExportLogId(resultData.id);
        setPercentage(0);
        exportProgress();
      } else {
        message.error(`导出出错${httpResult.resultMsg}`);
      }
    } catch (error) {
      message.error('导出失败');
    }
  };

  const exportProgress = () => {
    if (exportLogId !== null) {
      exportLogInfoInterval.current = setInterval(upExportProgress, 500);
    }
  };

  const upExportProgress = async () => {
    const params = { id: exportLogId };
    try {
      const response = await dwSurveyAnswerExportLogInfo(params);
      const httpResult = response.data;
      let isClear = true;

      if (httpResult.resultCode === 200) {
        const resultData = httpResult.data;
        if (resultData !== null) {
          const progress = parseFloat(resultData.progress);
          const percentage = Math.min(Math.max(parseInt((progress * 100).toFixed(2)), 1), 100);
          setPercentage(percentage);
          isClear = progress >= 100;
        }
      }

      if (isClear && exportLogInfoInterval.current) {
        clearInterval(exportLogInfoInterval.current);
      }
    } catch (error) {
      message.error('获取导出进度失败');
    }
  };

  const downloadExportData = () => {
    const surveyAnswerExportDownload = '/api/dwsurvey/app/v6/answer/export-log/download-answer-xls.do';
    const downUrl = `${process.env.REACT_APP_API_URL}${surveyAnswerExportDownload}?surveyId=${dwSurveyId}&exportLogId=${exportLogId}`;
    window.location.href = downUrl + '&Authorization=' + dwAuthorized.getToken();
  };

  const cancelExportData = () => {
    if (exportLogId !== null && exportLogInfoInterval.current) {
      clearInterval(exportLogInfoInterval.current);
      setPercentage(0);
      setExportLogId(null);
      setIsProgress(false);
    }
    setDialogFormVisible(false);
  };

  const columns: TableColumnsType<TableItem> = [
    {
      title: '序号',
      width: 65,
      render: (_, __, index) => pageSize * (currentPage - 1) + index + 1
    },
    {
      title: '答卷IP',
      dataIndex: ['answerCommon', 'anIp', 'ip']
    },
    {
      title: '答卷地区',
      dataIndex: ['answerCommon', 'anIp', 'city'],
      render: (city) => city || '-'
    },
    {
      title: '回答时间',
      dataIndex: ['answerCommon', 'anTime', 'endAnDate']
    },
    {
      title: '回答用时',
      render: (record) => {
        const totalTime = record.answerCommon.anTime.totalTime;
        return totalTime != null ? secondsToHms(Math.floor(totalTime / 1000)) : 0;
      }
    },
    {
      title: '回答题数',
      render: (record) => {
        const anQuNum = record.answerCommon.anState.anQuNum;
        return `${anQuNum != null ? anQuNum : 0} 题`;
      }
    },
    ...(survey && ((survey.surveyType === 'exam') || (survey.surveyAttrs?.scoreAttr.enabled)) ? [{
      title: '分数',
      render: (record) => {
        const sumScore = record.answerCommon.sumScore;
        return `${sumScore != null ? sumScore : 0} 分`;
      }
    }] : []),
    {
      title: '操作',
      width: 160,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看数据">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => answerView(record)}
            />
          </Tooltip>
          <Popconfirm
            title="确认删除此条答卷吗？"
            onConfirm={() => handleDelete(record)}
            okText="确认删除"
            cancelText="取消"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  if (!survey) return null;

  return (
    <div>
      <div className="dw-dcs-main-title">
        <div style={{ padding: '5px 10px' }}>
          <Row justify="space-between" align="middle">
            <Col span={18}>
              <div style={{ fontSize: 14 }}>
                <strong>原始数据列表</strong>
              </div>
            </Col>
            <Col span={6} style={{ textAlign: 'right', paddingRight: 16 }}>
              <Button type="primary" size="small" onClick={handleExport}>
                导出数据
              </Button>
            </Col>
          </Row>
        </div>
        <div style={{ padding: '5px 10px' }}>
          <Form
            form={form}
            layout="inline"
            size="middle"
            onFinish={() => queryList(1)}
          >
            <Form.Item label="时间" name="anTime">
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={['开始日期', '结束日期']}
              />
            </Form.Item>
            <Form.Item label="IP" name="ip">
              <Input placeholder="请输入查询的问卷标题" allowClear />
            </Form.Item>
            <Form.Item label="城市" name="city">
              <Input placeholder="请输入查询的问卷标题" allowClear />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={resetSearch}>重置</Button>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(record) => record.esId}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: (page) => queryList(page),
          showTotal: (total) => `共 ${total} 条`
        }}
      />

      <div style={{ paddingTop: 20, textAlign: 'right' }}>
        {total > 10000 && (
          <span style={{ fontSize: 10, color: 'grey' }}>
            仅显示前1万条数据，更多可以通过改变查询条件或导出
          </span>
        )}
      </div>

      <Modal
        title="导出答卷数据"
        open={dialogFormVisible}
        onCancel={cancelExportData}
        footer={[
          <Button key="cancel" onClick={cancelExportData}>
            取消
          </Button>,
          <Button
            key="export"
            type="primary"
            disabled={isProgress}
            onClick={executeExportData}
          >
            开始导出
          </Button>,
          <Button
            key="download"
            type="primary"
            disabled={percentage < 100}
            onClick={downloadExportData}
          >
            下载数据
          </Button>
        ]}
      >
        <div style={{ lineHeight: '30px' }}>是否同时下载上传题的文件</div>
        <div style={{ color: 'grey', lineHeight: '30px', fontSize: 12 }}>
          <span>
            如果有上传题，选择压缩下载可能比较占用系统资源及时间，请在空闲时间压缩下载
          </span>
        </div>
        <div style={{ padding: 10 }}>
          <Select
            value={expUpQu}
            onChange={setExpUpQu}
            style={{ width: '100%' }}
          >
            <Select.Option value={0}>仅下载数据Excel</Select.Option>
            <Select.Option value={1}>同时压缩上传的文件并下载</Select.Option>
          </Select>
        </div>
        <div style={{ padding: 10 }}>
          数据类型
          <Select
            value={handleState}
            onChange={setHandleState}
            style={{ width: 300, marginLeft: 10 }}
          >
            <Select.Option value={0}>未审核</Select.Option>
            <Select.Option value={1}>审核的数据</Select.Option>
            <Select.Option value={300}>甄别的数据</Select.Option>
            <Select.Option value={100}>全部有效数据（包含未审核与审核）</Select.Option>
          </Select>
        </div>
        <div style={{ padding: 10 }}>
          单个线程最多导出
          <Select
            value={threadMax}
            onChange={setThreadMax}
            style={{ width: 300, marginLeft: 10 }}
          >
            <Select.Option value={500}>500条</Select.Option>
            <Select.Option value={1000}>1000条</Select.Option>
            <Select.Option value={2000}>2000条</Select.Option>
            <Select.Option value={4000}>4000条</Select.Option>
          </Select>
        </div>
        <div style={{ padding: 10 }}>
          导出的数据
          <Select
            value={expDataContent}
            onChange={setExpDataContent}
            style={{ width: 300, marginLeft: 10 }}
          >
            <Select.Option value={1}>原始答卷数据</Select.Option>
            <Select.Option value={2}>答卷选项分值</Select.Option>
          </Select>
        </div>
        <div style={{ padding: 10 }}>
          <Progress
            percent={percentage}
            strokeColor={{
              '0%': '#cde2f6',
              '10%': '#c1dbf5',
              '20%': '#a7cdf3',
              '40%': '#8bbff3',
              '60%': '#6eb2f6',
              '80%': '#4ca2fa',
              '100%': '#1989fa'
            }}
            status="active"
          />
        </div>
      </Modal>

      <DwSurveyAnswerInfoDialog
        ref={dwAnswerInfoDialogRef}
        onRefreshData={() => queryList(1)}
      />
    </div>
  );
};

export default DwSurveyAnswerDataList; 
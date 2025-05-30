import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Button, Table, Tag, Modal, message, Popover, Tooltip } from 'antd';
import { EditOutlined, ShareAltOutlined, BarChartOutlined, EyeOutlined, CopyOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dwSurveyCreate, dwSurveyList, dwSurveyCopy, dwSurveyDelete } from '@/api/survey';

interface SurveyForm {
  surveyName: string | null;
  surveyState: string | null;
}

interface SurveyData {
  id: string;
  surveyName: string;
  surveyNameText: string | null;
  answerNum: number;
  surveyState: number;
  createDate: string;
}

const DwSurveyList: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<SurveyData[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dialogTitle, setDialogTitle] = useState('创建问卷');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    id: null as string | null
  });

  useEffect(() => {
    queryList(1);
  }, []);

  const buttonClickA = (href: string) => {
    window.location.href = href;
  };

  const handlePush = (to: string) => {
    navigate(to);
  };

  const handleCopy = (index: number, row: SurveyData) => {
    setFormData({
      id: row.id,
      name: row.surveyNameText ? `${row.surveyNameText}` : '复制问卷标题'
    });
    setDialogTitle('复制问卷');
    setDialogVisible(true);
  };

  const handleDelete = (index: number, row: SurveyData) => {
    Modal.confirm({
      title: '删除警告',
      content: '确认删除此问卷吗？',
      okText: '确认删除',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await dwSurveyDelete({ id: [row.id] });
          const httpResult = response.data;
          if (httpResult.resultCode === 200) {
            message.success('删除成功，即将刷新数据。');
            queryList(1);
          } else {
            message.error('删除问卷失败');
          }
        } catch (error) {
          console.error('Failed to delete survey:', error);
          message.error('删除问卷失败');
        }
      }
    });
  };

  const onSubmit = () => {
    queryList(1);
  };

  const handleCurrentChange = (page: number) => {
    queryList(page);
  };

  const queryList = async (pageNo: number) => {
    const values = await form.validateFields();
    try {
      const response = await dwSurveyList(pageSize, pageNo, values.surveyName, values.surveyState);
      const resultData = response.data;
      setTableData(resultData.data);
      setTotal(resultData.total);
      setCurrentPage(resultData.current);
      setPageSize(resultData.pageSize);
    } catch (error) {
      console.error('Failed to fetch survey list:', error);
      message.error('获取问卷列表失败');
    }
  };

  const handleDialogConfirm = async () => {
    if (formData.id === null) {
      await createSurvey();
    } else {
      await copySurvey(formData.id);
    }
  };

  const createSurvey = async () => {
    try {
      const response = await dwSurveyCreate({ surveyName: formData.name });
      const httpResult = response.data;
      const resultData = httpResult.data;
      
      if (httpResult.resultCode === 200) {
        setDialogVisible(false);
        Modal.confirm({
          title: '系统提示',
          content: '问卷创建成功，点击"继续编辑问卷"进入问卷编辑。',
          okText: '继续编辑问卷',
          onOk: () => {
            window.location.href = `/static/diaowen/design.html?surveyId=${resultData.id}`;
          },
          onCancel: () => {
            queryList(1);
          }
        });
      } else {
        message.error('创建问卷失败');
      }
    } catch (error) {
      console.error('Failed to create survey:', error);
      message.error('创建问卷失败');
    }
  };

  const copySurvey = async (surveyId: string) => {
    try {
      const response = await dwSurveyCopy(surveyId, formData.name);
      const httpResult = response.data;
      const resultData = httpResult.data;
      
      if (httpResult.resultCode === 200) {
        setDialogVisible(false);
        Modal.confirm({
          title: '系统提示',
          content: '问卷复制成功，点击"继续编辑问卷"进入问卷编辑。',
          okText: '继续编辑问卷',
          onOk: () => {
            window.location.href = `/static/diaowen/design.html?surveyId=${resultData.id}`;
          },
          onCancel: () => {
            queryList(1);
          }
        });
      } else {
        message.error('问卷复制失败');
      }
    } catch (error) {
      console.error('Failed to copy survey:', error);
      message.error('问卷复制失败');
    }
  };

  const columns = [
    {
      title: '问卷',
      dataIndex: 'surveyName',
      key: 'surveyName',
      render: (text: string, record: SurveyData) => (
        <Popover content={<div dangerouslySetInnerHTML={{ __html: record.surveyName }} />}>
          <div className="name-wrapper">
            {record.surveyNameText ? record.surveyNameText : <div dangerouslySetInnerHTML={{ __html: record.surveyName }} />}
          </div>
        </Popover>
      )
    },
    {
      title: '答卷数',
      dataIndex: 'answerNum',
      key: 'answerNum',
      width: 80,
      render: (text: number) => <span style={{ marginLeft: '10px' }}>{text || 0} 份</span>
    },
    {
      title: '状态',
      dataIndex: 'surveyState',
      key: 'surveyState',
      width: 80,
      render: (state: number) => {
        switch (state) {
          case 0:
            return <Tag>设计中</Tag>;
          case 1:
            return <Tag color="success">收集中</Tag>;
          case 2:
            return <Tag color="default">收集结束</Tag>;
          default:
            return <Tag>未知</Tag>;
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 180,
      render: (text: string) => (
        <span>
          <ClockCircleOutlined style={{ marginRight: '10px' }} />
          {text}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (_: any, record: SurveyData) => (
        <Button.Group>
          <Tooltip title="编辑问卷">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => buttonClickA(`/static/diaowen/design.html?surveyId=${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="答卷地址">
            <Button
              size="small"
              icon={<ShareAltOutlined />}
              onClick={() => handlePush(`/dw/survey/c/url/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="答卷数据">
            <Button
              size="small"
              icon={<BarChartOutlined />}
              onClick={() => handlePush(`/dw/survey/d/chart/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="预览问卷">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => buttonClickA(`/static/diaowen/preview.html?surveyId=${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="复制问卷">
            <Button
              size="small"
              icon={<CopyOutlined />}
              onClick={() => handleCopy(0, record)}
            />
          </Tooltip>
          <Tooltip title="删除问卷">
            <Button
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(0, record)}
            />
          </Tooltip>
        </Button.Group>
      )
    }
  ];

  return (
    <div>
      <Row>
        <Col span={20} offset={2}>
          <div className="dw-table-form" style={{ paddingLeft: '60px' }}>
            <Form
              form={form}
              layout="inline"
              size="middle"
              onFinish={onSubmit}
            >
              <Form.Item label="问卷标题" name="surveyName">
                <Input placeholder="请输入查询的问卷标题" allowClear />
              </Form.Item>
              <Form.Item label="问卷状态" name="surveyState" style={{ marginLeft: '40px' }}>
                <Select placeholder="请选择问卷状态" allowClear style={{ width: 200 }}>
                  <Select.Option value="0">设计中</Select.Option>
                  <Select.Option value="1">收集中</Select.Option>
                  <Select.Option value="2">收集结束</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ marginLeft: '40px' }}>
                <Button onClick={() => form.resetFields()}>重置</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
                  查询
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="dw-table">
            <div className="dw-table-title">
              <Row justify="space-between" align="middle">
                <Col span={4}><h3>我的问卷</h3></Col>
                <Col span={20} style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={() => {
                      setFormData({ name: '', id: null });
                      setDialogTitle('创建问卷');
                      setDialogVisible(true);
                    }}
                  >
                    新建问卷
                  </Button>
                </Col>
              </Row>
            </div>
            <Table
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              pagination={{
                pageSize,
                current: currentPage,
                total,
                onChange: handleCurrentChange,
                showSizeChanger: false
              }}
            />
          </div>
        </Col>
      </Row>

      <Modal
        title={dialogTitle}
        open={dialogVisible}
        onOk={handleDialogConfirm}
        onCancel={() => setDialogVisible(false)}
        width="40%"
      >
        <Form layout="vertical">
          <Form.Item
            label="问卷标题"
            name="name"
            initialValue={formData.name}
            rules={[{ required: true, message: '请输入问卷标题' }]}
          >
            <Input placeholder="请输入问卷标题" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DwSurveyList; 
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Form, 
  Input, 
  Select, 
  Button, 
  Table, 
  Tag, 
  Tooltip, 
  Modal, 
  message,
  Pagination 
} from 'antd';
import { 
  SettingOutlined, 
  EditOutlined, 
  ShareAltOutlined, 
  BarChartOutlined, 
  EyeOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { dwSurveyCreate, dwSurveyList, dwSurveyCopy, dwSurveyDelete } from '@/api/dw-survey';
import DwSurveyDialog from './dw-data-comp/dw-answer-data-comp/components/DwSurveyDialog';
import { DwAuthorized } from '../../utils/dw-authorized';

interface FormInline {
  surveyName: string | null;
  surveyState: string | null;
}

interface SurveyForm {
  name: string;
  id: string | null;
  surveyType: string;
}

interface TableItem {
  id: string;
  surveyName: string;
  answerNum: number;
  surveyState: number;
  createDate: string;
  surveyNameText?: string;
}

const DwSurveyList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dwSurveyDialogRef = useRef<any>(null);

  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dialogTitle, setDialogTitle] = useState('创建问卷');
  const [formInline, setFormInline] = useState<FormInline>({
    surveyName: null,
    surveyState: null
  });
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [form, setForm] = useState<SurveyForm>({
    name: '',
    id: null,
    surveyType: 'survey'
  });
  const [prevPath, setPrevPath] = useState('/v6/dw');

  useEffect(() => {
    queryList(1);
    const routePath = location.pathname;
    if (routePath.indexOf('/v6/lr') >= 0) {
      setPrevPath('/v6/lr/dw');
    }
    const loginCount = DwAuthorized.getLoginCount();
    if (loginCount !== undefined && loginCount <= 1) {
      dwSurveyDialogRef.current?.openDialog();
      DwAuthorized.setLoginCount(2);
    }
  }, []);

  const handleCommand = (command: string) => {
    setForm({
      id: null,
      name: '',
      surveyType: command
    });
    setDialogTitle('创建问卷');
    setDialogFormVisible(true);
  };

  const handlePush = (to: string) => {
    navigate(to);
  };

  const handleCopy = (index: number, row: TableItem) => {
    setForm({
      id: row.id,
      name: row.surveyNameText ? `${row.surveyNameText}` : '复制问卷标题',
      surveyType: 'survey'
    });
    setDialogFormVisible(true);
    setDialogTitle('复制问卷');
  };

  const handleDelete = (index: number, row: TableItem) => {
    Modal.confirm({
      title: '删除警告',
      content: '确认删除此问卷吗？',
      okText: '确认删除',
      okType: 'danger',
      onOk: () => {
        const data = { id: [row.id] };
        dwSurveyDelete(data).then((response) => {
          const httpResult = response.data;
          if (httpResult.resultCode === 200) {
            message.success('删除成功，即将刷新数据。');
            queryList(1);
          } else {
            message.error('删除问卷失败');
          }
        });
      }
    });
  };

  const onReset = () => {
    setFormInline({ surveyName: null, surveyState: null });
    queryList(1);
  };

  const onSubmit = () => {
    queryList(1);
  };

  const handleCurrentChange = (page: number) => {
    queryList(page);
  };

  const queryList = (pageNo: number) => {
    const { surveyName, surveyState } = formInline;
    dwSurveyList(pageSize, pageNo, surveyName, surveyState).then((response) => {
      const resultData = response.data.data;
      setTableData(resultData);
      setTotal(response.data.total);
      setCurrentPage(response.data.current);
      setPageSize(response.data.pageSize);
    });
  };

  const handleDialogConfirm = () => {
    if (form.id === null) {
      createSurvey();
    } else {
      copySurvey(form.id);
    }
  };

  const createSurvey = () => {
    const data = { surveyName: form.name, surveyType: form.surveyType };
    dwSurveyCreate(data).then((response) => {
      const httpResult = response.data;
      const resultData = httpResult.data;
      if (httpResult.resultCode === 200) {
        setDialogFormVisible(false);
        Modal.confirm({
          title: '系统提示',
          content: '问卷创建成功，点击"继续编辑问卷"进入问卷编辑。',
          okText: '继续编辑问卷',
          onOk: () => {
            navigate(`/v6/diaowen/dw-design/survey/${resultData.id}`);
          },
          onCancel: () => {
            queryList(1);
          }
        });
      } else {
        message.error('创建问卷失败');
      }
    });
  };

  const copySurvey = (surveyId: string) => {
    dwSurveyCopy(surveyId, form.name).then((response) => {
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        setDialogFormVisible(false);
        message.success('复制问卷成功');
        queryList(1);
      } else {
        message.error('复制问卷失败');
      }
    });
  };

  const columns = [
    {
      title: '问卷',
      dataIndex: 'surveyName',
      key: 'surveyName',
    },
    {
      title: '答卷数',
      dataIndex: 'answerNum',
      key: 'answerNum',
      width: 130,
      render: (text: number) => `${text || 0} 份`
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
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (_: unknown, record: TableItem) => (
        <Button.Group>
          <Tooltip title="问卷属性">
            <Button 
              size="small" 
              icon={<SettingOutlined />} 
              onClick={() => handlePush(`${prevPath}/survey/c/attr/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="设计问卷">
            <Button 
              size="small" 
              icon={<EditOutlined />} 
              onClick={() => handlePush(`/v6/diaowen/dw-design/survey/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="答卷地址">
            <Button 
              size="small" 
              icon={<ShareAltOutlined />} 
              onClick={() => handlePush(`${prevPath}/survey/c/url/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="答卷数据">
            <Button 
              size="small" 
              icon={<BarChartOutlined />} 
              onClick={() => handlePush(`${prevPath}/survey/d/data/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="预览问卷">
            <Button 
              size="small" 
              icon={<EyeOutlined />} 
              onClick={() => handlePush(`/v6/diaowen/dw-preview-style/survey/${record.id}`)}
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
        <Col span={24}>
          <div className="dw-table-form" style={{ paddingLeft: '60px' }}>
            <Form layout="inline" className="dw-form-inline" size="middle">
              <Form.Item label="问卷标题">
                <Input
                  value={formInline.surveyName || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormInline({ ...formInline, surveyName: e.target.value })}
                  placeholder="请输入查询的问卷标题"
                  allowClear
                />
              </Form.Item>
              <Form.Item label="问卷状态" style={{ marginLeft: '40px' }}>
                <Select
                  value={formInline.surveyState}
                  onChange={(value: string) => setFormInline({ ...formInline, surveyState: value })}
                  placeholder="请选择问卷状态"
                  allowClear
                  style={{ width: 200 }}
                >
                  <Select.Option value="0">设计中</Select.Option>
                  <Select.Option value="1">收集中</Select.Option>
                  <Select.Option value="2">收集结束</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ marginLeft: '40px' }}>
                <Button onClick={onReset}>重置</Button>
                <Button type="primary" onClick={onSubmit} style={{ marginLeft: 8 }}>
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
                  <Button type="primary" size="middle" onClick={() => handleCommand('survey')}>
                    新建问卷
                  </Button>
                </Col>
              </Row>
            </div>
            <Table
              columns={columns}
              dataSource={tableData}
              rowKey="id"
              pagination={false}
            />
            <div className="dw-pagination" style={{ textAlign: 'right', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handleCurrentChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title={dialogTitle}
        open={dialogFormVisible}
        onOk={handleDialogConfirm}
        onCancel={() => setDialogFormVisible(false)}
        width="40%"
      >
        <Form layout="vertical">
          <Form.Item label="问卷标题">
            <Input
              value={form.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
              placeholder="请输入问卷标题"
            />
          </Form.Item>
        </Form>
      </Modal>
      <DwSurveyDialog ref={dwSurveyDialogRef} />
    </div>
  );
};

export default DwSurveyList; 
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Table, Modal, message, Popover, Tooltip, Switch } from 'antd';
import { EyeOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { dwSurveyAnswerList, dwSurveyAnswerDelete } from '@/api/survey';
import DwSurveyDcsWrapper from '@/components/common/DwSurveyDcsWrapper';
import API from '@/api/index';

interface AnswerData {
  id: string;
  surveyId: string;
  ipAddr: string;
  completeItemNum: number | null;
  endAnDate: string;
}

const DwSurveyAnswer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tableData, setTableData] = useState<AnswerData[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [expUpQu, setExpUpQu] = useState(0);

  useEffect(() => {
    queryList(1);
  }, []);

  const handleGo = (to: string) => {
    navigate(to);
  };

  const handleDelete = (index: number, row: AnswerData) => {
    Modal.confirm({
      title: '删除警告',
      content: '确认删除此条答卷吗？',
      okText: '确认删除',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await dwSurveyAnswerDelete({ id: [row.id] });
          const httpResult = response.data;
          if (httpResult.resultCode === 200) {
            message.success('删除成功，即将刷新数据。');
            queryList(1);
          } else {
            message.error('删除答卷失败');
          }
        } catch (error) {
          console.error('Failed to delete answer:', error);
          message.error('删除答卷失败');
        }
      }
    });
  };

  const handleCurrentChange = (page: number) => {
    queryList(page);
  };

  const handleExport = () => {
    setDialogVisible(true);
  };

  const executeExportData = () => {
    const downUrl = `${process.env.DW_API_URL}${API.surveyAnswerExport}?surveyId=${id}&expUpQu=${expUpQu}`;
    setDialogVisible(false);
    window.location.href = downUrl;
  };

  const queryList = async (pageNo: number) => {
    try {
      const response = await dwSurveyAnswerList(pageSize, pageNo, id);
      const resultData = response.data;
      setTableData(resultData.data);
      setTotal(resultData.total);
      setCurrentPage(resultData.current);
      setPageSize(resultData.pageSize);
    } catch (error) {
      console.error('Failed to fetch answer list:', error);
      message.error('获取答卷列表失败');
    }
  };

  const columns = [
    {
      title: '回答IP',
      dataIndex: 'ipAddr',
      key: 'ipAddr',
      render: (text: string) => (
        <Popover content={<div dangerouslySetInnerHTML={{ __html: text }} />}>
          <div className="name-wrapper">
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </div>
        </Popover>
      )
    },
    {
      title: '回答的题数',
      dataIndex: 'completeItemNum',
      key: 'completeItemNum',
      render: (text: number | null) => (
        <span style={{ marginLeft: '10px' }}>{text != null ? text : 0} 题</span>
      )
    },
    {
      title: '回答时间',
      dataIndex: 'endAnDate',
      key: 'endAnDate',
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
      width: 160,
      render: (_: any, record: AnswerData) => (
        <Button.Group>
          <Tooltip title="查看数据">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleGo(`/no-top/dw-survey/d/data/${record.surveyId}/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="删除数据">
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
    <DwSurveyDcsWrapper id={id} isAnswerData={true}>
      {(survey) => (
        <div>
          <div className="dw-dcs-main-title">
            <Row justify="space-between" align="middle">
              <Col span={18}>
                <div style={{ fontSize: '14px', padding: '10px' }}>
                  <strong>原始数据列表</strong>
                </div>
              </Col>
              <Col span={6} style={{ textAlign: 'right', paddingRight: '16px' }}>
                <Button type="primary" size="small" onClick={handleExport}>
                  导出数据
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

          <Modal
            title="导出答卷数据"
            open={dialogVisible}
            onOk={executeExportData}
            onCancel={() => setDialogVisible(false)}
            width="40%"
          >
            <div style={{ lineHeight: '30px' }}>是否同时下载上传题的文件</div>
            <div style={{ color: 'grey', lineHeight: '30px', fontSize: '12px' }}>
              <span>如果有上传题，选择压缩下载可能比较占用系统资源及时间，请在空闲时间压缩下载</span>
            </div>
            <Switch
              checked={expUpQu === 1}
              onChange={(checked) => setExpUpQu(checked ? 1 : 0)}
              checkedChildren="同时压缩上传的文件并下载"
              unCheckedChildren="仅下载数据Excel"
            />
          </Modal>
        </div>
      )}
    </DwSurveyDcsWrapper>
  );
};

export default DwSurveyAnswer; 
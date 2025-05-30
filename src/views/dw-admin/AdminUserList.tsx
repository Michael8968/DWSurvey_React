import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Form, 
  Input, 
  Select, 
  Button, 
  Table, 
  Tag, 
  Popover, 
  Tooltip, 
  Pagination, 
  Modal, 
  Radio, 
  message 
} from 'antd';
import { EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { dwAdminUserList, dwUserCreate, dwUserDelete, dwUserUpdate } from '@/api/admin/admin-user';

const { Option } = Select;

interface UserFormData {
  id: string | null;
  loginName: string;
  pwd: string;
  status: number;
}

const AdminUserList: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('创建用户');
  const [userFormData, setUserFormData] = useState<UserFormData>({
    id: null,
    loginName: '',
    pwd: '',
    status: 2
  });

  useEffect(() => {
    queryList(1);
  }, []);

  const queryList = async (pageNo: number) => {
    const values = await form.validateFields();
    const { status, loginName } = values;
    try {
      const response = await dwAdminUserList(pageSize, pageNo, status, loginName);
      const { data } = response.data;
      setTableData(data);
      setTotal(response.data.total);
      setCurrentPage(response.data.current);
      setPageSize(response.data.pageSize);
    } catch (error) {
      message.error('获取用户列表失败');
    }
  };

  const handleSubmit = () => {
    queryList(1);
  };

  const handleReset = () => {
    form.resetFields();
    queryList(1);
  };

  const handlePageChange = (page: number) => {
    queryList(page);
  };

  const openCreateUser = () => {
    setDialogTitle('创建用户');
    setDialogVisible(true);
    setUserFormData({
      id: null,
      loginName: '',
      pwd: '',
      status: 2
    });
  };

  const handleEdit = (record: any) => {
    setDialogTitle('编辑用户');
    setDialogVisible(true);
    setUserFormData({
      id: record.id,
      loginName: record.loginName,
      pwd: '',
      status: record.status
    });
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '删除警告',
      content: '确认删除此用户吗？',
      okText: '确认删除',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await dwUserDelete({ id: [record.id] });
          if (response.data.resultCode === 200) {
            message.success('删除成功，即将刷新数据。');
            queryList(1);
          } else {
            message.error('删除用户失败');
          }
        } catch (error) {
          message.error('删除用户失败');
        }
      }
    });
  };

  const handleSaveUser = async () => {
    try {
      const values = await userForm.validateFields();
      const { id, loginName, pwd, status } = values;
      
      if (id === null) {
        const response = await dwUserCreate({ loginName, pwd, status });
        if (response.data.resultCode === 200) {
          message.success('添加成功，即将刷新数据。');
          queryList(1);
          setDialogVisible(false);
        } else {
          message.error('添加用户失败' + response.data.data);
        }
      } else {
        const response = await dwUserUpdate({ id, loginName, pwd, status });
        if (response.data.resultCode === 200) {
          message.success('修改成功，即将刷新数据。');
          queryList(1);
          setDialogVisible(false);
        } else {
          message.error('修改用户失败' + response.data.data);
        }
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns = [
    {
      title: '登录名',
      dataIndex: 'loginName',
      key: 'loginName',
      render: (text: string) => (
        <Popover content={<p>{text}</p>} title="登录名">
          <div>{text}</div>
        </Popover>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: number) => {
        const statusMap = {
          0: { text: '不可用', color: 'red' },
          1: { text: '未激活', color: 'default' },
          2: { text: '激活', color: 'green' }
        };
        const { text, color } = statusMap[status as keyof typeof statusMap] || { text: '未知', color: 'default' };
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 180,
      render: (text: string) => (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Button.Group>
          <Tooltip title="编辑用户">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="删除用户">
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />} 
              size="small"
              onClick={() => handleDelete(record)}
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
          <div style={{ paddingLeft: 60 }}>
            <Form
              form={form}
              layout="inline"
              onFinish={handleSubmit}
            >
              <Form.Item name="loginName" label="登录账号">
                <Input placeholder="请输入查询的账号关键字" allowClear />
              </Form.Item>
              <Form.Item name="status" label="账号状态" style={{ marginLeft: 40 }}>
                <Select placeholder="请选择账号状态" allowClear style={{ width: 200 }}>
                  <Option value="0">不可用</Option>
                  <Option value="1">未激活</Option>
                  <Option value="2">激活</Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ marginLeft: 40 }}>
                <Button onClick={handleReset}>重置</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                  查询
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="dw-table">
            <div className="dw-table-title">
              <Row justify="space-between" align="middle">
                <Col span={4}><h3>用户管理</h3></Col>
                <Col span={20} style={{ textAlign: 'right' }}>
                  <Button type="primary" onClick={openCreateUser}>
                    添加用户
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

            <div style={{ textAlign: 'right', marginTop: 16 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        title={dialogTitle}
        open={dialogVisible}
        onOk={handleSaveUser}
        onCancel={() => setDialogVisible(false)}
        width="40%"
      >
        <Form
          form={userForm}
          layout="vertical"
          initialValues={userFormData}
        >
          <Form.Item
            name="loginName"
            label="设置账号"
            rules={[
              { required: true, message: '请输入登录账号' },
              { min: 6, max: 18, message: '长度在 6 到 18 个字符' }
            ]}
          >
            <Input placeholder="请设置登录账号" maxLength={18} />
          </Form.Item>
          <Form.Item
            name="status"
            label="账号状态"
            rules={[{ required: true, message: '请选择账号状态' }]}
          >
            <Radio.Group>
              <Radio value={0}>不可用</Radio>
              <Radio value={1}>未激活</Radio>
              <Radio value={2}>激活</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="pwd"
            label="设置密码"
            rules={[
              { required: !userFormData.id, message: '请输入登录密码' },
              { min: 6, max: 18, message: '长度在 6 到 18 个字符' }
            ]}
          >
            <Input.Password 
              placeholder="新建时必须设置密码，修改时不设置代表不修改。"
              maxLength={18}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserList; 
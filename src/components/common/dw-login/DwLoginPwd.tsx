import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
import DwJsencrypt from '@/utils/dw-jsencrypt';
import { dwFooterUtils } from '../../dw-survey-comp/dw-utils/dw-common/dw-footer-util';

interface LoginFormData {
  email: string;
  pass: string;
}

interface DwLoginPwdProps {
  onLogin: (data: { type: string; userName: string; password: string }) => void;
}

const DwLoginPwd: React.FC<DwLoginPwdProps> = ({ onLogin }) => {
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    pass: ''
  });

  useEffect(() => {
    loadDwFooter();
  }, []);

  const handleSubmit = () => {
    const passcode = DwJsencrypt.dwGetCode(formData.pass + '');
    onLogin({
      type: 'account',
      userName: formData.email,
      password: passcode || ''
    });
  };

  const submitForm = async () => {
    try {
      const values = await form.validateFields();
      setFormData(values);
      handleSubmit();
    } catch (error) {
      console.log('error submit!!', error);
      message.error('请检查表单填写是否正确');
    }
  };

  const resetForm = () => {
    form.resetFields();
  };

  const loadDwFooter = () => {
    dwFooterUtils.getNewDwFooterInfo(() => {
      dwFooterUtils.isDemo(() => {
        showDefaultDemoPwd();
      });
    });
  };

  const showDefaultDemoPwd = () => {
    form.setFieldsValue({
      email: 'service@diaowen.net',
      pass: '123456'
    });
  };

  return (
    <div>
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        onFinish={submitForm}
        initialValues={formData}
      >
        <Form.Item
          label="账号"
          name="email"
          rules={[{ required: true, message: '请输入登录账号' }]}
        >
          <Input placeholder="请输入登录账号" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="pass"
          rules={[
            { required: true, message: '请输入账号密码' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符' }
          ]}
        >
          <Input.Password placeholder="请输入登录账号密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DwLoginPwd; 
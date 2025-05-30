import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import DwUserMenu from './DwUserMenu';
import { dwUserPwd } from '../../api/dw-user';

const DwUserPwd: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const response = await dwUserPwd(values.oldPass, values.pass);
      const httpResult = response.data;
      if (httpResult.resultCode === 200) {
        message.success('密码修改成功');
      } else {
        message.error('密码修改失败');
      }
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Row>
        <Col span={24} offset={0}>
          <div className="dw-user-body">
            <Row>
              <Col span={4} style={{ height: '600px' }}>
                <DwUserMenu />
              </Col>
              <Col span={20}>
                <div style={{ padding: '30px', width: '400px' }}>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="原密码"
                      name="oldPass"
                      rules={[
                        { required: true, message: '请输入原登录密码' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符' }
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="密码"
                      name="pass"
                      rules={[
                        { required: true, message: '请输入新登录密码' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符' }
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      label="确认密码"
                      name="checkPass"
                      dependencies={['pass']}
                      rules={[
                        { required: true, message: '请再次输入新登录密码' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('pass') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次输入密码不一致!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item style={{ paddingTop: '20px' }}>
                      <Button type="primary" htmlType="submit">
                        提交修改
                      </Button>
                      <Button style={{ marginLeft: 8 }} onClick={onReset}>
                        重置
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DwUserPwd; 
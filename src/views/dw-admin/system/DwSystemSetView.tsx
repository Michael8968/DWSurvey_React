import React, { useState } from 'react';
import { Form, Input, Button, Switch, Tooltip, Upload, message } from 'antd';

const DwSystemSetView: React.FC = () => {
  const [form] = Form.useForm();
  const [logoImageUrl] = useState('');

  const initialValues = {
    siteName: '调问网',
    siteUrl: 'http://www.diaowen.net',
    siteIcp: '京ICP备13050030号-3',
    siteMail: 'service@diaowen.net',
    siteAdminName: '管理员',
    sitePhone: 18888888888,
    logoImageUrl: '',
    footerHide: false,
    footerContent: 'Powered by DWSurvey',
  };

  const handleExceed = () => {
    message.warning('当前社区版，不支持修改系统默认LOGO，如需修改请升级到企业版');
    return false;
  };

  const onSubmit = (values: any) => {
    console.log('submit!', values);
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{ padding: 20 }}>
        <div>
          <h3>系统配置</h3>
        </div>
        <div>
          <div style={{ width: 550 }}>
            <Form
              form={form}
              initialValues={initialValues}
              labelCol={{ flex: '130px' }}
              labelAlign="left"
              onFinish={onSubmit}
              layout="horizontal"
            >
              <div style={{ padding: '0 10px' }}>
                <Form.Item label="站点名称" name="siteName">
                  <Input />
                </Form.Item>
                <Form.Item label="站点URL" name="siteUrl">
                  <Input />
                </Form.Item>
                <Form.Item label="站点备案号" name="siteIcp">
                  <Input />
                </Form.Item>
                <Form.Item label="联系人" name="siteAdminName">
                  <Input />
                </Form.Item>
                <Form.Item label="联系邮箱" name="siteMail">
                  <Input />
                </Form.Item>
                <Form.Item label="联系电话" name="sitePhone">
                  <Input />
                </Form.Item>
              </div>
              <div style={{ padding: '0 10px' }}>
                <Form.Item label="LOGO" name="logoImageUrl">
                  <Tooltip title="需要修改请升级到企业版" placement="right">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Upload
                        className="avatar-uploader"
                        action="/api/dwsurvey/up/up-file.do"
                        beforeUpload={handleExceed}
                        showUploadList={false}
                        disabled
                      >
                        {logoImageUrl ? (
                          <img src={logoImageUrl} alt="logo" className="avatar" />
                        ) : (
                          <img src={require('@/assets/logo.png')} alt="logo" className="avatar" />
                        )}
                      </Upload>
                      <div style={{ marginLeft: 10 }}>
                        <a href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfl0" style={{ color: '#faad14', lineHeight: '15px' }}>
                          购买升级
                        </a>
                      </div>
                    </div>
                  </Tooltip>
                  <div style={{ fontSize: 13, color: 'gray', lineHeight: '13px', marginTop: 10 }}>
                    点击图片上传新LOGO
                  </div>
                </Form.Item>
                <Form.Item label="底部版权信息" name="footerHide">
                  <Tooltip title="需要修改请升级到企业版" placement="right">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Switch checkedChildren="隐藏" unCheckedChildren="显示" disabled />
                      <div style={{ marginLeft: 10 }}>
                        <a href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfh5" style={{ color: '#faad14', lineHeight: '15px' }}>
                          购买升级
                        </a>
                      </div>
                    </div>
                  </Tooltip>
                </Form.Item>
                <Form.Item label="底部版权内容" name="footerContent">
                  <Tooltip title="需要修改请升级到企业版" placement="right">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Input placeholder="Powered by DWSurvey" disabled style={{ width: 300 }} />
                      <div style={{ marginLeft: 10 }}>
                        <a href="https://www.diaowen.net?s0=oss&v1=2501&e5=sfc3" style={{ color: '#faad14', lineHeight: '15px' }}>
                          购买升级
                        </a>
                      </div>
                    </div>
                  </Tooltip>
                </Form.Item>
              </div>
              <div style={{ marginTop: 10 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">保存更新</Button>
                  <Button style={{ marginLeft: 8 }}>取消</Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DwSystemSetView; 
import React, { useState } from 'react';
import { Form, FormItem, Input, ColorPicker, Switch, Upload } from 'element-react';
import { getDefaultSurveyStyle } from '../../../dw-utils/dw-common/dw-common-utils';

interface Survey {
  surveyStyle: {
    pageThemeColor?: string;
    pageBgColor?: string;
    pageProgressColor?: string;
    pageHeaderImage?: string;
    pageBgImage?: string;
    pageLogoImage?: string;
    showQuNum?: boolean;
    showProgressBar?: boolean;
    showHeader?: boolean;
    showTitle?: boolean;
  };
}

interface Props {
  survey: Survey;
  onChange: (survey: Survey) => void;
}

const DwSurveyStyleDesignAside: React.FC<Props> = ({ survey, onChange }) => {
  const [form] = useState({
    pageThemeColor: survey.surveyStyle?.pageThemeColor || getDefaultSurveyStyle().pageThemeColor,
    pageBgColor: survey.surveyStyle?.pageBgColor || getDefaultSurveyStyle().pageBgColor,
    pageProgressColor: survey.surveyStyle?.pageProgressColor || getDefaultSurveyStyle().pageProgressColor,
    pageHeaderImage: survey.surveyStyle?.pageHeaderImage || getDefaultSurveyStyle().pageHeaderImage,
    pageBgImage: survey.surveyStyle?.pageBgImage || getDefaultSurveyStyle().pageBgImage,
    pageLogoImage: survey.surveyStyle?.pageLogoImage || getDefaultSurveyStyle().pageLogoImage,
    showQuNum: survey.surveyStyle?.showQuNum ?? getDefaultSurveyStyle().showQuNum,
    showProgressBar: survey.surveyStyle?.showProgressBar ?? getDefaultSurveyStyle().showProgressBar,
    showHeader: survey.surveyStyle?.showHeader ?? getDefaultSurveyStyle().showHeader,
    showTitle: survey.surveyStyle?.showTitle ?? getDefaultSurveyStyle().showTitle
  });

  const handleChange = (field: string, value: any) => {
    const newForm = { ...form, [field]: value };
    const newSurvey = {
      ...survey,
      surveyStyle: {
        ...survey.surveyStyle,
        [field]: value
      }
    };
    onChange(newSurvey);
  };

  const handleImageUpload = (field: string, response: any) => {
    if (response.resultCode === 200) {
      handleChange(field, response.data);
    }
  };

  return (
    <div className="dw-survey-style-design-aside">
      <Form labelPosition="top">
        <FormItem label="图片属性">
          <div className="dw-form-item">
            <div className="dw-form-item-label">头部图片</div>
            <div className="dw-form-item-content">
              <Upload
                action="/api/upload"
                onSuccess={(response) => handleImageUpload('pageHeaderImage', response)}
              >
                <div className="dw-upload-trigger">
                  {form.pageHeaderImage ? (
                    <img src={form.pageHeaderImage} alt="header" />
                  ) : (
                    <i className="el-icon-plus"></i>
                  )}
                </div>
              </Upload>
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">背景图片</div>
            <div className="dw-form-item-content">
              <Upload
                action="/api/upload"
                onSuccess={(response) => handleImageUpload('pageBgImage', response)}
              >
                <div className="dw-upload-trigger">
                  {form.pageBgImage ? (
                    <img src={form.pageBgImage} alt="background" />
                  ) : (
                    <i className="el-icon-plus"></i>
                  )}
                </div>
              </Upload>
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">Logo图片</div>
            <div className="dw-form-item-content">
              <Upload
                action="/api/upload"
                onSuccess={(response) => handleImageUpload('pageLogoImage', response)}
              >
                <div className="dw-upload-trigger">
                  {form.pageLogoImage ? (
                    <img src={form.pageLogoImage} alt="logo" />
                  ) : (
                    <i className="el-icon-plus"></i>
                  )}
                </div>
              </Upload>
            </div>
          </div>
        </FormItem>

        <FormItem label="颜色属性">
          <div className="dw-form-item">
            <div className="dw-form-item-label">主题颜色</div>
            <div className="dw-form-item-content">
              <ColorPicker
                value={form.pageThemeColor}
                onChange={(color) => handleChange('pageThemeColor', color)}
              />
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">背景颜色</div>
            <div className="dw-form-item-content">
              <ColorPicker
                value={form.pageBgColor}
                onChange={(color) => handleChange('pageBgColor', color)}
              />
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">进度条颜色</div>
            <div className="dw-form-item-content">
              <ColorPicker
                value={form.pageProgressColor}
                onChange={(color) => handleChange('pageProgressColor', color)}
              />
            </div>
          </div>
        </FormItem>

        <FormItem label="显示配置">
          <div className="dw-form-item">
            <div className="dw-form-item-label">显示题号</div>
            <div className="dw-form-item-content">
              <Switch
                value={form.showQuNum}
                onChange={(value) => handleChange('showQuNum', value)}
              />
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">显示进度条</div>
            <div className="dw-form-item-content">
              <Switch
                value={form.showProgressBar}
                onChange={(value) => handleChange('showProgressBar', value)}
              />
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">显示头部</div>
            <div className="dw-form-item-content">
              <Switch
                value={form.showHeader}
                onChange={(value) => handleChange('showHeader', value)}
              />
            </div>
          </div>

          <div className="dw-form-item">
            <div className="dw-form-item-label">显示标题</div>
            <div className="dw-form-item-content">
              <Switch
                value={form.showTitle}
                onChange={(value) => handleChange('showTitle', value)}
              />
            </div>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};

export default DwSurveyStyleDesignAside; 
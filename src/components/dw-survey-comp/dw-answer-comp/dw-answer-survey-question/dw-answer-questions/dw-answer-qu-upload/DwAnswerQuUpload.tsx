import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Form } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { answerQuEventCommon } from '../../../dw-utils/dw-survey-answer-common';
import './DwAnswerQuUpload.css'; // Import the converted CSS

const { Dragger } = Upload;

interface Question {
  fileLimit?: number | null;
  fileAccept?: number | null;
  customFileAccept?: string;
  fileSize?: number | null;
  upFileList?: UploadFile[];
  anUplodFiles?: any[];
  [key: string]: any;
}

interface Survey {
  questions: Question[];
  dwDebug?: boolean;
  [key: string]: any;
}

interface Answer {
  [key: string]: any;
}

interface DwAnswerQuUploadProps {
  index?: number;
  survey: Survey;
  answer?: Answer;
  onUpdateOptions?: (options: any) => void;
}

const DwAnswerQuUpload: React.FC<DwAnswerQuUploadProps> = ({
  index = 0,
  survey,
  answer,
  onUpdateOptions
}) => {
  const [upFileList, setUpFileList] = useState<UploadFile[]>([]);
  const [limit, setLimit] = useState(0);
  const [accept, setAccept] = useState('');
  const [fileSize, setFileSize] = useState(10);
  const uploadAction = '/api/dwsurvey/up/up-file-wb.do';

  useEffect(() => {
    const question = survey.questions[index];
    
    if (question.fileLimit !== undefined && question.fileLimit !== null) {
      setLimit(question.fileLimit);
    }
    
    if (question.fileAccept !== undefined && question.fileAccept !== null) {
      const fileAccept = question.fileAccept;
      if (fileAccept === 0) setAccept('');
      if (fileAccept === 1) setAccept('.jpg,.jpeg,.png,.gif,.bmp');
      if (fileAccept === 2) setAccept('.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx');
      if (fileAccept === 100 && question.customFileAccept) {
        setAccept(question.customFileAccept);
      }
    }
    
    if (question.fileSize !== undefined && question.fileSize !== null) {
      setFileSize(question.fileSize);
    }
    
    if (question.upFileList !== undefined) {
      setUpFileList(question.upFileList);
    }
  }, [index, survey]);

  const handleRemove = (file: UploadFile) => {
    const newFileList = upFileList.filter(f => f.uid !== file.uid);
    setUpFileList(newFileList);
    updateUpFileAnswer(newFileList);
  };

  const handlePreview = (file: UploadFile) => {
    console.log(file);
    // Implement preview logic here
  };

  const handleExceed = () => {
    message.warning(`当前限制选择 ${limit} 个文件`);
  };

  const beforeUpload = (file: File) => {
    if (fileSize > 0) {
      const isLtSize = file.size / 1024 / 1024 < fileSize;
      if (!isLtSize) {
        message.warning(`上传文件大小不能超过 ${fileSize}MB!`);
      }
      return isLtSize;
    }
    return true;
  };

  const handleSuccess = (response: any, file: UploadFile, fileList: UploadFile[]) => {
    if (response.resultCode === 200) {
      setUpFileList(fileList);
      updateUpFileAnswer(fileList);
    } else {
      message.error(`上传失败，${response.resultMsg}`);
      const updatedFileList = [...fileList];
      updatedFileList.pop();
      setUpFileList(updatedFileList);
    }
  };

  const updateUpFileAnswer = (fileList: UploadFile[]) => {
    const updatedSurvey = { ...survey };
    updatedSurvey.questions[index].upFileList = fileList;
    if (onUpdateOptions) {
      onUpdateOptions(updatedSurvey);
    }
    answerQuEventCommon(updatedSurvey, index);
  };

  const getUploadTip = () => {
    if (accept && fileSize > 0 && limit > 0) {
      return (
        <div className="dw-answer-question-remind" style={{ lineHeight: '20px' }}>
          请上传<span className="span-high">{accept}</span>类型文件，单个文件大小不超过
          <span className="span-high">{fileSize}M</span>，最多只能上传
          <span className="span-high">{limit}个</span>文件
        </div>
      );
    } else if (!accept && fileSize > 0 && limit > 0) {
      return (
        <div className="dw-answer-question-remind" style={{ lineHeight: '20px' }}>
          单个文件大小不超过<span className="span-high">{fileSize}M</span>，最多只能上传
          <span className="span-high">{limit}个</span>文件
        </div>
      );
    } else if (!accept && fileSize <= 0 && limit > 0) {
      return (
        <div className="dw-answer-question-remind" style={{ lineHeight: '20px' }}>
          最多只能上传<span className="span-high">{limit}个</span>文件
        </div>
      );
    }
    return null;
  };

  return (
    <Form>
      <div>
        <Upload
          action={uploadAction}
          fileList={upFileList}
          beforeUpload={beforeUpload}
          onRemove={handleRemove}
          onPreview={handlePreview}
          onChange={({ fileList }) => setUpFileList(fileList)}
          onDrop={() => console.log('Dropped files')}
          multiple
          accept={accept}
          maxCount={limit}
        >
          <Button type="primary" ghost>点击上传</Button>
          <div className="ant-upload-hint">
            {getUploadTip()}
          </div>
        </Upload>

        {survey.dwDebug && (
          <div>
            <pre>{JSON.stringify(upFileList, null, 2)}</pre>
          </div>
        )}
      </div>
    </Form>
  );
};

export default DwAnswerQuUpload;
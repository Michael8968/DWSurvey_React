import React, { useState } from 'react';
import { Upload, Button, Message, MessageBox } from 'element-react';

interface Survey {
  [key: string]: any;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuUpload: React.FC<Props> = ({
  index,
  survey,
  onChange
}) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleRemove = (file: any, fileList: any[]) => {
    console.log(file, fileList);
  };

  const handlePreview = (file: any) => {
    console.log(file);
  };

  const handleExceed = (files: any[], fileList: any[]) => {
    Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  };

  const beforeRemove = (file: any, fileList: any[]) => {
    return MessageBox.confirm(`确定移除 ${file.name}？`);
  };

  return (
    <div style={{ padding: 10 }}>
      <Upload
        onPreview={handlePreview}
        onRemove={handleRemove}
        beforeRemove={beforeRemove}
        limit={3}
        onExceed={handleExceed}
        fileList={fileList}
        className="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <Button size="small" type="primary">点击上传</Button>
        <div className="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </Upload>
    </div>
  );
};

export default DwDesignQuUpload; 
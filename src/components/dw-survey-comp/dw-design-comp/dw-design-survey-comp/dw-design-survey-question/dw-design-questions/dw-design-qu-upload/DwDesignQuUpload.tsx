import React, { useState } from 'react';
import { Upload, Button, message as Message, Modal as MessageBox } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

interface Survey {
  [key: string]: any;
}

interface Props {
  index: number;
  survey: Survey;
  onChange?: (survey: Survey) => void;
}

const DwDesignQuUpload: React.FC<Props> = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleRemove = async (file: UploadFile) => {
    try {
      await MessageBox.confirm({
        title: '提示',
        content: `确定移除 ${file.name}？`
      });
      return true;
    } catch {
      return false;
    }
  };

  const handlePreview = (file: UploadFile) => {
    console.log(file);
  };

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    if (newFileList.length > 3) {
      Message.warning(`当前限制选择 3 个文件，已选择 ${newFileList.length} 个文件`);
      return;
    }
    setFileList(newFileList);
  };

  return (
    <div style={{ padding: 10 }}>
      <Upload
        onPreview={handlePreview}
        onRemove={handleRemove}
        maxCount={3}
        onChange={handleChange}
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
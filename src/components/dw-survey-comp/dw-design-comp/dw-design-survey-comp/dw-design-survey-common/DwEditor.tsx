import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css';
import './DwEditor.css';

interface DwEditorProps {
  visible?: boolean;
  value?: string;
  onVisibleChange?: (visible: boolean) => void;
  onConfirm?: (value: { dwText: string; dwHtml: string }) => void;
}

const DwEditor = forwardRef<any, DwEditorProps>(({
  visible = false,
  value = '',
  onVisibleChange,
  onConfirm
}, ref) => {
  const [editor, setEditor] = useState<any>(null);
  const [html, setHtml] = useState<string>('');
  const [internalVisible, setInternalVisible] = useState(visible);

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
  };
  const mode = 'default'; // or 'simple'

  useImperativeHandle(ref, () => ({
    upEditHtml: (html: string) => {
      setHtml(html);
      if (editor) {
        editor.setHtml(html);
      }
    }
  }));

  useEffect(() => {
    setInternalVisible(visible);
    if (visible) {
      setHtml(value);
    }
  }, [visible, value]);

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
    };
  }, [editor]);

  const onCreated = (editor: any) => {
    setEditor(editor);
  };

  const handleCancel = () => {
    setInternalVisible(false);
    if (onVisibleChange) {
      onVisibleChange(false);
    }
  };

  const handleOk = () => {
    if (editor) {
      const dwValue = {
        dwText: editor.getText(),
        dwHtml: editor.getHtml()
      };
      if (onConfirm) {
        onConfirm(dwValue);
      }
    }
    handleCancel();
  };

  return (
    <Modal
      title="高级编辑器"
      visible={internalVisible}
      width="70%"
      className="edit-dialog-root"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取 消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          确 定
        </Button>,
      ]}
      maskClosable={false}
      keyboard={false}
      destroyOnClose
      forceRender
    >
      <div style={{ border: '1px solid #ccc' }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode={mode}
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          defaultHtml={html}
          onCreated={onCreated}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode={mode}
          style={{ height: '300px', overflowY: 'hidden' }}
        />
      </div>
    </Modal>
  );
});

export default DwEditor;
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'antd';
import DwEditor from './DwEditor';
import './DwTextEditLabel.css';

interface DwValue {
  dwText: string;
  dwHtml: string;
  dwPlaceholder?: string;
  isRefreshValue?: boolean;
  isNew?: boolean;
}

interface ItemStatus {
  itemHover: boolean;
  itemClick: boolean;
  [key: string]: any;
}

interface DwTextEditLabelProps {
  value?: DwValue;
  itemClick?: boolean;
  itemStatus?: ItemStatus;
  btnSize?: string;
  onUpdateInput?: (value: DwValue) => void;
  onUpValue?: (value: DwValue) => void;
  onUpItemClick?: (clicked: boolean) => void;
}

const DwTextEditLabel = forwardRef<any, DwTextEditLabelProps>(({
  value = { dwText: '', dwHtml: '', dwPlaceholder: '' },
  itemClick = false,
  itemStatus = { itemHover: false, itemClick: false },
  btnSize = '15px',
  onUpdateInput,
  onUpValue,
  onUpItemClick
}, ref) => {
  const [hover, setHover] = useState(false);
  const [editorText, setEditorText] = useState(value.dwHtml);
  const [centerDialogVisible, setCenterDialogVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const curEditRef = useRef<HTMLDivElement>(null);
  const curDwEditorRef = useRef<any>(null);

  const itemBtnShow = itemStatus.itemHover || itemStatus.itemClick;

  useEffect(() => {
    if (value?.isRefreshValue) {
      setEditorText(value.dwHtml);
      if (curEditRef.current) {
        curEditRef.current.innerHTML = value.dwHtml;
      }
      if (onUpdateInput) {
        onUpdateInput({ ...value, isRefreshValue: false });
      }
    }

    if (value?.isNew) {
      editClick();
      editFocus();
      if (onUpdateInput) {
        onUpdateInput({ ...value, isNew: false });
      }
    }
  }, [value]);

  const upVisible = (visible: boolean) => {
    setCenterDialogVisible(visible);
    if (curEditRef.current) {
      curEditRef.current.focus();
    }
  };

  const upHtmlValue = (html: DwValue) => {
    setEditorText(html.dwHtml);
    setCenterDialogVisible(false);
    if (onUpValue) {
      onUpValue(html);
    }
    if (curEditRef.current) {
      curEditRef.current.focus();
    }
  };

  const editClick = () => {
    if (onUpItemClick) {
      onUpItemClick(true);
    }
    selectAllText();
  };

  const editBlur = () => {
    if (onUpItemClick) {
      onUpItemClick(false);
    }
    setClickCount(0);
  };

  const inputEdit = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const dwValue = { dwText: target.innerText, dwHtml: target.innerHTML };
    if (onUpValue) {
      onUpValue(dwValue);
    }
  };

  const mouseleave = () => {
    setHover(false);
  };

  const mouseover = () => {
    setHover(true);
  };

  const addToolbar = () => {
    setCenterDialogVisible(true);
    if (curDwEditorRef.current) {
      curDwEditorRef.current.upEditHtml(value.dwHtml);
    }
  };

  const editFocus = () => {
    if (curEditRef.current) {
      curEditRef.current.focus();
    }
    selectAllText();
  };

  const selectAllText = () => {
    if (clickCount === 0 && curEditRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(curEditRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setClickCount(prev => prev + 1);
  };

  useImperativeHandle(ref, () => ({
    editFocus
  }));

  return (
    <div 
      className="dwEditorRoot dw-width-100bf" 
      onMouseOver={mouseover} 
      onMouseLeave={mouseleave}
    >
      <div className="dw-flex-start">
        <div className="dw-flex-item-auto">
          <div
            id="curEdit"
            ref={curEditRef}
            className={`dw-input-default dw-qu-option-text dw-border-blue editor-content-view ${
              itemStatus.itemClick ? 'dw-input-focus' : 'dwEditRoot'
            } ${itemStatus.itemHover ? 'dw-input-hover' : 'dwEditRoot'}`}
            data-placeholder={value.dwPlaceholder}
            contentEditable="plaintext-only"
            onClick={editClick}
            onBlur={editBlur}
            onInput={inputEdit}
            dangerouslySetInnerHTML={{ __html: editorText }}
          />
        </div>
        <div className="dw-edit-toolbar">
          {itemBtnShow && (
            <div 
              className="dw-qu-option-text dw-btn-blue-1 dw-cursor-pointer" 
              style={{ marginLeft: '-1px !important' }} 
              onClick={addToolbar}
            >
              <i className="fa fa-align-left" />
            </div>
          )}
        </div>
      </div>
      <div>
        <DwEditor  
          ref={(ref: any) => (curDwEditorRef.current = ref)}
          visible={centerDialogVisible}
          onVisibleChange={upVisible}
          onConfirm={upHtmlValue}
        />
      </div>
    </div>
  );
});

export default DwTextEditLabel;
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import DwEditor from './DwEditor';

interface Value {
  dwHtml: string;
  dwText: string;
  dwPlaceholder?: string;
  isRefreshValue?: boolean;
  isNew?: boolean;
}

interface ItemStatus {
  itemHover: boolean;
  itemClick: boolean;
}

interface Props {
  value: Value;
  itemClick?: boolean;
  itemStatus: ItemStatus;
  btnSize?: string;
  onUpValue: (value: { dwText: string; dwHtml: string }) => void;
  onUpItemClick: (clicked: boolean) => void;
}

const DwTextEditLabel: React.FC<Props> = ({
  value,
  itemStatus,
  btnSize = '15px',
  onUpValue,
  onUpItemClick
}) => {
  const [hover, setHover] = useState(false);
  const [editorText, setEditorText] = useState(value.dwHtml);
  const [centerDialogVisible, setCenterDialogVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const curEditRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.isRefreshValue) {
      setEditorText(value.dwHtml);
      if (curEditRef.current) {
        curEditRef.current.innerHTML = value.dwHtml;
      }
      value.isRefreshValue = false;
    }
    if (value.isNew) {
      editClick();
      editFocus();
      value.isNew = false;
    }
  }, [value]);

  const upVisible = (visible: boolean) => {
    setCenterDialogVisible(visible);
    if (curEditRef.current) {
      curEditRef.current.focus();
    }
  };

  const upHtmlValue = (html: { dwText: string; dwHtml: string }) => {
    setEditorText(html.dwHtml);
    setCenterDialogVisible(false);
    onUpValue(html);
    if (curEditRef.current) {
      curEditRef.current.focus();
    }
  };

  const editClick = () => {
    onUpItemClick(true);
    selectAllText();
  };

  const editBlur = () => {
    onUpItemClick(false);
    setClickCount(0);
  };

  const inputEdit = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const dwValue = {
      dwText: target.innerText,
      dwHtml: target.innerHTML
    };
    onUpValue(dwValue);
  };

  const addToolbar = () => {
    setCenterDialogVisible(true);
  };

  const editFocus = () => {
    if (curEditRef.current) {
      curEditRef.current.focus();
      selectAllText();
    }
  };

  const selectAllText = () => {
    if (clickCount === 0 && curEditRef.current) {
      if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(curEditRef.current);
        range.select();
      } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNodeContents(curEditRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
    setClickCount(prev => prev + 1);
  };

  return (
    <div
      className="dwEditorRoot dw-width-100bf"
      onInput={inputEdit}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="dw-flex-start">
        <div className="dw-flex-item-auto">
          <div
            ref={curEditRef}
            className={`${
              itemStatus.itemClick ? 'dw-input-focus' : 'dwEditRoot'
            } ${
              itemStatus.itemHover ? 'dw-input-hover' : 'dwEditRoot'
            } dw-input-default dw-qu-option-text dw-border-blue editor-content-view`}
            contentEditable="plaintext-only"
            placeholder={value.dwPlaceholder}
            onClick={editClick}
            onBlur={editBlur}
            dangerouslySetInnerHTML={{ __html: editorText }}
          />
        </div>
        <div className="dw-edit-toolbar">
          {(itemStatus.itemHover || itemStatus.itemClick) && (
            <div
              className="dw-qu-option-text dw-btn-blue-1 dw-cursor-pointer"
              style={{ marginLeft: '-1px!important' }}
              onClick={addToolbar}
            >
              <FontAwesomeIcon icon={faAlignLeft} />
            </div>
          )}
        </div>
      </div>
      <div>
        <DwEditor
          centerDialogVisible={centerDialogVisible}
          value={value.dwHtml}
          onUpVisible={upVisible}
          onUpHtmlValue={upHtmlValue}
        />
      </div>
    </div>
  );
};

export default DwTextEditLabel; 
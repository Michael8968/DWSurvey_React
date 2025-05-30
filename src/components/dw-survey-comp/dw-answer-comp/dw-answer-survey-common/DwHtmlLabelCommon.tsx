import React from 'react';
import styled from 'styled-components';

interface DwHtmlLabelCommonProps {
  value: {
    dwHtml: string | null;
  };
  itemClick?: boolean;
  btnSize?: string;
  quNum?: number | null;
  isRequired?: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const RequiredMark = styled.div`
  color: #f56c6c;
  font-weight: bold;
`;

const QuestionNumber = styled.div``;

const EditorRoot = styled.div`
  width: 100%;
`;

const EditRoot = styled.div`
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 28px;
  outline-style: none;
  word-break: break-word;

  &:empty::before {
    content: attr(placeholder);
    color: lightgrey;
  }

  &:hover {
    background: #f6f8f8;
  }

  &:focus {
    border: 1px solid #095aaa;
    background: #f6f8f8;
    outline-width: 1px;
  }

  img {
    width: 100%;
  }

  video {
    width: 100%;
    text-indent: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

const DwHtmlLabelCommon: React.FC<DwHtmlLabelCommonProps> = ({
  value,
  itemClick = false,
  btnSize = '15px',
  quNum = null,
  isRequired = false,
}) => {
  return (
    <Container>
      {isRequired && <RequiredMark>*&nbsp;</RequiredMark>}
      {quNum !== null && <QuestionNumber>{quNum}、</QuestionNumber>}
      <EditorRoot>
        <EditRoot
          dangerouslySetInnerHTML={{
            __html: value.dwHtml !== null ? value.dwHtml : '',
          }}
        />
      </EditorRoot>
    </Container>
  );
};

export default DwHtmlLabelCommon;

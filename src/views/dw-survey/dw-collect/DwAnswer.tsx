import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DwAnswer: React.FC = () => {
  const { sid } = useParams<{ sid: string }>();

  useEffect(() => {
    loadAnswer();
  }, []);

  const loadAnswer = () => {
    window.location.href = `/static/diaowen/answer-p.html?sid=${sid}`;
  };

  return <div>问卷加载中</div>;
};

export default DwAnswer; 
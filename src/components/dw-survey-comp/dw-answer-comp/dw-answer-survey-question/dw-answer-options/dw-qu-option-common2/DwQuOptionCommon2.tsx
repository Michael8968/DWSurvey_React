import React, { useEffect, useRef, useState } from 'react';
import DwQuOptionCommon2Item from './DwQuOptionCommon2Item';

interface DwQuOptionCommon2Props {
  index: number;
  options: any[];
  survey: any;
  quType: string;
  answer: any;
  onUpdateOptions?: (options: any[]) => void;
}

const DwQuOptionCommon2: React.FC<DwQuOptionCommon2Props> = ({
  index,
  options,
  survey,
  quType,
  answer,
  onUpdateOptions
}) => {
  const [dragOptions, setDragOptions] = useState(options);
  const [drag, setDrag] = useState(false);
  const quCommonItemRefs = useRef<any[]>([]);

  useEffect(() => {
    refreshData();
  }, [options]);

  const onStart = () => {
    setDrag(true);
  };

  const onEnd = () => {
    setDrag(false);
    refreshOptions(null);
  };

  const upAllItemClick = () => {
    // 重置所有状态
    // 在 React 中，这个功能可能需要通过状态管理来实现
  };

  const refreshOptions = (focusIndex: number | null) => {
    if (onUpdateOptions) {
      onUpdateOptions(dragOptions);
    }
    
    upAllItemClick();
    
    // 使用 setTimeout 模拟 Vue 的 nextTick
    setTimeout(() => {
      quCommonItemRefs.current.forEach((ref, i) => {
        if (ref && ref.dragClick) {
          ref.dragClick(focusIndex);
        }
      });
    }, 0);
  };

  const refreshData = () => {
    setDragOptions(options);
  };

  return (
    <div>
      {options.map((item, optionIndex) => (
        <DwQuOptionCommon2Item
          key={`quOption2-${index}-${optionIndex}`}
          ref={(el: any) => (quCommonItemRefs.current[optionIndex] = el)}
          survey={survey}
          options={options}
          quIndex={index}
          optionIndex={optionIndex}
          quType={quType}
          onRefreshOptions={refreshOptions}
        />
      ))}
    </div>
  );
};

export default DwQuOptionCommon2;

import React, { useRef, useState } from 'react';
import DwQuOptionCommon1Item, { Option } from './DwQuOptionCommon1Item';

interface Survey {
  questions: Array<{
    cellCount: number;
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface DwQuOptionCommon1Props {
  index: number;
  options: Option[];
  survey: Survey;
  quType: string;
  answer?: Record<string, any>;
  onUpdateOptions?: (options: Option[]) => void;
}

const DwQuOptionCommon1: React.FC<DwQuOptionCommon1Props> = ({
  index,
  options,
  survey,
  quType,
  answer = {},
  onUpdateOptions
}) => {
  const [dragOptions, setDragOptions] = useState<Option[]>(options);
  const [drag, setDrag] = useState(false);
  const quCommonItemRefs = useRef<any[]>([]);

  const onStart = () => {
    setDrag(true);
  };

  const onEnd = () => {
    setDrag(false);
    refreshOptions(null);
  };

  const upAllItemClick = () => {
    // 重置所有状态
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

  return (
    <div>
      <div>
        <div 
          className="dw-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${survey.questions[index].cellCount}, minmax(auto,1fr))`,
            alignItems: 'flex-start'
          }}
        >
          {options.map((item, optionIndex) => (
            <div key={`quOption1-${index}-${optionIndex}`} style={{ width: '100%' }}>
              <DwQuOptionCommon1Item
                ref={(el: any) => (quCommonItemRefs.current[optionIndex] = el)}
                survey={survey}
                options={options}
                quIndex={index}
                optionIndex={optionIndex}
                quType={quType}
                onRefreshOptions={refreshOptions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DwQuOptionCommon1;

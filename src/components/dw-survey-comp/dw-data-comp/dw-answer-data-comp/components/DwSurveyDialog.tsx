import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Popover } from 'antd';
import image01 from '@/assets/image/resource/dw-info/image01.png';
import image02 from '@/assets/image/resource/dw-info/image02.jpg';
import image03 from '@/assets/image/resource/dw-info/img03.png';

interface Props {}

export interface DwSurveyDialogRef {
  openDialog: () => void;
}

const DwSurveyDialog = forwardRef<DwSurveyDialogRef, Props>((_, ref) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      setDialogVisible(true);
    }
  }));

  const gotoDw = () => {
    window.open('https://www.diaowen.net?s0=oss&v1=2501&e5=dsm0', '_blank');
  };

  return (
    <div className="dwSurveyMyDialog">
      <Modal
        title="调问产品团队"
        open={dialogVisible}
        onCancel={() => setDialogVisible(false)}
        width={700}
        footer={null}
        bodyStyle={{ padding: '10px 20px' }}
      >
        <div style={{ fontSize: 14, lineHeight: '170%', padding: 10, color: 'rgb(119 119 119)' }}>
          <div>
            <div>尊敬的用户，欢迎您开启全新的问卷系统之旅！</div>
          </div>
          <div style={{ padding: '10px 0' }}>
            ✨ 🎉历经安装部署，此刻调问问卷系统已准备就绪，即将成为您洞察各方信息的得力工具。
            我们深知问卷调研对您的重要性，🥇调问经历12年的开源沉淀，🔥数千家企业的实际检验。无论是过去、现在，还是将来，调问都尽自己最大的努力打磨每一个功能细节。
          </div>
          <div style={{ padding: '10px 0' }}>
            🎉 🫣您可以添加我们的产品经理微信，若使用中遇到任何问题，我们随时为您排忧解难❤️👍。也可关注我们的公众号，实时了解调问的每一个迭代和我们对问卷系统的一些感悟。🤝
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                <div style={{ backgroundColor: 'rgb(10 125 102)', padding: 15, borderRadius: 5 }}>
                  <div style={{ textAlign: 'center', color: 'white', letterSpacing: 1 }}>
                    <div>任何问题，都可加我</div>
                    <div>一对一为你免费解答</div>
                  </div>
                  <div style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                    <img src={image01} width={130} style={{ borderRadius: 5 }} alt="产品经理" />
                    <div style={{ textAlign: 'center' }}>
                      <div>调问产品经理</div>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgb(10 125 102)', padding: 15, borderRadius: 5 }}>
                  <div style={{ textAlign: 'center', color: 'white', letterSpacing: 1 }}>
                    <div>使用帮助，技术资料</div>
                    <div>这里都有关注我们吧</div>
                  </div>
                  <div style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                    <img src={image02} width={130} style={{ borderRadius: 5 }} alt="官方公众号" />
                    <div style={{ textAlign: 'center' }}>
                      <div>官方公众号</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: '10px 0' }}>
            你也可以在开源社区👋 👋 （
            <a href="https://github.com/wkeyuan/DWSurvey" target="_blank" rel="noopener noreferrer">
              Github
            </a>
            {' '}
            \
            <a href="https://gitee.com/wkeyuan/DWSurvey" target="_blank" rel="noopener noreferrer">
              Gitee
            </a>
            ）上随时抛问题、提需求，我们会认真对待每一个社区上的留言。
            我们的开源之路，离不开您的鼓励 💪，感谢您在开源社区为我们
            <Popover
              placement="topLeft"
              trigger="hover"
              content={<img src={image03} width={330} alt="Star" />}
            >
              <a href="https://gitee.com/wkeyuan/DWSurvey" style={{ color: 'rgb(208 154 1)' }}>
                点亮 ⭐ Star
              </a>
            </Popover>
          </div>
          <div style={{ padding: '10px 0' }}>
            🙏❤️愿调问问卷在未来为您的决策提供坚实依据，高效助力您的工作开展。
          </div>

          <div style={{ marginTop: 10 }}>
            <div>
              调问网产品团队
              <span style={{ marginLeft: 10 }}>2025年01月22号 23时58分</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid gray', marginTop: 10, paddingTop: 10 }}>
            <div>
              官方网站：
              <a href="https://www.diaowen.net?s0=oss&v1=2501&e5=dsf0" target="_blank" rel="noopener noreferrer">
                https://www.diaowen.net
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default DwSurveyDialog; 
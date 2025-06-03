import {message as Message, Modal} from 'antd'

export function msgError (message: string) {
  Message.error(message)
}
export function msgInfo (message: string) {
  Message.info(message)
}

export function msgWarning (message: string) {
  Message.warning(message)
}

export function msgBoxNoLogin () {
  window.location.href = '/#/login'
  Modal.confirm({
    title: '未登录状态，是否重新登录',
    okText: '重新登录',
    cancelText: '取消',
    type: 'warning',
    onOk: () => {
      window.location.href = '/#/login'
    }
  })
}

export function msgBoxNoRole () {
  Modal.confirm({
    title: '账号没有相关操作权限',
    okText: '确认',
    cancelText: '取消',
    type: 'warning',
    onOk: () => {
      window.location.href = '/#/'
    }
  })
}

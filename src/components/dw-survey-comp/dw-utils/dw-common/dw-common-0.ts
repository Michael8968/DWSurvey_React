
/**
 * 统一本地存储对于key名称处理
 * @param surveyId
 * @param type
 * @returns {null}
 */
export function buildSurveyLocalStorageKey (surveyId: any, type: any) {
  const storageKey = `${surveyId}_${type}`
  // console.debug('storageKey', storageKey)
  return storageKey
}

/**
 * 将json对象保存到本地存储
 * @param storageKey
 * @param jsonValue
 */
export function saveJsonObj2LocalStorage (storageKey: any, jsonValue: any) {
  localStorage.setItem(storageKey, JSON.stringify(jsonValue))
}

export function getLocalStorageByKey (storageKey: any) {
  return localStorage.getItem(storageKey)
}

export function getLocalStorageByKeyword (storageKeyword: any) {
  const keys: any[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key!==null && key.includes(storageKeyword)) {
      keys.push(key)
    }
  }
  return keys
}

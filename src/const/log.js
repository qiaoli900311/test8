// log埋点接口
const logApi = `http://39.105.18.216:8083/api/v1/log/`
import Vue from 'vue'

/**
 * 普通事件埋点接口
 * @param obj 埋点对象
 */
export function commonLog(obj, that) {
  // 字段名 业务含义
  // time  操作时间
  // memberId  会员Id
  // module  事件模块（用于对普通事件进行第一层划分）
  // actionCode  操作编码（用于对普通事件进行第二层划分）
  // targetId  目标Id（可选）
  // activityId  活动Id
  let commonBody = {
    logType: 2,
    mapValue: obj
  }
  // that.$axios
  //   .$post(logApi, commonBody)
  //   .then(res => {})
  //   .catch(e => console.log(e))
}

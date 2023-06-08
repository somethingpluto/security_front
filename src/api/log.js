import request from '@/utils/request'

export function getLogList(pageNum, pageSize) {
  return request({
    url: `/log/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get'
  })
}

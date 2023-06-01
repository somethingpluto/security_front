import request from '@/utils/request'

export function getRecordsData(pageNum, pageSize) {
  return request({
    url: `/records/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

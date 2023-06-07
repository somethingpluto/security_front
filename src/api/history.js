import request from '@/utils/request'

export function getRecordsData(pageNum, pageSize) {
  return request({
    url: `/records/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

export function getRecordsDataByLabel(pageNum, pageSize, label) {
  return request({
    url: `/records/list?pageSize=${pageSize}&pageNum=${pageNum}&label=${label}`,
    method: 'get'
  })
}

export function getIpStatisticData() {
  return request({
    url: `/records/ip`,
    method: 'get'
  })
}

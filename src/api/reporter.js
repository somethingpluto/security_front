import request from '@/utils/request'

export function getReporterData(params) {
  return request({
    url: '/records/reports',
    method: 'get',
    params
  })
}

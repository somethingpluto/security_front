import request from '@/utils/request'

export function getModeList() {
  return request({
    url: `/version/list`,
    method: 'get'
  })
}

import request from '@/utils/request'

export function getBlackIpList(pageNum, pageSize) {
  return request({
    url: `/blacklist/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'get'
  })
}

export function addIptoBlackList(ip) {
  return request({
    url: `/blacklist/add`,
    method: 'post',
    data: { ip: ip }
  })
}


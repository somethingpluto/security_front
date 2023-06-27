import request from '@/utils/request'

export function fetchModeList() {
  return request({
    url: '/instances/',
    method: 'get'
  })
}

export function runningMode(id) {
  return request({
    url: `/pty/start/${id}`,
    method: 'get'
  })
}

export function stopMode(id) {
  return request({
    url: `/pty/stop/${id}`,
    method: 'get'
  })
}

export function deleteMode(id) {
  return request({
    url: `/instances/withFile/${id}`,
    method: 'delete'
  })
}

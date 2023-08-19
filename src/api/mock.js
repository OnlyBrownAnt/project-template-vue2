import {request} from "@/utils/request";

export function mockApi001(data = {}, params = {}) {
  return request({headers: {encrypt: false, isStopCatchAllError: true}, url: '/api001', method: 'post', params, data})
}

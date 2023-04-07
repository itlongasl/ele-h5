import request from './request';

export const testRequest = () => {
  return request({
    url: '/test',
    method: 'get'
  });
};

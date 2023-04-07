import axios from 'axios';
import { showDialog } from 'vant';

const instance = axios.create({
  baseURL: 'api',
  timeout: 5000
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  const { data: _data } = response;
  // 解构出数据
  const { data, code, msg } = _data;
  // 当code不等于0，就判断其请求失败
  if (code !== 0) {
    showDialog({
      message: msg
    }).then(() => {});
    return Promise.reject(msg);
  }
  // 请求成功返回data
  return data;
});

export default instance;

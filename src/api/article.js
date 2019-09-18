import request from './base';

export function getArticleList(params) {
  return request.get('/api/article/list', { params });
}
export function getArticle(params) {
  return request.get('/api/article/info', { params });
}
export function addArticle(params) {
  return request.post('/api/article/addUserProject', params);
}
export function updateArticle(params) {
  return request.post('/api/article/modifyUserProject', params);
}
export function deleteArticle(params) {
  return request.delete('/api/article/remove', { params });
}

import request from './index'


//获取根节点数据
export const getClassifyTree = (data:any) => {
  return request({
    url: "/minum/rag/v1/classify/get_tag_tree",
    method: "post",
    data,
  })
}

//根据 id获取信息
export const getClassifyDetail = (data:any) => {
  return request({
    url: "/minum/rag/v1/classify/get_tag_files",
    method: "post",
    data,
  })
}
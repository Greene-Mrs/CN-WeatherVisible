import instance from '../instance'

// 获取空气指数散点数据
// 导出一个函数getAqiScatter，用于获取空气质量散点图数据
export const getAqiScatter = (type: string) => {
  // 使用instance函数发送GET请求，获取空气质量散点图数据
  return instance({
    method: 'GET',
    url: `/data/scatter/aqi?type=${type}`,
  })
}

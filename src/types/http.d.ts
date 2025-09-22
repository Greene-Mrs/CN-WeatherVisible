// 位置信息参数
export interface Coord {
  lat: number
  lng: number
}

// 返回数据格式
export type Res<Data> = {
  status: number /* 响应的状态码 */
  type: string
  message: string
  data: Data
  infoType?: string/* 额外的信息类 */
}

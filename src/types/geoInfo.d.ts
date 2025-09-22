import type { Res } from '@/types/http'//Res数据格式

interface landData {/* 描述地理位置数据 */
  formatted_address: string/* 格式化后的地址 */
  location: {
    lon: number
    lat: number
  }
  addressComponent: {
    address: string
    city: string
    county_code: string/* 县/区代码 */
    nation: string
    poi_position: string
    county: string
    city_code: string
    address_position: string
    poi: string
    province_code: string
    province: string
    road?: string
    road_distance?: number
    poi_distance: number
    address_distance: number
    info?: string
  }
}
// 定义一个接口seaareaData，用于存储地图区域数据
interface seaareaData {
  formatted_address: string
  addressComponent: {
    city: []
    province: string
    adcode: string/* 行政区划代码 */
    district: []/* 区县名称 */
    towncode: []/* 乡镇代码 */
    streetNumber: {
      number: []
      direction: []/* 方向 */
      distance: []
      street: []
    }
    country: string
    township: []/* 乡镇名称 */
    seaArea: string
    businessAreas: [[]]
    building: {
      name: []
      type: []
    }
    neighborhood: {/* 社区名称和类型 */
      name: []
      type: []
    }
    citycode: []
  }
}
interface pointData {
  location: string
}

type LocationGeoData = landData | seaareaData | pointData/* 地理数据对象 */

export type LocationGeoRes = Res<LocationGeoData>

/* 返回数据格式
 type Res   <Data> = {
  status: number 响应的状态码 
  type: string
  message: string
  data: Data
  infoType?: string 国内外
}
 */

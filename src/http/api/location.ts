import instance from '../instance'
import type { Coord } from '@/types/http'
import type { LocationGeoRes } from '@/types/geoInfo.d.ts'
import type { LocationBaseElementRes} from '@/types/weaInfo.d.ts'
import { LocationAqiRes } from '@/types/aqiInfo'

// 获取地理信息
export const getLocationGeo = ({ lat, lng }: Coord): Promise<LocationGeoRes> => {
  return instance({
    method: 'GET',
    url: `/location/geo?lat=${lat}&lon=${lng}`,
  })
}
// 获取天气信息
export const getLocationBaseElement = ({ lat, lng }: Coord): Promise<LocationBaseElementRes> => {
  return instance({
    method: 'GET',
    url: `/location/basel?lat=${lat}&lon=${lng}`,
  })
}
// 获取空气指数
export const getLocationAqiQuality = ({ lat, lng }: Coord): Promise<LocationAqiRes> => {
  return instance({
    method: 'GET',
    url: `/location/aqiquality?lat=${lat}&lon=${lng}`,
  })
}

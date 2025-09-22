import type { Res } from '@/types/http'

interface AqisData {
  // 空气质量类型总数aqi
	[key: string]: string
  PM2p5_Densty: string   // PM2.5浓度
  V15471_IAQI: string    //PM10浓度
  V_PPOLLU: string      //首要污染物
  V15826_08: string    //臭氧8小时
  V15810: string       //二氧化硫浓度
  V15826_01_IAQI: string     //臭氧1小时浓度
  V_PROV: string      // 省份
  V_AQI: string        // AQI指数
  V15471: string        // PM10
  V15826_08_IAQI: string  //臭氧8小时浓度
  V15823_IAQI: string      //一氧化碳
  D_DATETIME: string    // 时间
  V15817: string       //二氧化氮
  Lon: string          // 经度
  V15472_IAQI: string
  V_CITY: string          // 城市
  Station_SiteName: string      // 站点名称
  V15823: string             //一氧化碳浓度
  V15817_IAQI: string            // 二氧化氮浓度
  V15810_IAQI: string             // 二氧化硫浓度
  V15826_01: string             // 臭氧1小时
  V_QUAL: string          // 空气质量
  PM10_Densty_Fore: string     // PM10浓度预测值
  STATION_Id_C: string    // 站点编码
  Lat: string         //  纬度
}

interface LocationAqiData {
  // 本地空气质量类型总数aqi
  returnCode: number
  elementNames: string

  elements: string
  units: string
  message: string
  data: AqisData
}

export type LocationAqiRes = Res<LocationAqiData>

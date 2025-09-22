import { DR, BC } from '@/assets/ts'  //引用了风向、仪表盘
import { LocationGeoRes } from '@/types/geoInfo'  //地理位置格式

// 格式化地理信息
export const formatAddress = (res: LocationGeoRes) => {//格式化不同类型的地理位置信息
  //国内的
  if (res.infoType === 'domestic' && 'addressComponent' in res.data && 'poi' in res.data.addressComponent) {
    const province = res.data.addressComponent.province
    const city = res.data.addressComponent.city
    const county = res.data.addressComponent.county
    const poi = res.data.addressComponent.poi
    const nonEmptyComponents = [province, city, county, poi].filter((component) => component.length !== 0)
    return nonEmptyComponents.slice(-3).join('—')
    //过滤掉空属性，取最后三个非空属性，用—连接返回
  } else if (
    res.infoType === 'abroad' &&
    'addressComponent' in res.data &&
    'nation' in res.data.addressComponent//国外的
  ) {
    const nation = res.data.addressComponent.nation
    const poi = res.data.addressComponent.poi
    return [nation, poi].join('—')
  } else if (
    res.infoType === 'seaArea' &&
    'addressComponent' in res.data &&
    'seaArea' in res.data.addressComponent//海洋区域
  ) {
    const province = res.data.addressComponent.province
    const seaArea = res.data.addressComponent.seaArea
    return [province, seaArea].join('—')
  } else if (res.infoType === 'point' && 'location' in res.data && typeof res.data.location === 'string'
    //点数据
  ) {
    let str = res.data.location
// 将字符串str按照逗号分隔，并将分隔后的字符串数组中的每个元素转换为浮点数，分别赋值给longitude和latitude
    let [longitude, latitude] = str.split(',').map(parseFloat)
    console.log('longitude, latitude', longitude, latitude)
    let absLongitude = Math.abs(longitude)
// 将经度转换为绝对值，保留两位小数，并添加度数符号
    let formattedLongitude = absLongitude.toFixed(2) + '°' + (longitude >= 0 ? 'E' : 'W')
    let absLatitude = Math.abs(latitude)
    let formattedLatitude = absLatitude.toFixed(2) + '°' + (latitude >= 0 ? 'N' : 'S')

    return `(${formattedLongitude},${formattedLatitude})`
  }
}
// 格式化风向信息
export const formatWind = (degree: number) => {
  for (var i = 0; i < DR.length; i++) {
    if (degree >= DR[i][0] && degree <= DR[i][1]) {
      return DR[i][2]
    }
  }
  return '无效的风向值'
}
// 格式化风速信息
export const formatWins = (windSpeed: number) => {
  var speeds = [0.5, 1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7]
  for (var i = 0; i < speeds.length; i++) {
    if (windSpeed < speeds[i]) {
      return i + '级'
    }
  }
  return 12 + '级'
}

// 获得仪表盘各项颜色
export const getColor = (value: number) => {
  if (value < 50) {
    return BC[0][1]
  } else if (value < 100) {
    return BC[1][1]
  } else if (value < 150) {
    return BC[2][1]
  } else if (value < 200) {
    return BC[3][1]
  } else if (value < 300) {
    return BC[4][1]
  } else {
    return BC[5][1]
  }
}

// 将获取的散点数据转为 GeoJSON 格式
export const convertToGeoJSON = (data: any) => {
  return {
    type: 'FeatureCollection',// GeoJSON 类型
    features: data.map((item: any) => ({
      type: 'Feature',
      properties: {
        unit: item.unit,// 发布单位
        code: item.code,
        province: item.province,
        city: item.city,
        name: item.name,
        id: item.id,
        value: item.value,
      },
      geometry: {
        type: 'Point',
        coordinates: [item.lon, item.lat],// 经纬度
      },
    })),
  }
}

// 获得散点颜色
export const getScatterColor = (val: number, valArr: number[], colorArr: string[]) => {
  //查找第一个大于或等于val的数值的索引
  const index = valArr.findIndex((item) => {
    return item >= val
  })
  if (index === -1) {
    return colorArr.at(-1)
  }
  return colorArr[index]
}

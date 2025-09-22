// 风向
import type { ColorScale } from '@/types/const.d.ts'//颜色比例尺

export const DR: [number, number, string][] = [
  [350, 360, '北风'],
  [0, 10, '北风'],
  [10, 35, '北偏东'],
  [35, 55, '东北风'],
  [55, 80, '东偏北'],
  [80, 100, '东风'],
  [100, 125, '东偏南'],
  [125, 145, '东南风'],
  [145, 170, '南偏东'],
  [170, 190, '南风'],
  [190, 215, '南偏西'],
  [215, 235, '西南风'],
  [235, 260, '西偏南'],
  [260, 280, '西风'],
  [280, 305, '西偏北'],
  [305, 325, '西北风'],
  [325, 350, '北偏西'],
]

// 空气指数类型 
export const AQI = [
  {
    name: 'PM2.5',
    key: 'PM2p5_Densty',
  },
  {
    name: 'PM10',
    key: 'PM10_Densty_Fore',
  },
  {
    name: 'CO',
    key: 'V15823',
  },
  {
    name: 'NO2',
    key: 'V15817',
  },
  {
    name: 'SO2',
    key: 'V15810',
  },
  {
    name: 'O3',
    key: 'V15826_01',
  },
]
// 仪表盘基准色
export const BC: [number, string][] = [
  [0.1, '#08e508'],
  [0.2, '#ffff08'],
  [0.3, '#ff8208'],
  [0.4, '#ff0808'],
  [0.5, '#9c0852'],
  [1, '#8b2c47'],
]
// 颜色刻度 
export const CS: ColorScale = {
  V_AQI: {
    name: '空气质量',
    type: 'scatter',
    unit: '',
    code: 'V_AQI',
    value: [50, 100, 150, 200, 250, 300],
    text:  [50, 100, 150, 200, 250, 300],
    color: ['#26b086', '#edc444', '#f19e2e',  '#9959ba', '#8b2c47','#ea0c0c'],
  },
  PM2p5_Densty: {
    name: 'PM2.5',
    type: 'scatter',
    unit: 'ug/m³',
    code: ' PM2p5_Densty',
    value: [10, 20, 100, 200, 1000],
    text: [10, 20, 100, 200, 1000],
    color: ['#006698', '#7cb5cf', '#b9c59a', '#dd803d', '#9959ba', '#4b0c00'],
  },
  V15471: {
    name: 'PM10',
    type: 'scatter',
    unit: 'ug/m³',
    code: ' V15471',
    value: [10, 20, 100, 200, 1000],
    text: [10, 20, 100, 200, 1000],
    color: ['#006698', '#7cb5cf', '#b9c59a', '#dd803d', '#9959ba', '#4b0c00'],
  },
  V15810: {
    name: '二氧化硫',
    type: 'scatter',
    unit: 'ug/m³',
    code: 'V15810',
    value: [1, 5, 10, 40, 80],
    text: [1, 5, 10, 40, 80],
    color: ['#acacac', '#9d843b', '#94650f', '#5f522a', '#660b00'],
  },
  V15817: {
    name: '二氧化氮',
    type: 'scatter',
    unit: 'ug/m³',
    code: 'V15817',
    value: [1, 5, 25, 50, 100],
    text: [1, 5, 25, 50, 100],
    color: ['#006698', '#7cb5cf', '#b9c59a', '#dd803d', '#9959ba', '#4b0c00'],
  },
  V15826_01: {
    name: '臭氧1小时',
    type: 'scatter',
    unit: 'ug/m³',
    code: 'V15826_01',
    value: [1, 5, 25, 50, 100],
    text: [1, 5, 25, 50, 100],
    color: ['#006698', '#7cb5cf', '#b9c59a', '#dd803d', '#9959ba', '#4b0c00'],
  },
  V15823: {
    name: '一氧化碳',
    type: 'scatter',
    unit: 'ug/m³',
    code: 'V15823',
    value: [1, 5, 25, 50, 100],
    text: [1, 5, 25, 50, 100],
    color: ['#006698', '#7cb5cf', '#b9c59a', '#dd803d', '#9959ba', '#4b0c00'],
  },
}
// 菜单项-空气质量-散点图层
export const MT_scatter = [
  { type: 'scatter', name: '空气质量指数', unit: '', code: 'V_AQI', icon: 'aqiValue' },
  { type: 'scatter', name: 'PM2.5浓度', unit: '', code: 'PM2p5_Densty', icon: 'PM2p5' },
  { type: 'scatter', name: 'PM10浓度', unit: '', code: 'V15471', icon: 'PM10' },
  { type: 'scatter', name: '二氧化硫浓度', unit: '', code: 'V15810', icon: 'SO2' },
  { type: 'scatter', name: '二氧化氮浓度', unit: '', code: 'V15817', icon: 'NO2' },
  { type: 'scatter', name: '臭氧1小时浓度', unit: '', code: 'V15826_01', icon: 'O3' },
  { type: 'scatter', name: '一氧化碳浓度', unit: '', code: 'V15823', icon: 'CO' },
]

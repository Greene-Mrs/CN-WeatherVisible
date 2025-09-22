// 定义一个ColorScaleItem接口，用于表示颜色比例尺的每一项
// 导出一个接口ColorScaleItem，用于定义颜色比例尺的项
export interface ColorScaleItem {  //添加export 本身为导出，interface为接口模板
  // 名称
  name: string
  // 单位
  unit: string
  // 类型
  type: string
  // 代码
  code: string
  // 值  确保 value 数组和 color 数组的长度一致，以便正确地将数值映射到颜色上
  value: number[]
  // 文本
  text?: string[] | number[]
  // 颜色
  color: string[]
}

export type ColorScale = {
  // 颜色比例尺
  [key: string]: ColorScaleItem
}

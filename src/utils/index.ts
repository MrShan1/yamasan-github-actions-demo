// 首字母大写
// 例：add-location -> AddLocation
export function capitalizeString(str: string) {
  const words = str.split('-')
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

export default function getDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const deltaX = x2 - x1
  const deltaY = y2 - y1
  // Euclidean distance formula
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
  return distance
}

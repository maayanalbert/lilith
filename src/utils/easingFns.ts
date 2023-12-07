export function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

export function easeInSine(x: number): number {
  return 1 - Math.cos((x * Math.PI) / 2)
}

export function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2)
}

export function easeInQuad(x: number): number {
  return x * x
}

export function easeInCustom(x: number): number {
  return (x * x * x) / 2
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x)
}

export function easeInCubic(x: number): number {
  return x * x * x
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3)
}

export function easeInQuart(x: number): number {
  return x * x * x * x
}

export function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4)
}

export function easeInQuint(x: number): number {
  return x * x * x * x * x
}

export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5)
}

export function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

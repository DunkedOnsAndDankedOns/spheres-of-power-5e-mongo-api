export default interface Ability {
  sphereId: string

  castingTime: string
  range: string
  duration: string
  description: string
  target?: string
  area?: string
  savingThrow?: Stat | 'varies'
  cost: number | number[]
}

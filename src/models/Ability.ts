export default interface Ability {
  castingTime: string
  range: string
  duration: string
  target?: string
  area?: string
  savingThrow?: Stat | 'varies'
  cost: number | number[]
  description: string
}

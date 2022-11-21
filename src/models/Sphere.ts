interface Talent {
  name: string
  cost: number
  description: string
  prerequisites?: string
}

interface Ability {
  castingTime: string
  range: string
  duration: string
  description: string
  target?: string
  area?: string
  savingThrow?: Stat | 'varies'
  cost: number | number[]
}

export default interface Sphere {
  name: string
  description: string
  talents: { 
    name: string, 
    intro?: string,
    talents: Talent[]
  }[]
  abilities: Ability[]
}

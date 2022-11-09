export default interface Talent {
  sphereId: string
  abilityId?: string

  name: string
  cost: number
  description: string
  prerequisites?: string
}

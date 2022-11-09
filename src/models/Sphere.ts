import Talent from './Talent'

type Talents = Record<string, {
  intro?: string
  talents: Talent[]
}>

export default interface Sphere {
  name: string
  description: string
  talents: Talents
}

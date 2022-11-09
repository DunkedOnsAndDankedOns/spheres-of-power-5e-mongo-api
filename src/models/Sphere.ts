import Talent from './Talent'

type Talents = Record<string, {
  intro?: string
  list: Talent[]
}>

type Variants = Record<string, string>

export default interface Sphere {
  name: string
  description: string
  abilities: any[]
  talents: Talents
  variants?: Variants
}

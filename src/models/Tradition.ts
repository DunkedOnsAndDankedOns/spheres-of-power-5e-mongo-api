type Drawbacks = Record<string, string>
type Boons = Record<string, string>

export default interface Tradition {
  name: string
  drawbacks: Drawbacks
  boons: Boons
  keyAbility: Stat
}

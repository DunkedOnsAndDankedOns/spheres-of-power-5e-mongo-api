import Feature from './Feature'

export default interface CharacterClass {
  name: string
  hitDie: Die

  savingThrows: Stat[][]

  // Associations
  features: Feature[]
  specializations: Feature[]
  
  magicTalents: Record<Level, number>
  spellPoints: Record<Level, number>

  classAbilityDie?: Record<Level, Die>
}

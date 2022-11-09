interface Feature {
  name: string
  level: Level
  description: string
}

export default interface CharacterClass {
  name: string
  hitDie: Die

  savingThrows: Stat[][]

  features: Feature[]
  specializations: Record<string, Feature[]>
  
  magicTalents: Record<Level, number>
  spellPoints: Record<Level, number>

  classAbilityDie?: Record<Level, Die>
}

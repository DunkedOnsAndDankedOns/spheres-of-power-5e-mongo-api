import CharacterSphere from './CharacterSphere'

export default interface Character {
  name: string
  armorClass: number

  stats: Record<Stat, { score: number, modifier: number }>
  traditionId: string

  speed: { [key in Movement]?: number }
  
  race: string
  background: string

  languages?: Language[]

  currency: { [key in Currency]?: number }

  inventoryItemIds: string[]
  
  hitPoints: {
    current: number
    max: number
    rolled: number
    temporary: number
  }

  /**
   * Map from die sides to hit dice currenlty left
   */
  hitDiceCurrent: Record<Die, number> 

  spellPool: {
    current: number
    max: number
  }

  /**
   * Map from class id to number of levels
   */
  levels: Record<string, Level>

  spheres: CharacterSphere[]

  alignment?: string
  backstory?: string
  allies?: Record<string, string>
  enemies?: Record<string, string>
  notes?: string

  deathSaves?: {
    success?: number
    fail?: number
  }
}

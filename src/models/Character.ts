import HitPoints from "../types/HitPoints"

export default interface Character {
  name: string
  armorClass: number

  stats: Stats
  traditionId: string

  speed: { [key in Movement]?: number }
  
  race: string
  background: string

  languages?: Language[]

  currency: { [key in Currency]?: number }

  inventoryItemIds: string[]
  
  hitPoints: HitPoints

  /**
   * Map from die sides to hit dice currenlty left
   */
  hitDiceCurrent: { [key in Die]?: number }

  spellPool: {
    current: number
    max: number
  }

  /**
   * Map from class id to number of levels
   */
  levels: Record<string, Level>

  classIds: string[]

  sphereIds: string[]

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

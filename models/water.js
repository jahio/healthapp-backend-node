const db = require('../lib/db')
const log = require('../lib/log')

class Water {
  constructor(ml) {
    this.ml = ml
  }

  async save() {
    try {
      log.debug(this)
      var water = await db.water_entry.upsert({
        where: { id: this.id },
        update: {
          ml: this.ml
        },
        create: {
          ml: this.ml
        }
      })
      log.debug(water)
      return water
    } catch(e) {
      log.error(e)
      throw(e)
    }
  }

  static async create(ml) {
    try {
      log.debug(this)
      var water = await db.water_entry.create({
        data: {
          ml: ml
        }
      })
      log.debug(water)
      return water
    } catch(e) {
      log.error(e)
      throw(e)
    }
  }

  static async between(oldest, newest) {
    try {
      log.debug(this)
      log.debug(oldest)
      log.debug(newest)
      var water_entries = await db.water_entry.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        where: {
          createdAt: {
            gte: oldest,
            lte: newest
          }
        }
      })
      return water_entries
      log.debug(water_entries)
    } catch(e) {
      log.error(e)
      throw(e)
    }
  }
}

module.exports = Water

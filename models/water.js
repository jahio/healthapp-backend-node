const db = require('../lib/db')

class Water {
  constructor(ml) {
    this.ml = ml
  }

  async save() {
    try {
      var water = await db.water_entry.upsert({
        where: { id: this.id },
        update: {
          ml: this.ml
        },
        create: {
          ml: this.ml
        }
      })
      return water
    } catch(e) {
      throw(e)
    }
  }

  static async create(ml) {
    try {
      var water = await db.water_entry.create({
        data: {
          ml: ml
        }
      })
      return water
    } catch(e) {
      throw(e)
    }
  }

  static async between(oldest, newest) {
    try {
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
    } catch(e) {
      throw(e)
    }
  }
}

module.exports = Water

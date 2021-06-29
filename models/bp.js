const db = require('../lib/db')

class BP {
  constructor(diastolic, systolic, heartrate) {
    this.diastolic = diastolic
    this.systolic = systolic
    this.heartrate = heartrate
  }

  // Returns all entries between dates oldest and newest (inclusive)
  // WARNING: Both oldest and newest must be JavaScript native date objects
  static async between(oldest, newest) {
    try {
      var bp_entries = await db.bp_entry.findMany({
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
      return bp_entries
    } catch(e) {
      throw(e)
    }
  }

  async save() {
    try {
      await db.bp_entry.upsert({
        where: { id: this.id },
        update: {
          diastolic: this.diastolic,
          systolic:  this.systolic,
          heartrate: this.heartrate
        },
        create: {
          diastolic: this.diastolic,
          systolic:  this.systolic,
          heartrate: this.heartrate
        }
      })
    } catch(e) {
      throw(e)
    }
  }

  static async create(diastolic, systolic, heartrate) {
    try {
      var bp = await db.bp_entry.create({
        data: {
          diastolic: diastolic,
          systolic:  systolic,
          heartrate: heartrate
        }
      })
      return bp
    } catch(e) {
      throw(e)
    }
  }
}

module.exports = BP

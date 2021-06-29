// This file is used by Node to pick up all the others
const HomeController  = require('./home')
const WaterController = require('./water')
const BPController    = require('./bp')

module.exports = exports = {
  HomeController:  HomeController,
  WaterController: WaterController,
  BPController:    BPController
}

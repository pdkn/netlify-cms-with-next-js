const fs = require('fs-extra')
const { join } = require('path')
const { promisify } = require('util')
const copyFolder = promisify(fs.copy)

module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    await copyFolder(join(dir, 'admin'), join(outDir, 'admin'))
    return defaultPathMap
  },
};

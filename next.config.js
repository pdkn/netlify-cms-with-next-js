const fs = require('fs-extra')
const { join } = require('path')
const { promisify } = require('util')
const copyFile = promisify(fs.copyFile)
const copyFolder = promisify(fs.copy)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const rename = promisify(fs.rename)

require('dotenv').config({ debug: process.env.DEBUG })

module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {

    await copyFolder(join(dir, 'admin'), join(outDir, 'admin'))

    let cmsConfigFile = join(outDir, 'admin/config.yml')
    let contents = await readFile(cmsConfigFile, 'utf8')
    let replaced_contents = contents
      .replace('${CLOUDINARY_CLOUD_NAME}', process.env.CLOUDINARY_CLOUD_NAME)
      .replace('${CLOUDINARY_API_KEY}', process.env.CLOUDINARY_API_KEY)

    let tmpCmsConfigFile = `${cmsConfigFile}.jstmpreplace`
    await writeFile(tmpCmsConfigFile, replaced_contents, 'utf8')
    await rename(tmpCmsConfigFile, cmsConfigFile)

    await copyFile(join(dir, '_redirects'), join(outDir, '_redirects'))

    return defaultPathMap
  },
};

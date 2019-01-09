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

    let headersFile = join(outDir, '_headers')
    await copyFile(join(dir, '_headers'), headersFile)
    let headersContent = await readFile(headersFile, 'utf8')
    let replaced_headersContent = headersContent
      .replace('${ADMIN_USERNAME}', process.env.ADMIN_USERNAME)
      .replace('${ADMIN_PASSWORD}', process.env.ADMIN_PASSWORD)

    let tmpHeadersFile = `${headersFile}.jstmpreplace`
    await writeFile(tmpHeadersFile, replaced_headersContent, 'utf8')
    await rename(tmpHeadersFile, headersFile)

    return defaultPathMap
  },
};

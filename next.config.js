const fs = require('fs-extra')
const { join } = require('path')
const { promisify } = require('util')
const copyFolder = promisify(fs.copy)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const rename = promisify(fs.rename)

module.exports = {
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {

    let contents = await readFile(join(dir, 'admin/config.yml'), 'utf8')
    let replaced_contents = contents
      .replace('${CLOUDINARY_CLOUD_NAME}', env.CLOUDINARY_CLOUD_NAME)
      .replace('${CLOUDINARY_API_KEY}', env.CLOUDINARY_API_KEY)

    let tmpfile = `${file}.jstmpreplace`
    await writeFile(tmpfile, replaced_contents, 'utf8')
    await rename(tmpfile, file)

    await copyFolder(join(dir, 'admin'), join(outDir, 'admin'))
    return defaultPathMap
  },
};

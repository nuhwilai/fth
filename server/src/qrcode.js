const QRCode = require('qrcode')
const Promise = require('bluebird')
const fs = require('fs')
const Canvas = require('canvas')

//known issue: canvas width, height will be overrided by QRCode.toCanvas
//use scale/version to change image size
//version effects max amount of character => current config should handle up to 50 characters
exports.createQrCode = function (str, logoFile) {
  const options = {
    errorCorrectionLevel: 'H',
    scale: 15,
    version:35,
    mode: 'alphanumeric',
  }

  if (!logoFile) {
    return QRCode.toDataURL(str, options)
  }

  let canvas = Canvas.createCanvas(500, 500)
  return drawQrToCanvas(canvas, str, options)
    .then(() => Canvas.loadImage(logoFile))
    .then((logoImage) => {
      let ctx = canvas.getContext('2d')
      let logo_ratio = Math.min(1.0, canvas.width / (logoImage.width * 5))
      let [x, y, w, h] = [
        canvas.width / 2 - (logoImage.width * logo_ratio) / 2,
        canvas.height / 2 - (logoImage.height * logo_ratio) / 2,
        logoImage.width * logo_ratio,
        logoImage.height * logo_ratio,
      ]
      let margin = 4
      ctx.fillRect(x - margin, y - margin, w + margin * 2, h + margin * 2)
      ctx.drawImage(logoImage, x, y, w, h)

      // return writeStreamToFile(toFile, canvas.pngStream())
      return canvas.toDataURL()
    })
}

const drawQrToCanvas = Promise.promisify(QRCode.toCanvas)

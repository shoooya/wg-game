// 主人公
export class Hero {
  constructor (context, x, y, width, height) {
    this.heroImg = new Image()
    this.heroImg.src = '~/static/images/hero.png'
    this.heroImg.addEventListener('load', () => {
      context.drawImage(this.heroImg, 0, 0, this.heroImg.width, this.heroImg.height, this.x, this.y, this.width, this.height)
    })
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.velocity = 2 // この速度で移動を繰り返す
  }

  defaultAnimation () {}

  // オブジェクトを描画する。
  render (context) {
    context.beginPath()
    context.drawImage(this.heroImg, 0, 0, this.heroImg.width, this.heroImg.height, this.x, this.y, this.width, this.height)
    context.fill()
  }
}

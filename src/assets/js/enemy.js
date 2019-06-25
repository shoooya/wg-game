// 敵キャラオブジェクト
export class Enenmy {
  constructor (context, x, y, width, height) {
    this.enemyImg = new Image()
    this.enemyImg.src = '~/static/images/enemy.png'
    this.enemyImg.addEventListener('load', () => {
      context.drawImage(this.enemyImg, 0, 0, this.enemyImg.width, this.enemyImg.height, x, y, width, height)
    })
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.velocity = 0.5 // この速度で移動を繰り返す
  }

  // オブジェクトの状態を更新する
  defaultAnimation () {
    // 高さが140より大きいか100より小さかったら移動方向を反転する。
    if (this.y > 140 || this.y < 100) {
      this.velocity = -this.velocity
    }
    this.y += this.velocity
  }

  // オブジェクトを描画する。
  render (context) {
    context.beginPath()
    context.drawImage(this.enemyImg, 0, 0, this.enemyImg.width, this.enemyImg.height, this.x, this.y, this.width, this.height)
    context.fill()
  }
}

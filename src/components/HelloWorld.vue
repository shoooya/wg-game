<template>
  <div class="game">
    <div id="display" class="container">
        <div class="progress">
            <div id="hp-bar" class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="{width: curHealth / maxHealth * 100 + '%'}"></div>
        </div>
        <div id="total"> {{ curHealth + '/' + maxHealth }} </div>

        <div>
            <canvas id="screen" width="480" height="320"></canvas>
        </div>

        <div id="row">
            <button id="add-damage" class="btn btn-danger" @click="attac">Damage</button>
            <button id="add-heal" class="btn btn-success">Heal</button>
        </div>
    </div>

    <div id="terminal" class="container overflow-auto">
        <div id="message-box">
            {{ msg }}
        </div>
    </div>
  </div>
</template>

<script>
import { Hero } from '../assets/js/hero.js'
import { Enenmy } from '../assets/js/enemy.js'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      msg: 'バトルログ\n ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー\n',
      maxHealth: 500,
      curHealth: 500,
      characterObj: []
    }
  },
  methods: {
    attac: function (event) {
      console.log('attac')
      // ダメージ計算
      let terminal = document.getElementById('terminal')
      if (this.curHealth === 0) {
        this.msg += '敵はもう死んでいる・・・\n'
        terminal.scrollTop = terminal.scrollHeight
      } else {
        var damage = Math.floor((Math.random() * 100) + 50)
        this.curHealth = this.curHealth - damage
        if (this.curHealth < 0) {
          this.curHealth = 0
          this.msg += '敵を倒した！！\n'
          terminal.scrollTop = terminal.scrollHeight
        } else {
          this.msg += `あなたの攻撃： ${damage} のダメージを与えた\n`
          terminal.scrollTop = terminal.scrollHeight
        }
        this.applyChange()
      }
    },
    applyChange: function () {
      this.total = `${this.curHealth} / ${this.maxHealth}`
    },
    loop: function (timestamp) {
      // 前の描画を消す。
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // 各オブジェクトの状態を更新する。
      this.characterObj.forEach((obj) => obj.defaultAnimation())
      // 各オブジェクトを描画する。
      this.characterObj.forEach((obj) => obj.render(this.context))
      // requestAnimationFrameを呼び出す。
      window.requestAnimationFrame((ts) => this.loop(ts))
    }
  },
  mounted: function () {
    console.log('attached')
    this.canvas = document.getElementById('screen')
    this.context = this.canvas.getContext('2d')

    this.characterObj.push(new Enenmy(this.enemyImg, 40, 110, 120, 100))
    this.characterObj.push(new Hero(this.context, 350, 200, 100, 80))
    // アニメーション開始
    window.requestAnimationFrame((ts) => this.loop(ts))
  }
}
</script>

<style scoped>
canvas {
    display: block;
    margin: 0 auto;
}

#display {
    background-image: url("~/static/images/background.jpeg");/* 背景はcssで設定 */
    background-repeat: no-repeat;
    width: 500px;
    padding: 10px;
}

#terminal {
    width: 500px;
    height: 150px;
    background-color: black
}

#message-box {
  text-align: left;
  padding: 5px;
  color: white;
}

#row {
    text-align: right;
}

#total {
    text-align: right;
    color: white;
}

#total,
#message-box {
  font-size: 16px;
  margin: 5px;
}
</style>

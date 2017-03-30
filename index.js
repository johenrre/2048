const bindkeydown = function () {
  document.onkeydown=function(event){
      if (event.keyCode == 38) {
        //按了上
        // t2048.direction = 38
        //实现位移和合并
        t2048.movetop()
        showscore()
        savadata()
      } else if (event.keyCode == 40) {
        //按了下
        t2048.movedown()
        showscore()
        savadata()
      } else if (event.keyCode == 37) {
        //按了左
        t2048.moveleft()
        showscore()
        savadata()
      } else if (event.keyCode == 39) {
        //按了右
        t2048.moveright()
        showscore()
        savadata()
      }
  }
}
//给悔棋绑定事件
const bindhuiqi = function () {
   e('.feature-1').onclick=function (event) {
      t2048.huiqi()
   }
}
//显示分数
const showscore = function () {
  var score1 = e('.score-1 .score-1-num')
  var score2 = e('.score-2 .score-1-num')
  score1.innerHTML = t2048.Scorenow
  if (t2048.Scorenow >= t2048.Scorebest) {
     score2.innerHTML = t2048.Scorenow
     t2048.Scorebest = t2048.Scorenow
  } else {
    score2.innerHTML = t2048.Scorebest
  }
}
//新游戏
const bindnowgame = function () {
    var button = e('.feature-2')
    var spans = es('.square span')
    button.onclick = function (event) {
       for (var i = 0; i < spans.length; i++) {
          spans[i].innerHTML = ''
          t2048.shanchuclass(spans[i])
          // log('xx', spans[i])
       }
       //
       t2048.newgame()
       showscore()
    }
}
//保存数据
const savadata = function () {
    let map = t2048.map
    let Scorenow = t2048.Scorenow
    let Scorebest = t2048.Scorebest
    var data = {
      'map' : map,
      'Scorenow' : Scorenow,
      'Scorebest' : Scorebest,
    }
    localStorage.data2048 = JSON.stringify(data)
}
//载入数据
const loaddata = function () {
   var result = {}
   if (localStorage.data2048 == undefined) {
     t2048.first = true
     var result = {
       'map' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       'Scorenow' : 0,
       'Scorebest' : 0,
     }
   } else {
     t2048.first = false
     var result = JSON.parse(localStorage.data2048)
   }
   return result
}

var t2048 = new TB2048

const bindeventall = function () {
  // bindcloseweb()
  bindnowgame()
  bindkeydown()
  bindhuiqi()
}

const _main = function () {
  bindeventall()
  var data = loaddata()
  t2048.init(data)
  //
  showscore()

}
_main()

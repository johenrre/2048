
const getcurren = function (arr) {
      let len = arr.length
      let a = arr[Math.floor(Math.random()*len)]
      return a
}

const apeednub = function (selector) {
    let Rand = Math.random()
    if (Rand > 0.7) {
       selector.innerHTML = 4
       selector.classList.add('value4')
       playAnimation(selector, 'new-one')
    } else {
       selector.innerHTML = 2
       selector.classList.add('value2')
       playAnimation(selector, 'new-one')
    }
}
//实现显示随机2或者4
const shownub = function () {
  var square = es('.square span')
   var span = []
   for (var i = 0; i < square.length; i++) {
       if (square[i].innerHTML == '') {
           span.push(square[i])
       }
   }
   if (span.length != 0) {
     var randnub = getcurren(span)
     apeednub(randnub)
   } else {
      //测试是不是赢了
      return
   }
}

const removevalue = function (value, innerHTML) {
  let className = `value${innerHTML}`
  value.classList.remove(className)
  value.innerHTML = ''
}

const newvalue = function (value, innerHTML) {
  let a = innerHTML
  let className = `value${a}`
  value.classList.add(className)
  value.innerHTML = a
}

const deletezero = function (arr) {
    let a = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != 0) {
            a.push(arr[i])
      }
    }
    return a
}

// 把数组深拷贝并倒叙
const reverseBB = function (span) {
   let a = []
   for (var i = 0; i < span.length; i++) {
      a.push(span[i])
   }
   return a.reverse()
}

//把每一行的重复元素去掉
const togetherright = function (span) {
   let length = span.length
  //  let arr = span.reverse()
  let arr = reverseBB(span)
   if (length > 1) {
     for (var i = 1; i < length; i++) {
         if (arr[i] == arr[i - 1]) {
            Score.now += parseInt(arr[i]) * 2
            arr[i] = '0'
            arr[i - 1] *= 2
         }
     }
   }
   let a = deletezero(arr)
   return a.reverse()
}

//实现位移
//1 把不是空的span归到一个数组
//2 不是空的所有元素根据direction位移
//3 对每个数组进行位移： 全部移到direc方向  合并
const goright = function (nub, span) {
    var square = es('.square span')
    var arr = togetherright(span)
    var length = arr.length
    //
    for (var i = 0; i < length; i++) {
      var n = arr[length - 1 - i]
      newvalue(square[nub], n)
      nub = nub - 1
    }
}

const goleft = function (nub, span) {
    var square = es('.square span')
    var arr = togetherright(span)
    var length = arr.length
    var xx = nub - 3
    for (var i = 0; i < length; i++) {
      var n = arr[i]
      newvalue(square[xx], n)
      xx = xx + 1
    }
}

const gotop = function (nub, span, square) {
  var arr = togetherright(span)
  var length = arr.length
  var xx = nub - 3
  for (var i = 0; i < length; i++) {
    var n = arr[i]
    newvalue(square[xx], n)
    xx = xx + 1
  }
}

const godown = function (nub, span, square) {
    var arr = togetherright(span)
    var length = arr.length
    for (var i = 0; i < length; i++) {
      var n = arr[length - 1 - i]
      newvalue(square[nub], n)
      nub = nub - 1
    }
}

//判断2个数组是不是相等
const judegearr = function () {
   length = Alltep.length
   for (var i = 0; i < 16; i++) {
      let flag = Alltep[length - 1][i] == Alltep[length - 2][i]
      if (!flag) {
          return false
      }
   }
   return true
}

//判断是不是无效操作
const judgeOperat = function () {
    // let nowsquare = es('.square span')
    //判断2个数组是不是相等
      flag = judegearr()
      if (flag) {
         Alltep.pop()
      } else {
         shownub()
         cyandsave()
      }
}

//
const shifts = function (direction) {
  //1 把不是空的span归到一个数组
    var square = es('.square span')
    // cyandsave(square)
    var span = []
    for (var i = 0; i < square.length; i++) {
      if (square[i].innerHTML != '') {
          // span.push(square[i])
          let a = square[i].innerHTML
          span.push(a)
          let className = `value${a}`
          square[i].classList.remove(className)
          square[i].innerHTML = ''
      }
      if (i == 3 || i == 7 || i == 11 || i == 15) {
           if (direction == 37) {
             goleft(i, span)
           } else{
             goright(i, span)
           }
           span = []
      }
    }
    cyandsave()
    //判断是不是无效操作
    judgeOperat()
}

const movetop = function (direction) {
  var square = []
  var span = []
   for (var i = 1; i <= 4; i++) {
     for (var j = 1; j <= 4; j++) {
       var selector = `.span${j}-${i}`
       element = e(selector)
       square.push(element)
     }
   }
   //
  //  cyandsave(square)
   //
   for (var i = 0; i < square.length; i++) {
     if (square[i].innerHTML != '') {
         // span.push(square[i])
         let a = square[i].innerHTML
         span.push(a)
         let className = `value${a}`
         square[i].classList.remove(className)
         square[i].innerHTML = ''
     }
     if (i == 3 || i == 7 || i == 11 || i == 15) {
          if (direction == 38) {
            gotop(i, span, square)
          } else{
            godown(i, span, square)
          }
          span = []
     }
   }

   //
   cyandsave()
   //
   judgeOperat()
}


//保存数据用于返回
const cyandsave = function () {
    var x = es('.square span')
    let a = []
    for (var i = 0; i < x.length; i++) {
      a.push(x[i].innerHTML)
    }
    Alltep.push(a)
}

const Alltep = []

const Score = {
   now : 0,
   best : 0,
}
// 显示分数
const appendscore = function () {
    var score1 = e('.score-1 .score-1-num')
    var score2 = e('.score-2 .score-1-num')
    // score.innerHTML = Score.now
    score1.innerHTML = Score.now
    let now = Score.now
    let best = Score.best
    if (now > best) {
       score2.innerHTML = now
       Score.best = now
    }
}

//
const removeclass2048 = function (span) {
    var flag = ['value2', 'value4', 'value8', 'value16', 'value32', 'value64','value128','value256','value512','value1024','value2048','value4096']
    for (var i = 0; i < flag.length; i++) {
      if (span.classList.contains(flag[i])) {
           span.classList.remove(flag[i])
           return
      }
    }
}
//新游戏
const bindnowgame = function () {
    var button = e('.feature-2')
    var spans = es('.square span')
    button.onclick = function (event) {
       for (var i = 0; i < spans.length; i++) {
          spans[i].innerHTML = ''
          removeclass2048(spans[i])
       }
       //
       for (var i = 0; i < 2; i++) {
         shownub()
       }
       //
       Score.now = 0
       appendscore()
    }
}

//合并相同元素
// 判断方向 如果上下一种squ  桌游一种squ
//
const bindkeydown = function () {
  document.onkeydown=function(event){
      // log(event.keyCode)
      if (event.keyCode == 38) {
        //按了上
        //实现位移
        movetop(38)

        // together('top')
      } else if (event.keyCode == 40) {
        //按了下
        movetop(40)

        // together('down')

      } else if (event.keyCode == 37) {
        //按了左
        shifts(37)

        // together('left')

      } else if (event.keyCode == 39) {
        //按了右
        shifts(39)

        // together('right')

      }
      //
      appendscore()
  }
}

const _main = function () {
  for (var i = 0; i < 2; i++) {
    shownub()
  }
  var square = es('.square span')
  cyandsave(square)
  bindkeydown()
  bindnowgame()
}
_main()

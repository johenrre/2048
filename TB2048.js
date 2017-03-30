// 1实现悔棋 2结合的元素增加动画  3 分数 4 新游戏 5判断是不是赢了
var TB2048 = function (){
    this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.green = []
    // this.direction = 0
    this.animation = 0
    this.data = []
    // this.contentindex = []
    this.Scorenow = 0
    this.Scorebest = 0
    this.first = ''
    this.win = 0

    TB2048.prototype.init = function (data) {
      this.map = data.map
      this.Scorenow = data.Scorenow
      this.Scorebest= data.Scorebest
      this.data = []
      //
      log(this.first)
      if (this.first) {
        this.append1value()
        this.append1value()
      }
      this.showmap()
      this.data.push(this.map)
        // log(this.map)
    }
    TB2048.prototype.newgame = function () {
      this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      this.Scorenow = 0
      this.data = []
      this.append1value()
      this.append1value()
      this.showmap()
    }
    TB2048.prototype.showmap = function() {
        // 吧value显示出来
        var value = this.map
        var square = es('.square span')
        for (var i = 0; i < square.length; i++) {
          this.shanchuclass(square[i])
          if (value[i] != 0) {
              square[i].innerHTML = value[i]
              let classname = 'value' + value[i]
              square[i].classList.add(classname)
          } else {
             square[i].innerHTML = ''
          }
        }
        //给新元素增加动画
        if (this.animation != undefined) {
          playAnimation(square[this.animation], 'new-one')
        }
    }
    TB2048.prototype.shanchuclass = function(span){
      var flag = ['value2', 'value4', 'value8', 'value16', 'value32', 'value64','value128','value256','value512','value1024','value2048','value4096']
      for (var i = 0; i < flag.length; i++) {
        if (span.classList.contains(flag[i])) {
             span.classList.remove(flag[i])
             return
        }
      }
    }
    //在页面显示一个数字
    TB2048.prototype.append1value = function() {
        // 随机生成2或者4
        var value = this.map
        var index = []
        for (var i = 0; i < value.length; i++) {
          if (value[i] == 0) {
              index.push(i)
          }
        }
        // 随机返回数组的一个数
        var newvalue = this.getcurren(index)
        //得到一个2或者4的数字
        var nub = this.getnub()
        this.map[newvalue] = nub
        this.animation = newvalue
        //把新的地图显示出来
        // this.showmap()
    }
    TB2048.prototype.getcurren = function (arr) {
       let len = arr.length
       let a = arr[Math.floor(Math.random()*len)]
       return a
    }
    TB2048.prototype.getnub = function () {
      let Rand = Math.random()
      if (Rand > 0.7) {
         return 4
      } else {
         return 2
      }
    }
    //把数组切成4个数组
    TB2048.prototype.henarr = function () {
       var result = this.currenarr(this.map, 4)
       return result
    }
    TB2048.prototype.suarr = function () {
       var result = this.currenarr2(this.map, 4)
       return result
    }
    // 把数组分成nub个数组
    TB2048.prototype.currenarr = function (arr, nub) {
       var result = []
       var index = 0
       var nub2 = arr.length / nub
       for (var i = 0; i < nub; i++) {
         let line = []
         for (var j = 0; j < nub2; j++) {
            line.push(arr[index])
            index += 1
         }
        //  log(nub, i)
         result.push(line)
       }
       return result
    }
    // 把数组分成nub个数组 arr.lenth必须是nub * nub
    TB2048.prototype.currenarr2 = function (arr, nub) {
       var result = []
      //  var lie = 0
       for (var i = 0; i < nub; i++) {
         let line = []
         let index = i
         for (var j = 0; j < nub; j++) {
            line.push(arr[index])
            index += nub
         }
        //  log(nub, i)
         result.push(line)
       }
       return result
    }
    // 把数组都的数组都解压
    TB2048.prototype.getStr = function (arr) {
       for (var i = 0; i < arr.length; i++) {
          let type = typeof(arr[i])
          if (type == 'number') {
            let aa = this.green
            aa.push(arr[i])
          } else {
            this.getStr(arr[i])
          }
       }
    }
    TB2048.prototype.getStr2 = function (arr) {
       var result = []
       for (var i = 0; i < arr.length; i++) {
         for (var j = 0; j < 4; j++) {
            result.push(arr[j][i])
         }
       }
       return result
    }
    //按了左
    TB2048.prototype.moveleft = function () {
       var arr = this.henarr()
       var resultarr = []
       for (var i = 0; i < arr.length; i++) {
         var line = this.contentval(arr[i])
         resultarr.push(line)
       }
      //初始化green
       this.green = []
       this.getStr(resultarr)
      //  log('resultarr = ',this.green)
       this.map = this.green
      //  log('text',this.map)
      //这里要测试一下有没有添加合并元素
       this.textchange()
    }
    TB2048.prototype.moveright = function () {
       var arr = this.henarr()
      //  var arr = arr2.reverse()
       var resultarr = []
       for (var i = 0; i < arr.length; i++) {
         let bb = arr[i].reverse()
         var line = this.contentval(bb)
         resultarr.push(line.reverse())
       }
      //初始化green
       this.green = []
       this.getStr(resultarr)
      //  log('resultarr = ',this.green)
       this.map = this.green
      //  log('text',this.map)
      //这里要测试一下有没有添加合并元素
       this.textchange()
    }
    TB2048.prototype.movetop = function () {
       var arr = this.suarr()
       var resultarr = []
       for (var i = 0; i < arr.length; i++) {
         var line = this.contentval(arr[i])
         resultarr.push(line)
       }
       this.map = this.getStr2(resultarr)
      //  log('resultarr = ',this.green)
      //这里要测试一下有没有添加合并元素
       this.textchange()
    }
    TB2048.prototype.movedown = function () {
      var arr = this.suarr()
      // var arr = arr2.reverse()
       var resultarr = []
       for (var i = 0; i < arr.length; i++) {
         let bb = arr[i].reverse()
         var line = this.contentval(bb)
         resultarr.push(line.reverse())
       }
      //初始化green
      this.map = this.getStr2(resultarr)
      //  log('text',this.map)
      //这里要测试一下有没有添加合并元素
       this.textchange()
    }
    TB2048.prototype.textchange = function () {
      // 判断2个数组是否相等
        var flag = this.judge()
        // log(flag)
        if (flag) {
           this.showmap()
        } else {
           this.append1value()
           this.data.push(this.map)
           this.showmap()
          //  log('data = ', this.data[this.data.length - 2], this.map)
        }
    }
    // 判断map 和 data[this.data.length - 1] 是否相等
    TB2048.prototype.judge = function () {
      // 判断2个数组是否相等
        var a = JSON.stringify(this.data[this.data.length - 1])
        var b = JSON.stringify(this.map)
        // log('text', a, b)
        if (a == b) {
          return true
        } else {
          return false
        }
    }
    //吧一个数组相同的结合
    TB2048.prototype.contentval = function (arr) {
        var result = []
        //开关
        var zhuant = 0
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                if (zhuant == 0) {
                    result.push(arr[i])
                    zhuant = 1
                } else if (zhuant == 1) {
                    if (result[result.length-1] == arr[i]) {
                        this.Scorenow += arr[i] * 2
                        this.textwin(arr[i] * 2)
                        result[result.length-1] = arr[i] * 2
                        zhuant = 0
                    } else {
                       result.push(arr[i])
                       zhuant = 1
                    }
                }
            }
        }
        //补全result
        return this.buquan(result)
    }
    TB2048.prototype.textwin = function (n) {
        if (n > this.win) {
          this.win = n
        }
    }
    // 对数组进行补全
    TB2048.prototype.buquan = function (arr, nub) {
       var result = []
      //  var t = nub - arr.length
       for (var i = 0; i < 4; i++) {
         if (arr[i] == undefined ) {
           result.push(0)
         } else {
           result.push(arr[i])
         }
       }
       return result
    }
    //悔棋
    TB2048.prototype.huiqi = function () {
      // log('断电', this.data)
      var length = this.data.length
      if (length > 1) {
        this.data.pop()
        var data = this.data[this.data.length - 1]
        this.map = data
        // log('断电', data)
        this.showmap()
      } else {
        return
      }
    }
}

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort:"",
    isShowNoResult:false,
    keyword:"",
    sorts:[{
      bgColor:'',
      logo:"/images/icon-s.png",
      name:"湿垃圾",
      content: "湿垃圾包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物，其主要来源食品加工相关。",
      action: ["食材废料：谷物及其加工食品（米、米饭、面、面包、豆类）、肉蛋及其加工食品（鸡、鸭、猪、牛、羊肉、蛋、动物内脏、腊肉、午餐肉、蛋壳）、水产及其加工食品（鱼、鱼鳞、虾、虾壳、鱿鱼）、蔬菜（绿叶菜、根茎蔬菜、菌菇）、调料、酱料等。",
        "剩菜剩饭：火锅汤底（沥干后的固体废弃物）、鱼骨、碎骨、茶叶渣、咖啡渣等。",
      "过期食品：糕饼、糖果、风干食品（肉干、红枣、中药材）、粉末类食品（冲泡饮料、面粉）、宠物饲料等。",
      "瓜皮果核：水果果肉（椰子肉）、水果果皮（西瓜皮、桔子皮、苹果皮）、水果茎枝（葡萄枝）、果实（西瓜籽）等。",
      "花卉植物：家养绿植、花卉、花瓣、枝叶等。"],
    },{
      logo: "/images/icon-g.png",
      name: "干垃圾",
      content: "干垃圾指除其他几类垃圾，常见的有在自然条件下易分解的垃圾，如果皮、菜叶等。",
      action: [
          "卫生纸：厕纸、卫生纸遇水即溶，不算可回收的“纸张”，类似的还有烟盒等。",
          "餐厨垃圾装袋：常用的塑料袋，即使是可以降解的也远比餐厨垃圾更难腐蚀。此外塑料袋本身是可回收垃圾。正确做法应该是将餐厨垃圾倒入垃圾桶，塑料袋另扔进“可回收垃圾”桶。",
          "果壳：在垃圾分类中，“果壳瓜皮”的标识就是花生壳，的确属于厨余垃圾。家里用剩的废弃食用油，也归类在“厨余垃圾”。",
          "尘土：在垃圾分类中，尘土属于“其它垃圾”，但残枝落叶属于“厨余垃圾”，包括家里开败的鲜花等。",
          ],

    },{
      logo: "/images/icon-yh.png",
      name: "有害垃圾",
      content: "有害垃圾含对人体健康有害的重金属、有毒的物质或对环境造成现实危害或者潜在危害的废弃物。",
      action: [
          "废镍镉电池和废氧化汞电池：充电电池、镉镍电池、铅酸电池、蓄电池、纽扣电池。",
          "废荧光灯管：荧光（日光）灯管、卤素灯。",
          "废药品及其包装物度：过期药物、药物胶囊、药片、药品内包装。",
          "废油漆和溶剂及其包装物：废油漆桶、染发剂壳、过期的指甲油、洗甲水。",
          "废矿物油及其包装物。",
          "废含汞温度计、废含汞血压计：水银血压计、水银体温计、水银温度计。",
          "废杀虫剂及其包装：老鼠药（毒鼠强）、杀虫喷雾罐。",
          "废胶片及废相纸：x光片等感光胶片、相片底片。",
      ],
    },{
      logo: "/images/icon-khs.png",
      name: "可回收物",
      content: "可回收物就是可以再生循环的垃圾，主要包括废纸、塑料、玻璃、金属和布料五大类。",
      action: [
          "废纸：主要包括报纸、期刊、图书、各种包装纸等。但是，要注意纸巾和厕所纸由于水溶性太强不可回收等。",
        "塑料：各种塑料袋、塑料泡沫、塑料包装、一次性塑料餐盒餐具、硬塑料、塑料牙刷、塑料杯子、矿泉水瓶等。",
        "玻璃：主要包括各种玻璃瓶、碎玻璃片、镜子、暖瓶等。",
        "金属物：主要包括易拉罐、罐头盒等。",
        "布料：主要包括废弃衣服、桌布、洗脸巾、书包、鞋等。"],
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sortId = options.sortId
    console.log(sortId)
    switch (parseInt(sortId)) {
      case 1:
        this.data.sort = this.data.sorts[3]
        break;
      case 2:
        this.data.sort = this.data.sorts[2]
        break;
      case 3:
        this.data.sort = this.data.sorts[0]
        break;
      case 4:
        this.data.sort = this.data.sorts[1]
        break
    }
    this.setData({
      sort: this.data.sort,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  commit:function(){
    wx.navigateTo({
      url: '/pages/result/commit?keyword='+this.data.keyword,
    })
  },
  onGoHome:function(){
    wx.switchTab({
      url: '/pages/ai/index',
    })
  }
})
// userRegister/userRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  doregist:function(e){
    var formObject= e.detail.value;
    var username = formObject.username;
    var password = formObject.password;
    //简单验证
    if(username == null|| password == null){
      wx.showToast({
        title: '用户名或密码不能为空',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showLoading({
        title: '注册中，请等待...',
      })
      var serverUrl =app.serverUrl;
    
      wx.request({
        url: serverUrl +'/re/regist',
        method:"post",
        data:{
          username:username,
          password:password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
         wx.hideLoading();
          app.userInfo = res.data.data;
          var status = res.data.status;
          console.log(res.data);
          if(status == 200)
          {
            wx.showToast({
              title: '用户:' + username + ',注册成功!',
              icon: 'none',
              duration: 3000
            })
          }else if(status == 500){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
            
        }
      })
    }
  },
  goLoginPage:function(e){
    wx.navigateTo({
      url: '/pages/userLogin/userLogin',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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

  }
})
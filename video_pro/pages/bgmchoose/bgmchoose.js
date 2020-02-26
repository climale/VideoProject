// pages/bgmchoose/bgmchoose.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgmList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      video:options
    })
    var serverUrl=app.serverUrl;
    var user=app.userInfo;
    console.log("options");
    console.log(options);
    wx.request({
      url: serverUrl +'/bgm/getbgmlist',
      method:"post",
      header: {
        'content-type': 'application/json', // 默认值
      },
     
      success:function(res){
        console.log(res.data)
       var bgmList=res.data.data
        if(res.data.status==200){
            that.setData({
              bgmList:bgmList,
              serverUrl:serverUrl
            })
        }else{
          console.log(res.data.msg)
        }
      }
    })
  },
  upload:function(e){
    var bgmId = e.detail.value.bgmlist;
    var desc = e.detail.value.desc;
    var serverUrl = app.serverUrl;
    var user=app.userInfo;
    var that=this;
    var options= that.data.video;
    console.log("uoload")
    console.log(options)
    // wx.request({
    //   url: serverUrl + '/bgm/uploadVideo?userId=' + user.id + '&bgmId=' + bgmId + '&videoSecond=' + options.size + '&videoWidth=' + options.width + '&videoHight=' + options.height +'&desc='+options.desc,
    // })

    wx.showLoading({
      title: '上传中...',
    })
    wx.uploadFile({
      url: serverUrl +'/bgm/uploadVideo', //仅为示例，非真实的接口地址
      formData: {
        userId: user.id,    // fixme 原来的 app.userInfo.id
        bgmId: bgmId,
        desc: desc,
        videoSecond: options.duration,
        videoHight: options.height,
        videoWidth: options.width
      },
      filePath: options.tempFilePath,
      name: 'file',
      header: {
        'content-type': 'application/json' // 默认值
       
      },
      success:function(res) {
        wx.hideLoading();
        var data = JSON.parse(res.data);
        if(data.status == 200){
          console.log("user.id")
          console.log(user.id)
          console.log("user.id")
          console.log(data.data)
                  wx.showToast({
                    title: '视频上传成功',
                    icon:"success"
                  });
                  wx.navigateBack({
                    delta:1,
                  })
          // wx.uploadFile({
          //   url: serverUrl +'/bgm/updateCoverImage',
          //   formData:{
          //     userId:user.id,
          //     videoId:data.data
          //   },
          //   filePath: options.thumbTempFilePath,
          //   name: 'file',
          //       header: {
          //       'content-type': 'application/json' // 默认值
          //     },
          //     success:function(res){
          //       var data = JSON.parse(res.data);
          //       if(data.status == 200){
          //         wx.showToast({
          //           title: '封面上传成功',
          //           icon:"success"
          //         });
          //         wx.navigateBack({
          //           delta:1,
          //         })
          //       }else{
          //         wx.showToast({
          //           title: '封面上传失败',
          //           icon: "success"
          //         });
          //       }
          //     }
          // })
          console.log("upload");
          console.log(res);
        }
       
        //do something
      }
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
    
  }
})

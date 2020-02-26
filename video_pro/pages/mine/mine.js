// pages/mine/mine.js
const app = getApp()
Page({
 
 

  /**
   * 页面的初始数据
   */
  data: {
    // faceUrl: "../../res/images/noface.jpg"
  },
  uploadVideo:function(e){
    wx.chooseVideo({
      sourceType: ['album'],
      success(res) {
        console.log(res)
        var duration=res.duration;
        var height=res.height;
        var size=res.size;
        var tempFilePath=res.tempFilePath;
        var thumbTempFilePath=res.thumbTempFilePath;
        var width=res.width;
        if(duration>15){
          wx.showToast({
            title: '视频长度不能超过10s',
            icon:'none',
            duration:2500
          })
        }else if(duration<1){
          wx.showToast({
            title: '视频长度不能小于1s',
            icon: 'none',
            duration: 2500
          })
        }else{
          wx.navigateTo({
            url: '../bgmchoose/bgmchoose?duration=' + duration + '&height=' + height + '&size=' + size + '&tempFilePath=' + tempFilePath + '&thumbTempFilePath=' + thumbTempFilePath + '&width='+width,
          })
        }
      }
    })
  },
logout:function(e){
  var user=app.userInfo;
  var url = app.serverUrl + '/re/Loginout?userid='+user.id;
  console.log(url);
      wx.request({
        url: url,
        method:"POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
          console.log(res.data);
          wx.hideLoading();
          if (res.data.status == 200) {
            // 登录成功跳转 
            wx.showToast({
              title: '注销成功',
              icon: 'success',
              duration: 2000
            });
            wx.navigateTo({
              url: '../userLogin/userLogin',
            })
          }else{
            wx.showToast({
              title: '注销失败'
            
            });
          }
        }
      })
},

  changeFace:function(e){
    var serverUrl = app.serverUrl;
    var that= this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.showToast({
          title: '上传中...',
        })
        var url=app.serverUrl;
        wx.uploadFile({
          url: url +'/user/updateFaceImage?userId='+app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
          },
          success:function(res){
            var data=JSON.parse(res.data);//upload的success默认为string 要转换为json
            console.log(data);
            wx.hideLoading();
            if(data.status==200){
              wx.showToast({
                title: '上传成功！',
                icon:"success"
              });
            var imageUrl = data.data;
              
            that.setData({
              faceUrl:serverUrl+imageUrl
            });

            } else if (data.status==500){
                wx.showToast({
                  title: '上传失败！'
                })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that= this;
    var user = app.userInfo;
    console.log(user);
    var serverUrl = app.serverUrl;
    var faceUrl = "../../res/images/noface.jpg";
      if (user.faceImage!=null && user.faceImage!=''&&user.faceImage!=undefined){
        faceUrl=serverUrl+user.faceImage;
      }
        that.setData({
          fansCounts: user.fansCounts,
          followCounts: user.followCounts,
          receiveLikeCounts: user.receiveLikeCounts,
          faceUrl: faceUrl,
          nickname:user.username
        })
      

    
    
  
      
    // wx.request({
    //   url: serverUrl + '/user/getUserInfo',
    //   method:"post",
    //   data:{
    //     username: user.username,
    //     password:user.password
    //   },
    //   header: {
    //     'content-type': 'application/json', // 默认值
    //   },
    //   success:function(res){
        
    //     that.setData({
    //       fansCounts: fansCounts,
    //       followCounts: followCounts,
    //       receiveLikeCounts: receiveLikeCounts
    //     })
    //   }

    // })
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
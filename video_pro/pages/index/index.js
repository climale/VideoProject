//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    totalPage : 1,
    page:1,
    videoList:[], 
    serverUrl: "",
    screenWidth: 350,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onPullDownRefresh:function(e){
    wx.showNavigationBarLoading()
    this.getAllVdieoList(1);

  },
 onLoad:function(e){
   var that = this;
   var screenWidth = wx.getSystemInfoSync().screenWidth;
   that.setData({
     screenWidth: screenWidth,
   });
   //获取当前分页数
  var page = that.data.page;

that.getAllVdieoList(page);

     },
  
 
 getAllVdieoList:function(page){
   var that = this;
   var serverUrl = app.serverUrl;
   wx.showLoading({
     title: '请等待，加载中。。。',
   });

   wx.request({
   
     url: serverUrl + '/bgm/showAllVideos?page=' + page,
     method: "post",
     success: function (res) {
       wx.hideLoading();
       wx.hideNavigationBarLoading();
       wx.stopPullDownRefresh();
       console.log(res.data);
       //判断当前页是否是第一页，如果是第一页，那么设置video list为空
       if (page == 1) {
         that.setData({
           videoList: []
         })
       }

       var videoList = res.data.data.rows;
       var newVideoList = that.data.videoList;
       that.setData({
         videoList: newVideoList.concat(videoList),
         page: page,
         totalPage: res.data.data.total,
         serverUrl: serverUrl
       })
     }
   })
 },
 onReachBottom:function(e){
   var that = this;
   var currentPage = that.data.page;

   var totalPage = that.data.totalPage;
   //判断当前页数和总页数是否想到，如果想的则无需查询
   if( currentPage === totalPage){
     wx.showToast({
       title: '已经没有视频了',
       icon:"icon"
     })
     return;
   }
   var page = currentPage+1;

   that.getAllVdieoList(page);
 },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

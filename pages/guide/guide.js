// pages/guide/guide.js
const app = getApp();
import {
    Base
} from '../../utils/base.js';
let _base = new Base();

import {
  login
} from '../../utils/login.js';
var _login = new login();

Page({

  data: {
    url:[
      'http://img.duorang.com/upload/img/guide_1.jpg',
      'http://img.duorang.com/upload/img/guide_2.jpg',
      'http://img.duorang.com/upload/img/guide_3.jpg',
      'http://img.duorang.com/upload/img/guide_4.jpg',
      'http://img.duorang.com/upload/img/guide_5.jpg'
    ],
    shareHome:false,
    height:0
  },
    returnHome(){
        wx.reLaunch({
            url: '/pages/group/group?village_id=22'
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      let h = wx.getSystemInfoSync().windowHeight;
      if(options.shareType == 1){
        this.setData({
            shareHome:true,
            height:h
        })
      }

    if (options.userId) {
      that.setData({
        userId: options.userId
      })
    }

    wx.getSetting({
      success(res) {
        console.log('授权状态', res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          let state = wx.getStorageSync('loginStatus');
          if (!state) {
            _login.getToken(that.data.userId);
          }
        }
        // else { ****
        //   that.setData({
        //     loginData: {
        //       show_modal: true,
        //       height: wx.getSystemInfoSync().screenHeight
        //     },
        //   })
        // }
      }
    })


  },

  //调起用户授权
  getUser: function (e) {
    let that = this;
    console.log("用户授权信息");
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
      wx.setStorageSync('nickName', e.detail.userInfo.nickName);
      wx.setStorageSync('encrypted', e.detail);
      that.setData({
        loginData: {
          show_modal: false,
          height: wx.getSystemInfoSync().screenHeight
        },
      })
      _login.getToken(that.data.userId)
    }
  },

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
    var loginUserId = wx.getStorageSync('loginUser');
    console.log(`%c 阿文提醒您：多让使用指南分享者ID为：${loginUserId.id}`, `color:#f00;font-weight:bold;`)

      let obj = {
        title: '团长提示,你收到一份业主装修省钱攻略',
        url: "pages/guide/guide?shareType=1&userId=" + loginUserId.id+"",
        img:'../../images/custom.jpg'
      }

      return _base.shareData(obj);
  }
})

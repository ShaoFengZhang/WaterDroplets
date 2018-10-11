//初始化数据
function tabbarinit(avatarUrl) {
  return [{
      "current": 0,
      "pagePath": "/pages/briefHistory/briefHistory/briefHistory",
      "iconPath": "https://tp.datikeji.com/constellation/15372394609248/nfsH0Kf6gzbJdBlJPGewxjiSa7ajdEAsc0V6eVZM.png",
      "selectedIconPath": "https://tp.datikeji.com/constellation/15372400734152/wScQxbiPHWyR2c4U01HmFf7dLqpTumDwcOipXOS7.png",
      "text": "简史"
    },
    {
      "current": 0,
      "pagePath": "/pages/constellation/constellation",
      "iconPath": avatarUrl,
      "selectedIconPath": avatarUrl,
      "text": "运势"
    },
    {
      "current": 0,
      "pagePath": "/pages/cultivate/cultivate",
      "iconPath": "https://tp.datikeji.com/constellation/15372395404986/FNYRFG39QQVzgJ4nx1HL5H0jNvNhA70hTSoCkiCN.png",
      "selectedIconPath": "https://tp.datikeji.com/constellation/15372395733717/0MqzYZWVHTy0edHMVzFWIGr3hYlyMg1hjUwAjSU6.png",
      "text": "养成"
    }
  ]
}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target, avatarUrl) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit(avatarUrl); 
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'] //换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({
    bindData
  });
}


module.exports = {
  tabbar: tabbarmain,
}
// components/tabBar/tabBar.js
Component({
  properties: {
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      "color": "#c9cbcd",
      "selectedColor": "#f00",
      "backgroundColor": "#fff",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/history/history",
          "text": "简史",
          "iconPath": "https://tp.datikeji.com/constellation/15362927276315/UrD7KgEnQFdduIqbJfAb3mWYZ2o2kjSkddzsrAii.png",
          "selectedIconPath": "https://tp.datikeji.com/constellation/15363036256869/pwI8pmJthZva51M9UTanRaAU5Upxlzlh050nCerp.png",
          "selectedColor": "#8C57E8",
          active: false
        },
        {
          "pagePath": "/pages/constellation/constellation",
          "text": "运势",
          "iconPath": "https://tp.datikeji.com/constellation/15363027642452/Xt5X0sC3AkZ3UIiQdQWmwLjt2lX3YXaDhgFa5hAJ.png",
          "selectedIconPath": "",
          "selectedColor": "#8C57E8",
          active: true
        },
        {
          "pagePath": "/pages/cultivate/cultivate",
          "text": "养成",
          "iconPath": "https://tp.datikeji.com/constellation/15363094632104/j1SbLruiUMCNL6HVBR4mO1ObeHeha9ZLVBSWeXjT.png",
          "selectedIconPath": "https://tp.datikeji.com/constellation/15363097553247/tm1V67txcS7iX7bbCAM9qplW4stYk1Es7xcLmEhU.png",
          "selectedColor": "#8C57E8",
          active: false
        }
      ],
      "position": "bottom"
    }
  },
  methods: {

  }
})
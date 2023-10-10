window.systemConfig = {
  cookie: {
    domain: "localhost"
  }
};
window.appConfig = {
  basemaps: [
    {
      title: "矢量底图",
      id: "vec",
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer",
      icon: "img",
      visible: true
    },
    {
      title: "影像底图",
      id: "img",
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer",
      icon: "street_thumb_b2wm.jpg",
      visible: false
    }
  ]
}

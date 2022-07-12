// components/tabbar.ts
import settings from '../setting'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    hasBottomBar: settings.hasBottomBar
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onChange(event:any) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
    },
  }
})

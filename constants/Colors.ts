/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const themeColor = 'rgb(145, 144, 243)'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const antd_dark = {
  brand_primary: themeColor,  // 品牌基础色 #108ee9
  fill_base: themeColor,      // 组件默认背景色 #ffffff
  primary_button_fill: themeColor,     // 按钮背景颜色 <Button type="primary">
  primary_button_fill_tap: themeColor, // 按钮下压时背景颜色
  color_icon_base: themeColor,         // 许多小图标的背景颜色

  "fill_body": "#262629",
  "fill_tap": "#2b2b2b",
  "fill_grey": "#0a0a0a",
  "color_text_base": "#e6e6e6",
  "color_text_placeholder": "#4d4d4d",
  "border_color_base": "#2b2b2b",
  "border_color_thin": "#2b2b2b",
}
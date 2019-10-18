// Color varialbes
const BLACK = '#000000'
const WHITE = '#ffffff'
const RED = '#f44'
const BLUE = '#1989fa'
const ORANGE = '#ff976a'
const ORANGE_DARK = '#ed6a0c'
const ORANGE_LIGHT = '#fffbe8'
const GREEN = '#07c160'
const GRAY = '#c8c9cc'
const GRAY_LIGHT = '#e5e5e5'
const GRAY_DARKER = '#7d7e80'
const GRAY_DARK = '#969799'
const PRIMARY = 'rgba(255, 102, 0, 1)'

// Default colors
const TEXT_COLOR = '#333333'
const BORDER_COLOR = '#ebedf0'
const ACTIVE_COLOR = '#e8e8e8'
const BACKGROUND_COLOR = '#f8f8f8'
const BACKGROUND_COLOR_LIGHT = '#fafafa'

// theme table url
// https://github.com/youzan/vant/blob/dev/packages/style/var.less

const theme = {
  // variables
  black: BLACK,
  white: WHITE,
  blue: PRIMARY,
  orange: ORANGE,
  'orange-dark': ORANGE_DARK,
  'orange-light': ORANGE_LIGHT,
  green: GREEN,
  gray: GRAY,
  'gray-light': GRAY_LIGHT,
  'gray-darker': GRAY_DARKER,
  'gray-dark': GRAY_DARK,

  // defaults
  'text-color': TEXT_COLOR,
  'border-color': BORDER_COLOR,
  'active-color': ACTIVE_COLOR,
  'background-color': BACKGROUND_COLOR,
  'background-color-light': BACKGROUND_COLOR_LIGHT,

  // changes
  // 主色调
  red: PRIMARY,

  // tabs
  'tabs-line-height': '50px',
  'tabs-card-height': '50px',

  // buttons
  // primary button 字体颜色
  'button-primary-color': WHITE,
  // primary button 背景颜色
  'button-primary-background-color': PRIMARY,
  // primary button 禁用时的边框颜色
  'button-primary-border-color': BORDER_COLOR,

  // Checkbox
  // checkbox 选中时的颜色
  'checkbox-checked-icon-color': PRIMARY,

  // Radio
  'radio-checked-icon-color': PRIMARY,
  'radio-size': '18px',

  // Switch
  'switch-on-background-color': PRIMARY
}

export default theme
module.exports = theme

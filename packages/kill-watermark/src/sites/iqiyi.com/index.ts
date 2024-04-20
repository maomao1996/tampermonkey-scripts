/*
 * 爱奇艺播放页
 *  - https://www.iqiyi.com/v_xkt6z3z798.html
 *  - https://sports.iqiyi.com
 *  - https://life.iqiyi.com
 *  - https://yule.iqiyi.com
 ******************************************************************************/

import style from './index.css'

const site: SiteModule = [
  '爱奇艺播放页（右上角 logo、暂停时的广告）',
  /^(?:[^.]+\.)?iqiyi\.com$/,
  {
    style,
  },
]

export default site

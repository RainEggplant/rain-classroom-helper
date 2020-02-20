# Rain Classroom Helper

<p><a href="https://github.com/RainEggplant/rain-classroom-helper" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/RainEggplant/rain-classroom-helper?style=social"></a> <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/RainEggplant/rain-classroom-helper?include_prereleases"> <a href="https://github.com/RainEggplant/rain-classroom-helper/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/RainEggplant/rain-classroom-helper"></a></p>

该用户脚本旨在为大屏幕设备（PC、平板）提供更好的雨课堂学生端使用体验。

## 介绍

雨课堂学生端本来是针对手机使用而开发的，PC 网页版存在的问题不可谓不多：
- 所谓的 PC 网页版（v1）实际上也只是用了一个 iframe 来显示和手机版同样的界面（并且尺寸同比例）。这样的界面对大屏幕设备非常不友好，显示区域狭窄，并且其中的内容也非常小。
- 当老师开启视频直播或者之后回看时，整个显示区域的上半部分全部被视频占据，而一旦将其收起视频则会停止播放，非常不人性化。
- 整个页面的布局也设计地十分奇怪，存在未充分利用空间、控制区字体过大等问题。
- ……

好消息是，目前雨课堂已经在开发适合大屏幕设备使用的网页版（v2）。坏消息是，新的网页版不支持直播与视频。不过———

**你来对地方了！** 这个用户脚本尝试修复了上面提到的问题。因为是第一次写这种用户脚本，有问题还希望大家多多包涵，可以在这里提 issue，当然也非常欢迎 pr 和我一起修正、完善这个脚本。

最后，希望大家能够喜欢，也希望疫情赶快退去，大家都能平安返回校园！

## 特性

### 更改元素样式

修改了一些样式，增加了空间的利用率，使中间的课程内容能够自适应窗口大小。同时修改了左右边栏的字体、图片大小，并对齐了左右边栏，使得界面更美观。

对比如下：

<table>
  <tr>
    <th>BEFORE</th>
    <th>AFTER</th>
  </tr>
  <tr>
    <td>
      <a href="https://sm.ms/image/KDiEYV4MIX7cC1F" target="_blank"><img src="https://i.loli.net/2020/02/13/KDiEYV4MIX7cC1F.jpg" width="95%" ></a>
    </td>
    <td>
      <a href="https://sm.ms/image/TjHUGYAes5xqX7w" target="_blank"><img src="https://i.loli.net/2020/02/19/TjHUGYAes5xqX7w.jpg" width="95%" ></a>
    </td>
  </tr>
</table>


### 单独播放音视频

将课程中的音视频单独放在右边栏播放，使得你在看课件、答题时可以更加专注。

<table>
  <tr>
    <th>BEFORE</th>
    <th>AFTER</th>
  </tr>
  <tr>
    <td>
      <a href="https://sm.ms/image/2eOzaVmf68bn3Xg" target="_blank"><img src="https://i.loli.net/2020/02/13/2eOzaVmf68bn3Xg.jpg" width="95%" ></a>
    </td>
    <td>
      <a href="https://sm.ms/image/81wdClvXtZ5iNeI" target="_blank"><img src="https://i.loli.net/2020/02/13/81wdClvXtZ5iNeI.jpg" width="95%" ></a>
    </td>
  </tr>
</table>

### 我的雨课堂我做主

增加了定制雨课堂界面的功能，用户可设置**全屏占比**、**右边栏大小**，还可以**隐藏左边栏**，给你自由舒适的体验。

<a href="https://sm.ms/image/75U2RevFNwuP8rz" target="_blank"><img src="https://i.loli.net/2020/02/19/75U2RevFNwuP8rz.jpg" ></a>

以下为配置示例：

<table>
  <tr>
    <th>“视频直播，尺度要大”（宽度定制功能）</th>
    <th>“分屏做事，我的最爱”（收起左栏功能）</th>
  </tr>
  <tr>
    <td>
      <a href="https://sm.ms/image/d4FcaHMWb83wyvj" target="_blank"><img src="https://i.loli.net/2020/02/19/d4FcaHMWb83wyvj.jpg" width="95%" ></a>
    </td>
    <td>
      <a href="https://sm.ms/image/vfPNsSyrdmOIj3u" target="_blank"><img src="https://i.loli.net/2020/02/19/vfPNsSyrdmOIj3u.jpg" width="95%" ></a>
    </td>
  </tr>
</table>


## 使用方法

- 首先，你需要在浏览器上安装一个用户脚本管理器。可选的扩展有
  - [Tampermonkey for Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
  - [Violentmonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
  - [Greasemonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
  - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  - [Violentmonkey for Chrome](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)

  Chromium 内核的浏览器（Edge, Opera 以及 360、搜狗等国产浏览器）可以安装 Chrome 版的扩展，或者在对应的应用商店中搜索以上扩展安装。
  
  国内 Chrome 用户安装插件可能会遇到网络问题，可以参考 [这篇文章](https://zhuanlan.zhihu.com/p/80305764)。通过开发者模式安装的扩展会提示错误，忽略即可。

- 然后，从下面途径之一安装:
  - [Install from GreasyFork 【推荐】](https://greasyfork.org/zh-CN/scripts/396387-rain-classroom-helper)（载入后点击网页上的安装按钮）
  - [Install from GitHub](https://github.com/RainEggplant/rain-classroom-helper/releases/latest/download/rain-classroom-helper.user.js) （点击即自动安装）

- 安装完成并启用后，无需配置即可使用。


## 更新记录

### v0.2.3
- 修正了雨课堂右边栏本身列表项样式错误的问题

### v0.2.2

- 修正了某些情况下 URL 匹配失败的问题

### v0.2.1

- 修正了点击左侧导航栏监测视频失效的问题

### v0.2.0

- 增加了对荷塘雨课堂的支持
- 增加了用户自由定制雨课堂界面的功能
- 增加了隐藏左边栏的功能
- 改进了一些执行逻辑
- 去除了右侧视频框中的无关元素
- 修正了投票等操作打断右边栏视频的错误


## Credit

本项目使用了 BrockA 编写的 utility function: [waitForKeyElement](https://gist.githubusercontent.com/BrockA/2625891)

## LICENSE
[MIT](LICENSE).

# Rain Classroom Helper

该用户脚本旨在为大屏幕设备（PC、平板）提供更好的雨课堂学生端使用体验。

## 介绍

雨课堂学生端本来是针对手机使用而开发的，PC 网页版存在的问题不可谓不多：
- 所谓的 PC 网页版（v1) 实际上也只是用了一个 iframe 来显示和手机版同样的界面（并且尺寸同比例）。这样的界面对大屏幕设备非常不友好，显示区域狭窄，并且其中的内容也非常小。
- 当老师开启视频直播或者之后回看时，整个显示区域的上半部分全部被视频占据，而一旦将其收起视频则会停止播放，非常不人性化。
- 整个页面的布局也设计地十分奇怪，存在未充分利用空间、控制区字体过大等问题。
- ……

好消息是，目前雨课堂已经在开发适合大屏幕设备使用的网页版（v2）。坏消息是，新的网页版不支持直播与视频。不过———

**你来对地方了！** 这个用户脚本尝试修复了上面提到的问题。因为是第一次写这种用户脚本，有问题还希望大家多多包涵，可以在这里提 issue，当然也非常欢迎 pr 和我一起修正、完善这个脚本。

最后，希望大家能够喜欢，也希望疫情赶快退去，大家都能平安返回校园！

## 特性

### 更改页面布局

修改了一些样式，增加了空间的利用率，使中间的课程内容能够自适应窗口大小。同时修改了左右边栏的字体、图片大小，并对齐了左右边栏，使得界面更美观。

对比如下：

<table>
  <tr>
    <th>BEFORE</th>
    <th>AFTER</th>
  </tr>
  <tr>
    <td>
      <a href="https://sm.ms/image/Xalombdk5fwExUp" target="_blank"><img src="https://i.loli.net/2020/02/13/Xalombdk5fwExUp.jpg" ></a>
    </td>
    <td>
      <a href="https://sm.ms/image/vXN3CWSHBslxJpK" target="_blank"><img src="https://i.loli.net/2020/02/13/vXN3CWSHBslxJpK.jpg" ></a>
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
      <a href="https://sm.ms/image/2eOzaVmf68bn3Xg" target="_blank"><img src="https://i.loli.net/2020/02/13/2eOzaVmf68bn3Xg.jpg" ></a>
    </td>
    <td>
      <a href="https://sm.ms/image/81wdClvXtZ5iNeI" target="_blank"><img src="https://i.loli.net/2020/02/13/81wdClvXtZ5iNeI.jpg" ></a>
    </td>
  </tr>
</table>

## 使用方法

配合浏览器扩展 Tampermonkey 使用。详细请自行 Google.

## LICENSE
[MIT](LICENSE)

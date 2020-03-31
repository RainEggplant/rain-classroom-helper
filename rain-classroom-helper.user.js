// ==UserScript==
// @name         Rain Classroom Helper
// @namespace    https://raineggplant.com/
// @version      0.2.4
// @description  优化雨课堂使用体验
// @author       RainEggplant
// @match        *://www.yuketang.cn/web*
// @match        *://pro.yuketang.cn/web*
// @match        *://changjiang.yuketang.cn/web*
// @grant        GM_addStyle
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/RainEggplant/rain-classroom-helper/master/rain-classroom-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/RainEggplant/rain-classroom-helper/master/rain-classroom-helper.user.js
// @homepageURL  https://github.com/RainEggplant/rain-classroom-helper
// ==/UserScript==

(function () {
  'use strict';
  const DEBUG = false;

  // 调整左边栏样式
  GM_addStyle(`
    .left .panel {
      padding-top: 34px !important;
      max-height: unset !important;
    }
    .nav-list {
      font-size: 18px !important;
    }
    .nav-item {
      height: 45px !important;
      line-height: 32px !important;
      padding-top: 6px !important;
    }
    .kecheng, .kejian, .shiti, .geren, .addlink {
      width: 30px !important;
    }
    .left .panel .nav-list .nav-item .name {
      padding-left: 18px !important;
    }
    .left .contact-us {
      bottom: 10px !important;
      //display: block !important;
    }
  `);

  // 调整右边栏样式
  GM_addStyle(`
    .right {
      width: 320px !important;
    }
    .right .control-panel {
      padding-top: 32px !important;
      max-height: unset !important;
    }
    .title {
      font-size: 22px !important;
    }
    .page-nav-control {
      width: 320px !important;
    }
    .page-control {
      padding-top: 15px !important;
    }
    .control-desc {
      display: none !important;
    }
    .page-nav {
      padding: unset !important;
      font-size: 18px !important;
    }
    .print-preview-box {
      margin: 0px 0 0 !important;
    }
    .contact-us {
      display: none;
    }
    .right .control-panel .page-control .paging-number-list .page-no:nth-child(5n) {
      margin: 0 14px 13px 0 !important;
     }
  `);

  // 调整中间 iframe 为自适应宽度
  GM_addStyle(`
    .wrapper-inner {
      width: 92% !important;
    }
    .center {
      width: auto !important;
      margin-left: 180px !important;
      margin-right: 320px !important;
      float: none !important;
    }
    .center .rain-iframe {
      width: calc(95% - 40px) !important;
      height: 95% !important;
    }
    .student__timeline-wrapper {
      top: 2.33rem !important;
    }
  `);

  // 调整布局
  waitForKeyElements('div.index-view.none.J_index', function () {
    // note: you must move div.right instead of div.center, or the sidebar
    // will lost its funtion
    $('div.right.fr').insertBefore($('div.center.fl'));
  });

  // 缩小 “体验新版” 尺寸
  waitForKeyElements('a.newWebEntry', function () {
    $('a.newWebEntry')
      .find('img')
      .attr('style', 'width: 150px; margin-top: 20px;');
  });

  // 添加右边栏视频框
  GM_addStyle(`
    #video-iframe {
      width: 320px;
      height: 304px;
    }
  `);

  waitForKeyElements('div.control-panel.Absolute-Center', function () {
    const videoIFrame = '<iframe id="video-iframe" src="about:blank" style="display: none;"/>';
    $('div.page-control.J_pageNo').after(videoIFrame);
  });

  // 添加 GitHub 项目图标
  waitForKeyElements('ul.nav-list', function () {
    const liAbout = `
      <li class="nav-item clearfix J_nav">
        <a href="https://github.com/RainEggplant/rain-classroom-helper" target="_blank">
          <img alt="GitHub stars" style="width:auto;" src="https://img.shields.io/github/stars/RainEggplant/rain-classroom-helper?style=social">
        </a>
      </li>
    `;
    $('ul.nav-list').append(liAbout);
  });

  waitForKeyElements('div.left.fl', function () {
    const divLeftHidden = `
      <div id="left-hidden" class="fl" style="display: none;">
        <p id="show-left" style="top: 50%; position: absolute; color: #fff; z-index: 1;">▶</p>
      </div>
    `;
    $('div.left.fl').before(divLeftHidden);
    $('#show-left').on('click', showLeftPanel);
  });

  // 添加控制样式的滑块
  waitForKeyElements('div.panel.Absolute-Center', function () {
    const panelWidthControls = `
      <div style="margin-top: 20px; color: #fff; font-size: 14px;">
        <p>
          <label for="panel-width">右边栏宽度</label>
          <input type="range" id="right-panel-width" value="320" min="200" max="576" style="width: 160px;">
        </p>
        <p>
          <label for="panel-width">全屏占比</label>
          <input type="range" id="content-width" value="92" min="50" max="98" style="width: 160px;">
        </p>
        <p>
          <button id="hide-left" type="button" style="color: #000; font-size: 12px;">◀ 隐藏左边栏</button>
        </p>
      </div>
    `;
    $('div.panel.Absolute-Center').append(panelWidthControls);
    $('#right-panel-width').on('change', setRightPanelWidth);
    $('#content-width').on('change', setContentWidth);
    $('#hide-left').on('click', hideLeftPanel);
  });

  function setRightPanelWidth() {
    const width = 'width: ' + $(this).val() + 'px !important;';
    const height = 'height: ' + (0.75 * $(this).val() + 60) + 'px !important;';
    const marginLeft = 'margin-left: ' + $('div.center.fl').css('margin-left') + ';';
    const marginRight = 'margin-right: ' + $(this).val() + 'px !important;';
    const iframeDisplay = 'display: ' + $('#video-iframe').css('display') + ';';
    $('div.right.fr').attr('style', width);
    $('div.page-nav-control').attr('style', width);
    $('div.center.fl').attr('style', marginLeft + ' ' + marginRight);
    $('#video-iframe').attr('style', width + ' ' + height + ' ' + iframeDisplay);
  }

  function setContentWidth() {
    const width = 'width: ' + $(this).val() + '% !important;';
    $('div.wrapper-inner.clearfix.J_inner').attr('style', width);
  }

  function hideLeftPanel() {
    const marginLeft = 'margin-left: 0px !important;';
    const marginRight = 'margin-right: '
      + $('div.center.fl').css('margin-right') + ' !important;';
    $('div.left.fl').css('display', 'none');
    $('div.center.fl').attr('style', marginLeft + ' ' + marginRight);
    $('#left-hidden').css('display', 'block');
  }

  function showLeftPanel() {
    const marginLeft = 'margin-left: 180px !important;';
    const marginRight = 'margin-right: '
      + $('div.center.fl').css('margin-right') + ' !important;';
    $('div.left.fl').css('display', 'block');
    $('div.center.fl').attr('style', marginLeft + ' ' + marginRight);
    $('#left-hidden').css('display', 'none');
  }

  waitForKeyElements('body', function () {
    // 中间 iframe 加载出内容后绑定处理视频的函数
    addVideoHandler();
  }, true, '#rainiframe');

  function addVideoHandler() {
    // 首次进入或通过左边栏改变页面时
    let iframeUrl = '';
    let isVideoLoaded = false;
    let iframeBody = $('#rainiframe').contents().find('body')[0];
    const iframeObserver = new MutationObserver(function () {
      DEBUG && console.log('iframe mutated');
      const newIFrameUrl = $('#rainiframe').contents()[0].location.href;
      DEBUG && console.log(newIFrameUrl);

      const videoSection = iframeBody.querySelector('section.live__wrap');
      if (videoSection) {
        // 存在视频
        // 去除中央 rainIFrame 中的视频
        $(videoSection).contents().find('video').removeAttr('src');
        $(videoSection).empty();

        if (iframeUrl && newIFrameUrl.includes(iframeUrl)) {
          DEBUG && console.log('entering a sub page');
          return;
        }

        // 在右边栏显示视频
        // note: 不要使用 $("#video-iframe").attr("src", iframeUrl);
        //       因为这样会留下访问记录，从而使后退、前进功能异常
        iframeUrl = newIFrameUrl;
        const videoIFrame = $('#video-iframe')[0];
        videoIFrame.contentWindow.location.replace(iframeUrl);
        $('#video-iframe').css({ display: 'block' });

        // 去除视频框中无关元素
        waitForKeyElements('.live__view', function () {
          const liveView = $('#video-iframe').contents().find('.live__view');
          // liveView.children('section.live__wrap').css('padding-top', '0px');
          liveView.children(':not(.live__wrap)').remove();
          const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                liveView.children(':not(.live__wrap)').remove();
              }
            });
          });
          observer.observe(liveView[0], { childList: true });
        }, true, '#video-iframe');

        isVideoLoaded = true;
      } else {
        if (isVideoLoaded && !(iframeUrl && newIFrameUrl.includes(iframeUrl))) {
          // 退出视频课程时停止播放并隐藏右边栏视频
          $('#video-iframe').css({ display: 'none' });
          iframeUrl = newIFrameUrl;
          // DO NOT USE: $("#video-iframe").attr("src", "/v/index");
          const videoIFrame = $('#video-iframe')[0];
          videoIFrame.contentWindow.location.replace('about:blank');

          isVideoLoaded = false;
        }
      }
    });

    const config = { childList: true, subtree: true };
    iframeObserver.observe(iframeBody, config);
    DEBUG && console.log('observation started');

    // 在 iframe 被重新加载（点击左侧导航栏、进入直播）时，重新添加 handler
    $('#rainiframe')[0].contentWindow.addEventListener('unload', () => {
      DEBUG && console.log('#rainiframe has (re)loaded');
      // 右边栏视频停止播放并隐藏
      $('#video-iframe').css({ display: 'none' });
      const videoIFrame = $('#video-iframe')[0];
      videoIFrame.contentWindow.location.replace('about:blank');
      $('#rainiframe').contents().empty();
      waitForKeyElements('body', function () {
        addVideoHandler();
      }, true, '#rainiframe');
    });
  }


  // ==== DO NOT MODIFY
  // ==== third-party utility functions:
  /*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
    IMPORTANT: This function requires your script to have loaded jQuery.
  */
  function waitForKeyElements(
    selectorTxt,    /* Required: The jQuery selector string that
                      specifies the desired element(s).
                  */
    actionFunction, /* Required: The code to run when elements are
                      found. It is passed a jNode to the matched
                      element.
                  */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                      new elements even after the first match is
                      found.
                  */
    iframeSelector  /* Optional: If set, identifies the iframe to
                      search.
                  */
  ) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == 'undefined')
      targetNodes = $(selectorTxt);
    else
      targetNodes = $(iframeSelector).contents()
        .find(selectorTxt);

    if (targetNodes && targetNodes.length > 0) {
      btargetsFound = true;
      /*--- Found target node(s).  Go through each and act if they
          are new.
      */
      targetNodes.each(function () {
        var jThis = $(this);
        var alreadyFound = jThis.data('alreadyFound') || false;

        if (!alreadyFound) {
          //--- Call the payload function.
          var cancelFound = actionFunction(jThis);
          if (cancelFound)
            btargetsFound = false;
          else
            jThis.data('alreadyFound', true);
        }
      });
    }
    else {
      btargetsFound = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace(/[^\w]/g, '_');
    var timeControl = controlObj[controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
      //--- The only condition where we need to clear the timer.
      clearInterval(timeControl);
      delete controlObj[controlKey];
    }
    else {
      //--- Set a timer, if needed.
      if (!timeControl) {
        timeControl = setInterval(function () {
          waitForKeyElements(
            selectorTxt, actionFunction, bWaitOnce, iframeSelector
          );
        }, 300);
        controlObj[controlKey] = timeControl;
      }
    }
    waitForKeyElements.controlObj = controlObj;
  }

})();

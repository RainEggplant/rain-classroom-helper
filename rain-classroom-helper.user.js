// ==UserScript==
// @name         Rain Classroom Helper
// @namespace    https://raineggplant.com/
// @version      0.1.1
// @description  优化雨课堂使用体验
// @author       RainEggplant
// @match        *://www.yuketang.cn/web*
// @match        *://pro.yuketang.cn/web*
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
    .panel {
      padding-top: 34px !important;
    }
    .nav-list {
      font-size: 18px !important;
    }
    .nav-item {
      height: 50px !important;
      line-height: 32px !important;
    }
    .kecheng, .kejian, .shiti, .geren, .addlink {
      width: 32px !important;
    }
    .left .contact-us {
      display: block !important;
    }
  `);

  // 调整右边栏样式
  GM_addStyle(`
    .right {
      width: 300px !important;
    }
    .control-panel {
      padding-top: 32px !important;
    }
    .title {
      font-size: 22px !important;
    }
    .page-nav-control {
      width: 300px !important;
    }
    .page-control {
      padding-top: 15px !important;
    }
    .page-nav {
      padding: unset !important;
      font-size: 18px !important;
    }
    .kecheng, .kejian, .shiti, .geren, .addlink {
      width: 32px !important;
    }
    .print-preview-box {
      margin: 0px 0 0 !important;
    }
    .contact-us {
      display: none;
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
      margin-right: 300px !important;
      float: none !important;
    }
    .rain-iframe {
      width: calc(100% - 50px) !important;
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
      width: 300px;
      height: 285px;
      margin-top: 20px;
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

  // 中间 iframe 加载出内容后绑定处理视频的函数
  waitForKeyElements('body', addVideoHandler, true, '#rainiframe');

  // 启动将课件中视频提到右边栏播放的处理函数
  function startObservation() {
    const rainIFrame = document.getElementById('rainiframe').contentWindow
      .document.body;
    let iframeUrl = '';
    let isVideoLoaded = false;

    const observer = new MutationObserver(function () {
      // change in #rainiframe detected
      DEBUG && console.log('change in #rainiframe detected');
      const newIFrameUrl = $('#rainiframe').contents().get(0).location.href;
      const videoSection = rainIFrame.querySelector('section.live__wrap');
      if (videoSection) {
        // 存在视频
        // 去除中央 rainIFrame 中的视频
        $(videoSection).attr('style', 'display: none;');
        $(videoSection).contents().find('video').removeAttr('src');
        $(videoSection).empty();

        if (newIFrameUrl === iframeUrl) return;

        // 在右边栏显示视频
        // note: 不要使用 $("#video-iframe").attr("src", iframeUrl);
        //       因为这样会留下访问记录，从而使后退、前进功能异常
        iframeUrl = newIFrameUrl;
        const videoIFrame = $('#video-iframe')[0];
        videoIFrame.contentWindow.location.replace(iframeUrl);
        $('#video-iframe').css({ display: 'block' });

        isVideoLoaded = true;
      } else {
        if (isVideoLoaded) {
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
    observer.observe(rainIFrame, config);
    DEBUG && console.log('Observation started');
  }

  function addVideoHandler() {
    // 首次进入或通过左边栏改变页面时
    $('#rainiframe').on('load', function () {
      DEBUG && console.log('#rainiframe has (re)loaded');
      // 右边栏视频停止播放并隐藏
      $('#video-iframe').css({ display: 'none' });
      const videoIFrame = $('#video-iframe')[0];
      videoIFrame.contentWindow.location.replace('about:blank');

      startObservation();
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

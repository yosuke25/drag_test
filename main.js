// 厳格モードを使用
'use strict';

// アロー関数の即時関数
(() => {

  let dragObject;
  let targetObject;

  // DOMの読み込み完了を検知
  window.addEventListener('load', () => {
    // dragObjectのDOMを取得
    dragObject = document.getElementById('dragObject');
    // dragObjectを移動
    setStyle(dragObject, {
      transform: 'translate(150px, 150px)'
    });
    // targetObjectのDOMを取得
    targetObject = document.getElementById('targetObject');

    // ドラッグの開始を待機
    standbyDrag();
  }, false)

  // ドラッグの開始等を待機
  function standbyDrag () {
    // ドラッグ出来るかどうか
    let dragFlag = false;

    // dragObject上でマウスが押されたら
    dragObject.addEventListener('mousedown', () => {
      console.log('down');
      dragFlag = true;
    }, false);

    // body上でマウスが離されたら
    document.body.addEventListener('mouseup', () => {
      console.log('up');
      dragFlag = false;
    }, false);

    // body上からマウスが出たら
    document.body.addEventListener('mouseleave', () => {
      console.log('leave');
      dragFlag = false;
    }, false);

    // body上でマウスが動かされたら
    document.body.addEventListener('mousemove', (event) => {
      // dragFlagが無効ならreturn
      if (!dragFlag) {
        return;
      }

      // 古い位置を取得
      let oldTranslate = dragObject.style.transform;
      let oldXY = oldTranslate.slice(10, (oldTranslate.length - 1)).split(', ');
      let oldX = oldXY[0];
      let oldY = oldXY[1];

      // 新しい位置を計算
      let newX = Number(oldX.slice(0, (oldX.length - 2))) + event.movementX;
      let newY = Number(oldY.slice(0, (oldY.length - 2))) + event.movementY;

      // // 新しい位置に移動
      setStyle(dragObject, {
        transform: `translate(${newX}px, ${newY}px)`
      });

      // 重なり判定
      let result = judgeOverlap(event.clientX, event.clientY, targetObject);
      if (result) {
        // 背景に明るい青色を指定
        setStyle(targetObject, {
          'background-color': 'rgb(77, 189, 249)'
        });
      } else {
        // 背景に青色を指定
        setStyle(targetObject, {
          'background-color': '#2595C7'
        });
      }

    }, false);
  }

  // 重なり判定
  function judgeOverlap (x, y, elem) {
    if ((elem.offsetLeft <= x) && (x <= (elem.offsetWidth + elem.offsetLeft))
     && (elem.offsetTop <= y) && (y <= (elem.offsetHeight + elem.offsetTop))) {
      return true;
    } else {
      return false;
    }
  }

  // スタイルの設定
  function setStyle (element, styles) {
    let keys = Object.keys(styles);
    for (let i in keys) {
      element.style[keys[i]] = styles[keys[i]];
    }
  }

})();

// src/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // 現在のURLパスを取得

  useEffect(() => {
    // パスが変更されるたびにページのトップにスクロール
    window.scrollTo(0, 0); // X座標0, Y座標0へスクロール
    // または、よりスムーズなスクロールにする場合
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  }, [pathname]); // pathnameが変更されるたびにこの効果を実行

  return null; // このコンポーネント自体は何もレンダリングしない
};

export default ScrollToTop;
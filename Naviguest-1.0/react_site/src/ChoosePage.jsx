import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 画像のインポート
import backbutton from './assets/BackButton.png';
import topbutton from './assets/TopButton.png';

// ジャンル選択ボタンの画像
import Genre1Image from './assets/genre1.png';
import Genre2Image from './assets/genre2.png';
import Genre3Image from './assets/genre3.png';
import Genre4Image from './assets/genre4.png';
import Genre5Image from './assets/genre5.png';
import Genre6Image from './assets/genre6.png';
import Genre7Image from './assets/genre7.png';
import Genre8Image from './assets/genre8.png';
import Genre9Image from './assets/genre9.png';

// 各ジャンルの詳細画像
import Genre1aImage from './assets/genre1-1.png';
import Genre1bImage from './assets/genre1-2.png';
import Genre1cImage from './assets/genre1-3.png';
import Genre1dImage from './assets/genre1-4.png';
import Genre1eImage from './assets/genre1-5.png';
import Genre1fImage from './assets/genre1-6.png';
import Genre1gImage from './assets/genre1-7.png';
import Genre1hImage from './assets/genre1-8.png';
import Genre1iImage from './assets/genre1-9.png';

import Genre2aImage from './assets/genre2-1.png';
import Genre2bImage from './assets/genre2-2.png';
import Genre2cImage from './assets/genre2-3.png';
import Genre2dImage from './assets/genre2-4.png';

import Genre3aImage from './assets/genre3-1.png';
import Genre3bImage from './assets/genre3-2.png';
import Genre3cImage from './assets/genre3-3.png';

import Genre4aImage from './assets/genre4-1.png';
import Genre4bImage from './assets/genre4-2.png';
import Genre4cImage from './assets/genre4-3.png';
import Genre4dImage from './assets/genre4-4.png';

import Genre5aImage from './assets/genre5-1.png';
import Genre5bImage from './assets/genre5-2.png';
import Genre5cImage from './assets/genre5-3.png';
import Genre5dImage from './assets/genre5-4.png';
import Genre5eImage from './assets/genre5-5.png';

import Genre6aImage from './assets/genre6-1.png';
import Genre6bImage from './assets/genre6-2.png';
import Genre6cImage from './assets/genre6-3.png';
import Genre6dImage from './assets/genre6-4.png';
import Genre6eImage from './assets/genre6-5.png';
import Genre6fImage from './assets/genre6-6.png';
import Genre6gImage from './assets/genre6-7.png';
import Genre6hImage from './assets/genre6-8.png';
import Genre6iImage from './assets/genre6-9.png';
import Genre6jImage from './assets/genre6-10.png';
import Genre6kImage from './assets/genre6-11.png';
import Genre6lImage from './assets/genre6-12.png';
import Genre6mImage from './assets/genre6-13.png';

import Genre7aImage from './assets/genre7-1.png';
import Genre7bImage from './assets/genre7-2.png';
import Genre7cImage from './assets/genre7-3.png';
import Genre7dImage from './assets/genre7-4.png';
import Genre7eImage from './assets/genre7-5.png';
import Genre7fImage from './assets/genre7-6.png';

import Genre8aImage from './assets/genre8-1.png';
import Genre8bImage from './assets/genre8-2.png';

const SelectionScreen = () => {
  const navigate = useNavigate();

  // スクロール先の参照を定義
  const genre1aRef = useRef(null);
  const genre2aRef = useRef(null);
  const genre3aRef = useRef(null);
  const genre4aRef = useRef(null);
  const genre5aRef = useRef(null);
  const genre6aRef = useRef(null);
  const genre7aRef = useRef(null);
  const genre8aRef = useRef(null);

  const [pythonMessage, setPythonMessage] = useState('Pythonからのメッセージを待機中...');
  const [showTopButton, setShowTopButton] = useState(false);

  // スクロール処理
  const handleScrollToGenre1a = () => {
    genre1aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre2a = () => {
    genre2aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre3a = () => {
    genre3aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre4a = () => {
    genre4aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre5a = () => {
    genre5aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre6a = () => {
    genre6aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre7a = () => {
    genre7aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre8a = () => {
    genre8aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Pythonとの通信設定
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5000/api/hello';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => setPythonMessage(data.message))
      .catch(error => {
        console.error("Python API呼び出しエラー:", error);
        setPythonMessage('Pythonバックエンドに接続できませんでした。');
      });

    // スクロールイベントリスナーを設定
    const handleScroll = () => {
      // ページのスクロール位置が一定以上（例: 200px）になったらボタンを表示
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数: コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 送信する値（目的地の番号）の設定を共通化
  const sendGoalNode = async (valueToSend) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal_node: valueToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pythonからの応答:", data);
      navigate('/map'); // Map.jsxへ遷移

    } catch (error) {
      console.error("目的地の送信エラー:", error);
      alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
    }
  };

  // 各ジャンルポイントのクリックハンドラ
  const handleGenrepoint1Click = () => sendGoalNode(1);
  const handleGenrepoint2Click = () => sendGoalNode(2);
  const handleGenrepoint3Click = () => sendGoalNode(3);
  const handleGenrepoint5Click = () => sendGoalNode(5);
  const handleGenrepoint6Click = () => sendGoalNode(6);
  const handleGenrepoint7Click = () => sendGoalNode(7);
  const handleGenrepoint8Click = () => sendGoalNode(8);
  const handleGenrepoint9Click = () => sendGoalNode(9);
  const handleGenrepoint10Click = () => sendGoalNode(10);
  const handleGenrepoint11Click = () => sendGoalNode(11);
  const handleGenrepoint12Click = () => sendGoalNode(12);
  const handleGenrepoint13Click = () => sendGoalNode(13);
  const handleGenrepoint14Click = () => sendGoalNode(14);
  const handleGenrepoint15Click = () => sendGoalNode(15);
  const handleGenrepoint16Click = () => sendGoalNode(16);
  const handleGenrepoint17Click = () => sendGoalNode(17);
  const handleGenrepoint18Click = () => sendGoalNode(18);
  const handleGenrepoint19Click = () => sendGoalNode(19);
  const handleGenrepoint20Click = () => sendGoalNode(20);
  const handleGenrepoint21Click = () => sendGoalNode(21);
  const handleGenrepoint25Click = () => sendGoalNode(25);
  const handleGenrepoint26Click = () => sendGoalNode(26);
  const handleGenrepoint27Click = () => sendGoalNode(27);
  const handleGenrepoint31Click = () => sendGoalNode(31);
  const handleGenrepoint32Click = () => sendGoalNode(32);

  // 9つのジャンル選択ボタンのデータを配列で管理
  const mainGenres = [
    { src: Genre1Image, alt: "ジャンル1", onClick: handleScrollToGenre1a },
    { src: Genre2Image, alt: "ジャンル2", onClick: handleScrollToGenre2a },
    { src: Genre3Image, alt: "ジャンル3", onClick: handleScrollToGenre3a },
    { src: Genre4Image, alt: "ジャンル4", onClick: handleScrollToGenre4a },
    { src: Genre5Image, alt: "ジャンル5", onClick: handleScrollToGenre5a },
    { src: Genre6Image, alt: "ジャンル6", onClick: handleScrollToGenre6a },
    { src: Genre7Image, alt: "ジャンル7", onClick: handleScrollToGenre7a },
    { src: Genre8Image, alt: "ジャンル8", onClick: handleScrollToGenre8a },
    // ジャンル9はスクロールではなくAPI送信のため、直接onClickを設定
    { src: Genre9Image, alt: "ジャンル9", onClick: handleGenrepoint1Click },
  ];

  // ページトップへスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* ヘッダー */}
      <header
        style={{
          backgroundColor: '#0066cc', color: 'white', padding: '1rem 2rem', textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul
            style={{
              listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem',
            }}
          >
          </ul>
        </nav>
      </header>

      {/* 説明テキスト */}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2>
          案内を希望するカテゴリーを選んでください。<br />
          選択されたカテゴリーに対応する部署の一覧まで、自動でスクロールします。
        </h2>
      </div>

      {/* --- ジャンル一覧 (3x3グリッド) --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3列均等幅
          gap: '2rem', // 各画像間の隙間
          maxWidth: '960px', // 全体の最大幅
          margin: '0 auto', // 中央寄せ
          padding: '2rem', // 全体のパディング
        }}
      >
        {mainGenres.map((genre, index) => (
          <div
            key={index}
            style={{
              textAlign: 'center',
              display: 'flex', // 画像を中央揃えにするため
              justifyContent: 'center', // 画像を水平方向で中央揃え
              alignItems: 'center', // 画像を垂直方向で中央揃え
              marginBottom: index < 6 ? '0' : '5rem' // 最後の行のみ下マージンを大きくする
            }}
          >
            <img
              src={genre.src}
              alt={genre.alt}
              style={{
                width: '100%', // 親要素に合わせて幅を100%に
                maxWidth: '300px', // 画像の最大幅
                height: 'auto',
                cursor: 'pointer',
              }}
              onClick={genre.onClick}
            />
          </div>
        ))}
      </div>
      {/* --- ジャンル一覧 終わり --- */}

      {/* 部署等 */}

      {/* ジャンル1 */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>手続き・証明・財務</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre1aRef}
          src={Genre1aImage}
          alt="ジャンル1-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint5Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1bImage}
          alt="ジャンル1-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint2Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1cImage}
          alt="ジャンル1-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint10Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1dImage}
          alt="ジャンル1-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint13Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1eImage}
          alt="ジャンル1-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint6Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1fImage}
          alt="ジャンル1-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint15Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1gImage}
          alt="ジャンル1-7"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint7Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre1hImage}
          alt="ジャンル1-8"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint21Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre1iImage}
          alt="ジャンル1-9"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint21Click}
        />
      </div>

      {/* ジャンル2 */}
      <div style={{ textAlign: 'center' }}>
        <h2>子育て・家庭支援</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre2aRef}
          src={Genre2aImage}
          alt="ジャンル2-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint7Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre2bImage}
          alt="ジャンル2-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint26Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre2cImage}
          alt="ジャンル2-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint26Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre2dImage}
          alt="ジャンル2-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint27Click}
        />
      </div>

      {/* ジャンル3 */}
      <div style={{ textAlign: 'center' }}>
        <h2>健康・医療・保険</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre3aRef}
          src={Genre3aImage}
          alt="ジャンル3-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint8Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre3bImage}
          alt="ジャンル3-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint25Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre3cImage}
          alt="ジャンル3-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      {/* ジャンル4 */}
      <div style={{ textAlign: 'center' }}>
        <h2>高齢者・障がい者・生活困窮者支援</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre4aRef}
          src={Genre4aImage}
          alt="ジャンル4-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint8Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre4bImage}
          alt="ジャンル4-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint9Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre4cImage}
          alt="ジャンル4-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint3Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre4dImage}
          alt="ジャンル4-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      {/* ジャンル5 */}
      <div style={{ textAlign: 'center' }}>
        <h2>雇用・経済・企業・産業復興</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre5aRef}
          src={Genre5aImage}
          alt="ジャンル5-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre5bImage}
          alt="ジャンル5-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint13Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre5cImage}
          alt="ジャンル5-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint10Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre5dImage}
          alt="ジャンル5-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre5eImage}
          alt="ジャンル5-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      {/* ジャンル6 */}
      <div style={{ textAlign: 'center' }}>
        <h2>住宅・都市計画・まちづくり</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre6aRef}
          src={Genre6aImage}
          alt="ジャンル6-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint20Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6bImage}
          alt="ジャンル6-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6cImage}
          alt="ジャンル6-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint20Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6dImage}
          alt="ジャンル6-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint19Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6eImage}
          alt="ジャンル6-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint19Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6fImage}
          alt="ジャンル6-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint32Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6gImage}
          alt="ジャンル6-7"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6hImage}
          alt="ジャンル6-8"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6iImage}
          alt="ジャンル6-9"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6jImage}
          alt="ジャンル6-10"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint15Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6kImage}
          alt="ジャンル6-11"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre6lImage}
          alt="ジャンル6-12"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint14Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre6mImage}
          alt="ジャンル6-13"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint14Click}
        />
      </div>

      {/* ジャンル7 */}
      <div style={{ textAlign: 'center' }}>
        <h2>広報・市民対応・行政運営</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre7aRef}
          src={Genre7aImage}
          alt="ジャンル7-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre7bImage}
          alt="ジャンル7-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre7cImage}
          alt="ジャンル7-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre7dImage}
          alt="ジャンル7-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre7eImage}
          alt="ジャンル7-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <img
          src={Genre7fImage}
          alt="ジャンル7-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint18Click}
        />
      </div>

      {/* ジャンル8 */}
      <div style={{ textAlign: 'center' }}>
        <h2>会議・相談</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          ref={genre8aRef}
          src={Genre8aImage}
          alt="ジャンル8-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint3Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={Genre8bImage}
          alt="ジャンル8-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint31Click}
        />
      </div>

      {/* 戻るボタン */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Link to="/startpoint">
          <img
            src={backbutton}
            alt="戻る"
            style={{
              width: '200px',
              height: 'auto',
              cursor: 'pointer',
              border: 'none',
              verticalAlign: 'middle',
            }}
          />
        </Link>
      </div>

      {/* トップに戻るボタン */}
      {showTopButton && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <img
            src={topbutton}
            alt="ページトップへ"
            onClick={scrollToTop}
            style={{
              width: '180px',
              height: 'auto',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      )}

      {/* フッター */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default SelectionScreen;
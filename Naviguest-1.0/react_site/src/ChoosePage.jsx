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
  const genre1bRef = useRef(null);
  const genre2bRef = useRef(null);
  const genre3bRef = useRef(null);
  const genre4bRef = useRef(null);
  const genre5bRef = useRef(null);
  const genre6bRef = useRef(null);
  const genre7bRef = useRef(null);
  const genre8bRef = useRef(null);

  const [pythonMessage, setPythonMessage] = useState('Pythonからのメッセージを待機中...');
  const [showTopButton, setShowTopButton] = useState(false);

  // スクロール処理
  // block: 'center' を追加して、要素が画面中央に来るようにする
  const handleScrollToGenre1a = () => {
    genre1bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre2a = () => {
    genre2bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre3a = () => {
    genre3bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre4a = () => {
    genre4bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre5a = () => {
    genre5bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre6a = () => {
    genre6bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre7a = () => {
    genre7bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const handleScrollToGenre8a = () => {
    genre8bRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  // Pythonとの通信設定
  useEffect(() => {
    // 環境変数からAPIのベースURLを取得し、'/hello' エンドポイントに接続
    // process.env.REACT_APP_API_URL が未定義の場合に備えて空文字列をデフォルト値に設定
    const apiBaseUrl = process.env.REACT_APP_API_URL || '';
    const apiUrl = `${apiBaseUrl}/hello`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
            // エラーの詳細情報を含める
            return response.text().then(text => {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
            });
        }
        return response.json();
      })
      .then(data => setPythonMessage(data.message))
      .catch(error => {
        console.error("Python API呼び出しエラー:", error);
        setPythonMessage(`Pythonバックエンドに接続できませんでした: ${error.message}`);
      });

    // スクロールイベントリスナーを設定
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 送信する値（目的地の番号）の設定を共通化
  const sendGoalNode = async (valueToSend) => {
    try {
      // 環境変数からAPIのベースURLを取得
      const apiBaseUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/update_goal`, { // update_goalエンドポイント
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal_node: valueToSend }),
      });

      if (!response.ok) {
        // エラーの詳細情報を含める
        return response.text().then(text => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
        });
      }

      const data = await response.json();
      console.log("Pythonからの応答:", data);
      navigate('/map'); // Map.jsxへ遷移

    } catch (error) {
      console.error("目的地の送信エラー:", error);
      alert(`目的地の送信に失敗しました。詳細をコンソールで確認してください: ${error.message}`);
    }
  };

  // 各ジャンルポイントのクリックハンドラ (変更なし)
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

  // 9つのジャンル選択ボタンのデータを配列で管理 (変更なし)
  const mainGenres = [
    { src: Genre1Image, alt: "ジャンル1", onClick: handleScrollToGenre1a },
    { src: Genre2Image, alt: "ジャンル2", onClick: handleScrollToGenre2a },
    { src: Genre3Image, alt: "ジャンル3", onClick: handleScrollToGenre3a },
    { src: Genre4Image, alt: "ジャンル4", onClick: handleScrollToGenre4a },
    { src: Genre5Image, alt: "ジャンル5", onClick: handleScrollToGenre5a },
    { src: Genre6Image, alt: "ジャンル6", onClick: handleScrollToGenre6a },
    { src: Genre7Image, alt: "ジャンル7", onClick: handleScrollToGenre7a },
    { src: Genre8Image, alt: "ジャンル8", onClick: handleScrollToGenre8a },
    { src: Genre9Image, alt: "ジャンル9", onClick: handleGenrepoint1Click }, // ジャンル9はスクロールではなくAPI送信
  ];

  // 各ジャンルの詳細画像データを配列で定義 (変更なし)
  const detailGenres = {
    genre1: [
      { src: Genre1aImage, onClick: handleGenrepoint5Click, alt: "ジャンル1-1" },
      { src: Genre1bImage, onClick: handleGenrepoint2Click, alt: "ジャンル1-2", ref: genre1bRef }, // ★refをここに設定
      { src: Genre1cImage, onClick: handleGenrepoint10Click, alt: "ジャンル1-3" },
      { src: Genre1dImage, onClick: handleGenrepoint13Click, alt: "ジャンル1-4" },
      { src: Genre1eImage, onClick: handleGenrepoint6Click, alt: "ジャンル1-5" },
      { src: Genre1fImage, onClick: handleGenrepoint15Click, alt: "ジャンル1-6" },
      { src: Genre1gImage, onClick: handleGenrepoint7Click, alt: "ジャンル1-7" },
      { src: Genre1hImage, onClick: handleGenrepoint21Click, alt: "ジャンル1-8" },
      { src: Genre1iImage, onClick: handleGenrepoint21Click, alt: "ジャンル1-9" },
    ],
    genre2: [
      { src: Genre2aImage, onClick: handleGenrepoint7Click, alt: "ジャンル2-1" },
      { src: Genre2bImage, onClick: handleGenrepoint26Click, alt: "ジャンル2-2", ref: genre2bRef }, // ★refをここに設定
      { src: Genre2cImage, onClick: handleGenrepoint26Click, alt: "ジャンル2-3" },
      { src: Genre2dImage, onClick: handleGenrepoint27Click, alt: "ジャンル2-4" },
    ],
    genre3: [
      { src: Genre3aImage, onClick: handleGenrepoint8Click, alt: "ジャンル3-1" },
      { src: Genre3bImage, onClick: handleGenrepoint25Click, alt: "ジャンル3-2", ref: genre3bRef }, // ★refをここに設定
      { src: Genre3cImage, onClick: handleGenrepoint12Click, alt: "ジャンル3-3" },
    ],
    genre4: [
      { src: Genre4aImage, onClick: handleGenrepoint8Click, alt: "ジャンル4-1" },
      { src: Genre4bImage, onClick: handleGenrepoint9Click, alt: "ジャンル4-2", ref: genre4bRef }, // ★refをここに設定
      { src: Genre4cImage, onClick: handleGenrepoint3Click, alt: "ジャンル4-3" },
      { src: Genre4dImage, onClick: handleGenrepoint11Click, alt: "ジャンル4-4" },
    ],
    genre5: [
      { src: Genre5aImage, onClick: handleGenrepoint11Click, alt: "ジャンル5-1" },
      { src: Genre5bImage, onClick: handleGenrepoint13Click, alt: "ジャンル5-2", ref: genre5bRef }, // ★refをここに設定
      { src: Genre5cImage, onClick: handleGenrepoint10Click, alt: "ジャンル5-3" },
      { src: Genre5dImage, onClick: handleGenrepoint11Click, alt: "ジャンル5-4" },
      { src: Genre5eImage, onClick: handleGenrepoint12Click, alt: "ジャンル5-5" },
    ],
    genre6: [
      { src: Genre6aImage, onClick: handleGenrepoint20Click, alt: "ジャンル6-1" },
      { src: Genre6bImage, onClick: handleGenrepoint12Click, alt: "ジャンル6-2", ref: genre6bRef }, // ★refをここに設定
      { src: Genre6cImage, onClick: handleGenrepoint20Click, alt: "ジャンル6-3" },
      { src: Genre6dImage, onClick: handleGenrepoint19Click, alt: "ジャンル6-4" },
      { src: Genre6eImage, onClick: handleGenrepoint19Click, alt: "ジャンル6-5" },
      { src: Genre6fImage, onClick: handleGenrepoint32Click, alt: "ジャンル6-6" },
      { src: Genre6gImage, onClick: handleGenrepoint11Click, alt: "ジャンル6-7" },
      { src: Genre6hImage, onClick: handleGenrepoint11Click, alt: "ジャンル6-8" },
      { src: Genre6iImage, onClick: handleGenrepoint12Click, alt: "ジャンル6-9" },
      { src: Genre6jImage, onClick: handleGenrepoint15Click, alt: "ジャンル6-10" },
      { src: Genre6kImage, onClick: handleGenrepoint16Click, alt: "ジャンル6-11" },
      { src: Genre6lImage, onClick: handleGenrepoint14Click, alt: "ジャンル6-12" },
      { src: Genre6mImage, onClick: handleGenrepoint14Click, alt: "ジャンル6-13" },
    ],
    genre7: [
      { src: Genre7aImage, onClick: handleGenrepoint17Click, alt: "ジャンル7-1" },
      { src: Genre7bImage, onClick: handleGenrepoint16Click, alt: "ジャンル7-2", ref: genre7bRef }, // ★refをここに設定
      { src: Genre7cImage, onClick: handleGenrepoint17Click, alt: "ジャンル7-3" },
      { src: Genre7dImage, onClick: handleGenrepoint16Click, alt: "ジャンル7-4" },
      { src: Genre7eImage, onClick: handleGenrepoint17Click, alt: "ジャンル7-5" },
      { src: Genre7fImage, onClick: handleGenrepoint18Click, alt: "ジャンル7-6" },
    ],
    genre8: [
      { src: Genre8aImage, onClick: handleGenrepoint3Click, alt: "ジャンル8-1" },
      { src: Genre8bImage, onClick: handleGenrepoint31Click, alt: "ジャンル8-2", ref: genre8bRef }, // ★refをここに設定
    ],
  };

  // ページトップへスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 詳細画像をレンダリングするヘルパー関数
  const renderDetailImages = (images) => {
    const rows = [];
    for (let i = 0; i < images.length; i += 3) {
      const rowImages = images.slice(i, i + 3);
      const remaining = images.length - i;

      let justifyContent = 'center'; // デフォルトは中央揃え

      if (remaining === 1) {
        justifyContent = 'center';
      } else if (remaining === 2) {
        justifyContent = 'center';
      }

      rows.push(
        <div
          key={i}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: justifyContent,
            gap: '0.5rem',
            marginBottom: '1rem',
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 1rem',
          }}
        >
          {rowImages.map((image, idx) => (
            <div
              key={idx}
              style={{
                flex: '0 0 auto',
                width: 'calc(33.33% - 0.67rem)',
                maxWidth: '300px',
                textAlign: 'center',
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  cursor: 'pointer',
                }}
                onClick={image.onClick}
                // imageオブジェクトにrefプロパティがある場合、それをimg要素に設定
                ref={image.ref || null}
              />
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      {/* ヘッダー */}
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '0.5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem' }}>

          </ul>
        </nav>
      </header>

      {/* 説明テキスト */}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h2>
          案内を希望するカテゴリーを選んでください。
          選択されたカテゴリーに対応する部署の一覧まで、自動でスクロールします。
        </h2>
      </div>

      {/* --- ジャンル一覧 (3x3グリッド) --- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3列均等幅
          gap: '0.5rem', // 各画像間の隙間
          maxWidth: '100%', // 全体の最大幅
          margin: '0 auto', // 中央寄せ
          padding: '0 1rem', // 全体のパディング
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
      {renderDetailImages(detailGenres.genre1)}
      <div style={{ marginBottom: '3rem' }} /> {/* 各ジャンルセクション間の余白 */}

      {/* ジャンル2 */}
      <div style={{ textAlign: 'center' }}>
        <h2>子育て・家庭支援</h2>
      </div>
      {renderDetailImages(detailGenres.genre2)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル3 */}
      <div style={{ textAlign: 'center' }}>
        <h2>健康・医療・保険</h2>
      </div>
      {renderDetailImages(detailGenres.genre3)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル4 */}
      <div style={{ textAlign: 'center' }}>
        <h2>高齢者・障がい者・生活困窮者支援</h2>
      </div>
      {renderDetailImages(detailGenres.genre4)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル5 */}
      <div style={{ textAlign: 'center' }}>
        <h2>雇用・経済・企業・産業復興</h2>
      </div>
      {renderDetailImages(detailGenres.genre5)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル6 */}
      <div style={{ textAlign: 'center' }}>
        <h2>住宅・都市計画・まちづくり</h2>
      </div>
      {renderDetailImages(detailGenres.genre6)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル7 */}
      <div style={{ textAlign: 'center' }}>
        <h2>広報・市民対応・行政運営</h2>
      </div>
      {renderDetailImages(detailGenres.genre7)}
      <div style={{ marginBottom: '3rem' }} />

      {/* ジャンル8 */}
      <div style={{ textAlign: 'center' }}>
        <h2>会議・相談</h2>
      </div>
      {renderDetailImages(detailGenres.genre8)}
      <div style={{ marginBottom: '3rem' }} />


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
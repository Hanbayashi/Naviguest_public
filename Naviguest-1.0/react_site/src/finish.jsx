// src/finish.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 戻るためにLinkを使用
import backbutton from './assets/BackButton.png'; // 戻るボタンの画像があれば

const FinishPage = () => {
  return (
    <>
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
      </header>

      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>目的地に到着しました！</h2>
        <p style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
          ナビゲーションのご利用ありがとうございました。
        </p>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          何かお手伝いできることがあれば、お近くのスタッフにお声がけください。
        </p>
      </div>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        {/* ホームに戻るボタン（スタート画面へ） */}
        <Link to="/"> {/* または /startpoint に戻っても良いでしょう */}
          <img src={backbutton} alt="ホームに戻る" style={{ width: '200px', height: 'auto', cursor: 'pointer' }} />
        </Link>
      </div>

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default FinishPage;
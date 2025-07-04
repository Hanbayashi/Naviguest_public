import React from 'react';
import { Link } from 'react-router-dom'; // ナビゲーション用にLinkをインポート
import CityHall from './assets/CityHall.jpg';

const HomePage = () => {
  return (
    <>
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem' }}>

          </ul>
        </nav>
      </header>

      <p style={{ padding: '2rem' }}>これは舞鶴市役所案内です。</p>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <img
        src={CityHall} // インポートした変数を使用
        alt="市役所の写真"
        style={{
          width: '300px',
          height: 'auto',
          maxWidth: '100%',
          scrollMarginTop: '100px', // スクロール位置の余白調整（任意）
        }}
      />
    </div>

      <div style={{ textAlign: 'center' }}>
        {/* 内部ナビゲーションにはLinkコンポーネントを使用 */}
        <Link to="/choose" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          border: 'none',
        }}>
          選択画面へ
        </Link>
      </div>

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom'; 
import CityHall from './assets/CityHall.jpg';
import startbutton from './assets/StartButton.png';

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

      <div style={{textAlign: 'center' }}>
        <h2>舞鶴市役所にご来庁いただきありがとうございます。</h2>
      </div>

      <div style={{textAlign: 'center' }}>
        <h2>このページでは、東舞鶴市役所各課の場所や施設へのアクセス方法をわかりやすくご紹介しています。</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <img
        src={CityHall}
        alt="市役所の写真"
        style={{
          width: '600px',
          height: 'auto',
          maxWidth: '100%',
          scrollMarginTop: '100px',
        }}
      />
    </div>

      <div style={{ marginBottom: '2rem',textAlign: 'center' }}>
          {/* 内部ナビゲーションにはLinkコンポーネントを使用 */}
          <Link to="/startpoint">
            <img
              src={startbutton}
              alt="スタートボタン"
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

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default HomePage;
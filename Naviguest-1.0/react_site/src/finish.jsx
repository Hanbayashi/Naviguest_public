// src/finish.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import backbutton from './assets/BackButton.png'; 
import choosebutton from './assets/Choosebutton.png'; 

const FinishPage = () => {
  return (
    <>
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '0.5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem' }}>

          </ul>
        </nav>
      </header>

      <div style={{ textAlign: 'center', padding: '1rem 2rem' }}>
        <h2>
          目的地に到着しました！<br />
          ナビゲストのご利用ありがとうございました。<br /><br />
          ・他の部署、出入口に行きたい場合は、「案内を続ける」を押してください。<br />
          ・最初の画面に戻りたい場合は、「戻る」を押してください。<br /><br />
          ※<span style={{ color: 'red' }}>令和７年７月から赤れんがパーク周辺駐車場が有料になりました。</span>（詳細は<a href="https://www.city.maizuru.kyoto.jp/0000013369.html" target="_blank">こちら</a>）<br />
    　　　　市役所利用者・東体育館利用者の駐車場利用料金は無料です。<br />
    　　　　１階総合案内で無料券の交付をお受けください。
        </h2>
      </div>

      <div
  style={{
    display: 'flex',
    justifyContent: 'center', 
    gap: '20px', 
    marginBottom: '2rem',
  }}
>
  {/* ホームに戻るボタン（スタート画面へ） - Now on the left */}
  <Link to="/">
    <img
      src={backbutton}
      alt="ホームに戻る"
      style={{ width: '200px', height: 'auto', cursor: 'pointer' }}
    />
  </Link>

  {/* ChoosePage.jsx へ戻るボタン */}
  <Link to="/choose">
    <img
      src={choosebutton}
      alt="目的地選択に戻る"
      style={{
        width: '200px',
        height: 'auto',
        cursor: 'pointer',
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

export default FinishPage;
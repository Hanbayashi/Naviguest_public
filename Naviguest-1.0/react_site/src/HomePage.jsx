import React from 'react';
import { Link } from 'react-router-dom';
import CityHall from './assets/CityHall.png';
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

      <div style={{
  textAlign: 'center', // 画像を中央揃えにする
  marginBottom: '2rem',
  marginTop: '2rem',
  // ここから追加・変更
  display: 'flex', // flexboxを有効にする
  justifyContent: 'center', // 子要素を水平方向に中央揃え
  alignItems: 'center', // 子要素を垂直方向に中央揃え (画像の場合は影響が少ないですが、一般的な中央揃えのパターンとして)
  width: 'fit-content', // コンテンツの幅に合わせる
  margin: '2rem auto' // 上下は2rem、左右は自動で中央揃え (marginTopとmarginBottomを上書きします)
}}>
  <img
    src={CityHall}
    alt="市役所の写真"
    style={{
      width: '400px',
      height: 'auto',
      maxWidth: '100%',
      // scrollMarginTopは画像のスクロール動作に関連するため、ここでは直接関係ありませんが、そのまま残します
      scrollMarginTop: '100px',
    }}
  />
</div>

      {/* ここでテキストの配置を左揃えに設定します */}
      <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: '800px', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '18px' }}>
          舞鶴市役所にご来庁いただきありがとうございます。
          このページでは、舞鶴市役所各課の場所や施設へのアクセス方法をわかりやすくご紹介しています。<br /><br />
          ※<span style={{ color: 'red' }}>令和７年７月から赤れんがパーク周辺駐車場が有料になりました。</span>（詳細は<a href="https://www.city.maizuru.kyoto.jp/0000013369.html" target="_blank" rel="noopener noreferrer">こちら</a>）<br />
          市役所利用者・東体育館利用者の駐車場利用料金は無料です。
          １階総合案内で無料券の交付をお受けください。
        </h2>
      </div>

      <div style={{ marginBottom: '2rem',textAlign: 'center' }}>
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
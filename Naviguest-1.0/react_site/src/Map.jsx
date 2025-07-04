import React, { useState, useEffect } from 'react'; // ① useEffect を追加
import { Link } from 'react-router-dom'; // 戻るボタン用にLinkをインポート
import backbutton from './assets/BackButton.png'; // 戻るボタン画像をインポート

// コンポーネント名を Map から MapPage に変更します
const MapPage = () => { // ② コンポーネント名を MapPage に変更
  const [arrivedNumber, setArrivedNumber] = useState('');

  // ③ Pythonから受け取った数値を保持するstateを追加
  const [currentNumberFromPython, setCurrentNumberFromPython] = useState(null);
  const [lastCalculatedResult, setLastCalculatedResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 数字以外の入力を防ぎ、2桁に制限するイベントハンドラ (既存のまま)
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 2) {
      setArrivedNumber(value);
    }
  };

  // ④ Pythonバックエンドから数値をフェッチするロジックを追加
  useEffect(() => {
    const fetchPythonNumber = async () => {
      try {
        setLoading(true);
        // Vercelにデプロイ後の相対パスを使用
        const response = await fetch('/api/get_current_number'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentNumberFromPython(data.current_number);
        setLastCalculatedResult(data.last_calculated_result);
      } catch (err) {
        console.error("MapPageでのPython API呼び出しエラー:", err);
        setError("Pythonからのデータ取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPythonNumber();
  }, []); // コンポーネントがマウントされたときに一度だけ実行


  return (
    <>
      {/* ヘッダー (既存のまま) */}
      <header
        style={{
          backgroundColor: '#0066cc',
          color: 'white',
          padding: '1rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
      </header>

      {/* マップコンテンツ (既存のまま) */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>現在地から目的地までの案内画面です</h2>
        <div
          style={{
            width: '80%',
            height: '400px',
            backgroundColor: '#f0f0f0',
            margin: '2rem auto',
            border: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: '#888',
          }}
        >
          マップ表示エリア
        </div>
      </div>

      {/* ⑤ Pythonからのデータ表示エリアを追加 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {loading ? (
          <p>Pythonからのデータ読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              Pythonが最後に認識した数値: <span style={{ color: '#0066cc' }}>
                {currentNumberFromPython !== null ? currentNumberFromPython.toFixed(2) : 'N/A'}
              </span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              Pythonでの計算結果: <span style={{ color: '#28a745' }}>
                {lastCalculatedResult !== null ? lastCalculatedResult.toFixed(2) : 'N/A'}
              </span>
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>
              ※Vercel Serverless Functionはステートレスなため、この数値は通常0です。
            </p>
          </>
        )}
      </div>

      {/* 既存の入力欄と表示エリア (変更なし) */}
      <p>到着した番号を入力してください。</p>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          pattern="\d{0,2}"
          inputMode="numeric"
          value={arrivedNumber}
          onChange={handleInputChange}
          placeholder="例: 12"
          maxLength="2"
          style={{
            padding: '0.8rem',
            fontSize: '1.2rem',
            width: '250px',
            textAlign: 'center',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
          入力された番号: <span style={{ color: '#0066cc' }}>{arrivedNumber}</span>
        </p>
      </div>

      {/* 戻るボタン (既存のまま) */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/choose">
          <img src={backbutton} alt="戻る" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      {/* フッター (既存のまま) */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

// コンポーネント名を MapPage に変更してエクスポート
export default MapPage;
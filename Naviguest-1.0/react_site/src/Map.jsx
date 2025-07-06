import React, { useState, useEffect } from 'react'; // useEffect を追加
import { Link } from 'react-router-dom'; // 戻るボタン用にLinkをインポート
import backbutton from './assets/BackButton.png'; // 戻るボタン画像をインポート

const MapPage = () => {
  const [arrivedNumber, setArrivedNumber] = useState('');

  // Pythonから受け取った数値を保持するstateを追加
  const [currentNumberFromPython, setCurrentNumberFromPython] = useState(null);
  const [lastCalculatedResult, setLastCalculatedResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [inputError, setInputError] = useState('');

  // 数字以外の入力を防ぎ、範囲を制限するイベントハンドラを修正
  const handleInputChange = (e) => {
    const value = e.target.value;

    // 1. 数字以外の入力を防ぐ
    if (!/^\d*$/.test(value)) {
      // 数字以外が入力された場合は何もしないか、エラーを表示
      // setInputError('数字のみ入力してください。'); // エラー表示したい場合
      return;
    }

    // 2. 2桁（最大値32を考慮）に制限
    if (value.length > 2) {
      return; // 2桁を超えたら処理しない
    }

    // 3. 値が空の場合はエラーメッセージをクリアしてstateを更新
    if (value === '') {
      setArrivedNumber('');
      setInputError('');
      return;
    }

    // 4. 数値に変換して範囲をチェック
    const numValue = parseInt(value, 10);

    // 数値として有効で、かつ範囲内にあるかチェック
    if (isNaN(numValue)) {
      // parseIntでNaNになることは、上記の /^\d*$/ で防いでいるため、通常ここには来ない
      setArrivedNumber(value);
      setInputError('有効な数値を入力してください。');
    } else if (numValue < 1 || numValue > 32) {
      setArrivedNumber(value); // 一旦入力された値は表示
      setInputError('1から32までの数字を入力してください。');
    } else {
      // 全ての条件を満たした場合
      setArrivedNumber(value);
      setInputError(''); // エラーメッセージをクリア
    }
  };

  // Pythonバックエンドから数値をフェッチするロジックを追加
  useEffect(() => {
    const fetchPythonNumber = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/api/get_current_number'); 
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

      {/* Pythonからのデータ表示エリアを追加 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {loading ? (
          <p>Pythonからのデータ読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              Pythonが最後に認識した数値: <span style={{ color: '#0066cc' }}>
                {currentNumberFromPython !== null ? currentNumberFromPython: 'N/A'}
              </span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              Pythonでの計算結果: <span style={{ color: '#28a745' }}>
                {lastCalculatedResult !== null ? lastCalculatedResult : 'N/A'}
              </span>
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>
            </p>
          </>
        )}
      </div>

      {/* 既存の入力欄と表示エリア (変更なし) */}
      <p>到着した番号を入力してください。</p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}> {/* マージン調整 */}
        <input
          type="text" // type="number" に変更すると、ブラウザのバリデーションが追加されるが、handleInputChangeで制御するため text のままでもOK
          // pattern と maxLength は handleInputChange でより厳密に制御するため、必須ではないが残しておいても害はない
          pattern="\d{1,2}" // 1桁または2桁の数字 (最小1を暗に示唆)
          inputMode="numeric"
          value={arrivedNumber}
          onChange={handleInputChange}
          placeholder="例: 12 (1〜32)" // プレースホルダーを更新
          maxLength="2" // 2桁に制限
          style={{
            padding: '0.8rem',
            fontSize: '1.2rem',
            width: '250px',
            textAlign: 'center',
            borderRadius: '5px',
            border: inputError ? '2px solid red' : '1px solid #ccc', // エラー時に赤枠
          }}
        />
        {/* エラーメッセージの表示 */}
        {inputError && (
          <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {inputError}
          </p>
        )}
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
// import topbutton from './assets/TopButton.png'; // ★★★ TopButton画像をインポートしない ★★★

const MapPage = () => {
  const [arrivedNumber, setArrivedNumber] = useState(''); // 既存の入力欄用
  const [inputError, setInputError] = useState('');     // 既存の入力欄用エラー

  // 経路探索結果を保持するState
  const [nextPoint, setNextPoint] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [goalNode, setGoalNode] = useState(null); // 設定された目的地ノード
  const [guidanceMessage, setGuidanceMessage] = useState('経路案内を待機中...'); // Pythonからの案内メッセージ

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 現在のマップ上のノードを管理するState（初期位置を1とする）
  // この値を変更することで、Pythonに新しい現在地を伝え、次の経路を取得します
  const [currentMapNode, setCurrentMapNode] = useState(1);


  // 数字以外の入力を防ぎ、範囲を制限するイベントハンドラ (変更なし)
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    if (value.length > 2) {
      return;
    }
    if (value === '') {
      setArrivedNumber('');
      setInputError('');
      return;
    }
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      setArrivedNumber(value);
      setInputError('有効な数値を入力してください。');
    } else if (numValue < 1 || numValue > 32) {
      setArrivedNumber(value);
      setInputError('1から32までの数字を入力してください。');
    } else {
      setArrivedNumber(value);
      setInputError('');
    }
  };

  // ★★★ ページトップへスクロールする関数を削除 ★★★
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  // Pythonバックエンドから経路データをフェッチするロジックを修正
  // currentMapNode が変更されるたびに実行される
  useEffect(() => {
    const fetchPathData = async () => {
      try {
        setLoading(true);
        setError(null); // エラーをリセット

        // /api/get_next_point に現在のノードをPOSTで送信
        const response = await fetch('http://127.0.0.1:5000/api/get_next_point', {
          method: 'POST', // POSTリクエスト
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_node: currentMapNode }), // 現在のノードを送信
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Pythonからの経路探索結果をStateにセット
        setNextPoint(data.next_point);
        setCurrentFloor(data.current_floor);
        setCurrentBuilding(data.current_building);
        setGoalNode(data.goal_node);
        setGuidanceMessage(data.message);

      } catch (err) {
        console.error("MapPageでのPython API呼び出しエラー:", err);
        setError("経路データの取得に失敗しました。");
        setGuidanceMessage("経路データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPathData(); // コンポーネトがマウントされた時と currentMapNode が変わった時に実行

    // ★★★ スクロールイベントリスナーの設定（トップボタン用）を削除 ★★★
    // const handleScroll = () => {
    //   if (window.scrollY > 200) {
    //     setShowTopButton(true);
    //   } else {
    //     setShowTopButton(false);
    //   }
    // };
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, [currentMapNode]); // currentMapNode が変わるたびに useEffect を再実行

  // 仮の「次のポイントへ進む」ボタンのハンドラ
  // 実際にはマップ上での移動や、ユーザーのボタンクリックなどで currentMapNode を更新する
  const handleMoveToNextPoint = () => {
    if (nextPoint !== null) {
      setCurrentMapNode(nextPoint); // 次のポイントへ現在地を更新
    } else {
      alert("次の移動ポイントはありません。目的地に到着したか、経路が見つかりませんでした。");
    }
  };


  return (
    <>
      {/* ヘッダー (変更なし) */}
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

      {/* マップコンテンツ (変更なし) */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>現在地から目的地までの案内画面です</h2>
        <div
          style={{
            width: '80%',
            height: '600px', // スクロールを発生させるため高さを増やす（必要に応じて調整）
            backgroundColor: '#f0f0f0',
            margin: '2rem auto',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column', // コンテンツを縦に並べる
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: '#888',
          }}
        >
          マップ表示エリア
          {/* デモ用にスクロール可能な高さを確保するためのダミー要素 */}
          <div style={{ height: '1000px', width: '1px' }}></div>
        </div>
      </div>

      {/* Pythonからの経路案内データ表示エリアに修正 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {loading ? (
          <p>経路データを読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              現在のノード: <span style={{ color: '#0066cc' }}>{currentMapNode}</span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              現在の階: <span style={{ color: '#0066cc' }}>{currentFloor || 'N/A'}</span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              現在の館: <span style={{ color: '#0066cc' }}>{currentBuilding || 'N/A'}</span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              目的地ノード: <span style={{ color: '#28a745' }}>{goalNode || '未設定'}</span>
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
              案内: <span style={{ color: '#d9534f' }}>{guidanceMessage}</span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              次のポイント: <span style={{ color: '#5cb85c' }}>{nextPoint !== null ? nextPoint : '到着'}</span>
            </p>

            {/* 次のポイントへ進むデモ用ボタン */}
            {nextPoint !== null && ( // 次のポイントがある場合のみボタンを表示
              <button
                onClick={handleMoveToNextPoint}
                style={{
                  padding: '10px 20px',
                  fontSize: '1.2rem',
                  marginTop: '15px',
                  cursor: 'pointer',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                次のポイントへ進む (デモ用)
              </button>
            )}
          </>
        )}
      </div>

      {/* 既存の入力欄と表示エリア (変更なし) */}
      <p>到着した番号を入力してください。</p>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          pattern="\d{1,2}"
          inputMode="numeric"
          value={arrivedNumber}
          onChange={handleInputChange}
          placeholder="例: 12 (1〜32)"
          maxLength="2"
          style={{
            padding: '0.8rem',
            fontSize: '1.2rem',
            width: '250px',
            textAlign: 'center',
            borderRadius: '5px',
            border: inputError ? '2px solid red' : '1px solid #ccc',
          }}
        />
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

      {/* ★★★ ページトップへ戻る固定ボタンのセクションを完全に削除 ★★★ */}

      {/* フッター (既存のまま) */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

// コンポーネント名を MapPage に変更してエクスポート
export default MapPage;
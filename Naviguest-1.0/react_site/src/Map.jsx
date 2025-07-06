import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
// トップボタンを使用しないため、topbuttonのimportはコメントアウトまたは削除
// import topbutton from './assets/TopButton.png';

const MapPage = () => {
  // 入力欄に表示される値とバリデーションエラーメッセージ
  const [arrivedNumber, setArrivedNumber] = useState('');
  const [inputError, setInputError] = useState('');

  // Pythonから取得する経路探索結果のState
  const [nextPoint, setNextPoint] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [goalNode, setGoalNode] = useState(null); // 設定された目的地ノード
  const [guidanceMessage, setGuidanceMessage] = useState('経路案内を待機中...'); // Pythonからの案内メッセージ

  // API通信の状態管理
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ★★★ 確定された現在のマップ上のノード（Pythonに送信される値） ★★★
  // 初期位置を1とするが、これはMapPageがロードされた時に一度だけPythonに送られる初期値
  const [confirmedMapNode, setConfirmedMapNode] = useState(1);


  // 入力欄の変更を処理するハンドラ
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputError(''); // 入力開始時にエラーメッセージをクリア

    // 1. 数字のみを許可
    if (!/^\d*$/.test(value)) {
      setArrivedNumber(value);
      setInputError('数字のみ入力してください。');
      return;
    }

    // 2. 最大2桁に制限
    if (value.length > 2) {
      setArrivedNumber(value.slice(0, 2)); // 2桁を超える入力を切り捨てる
      setInputError('最大2桁の数字を入力してください。');
      return;
    }

    // 3. 値が空の場合の処理
    if (value === '') {
      setArrivedNumber('');
      setInputError('');
      return;
    }

    // 入力値が有効な形式であれば、arrivedNumberを更新
    setArrivedNumber(value);
    // ここではまだ confirmedMapNode を更新しない。確定ボタンで更新する。
  };

  // 「確定」ボタンクリック時のハンドラ
  const handleConfirmCurrentNode = () => {
    const numValue = parseInt(arrivedNumber, 10);

    // バリデーションチェック
    if (arrivedNumber === '') {
      setInputError('現在の場所の番号を入力してください。');
      return;
    }
    if (isNaN(numValue) || numValue < 1 || numValue > 32) {
      setInputError('1から32までの有効な数字を入力してください。');
      return;
    }

    // 全てのバリデーションを通過したら、確定されたノードを更新し、Pythonへのリクエストをトリガー
    setConfirmedMapNode(numValue);
    setInputError(''); // エラーメッセージをクリア
    // setArrivedNumber(''); // 確定後に入力欄をクリアしたい場合はコメントを外す
  };

  // Pythonバックエンドから経路データをフェッチするuseEffect
  // confirmedMapNode が変更されるたびに実行される
  useEffect(() => {
    const fetchPathData = async () => {
      try {
        setLoading(true);
        setError(null); // エラー状態をリセット

        // Pythonの /api/get_next_point エンドポイントに現在のノードをPOSTで送信
        const response = await fetch('http://127.0.0.1:5000/api/get_next_point', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_node: confirmedMapNode }), // 確定されたノードを送信
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
        setGuidanceMessage("経路データの取得に失敗しました。"); // UIにもエラーメッセージを表示
      } finally {
        setLoading(false); // ローディング状態を解除
      }
    };

    fetchPathData(); // コンポーネントのマウント時と confirmedMapNode 変更時に実行
  }, [confirmedMapNode]); // confirmedMapNode が変わるたびに useEffect を再実行

  // 「次のポイントへ進む」ボタンのハンドラ (デモ用)
  const handleMoveToNextPoint = () => {
    if (nextPoint !== null) {
      // 次のポイントへ進む際も、confirmedMapNode を更新して経路探索を再トリガー
      setConfirmedMapNode(nextPoint);
      setArrivedNumber(String(nextPoint)); // 入力欄にも次のポイントを反映
    } else {
      alert("次の移動ポイントはありません。目的地に到着したか、経路が見つかりませんでした。");
    }
  };

  return (
    <>
      {/* ヘッダーセクション */}
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

      {/* マップ表示エリアセクション */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>現在地から目的地までの案内画面です</h2>

        {loading ? (
          <p>経路データを読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1rem' }}> {/* 下マージンを追加してマップとの隙間を作る */}
            案内: <span style={{ color: '#d9534f' }}>{guidanceMessage}</span>
          </p>
        )}

        <div
          style={{
            width: '80%',
            height: '600px', // マップ表示エリアの高さ（必要に応じて調整）
            backgroundColor: '#f0f0f0',
            margin: '2rem auto',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column', // コンテンツを縦に配置
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: '#888',
          }}
        >
          マップ表示エリア
          {/* 実際のマップがここに表示される想定 */}
          {/* デモ用にスクロール可能な高さを確保するためのダミー要素 */}
          <div style={{ height: '1000px', width: '1px' }}></div>
        </div>
      </div>

      {/* Pythonからの経路案内データ表示セクション */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {loading ? (
          <p>経路データを読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <>
            {/* 現在のノード情報の表示 */}
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              現在のノード: <span style={{ color: '#0066cc' }}>{confirmedMapNode}</span>
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
            {/* 案内メッセージの表示 */}
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
              案内: <span style={{ color: '#d9534f' }}>{guidanceMessage}</span>
            </p>
            {/* 次のポイントの表示 */}
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              次のポイント: <span style={{ color: '#5cb85c' }}>{nextPoint !== null ? nextPoint : '到着'}</span>
            </p>

            {/* 「次のポイントへ進む」デモ用ボタン */}
            {nextPoint !== null && ( // 次のポイントが存在する場合のみボタンを表示
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

      {/* 現在地入力フォームセクション */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>現在の場所の番号を入力し、確定ボタンを押してください。</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          pattern="\d{1,2}"
          inputMode="numeric"
          value={arrivedNumber}
          onChange={handleInputChange} // 入力値の変更をハンドル
          placeholder="例: 1 (1〜32)"
          maxLength="2"
          style={{
            padding: '0.8rem',
            fontSize: '1.2rem',
            width: '250px',
            textAlign: 'center',
            borderRadius: '5px',
            border: inputError ? '2px solid red' : '1px solid #ccc',
            marginBottom: '10px', // ボタンとの間の余白
          }}
        />
        {/* 入力エラーメッセージの表示 */}
        {inputError && (
          <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {inputError}
          </p>
        )}
        
        {/* 「確定」ボタン */}
        <button
          onClick={handleConfirmCurrentNode} // クリック時に現在地を確定
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            backgroundColor: '#28a745', // 緑色のボタン
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            display: 'block', // ブロック要素にして中央揃えを容易に
            margin: '0.5rem auto 0 auto', // 上に余白、左右中央揃え
          }}
        >
          確定
        </button>
      </div>

      {/* 戻るボタン */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/choose">
          <img src={backbutton} alt="戻る" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      {/* フッターセクション */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

// コンポーネント名を MapPage に変更してエクスポート
export default MapPage;

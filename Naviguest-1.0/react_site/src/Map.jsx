import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
import F1button from './assets/1F.png';
import F2button from './assets/2F.png';
import F3button from './assets/3F.png';
import F4button from './assets/4F.png';
import F5button from './assets/5F.png';
import F6button from './assets/6F.png';

import point1 from './assets/point1.png';
import point2 from './assets/point2.png';
import point3 from './assets/point3.png';
import point4 from './assets/point4.png';
import point5 from './assets/point5.png';
import point6 from './assets/point6.png';
import point7 from './assets/point7.png';
import point8 from './assets/point8.png';
import point9 from './assets/point9.png';
// ★★★ 必要に応じて、2F以降のpoint画像もインポートしてください ★★★
// 例:
// import point10 from './assets/point10.png';
// import point11 from './assets/point11.png';
// ...

const floorImages = {
  '1F': F1button,
  '2F': F2button,
  '3F': F3button,
  '4F': F4button,
  '5F': F5button,
  '6F': F6button,
};

// ノード番号から階を判定するヘルパー関数
// Pythonのroom_to_floor定義と同期させてください
const getNodeFloor = (node) => {
  if (node >= 1 && node <= 9) return '1F';
  if (node >= 10 && node <= 14) return '2F';
  if (node >= 15 && node <= 21) return '3F';
  if (node >= 24 && node <= 27) return '4F'; // Pythonのfloor_4の定義 (24〜27) に合わせる
  if (node >= 28 && node <= 30) return '5F';
  if (node >= 31 && node <= 32) return '6F';
  return null; // 該当する階がない場合
};


const nodePointData = {
  // 1Fのノード
  1: { src: point1, top: '50.5%', left: '43%', width: '50px' },
  2: { src: point2, top: '65%', left: '30%', width: '75px' },
  3: { src: point3, top: '46%', left: '30%', width: '75px' },
  4: { src: point4, top: '21%', left: '44%', width: '75px' },
  5: { src: point5, top: '46%', left: '55%', width: '75px' },
  6: { src: point6, top: '65%', left: '55%', width: '75px' },
  7: { src: point7, top: '58%', left: '67%', width: '75px' },
  8: { src: point8, top: '40%', left: '78%', width: '75px' },
  9: { src: point9, top: '17%', left: '68%', width: '75px' },
  // ★★★ 2F以降のノードも同様に追加してください ★★★
  // 例:
  // 10: { src: point10, top: 'YY%', left: 'XX%', width: 'ZZpx' },
  // 11: { src: point11, top: 'YY%', left: 'XX%', width: 'ZZpx' },
  // ...
  // ここに全てのノードの情報を定義することで、各階のマップ上にピンを表示できるようになります。
  // 各階のpoint画像と、その画像内での正確なtop/left/widthを慎重に設定してください。
  // 例えば、2Fのノードの場合:
  // 10: { src: point10, top: 'XX%', left: 'YY%', width: '75px' },
  // 11: { src: point11, top: 'XX%', left: 'YY%', width: '75px' },
  // ...
};

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

  const [currentFloorDisplayImage, setCurrentFloorDisplayImage] = useState(F1button); // 初期画像を1Fに設定

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
  };

  // 「確定」ボタンクリック時のハンドラ
  const handleConfirmCurrentNode = () => {
    const numValue = parseInt(arrivedNumber, 10);

    // バリデーションチェック
    if (arrivedNumber === '') {
      setInputError('現在の場所の番号を入力してください。');
      return;
    }
    // ノード番号の最大値はPythonのgraph定義 (32) に合わせる
    if (isNaN(numValue) || numValue < 1 || numValue > 32) {
      setInputError('1から32までの有効な数字を入力してください。');
      return;
    }

    // 全てのバリデーションを通過したら、確定されたノードを更新し、Pythonへのリクエストをトリガー
    setConfirmedMapNode(numValue);
    setInputError(''); // エラーメッセージをクリア
  };

  // Pythonバックエンドから経路データをフェッチするuseEffect
  // confirmedMapNode が変更されるたびに実行される
  useEffect(() => {
    const fetchPathData = async () => {
      try {
        setLoading(true);
        setError(null); // エラー状態をリセット

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

        // ★★★ ここで current_floor に基づいて表示画像を更新 ★★★
        if (data.current_floor && floorImages[data.current_floor]) {
          setCurrentFloorDisplayImage(floorImages[data.current_floor]);
        } else {
          // current_floor が不明な場合や対応する画像がない場合のフォールバック
          setCurrentFloorDisplayImage(F1button); // 例として1Fに設定
        }

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
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '1rem' }}>
            案内: <span style={{ color: '#d9534f' }}>{guidanceMessage}</span>
          </p>
        )}

        <div
          style={{
            width: '80%',
            minHeight: '400px', // 最低限の高さを確保
            margin: '2rem auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={currentFloorDisplayImage}
            alt="現在の階のマップ"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              border: '2px solid black',
              zIndex: 1,
            }}
          />

          {/* ★★★ ここから、現在の階の全てのノードポイントを表示するロジック ★★★ */}
          {Object.entries(nodePointData).map(([nodeId, nodeInfo]) => {
            const nodeNumber = parseInt(nodeId, 10);
            // 現在表示されている階と、このノードの階が一致する場合のみ表示
            if (getNodeFloor(nodeNumber) === currentFloor) {
              return (
                <img
                  key={nodeNumber} // Reactのリストレンダリングにはkeyが必要
                  src={nodeInfo.src}
                  alt={`ノード ${nodeNumber}`}
                  style={{
                    position: 'absolute',
                    top: nodeInfo.top,
                    left: nodeInfo.left,
                    width: nodeInfo.width,
                    height: 'auto',
                    zIndex: 2, // マップ画像より手前に表示
                    // 現在地ノードには青い枠線を追加
                    border: nodeNumber === confirmedMapNode ? '3px solid blue' : 'none',
                    borderRadius: '50%', // オプション: ピンを丸く表示
                  }}
                />
              );
            }
            return null; // 条件に合わないノードは表示しない
          })}
          {/* ★★★ 変更ここまで ★★★ */}

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

export default MapPage;
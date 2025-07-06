import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
import F1button from './assets/1F.png';
import F2button from './assets/2F.png';
import F3button from './assets/3F.png';
import F4button from './assets/4F.png';
import F5button from './assets/5F.png';
import F6button from './assets/6F.png';

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
  if (node >= 22 && node <= 27) return '4F'; 
  if (node >= 28 && node <= 30) return '5F';
  if (node >= 31 && node <= 32) return '6F';
  return null; // 該当する階がない場合
};

const scaleNodeSize = (originalWidth) => {
  const size = parseFloat(originalWidth) * (2 / 3);
  return `${size}px`;
};

const nodePointData = {
  //1Fのノード
  1: { top: '54.5%', left: '45%', width: scaleNodeSize('75px') },
  2: { top: '70%', left: '30%', width: scaleNodeSize('75px') },
  3: { top: '51%', left: '30%', width: scaleNodeSize('75px') },
  4: { top: '24%', left: '46%', width: scaleNodeSize('75px') },
  5: { top: '51%', left: '57%', width: scaleNodeSize('75px') },
  6: { top: '70%', left: '57%', width: scaleNodeSize('75px') },
  7: { top: '62%', left: '69%', width: scaleNodeSize('75px') },
  8: { top: '40%', left: '80%', width: scaleNodeSize('75px') },
  9: { top: '19%', left: '70%', width: scaleNodeSize('75px') },
  //2Fのノード
  10: { top: '62%', left: '21%', width: scaleNodeSize('75px') },
  11: { top: '62%', left: '40%', width: scaleNodeSize('75px') },
  12: { top: '62%', left: '64%', width: scaleNodeSize('75px') },
  13: { top: '47%', left: '80%', width: scaleNodeSize('75px') },
  14: { top: '20%', left: '72%', width: scaleNodeSize('75px') },
  //3Fのノード
  15: { top: '70%', left: '20%', width: scaleNodeSize('75px') },
  16: { top: '70%', left: '27%', width: scaleNodeSize('75px') },
  17: { top: '70%', left: '38.5%', width: scaleNodeSize('75px') },
  18: { top: '70%', left: '51%', width: scaleNodeSize('75px') },
  19: { top: '70%', left: '69%', width: scaleNodeSize('75px') },
  20: { top: '47%', left: '81%', width: scaleNodeSize('75px') },
  21: { top: '20%', left: '73%', width: scaleNodeSize('75px') },
  //4Fのノード
  22: { top: '78%', left: '26%', width: scaleNodeSize('75px') },
  23: { top: '78%', left: '40%', width: scaleNodeSize('75px') },
  24: { top: '78%', left: '55%', width: scaleNodeSize('75px') },
  25: { top: '70%', left: '69%', width: scaleNodeSize('75px') },
  26: { top: '47%', left: '81%', width: scaleNodeSize('75px') },
  27: { top: '20%', left: '73%', width: scaleNodeSize('75px') },
  //4Fのノード
  28: { top: '74%', left: '47%', width: scaleNodeSize('75px') },
  29: { top: '34%', left: '48%', width: scaleNodeSize('75px') },
  30: { top: '55%', left: '56%', width: scaleNodeSize('75px') },
  //5Fのノード
  31: { top: '74%', left: '37%', width: scaleNodeSize('75px') },
  32: { top: '34%', left: '41%', width: scaleNodeSize('75px') },
};

const MapPage = () => {
  const [arrivedNumber, setArrivedNumber] = useState('');
  const [inputError, setInputError] = useState('');
  const [nextPoint, setNextPoint] = useState(null);
  const [currentFloor, setCurrentFloor] = useState(null);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [goalNode, setGoalNode] = useState(null);
  const [guidanceMessage, setGuidanceMessage] = useState('経路案内を待機中...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmedMapNode, setConfirmedMapNode] = useState(1);
  const [currentFloorDisplayImage, setCurrentFloorDisplayImage] = useState(F1button);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputError('');

    if (!/^\d*$/.test(value)) {
      setArrivedNumber(value);
      setInputError('数字のみ入力してください。');
      return;
    }

    if (value.length > 2) {
      setArrivedNumber(value.slice(0, 2));
      setInputError('最大2桁の数字を入力してください。');
      return;
    }

    if (value === '') {
      setArrivedNumber('');
      setInputError('');
      return;
    }

    setArrivedNumber(value);
  };

  const handleConfirmCurrentNode = () => {
    const numValue = parseInt(arrivedNumber, 10);

    if (arrivedNumber === '') {
      setInputError('現在の場所の番号を入力してください。');
      return;
    }
    if (isNaN(numValue) || numValue < 1 || numValue > 32) {
      setInputError('1から32までの有効な数字を入力してください。');
      return;
    }

    setConfirmedMapNode(numValue);
    setInputError('');
  };

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://127.0.0.1:5000/api/get_next_point', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_node: confirmedMapNode }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setNextPoint(data.next_point);
        setCurrentFloor(data.current_floor);
        setCurrentBuilding(data.current_building);
        setGoalNode(data.goal_node);
        setGuidanceMessage(data.message);

        if (data.current_floor && floorImages[data.current_floor]) {
          setCurrentFloorDisplayImage(floorImages[data.current_floor]);
        } else {
          setCurrentFloorDisplayImage(F1button);
        }

      } catch (err) {
        console.error("MapPageでのPython API呼び出しエラー:", err);
        setError("経路データの取得に失敗しました。");
        setGuidanceMessage("経路データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchPathData();
  }, [confirmedMapNode]);

  const handleMoveToNextPoint = () => {
    if (nextPoint !== null) {
      setConfirmedMapNode(nextPoint);
      setArrivedNumber(String(nextPoint));
    } else {
      alert("次の移動ポイントはありません。目的地に到着したか、経路が見つかりませんでした。");
    }
  };

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
            minHeight: '400px',
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

          {Object.entries(nodePointData).map(([nodeId, nodeInfo]) => {
            const nodeNumber = parseInt(nodeId, 10);
            if (getNodeFloor(nodeNumber) === currentFloor) {
              return (
                <div
                  key={nodeNumber}
                  style={{
                    position: 'absolute',
                    top: nodeInfo.top,
                    left: nodeInfo.left,
                    width: nodeInfo.width,
                    height: nodeInfo.width, 
                    //backgroundColor: 'rgba(255, 0, 0, 0.7)', // 赤色の半透明背景
                    backgroundColor: nodeNumber === confirmedMapNode ? 'rgba(0, 0, 255, 0.7)' : 'rgba(255, 0, 0, 0.7)',
                    borderRadius: '50%', // 円形にする
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white', // ノード番号の文字色
                    fontWeight: 'bold',
                    // フォントサイズはノードのwidthに応じて動的に設定
                    fontSize: `${parseFloat(nodeInfo.width) * 0.4}px`,
                    zIndex: 2,
                    //border: nodeNumber === confirmedMapNode ? '4px solid blue' : 'none',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {nodeNumber}
                </div>
              );
            }
            return null;
          })}

        </div>
      </div>


      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {loading ? (
          <p>経路データを読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>エラー: {error}</p>
        ) : (
          <>
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
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
              案内: <span style={{ color: '#d9534f' }}>{guidanceMessage}</span>
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
              次のポイント: <span style={{ color: '#5cb85c' }}>{nextPoint !== null ? nextPoint : '到着'}</span>
            </p>

            {nextPoint !== null && (
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

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>現在の場所の番号を入力し、確定ボタンを押してください。</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          pattern="\d{1,2}"
          inputMode="numeric"
          value={arrivedNumber}
          onChange={handleInputChange}
          placeholder="例: 1 (1〜32)"
          maxLength="2"
          style={{
            padding: '0.8rem',
            fontSize: '1.2rem',
            width: '250px',
            textAlign: 'center',
            borderRadius: '5px',
            border: inputError ? '2px solid red' : '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        {inputError && (
          <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            {inputError}
          </p>
        )}
        
        <button
          onClick={handleConfirmCurrentNode}
          style={{
            padding: '10px 20px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            display: 'block',
            margin: '0.5rem auto 0 auto',
          }}
        >
          確定
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/choose">
          <img src={backbutton} alt="戻る" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default MapPage;
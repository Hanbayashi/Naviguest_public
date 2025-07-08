import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
import F1button from './assets/1F.png';
import F2button from './assets/2F.png';
import F3button from './assets/3F.png';
import F4button from './assets/4F.png';
import F5button from './assets/5F.png';
import F6button from './assets/6F.png';

//案内画像
import guidance_1_2 from './assets/1-2.png';
import guidance_1_3 from './assets/1-3.png';
import guidance_1_4 from './assets/1-4.png';
import guidance_1_5 from './assets/1-5.png';
import guidance_1_6 from './assets/1-6.png';
import guidance_2_1 from './assets/2-1.png';
import guidance_2_3 from './assets/2-3.png';
import guidance_3_2 from './assets/3-2.png';
import guidance_3_4 from './assets/3-4.png';
import guidance_4_1 from './assets/4-1.png';
import guidance_4_3 from './assets/4-3.png';
import guidance_4_5 from './assets/4-5.png';
import guidance_5_4 from './assets/5-4.png';
import guidance_5_6 from './assets/5-6.png';
import guidance_5_7 from './assets/5-7.png';
import guidance_6_1 from './assets/6-1.png';
import guidance_6_5 from './assets/6-5.png';
import guidance_6_7 from './assets/6-7.png';
import guidance_7_5 from './assets/7-5.png';
import guidance_7_6 from './assets/7-6.png';
import guidance_7_8 from './assets/7-8.png';
import guidance_7_9 from './assets/7-9.png';
import guidance_8_7 from './assets/8-7.png';
import guidance_8_9 from './assets/8-9.png';
import guidance_9_7 from './assets/9-7.png';
import guidance_9_8 from './assets/9-8.png';
import guidance_10_11 from './assets/10-11.png';
import guidance_11_10 from './assets/11-10.png';
import guidance_11_12 from './assets/11-12.png';
import guidance_12_11 from './assets/12-11.png';
import guidance_12_13 from './assets/12-13.png';
import guidance_12_14 from './assets/12-14.png';
import guidance_13_12 from './assets/13-12.png';
import guidance_13_14 from './assets/13-14.png';
import guidance_14_12 from './assets/14-12.png';
import guidance_14_13 from './assets/14-13.png';
import guidance_15_16 from './assets/15-16.png';
import guidance_16_15 from './assets/16-15.png';
import guidance_16_17 from './assets/16-17.png';
import guidance_17_16 from './assets/17-16.png';
import guidance_17_18 from './assets/17-18.png';
import guidance_18_17 from './assets/18-17.png';
import guidance_19_20 from './assets/19-20.png';
import guidance_19_21 from './assets/19-21.png';
import guidance_20_19 from './assets/20-19.png';
import guidance_20_21 from './assets/20-21.png';
import guidance_21_19 from './assets/21-19.png';
import guidance_21_20 from './assets/21-20.png';
import guidance_22_23 from './assets/22-23.png';
import guidance_23_22 from './assets/23-22.png';
import guidance_23_24 from './assets/23-24.png';
import guidance_24_23 from './assets/24-23.png';
import guidance_25_26 from './assets/25-26.png';
import guidance_25_27 from './assets/25-27.png';
import guidance_26_25 from './assets/26-25.png';
import guidance_26_27 from './assets/26-27.png';
import guidance_27_25 from './assets/27-25.png';
import guidance_27_26 from './assets/27-26.png';
import guidance_28_29 from './assets/28-29.png';
import guidance_28_30 from './assets/28-30.png';
import guidance_29_28 from './assets/29-28.png';
import guidance_29_30 from './assets/29-30.png';
import guidance_30_28 from './assets/30-28.png';
import guidance_30_29 from './assets/30-29.png';
import guidance_31_32 from './assets/31-32.png';
import guidance_32_31 from './assets/32-31.png';

const floorImages = {
  '1F': F1button,
  '2F': F2button,
  '3F': F3button,
  '4F': F4button,
  '5F': F5button,
  '6F': F6button,
};

// ノード番号から階を判定するヘルパー関数
const getNodeFloor = (node) => {
  if (node >= 1 && node <= 9) return '1F';
  if (node >= 10 && node <= 14) return '2F';
  if (node >= 15 && node <= 21) return '3F';
  if (node >= 22 && node <= 27) return '4F'; 
  if (node >= 28 && node <= 30) return '5F';
  if (node >= 31 && node <= 32) return '6F';
  return null;
};

// ノードサイズを調整するヘルパー関数
const scaleNodeSize = (originalWidth) => {
  const size = parseFloat(originalWidth) * (2 / 3);
  return `${size}px`;
};

// 各ノード番号に対応する位置情報を定義するオブジェクト
const nodePointData = {
  //1Fのノード
  1: { top: '60%', left: '44%', width: scaleNodeSize('75px') },
  2: { top: '70%', left: '30%', width: scaleNodeSize('75px') },
  3: { top: '51%', left: '30%', width: scaleNodeSize('75px') },
  4: { top: '24%', left: '45%', width: scaleNodeSize('75px') },
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
  //5Fのノード
  28: { top: '74%', left: '47%', width: scaleNodeSize('75px') },
  29: { top: '34%', left: '48%', width: scaleNodeSize('75px') },
  30: { top: '55%', left: '56%', width: scaleNodeSize('75px') },
  //6Fのノード
  31: { top: '74%', left: '37%', width: scaleNodeSize('75px') },
  32: { top: '34%', left: '41%', width: scaleNodeSize('75px') },
};

const guidanceImages = {
    '1-2': guidance_1_2,
    '1-3': guidance_1_3,
    '1-4': guidance_1_4,
    '1-5': guidance_1_5,
    '1-6': guidance_1_6,
    '2-1': guidance_2_1,
    '2-3': guidance_2_3,
    '3-2': guidance_3_2,
    '3-4': guidance_3_4,
    '4-1': guidance_4_1,
    '4-3': guidance_4_3,
    '4-5': guidance_4_5,
    '5-4': guidance_5_4,
    '5-6': guidance_5_6,
    '5-7': guidance_5_7,
    '6-1': guidance_6_1,
    '6-5': guidance_6_5,
    '6-7': guidance_6_7,
    '7-5': guidance_7_5,
    '7-6': guidance_7_6,
    '7-8': guidance_7_8,
    '7-9': guidance_7_9,
    '8-7': guidance_8_7,
    '8-9': guidance_8_9,
    '9-7': guidance_9_7,
    '9-8': guidance_9_8,
    '10-11': guidance_10_11,
    '11-10': guidance_11_10,
    '11-12': guidance_11_12,
    '12-11': guidance_12_11,
    '12-13': guidance_12_13,
    '12-14': guidance_12_14,
    '13-12': guidance_13_12,
    '13-14': guidance_13_14,
    '14-12': guidance_14_12,
    '14-13': guidance_14_13,
    '15-16': guidance_15_16,
    '16-15': guidance_16_15,
    '16-17': guidance_16_17,
    '17-16': guidance_17_16,
    '17-18': guidance_17_18,
    '18-17': guidance_18_17,
    '19-20': guidance_19_20,
    '19-21': guidance_19_21,
    '20-19': guidance_20_19,
    '20-21': guidance_20_21,
    '21-19': guidance_21_19,
    '21-20': guidance_21_20,
    '22-23': guidance_22_23,
    '23-22': guidance_23_22,
    '23-24': guidance_23_24,
    '24-23': guidance_24_23,
    '25-26': guidance_25_26,
    '25-27': guidance_25_27,
    '26-25': guidance_26_25,
    '26-27': guidance_26_27,
    '27-25': guidance_27_25,
    '27-26': guidance_27_26,
    '28-29': guidance_28_29,
    '28-30': guidance_28_30,
    '29-28': guidance_29_28,
    '29-30': guidance_29_30,
    '30-28': guidance_30_28,
    '30-29': guidance_30_29,
    '31-32': guidance_31_32,
    '32-31': guidance_32_31,
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

  const [confirmedMapNode, setConfirmedMapNode] = useState(null);
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

        if (confirmedMapNode === null) {
          const initialResponse = await fetch('http://127.0.0.1:5000/api/get_current_node');
          if (!initialResponse.ok) {
            const errorText = await initialResponse.text();
            throw new Error(`HTTP error! status: ${initialResponse.status} for initial node: ${errorText}`);
          }
          const initialData = await initialResponse.json();

          if (initialData.status === "success" && initialData.current_node !== undefined) {
            setConfirmedMapNode(initialData.current_node);
            setArrivedNumber(String(initialData.current_node));
          } else {
            console.warn("Pythonから有効な初期ノードが返されませんでした。デフォルト値1を設定します。", initialData);
            setConfirmedMapNode(1);
            setArrivedNumber('1');
          }
          return;
        }

        const response = await fetch('http://127.0.0.1:5000/api/get_next_point', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_node: confirmedMapNode }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
        }
        const data = await response.json();

        setNextPoint(data.next_point);
        setCurrentFloor(data.current_floor);
        setCurrentBuilding(data.current_building);
        setGoalNode(data.goal_node);
        setGuidanceMessage(data.message);

        if (data.current_floor && floorImages.hasOwnProperty(data.current_floor)) {
          setCurrentFloorDisplayImage(floorImages[`${data.current_floor}`]);
        } else {
          setCurrentFloorDisplayImage(F1button);
        }

      } catch (err) {
        console.error("MapPageでのPython API呼び出しエラー:", err);
        setError(`経路データの取得に失敗しました: ${err.message}`);
        setGuidanceMessage(`経路データの取得に失敗しました: ${err.message}`);
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

  const getGuidanceImageSrc = () => {
    if (confirmedMapNode !== null && nextPoint !== null) {
      const key = `${confirmedMapNode}-${nextPoint}`;
      return guidanceImages.hasOwnProperty(key) ? guidanceImages[`${key}`] : null;
    }
    return null;
  };


  if (confirmedMapNode === null && loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '48px', color: '#0066cc' }}>ナビゲスト</h1>
        <p>現在地情報を読み込み中...</p>
      </div>
    );
  }

  const currentGuidanceImage = getGuidanceImageSrc();

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

          {/* 全てのノードポイントをループで描画 */}
          {Object.entries(nodePointData).map(([nodeId, nodeInfo]) => {
            const nodeNumber = parseInt(nodeId, 10);
            // 現在の階のノードのみを表示
            if (getNodeFloor(nodeNumber) === currentFloor) {
              // ノードの種類に応じた背景色とテキスト
              let backgroundColor = 'rgba(255, 0, 0, 0.7)'; // その他のノードは赤色（半透明）
              let labelTextAbove = null; // ノードの上に表示するテキスト

              if (nodeNumber === confirmedMapNode) {
                // 現在地
                backgroundColor = 'rgba(0, 0, 255, 0.7)'; // 青色（半透明）
                labelTextAbove = (
                  <div style={{ 
                    color: '#CC0000', // 濃い赤色
                    fontWeight: 'bold', 
                    fontSize: '1.2em', 
                    textAlign: 'center',
                    backgroundColor: 'white', // 背景を白に
                    padding: '2px 5px', // パディング
                    borderRadius: '3px', // 角丸
                    whiteSpace: 'nowrap' // テキストが折り返さないように
                  }}>現在地</div>
                );
              } else if (nodeNumber === nextPoint) {
                // 次のポイント (濃い黄色)
                backgroundColor = 'rgba(255, 191, 0, 0.9)'; // 濃い目の黄色（不透明度高め）
                labelTextAbove = (
                  // 文字色を濃い赤色（#CC0000）、文字サイズを大きく（1.2em）
                  <div style={{ 
                    color: '#CC0000', // 濃い赤色
                    fontWeight: 'bold', 
                    fontSize: '1.2em', 
                    textAlign: 'center',
                    backgroundColor: 'white', // 背景を白に
                    padding: '2px 5px', // パディング
                    borderRadius: '3px', // 角丸
                    whiteSpace: 'nowrap' // テキストが折り返さないように
                  }}>次のポイント</div>
                );
              }

              return (
                <div
                  key={nodeNumber}
                  style={{
                    position: 'absolute',
                    top: nodeInfo.top,
                    left: nodeInfo.left,
                    transform: 'translate(-50%, -50%)', // 円の中心をtop/leftに合わせる
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column', // 上にテキスト、下に円を配置
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* ノードの上に表示するテキスト */}
                  {labelTextAbove && (
                    <div
                      style={{
                        position: 'absolute', // 親divに対して絶対配置
                        bottom: '100%', // 円の上部に配置
                        marginBottom: '5px', // 円との間に少し余白
                        // padding, borderRadius, whiteSpace はすでにlabelTextAboveのdivスタイルに含まれる
                        // transform: 'translateY(-50%)', // 必要に応じて調整
                      }}
                    >
                      {labelTextAbove}
                    </div>
                  )}
                  {/* ノード番号を表示する円 */}
                  <div
                    style={{
                      width: nodeInfo.width,
                      height: nodeInfo.width, // 円形にするためwidthと同じ値を設定
                      backgroundColor: backgroundColor,
                      borderRadius: '50%', // 円形にする
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white', // ノード番号の文字色 (円の中の数字)
                      fontWeight: 'bold',
                      fontSize: `${parseFloat(nodeInfo.width) * 0.4}px`, // ノードのwidthに応じてフォントサイズを調整
                    }}
                  >
                    {nodeNumber}
                  </div>
                </div>
              );
            }
            return null;
          })}

        </div>

        {/* 案内画像の表示 */}
        {currentGuidanceImage && !loading && !error && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h3>次の移動案内</h3>
            <img 
              src={currentGuidanceImage} 
              alt="次の移動案内" 
              style={{ 
                maxWidth: '80%', 
                height: 'auto', 
                border: '1px solid #ccc',
                marginTop: '1rem' 
              }} 
            />
          </div>
        )}

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
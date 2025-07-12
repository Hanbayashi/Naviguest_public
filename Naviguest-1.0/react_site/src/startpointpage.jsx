// src/startpointpage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backbutton from './assets/BackButton.png';
import point1 from './assets/startpoint1.png';
import point3 from './assets/startpoint3.png';
import point4 from './assets/startpoint4.png';
import point9 from './assets/startpoint9.png';

const StartPointPage = () => {
  const [selectedStartNode, setSelectedStartNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 環境変数からAPIのベースURLを取得
  const apiBaseUrl = process.env.REACT_APP_API_URL || ''; // 未定義の場合に備えて空文字列をデフォルト値に設定

  const nodeImages = {
    1: point1,
    3: point3,
    4: point4,
    9: point9,
  };

  const handleNodeSelect = async (nodeNumber) => {
    setSelectedStartNode(nodeNumber);
    setErrorMessage('');

    try {
      // 環境変数を使ってAPIエンドポイントを構築
      const response = await fetch(`${apiBaseUrl}/set_initial_current_node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initial_current_node: nodeNumber }),
      });

      if (!response.ok) {
        // エラーの詳細情報を含める
        return response.text().then(text => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
        });
      }

      const data = await response.json();
      console.log("Pythonバックエンドからの応答:", data);

      if (data.status === "success") {
        navigate('/choose');
      } else {
        setErrorMessage(`開始ノードの設定に失敗しました: ${data.message}`);
      }
    } catch (error) {
      console.error("開始ノード送信エラー:", error);
      setErrorMessage(`開始ノードの送信中にエラーが発生しました: ${error.message}`);
    }
  };

  const nodeOptions = [1, 4, 3, 9];

  return (
    <>
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '0.5rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem' }}>

          </ul>
        </nav>
      </header>

      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>現在地を写真を参考に選択してください</h2>

        <div
          style={{
            display: 'grid', // ここをgridに変更
            gridTemplateColumns: 'repeat(2, 1fr)', // 2列のグリッドにする
            gap: '20px', // グリッドアイテム間の間隔
            maxWidth: '600px', // グリッド全体の最大幅（調整してください）
            margin: '0 auto', // グリッドを中央に配置
            marginBottom: '30px'
          }}
        >
          {nodeOptions.map((node) => (
            <button
              key={node}
              onClick={() => handleNodeSelect(node)}
              style={{
                background: 'none',
                border: selectedStartNode === node ? '3px solid #0056b3' : '1px solid #ccc',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '5px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
                display: 'flex', // ボタン内の画像を中央揃えにするため
                justifyContent: 'center', // ボタン内の画像を中央揃えにするため
                alignItems: 'center', // ボタン内の画像を中央揃えにするため
              }}
            >
              <img
                src={nodeImages[node]}
                alt={`ノード ${node}`}
                style={{
                  maxWidth: '100%', // 親要素のボタンに合わせる
                  height: 'auto',
                  display: 'block'
                }}
              />
            </button>
          ))}
        </div>

        {errorMessage && (
          <p style={{ color: 'red', fontSize: '1rem', marginTop: '15px' }}>{errorMessage}</p>
        )}

      </div>

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Link to="/">
          <img src={backbutton} alt="戻る" style={{ width: '150px', height: 'auto', marginRight: '20px' }} />
        </Link>
      </div>

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default StartPointPage;
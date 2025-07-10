// src/startpointpage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigateをインポート
import backbutton from './assets/BackButton.png';
import point1 from './assets/startpoint1.jpg';
import point3 from './assets/startpoint3.jpg';
import point4 from './assets/startpoint4.jpg';
import point9 from './assets/startpoint9.jpg';

const StartPointPage = () => {
  const [selectedStartNode, setSelectedStartNode] = useState(null); // 選択された開始ノードを保持
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ用
  const navigate = useNavigate(); // 遷移に使う

  const nodeImages = {
    1: point1,
    3: point3,
    4: point4,
    9: point9,
  };

  // 開始ノードの選択ボタンがクリックされた時のハンドラ
  const handleNodeSelect = async (nodeNumber) => {
    setSelectedStartNode(nodeNumber);
    setErrorMessage(''); // エラーメッセージをクリア

    try {
      // Pythonバックエンドに選択された開始ノードを送信
      const response = await fetch('http://127.0.0.1:5000/api/set_initial_current_node', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initial_current_node: nodeNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Pythonバックエンドからの応答:", data);

      if (data.status === "success") {
        // 送信が成功したらChoosePageへ遷移
        navigate('/choose');
      } else {
        setErrorMessage(`開始ノードの設定に失敗しました: ${data.message}`);
      }

    } catch (error) {
      console.error("開始ノード送信エラー:", error);
      setErrorMessage("開始ノードの送信中にエラーが発生しました。");
    }
  };

  const nodeOptions = [1, 3, 4, 9]; // 選択肢となるノード番号

  return (
    <>
      <header style={{ backgroundColor: '#0066cc', color: 'white', padding: '1rem 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
      </header>

      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>現在地を写真を参考に選択してください</h2>

        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', // 縦方向に並べる
            alignItems: 'center', // 中央揃え
            gap: '20px', // ボタン間の間隔
            marginBottom: '30px' 
          }}
        >
          {nodeOptions.map((node) => (
            <button
              key={node}
              onClick={() => handleNodeSelect(node)}
              style={{
                background: 'none', // ボタンのデフォルト背景を削除
                border: selectedStartNode === node ? '3px solid #0056b3' : '1px solid #ccc', // 選択時の枠線
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '5px', // 画像の周りのパディング
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <img 
                src={nodeImages[node]} 
                alt={`ノード ${node}`} 
                style={{ 
                  maxWidth: '250px', // 画像の最大幅
                  height: 'auto', 
                  display: 'block' // 余白をなくす
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
        {/* 前の画面 (HomePage) に戻るリンク */}
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
// src/startpointpage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigateをインポート
import backbutton from './assets/BackButton.png';
// nextbuttonはChoosePageへの遷移に使うので、別途送信ボタンを設けるか、同じものを流用

const StartPointPage = () => {
  const [selectedStartNode, setSelectedStartNode] = useState(null); // 選択された開始ノードを保持
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ用
  const navigate = useNavigate(); // 遷移に使う

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
        <h2>現在の場所を選択してください</h2>
        <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          マップ上の開始ノードに該当するボタンを押してください。
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {nodeOptions.map((node) => (
            <button
              key={node}
              onClick={() => handleNodeSelect(node)}
              style={{
                padding: '15px 30px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                backgroundColor: selectedStartNode === node ? '#0056b3' : '#007bff', // 選択されたボタンの色を変える
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                minWidth: '120px', // ボタンの最小幅
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#0056b3',
                }
              }}
            >
              ノード {node}
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
        {/*
        // 以下の「次へ」ボタンは、開始ノードの選択と送信が成功した後に自動的に遷移するため、基本的には不要になります。
        // もしユーザーが選択せずに「次へ」を押したい場合など、特別な要件があるなら残してください。
        <Link to="/choose">
          <img src={nextbutton} alt="次へ" style={{ width: '200px', height: 'auto', cursor: 'pointer' }} />
        </Link>
        */}
      </div>

      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default StartPointPage;
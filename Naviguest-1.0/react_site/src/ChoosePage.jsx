import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 画像のインポート
import backbutton from './assets/BackButton.png';
import topbutton from './assets/TopButton.png';
import Genre1Image from './assets/genre1.png';
import Genre1aImage from './assets/genre1-1.png';
import Genre1bImage from './assets/genre1-2.png';
import Genre1cImage from './assets/genre1-3.png';
import Genre1dImage from './assets/genre1-4.png';
import Genre1eImage from './assets/genre1-5.png';
import Genre1fImage from './assets/genre1-6.png';
import Genre1gImage from './assets/genre1-7.png';
import Genre1hImage from './assets/genre1-8.png';
import Genre1iImage from './assets/genre1-9.png';

import Genre2Image from './assets/genre2.png';
import Genre2aImage from './assets/genre2-1.png';
import Genre2bImage from './assets/genre2-2.png';
import Genre2cImage from './assets/genre2-3.png';
import Genre2dImage from './assets/genre2-4.png';

import Genre3Image from './assets/genre3.png';
import Genre3aImage from './assets/genre3-1.png';
import Genre3bImage from './assets/genre3-2.png';
import Genre3cImage from './assets/genre3-3.png';

import Genre4Image from './assets/genre4.png';
import Genre4aImage from './assets/genre4-1.png';
import Genre4bImage from './assets/genre4-2.png';
import Genre4cImage from './assets/genre4-3.png';
import Genre4dImage from './assets/genre4-4.png';

import Genre5Image from './assets/genre5.png';
import Genre5aImage from './assets/genre5-1.png';
import Genre5bImage from './assets/genre5-2.png';
import Genre5cImage from './assets/genre5-3.png';
import Genre5dImage from './assets/genre5-4.png';
import Genre5eImage from './assets/genre5-5.png';

import Genre6Image from './assets/genre6.png';
import Genre6aImage from './assets/genre6-1.png';
import Genre6bImage from './assets/genre6-2.png';
import Genre6cImage from './assets/genre6-3.png';
import Genre6dImage from './assets/genre6-4.png';
import Genre6eImage from './assets/genre6-5.png';
import Genre6fImage from './assets/genre6-6.png';
import Genre6gImage from './assets/genre6-7.png';
import Genre6hImage from './assets/genre6-8.png';
import Genre6iImage from './assets/genre6-9.png';
import Genre6jImage from './assets/genre6-10.png';
import Genre6kImage from './assets/genre6-11.png';
import Genre6lImage from './assets/genre6-12.png';
import Genre6mImage from './assets/genre6-13.png';

import Genre7Image from './assets/genre7.png';
import Genre7aImage from './assets/genre7-1.png';
import Genre7bImage from './assets/genre7-2.png';
import Genre7cImage from './assets/genre7-3.png';
import Genre7dImage from './assets/genre7-4.png';
import Genre7eImage from './assets/genre7-5.png';
import Genre7fImage from './assets/genre7-6.png';

import Genre8Image from './assets/genre8.png';
import Genre8aImage from './assets/genre8-1.png';
import Genre8bImage from './assets/genre8-2.png';

const SelectionScreen = () => {

  const navigate = useNavigate();

  // スクロール先の参照を定義
  const genre1aRef = useRef(null);
  const genre2aRef = useRef(null);
  const genre3aRef = useRef(null);
  const genre4aRef = useRef(null);
  const genre5aRef = useRef(null);
  const genre6aRef = useRef(null);
  const genre7aRef = useRef(null);
  const genre8aRef = useRef(null);

  const [pythonMessage, setPythonMessage] = useState('Pythonからのメッセージを待機中...');

  const [showTopButton, setShowTopButton] = useState(false);

  // スクロール処理
  const handleScrollToGenre1a = () => {
    genre1aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre2a = () => {
    genre2aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre3a = () => {
    genre3aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre4a = () => {
    genre4aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre5a = () => {
    genre5aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre6a = () => {
    genre6aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre7a = () => {
    genre7aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToGenre8a = () => {
    genre8aRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //Pythonとの通信設定
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5000/api/hello';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => setPythonMessage(data.message))
      .catch(error => {
        console.error("Python API呼び出しエラー:", error);
        setPythonMessage('Pythonバックエンドに接続できませんでした。');
      });

      // ★★★ スクロールイベントリスナーを設定 ★★★
    const handleScroll = () => {
      // ページのスクロール位置が一定以上（例: 200px）になったらボタンを表示
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数: コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  //送信する値（目的地の番号）の設定
  const handleGenrepoint2Click = async () => {
  const valueToSend = 2; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', { // エンドポイントを修正
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }), // キーを 'goal_node' に修正
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Pythonからの応答:", data); // Pythonからの応答を確認
    navigate('/map'); // Map.jsxへ遷移

  } catch (error) {
    console.error("目的地の送信エラー:", error); // エラーメッセージを修正
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint3Click = async () => {
  const valueToSend = 3; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint5Click = async () => {
  const valueToSend = 5; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint6Click = async () => {
  const valueToSend = 6; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint7Click = async () => {
  const valueToSend = 7; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint8Click = async () => {
  const valueToSend = 8; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint9Click = async () => {
  const valueToSend = 9; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint10Click = async () => {
  const valueToSend = 10; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint11Click = async () => {
  const valueToSend = 11; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint12Click = async () => {
  const valueToSend = 12; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint13Click = async () => {
  const valueToSend = 13; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint14Click = async () => {
  const valueToSend = 14; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint15Click = async () => {
  const valueToSend = 15; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint16Click = async () => {
  const valueToSend = 16; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint17Click = async () => {
  const valueToSend = 17; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint18Click = async () => {
  const valueToSend = 18; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint19Click = async () => {
  const valueToSend = 19; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint20Click = async () => {
  const valueToSend = 20; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint21Click = async () => {
  const valueToSend = 21; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint25Click = async () => {
  const valueToSend = 25; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint26Click = async () => {
  const valueToSend = 26; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint27Click = async () => {
  const valueToSend = 27; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint31Click = async () => {
  const valueToSend = 31; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

const handleGenrepoint32Click = async () => {
  const valueToSend = 32; // 送信するノード番号
  try {
    const response = await fetch('http://127.0.0.1:5000/api/update_goal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal_node: valueToSend }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Pythonからの応答:", data);
    navigate('/map');
  } catch (error) {
    console.error("目的地の送信エラー:", error);
    alert("目的地の送信に失敗しました。詳細をコンソールで確認してください。");
  }
};

  // ★★★ ページトップへスクロールする関数 ★★★
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* ヘッダー */}
      <header
        style={{
          backgroundColor: '#0066cc',color: 'white',padding: '1rem 2rem',textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '48px' }}>ナビゲスト</h1>
        <nav>
          <ul
            style={{
              listStyle: 'none',padding: 0,display: 'flex',justifyContent: 'center',gap: '2rem',
            }}
          >
            {/* 必要に応じてナビゲーション項目を追加 */}
          </ul>
        </nav>
      </header>

      {/* 説明テキスト */}
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>ジャンルを選択してください（文章は要件等）。</h2>
      </div>

      <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#555' }}>
        {pythonMessage}
      </p>

      {/* ジャンル一覧 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1Image}
          alt="ジャンル1"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre1a} // ここでスクロール処理を実行
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre2Image}
          alt="ジャンル2"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre2a}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre3Image}
          alt="ジャンル3"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre3a}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre4Image}
          alt="ジャンル4"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre4a} // ここでスクロール処理を実行
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre5Image}
          alt="ジャンル5"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre5a} // ここでスクロール処理を実行
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6Image}
          alt="ジャンル6"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre6a}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre7Image}
          alt="ジャンル7"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre7a}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre8Image}
          alt="ジャンル8"
          style={{ width: '300px', height: 'auto', maxWidth: '100%', cursor: 'pointer' }}
          onClick={handleScrollToGenre8a} // ここでスクロール処理を実行
        />
      </div>

      {/*部署等*/}

      {/*ジャンル1*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>手続き・証明・財務</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {/* Link コンポーネントを削除し、onClick で直接処理を呼び出す */}
        <img
          ref={genre1aRef}
          src={Genre1aImage}
          alt="ジャンル1-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint5Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1bImage}
          alt="ジャンル1-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint2Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1cImage}
          alt="ジャンル1-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint10Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1dImage}
          alt="ジャンル1-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint13Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1eImage}
          alt="ジャンル1-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint6Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1fImage}
          alt="ジャンル1-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint15Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1gImage}
          alt="ジャンル1-7"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint7Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre1hImage}
          alt="ジャンル1-8"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint21Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre1iImage}
          alt="ジャンル1-9"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint21Click}
        />
      </div>

      {/*ジャンル2*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>子育て・家庭支援</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre2aRef}
          src={Genre2aImage}
          alt="ジャンル2-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint7Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre2bImage}
          alt="ジャンル2-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint26Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre2cImage}
          alt="ジャンル2-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint26Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre2dImage}
          alt="ジャンル2-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint27Click}
        />
      </div>

      {/*ジャンル3*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>健康・医療・保険</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre3aRef}
          src={Genre3aImage}
          alt="ジャンル3-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint8Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre3bImage}
          alt="ジャンル3-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint25Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre3cImage}
          alt="ジャンル3-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      {/*ジャンル4*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>高齢者・障がい者・生活困窮者支援</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre4aRef}
          src={Genre4aImage}
          alt="ジャンル4-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint8Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre4bImage}
          alt="ジャンル4-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint9Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre4cImage}
          alt="ジャンル4-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint3Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre4dImage}
          alt="ジャンル4-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      {/*ジャンル5*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>雇用・経済・企業・産業復興</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre5aRef}
          src={Genre5aImage}
          alt="ジャンル5-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre5bImage}
          alt="ジャンル5-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint13Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre5cImage}
          alt="ジャンル5-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint10Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre5dImage}
          alt="ジャンル5-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre5eImage}
          alt="ジャンル5-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      {/*ジャンル6*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>住宅・都市計画・まちづくり</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre6aRef}
          src={Genre6aImage}
          alt="ジャンル6-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint20Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6bImage}
          alt="ジャンル6-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6cImage}
          alt="ジャンル6-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint20Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6dImage}
          alt="ジャンル6-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint19Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6eImage}
          alt="ジャンル6-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint19Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6fImage}
          alt="ジャンル6-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint32Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6gImage}
          alt="ジャンル6-7"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6hImage}
          alt="ジャンル6-8"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint11Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6iImage}
          alt="ジャンル6-9"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint12Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6jImage}
          alt="ジャンル6-10"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint15Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6kImage}
          alt="ジャンル6-11"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre6lImage}
          alt="ジャンル6-12"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint14Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre6mImage}
          alt="ジャンル6-13"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint14Click}
        />
      </div>

      {/*ジャンル7*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>広報・市民対応・行政運営</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre7aRef}
          src={Genre7aImage}
          alt="ジャンル7-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre7bImage}
          alt="ジャンル7-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre7cImage}
          alt="ジャンル7-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre7dImage}
          alt="ジャンル7-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint16Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre7eImage}
          alt="ジャンル7-5"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint17Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <img
          src={Genre7fImage}
          alt="ジャンル7-6"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint18Click}
        />
      </div>

      {/*ジャンル8*/}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h2>会議・相談</h2>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          ref={genre8aRef}
          src={Genre8aImage}
          alt="ジャンル8-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint3Click}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={Genre8bImage}
          alt="ジャンル8-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px',
            cursor: 'pointer',
          }}
          onClick={handleGenrepoint31Click}
        />
      </div>

      <div style={{ textAlign: 'center' }}>

        <Link to="/">
          {/* srcをインポートしたbackbutton変数に変更 */}
          <img src={backbutton} alt="戻る" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

       {/* ★★★ ページトップへ戻る固定ボタンを追加 ★★★ */}
      {showTopButton && ( // showTopButtonがtrueの場合のみ表示
        <div
          style={{
            position: 'fixed',
            bottom: '20px', // 画面下端から20px
            right: '20px',  // 画面右端から20px
            zIndex: 1000,   // 他の要素の上に表示
          }}
        >
          <img
            src={topbutton} 
            alt="ページトップへ"
            onClick={scrollToTop} // クリックでスクロール関数を実行
            style={{
              width: '180px', // サイズ調整
              height: 'auto',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
      )}

      {/* フッター */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default SelectionScreen;

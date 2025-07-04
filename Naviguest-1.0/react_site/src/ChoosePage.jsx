import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// 画像のインポート
import backbutton from './assets/BackButton.png';
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

  // ④ PythonバックエンドへのAPI呼び出しロジックを追加
  // 追加場所: スクロール処理関数の定義の直後、またはコンポーネントの先頭
  useEffect(() => {
    const apiUrl = '/api/hello'; // Vercelにデプロイ後の相対パス
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
  }, []);

  const handleGenre1aClick = async () => {
    const valueToSend = 1; // 送信する数値は「1」

    try {
      const response = await fetch('/api/update_number', { // PythonのAPIエンドポイント
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: valueToSend }), // 数値1をJSONとして送信
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Pythonからのレスポンス:", data);
      // Python側で状態が保持されないため、ここではアラートのみ。
      // 実際にはDBに保存してその結果を表示するべきです。
      alert(`Pythonに数値 ${valueToSend} を送信しました。\nAPIの計算結果: ${data.calculated_value}`);

      // 成功したらMap.jsxに遷移
      navigate('/map'); // Map.jsxへのパス

    } catch (error) {
      console.error("数値送信エラー:", error);
      alert("数値の送信に失敗しました。詳細をコンソールで確認してください。");
    }
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
      <p style={{ padding: '2rem', fontSize: '20px' }}>ジャンルを選択してください（文章は要件等）。</p>

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

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
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
          onClick={handleGenre1aClick}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル2*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
        <img
          ref={genre2aRef}
          src={Genre2aImage}
          alt="ジャンル2-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          src={Genre2bImage}
          alt="ジャンル2-2"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          src={Genre2cImage}
          alt="ジャンル2-3"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map">
        <img
          src={Genre2dImage}
          alt="ジャンル2-4"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      {/*ジャンル3*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
          <img
            ref={genre3aRef} // スクロール対象としてのref
            src={Genre3aImage}
            alt="ジャンル3-1"
            style={{
              width: '300px',
              height: 'auto',
              maxWidth: '100%',
              scrollMarginTop: '100px',
              cursor: 'pointer', 
            }}
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル4*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          ref={genre4aRef}
          src={Genre4aImage}
          alt="ジャンル4-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル5*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          ref={genre5aRef}
          src={Genre5aImage}
          alt="ジャンル5-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル6*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          ref={genre6aRef}
          src={Genre6aImage}
          alt="ジャンル6-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル7*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          ref={genre7aRef}
          src={Genre7aImage}
          alt="ジャンル7-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      {/*ジャンル8*/}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link to="/map">
        <img
          ref={genre8aRef}
          src={Genre8aImage}
          alt="ジャンル8-1"
          style={{
            width: '300px',
            height: 'auto',
            maxWidth: '100%',
            scrollMarginTop: '100px', 
          }}
        />
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <Link to="/map"> 
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
          />
        </Link>
      </div>

      <div style={{ textAlign: 'center' }}>

        <Link to="/">
          {/* srcをインポートしたbackbutton変数に変更 */}
          <img src={backbutton} alt="戻る" style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      {/* フッター */}
      <footer style={{ backgroundColor: '#ddd', textAlign: 'center', padding: '1rem' }}>
        <p>&copy; 2025 ナビゲスト</p>
      </footer>
    </>
  );
};

export default SelectionScreen;

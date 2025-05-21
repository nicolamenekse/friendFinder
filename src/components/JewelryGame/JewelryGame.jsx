import React, { useState, useEffect, useCallback } from 'react';
import styles from './JewelryGame.module.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

const JewelryGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Yeni yemek oluştur
  const createFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    // Yemeğin yılanın üzerinde olmamasını kontrol et
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    if (isOnSnake) {
      return createFood();
    }
    return newFood;
  }, [snake]);

  // Oyunu başlat
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(createFood());
    setDirection('RIGHT');
    setGameActive(true);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  };

  // Yön değiştirme
  const handleKeyPress = useCallback((e) => {
    if (!gameActive) return;

    // Sayfanın kaymasını engelle
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  }, [direction, gameActive]);

  // Oyun döngüsü
  useEffect(() => {
    if (!gameActive) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Yılanın başını hareket ettir
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          default:
            break;
        }

        // Çarpışma kontrolü
        if (
          head.x < 0 || head.x >= GRID_SIZE ||
          head.y < 0 || head.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setGameActive(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Yemek yeme kontrolü
        if (head.x === food.x && head.y === food.y) {
          setFood(createFood());
          setScore(prev => prev + 10);
          setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [gameActive, direction, food, speed, createFood]);

  // Klavye dinleyicisi
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className={styles.gameContainer}>
      <h2>Yılan Oyunu</h2>
      
      <div className={styles.gameInfo}>
        <p>Puan: {score}</p>
      </div>

      {!gameActive && (
        <button onClick={startGame} className={styles.startButton}>
          {score > 0 ? 'Yeniden Başlat' : 'Oyunu Başlat'}
        </button>
      )}

      <div 
        className={styles.gameArea}
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE
        }}
      >
        {/* Yemek */}
        <div
          className={styles.food}
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE
          }}
        />

        {/* Yılan */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={styles.snakeSegment}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          />
        ))}
      </div>

      {!gameActive && score > 0 && (
        <div className={styles.gameOver}>
          <h3>Oyun Bitti!</h3>
          <p>Toplam Puan: {score}</p>
          <button onClick={startGame} className={styles.restartButton}>
            Yeniden Başlat
          </button>
        </div>
      )}
    </div>
  );
};

export default JewelryGame;

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function BonusGamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const machineNumber = parseInt(searchParams.get('machine') || '1')
  const totalBet = parseInt(searchParams.get('bet') || '9')
  
  const [gameType, setGameType] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // 根据机台号确定游戲类型
    if (machineNumber <= 3) setGameType('lottery')
    else if (machineNumber <= 6) setGameType('mariah')
    else if (machineNumber <= 9) setGameType('flying')
    else if (machineNumber <= 12) setGameType('fishing')
    else if (machineNumber <= 15) setGameType('shooting')
    else if (machineNumber <= 17) setGameType('jewel')
    else setGameType('dice')
  }, [machineNumber])

  // 彩券摸奖游戲
  const playLottery = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const nums = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ]
      const total = nums.reduce((a, b) => a + b, 0)
      const reward = totalBet * total
      setResult({
        type: 'lottery',
        numbers: nums,
        multiplier: total,
        reward: reward
      })
      setIsPlaying(false)
    }, 1500)
  }

  // 小瑪莉转盘游戲
  const playMariah = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const symbols = ['🍒', '🍊', '🍋', '🍌', '🍇', 'EXIT', '🎁']
      const spins = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]
      const exitCount = spins.filter(s => s === 'EXIT').length
      const multiplier = exitCount * 25
      const reward = totalBet * multiplier
      setResult({
        type: 'mariah',
        spins: spins,
        exitCount: exitCount,
        multiplier: multiplier,
        reward: reward
      })
      setIsPlaying(false)
    }, 2000)
  }

  // 飞行物射击游戲
  const playFlying = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const targets = Math.floor(Math.random() * 4) + 1 // 1-4个目标
      const hits = Math.floor(Math.random() * (targets + 1))
      const multiplier = hits >= 3 ? hits * 30 : hits * 10
      const reward = totalBet * multiplier
      setResult({
        type: 'flying',
        targets: targets,
        hits: hits,
        multiplier: multiplier,
        reward: reward
      })
      setIsPlaying(false)
    }, 1800)
  }

  // 甩竿钓鱼游戲
  const playFishing = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const fishes = Math.floor(Math.random() * 5) + 1 // 1-5条鱼
      const caught = Math.floor(Math.random() * (fishes + 1))
      const multiplier = caught >= 3 ? caught * 35 : caught * 12
      const reward = totalBet * multiplier
      setResult({
        type: 'fishing',
        fishes: fishes,
        caught: caught,
        multiplier: multiplier,
        reward: reward
      })
      setIsPlaying(false)
    }, 1700)
  }

  // 射下飞鸟游戲
  const playShooting = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const birds = 5
      const shots = 5
      let hit = 0
      for (let i = 0; i < shots; i++) {
        if (Math.random() > 0.4) hit++
      }
      const multiplier = hit >= 3 ? hit * 28 : hit * 8
      const reward = totalBet * multiplier
      setResult({
        type: 'shooting',
        birds: birds,
        hit: hit,
        multiplier: multiplier,
        reward: reward
      })
      setIsPlaying(false)
    }, 2000)
  }

  // 珠宝盒游戲
  const playJewel = () => {
    setIsPlaying(true)
    setTimeout(() => {
      const boxes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        value: Math.floor(Math.random() * 100)
      }))
      const selected = [
        boxes[Math.floor(Math.random() * boxes.length)],
        boxes[Math.floor(Math.random() * boxes.length)],
        boxes[Math.floor(Math.random() * boxes.length)]
      ]
      const total = selected.reduce((sum, box) => sum + box.value, 0)
      const multiplier = Math.floor(total / 3)
      const reward = totalBet * multiplier
      setResult({
        type: 'jewel',
        selected: selected,
        multiplier: multiplier,
        reward: reward
      })
      setIsPlaying(false)
    }, 1600)
  }

  // 擲骰过关游戲
  const playDice = () => {
    setIsPlaying(true)
    let position = 0
    let rolls = 0
    const interval = setInterval(() => {
      const dice = Math.floor(Math.random() * 6) + 1
      position += dice
      rolls++
      if (rolls >= 3) {
        clearInterval(interval)
        const multiplier = position > 10 ? position * 3 : position
        const reward = totalBet * multiplier
        setResult({
          type: 'dice',
          rolls: [dice, dice, dice],
          position: position,
          multiplier: multiplier,
          reward: reward
        })
        setIsPlaying(false)
      }
    }, 600)
  }

  const handlePlayAgain = () => {
    setResult(null)
  }

  const handleReturn = () => {
    router.back()
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#0f172a',
      color: '#fff',
      padding: '20px',
      fontFamily: 'system-ui',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* 标题 */}
      <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#06b6d4' }}>
        BONUS 赠分游戲
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
        机台 #{machineNumber} | 总押注分: {totalBet}
      </p>

      {/* 游戲区域 */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        background: '#1a1f2e',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        padding: '30px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {!result ? (
          <>
            <p style={{ fontSize: '16px', marginBottom: '20px', color: '#cbd5e1' }}>
              {gameType === 'lottery' && '50张彩券中选取3张'}
              {gameType === 'mariah' && '转动小瑪莉转盘'}
              {gameType === 'flying' && '射击飞行物，目标3个以上'}
              {gameType === 'fishing' && '甩竿钓鱼，钓出3条以上'}
              {gameType === 'shooting' && '射下飞鸟，射中3只以上'}
              {gameType === 'jewel' && '打开珠宝盒，选择3个'}
              {gameType === 'dice' && '擲骰过关，擲3次骰子'}
            </p>
            
            <button
              onClick={() => {
                if (gameType === 'lottery') playLottery()
                else if (gameType === 'mariah') playMariah()
                else if (gameType === 'flying') playFlying()
                else if (gameType === 'fishing') playFishing()
                else if (gameType === 'shooting') playShooting()
                else if (gameType === 'jewel') playJewel()
                else playDice()
              }}
              disabled={isPlaying}
              style={{
                padding: '15px 40px',
                background: isPlaying ? '#64748b' : '#10b981',
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isPlaying ? 'not-allowed' : 'pointer',
                marginBottom: '20px'
              }}
            >
              {isPlaying ? '游戲中...' : '开始游戲'}
            </button>
          </>
        ) : (
          <>
            {result.type === 'lottery' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', marginBottom: '15px' }}>选中数字</p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
                  {result.numbers.map((num: number, i: number) => (
                    <div
                      key={i}
                      style={{
                        width: '60px',
                        height: '60px',
                        background: '#3b82f6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  中奖倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {result.type === 'mariah' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
                  {result.spins.map((sym: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        width: '70px',
                        height: '70px',
                        background: sym === 'EXIT' ? '#ef4444' : '#3b82f6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px'
                      }}
                    >
                      {sym}
                    </div>
                  ))}
                </div>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  EXIT个数: {result.exitCount} | 倍数: {result.multiplier}倍
                </p>
              </div>
            )} 
        {result.type === 'flying' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                  目标: {result.targets} | 击中: {result.hits}
                </p>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {result.type === 'fishing' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                  鱼群: {result.fishes} | 钓出: {result.caught}条
                </p>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {result.type === 'shooting' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                  飞鸟: {result.birds} | 射中: {result.hit}只
                </p>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {result.type === 'jewel' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', marginBottom: '15px' }}>选中珠宝价值</p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
                  {result.selected.map((box: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        width: '60px',
                        height: '60px',
                        background: '#8b5cf6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    >
                      {box.value}
                    </div>
                  ))}
                </div>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {result.type === 'dice' && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                  最终位置: {result.position}
                </p>
                <p style={{ color: '#f59e0b', fontSize: '18px', fontWeight: 'bold' }}>
                  倍数: {result.multiplier}倍
                </p>
              </div>
            )}

            {/* 中奖显示 */}
            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#06b6d4',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#0f172a', fontSize: '14px', marginBottom: '8px' }}>赠送得分</p>
              <p style={{ color: '#0f172a', fontSize: '32px', fontWeight: 'bold' }}>
                +{result.reward}
              </p>
            </div>

            {/* 按钮组 */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              <button
                onClick={handlePlayAgain}
                style={{
                  padding: '12px 30px',
                  background: '#3b82f6',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                再玩一次
              </button>
              <button
                onClick={handleReturn}
                style={{
                  padding: '12px 30px',
                  background: '#ef4444',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                返回游戲
              </button>
            </div>
          </>
        )}
      </div>

      {/* 返回大厅按钮 */}
      <button
        onClick={() => router.push('/lobby')}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          background: '#64748b',
          border: 'none',
          color: '#fff',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ← 返回大厅
      </button>
    </div>
  )
}

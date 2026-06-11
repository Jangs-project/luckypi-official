use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function GameRulesPage() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const sections = [
    {
      id: 'mindset',
      title: '一、進入遊戲心態',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', padding: '12px 0' }}>
          <p>（一）未滿18+歲，請勿進入博弈區。</p>
          <p>（二）遊戲應為娛樂性消遣，不應作為賺錢手段。</p>
          <p>（三）設定合理預算，只投入你能承受的損失。</p>
          <p>（四）保持冷靜心態，避免衝動下注。</p>
          <p>（五）認識遊戲規則，了解中獎概率。</p>
          <p>（六）適時休息，避免長時間連續遊戲。</p>
          <p>（七）試玩幣每日凌晨更新不保留；Pi玩幣不消失，永久保留。</p>
          <p>（八）遵循責任遊戲原則，保護自己的健康。</p>
          <p>（九）支持pi生態早日落地，讓pi流通全世界，期待您的加入。</p>
        </div>
      )
    },
    {
      id: 'paylines',
      title: '二、九連線圖解',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '2', padding: '12px 0', fontFamily: 'monospace' }}>
          <p><strong>1V形</strong>：左上→中→右上</p>
          <p><strong>2一形</strong>：頂行（1■■■■■2）</p>
          <p><strong>3Z形</strong>：左上→中→右下</p>
          <p><strong>4M形</strong>：左下→中→右下</p>
          <p><strong>5一形</strong>：中間行（5■■■■■5）</p>
          <p><strong>6W形</strong>：左上→中→右上</p>
          <p><strong>7A形</strong>：垂直中間線兩側</p>
          <p><strong>8一形</strong>：底行（8■■■■■8）</p>
          <p><strong>9反Z形</strong>：右上→中→左下</p>
        </div>
      )
    },
    {
      id: 'payout',
      title: '三、一般中獎比率分配',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '12px', padding: '12px 0', overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #475569' }}>
            <thead>
              <tr style={{ background: '#1e293b', borderBottom: '2px solid #3b82f6' }}>
                <th style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>圖騰</th>
                <th style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>連3個</th>
                <th style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>連4個</th>
                <th style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>連5個</th>
                <th style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>全盤</th>
              </tr>
            </thead>
            <tbody>
              {[
                { symbol: 'A', r3: '×50', r4: '×75', r5: '×100', full: '×1000' },
                { symbol: 'B', r3: '×40', r4: '×60', r5: '×80', full: '×800' },
                { symbol: 'C', r3: '×30', r4: '×45', r5: '×60', full: '×600' },
                { symbol: 'D', r3: '×20', r4: '×30', r5: '×40', full: '×400' },
                { symbol: 'E', r3: '×10', r4: '×15', r5: '×20', full: '×200' },
                { symbol: 'F', r3: '×8', r4: '×12', r5: '×16', full: '×160' },
                { symbol: 'G', r3: '×6', r4: '×9', r5: '×12', full: '×120' },
                { symbol: 'H', r3: '×4', r4: '×6', r5: '×8', full: '×80' },
                { symbol: 'I', r3: '×2', r4: '×3', r5: '×4', full: '×40' }
              ].map((row, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#0f172a' : '#1a1f2e', borderBottom: '1px solid #475569' }}>
                  <td style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center', fontWeight: 'bold', color: '#06b6d4' }}>{row.symbol}</td>
                  <td style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>{row.r3}</td>
                  <td style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>{row.r4}</td>
                  <td style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center' }}>{row.r5}</td>
                  <td style={{ padding: '8px', border: '1px solid #475569', textAlign: 'center', color: '#10b981' }}>{row.full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'fullboard',
      title: '四、全盤獎分配說明',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', padding: '12px 0' }}>
          <p><strong>計算方式：</strong></p>
          <p>押注分數 × 圖騰倍數 = 得分</p>
          <p style={{ marginTop: '12px' }}><strong>範例：</strong></p>
          <p>押注分9，中了C圖騰全盤15個：</p>
          <p style={{ color: '#06b6d4', fontWeight: 'bold' }}>9 × 600 = 5400</p>
          <p style={{ marginTop: '12px' }}><strong>押注分數調整：</strong></p>
          <p>以「9」的倍數增減</p>
          <p style={{ color: '#10b981' }}>9、18、27、36、45……以此類推</p>
        </div>
      )
    },
    {
      id: 'special',
      title: '五、特殊符號說明',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', padding: '12px 0' }}>
          <p><strong style={{ color: '#ef4444' }}>J. WILD白搭</strong></p>
          <p style={{ marginLeft: '12px' }}>圖騰+WILD全文標籤</p>
          <p style={{ marginLeft: '12px' }}>出現率：隨機</p>
          
          <p style={{ marginTop: '16px' }}><strong style={{ color: '#f59e0b' }}>K. SCATTER免費遊戲次數</strong></p>
          <p style={{ marginLeft: '12px' }}>連3個：贈送免費5次轉盤得分</p>
          <p style={{ marginLeft: '12px' }}>連4個：贈送免費10次轉盤得分</p>
          <p style={{ marginLeft: '12px' }}>連5個：贈送免費15次轉盤得分</p>
          <p style={{ marginLeft: '12px', fontSize: '12px', color: '#94a3b8' }}>限制：每列只能1個SCATTER，須在9連線規範中才算得中</p>
          <p style={{ marginLeft: '12px', fontSize: '12px', color: '#94a3b8' }}>出現率：1/200～1000轉（可由後台管控調整）</p>
          
          <p style={{ marginTop: '16px' }}><strong style={{ color: '#8b5cf6' }}>L. BONUS額外贈分遊戲</strong></p>
          <p style={{ marginLeft: '12px' }}>連3個：贈送額外1次贈分遊戲</p>
          <p style={{ marginLeft: '12px' }}>連4個：贈送額外2次贈分遊戲</p>
          <p style={{ marginLeft: '12px' }}>連5個：贈送額外3次贈分遊戲</p>
          <p style={{ marginLeft: '12px', fontSize: '12px', color: '#94a3b8' }}>限制：每列只能1個BONUS，須在9連線規範中才算得中</p>
          <p style={{ marginLeft: '12px', fontSize: '12px', color: '#94a3b8' }}>出現率：1/300～1200轉（可由後台管控調整）</p>
        </div>
      )
    },
    {
      id: 'bonus',
      title: '六、BONUS額外贈分遊戲簡介',
      content: (
        <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8', padding: '12px 0' }}>
          <p style={{ color: '#f59e0b' }}>BONUS遊戲正在開發中，每台機台將配置專屬的贈分遊戲。</p>
          <p style={{ marginTop: '12px' }}>敬請期待後續更新！</p>
        </div>
      )
    }
  ]

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#0f172a',
      color: '#fff',
      padding: '20px',
      fontFamily: 'system-ui'
    }}>
      {/* 返回按钮 */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '10px 20px',
            background: '#3b82f6',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ← 返回
        </button>
      </div>

      {/* 标题 */}
      <h1 style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center', color: '#06b6d4' }}>
        遊戲規則說明
      </h1>

      {/* 規則列表 */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {sections.map((section) => (
          <div
            key={section.id}
            style={{
              marginBottom: '12px',
              border: '2px solid #3b82f6',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#1a1f2e'
            }}
          >
            {/* 標題欄 */}
            <button
              onClick={() => toggleSection(section.id)}
              style={{
                width: '100%',
                padding: '16px 20px',
                background: expandedSections[section.id] ? '#3b82f6' : '#0f172a',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <span>{section.title}</span>
              <span style={{ fontSize: '20px' }}>
                {expandedSections[section.id] ? '▼' : '▶'}
              </span>
            </button>

            {/* 內容區 */}
            {expandedSections[section.id] && (
              <div style={{
                padding: '20px',
                background: '#0f172a',
                borderTop: '1px solid #3b82f6'
              }}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 页脚 */}
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '12px',
        paddingTop: '20px',
        borderTop: '1px solid #475569'
      }}>
        <p>遊戲規則說明 | Luckypi AI 休閒娛樂城</p>
      </div>
    </div>
  )
}
这就是完整的游戏规则说明页面代码。您可以直接将这段代码复制到 GitHub 中的 app/game-rules/page.tsx 文件。

页面包含：

返回按钮
6个可展开/收起的菜单项
所有您提供的规则内容
专业的表格显示赔率
响应式设计和深色主题样式

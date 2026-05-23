'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    volume: 80,
    effects: true,
    spinSpeed: 'normal',
    notifications: true,
    animations: true,
  })

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    localStorage.setItem('settings', JSON.stringify({ ...settings, [key]: value }))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff', padding: '20px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#06b6d4' }}>設定</h1>
        <button onClick={() => router.back()} style={{ padding: '10px 16px', background: '#475569', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
          返回
        </button>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e0e7ff' }}>音量設定</h3>
          <input type="range" min="0" max="100" value={settings.volume} onChange={(e) => handleChange('volume', Number(e.target.value))} style={{ width: '100%', cursor: 'pointer' }} />
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#cbd5e1' }}>當前音量: {settings.volume}%</p>
        </div>

        <div style={{ background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#e0e7ff' }}>轉盤速度</h3>
          <select value={settings.spinSpeed} onChange={(e) => handleChange('spinSpeed', e.target.value)} style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
            <option value="slow">慢速</option>
            <option value="normal">正常</option>
            <option value="fast">快速</option>
          </select>
        </div>

        <div style={{ background: 'rgba(100, 116, 139, 0.1)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ fontSize: '14px' }}>遊戲音效</label>
            <input type="checkbox" checked={settings.effects} onChange={(e) => handleChange('effects', e.target.checked)} style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <label style={{ fontSize: '14px' }}>通知</label>
            <input type="checkbox" checked={settings.notifications} onChange={(e) => handleChange('notifications', e.target.checked)} style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '14px' }}>動畫效果</label>
            <input type="checkbox" checked={settings.animations} onChange={(e) => handleChange('animations', e.target.checked)} style={{ cursor: 'pointer', width: '20px', height: '20px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

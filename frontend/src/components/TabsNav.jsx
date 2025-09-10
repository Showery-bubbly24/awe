import React, { useState } from 'react';

export default function TabsNav({ tabs = [], activeId, onChange, onAddVideo, onDeleteVideo, loading }) {
  const [newVideoLink, setNewVideoLink] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddVideo = async () => {
    if (!newVideoLink) return;
    
    setIsAdding(true);
    try {
      await onAddVideo(newVideoLink);
      setNewVideoLink('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Ошибка при добавлении видео:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="tabs-loading">
        <p>Загрузка видео...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn"
          style={{ margin: '0 auto' }}
        >
          {showAddForm ? 'Отмена' : 'Добавить видео'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ 
          padding: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          background: 'rgba(247, 225, 198, 0.2)',
          margin: '0 10px 10px',
          borderRadius: '8px'
        }}>
          <input
            type="text"
            value={newVideoLink}
            onChange={(e) => setNewVideoLink(e.target.value)}
            placeholder="Вставьте ссылку на видео"
            style={{ 
              flex: 1, 
              padding: '8px', 
              border: '1px solid var(--border)', 
              borderRadius: '8px',
              background: 'var(--surface)'
            }}
          />
          <button 
            onClick={handleAddVideo} 
            disabled={isAdding}
            className="btn btn--primary"
            style={{ padding: '8px 12px' }}
          >
            {isAdding ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}

      <div className="tabs" role="tablist" aria-label="Видео">
        {tabs.map((tab) => {
          const isActive = tab.videoid === activeId;
          return (
            <div key={tab.videoid} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <button
                role="tab"
                aria-selected={isActive}
                className={'tab' + (isActive ? ' tab--active' : '')}
                onClick={() => onChange(tab)}
                title={tab.namevid}
                style={{ flex: 1 }}
              >
                <span className="tab__dot" aria-hidden="true" />
                <span className="tab__text">{tab.namevid}</span>
              </button>
              <button
                onClick={() => onDeleteVideo(tab.videoid)}
                title="Удалить видео"
                className="btn"
                style={{ 
                  marginLeft: '10px', 
                  padding: '5px 8px',
                  background: 'rgba(220, 53, 69, 0.1)',
                  color: 'var(--accent-strong)'
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
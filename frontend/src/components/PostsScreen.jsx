import React, { useState, useEffect } from 'react';
import PostEditorModal from './PostEditorModal';
import Post from './Post';
import { videoAPI } from '../services/api';

export default function PostsScreen({ onBack, user }) {
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Проверяем, является ли пользователь редактором
  const isEditor = user && user.role === 'admin';

  // Загрузка постов из базы данных
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await videoAPI.getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
      setError('Не удалось загрузить посты');
    } finally {
      setLoading(false);
    }
  };

  // Создание нового поста
  const handleCreatePost = async (postData) => {
    try {
      const postToSend = {
        Title: postData.title,
        Textpost: postData.text,
        ImgUrl: postData.images.join(';;'),
        Authorid: user.userId,
        Postdate: new Date().toISOString().slice(0, 19).replace("T", " ")
      };

      console.log("Создание поста – отправляем:", postToSend);

      await videoAPI.createPost(postToSend);
      await loadPosts();
      setShowPostEditor(false);
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
      alert('Не удалось создать пост');
    }
  };

  // Удаление поста
  const handleDeletePost = async (postId) => {
    try {
      console.log("Удаление поста – ID:", postId);
      await videoAPI.deletePost(postId);
      await loadPosts();
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      alert('Не удалось удалить пост');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <button className="btn btn--small" onClick={onBack}>
          На главную
        </button>
        <div className="brand">
          <span className="brand__dot"></span>
          <span className="brand__name">OurMirrowForYourVideo</span>
        </div>
        <div>
          {isEditor && (
            <button 
              className="btn btn--small btn--primary"
              onClick={() => setShowPostEditor(true)}
            >
              Написать пост
            </button>
          )}
        </div>
      </header>
      <div className="app__main">
        <div className="posts-container">
          {loading ? (
            <div className="posts-loading">Загрузка постов...</div>
          ) : error ? (
            <div className="posts-error">
              <p>{error}</p>
              <button className="btn btn--small" onClick={loadPosts}>
                Попробовать снова
              </button>
            </div>
          ) : posts.length === 0 ? (
            <>
              <h2>Чтение постов</h2>
              <p>
                {isEditor 
                  ? 'Создайте свой первый пост, нажав на кнопку выше' 
                  : 'Здесь будут отображаться посты редакторов'}
              </p>
            </>
          ) : (
            <div className="posts-list">
  {posts.map((post, index) => {
    const uniqueKey = post.postid ? `post-${post.postid}-${index}` : `post-${index}`;

    return (
      <Post 
        key={uniqueKey}
        post={{
          id: post.postid,
          title: post.title || "",      // Заголовок
          text: post.textpost || "",    // Текст
          images: post.imgUrl ? post.imgUrl.split(';;').filter(img => img !== '') : [],
          author: post.author || "Неизвестный автор",
          date: post.postdate ? new Date(post.postdate).toLocaleDateString('ru-RU') : "invalid data"
        }}
        currentUser={user}
        onDelete={isEditor ? handleDeletePost : null}
      />
    );
  })}
</div>
)}</div>
      </div>

      {showPostEditor && (
        <PostEditorModal 
          onClose={() => setShowPostEditor(false)} 
          onCreatePost={handleCreatePost}
        />
      )}
    </div>
  );
}

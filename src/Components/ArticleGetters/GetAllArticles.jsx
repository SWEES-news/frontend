import React, { useState, useEffect } from 'react';
import './ArticlesList.css'; // Import the CSS file

function ArticlesListComponent() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/articles/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data && Array.isArray(data.Data)) {
                setArticles(data.Data);
                setError(null);
            } else {
                console.error('Expected an array but received:', data);
                setError({ message: 'Invalid data format received from server.', type: 'data-format' });
            }
        })
        .catch(err => {
            console.error('Error fetching articles:', err);
            setError(err);
        });
    }, []);

    return (
        <div className="articles-list-container">
            <h2>Articles List</h2>
            {error && (
                <div className="error-message">
                    <p>Error fetching articles: {error.message}</p>
                    <p>Please try refreshing the page.</p>
                    {error.type === 'network' && <p>Check your internet connection and try again.</p>}
                    {error.type === 'data-format' && <p>Received data is in an unexpected format.</p>}
                </div>
            )}
            {!error && (
                <ul className="articles-list">
                    {articles.map(article => (
                        <li key={article._id} className="article-item">
                            <p>Article ID: {article._id}</p>
                            <p>Article Link: {article.article_link || 'N/A'}</p>
                            <p>Submitter ID: {article.submitter_id || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ArticlesListComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './ArticlesList.css'; // Import the CSS file
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/articles/submissions`;

function SubmissionsComponent() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(ENDPOINT)
        .then(response => {
            const data = response.data;
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
            setError({
                message: err.response ? err.response.data.Data || 'Error fetching articles.' : 'Network Error',
                type: err.response ? 'server' : 'network'
            });
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
                    {error.type === 'server' && <p>Server error occurred.</p>}
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

export default SubmissionsComponent;

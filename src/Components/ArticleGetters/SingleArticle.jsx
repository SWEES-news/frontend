import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArticlesList.css';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/articles`;

function SingleArticleComponent() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${ENDPOINT}/${articleId}`);
                const data = response.data;
                console.log(data);
                if (data && typeof data === 'object') {
                    setArticle(data);
                    setError(null);
                } else {
                    throw new Error('Invalid data format received from server.');
                }
            } catch (err) {
                console.error('Error fetching article:', err);
                setError({
                    message: err.response ? err.response.data.Data || err.response.data.message || 'Error fetching article.' : 'Network Error',
                    type: err.response ? 'server' : 'network'
                });
            }
        };

        fetchArticle();
    }, [articleId, ENDPOINT]);

    if (error) {
        return <div className="error-message">{error.message}</div>;
    }

    if (!article) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="articles-list-container">
            <h2>{article.article_title}</h2>
            <div className="article-item">
                <p>{article.article_body || 'N/A'}</p>
                <p>Article Link: {article.article_link || 'N/A'}</p>
                {article.private === "True" ? <p><b>PRIVATE ARTICLE</b></p> : ''}
            </div>
        </div>
    );
}

export default SingleArticleComponent;

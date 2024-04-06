import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ArticlesList.css';
import { Link } from 'react-router-dom';

function GenericArticlesComponent({ endpoint, title }) {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Define fetchArticles function here
    const fetchArticles = async () => {
        try {
            const response = await axios.get(endpoint, {
                params: searchQuery ? { title_keyword: searchQuery } : {}
            });
            const data = response.data;
            console.log(data);
            if (data && Array.isArray(data.Data)) {
                setArticles(data.Data);
                setError(null);
            } else {
                throw new Error('Invalid data format received from server.');
            }
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError({
                message: err.response ? err.response.data.Data || err.response.data.message || 'Error fetching articles.' : 'Network Error',
                type: err.response ? 'server' : 'network'
            });
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [endpoint, searchQuery]); 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchArticles();
    };

    return (
        <div className="articles-list-container">
            <h2>{title}</h2>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by title..." className="search-input" />
                <button type="submit" className="search-button">Search</button>
            </form>
            <ul className="articles-list">
                {articles.map(article => (
                    <Link to={`/articles/${article._id}`} className="article-item-link" key={article._id}>
                        <li className="article-item">
                            <p>Article Title: {article.article_title}</p>
                            <p>Article Link: {article.article_link || 'N/A'}</p>
                            <p>Article Preview: {article.article_preview || 'N/A'}</p>
                            <p>Private: {article.private}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default GenericArticlesComponent;

import React, { useState } from 'react';
import './ArticleSubmission.css';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';

const ENDPOINT = `${BACKEND_URL}/articles/submit`;

function ArticleSubmissionComponent() {
    const [articleLink, setArticleLink] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [articleTitle, setArticleTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(ENDPOINT, {
                article_link: articleLink,
                article_body: articleBody,
                article_title: articleTitle,
                private: isPrivate
            });
            setSubmissionResponse(response.data);
            setError(null);
        } catch (err) {
            setError({
                message: err.response ? err.response.data.Data || 'Error fetching articles.' : 'Network Error',
                type: err.response ? 'server' : 'network'
            });
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Submit an Article</h2>
            <form onSubmit={handleSubmit} className="article-submission-form">
                <div>
                    <label>
                        Article Link:
                        <input 
                            type="text" 
                            value={articleLink}
                            onChange={(e) => setArticleLink(e.target.value)}
                            required 
                            className="article-submission-input"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Article Body:
                        <input 
                            type="text" 
                            value={articleBody}
                            onChange={(e) => setArticleBody(e.target.value)}
                            required 
                            className="article-submission-input"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Article Title: 
                        <input 
                            type="text" 
                            value={articleTitle}
                            onChange={(e) => setArticleTitle(e.target.value)} 
                            className="article-submission-input"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Private Article:
                        <input 
                            type="checkbox" 
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="article-submission-checkbox"
                        />
                    </label>
                </div>
                <button type="submit" className="article-submission-button">Submit Article</button>
            </form>
            {submissionResponse && (
                <div className="article-submission-response">
                    <p>{submissionResponse.message}</p>
                    <p>Submission ID: {submissionResponse.submission_id}</p>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <p>Error submitting article: {error.message}</p>
                    <p>Please check your submission and try again.</p>
                </div>
            )}
        </div>
    );
}

export default ArticleSubmissionComponent;

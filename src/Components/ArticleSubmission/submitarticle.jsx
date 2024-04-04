import React, { useState } from 'react';
import './ArticleSubmission.css'; // Import the CSS file
import { BACKEND_URL } from '../../constants';
import axios from 'axios'; // Import axios

const ENDPOINT = `${BACKEND_URL}/articles/submit`;

function ArticleSubmissionComponent() {
    const [articleLink, setArticleLink] = useState('');
    const [articleBody, setarticleBody] = useState('');
    const [articleTitle, setarticleTitle] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(ENDPOINT, {
                article_link: articleLink,
                article_body: articleBody,
                article_title: articleTitle
            });
            console.log('Response:', response);
            setSubmissionResponse(response.data);
            setError(null);
        } catch (err) {
            console.error('Error submitting article:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Parsed Data:', err.response.data);
                setError({ message: err.response.data.Data || 'Network response was not ok', type: 'submission' });
            } else if (err.request) {
                // The request was made but no response was received
                setError({ message: 'No response received', type: 'network' });
            } else {
                // Something happened in setting up the request that triggered an Error
                setError({ message: err.message, type: 'unknown' });
            }
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
                            onChange={(e) => setarticleBody(e.target.value)}
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
                            onChange={(e) => setarticleTitle(e.target.value)}
                            required 
                            className="article-submission-input"
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
                    {error.type === 'validation' && <p>Ensure all required fields are filled correctly.</p>}
                    {error.type === 'network' && <p>Check your internet connection and try again.</p>}
                    {error.type === 'submission' && <p>{error.message}</p>}
                </div>
            )}
        </div>
    );
}

export default ArticleSubmissionComponent;

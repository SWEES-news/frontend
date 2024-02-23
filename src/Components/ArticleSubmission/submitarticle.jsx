import React, { useState } from 'react';
import './ArticleSubmission.css'; // Import the CSS file

function ArticleSubmissionComponent() {
    const [articleLink, setArticleLink] = useState('');
    const [submitterId, setSubmitterId] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/articles/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                article_link: articleLink,
                submitter_id: submitterId,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            setSubmissionResponse(data);
            setError(null);
        })
        .catch(err => {
            console.error('Error submitting article:', err);
            setError(err);
        });
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
                        Submitter ID:
                        <input 
                            type="text" 
                            value={submitterId}
                            onChange={(e) => setSubmitterId(e.target.value)}
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
                </div>
            )}
        </div>
    );
}

export default ArticleSubmissionComponent;

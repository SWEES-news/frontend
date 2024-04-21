import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import './styles.css';

const COMMENTS_ENDPOINT = `${BACKEND_URL}/comments/articles`;

function ArticleCommentsComponent() {
    const { articleId } = useParams();
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [parentId, setParentId] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [articleId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${COMMENTS_ENDPOINT}/${articleId}`);
            const fetchedComments = response.data.Data || [];
            setComments(formatComments(fetchedComments));
        } catch (err) {
            const errorMessage = err.response ? err.response.data.Data : 'Network error';
            setError(errorMessage);
            console.error('Error fetching comments:', errorMessage);
        }
    };

    const formatComments = (comments) => {
        let map = {}, node, roots = [];
        for (let i = 0; i < comments.length; i += 1) {
            map[comments[i]._id] = i;
            comments[i].children = [];
        }
        for (let i = 0; i < comments.length; i += 1) {
            node = comments[i];
            if (node.parent_id !== null && map[node.parent_id] !== undefined) {
                comments[map[node.parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${COMMENTS_ENDPOINT}/${articleId}`, {
                text: commentText,
                parent_id: parentId
            });
            fetchComments();  // Re-fetch comments to update the list including new nested comments
            setCommentText('');
            setParentId(null);  // Reset the parent ID after submitting
        } catch (err) {
            const errorMessage = err.response ? err.response.data.Data : 'Network error';
            setError(errorMessage);
            console.error('Failed to post comment:', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const initiateReply = (id) => {
        setParentId(id);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });  // Scroll to the comment form
    };

    const renderComments = (comments) => {
        return (
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        {comment.text}
                        <button onClick={() => initiateReply(comment._id)}>Reply</button>
                        {comment.children && comment.children.length > 0 && renderComments(comment.children)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="article-comments-container">
            <h3>Comments</h3>
            {error && <div className="error">{error}</div>}
            {renderComments(comments)}
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={`Write a ${parentId ? "reply" : "comment"}...`}
                    disabled={isSubmitting}
                ></textarea>
                <button type="submit" disabled={isSubmitting}>Post {parentId ? "Reply" : "Comment"}</button>
                {parentId && <button onClick={() => setParentId(null)} type="button">Cancel Reply</button>}
            </form>
        </div>
    );
}

export default ArticleCommentsComponent;

import React from 'react';
import GenericArticlesComponent from './GenericArticlesComponent';
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/articles/submissions`;

function SubmissionsComponent() {
    return <GenericArticlesComponent endpoint={ENDPOINT} title="Submissions List" />;
}

export default SubmissionsComponent;

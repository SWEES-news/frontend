import React from 'react';
import GenericArticlesComponent from './GenericArticlesComponent';
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/articles/all`;

function ArticlesListComponent() {
    return <GenericArticlesComponent endpoint={ENDPOINT} title="Articles List" />;
}

export default ArticlesListComponent;

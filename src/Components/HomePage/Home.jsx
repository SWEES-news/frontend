import React, { useEffect } from 'react';
import HomePageContextComponent from './HomePageContextComponent';
import ArticlesListComponent from './../ArticleGetters/GetAllArticles';
import './Home.css';

function HomePage() {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.hidden-section');

            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const isVisible = sectionTop < window.innerHeight - 100;

                if (isVisible) {
                    section.classList.add('visible-section');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
      <div className="homepage">
            <header className="homepage__header">
                <h1>News Bias Tool</h1>
                <p>Exposing Latent Perspectives in Contemporary News Reporting</p>
            </header>

            <HomePageContextComponent />

            <section className="section recent-articles hidden-section">
                      <h2>Latest Insights</h2>
                      <ArticlesListComponent />
            </section>

            <footer className="footer-resources">
                <h2>Empower Your Understanding</h2>
                <p>
                    Embark on a journey of discovery. Start by delving into our GitHub repository, navigate through our comprehensive documentation, and configure your environment following our guidelines. Join us in redefining the landscape of transparent news analysis.
                </p>
            </footer>
        </div>
    );
}

export default HomePage;

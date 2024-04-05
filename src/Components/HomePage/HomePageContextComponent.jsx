import React, { useEffect } from 'react';
import './Home.css';

const HomePageContextComponent = () => {
    return (
        <>
            <div className="homepage-context-container">
                <section className="section challenge hidden-section">
                    <h2>The Challenge</h2>
                    <p>
                        Amidst the plethora of news sources, discerning unbiased truth is increasingly arduous. Subtle biases, often imperceptible, skew public perception. Our goal is to elucidate the obscured narratives woven into today's news.
                    </p>
                </section>

                <section className="section solution hidden-section">
                    <h2>Our Innovative Solution</h2>
                    <p>
                        Our News Bias Tool leverages cutting-edge AI to deconstruct and illuminate biases in news articles. From sophisticated web scraping techniques to the deployment of advanced language models, we offer an all-encompassing analysis of journalistic content.
                    </p>
                </section>

                <section className="section target-customers hidden-section">
                    <h2>Who We Serve</h2>
                    <p>
                        Designed for the discerning, our tool serves anyone from students to professionals seeking veracity in their news consumption. We guide you through the labyrinthine complexities of media biases, illuminating truths often concealed.
                    </p>
                </section>

                <section className="section implementation hidden-section">
                    <h2>Our Approach</h2>
                    <p>
                        Comprehensive web scraping to collate a diverse array of articles. Advanced sentiment analysis to gauge the emotional tenor of articles. Employing a vector database to intricately map article interrelations. Utilization of Large Language Models for in-depth bias analysis.
                    </p>
                </section>

                <section className="section future-work hidden-section">
                    <h2>On the Horizon</h2>
                    <p>
                        We are in a state of perpetual evolution. Our roadmap includes developing a more intuitive user interface, implementing a sophisticated article search mechanism, and augmenting our sentiment analysis capabilities. Our commitment is to revolutionize news analysis, making it more accessible and insightful than ever.
                    </p>
                </section>

                <section className="section competitors hidden-section">
                    <h2>Understanding Our Ecosystem</h2>
                    <p>
                        While recognizing our peers such as Ground News, AllSides, The Dispatch, and News facts network, our approach sets a new benchmark through the integration of avant-garde AI technology and enhanced user engagement strategies.
                    </p>
                </section>

                <section className="section data-integrity hidden-section">
                    <h2>Data Integrity and Security</h2>
                    <p>
                        At the forefront of our priorities is the unwavering commitment to data integrity and security. Employing state-of-the-art encryption and rigorous data protection protocols, we ensure the confidentiality and accuracy of the information processed by our tool.
                    </p>
                </section>

                <section className="section user-experience hidden-section">
                    <h2>Enhancing User Experience</h2>
                    <p>
                        We constantly strive to refine the user experience, offering an intuitive, user-friendly interface that simplifies navigation while providing comprehensive analytical insights. Our design philosophy centers around user engagement and satisfaction.
                    </p>
                </section>

                <section className="section community-engagement hidden-section">
                    <h2>Community Engagement</h2>
                    <p>
                        Building a community is at the heart of our mission. We actively engage with our users, incorporating their feedback into continuous product improvement, and fostering a collaborative environment where ideas and perspectives are valued and exchanged.
                    </p>
                </section>

                <section className="section sustainability-focus hidden-section">
                    <h2>Focus on Sustainability</h2>
                    <p>
                        Recognizing our responsibility towards the environment, our operations are grounded in sustainability principles. From energy-efficient processes to promoting eco-conscious practices, we are committed to reducing our environmental footprint.
                    </p>
                </section>

                <section className="section innovative-research hidden-section">
                    <h2>Innovative Research and Development</h2>
                    <p>
                        Our team is devoted to ongoing research and development, staying abreast of the latest technological advancements. This dedication fuels our innovation, allowing us to bring cutting-edge features and capabilities to our platform.
                    </p>
                </section>

                <section className="section global-outreach hidden-section">
                    <h2>Global Outreach and Inclusivity</h2>
                    <p>
                        Embracing a global perspective, we extend our services worldwide with a focus on inclusivity. Our aim is to democratize access to unbiased news analysis, bridging the gap in information disparities across different regions and communities.
                    </p>
                </section>

            </div>
            
        </>
    );
};

export default HomePageContextComponent;

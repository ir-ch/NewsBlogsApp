import React, { useState, useEffect } from 'react'

import Weather from "./Weather"
import Calendar from './Calendar'

import './News.css'
import userImg from '../assets/images/user.jpg'
import noImg from '../assets/images/no-img.png'

import axios from 'axios'

const categories = ['general', 'world', 'business', 'technology', 'entertainment', 'sports', 'science', 'health', 'nation']

const News = () => {

    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general')
    const apiKey = import.meta.env.VITE_NEWS_APP_API_KEY

    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://gnews.io/api/v4/top-headlines?category=&{category}&lang=en&apikey=${apiKey}`;
            const response = await axios.get(url);
            const fetchedNews = response.data.articles

            fetchedNews.forEach((article) => {
                if (!article.image) {
                    article.image = noImg
                }
            })

            setHeadline(fetchedNews[0])
            setNews(fetchedNews.slice(1, 7))
        }
        fetchNews();
    }, [selectedCategory])

    const handleCategoryClick = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }

    return (
        <div className="news">
            <header className="news-header">
                <h1 className="logo">News & Blogs</h1>
                <div className="search-bar">
                    <form>
                        <input type="text" placeholder="Search News..." />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user">
                        <img src={userImg} alt="User Image" />
                        <p>Mary's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (
                                <a href="#" key={category} className="nav-link" onClick={(e) => handleCategoryClick(e, category)}>{category}</a>
                            ))}
                            <a href="#" className="nav-link">Bookmarks
                                <i className="fa-regular fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (
                        <div className="headline">
                            <img src={headline.image || noImg} alt={headline.title} />
                            <h2 className="headline-title">
                                {headline.title}
                                <i className="fa-regular fa-bookmark bookmark"></i>
                            </h2>
                        </div>
                    )}
                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item">
                                <img src={article.image || noImg} alt={article.title} />
                                <h3>
                                    {article.title}
                                    <i className="fa-regular fa-bookmark bookmark"></i>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="my-blogs">My Blogs</div>
                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>


            {/* <main className="news-arcticles">
                <article></article>
                <section></section>
            </main>
            <section className="news-blogs"></section> */}
            <footer className="news-footer">Footer
                {/* <div className="news-footer_text">News & Blogs App</div>
                <div className="news-footer_rights">All Rights Reserved By Code And Create</div> */}
            </footer>
        </div>
    )
}

export default News
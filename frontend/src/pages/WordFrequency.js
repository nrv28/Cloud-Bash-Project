// frontend/src/WordFrequency.js
import React, { useState } from 'react';
import axios from 'axios';


const WordFrequency = () => {
    const [url, setUrl] = useState('');
    const [topWords, setTopWords] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true while fetching data

        try {
            const response = await axios.post('http://localhost:5000/api/word-frequency', {
                url,
                topN: 10 // top 10 most frequent words
            });
            setTopWords(response.data.topWords);
        } catch (err) {
            setError('Failed to fetch word frequency');
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    return (
        <div>
            <h2>Top Word Frequency Finder</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter URL:</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    required
                />
                <button type="submit">Get Top Words</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading ? (
                <div className="spinner"></div> // Spinner displayed while loading
            ) : (
                topWords.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topWords.map(({ word, count }) => (
                                <tr key={word}>
                                    <td>{word}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
};

export default WordFrequency;

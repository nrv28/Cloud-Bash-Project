# Word-Extractor-Project

## Overview

The **Cloud-Bash-Project** is a web application designed to analyze the content of any web page provided via a URL input. The frontend interacts with a backend REST API, which fetches the page content, processes it, and returns the top N most frequent words. The frontend then displays these words and their frequencies in a neat table. This project combines HTML/CSS frontend with backend processing in a powerful tech stack, making it a compact, efficient word frequency analyzer.

## Features

- **URL Input**: Users can input any webpage link they want to analyze.
- **Backend Processing**: The backend fetches the page content and computes the most frequent words.
- **Word Frequency Table**: A visually structured table displays each word alongside its frequency count.
  
## Screenshots

**Request Body (JSON)**:
```bash
{
  "URL": "https://example.com",   // The webpage URL to analyze
  "Top_N": 10                     // (Optional) The number of top words to return (default is 10)
}
```

1. **Input Page**: The initial page where users can input the URL (shown below).
   ![Input Page](./Docs/Input.png)


**Response (JSON)**:
```bash
{
  "url": "https://example.com",
  "top_words": [
    ["word1", 12],
    ["word2", 8],
    ["word3", 5]
  ]
}
```

2. **Output Page**: The result page displaying the word frequency table.
   ![Output Page](./Docs/Output.png)

## Project Structure

### 1. Title
   ![Title](./Docs/1_Extractor.png)

### 2. Tools and Technologies Used
  - *Backend*: NodeJS, ExpressJS, BeautifulSoup, Python 3
  - *Frontend*: ReactJS, JavaScript (Fetch API)

   ![Tech Stack](./Docs/2_Extractor.png)

### 3. Project Overview
   ![Project Overview](./Docs/3_Extractor.png)

### 4. Workflow
   ![Workflow](./Docs/4_Extractor.png)

### 5. Data Structures Used
   ![Data Structures](./Docs/5_Extractor.png)

### 6. Python Script Work
   ![Python Script Work](./Docs/6_Extractor.png)

### 7. Future Enhancements
   ![Future Enhancements](./Docs/7_Extractor.png)

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, ReactJS
- **Backend**: Node.js, Express
- **Web Scraping & Analysis**: Python (BeautifulSoup, collections for word frequency)
- **REST API**: Facilitates communication between frontend and backend

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Cloud-Bash-Project.git
   cd Cloud-Bash-Project
   ```
   
2. Install dependencies:
   ```bash
   npm install
   pip install BeautifulSoup
   ```

3. Run the Backend Server:
   ```bash
   cd backend
   node server.js
   ```
4. Start the Frontend:
   ```bash
   cd frontend
   npm start
   ```

 ## Troubleshooting
- Common Issues:
  
**TemplateNotFound Error**: Ensure that your index.html file is located inside the templates directory.

**500 Internal Server Error**: This might happen if the webpage cannot be fetched. Check if the provided URL is valid and accessible.

**CORS Error**: If you are accessing the API from a different domain, make sure to handle CORS in your Flask app by using the flask-cors library.
  

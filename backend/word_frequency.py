import sys
import requests
from bs4 import BeautifulSoup
import json
import re

def get_word_frequencies(url):
    # Fetch the URL content
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch {url}")

    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract visible text
    text = soup.get_text()

    # Tokenize the text and count word frequency
    words = re.findall(r'\b\w+\b', text.lower())
    word_frequency = {}
    for word in words:
        word_frequency[word] = word_frequency.get(word, 0) + 1

    # Sort the words by frequency
    sorted_words = sorted(word_frequency.items(), key=lambda x: x[1], reverse=True)

    return sorted_words

# Get the URL and topN (optional) from the command-line arguments
url = sys.argv[1]  # The URL passed from Node.js
topN = int(sys.argv[2]) if len(sys.argv) > 2 else 10  # Default to top 10 if not provided

# Get the word frequencies
frequencies = get_word_frequencies(url)

# Limit to top N words
top_words = [{"word": word, "count": count} for word, count in frequencies[:topN]]

# Output the result as a JSON string
print(json.dumps(top_words))

"""Web scraping commands using Playwright"""
from __future__ import annotations
from mallm.tool_call_handler.autogpt_commands.command import command

# from autogpt.logs import logger
from bs4 import BeautifulSoup
from mallm.tool_call_handler.processing.html import (
    extract_hyperlinks,
    format_hyperlinks,
)
from mallm.config import Inter_Config as Config

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print(
        "Playwright not installed. Please install it with 'pip install playwright' to use."
    )


@command(
    "browse_website",
    "Browse Website",
    '"url": "<url>", "question": "<what_you_want_to_find_on_website>"',
)
def scrape_text(url: str, question: str, config: Config) -> str:
    """Browse a website and return the answer and links to the user

    Args:
        url (str): The url of the website to browse
        question (str): The question asked by the user

    Returns:
        Tuple[str, WebDriver]: The answer and links to the user and the webdriver
    """
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            page.goto(url)
            if (
                url == "https://www.google.com/"
                or url == "https://www.google.com"
                or url == "http://www.google.com/"
                or url == "http://www.google.com"
            ):
                page.goto(
                    f"https://www.google.com/search?q={question}&oq={question}&aqs=chrome..69i57.2975j0j2&sourceid=chrome&ie=UTF-8"
                )
            html_content = page.content()
            soup = BeautifulSoup(html_content, "html.parser")

            for script in soup(["script", "style"]):
                script.extract()

            # scrape text
            text = soup.get_text()
            lines = (line.strip() for line in text.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            text = "\n".join(chunk for chunk in chunks if chunk)

            # scrape link
            hyperlinks = extract_hyperlinks(soup, url)
            formatted_links = format_hyperlinks(hyperlinks)

        except Exception as e:
            text = f"Error: {str(e)}"
            formatted_links = f"Error: {str(e)}"

        finally:
            browser.close()
    # summary = summarize_memorize_webpage(url, text, question, config)
    summary = text
    summary = summary[:1000]
    if isinstance(formatted_links, list):
        # Limit links to 5
        if len(formatted_links) > 5:
            formatted_links = formatted_links[:5]
    return f"Answer gathered from website: {summary}\n\nLinks: {formatted_links}"

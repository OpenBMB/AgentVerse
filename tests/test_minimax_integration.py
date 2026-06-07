"""Integration tests for MiniMax LLM provider.

These tests require a valid MINIMAX_API_KEY environment variable.
Skip with: pytest -m "not integration"
"""
import os

import pytest

# AgentVerse requires OPENAI_API_KEY for module import chain
os.environ.setdefault("OPENAI_API_KEY", "sk-test-placeholder")

pytestmark = pytest.mark.skipif(
    not os.environ.get("MINIMAX_API_KEY"),
    reason="MINIMAX_API_KEY not set",
)


@pytest.fixture
def minimax_chat():
    """Create a MiniMaxChat instance with real credentials."""
    from agentverse.llms.minimax import MiniMaxChat

    return MiniMaxChat(model="MiniMax-M3", temperature=0.1, max_tokens=128)


@pytest.mark.integration
def test_basic_generation(minimax_chat):
    """Test basic text generation with MiniMax API."""
    result = minimax_chat.generate_response(
        prepend_prompt="You are a helpful assistant. Reply in one short sentence.",
        append_prompt="What is 2 + 2?",
    )
    assert result.content
    assert "4" in result.content
    assert result.send_tokens > 0
    assert result.recv_tokens > 0


@pytest.mark.integration
def test_generation_with_history(minimax_chat):
    """Test generation with conversation history."""
    history = [
        {"role": "user", "content": "My name is Alice."},
        {"role": "assistant", "content": "Nice to meet you, Alice!"},
    ]
    result = minimax_chat.generate_response(
        prepend_prompt="You are a helpful assistant.",
        history=history,
        append_prompt="What is my name?",
    )
    assert result.content
    assert "Alice" in result.content


@pytest.mark.integration
@pytest.mark.asyncio
async def test_async_generation(minimax_chat):
    """Test async text generation with MiniMax API."""
    result = await minimax_chat.agenerate_response(
        prepend_prompt="You are a helpful assistant. Reply in one short sentence.",
        append_prompt="What is the capital of France?",
    )
    assert result.content
    assert "Paris" in result.content

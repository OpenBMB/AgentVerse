"""Unit tests for MiniMax LLM provider in AgentVerse."""
import ast
import json
import os
import re
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

# AgentVerse requires OPENAI_API_KEY for module import chain
os.environ.setdefault("OPENAI_API_KEY", "sk-test-placeholder")

from agentverse.llms.minimax import (
    MINIMAX_INPUT_COST,
    MINIMAX_OUTPUT_COST,
    MINIMAX_TOKEN_LIMITS,
    MiniMaxChat,
    MiniMaxChatArgs,
    _strip_think_tags,
)
from agentverse.llms.base import LLMResult


class TestStripThinkTags:
    """Tests for _strip_think_tags utility."""

    def test_no_think_tags(self):
        assert _strip_think_tags("Hello world") == "Hello world"

    def test_empty_string(self):
        assert _strip_think_tags("") == ""

    def test_none_input(self):
        assert _strip_think_tags(None) is None

    def test_single_think_tag(self):
        text = "<think>internal reasoning</think>Final answer"
        assert _strip_think_tags(text) == "Final answer"

    def test_think_tag_with_newlines(self):
        text = "<think>\nstep 1\nstep 2\n</think>\nHere is the result"
        result = _strip_think_tags(text)
        assert "think" not in result
        assert "Here is the result" in result

    def test_multiple_think_tags(self):
        text = "<think>first</think>middle<think>second</think>end"
        result = _strip_think_tags(text)
        assert result == "middleend"


class TestMiniMaxChatArgs:
    """Tests for MiniMaxChatArgs defaults."""

    def test_default_model(self):
        args = MiniMaxChatArgs()
        assert args.model == "MiniMax-M3"

    def test_default_temperature(self):
        args = MiniMaxChatArgs()
        assert args.temperature == 0.7

    def test_default_max_tokens(self):
        args = MiniMaxChatArgs()
        assert args.max_tokens == 2048

    def test_custom_model(self):
        args = MiniMaxChatArgs(model="MiniMax-M2.7")
        assert args.model == "MiniMax-M2.7"

    def test_custom_temperature(self):
        args = MiniMaxChatArgs(temperature=0.5)
        assert args.temperature == 0.5


class TestMiniMaxChatInit:
    """Tests for MiniMaxChat initialization."""

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_default_init(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat()
            assert chat.args.model == "MiniMax-M3"
            assert chat.args.temperature == 0.7
            assert chat.total_prompt_tokens == 0
            assert chat.total_completion_tokens == 0

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_custom_model_init(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat(model="MiniMax-M2.7-highspeed")
            assert chat.args.model == "MiniMax-M2.7-highspeed"

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_temperature_clamping_high(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat(temperature=2.0)
            assert chat.args.temperature == 1.0

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_temperature_clamping_low(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat(temperature=-0.5)
            assert chat.args.temperature == 0.0

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_temperature_zero_accepted(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat(temperature=0.0)
            assert chat.args.temperature == 0.0


class TestMiniMaxChatTokenLimits:
    """Tests for send_token_limit."""

    def test_m3_limit(self):
        assert MiniMaxChat.send_token_limit("MiniMax-M3") == 512000

    def test_m27_limit(self):
        assert MiniMaxChat.send_token_limit("MiniMax-M2.7") == 192000

    def test_m27_highspeed_limit(self):
        assert MiniMaxChat.send_token_limit("MiniMax-M2.7-highspeed") == 192000

    def test_unknown_model_default(self):
        assert MiniMaxChat.send_token_limit("unknown-model") == 192000


class TestMiniMaxChatMessages:
    """Tests for construct_messages."""

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_system_and_user_messages(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat()
            messages = chat.construct_messages(
                prepend_prompt="You are a helper.",
                history=[],
                append_prompt="Hello!",
            )
            assert len(messages) == 2
            assert messages[0]["role"] == "system"
            assert messages[0]["content"] == "You are a helper."
            assert messages[1]["role"] == "user"
            assert messages[1]["content"] == "Hello!"

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_with_history(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat()
            history = [
                {"role": "user", "content": "Hi"},
                {"role": "assistant", "content": "Hello!"},
            ]
            messages = chat.construct_messages(
                prepend_prompt="System",
                history=history,
                append_prompt="How are you?",
            )
            assert len(messages) == 4

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_empty_prompts(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat()
            messages = chat.construct_messages(
                prepend_prompt="",
                history=[],
                append_prompt="",
            )
            assert len(messages) == 0


class TestMiniMaxChatSpend:
    """Tests for cost tracking."""

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_zero_spend(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat()
            assert chat.get_spend() == 0.0

    @patch.dict(os.environ, {"MINIMAX_API_KEY": "test-key"}, clear=False)
    def test_spend_calculation(self):
        with patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key"):
            chat = MiniMaxChat(model="MiniMax-M3")
            chat.total_prompt_tokens = 1000
            chat.total_completion_tokens = 500
            expected = (
                1000 * MINIMAX_INPUT_COST["MiniMax-M3"] / 1000.0
                + 500 * MINIMAX_OUTPUT_COST["MiniMax-M3"] / 1000.0
            )
            assert chat.get_spend() == expected


class TestMiniMaxChatGenerate:
    """Tests for generate_response with mocked OpenAI client."""

    def _mock_response(self, content="Hello!", prompt_tokens=10, completion_tokens=5):
        response = MagicMock()
        response.choices = [MagicMock()]
        response.choices[0].message.content = content
        response.choices[0].message.function_call = None
        response.usage.prompt_tokens = prompt_tokens
        response.usage.completion_tokens = completion_tokens
        response.usage.total_tokens = prompt_tokens + completion_tokens
        return response

    @patch("agentverse.llms.minimax.OpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_generate_basic(self, mock_openai_cls):
        mock_client = MagicMock()
        mock_openai_cls.return_value = mock_client
        mock_client.chat.completions.create.return_value = self._mock_response(
            "Test response"
        )

        chat = MiniMaxChat()
        result = chat.generate_response(
            prepend_prompt="System",
            append_prompt="Hello",
        )

        assert isinstance(result, LLMResult)
        assert result.content == "Test response"
        assert result.send_tokens == 10
        assert result.recv_tokens == 5

    @patch("agentverse.llms.minimax.OpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_generate_strips_think_tags(self, mock_openai_cls):
        mock_client = MagicMock()
        mock_openai_cls.return_value = mock_client
        mock_client.chat.completions.create.return_value = self._mock_response(
            "<think>reasoning here</think>Clean output"
        )

        chat = MiniMaxChat()
        result = chat.generate_response(append_prompt="Test")

        assert result.content == "Clean output"

    @patch("agentverse.llms.minimax.OpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_generate_with_functions(self, mock_openai_cls):
        mock_client = MagicMock()
        mock_openai_cls.return_value = mock_client
        response = self._mock_response()
        response.choices[0].message.function_call = MagicMock()
        response.choices[0].message.function_call.name = "get_weather"
        response.choices[0].message.function_call.arguments = '{"city": "Beijing"}'
        mock_client.chat.completions.create.return_value = response

        chat = MiniMaxChat()
        functions = [{"name": "get_weather", "parameters": {}}]
        result = chat.generate_response(
            append_prompt="Weather?", functions=functions
        )

        assert result.function_name == "get_weather"
        assert result.function_arguments == {"city": "Beijing"}

    @patch("agentverse.llms.minimax.OpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_generate_tracks_metrics(self, mock_openai_cls):
        mock_client = MagicMock()
        mock_openai_cls.return_value = mock_client
        mock_client.chat.completions.create.return_value = self._mock_response(
            prompt_tokens=100, completion_tokens=50
        )

        chat = MiniMaxChat()
        chat.generate_response(append_prompt="Test")

        assert chat.total_prompt_tokens == 100
        assert chat.total_completion_tokens == 50


class TestMiniMaxChatAsyncGenerate:
    """Tests for agenerate_response with mocked AsyncOpenAI client."""

    def _mock_response(self, content="Hello!", prompt_tokens=10, completion_tokens=5):
        response = MagicMock()
        response.choices = [MagicMock()]
        response.choices[0].message.content = content
        response.choices[0].message.function_call = None
        response.usage.prompt_tokens = prompt_tokens
        response.usage.completion_tokens = completion_tokens
        response.usage.total_tokens = prompt_tokens + completion_tokens
        return response

    @patch("agentverse.llms.minimax.AsyncOpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    @pytest.mark.asyncio
    async def test_agenerate_basic(self, mock_async_cls):
        mock_client = MagicMock()
        mock_async_cls.return_value = mock_client
        mock_client.chat.completions.create = AsyncMock(
            return_value=self._mock_response("Async response")
        )

        chat = MiniMaxChat()
        result = await chat.agenerate_response(append_prompt="Hello")

        assert isinstance(result, LLMResult)
        assert result.content == "Async response"

    @patch("agentverse.llms.minimax.AsyncOpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    @pytest.mark.asyncio
    async def test_agenerate_strips_think_tags(self, mock_async_cls):
        mock_client = MagicMock()
        mock_async_cls.return_value = mock_client
        mock_client.chat.completions.create = AsyncMock(
            return_value=self._mock_response(
                "<think>thinking...</think>The answer is 42"
            )
        )

        chat = MiniMaxChat()
        result = await chat.agenerate_response(append_prompt="What?")

        assert result.content == "The answer is 42"

    @patch("agentverse.llms.minimax.AsyncOpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    @pytest.mark.asyncio
    async def test_agenerate_with_valid_function(self, mock_async_cls):
        mock_client = MagicMock()
        mock_async_cls.return_value = mock_client
        response = self._mock_response()
        response.choices[0].message.function_call = MagicMock()
        response.choices[0].message.function_call.name = "search"
        response.choices[0].message.function_call.arguments = '{"query": "test"}'
        mock_client.chat.completions.create = AsyncMock(return_value=response)

        chat = MiniMaxChat()
        functions = [{"name": "search", "parameters": {}}]
        result = await chat.agenerate_response(
            append_prompt="Search", functions=functions
        )

        assert result.function_name == "search"
        assert result.function_arguments == {"query": "test"}

    @patch("agentverse.llms.minimax.AsyncOpenAI")
    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    @pytest.mark.asyncio
    async def test_agenerate_invalid_function_raises(self, mock_async_cls):
        mock_client = MagicMock()
        mock_async_cls.return_value = mock_client
        response = self._mock_response()
        response.choices[0].message.function_call = MagicMock()
        response.choices[0].message.function_call.name = "invalid_func"
        response.choices[0].message.function_call.arguments = "{}"
        mock_client.chat.completions.create = AsyncMock(return_value=response)

        chat = MiniMaxChat()
        functions = [{"name": "search", "parameters": {}}]
        with pytest.raises(ValueError, match="not in the list of valid functions"):
            await chat.agenerate_response(
                append_prompt="Search", functions=functions
            )


class TestMiniMaxRegistry:
    """Tests for LLM registry integration."""

    def test_minimax_registered(self):
        from agentverse.llms import llm_registry

        assert "minimax" in llm_registry.entries

    def test_m3_registered(self):
        from agentverse.llms import llm_registry

        assert "MiniMax-M3" in llm_registry.entries

    def test_m27_registered(self):
        from agentverse.llms import llm_registry

        assert "MiniMax-M2.7" in llm_registry.entries

    def test_m27_highspeed_registered(self):
        from agentverse.llms import llm_registry

        assert "MiniMax-M2.7-highspeed" in llm_registry.entries

    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_registry_build(self):
        from agentverse.llms import llm_registry

        chat = llm_registry.build("minimax")
        assert isinstance(chat, MiniMaxChat)
        assert chat.args.model == "MiniMax-M3"

    @patch("agentverse.llms.minimax.MINIMAX_API_KEY", "test-key")
    def test_registry_build_specific_model(self):
        from agentverse.llms import llm_registry

        chat = llm_registry.build("MiniMax-M2.7-highspeed")
        assert isinstance(chat, MiniMaxChat)


class TestMiniMaxConstants:
    """Tests for module-level constants."""

    def test_token_limits_all_models(self):
        assert "MiniMax-M3" in MINIMAX_TOKEN_LIMITS
        assert "MiniMax-M2.7" in MINIMAX_TOKEN_LIMITS
        assert "MiniMax-M2.7-highspeed" in MINIMAX_TOKEN_LIMITS

    def test_input_cost_all_models(self):
        assert "MiniMax-M3" in MINIMAX_INPUT_COST
        assert "MiniMax-M2.7" in MINIMAX_INPUT_COST
        assert "MiniMax-M2.7-highspeed" in MINIMAX_INPUT_COST

    def test_output_cost_all_models(self):
        assert "MiniMax-M3" in MINIMAX_OUTPUT_COST
        assert "MiniMax-M2.7" in MINIMAX_OUTPUT_COST
        assert "MiniMax-M2.7-highspeed" in MINIMAX_OUTPUT_COST

    def test_costs_are_positive(self):
        for model, cost in MINIMAX_INPUT_COST.items():
            assert cost > 0, f"Input cost for {model} should be positive"
        for model, cost in MINIMAX_OUTPUT_COST.items():
            assert cost > 0, f"Output cost for {model} should be positive"

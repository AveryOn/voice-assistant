#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
FULL_PATH="$(realpath "$SCRIPT_DIR/../input.wav")"

TEXT=$(~/.npm-global/bin/voice-parser "$FULL_PATH")
echo "$TEXT"
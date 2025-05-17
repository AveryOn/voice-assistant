#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PID_FILE="$SCRIPT_DIR/arecord.pid"
FULL_PATH="$(realpath "$SCRIPT_DIR/../input.wav")"

# Заглушка — здесь будет вызов whisper + speak
kill $(cat "$PID_FILE")
rm "$PID_FILE"

TEXT=$(~/.npm-global/bin/voice-parser "$FULL_PATH")
echo "$TEXT"
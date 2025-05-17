#!/bin/bash


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

arecord -f cd -c 1 -r 16000 "$SCRIPT_DIR/../input.wav" &
echo $! > "$SCRIPT_DIR/arecord.pid"
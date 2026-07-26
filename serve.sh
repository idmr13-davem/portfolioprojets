#!/bin/sh
cd "$(dirname "$0")"
exec python3 -m http.server 3456

#!/bin/bash

# Directory where flattened files will be stored
FLATTENED_DIR="flattened_files"

# Create the directory if it doesn't exist
mkdir -p "$FLATTENED_DIR"

# Function to copy files to the flattened directory
flatten_files() {
    local dir=$1
    for file in "$dir"/*; do
        if [[ -d "$file" ]]; then
            # If it's a directory, recurse into it
            flatten_files "$file"
        elif [[ -f "$file" ]]; then
            # If it's a file, copy it to the flattened directory
            # Generate a unique filename to avoid overwrites
            local base=$(basename "$file")
            local dest="${FLATTENED_DIR}/${base%.*}_$(date +%s%N).${base##*.}"
            cp "$file" "$dest"
        fi
    done
}

# Start flattening from the current directory
flatten_files "."

echo "Files have been flattened into $FLATTENED_DIR"

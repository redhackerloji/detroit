#!/bin/bash

# Run the Next.js build
npm run build

# Create the out directory if it doesn't exist
mkdir -p out

# Create the .nojekyll file
touch out/.nojekyll

# Copy the contents of the out directory if needed
if [ -d "dist" ]; then
  cp -r dist/* out/
fi 
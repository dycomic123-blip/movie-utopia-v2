#!/bin/bash

echo "Enter your GitHub Personal Access Token:"
echo "(Create one at: https://github.com/settings/tokens/new?scopes=repo)"
read -s GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: No token provided"
    exit 1
fi

echo ""
echo "Creating repository on GitHub..."

curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "movie-utopia-v2",
    "description": "AI Film Creation Platform - Movie Utopia v2",
    "private": false
  }' > /tmp/github-response.json

if grep -q '"full_name"' /tmp/github-response.json; then
    echo "✓ Repository created!"
    echo ""
    echo "Pushing code..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "=========================================="
        echo "✓ SUCCESS! Deployed to GitHub!"
        echo "=========================================="
        echo "https://github.com/dycomic123/movie-utopia-v2"
    fi
else
    echo "Failed to create repository. Response:"
    cat /tmp/github-response.json
fi

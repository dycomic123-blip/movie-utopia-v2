#!/bin/bash

echo "========================================="
echo "GitHub Repository Setup"
echo "========================================="
echo ""

# Check if repository exists
echo "Checking if repository exists..."
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
  https://api.github.com/repos/dycomic123/movie-utopia-v2)

if [ "$REPO_CHECK" = "200" ]; then
    echo "✓ Repository already exists!"
    echo ""
    echo "Pushing code..."
    git push -u origin main
    exit 0
fi

echo ""
echo "Repository not found. Let's create it!"
echo ""
echo "========================================="
echo "Step 1: Create GitHub Personal Access Token"
echo "========================================="
echo ""
echo "1. Visit: https://github.com/settings/tokens/new"
echo "2. Note: 'Movie Utopia Deployment'"
echo "3. Expiration: 30 days (or as needed)"
echo "4. Select scopes:"
echo "   ☑ repo (Full control of private repositories)"
echo "5. Click 'Generate token'"
echo "6. COPY the token (you won't see it again!)"
echo ""
read -p "Paste your GitHub token here: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

echo "Creating repository..."
RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "movie-utopia-v2",
    "description": "AI Film Creation Platform - Movie Utopia v2",
    "private": false,
    "auto_init": false
  }')

# Check if repository was created
if echo "$RESPONSE" | grep -q '"full_name"'; then
    echo "✓ Repository created successfully!"
    echo ""
    echo "Pushing code to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "========================================="
        echo "✓ SUCCESS! Deployment Complete!"
        echo "========================================="
        echo ""
        echo "Your repository is live at:"
        echo "https://github.com/dycomic123/movie-utopia-v2"
        echo ""
    else
        echo "❌ Push failed. Please check your authentication."
    fi
else
    echo "❌ Failed to create repository."
    echo "Response: $RESPONSE"
    echo ""
    echo "Alternative: Create manually at https://github.com/new"
fi

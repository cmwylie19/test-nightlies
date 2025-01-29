#!/bin/bash

npm install -g npm

LATEST_VERSION=$(npx --yes test-nightlies-cw@latest version 2>/dev/null)
RAW_NIGHTLY_VERSION=$(npx --yes test-nightlies-cw@nightly version 2>/dev/null || echo "none")

if [[ "$RAW_NIGHTLY_VERSION" == "none" ]]; then
    echo "No nightly version found. Setting NIGHTLY_VERSION=0."
    NIGHTLY_VERSION=0
else
    NIGHTLY_VERSION_PART=$(echo "$RAW_NIGHTLY_VERSION" | grep -oE "nightly\.([0-9]+)" | cut -d. -f2)

    BASE_NIGHTLY_VERSION=${RAW_NIGHTLY_VERSION%-nightly*}
    if [[ "$LATEST_VERSION" > "$BASE_NIGHTLY_VERSION" ]]; then
        echo "Nightly version is less than the latest version. Resetting NIGHTLY_VERSION to 0."
        NIGHTLY_VERSION=0
    else
        NIGHTLY_VERSION=$((NIGHTLY_VERSION_PART + 1))
        echo "Incrementing NIGHTLY_VERSION to $NIGHTLY_VERSION."
    fi
fi

FULL_VERSION="${LATEST_VERSION}-nightly.${NIGHTLY_VERSION}"

echo "FULL_VERSION=$FULL_VERSION" >> "$GITHUB_ENV"

npm version --no-git-tag-version "$FULL_VERSION"

docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag ghcr.io/cmwylie19/test-nightlies/controller:"$FULL_VERSION" .

npm publish --tag "nightly"

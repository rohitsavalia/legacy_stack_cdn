# Legacy Stack CDN

This repository provides a collection of static assets (CSS, JS) compatible with legacy web applications. These assets are available through a CDN hosted by jsDelivr, which allows you to easily include them in your projects without the need to host them yourself.

## Accessing via jsDelivr CDN

You can access the files in this repository through the jsDelivr CDN. To use a file, simply replace the `github.com` URL with `cdn.jsdelivr.net/gh`, and append the correct file path and version information. Here’s an example:

- **GitHub Repository URL**:  
  `https://github.com/rohitsavalia/legacy_stack_cdn/blob/main/mstock/css/bootstrapCompatibleCommon.css`
  
- **jsDelivr CDN URL**:  
  `https://cdn.jsdelivr.net/gh/rohitsavalia/legacy_stack_cdn@main/mstock/css/bootstrapCompatibleCommon.css`

The format to access a file from your GitHub repository via jsDelivr is:

https://cdn.jsdelivr.net/gh/{GitHub-username}/{repository-name}@{branch-name}/{file-path}


## Example:

If your repository URL is `https://github.com/rohitsavalia/legacy_stack_cdn` and the file you want to access is `mstock/css/bootstrapCompatibleCommon.css` located in the `main` branch, the jsDelivr URL will be:

https://cdn.jsdelivr.net/gh/rohitsavalia/legacy_stack_cdn@main/mstock/css/bootstrapCompatibleCommon.css


You can now use this URL directly in your HTML, CSS, or JavaScript files.

---

## How to Generate a jsDelivr URL from a GitHub Repository

To create a jsDelivr URL for any file in your GitHub repository:

1. Go to the [GitHub repository](https://github.com/rohitsavalia/legacy_stack_cdn).
2. Navigate to the file you want to use (e.g., `mstock/css/bootstrapCompatibleCommon.css`).
3. Copy the GitHub URL for the file (e.g., `https://github.com/rohitsavalia/legacy_stack_cdn/blob/main/mstock/css/bootstrapCompatibleCommon.css`).
4. Replace `github.com` with `cdn.jsdelivr.net/gh`, and make sure to add `@{branch-name}` (in this case, `@main`) after your repository name.

The final format is:
https://cdn.jsdelivr.net/gh/{GitHub-username}/{repository-name}@{branch-name}/{file-path}


## Example:

For the file `bootstrapCompatibleCommon.css` in your repository, the jsDelivr URL is:
https://cdn.jsdelivr.net/gh/rohitsavalia/legacy_stack_cdn@main/mstock/css/bootstrapCompatibleCommon.css


---

## Purging Cache from jsDelivr

In some cases, you might want to manually purge a file from jsDelivr’s cache (e.g., when you update a file but the CDN is still serving the old version). You can do this through jsDelivr's cache purge feature.

To purge the cache:

1. Go to the [jsDelivr Cache Purge](https://www.jsdelivr.com/drive).
2. Sign in with your GitHub account.
3. Enter the full URL of the file that you want to purge from the cache (e.g., `https://cdn.jsdelivr.net/gh/rohitsavalia/legacy_stack_cdn@main/mstock/css/bootstrapCompatibleCommon.css`).
4. Click the **Purge** button to clear the cache for that file.

Once the cache is purged, jsDelivr will serve the most recent version of the file when requested.

---

## Notes:
- **Versioning**: The `@main` part in the URL ensures you're using the latest version of the file from the `main` branch. You can replace `@main` with any other GitHub branch or commit hash if needed.
- **Performance**: By using jsDelivr's CDN, your static files will be delivered with high performance from their global edge nodes.

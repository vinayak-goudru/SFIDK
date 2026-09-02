# Google Search Console Indexing & Verification Guide

This guide describes how to register your SFI Dakshina Kannada website on Google so that it displays in search results when users search for keywords like **SFI Dakshina Kannada**, **SFI Mangaluru**, or **SFI DK**.

---

## Step 1: Verify and Update Your Domain Name
Currently, the templates use a placeholder domain `https://www.sfidk.org`. If you deploy the site to a different domain name (for example, `https://sfidk.netlify.app` or a custom domain like `https://sfidakshinahannada.org`), you must update the URLs in three files:
1. **[sitemap.xml](file:///c:/Users/USER/OneDrive/Desktop/DK/sitemap.xml)**: Update the `<loc>` tags with your domain.
2. **[robots.txt](file:///c:/Users/USER/OneDrive/Desktop/DK/robots.txt)**: Update the `Sitemap:` directive link at the bottom.
3. **[index.html](file:///c:/Users/USER/OneDrive/Desktop/DK/index.html)**: Search for the `"url"` and `"logo"` keys in the JSON-LD schema block near line 45-60, and replace `https://www.sfidk.org` with your live domain name.

---

## Step 2: Register on Google Search Console
1. Visit the **[Google Search Console Portal](https://search.google.com/search-console)**.
2. Log in with your SFI unit or personal Google account.
3. Click the property dropdown in the top-left corner and select **Add Property**.
4. Choose the **URL Prefix** option, type in your live site URL (e.g. `https://www.sfidk.org/`), and click **Continue**.

---

## Step 3: Verify Domain Ownership
Google requires proof of ownership to collect search analytics for the site.
1. In the verification options modal, select **HTML Tag** (highly recommended).
2. Copy the meta tag provided by Google. It will look like this:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN_HERE" />
   ```
3. Open **[index.html](file:///c:/Users/USER/OneDrive/Desktop/DK/index.html)**, find the `<head>` element, and paste this meta tag on a new line right below `<title>`.
4. Deploy the updated `index.html` to your hosting provider.
5. Go back to Google Search Console and click the **Verify** button.

---

## Step 4: Submit Your XML Sitemap
Submitting a sitemap prompts Googlebot to scan and index all pages immediately.
1. Open Google Search Console.
2. In the left navigation menu, click on **Sitemaps** (under the "Indexing" section).
3. Under **Add a new sitemap**, type in:
   ```txt
   sitemap.xml
   ```
4. Click **Submit**. Google will crawl the sitemap, verify the links, and display a "Success" status.

---

## Step 5: Request Instant Indexing (Optional)
If you want a specific page to appear in search results immediately:
1. Copy the URL (e.g. `https://www.sfidk.org/`).
2. Paste it into the search box at the top of Google Search Console ("Inspect any URL").
3. If it says "URL is not on Google", click **Request Indexing**. Googlebot will queue the page and index it within 24-48 hours.

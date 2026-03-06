const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;

async function fetchAllegro(url, saveHtml = false) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    });

    try {
        const page = await browser.newPage();

        // Stealth mode - hide automation
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
            Object.defineProperty(navigator, 'languages', { get: () => ['pl-PL', 'pl', 'en-US', 'en'] });
            window.chrome = { runtime: {} };
        });

        // Set realistic viewport and user agent
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Set extra headers
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Upgrade-Insecure-Requests': '1'
        });

        console.log(`Fetching: ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait a bit for dynamic content
        await page.waitForTimeout(3000);

        // Try to wait for specific selectors
        await Promise.race([
            page.waitForSelector('h1', { timeout: 5000 }),
            page.waitForSelector('[data-box-name="allegro.listing.title"]', { timeout: 5000 }),
            page.waitForTimeout(5000)
        ]).catch(() => { });

        const html = await page.content();

        // Save HTML for debugging if requested
        if (saveHtml) {
            const filename = `scripts/debug-${Date.now()}.html`;
            await fs.writeFile(filename, html);
            console.log(`  Debug HTML saved to ${filename}`);
        }

        return html;
    } finally {
        await browser.close();
    }
}

function extractProductData(html, url) {
    const $ = cheerio.load(html);

    const data = {
        url,
        title: '',
        price: '',
        originalPrice: '',
        description: '',
        images: [],
        features: [],
        weight: '',
        seller: '',
        rawHtmlLength: html.length
    };

    // Multiple selectors for title
    data.title = $('h1').first().text().trim() ||
        $('[data-box-name="allegro.listing.title"]').text().trim() ||
        $('[itemprop="name"]').text().trim() ||
        $('meta[property="og:title"]').attr('content') ||
        $('title').text().trim() || '';

    // Multiple selectors for price
    data.price = $('[data-box-name="Price"] [data-price]').attr('data-price') ||
        $('[itemprop="price"]').attr('content') ||
        $('meta[property="product:price:amount"]').attr('content') ||
        $('[data-role="price"]').text().trim() || '';

    // Extract all images
    const imageSelectors = [
        'img[src*="allegro"]',
        '[data-box-name="gallery"] img',
        '[itemprop="image"]',
        'meta[property="og:image"]'
    ];

    imageSelectors.forEach(selector => {
        $(selector).each((i, el) => {
            const src = $(el).attr('src') || $(el).attr('content');
            if (src && src.includes('allegro') && !src.includes('logo') && !src.includes('icon') && !data.images.includes(src)) {
                data.images.push(src);
            }
        });
    });

    // Extract description
    data.description = $('[data-box-name="Description"]').text().trim() ||
        $('[itemprop="description"]').text().trim() ||
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') || '';

    // Extract weight/size from title or URL
    const weightMatch = (data.title + ' ' + url).match(/(\d+\s*g|\d+\s*ml)/i);
    if (weightMatch) {
        data.weight = weightMatch[0];
    }

    // Check if page is blocked
    const bodyText = $('body').text().toLowerCase();
    if (bodyText.includes('captcha') || bodyText.includes('enable js') || bodyText.includes('ad blocker')) {
        data.blocked = true;
        data.blockReason = 'CAPTCHA or bot detection detected';
    }

    return data;
}

const urls = process.argv.slice(2);
const saveDebugHtml = process.env.DEBUG === 'true';

if (urls.length === 0) {
    console.error('Usage: node fetch-allegro.js <url1> [url2] ...');
    console.error('Set DEBUG=true to save HTML files for debugging');
    process.exit(1);
}

(async () => {
    const results = [];

    for (const url of urls) {
        try {
            const html = await fetchAllegro(url, saveDebugHtml);
            const productData = extractProductData(html, url);
            results.push(productData);

            console.log(`\n✓ Extracted: ${productData.title || '(no title)'}`);
            console.log(`  Price: ${productData.price || '(no price)'}`);
            console.log(`  Images: ${productData.images.length}`);
            console.log(`  HTML size: ${productData.rawHtmlLength} bytes`);
            if (productData.blocked) {
                console.log(`  ⚠️  ${productData.blockReason}`);
            }
        } catch (error) {
            console.error(`✗ Error fetching ${url}:`, error.message);
            results.push({ url, error: error.message });
        }
    }

    // Save results to JSON file
    const outputFile = 'scripts/allegro-products.json';
    await fs.writeFile(outputFile, JSON.stringify(results, null, 2));
    console.log(`\n✓ Results saved to ${outputFile}`);

    process.exit(0);
})();

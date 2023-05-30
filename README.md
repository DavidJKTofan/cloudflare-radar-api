## Cloudflare Workers for Cloudflare RADAR API

Cloudflare Workers which uses the Cloudflare API to fetch data from multiple Cloudflare RADAR endpoints and returns the results as JSON.

Alternative GeoJSON Output: https://github.com/DavidJKTofan/cloudflare-radar-api-geojson

### Get Started

- Replace the `YOUR_ACCOUNT_ID` with your Cloudflare Account ID in the `wrangler.toml` file.

- Replace `'YOUR_API_TOKEN'` with your actual Cloudflare API token in the `worker.js` file.

- Replace `'YOUR_AUTH_EMAIL'` with your Cloudflare account email in the `worker.js` file.

### Endpoints

This project fetches data from the following [Cloudflare API endpoints](https://developers.cloudflare.com/api/):

- `attacks/layer7/summary`: Provides a summary of Layer 7 attacks.

- `attacks/layer7/top/locations/origin`: Lists the top locations of Layer 7 attacks by origin.

- `http/summary/bot_class`: Provides a summary of HTTP requests by bot class.

- `http/summary/device_type`: Provides a summary of HTTP requests by device type.

- `http/summary/http_version`: Provides a summary of HTTP requests by HTTP version.

Each endpoint is fetched individually, and the responses are combined and returned as a JSON object.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

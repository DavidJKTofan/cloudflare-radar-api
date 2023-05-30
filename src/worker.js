addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	// Replace with your Cloudflare API credentials
	const apiToken = 'YOUR_API_TOKEN'
	const authEmail = 'YOUR_AUTH_EMAIL'
  
	// Parameters
	const dateRange = '7d'  // last 7 days
	const location = 'DE'   // Germany
	const format = 'json'   // JSON format
  
	// Create an array of API endpoints
	// You can add more endpoints from https://developers.cloudflare.com/api/
	const endpoints = [
	  {
		// Get a summary of layer 7 attacks
		name: 'layer7Summary',
		url: 'attacks/layer7/summary'
	  },
	  {
		// Get layer 7 top origin locations
		name: 'layer7OriginLocations',
		url: 'attacks/layer7/top/locations/origin'
	  },
	  {
		// Get Internet traffic distribution by Bots vs Humans
		name: 'botClassSummary',
		url: 'http/summary/bot_class'
	  },
	  {
		// Get Internet traffic distribution by device type
		name: 'deviceTypeSummary',
		url: 'http/summary/device_type'
	  },
	  {
		// Get a summary of HTTP versions
		name: 'httpVersionSummary',
		url: 'http/summary/http_version'
	  }
	]
  
	// Object to store the responses for each endpoint
	const responses = {}
  
	// Fetch data from each endpoint and store the responses
	for (const endpoint of endpoints) {
	  const params = {
		dateRange,
		location,
		format
	  }
	  const apiUrl = `https://api.cloudflare.com/client/v4/radar/${endpoint.url}?${getQueryString(params)}`
	  const response = await fetch(apiUrl, {
		headers: {
		  'Authorization': `Bearer ${apiToken}`,
		  'Content-Type': 'application/json',
		  'X-Auth-Email': authEmail
		}
	  })
	  const data = await response.json()
	  responses[endpoint.name] = data
	}
  
	// Return the responses as separate JSON variables
	const layer7SummaryJSON = JSON.stringify(responses.layer7Summary, null, 2)
	const layer7OriginLocationsJSON = JSON.stringify(responses.layer7OriginLocations, null, 2)
	const botClassSummaryJSON = JSON.stringify(responses.botClassSummary, null, 2)
	const deviceTypeSummaryJSON = JSON.stringify(responses.deviceTypeSummary, null, 2)
	const httpVersionSummaryJSON = JSON.stringify(responses.httpVersionSummary, null, 2)
  
	// Construct the combined response object
	const combinedResponse = {
	  layer7Summary: JSON.parse(layer7SummaryJSON),
	  layer7OriginLocations: JSON.parse(layer7OriginLocationsJSON),
	  botClassSummary: JSON.parse(botClassSummaryJSON),
	  deviceTypeSummary: JSON.parse(deviceTypeSummaryJSON),
	  httpVersionSummary: JSON.parse(httpVersionSummaryJSON)
	}
  
	// Return the combined response object as JSON
	return new Response(JSON.stringify(combinedResponse, null, 2), {
	  headers: { 'Content-Type': 'application/json' }
	})
  }
  
  function getQueryString(params) {
	return Object.keys(params)
	  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
	  .join('&')
  }
  
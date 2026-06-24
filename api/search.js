export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
 
  const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;
  const { q, country, reverse, lat, lon } = req.query;
 
  let url;
  if (reverse) {
    url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_KEY}&lang=en`;
  } else {
    if (!q) return res.status(400).json({ error: 'Missing query' });
    const filter = country ? `&filter=countrycode:${country}` : '';
    url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}&apiKey=${GEOAPIFY_KEY}&limit=7${filter}`;
  }
 
  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'Search failed' });
  }
}

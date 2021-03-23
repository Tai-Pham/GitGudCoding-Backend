// FRONT END LOOK HERE
// const searchRequest = require("./../../models/youtube");

var { google } = require("googleapis");

const client = google.youtube({
  version: "v3",
  auth: config.utube.apikey,
});

/**
 * @param searchRequest
 */
utubeSearch = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var numResults = req.resultsSize || 10;
    const results = await client.search.list({
      part: "snippet",
      type: "video",
      maxResults: numResults,
      order: "relevance",
      q: req.query,
    });
    res.status(200).json(results.data.items);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  utubeSearch,
};

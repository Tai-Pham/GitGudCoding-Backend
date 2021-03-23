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
    var numResults = req.resultsSize || 10;
    const results = await client.search.list({
      part: "snippet",
      type: "video",
      maxResults: numResults,
      order: "relevance",
      q: req.query,
    });
    let ids = [];
    for (i = 0; i < response.result.items.length; i++) {
      ids[i] = results.data.items[i].id.videoId;
    }
    res.status(200).json(ids);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  utubeSearch,
};

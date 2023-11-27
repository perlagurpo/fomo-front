const baseURL = process.env.TEST_URL;

export default {
    async getBanners() {
      var url = "http://localhost:8000/banner/";
      var rawResponse, content = null;
      try {
        rawResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        content = await rawResponse.json();
      } catch (err) {
        content = [];
      }

      return content;
    }
}
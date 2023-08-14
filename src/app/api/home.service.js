export default {
  async getCarouselData() {
    var url = 'http://18.231.76.133/carousel/';
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    const content = await rawResponse.json();
    return content;
  },
}
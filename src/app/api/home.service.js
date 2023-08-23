const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default {
  async getCarouselData() {
    var url = baseURL + 'carousel/';
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
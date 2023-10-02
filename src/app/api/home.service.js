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

  /**
   * Realiza la petición de los eventos destacados al backend
   * @returns json o null en caso de error
   */
  async getHighlightedEvents() {
    const url = baseURL + 'event/?highlighted';
    var content = null;
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    try {
      content = await rawResponse.json();
    } catch(err) {
      content = null
    }

    return content;
  }
}
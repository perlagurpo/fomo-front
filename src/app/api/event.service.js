const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

/**
   * Retorna un todos los eventos traídos del endpoint.
   * En caso de error retorna null.
   * @param {string} data 
   * @returns {json}
   */
export default {
  async getEvents(data) {
    var url = baseURL + "event/";
    if(data) {
      url = url + "?" + data;
    }
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
      if (content.detail == "Página inválida.") {
        if (url.includes("page=")) {
          // Replace the "page=" parameter with "page=1"
          url = url.replace(/page=\d+/, "page=1");
        } else {
          // If there is no "page=" parameter, add it to the URL
          url = url + (url.includes("?") ? "&" : "?") + "page=1";
        }
        rawResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        content = await rawResponse.json();
      }
    } catch (err) {
      content = [];
    }
    return content;
  },

  /**
   * Retorna un evento específico traído del endpoint.
   * En caso de error retorna null.
   * @param {number} id 
   * @returns {json}
   */
  async getEventById(id) {
    const url = baseURL + "event/" + id;
    var rawResponse, content = null;
    try {
      rawResponse = await fetch( url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      content = await rawResponse.json();
    } catch(err) {
      content = []
    }
    return content;
  },

  /**
   * Retorna un evento específico consultado por el slug
   * En caso de error retorna null.
   * @param {number} slug 
   * @returns {json}
   */
  async getEventBySlug(slug) {
    const url = baseURL + "event/" + slug;
    var rawResponse, content = null;
    try {
      rawResponse = await fetch( url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      content = await rawResponse.json();
      console.log(content);
    } catch(err) {
      content = [];
    }
    return content;
  },

  /**
   * Retorna un json con las categorías obtenidas del endpoint.
   * En caso de error, retorna null o undefined.
   * @returns {json}
   */
  async getCategories() {
    const url = baseURL + "category/";
    var rawResponse, categories = null;
    try {
      rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      categories = await rawResponse.json();
    } catch(err) {
      categories = [];
    }
    return categories;
  }
}
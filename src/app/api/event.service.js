/**
   * Retorna un todos los eventos traídos del endpoint.
   * En caso de error retorna null.
   * @param {string} data 
   * @returns {json}
   */
export default {
  async getEvents(data) {
    var url = "http://18.231.76.133/event/";
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
    } catch(err) {
      alert(err);
    }
    return content;
  },

  /**
   * Retorna un evento específico traído del endpoint.
   * En caso de error retorna null.
   * @param {number} id 
   * @returns {json}
   */
  async getEvent(id) {
    const url = "http://18.231.76.133/event/" + id;
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
      alert(err);
    }
    return content;
  },

  /**
   * Retorna un json con las categorías obtenidas del endpoint.
   * En caso de error, retorna null o undefined.
   * @returns {json}
   */
  async getCategories() {
    const url = "http://18.231.76.133/category/";
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
      alert(err);
    }
    return categories;
  }

}
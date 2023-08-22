// Agregamos manejadores de excepciones en las respuestas?

export default {
  async getEvents(data) {
    var url;
    if(data) {
      url = ' http://18.231.76.133/event/?' + data;
    } else {
      url = 'http://18.231.76.133/event/';
    }
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

  async getEvent(id) {
    const url = "http://18.231.76.133/event/" + id;
    const rawResponse = await fetch( url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );
    const content = await rawResponse.json();
    return content;
  },

  async getCategories() {
    const url = "http://18.231.76.133/category";
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const categories = await rawResponse.json();
    console.log(categories);
    return categories;
  }

}
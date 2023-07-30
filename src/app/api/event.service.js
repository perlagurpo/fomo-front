export default {
  async getEvents(data) {
    console.log(data);
    var url;
    if(data) {
      url = ' http://18.231.76.133/event/event/' + data
    } else {
      url = 'http://18.231.76.133/event/event/'
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
  }
}
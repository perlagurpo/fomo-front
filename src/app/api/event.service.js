export default {
  async getEvents(data) {
    if(data) {
      const url = 'https://d78f-190-191-120-247.ngrok-free.app/event/event/?event_name=' + data
    } else {
      const url = 'https://d78f-190-191-120-247.ngrok-free.app/event/event/'
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
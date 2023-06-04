export default {
  async getEvents() {
    const response = await fetch('https://b1c4-2803-9800-9991-7d3e-c255-c7da-6f60-9484.ngrok-free.app/event/event/');
    const data = await response.json();
    return data;
  }
};
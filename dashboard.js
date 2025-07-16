function updateTime() {
  const now = new Date();
  document.getElementById('clock').innerText = `Time: ${now.toLocaleTimeString()} - ${now.toLocaleDateString()}`;
}
setInterval(updateTime, 1000);
updateTime();

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Riga,LV&units=metric&appid=YOUR_API_KEY`);
    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    document.getElementById('weather').innerText = `Weather in ${data.name}: ${temp}°C, ${desc}`;
  } catch (error) {
    document.getElementById('weather').innerText = `Error loading weather 😞`;
    console.error(error);
  }
}
getWeather();

async function getTasks() {
  const today = new Date().toISOString().split("T")[0];

  try {
    const res = await fetch("YOUR_PUBLISHED_CSV_URL");
    const csvText = await res.text();
    const rows = csvText.split('\n').slice(1); // skip header

    const todayTasks = rows
      .map(row => row.split(','))
      .filter(([date]) => date === today)
      .map(([, task]) => task.trim());

    const el = document.getElementById('tasks');
    el.innerHTML = todayTasks.length
      ? `<strong>Today’s Tasks:</strong><ul>${todayTasks.map(t => `<li>${t}</li>`).join('')}</ul>`
      : `No tasks for today! 🎉`;
  } catch (error) {
    console.error("Task fetch failed:", error);
    document.getElementById('tasks').innerText = "Error loading tasks.";
  }
}
getTasks();


// ==================================
// EL TRANO — TACTICAL SYSTEM 2.0
// ==================================

const $ = id => document.getElementById(id);

// LIVE CLOCK
function updateClock() {
  const time = new Date().toLocaleTimeString("en-IN");
  $("clock").textContent = time;
  $("etraClock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

// MOBILE NAVIGATION
$("menuBtn").addEventListener("click", () => {
  $("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    $("nav").classList.remove("open");
  });
});

// ETRA AI DEMO
let commandCount = 0;

function etraReply(message) {
  const text = message.toLowerCase();

  if (text.includes("hello") || text.includes("hi")) {
    return "Greetings, team member. ETRA systems are ready.";
  }

  if (text.includes("team")) {
    return "EL TRANO personnel network is active. Teamwork is our strength.";
  }

  if (text.includes("project")) {
    return "Project database is available. Visit the Projects section.";
  }

  if (text.includes("time")) {
    return "Current local time: " + new Date().toLocaleTimeString("en-IN");
  }

  if (text.includes("help")) {
    return "Available commands: hello, team, projects, time, help.";
  }

  if (text.includes("status")) {
    return "System status: ONLINE — FRONTEND DEMO.";
  }

  return "Command received. Full AI integration is planned for a future update.";
}

function sendCommand() {
  const input = $("etraInput");
  const message = input.value.trim();

  if (!message) return;

  const chat = $("etraChat");

  const you = document.createElement("p");
  you.innerHTML = "<b>YOU:</b> ";
  you.appendChild(document.createTextNode(message));

  const reply = document.createElement("p");
  reply.innerHTML = "<b>ETRA:</b> ";
  reply.appendChild(document.createTextNode(etraReply(message)));

  chat.append(you, reply);

  const historyItem = document.createElement("li");
  historyItem.textContent = message;
  $("commandHistory").prepend(historyItem);

  commandCount++;
  $("totalCommands").textContent = commandCount;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

$("sendBtn").addEventListener("click", sendCommand);

$("etraInput").addEventListener("keydown", event => {
  if (event.key === "Enter") sendCommand();
});

// CLEAR CHAT
$("clearChat").addEventListener("click", () => {
  $("etraChat").innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "ETRA: Terminal cleared. Awaiting commands.";
  $("etraChat").appendChild(p);
});

// CLEAR COMMAND HISTORY
$("clearHistory").addEventListener("click", () => {
  $("commandHistory").innerHTML = "";
  const li = document.createElement("li");
  li.textContent = "System initialized";
  $("commandHistory").appendChild(li);

  commandCount = 0;
  $("totalCommands").textContent = "0";
});

// NOTICE BOARD
$("addNotice").addEventListener("click", () => {
  const title = $("noticeTitle").value.trim();
  const message = $("noticeText").value.trim();

  if (!title || !message) {
    alert("Enter a notice title and message.");
    return;
  }

  const article = document.createElement("article");
  article.className = "notice";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = message;

  const date = document.createElement("small");
  date.textContent = "PUBLISHED: " + new Date().toLocaleDateString("en-IN");

  article.append(heading, paragraph, date);
  $("noticeList").prepend(article);

  $("noticeTitle").value = "";
  $("noticeText").value = "";
});

// TASK MANAGER
function updateTaskCount() {
  const tasks = $("taskList").querySelectorAll("li:not(.empty)");
  $("taskCount").textContent = tasks.length;
}

$("addTask").addEventListener("click", () => {
  const input = $("taskInput");
  const value = input.value.trim();

  if (!value) return;

  const empty = $("taskList").querySelector(".empty");
  if (empty) empty.remove();

  const item = document.createElement("li");

  const label = document.createElement("span");
  label.textContent = value + " ";

  const done = document.createElement("button");
  done.textContent = "DONE";
  done.className = "secondary";

  done.addEventListener("click", () => {
    label.style.textDecoration =
      label.style.textDecoration === "line-through" ? "none" : "line-through";
  });

  const remove = document.createElement("button");
  remove.textContent = "DELETE";
  remove.className = "secondary";

  remove.addEventListener("click", () => {
    item.remove();

    if (!$("taskList").children.length) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "empty";
      emptyItem.textContent = "No tasks added yet.";
      $("taskList").appendChild(emptyItem);
    }

    updateTaskCount();
  });

  item.append(label, done, document.createTextNode(" "), remove);
  $("taskList").appendChild(item);

  input.value = "";
  updateTaskCount();
});

$("taskInput").addEventListener("keydown", event => {
  if (event.key === "Enter") $("addTask").click();
});

// EVENT MANAGER
$("addEvent").addEventListener("click", () => {
  const name = $("eventName").value.trim();
  const date = $("eventDate").value;

  if (!name || !date) {
    alert("Enter an event name and date.");
    return;
  }

  const article = document.createElement("article");
  article.className = "panel";

  const heading = document.createElement("h3");
  heading.textContent = name;

  const paragraph = document.createElement("p");
  paragraph.textContent = "DATE: " + date;

  const status = document.createElement("span");
  status.className = "status";
  status.textContent = "PLANNED";

  article.append(heading, paragraph, status);
  $("eventList").prepend(article);

  $("eventName").value = "";
  $("eventDate").value = "";
});

// FILE SELECTION
$("fileInput").addEventListener("change", () => {
  const file = $("fileInput").files[0];

  $("fileName").textContent = file
    ? "SELECTED FILE: " + file.name
    : "NO FILE SELECTED.";
});

// NETWORK SEARCH
function searchSite() {
  const query = $("siteSearch").value.trim().toLowerCase();
  const results = $("searchResults");

  results.innerHTML = "";

  if (!query) {
    results.textContent = "ENTER A SEARCH TERM.";
    return;
  }

  let found = 0;

  document.querySelectorAll("main section").forEach(section => {
    const heading = section.querySelector("h2");
    const content = (heading ? heading.textContent : "") + " " + section.textContent;

    if (content.toLowerCase().includes(query)) {
      const link = document.createElement("a");
      link.href = "#" + section.id;
      link.textContent = "OPEN: " + (heading ? heading.textContent : section.id);

      results.appendChild(link);
      found++;
    }
  });

  if (!found) {
    results.textContent = "NO MATCHING SECTION FOUND.";
  }
}

$("searchBtn").addEventListener("click", searchSite);

$("siteSearch").addEventListener("keydown", event => {
  if (event.key === "Enter") searchSite();
});

// DEMO MEMBER ACCESS
$("loginBtn").addEventListener("click", () => {
  const id = $("memberId").value.trim();
  const password = $("memberPassword").value;

  if (!id || !password) {
    $("loginMessage").textContent = "ENTER MEMBER ID AND PASSWORD.";
    return;
  }

  $("loginMessage").textContent =
    "DEMO ACCESS ACKNOWLEDGED FOR " + id +
    ". REAL AUTHENTICATION IS NOT CONNECTED.";
});

// SETTINGS
$("compactToggle").addEventListener("change", event => {
  document.body.classList.toggle("compact", event.target.checked);
});

$("soundToggle").addEventListener("change", event => {
  alert(event.target.checked
    ? "SOUND PREFERENCE ENABLED FOR FUTURE DEVELOPMENT."
    : "SOUND PREFERENCE DISABLED.");
});

$("resetSettings").addEventListener("click", () => {
  $("compactToggle").checked = false;
  $("soundToggle").checked = false;
  document.body.classList.remove("compact");
});

// ADMIN PANEL
$("adminStatus").addEventListener("click", () => {
  $("adminMessage").textContent =
    "DIAGNOSTICS COMPLETE: EL TRANO FRONTEND IS RUNNING. BACKEND NOT CONNECTED.";
});

// INITIAL DASHBOARD
$("memberCount").textContent = "3";
$("projectCount").textContent = "2";

console.log("EL TRANO TACTICAL COMMAND CENTER 2.0 INITIALIZED");

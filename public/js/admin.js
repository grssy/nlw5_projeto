const socket = io();
let connectionsUsers = [];

socket.on("admin_list_all_users", connections => {
  connectionsUsers = connections;
  document.getElementById("list_users").innerHTML = "";

  let template = document.getElementById("template").innerHTML;

  connections.forEach(connection => {

    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    })

    document.getElementById("list_users").innerHTML += rendered;

  })
});

function call(id) {

  const connection = connectionsUsers.find(connection => connection.socket_id == id);

  const template = document.getElementById("admin_template").innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user.id
  })

  document.getElementById("supports").innerHTML += rendered;

  const params = {
    user_id: connection.user.id

  }

  socket.emit("admin_list_messages_by_user", params, messages => {
     
    const divMessages = document.getElementById(`allMessages${connection.user.id}`);

    messages.forEach(message => {
      const createDiv = document.createElement("div");

      if(message.admin_id == null){
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `Cliente:`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_data">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      }else{
        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Atendente:`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_data">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;

      }

      
      divMessages.appendChild(createDiv);
    });

  });
}

function sendMessage(id) {
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    user_id: id
  }

  socket.emit("admin_send_message", params);

  const div = document.getElementById(`allMessages${id}`);
  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_admin";

  createDiv.innerHTML = `Atendente:`;
  createDiv.innerHTML += `<span>${params.text}</span>`;
  createDiv.innerHTML += `<span class="admin_data">${dayjs().format("DD/MM/YYYY HH:mm:ss")}</span>`;

  div.appendChild(createDiv);

  text.value = "";
}

socket.on("admin_receive_message", (data) => {
  const connection = connectionsUsers.find(connection => connection.socket_id == data.socket_id);
  const divMessages = document.getElementById(`allMessages${connection.user_id}`);
  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_client";

  createDiv.innerHTML = `Cliente:`;
  createDiv.innerHTML += `<span>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_data">${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
  divMessages.appendChild(createDiv);
});
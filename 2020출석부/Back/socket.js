const socketIO = require('socket.io');
const { Teacher, Chat } = require('./models');

module.exports = async (server, app) => {
  const io = socketIO(server, { path: '/socket.io' });
  app.set('io', io);
  io.origins('*:*');
  const chat = io.of('/chat');
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스 접속');
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });

    socket.on('newChat', async (content, user) => {
      const teacher = await Teacher.findOne({ where: { name: user.name } });
      const chat = await Chat.create({
        content,
        floor: user.floor,
        teacherId: teacher.id
      });
      const newChat = await Chat.findOne({
        where: { id: chat.id },
        include: [{ model: Teacher, required: true }]
      });
      io.emit('newChat', newChat);
    });
  });
}
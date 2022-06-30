// Database Buffer
const users=[];

// Join user to chat
function userJoin(id,username,room){
    const user={id,username,room};
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(obj=> obj.id === id);
}

function userLeave(id){
    const index=users.findIndex(obj=>obj.id===id);

    if(index!=-1) return users.pop(index);
}

function getroomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getroomUsers,
    userLeave
}
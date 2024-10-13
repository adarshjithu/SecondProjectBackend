import { Server, Socket } from "socket.io";

export const createSocketConnectionForVideo = (io: Server, socket: Socket, usersOnline: { [key: string]: string }) => {
    // Define payloads
    interface IceCandidatePayload {
        roomId: string;
        candidate: RTCIceCandidate;
    }

    interface OfferPayload {
        roomId: string;
        offer: RTCSessionDescriptionInit;
    }

    interface AnswerPayload {
        roomId: string;
        answer: RTCSessionDescriptionInit;
    }

    interface IncomingVideoCallPayload {
        receiverId: string;
    }

    interface CallAcceptedPayload {
        receiverId: string;
    }

    // Join room event
    socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room: ${roomId}`);
    });

    // Listen for offer
    socket.on("offer", ({ roomId, offer }: OfferPayload) => {
        socket.to(roomId).emit("offer", offer);
    });

    // Listen for answer
    socket.on("answer", ({ roomId, answer }: AnswerPayload) => {
        socket.to(roomId).emit("answer", answer);
    });

    // Listen for ICE candidates
    socket.on("ice-candidate", ({ roomId, candidate }: IceCandidatePayload) => {
        socket.to(roomId).emit("ice-candidate", candidate);
    });

    // Listen for incoming video call
    socket.on("incoming-video-call", (data: IncomingVideoCallPayload) => {
        const receiverSocketId = usersOnline[data.receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incoming-video-call", data);
        }
    });

    // Listen for call accepted
    socket.on("call-accepted", (data: CallAcceptedPayload) => {
        const receiverSocketId = usersOnline[data.receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("call-accepted");
        }
    });


    // Mute video
    socket.on("mute-video", (data) => {
        io.to(usersOnline[data.receiverId]).emit("mute-video");
    });

    // Unmute video
    socket.on("unmute-video", (data) => {
        io.to(usersOnline[data.receiverId]).emit("unmute-video");
    });
    // End video call
    socket.on('end-call',(data:{receiverId:string})=>{
        io.to(usersOnline[data.receiverId]).emit('end-call')
    })

};

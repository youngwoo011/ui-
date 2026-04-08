import { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip, Phone, Video, MoreVertical } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export function Chat() {
  const [selectedRoom, setSelectedRoom] = useState<number>(1);
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: 1,
      name: "김민수",
      lastMessage: "프로젝트 진행 상황 공유드립니다",
      timestamp: "5분 전",
      unread: 2,
      avatar: "김",
      online: true,
    },
    {
      id: 2,
      name: "개발팀",
      lastMessage: "회의 일정 조율 부탁드립니다",
      timestamp: "30분 전",
      unread: 0,
      avatar: "개",
      online: false,
    },
    {
      id: 3,
      name: "이지은",
      lastMessage: "네, 확인했습니다!",
      timestamp: "1시간 전",
      unread: 0,
      avatar: "이",
      online: true,
    },
    {
      id: 4,
      name: "마케팅팀",
      lastMessage: "Q2 계획안 검토 부탁드립니다",
      timestamp: "2시간 전",
      unread: 5,
      avatar: "마",
      online: false,
    },
  ];

  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        sender: "김민수",
        content: "안녕하세요! 프로젝트 관련해서 문의드릴 게 있습니다.",
        timestamp: "오전 10:30",
        isMe: false,
      },
      {
        id: 2,
        sender: "나",
        content: "네, 말씀하세요!",
        timestamp: "오전 10:32",
        isMe: true,
      },
      {
        id: 3,
        sender: "김민수",
        content: "이번 주 금요일까지 완료 가능할까요?",
        timestamp: "오전 10:33",
        isMe: false,
      },
      {
        id: 4,
        sender: "나",
        content: "네, 가능합니다. 일정 맞춰서 진행하겠습니다.",
        timestamp: "오전 10:35",
        isMe: true,
      },
      {
        id: 5,
        sender: "김민수",
        content: "감사합니다! 진행 상황 공유드립니다",
        timestamp: "오전 10:37",
        isMe: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "박철수",
        content: "다들 이번 주 회의 일정 괜찮으신가요?",
        timestamp: "오후 2:00",
        isMe: false,
      },
    ],
  };

  const currentRoom = chatRooms.find((room) => room.id === selectedRoom);
  const currentMessages = messages[selectedRoom] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedRoom, currentMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // API call would go here: POST /api/chat/messages
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <div className="h-full max-w-7xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">채팅</h2>
          <p className="text-gray-600">팀원들과 실시간으로 소통하세요</p>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[calc(100%-5rem)]">
          {/* Chat Room List */}
          <Card className="col-span-12 md:col-span-4">
            <ScrollArea className="h-full">
              <div className="p-3">
                <Input
                  type="text"
                  placeholder="대화 검색..."
                  className="mb-3"
                />
                <div className="space-y-1">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedRoom === room.id
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                            {room.avatar}
                          </div>
                          {room.online && (
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {room.name}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {room.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">
                              {room.lastMessage}
                            </p>
                            {room.unread > 0 && (
                              <span className="ml-2 size-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                                {room.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Messages */}
          <Card className="col-span-12 md:col-span-8 flex flex-col">
            {currentRoom && (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {currentRoom.avatar}
                      </div>
                      {currentRoom.online && (
                        <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {currentRoom.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {currentRoom.online ? "온라인" : "오프라인"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="size-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="size-5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="size-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {currentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            msg.isMe ? "order-2" : "order-1"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${
                              msg.isMe
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-1">
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="sm">
                      <Paperclip className="size-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <Smile className="size-5" />
                    </Button>
                    <Input
                      type="text"
                      placeholder="메시지를 입력하세요..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="size-5" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

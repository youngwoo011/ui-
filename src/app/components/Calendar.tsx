import { useState } from "react";
import { Calendar as CalendarComp } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Plus, Users, Building } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "회사" | "개인" | "휴가" | "회의";
  description?: string;
  color: string;
}

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showDialog, setShowDialog] = useState(false);

  const events: Event[] = [
    {
      id: 1,
      title: "전체 회의",
      date: new Date(2026, 3, 10),
      type: "회사",
      description: "2026년 1분기 실적 발표",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "팀 워크샵",
      date: new Date(2026, 3, 15),
      type: "회사",
      description: "개발팀 팀빌딩 워크샵",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "김민수 휴가",
      date: new Date(2026, 3, 12),
      type: "휴가",
      color: "bg-orange-500",
    },
    {
      id: 4,
      title: "프로젝트 회의",
      date: new Date(2026, 3, 8),
      type: "회의",
      description: "신규 프로젝트 킥오프",
      color: "bg-green-500",
    },
    {
      id: 5,
      title: "개인 일정",
      date: new Date(2026, 3, 20),
      type: "개인",
      description: "병원 예약",
      color: "bg-purple-500",
    },
  ];

  const selectedDateEvents = events.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );

  const upcomingEvents = events
    .filter((event) => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const getEventTypeBadge = (type: Event["type"]) => {
    const configs = {
      "회사": { bg: "bg-blue-100", text: "text-blue-700", icon: Building },
      "개인": { bg: "bg-purple-100", text: "text-purple-700", icon: Users },
      "휴가": { bg: "bg-orange-100", text: "text-orange-700", icon: Users },
      "회의": { bg: "bg-green-100", text: "text-green-700", icon: Users },
    };
    const config = configs[type];
    const Icon = config.icon;
    return (
      <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>
        <Icon className="size-3 mr-1" />
        {type}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">캘린더</h2>
          <p className="text-gray-600">사내 일정과 개인 일정을 관리하세요</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="size-5 mr-2" />
              일정 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 일정 추가</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">일정 제목</Label>
                <Input id="title" placeholder="일정 제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">일정 유형</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="유형 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="company">회사</SelectItem>
                    <SelectItem value="personal">개인</SelectItem>
                    <SelectItem value="meeting">회의</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">날짜</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea id="description" placeholder="일정 설명 (선택사항)" rows={3} />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  추가하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                >
                  취소
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <CalendarComp
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-0 w-full"
              />
            </CardContent>
          </Card>

          {/* Selected Date Events */}
          {selectedDateEvents.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {date?.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  의 일정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        {getEventTypeBadge(event.type)}
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">다가오는 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border-l-4 rounded-r-lg hover:bg-gray-50 transition-colors"
                    style={{ borderColor: event.color.replace("bg-", "#") }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      {event.date.toLocaleDateString("ko-KR", {
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {getEventTypeBadge(event.type)}
                    {event.description && (
                      <p className="text-xs text-gray-600 mt-2">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">이번 달 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">전체 일정</span>
                  <span className="font-semibold text-gray-900">{events.length}건</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">회사 행사</span>
                  <span className="font-semibold text-gray-900">
                    {events.filter((e) => e.type === "회사").length}건
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">개인 일정</span>
                  <span className="font-semibold text-gray-900">
                    {events.filter((e) => e.type === "개인").length}건
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">예정된 휴가</span>
                  <span className="font-semibold text-gray-900">
                    {events.filter((e) => e.type === "휴가").length}건
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

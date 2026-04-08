import { Users, Calendar, Clock, TrendingUp, Bell, Pin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router";
import { Badge } from "./ui/badge";

export function Dashboard() {
  const stats = [
    {
      title: "전체 직원",
      value: "124명",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/employees",
    },
    {
      title: "금일 휴가자",
      value: "8명",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/vacation",
    },
    {
      title: "대기 중 결재",
      value: "12건",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      link: "/approval",
    },
    {
      title: "이번 달 평가",
      value: "완료",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/evaluation",
    },
  ];

  const quickLinks = [
    { title: "휴가 신청", description: "연차 및 휴가를 신청하세요", link: "/vacation", color: "blue" },
    { title: "업무 검색", description: "문서와 일정을 찾아보세요", link: "/search", color: "green" },
    { title: "조직도", description: "팀 구조를 확인하세요", link: "/org-chart", color: "purple" },
    { title: "커뮤니티", description: "동호회 활동에 참여하세요", link: "/community", color: "orange" },
  ];

  const recentActivities = [
    { id: 1, user: "김민수", action: "휴가 신청", time: "5분 전", detail: "2026-04-15 ~ 2026-04-17" },
    { id: 2, user: "이지은", action: "문서 공유", time: "15분 전", detail: "Q1 마케팅 결과 보고서" },
    { id: 3, user: "박철수", action: "결재 완료", time: "30분 전", detail: "개발팀 장비 구매" },
    { id: 4, user: "정수진", action: "마음의 편지", time: "1시간 전", detail: "감사 메시지 발송" },
    { id: 5, user: "최영호", action: "커뮤니티 등록", time: "2시간 전", detail: "축구 동호회 가입" },
  ];

  const upcomingEvents = [
    { id: 1, title: "전체 회의", date: "2026-04-10", time: "14:00", type: "회의" },
    { id: 2, title: "분기 평가", date: "2026-04-15", time: "09:00", type: "평가" },
    { id: 3, title: "워크샵", date: "2026-04-20", time: "10:00", type: "행사" },
  ];

  const recentNotices = [
    {
      id: 1,
      title: "2026년 2분기 전사 회의 안내",
      date: "2026-04-08",
      isPinned: true,
      isNew: true,
      category: "전체",
    },
    {
      id: 2,
      title: "개발팀 신규 프로젝트 착수 공지",
      date: "2026-04-07",
      isPinned: true,
      isNew: true,
      category: "개발",
    },
    {
      id: 3,
      title: "근무 시간 조정 안내",
      date: "2026-04-05",
      isPinned: false,
      isNew: false,
      category: "인사",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "전체": "bg-gray-100 text-gray-700 hover:bg-gray-100",
      "인사": "bg-blue-100 text-blue-700 hover:bg-blue-100",
      "개발": "bg-green-100 text-green-700 hover:bg-green-100",
      "마케팅": "bg-purple-100 text-purple-700 hover:bg-purple-100",
      "경영": "bg-orange-100 text-orange-700 hover:bg-orange-100",
    };
    return colors[category] || colors["전체"];
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          안녕하세요, 홍길동님 👋
        </h2>
        <p className="text-gray-600">오늘도 좋은 하루 되세요!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                      <Icon className="size-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Notice Section */}
      <div className="mb-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="size-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">최근 공지사항</h3>
              </div>
              <Link to="/notice">
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  전체보기
                  <ArrowRight className="size-4" />
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <Link key={notice.id} to="/notice">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {notice.isPinned && (
                        <Pin className="size-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-gray-900 truncate">
                        {notice.title}
                      </span>
                      {notice.isNew && (
                        <Badge className="bg-red-500 text-white hover:bg-red-500 text-xs flex-shrink-0">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <Badge className={`${getCategoryColor(notice.category)} text-xs`}>
                        {notice.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{notice.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 메뉴</h3>
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="font-medium text-gray-900 mb-1">{link.title}</div>
                    <div className="text-sm text-gray-600">{link.description}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities & Upcoming Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
            <Card>
              <CardContent className="p-0">
                {recentActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`p-4 ${
                      index !== recentActivities.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium flex-shrink-0">
                          {activity.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user}</span>
                            {" · "}
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-600 mt-0.5">{activity.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">다가오는 일정</h3>
            <Card>
              <CardContent className="p-0">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`p-4 ${
                      index !== upcomingEvents.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">{event.title}</div>
                        <div className="text-sm text-gray-600">
                          {event.date} · {event.time}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
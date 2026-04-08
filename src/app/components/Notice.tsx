import { useState } from "react";
import { Bell, Pin, Search as SearchIcon, Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Notice {
  id: number;
  title: string;
  content: string;
  category: "전체" | "인사" | "개발" | "마케팅" | "경영";
  author: string;
  date: string;
  isPinned: boolean;
  views: number;
  isNew: boolean;
}

export function Notice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const notices: Notice[] = [
    {
      id: 1,
      title: "2026년 2분기 전사 회의 안내",
      content: "다음 주 목요일 오후 2시에 전사 회의가 있습니다. 전 직원 참석 부탁드립니다.\n\n일시: 2026년 4월 10일 (목) 14:00\n장소: 본사 대회의실\n내용: 1분기 성과 발표 및 2분기 계획 공유",
      category: "전체",
      author: "인사팀",
      date: "2026-04-08",
      isPinned: true,
      views: 245,
      isNew: true,
    },
    {
      id: 2,
      title: "개발팀 신규 프로젝트 착수 공지",
      content: "모바일 앱 리뉴얼 프로젝트가 시작됩니다.\n\n프로젝트명: 모바일 앱 3.0 리뉴얼\n기간: 2026.04.15 ~ 2026.08.31\n참여 인원: 개발팀 전체\n\n상세 내용은 추후 공유하겠습니다.",
      category: "개발",
      author: "개발팀장",
      date: "2026-04-07",
      isPinned: true,
      views: 189,
      isNew: true,
    },
    {
      id: 3,
      title: "근무 시간 조정 안내",
      content: "하절기(5월~9월) 근무 시간이 조정됩니다.\n\n변경 전: 09:00 ~ 18:00\n변경 후: 08:30 ~ 17:30\n\n5월 1일부터 적용됩니다.",
      category: "인사",
      author: "인사팀",
      date: "2026-04-05",
      isPinned: false,
      views: 312,
      isNew: false,
    },
    {
      id: 4,
      title: "Q2 마케팅 캠페인 런칭 안내",
      content: "2분기 마케팅 캠페인이 시작됩니다.\n\n캠페인명: Spring Innovation 2026\n기간: 2026.04.20 ~ 2026.06.30\n목표: 신규 고객 확보 20% 증가",
      category: "마케팅",
      author: "마케팅팀",
      date: "2026-04-03",
      isPinned: false,
      views: 156,
      isNew: false,
    },
    {
      id: 5,
      title: "사내 복지 제도 개선 안내",
      content: "직원 복지 제도가 개선됩니다.\n\n1. 자기계발비 연 100만원 → 150만원 증액\n2. 건강검진 지원 범위 확대\n3. 동호회 활동비 지원 신설\n\n자세한 내용은 인사팀으로 문의 바랍니다.",
      category: "인사",
      author: "인사팀",
      date: "2026-04-01",
      isPinned: false,
      views: 421,
      isNew: false,
    },
    {
      id: 6,
      title: "경영 실적 보고 - 2026년 1분기",
      content: "1분기 경영 실적을 보고드립니다.\n\n매출: 목표 대비 108% 달성\n영업이익: 전년 동기 대비 15% 증가\n신규 고객: 45개사\n\n모든 임직원의 노고에 감사드립니다.",
      category: "경영",
      author: "경영지원팀",
      date: "2026-03-31",
      isPinned: false,
      views: 387,
      isNew: false,
    },
    {
      id: 7,
      title: "서버 정기 점검 안내",
      content: "서버 정기 점검이 예정되어 있습니다.\n\n일시: 2026년 4월 13일 (토) 02:00 ~ 06:00\n영향: 사내 시스템 일시 중단\n\n점검 시간에는 시스템 접속이 불가합니다.",
      category: "개발",
      author: "개발팀",
      date: "2026-03-28",
      isPinned: false,
      views: 234,
      isNew: false,
    },
  ];

  const categories = ["전체", "인사", "개발", "마케팅", "경영"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "전체" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const pinnedNotices = filteredNotices.filter((n) => n.isPinned);
  const regularNotices = filteredNotices.filter((n) => !n.isPinned);

  const getCategoryColor = (category: Notice["category"]) => {
    const colors = {
      "전체": "bg-gray-100 text-gray-700 hover:bg-gray-100",
      "인사": "bg-blue-100 text-blue-700 hover:bg-blue-100",
      "개발": "bg-green-100 text-green-700 hover:bg-green-100",
      "마케팅": "bg-purple-100 text-purple-700 hover:bg-purple-100",
      "경영": "bg-orange-100 text-orange-700 hover:bg-orange-100",
    };
    return colors[category];
  };

  const NoticeItem = ({ notice }: { notice: Notice }) => (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setSelectedNotice(notice)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            {notice.isPinned && (
              <Pin className="size-4 text-red-500 flex-shrink-0" />
            )}
            <h3 className="font-semibold text-gray-900 flex-1">
              {notice.title}
            </h3>
            {notice.isNew && (
              <Badge className="bg-red-500 text-white hover:bg-red-500 flex-shrink-0">
                NEW
              </Badge>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {notice.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <Badge className={getCategoryColor(notice.category)}>
              {notice.category}
            </Badge>
            <span>{notice.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{notice.date}</span>
            <span>조회 {notice.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Bell className="size-7 text-blue-600" />
            공지사항
          </h2>
          <p className="text-gray-600">회사의 중요한 소식을 확인하세요</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="size-5 mr-2" />
              공지 작성
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>새 공지사항 작성</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="hr">인사</SelectItem>
                    <SelectItem value="dev">개발</SelectItem>
                    <SelectItem value="marketing">마케팅</SelectItem>
                    <SelectItem value="management">경영</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input id="title" placeholder="공지사항 제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  placeholder="공지사항 내용을 작성하세요"
                  rows={8}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinned"
                  className="size-4 rounded border-gray-300"
                />
                <Label htmlFor="pinned" className="text-sm font-normal cursor-pointer">
                  상단 고정
                </Label>
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  등록하기
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

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="공지사항 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="size-5 text-red-500" />
            <h3 className="font-semibold text-gray-900">고정 공지</h3>
          </div>
          <div className="space-y-3">
            {pinnedNotices.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notices */}
      <div className="space-y-3">
        {regularNotices.map((notice) => (
          <NoticeItem key={notice.id} notice={notice} />
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-16">
          <Bell className="size-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedNotice.isPinned && (
                      <Pin className="size-5 text-red-500" />
                    )}
                    <DialogTitle className="text-2xl">
                      {selectedNotice.title}
                    </DialogTitle>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Badge className={getCategoryColor(selectedNotice.category)}>
                      {selectedNotice.category}
                    </Badge>
                    <span>{selectedNotice.author}</span>
                    <span>{selectedNotice.date}</span>
                    <span>조회 {selectedNotice.views}</span>
                  </div>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedNotice.content}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

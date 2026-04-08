import { useState } from "react";
import { Search as SearchIcon, Mail, Phone, MessageCircle, Video } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "업무중" | "휴가" | "자리비움" | "회의중";
  mbti: string;
  avatar: string;
}

export function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("전체");

  const employees: Employee[] = [
    {
      id: 1,
      name: "김민수",
      position: "프론트엔드 개발자",
      department: "개발팀",
      email: "minsu.kim@company.com",
      phone: "010-1234-5678",
      status: "업무중",
      mbti: "INTJ",
      avatar: "김",
    },
    {
      id: 2,
      name: "이지은",
      position: "백엔드 개발자",
      department: "개발팀",
      email: "jieun.lee@company.com",
      phone: "010-2345-6789",
      status: "업무중",
      mbti: "ENFP",
      avatar: "이",
    },
    {
      id: 3,
      name: "박철수",
      position: "프로젝트 매니저",
      department: "기획팀",
      email: "chulsoo.park@company.com",
      phone: "010-3456-7890",
      status: "휴가",
      mbti: "ESTJ",
      avatar: "박",
    },
    {
      id: 4,
      name: "정수진",
      position: "데이터 분석가",
      department: "분석팀",
      email: "sujin.jung@company.com",
      phone: "010-4567-8901",
      status: "업무중",
      mbti: "INFP",
      avatar: "정",
    },
    {
      id: 5,
      name: "최영호",
      position: "UX 디자이너",
      department: "디자인팀",
      email: "youngho.choi@company.com",
      phone: "010-5678-9012",
      status: "회의중",
      mbti: "ENFJ",
      avatar: "최",
    },
    {
      id: 6,
      name: "강민지",
      position: "마케팅 매니저",
      department: "마케팅팀",
      email: "minji.kang@company.com",
      phone: "010-6789-0123",
      status: "업무중",
      mbti: "ESFP",
      avatar: "강",
    },
    {
      id: 7,
      name: "윤서준",
      position: "인사 담당",
      department: "인사팀",
      email: "seojun.yoon@company.com",
      phone: "010-7890-1234",
      status: "자리비움",
      mbti: "ISFJ",
      avatar: "윤",
    },
    {
      id: 8,
      name: "한지민",
      position: "재무 담당",
      department: "재무팀",
      email: "jimin.han@company.com",
      phone: "010-8901-2345",
      status: "업무중",
      mbti: "ISTJ",
      avatar: "한",
    },
  ];

  const departments = ["전체", ...Array.from(new Set(employees.map(e => e.department)))];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === "전체" || employee.department === selectedDept;
    
    return matchesSearch && matchesDept;
  });

  const getStatusBadge = (status: Employee["status"]) => {
    const configs = {
      "업무중": { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
      "휴가": { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
      "자리비움": { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
      "회의중": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    };
    const config = configs[status];
    return (
      <div className={`${config.bg} ${config.text} px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5`}>
        <div className={`size-2 rounded-full ${config.dot}`}></div>
        {status}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">직원 조회</h2>
        <p className="text-gray-600">직원 정보를 검색하고 연락하세요</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="이름, 부서, 직책, 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Department Filter */}
      <Tabs defaultValue="전체" className="mb-6" onValueChange={setSelectedDept}>
        <TabsList>
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {employee.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                </div>
              </div>

              {/* Status & MBTI */}
              <div className="flex items-center gap-2 mb-4">
                {getStatusBadge(employee.status)}
                <Badge variant="outline" className="text-xs">
                  {employee.mbti}
                </Badge>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium w-12">부서</span>
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="size-4 flex-shrink-0" />
                  <span className="truncate text-xs">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="size-4 flex-shrink-0" />
                  <span className="text-xs">{employee.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <MessageCircle className="size-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Phone className="size-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Video className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

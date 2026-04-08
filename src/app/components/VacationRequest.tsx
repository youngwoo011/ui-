import { useState } from "react";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

interface VacationData {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  days: number;
}

export function VacationRequest() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<VacationData>({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    days: 0,
  });

  const vacationBalance = {
    total: 15,
    used: 7,
    remaining: 8,
  };

  const vacationHistory = [
    {
      id: 1,
      type: "연차",
      startDate: "2026-03-10",
      endDate: "2026-03-12",
      days: 3,
      status: "승인",
      requestDate: "2026-03-01",
    },
    {
      id: 2,
      type: "반차",
      startDate: "2026-02-15",
      endDate: "2026-02-15",
      days: 0.5,
      status: "승인",
      requestDate: "2026-02-10",
    },
    {
      id: 3,
      type: "연차",
      startDate: "2026-01-20",
      endDate: "2026-01-22",
      days: 3,
      status: "승인",
      requestDate: "2026-01-10",
    },
    {
      id: 4,
      type: "반차",
      startDate: "2026-01-05",
      endDate: "2026-01-05",
      days: 0.5,
      status: "승인",
      requestDate: "2026-01-02",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here: POST /api/vacation-requests
    alert("휴가 신청이 제출되었습니다.");
    setShowForm(false);
    setFormData({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
      days: 0,
    });
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    const newFormData = { ...formData, [field]: value };
    if (newFormData.startDate && newFormData.endDate) {
      newFormData.days = calculateDays(newFormData.startDate, newFormData.endDate);
    }
    setFormData(newFormData);
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string; text: string }> = {
      "승인": { bg: "bg-green-100", text: "text-green-700" },
      "대기": { bg: "bg-yellow-100", text: "text-yellow-700" },
      "반려": { bg: "bg-red-100", text: "text-red-700" },
    };
    const config = configs[status] || configs["대기"];
    return (
      <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">휴가 신청</h2>
        <p className="text-gray-600">연차 및 휴가를 신청하고 관리하세요</p>
      </div>

      {/* Vacation Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-gray-600 mb-1">총 연차</div>
            <div className="text-3xl font-semibold text-gray-900">{vacationBalance.total}일</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-gray-600 mb-1">사용</div>
            <div className="text-3xl font-semibold text-orange-600">{vacationBalance.used}일</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="text-sm text-gray-600 mb-1">잔여</div>
            <div className="text-3xl font-semibold text-blue-600">{vacationBalance.remaining}일</div>
          </CardContent>
        </Card>
      </div>

      {/* Request Button */}
      {!showForm && (
        <Button 
          onClick={() => setShowForm(true)}
          className="mb-6 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="size-5 mr-2" />
          새 휴가 신청
        </Button>
      )}

      {/* Request Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>휴가 신청서</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowForm(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">휴가 유형</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="휴가 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="연차">연차</SelectItem>
                      <SelectItem value="반차">반차</SelectItem>
                      <SelectItem value="병가">병가</SelectItem>
                      <SelectItem value="경조사">경조사</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>신청 기간</Label>
                  <div className="text-lg font-semibold text-blue-600">
                    {formData.days > 0 ? `${formData.days}일` : "-"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">시작일</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleDateChange("startDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">종료일</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleDateChange("endDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">사유</Label>
                <Textarea
                  id="reason"
                  placeholder="휴가 사유를 입력하세요"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  신청하기
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  취소
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Vacation History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="size-5" />
            휴가 신청 내역
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vacationHistory.map((vacation) => (
              <div
                key={vacation.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">{vacation.type}</span>
                    {getStatusBadge(vacation.status)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {vacation.startDate} ~ {vacation.endDate} ({vacation.days}일)
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    신청일: {vacation.requestDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

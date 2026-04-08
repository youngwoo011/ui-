import { useState } from "react";
import { Star, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function Evaluation() {
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const myEvaluation = {
    period: "2026년 1분기",
    score: 4.2,
    maxScore: 5,
    categories: [
      { name: "업무 성과", score: 4.5, maxScore: 5 },
      { name: "협업 능력", score: 4.0, maxScore: 5 },
      { name: "전문성", score: 4.3, maxScore: 5 },
      { name: "의사소통", score: 4.0, maxScore: 5 },
      { name: "책임감", score: 4.2, maxScore: 5 },
    ],
    feedback: "뛰어난 기술력과 책임감을 보여주셨습니다. 팀 협업에서도 좋은 모습을 보여주셨으며, 다음 분기에도 계속해서 성장하실 것으로 기대합니다.",
    evaluator: "김팀장",
  };

  const teamToEvaluate = [
    {
      id: 1,
      name: "김민수",
      position: "프론트엔드 ���발자",
      department: "개발팀",
      status: "평가 대기",
    },
    {
      id: 2,
      name: "이지은",
      position: "백엔드 개발자",
      department: "개발팀",
      status: "평가 완료",
    },
    {
      id: 3,
      name: "박철수",
      position: "프로젝트 매니저",
      department: "기획팀",
      status: "평가 대기",
    },
  ];

  const evaluationHistory = [
    { period: "2026 Q1", score: 4.2, rank: "A" },
    { period: "2025 Q4", score: 4.0, rank: "B+" },
    { period: "2025 Q3", score: 4.3, rank: "A" },
    { period: "2025 Q2", score: 3.8, rank: "B" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">사내 평가</h2>
        <p className="text-gray-600">성과 평가 결과를 확인하고 동료를 평가하세요</p>
      </div>

      <Tabs defaultValue="my-evaluation" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-evaluation">내 평가</TabsTrigger>
          <TabsTrigger value="team-evaluation">동료 평가</TabsTrigger>
          <TabsTrigger value="history">평가 이력</TabsTrigger>
        </TabsList>

        {/* My Evaluation */}
        <TabsContent value="my-evaluation" className="space-y-6">
          {/* Overall Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">전체 평가</div>
                  <Award className="size-8 text-yellow-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {myEvaluation.score}
                </div>
                <div className="text-sm text-gray-600">/ {myEvaluation.maxScore}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">평가 기간</div>
                  <TrendingUp className="size-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {myEvaluation.period}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">등급</div>
                  <Star className="size-8 text-purple-500" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">A</div>
                <div className="text-sm text-gray-600">상위 15%</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Scores */}
          <Card>
            <CardHeader>
              <CardTitle>평가 항목별 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myEvaluation.categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {category.score} / {category.maxScore}
                      </span>
                    </div>
                    <Progress value={(category.score / category.maxScore) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>평가 의견</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                {myEvaluation.feedback}
              </p>
              <div className="text-sm text-gray-600">
                평가자: <span className="font-medium">{myEvaluation.evaluator}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Evaluation */}
        <TabsContent value="team-evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>평가 대상</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamToEvaluate.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {person.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{person.name}</h4>
                        <p className="text-sm text-gray-600">
                          {person.position} · {person.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          person.status === "평가 완료"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                        }
                      >
                        {person.status}
                      </Badge>
                      {person.status === "평가 대기" && (
                        <Button
                          size="sm"
                          onClick={() => setSelectedPerson(person.id)}
                        >
                          평가하기
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedPerson && (
            <Card>
              <CardHeader>
                <CardTitle>평가 작성</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {myEvaluation.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <Label>{category.name}</Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <button
                            key={score}
                            type="button"
                            className="size-10 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center font-medium"
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label htmlFor="feedback">평가 의견</Label>
                    <Textarea
                      id="feedback"
                      placeholder="평가 의견을 작성해주세요"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      제출하기
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedPerson(null)}
                    >
                      취소
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Evaluation History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>평가 이력</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evaluationHistory.map((item) => (
                  <div
                    key={item.period}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">
                        {item.period}
                      </div>
                      <div className="text-sm text-gray-600">
                        평점: {item.score} / 5.0
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-lg px-4 py-2">
                      {item.rank}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

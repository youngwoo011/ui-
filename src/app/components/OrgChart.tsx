import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface OrgNode {
  id: number;
  name: string;
  position: string;
  department: string;
  mbti: string;
  children?: OrgNode[];
}

export function OrgChart() {
  const orgData: OrgNode = {
    id: 1,
    name: "김대표",
    position: "대표이사",
    department: "경영진",
    mbti: "ENTJ",
    children: [
      {
        id: 2,
        name: "이부장",
        position: "개발본부장",
        department: "개발본부",
        mbti: "INTJ",
        children: [
          {
            id: 3,
            name: "박팀장",
            position: "프론트엔드팀장",
            department: "개발팀",
            mbti: "ENFP",
            children: [
              { id: 4, name: "김민수", position: "선임개발자", department: "개발팀", mbti: "INTJ" },
              { id: 5, name: "이지은", position: "주임개발자", department: "개발팀", mbti: "ENFP" },
            ],
          },
          {
            id: 6,
            name: "최팀장",
            position: "백엔드팀장",
            department: "개발팀",
            mbti: "ISTJ",
            children: [
              { id: 7, name: "정수진", position: "선임개발자", department: "개발팀", mbti: "INFP" },
              { id: 8, name: "강민지", position: "주임개발자", department: "개발팀", mbti: "ESFP" },
            ],
          },
        ],
      },
      {
        id: 9,
        name: "한부장",
        position: "경영지원본부장",
        department: "경영지원본부",
        mbti: "ESTJ",
        children: [
          {
            id: 10,
            name: "윤팀장",
            position: "인사팀장",
            department: "인사팀",
            mbti: "ISFJ",
            children: [
              { id: 11, name: "박철수", position: "인사담당", department: "인사팀", mbti: "ESTJ" },
            ],
          },
          {
            id: 12,
            name: "송팀장",
            position: "재무팀장",
            department: "재무팀",
            mbti: "ISTJ",
            children: [
              { id: 13, name: "최영호", position: "재무담당", department: "재무팀", mbti: "ENFJ" },
            ],
          },
        ],
      },
      {
        id: 14,
        name: "신부장",
        position: "사업본부장",
        department: "사업본부",
        mbti: "ENTP",
        children: [
          {
            id: 15,
            name: "조팀장",
            position: "마케팅팀장",
            department: "마케팅팀",
            mbti: "ENFJ",
          },
          {
            id: 16,
            name: "안팀장",
            position: "영업팀장",
            department: "영업팀",
            mbti: "ESFJ",
          },
        ],
      },
    ],
  };

  const OrgNode = ({ node, level = 0 }: { node: OrgNode; level?: number }) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div className="flex flex-col items-center">
        {/* Node Card */}
        <Card className="hover:shadow-lg transition-shadow w-64">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                {node.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{node.name}</h3>
                <p className="text-sm text-gray-600 truncate">{node.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {node.department}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {node.mbti}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Connector Line */}
        {hasChildren && (
          <div className="w-0.5 h-8 bg-gray-300"></div>
        )}

        {/* Children */}
        {hasChildren && (
          <div className="flex flex-col items-center">
            {/* Horizontal Line */}
            {node.children!.length > 1 && (
              <div className="relative w-full h-0.5 bg-gray-300">
                <div className="absolute top-0 left-0 w-full h-full flex justify-between">
                  {node.children!.map((_, index) => (
                    <div
                      key={index}
                      className="w-0.5 h-8 bg-gray-300"
                      style={{
                        marginLeft: index === 0 ? '0' : 'auto',
                        marginRight: index === node.children!.length - 1 ? '0' : 'auto',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Child Nodes */}
            <div className="flex gap-8 mt-8">
              {node.children!.map((child) => (
                <OrgNode key={child.id} node={child} level={level + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">조직도</h2>
        <p className="text-gray-600">회사의 조직 구조를 확인하세요</p>
      </div>

      {/* Organization Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 overflow-x-auto">
        <div className="inline-block min-w-full">
          <OrgNode node={orgData} />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-blue-500"></div>
          <span>경영진</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-green-500"></div>
          <span>본부장</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-orange-500"></div>
          <span>팀장</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-purple-500"></div>
          <span>팀원</span>
        </div>
      </div>
    </div>
  );
}

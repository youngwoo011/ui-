import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  Calendar as CalendarIcon,
  Search as SearchIcon,
  MessageSquare,
  ClipboardCheck,
  GitBranch,
  Heart,
  UsersRound,
  FileText,
  CheckSquare,
  Plane,
  Bell
} from "lucide-react";
import { cn } from "./ui/utils";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "대시보드", icon: LayoutDashboard, category: "main" },
    { path: "/notice", label: "공지사항", icon: Bell, category: "main" },
    { path: "/employees", label: "직원조회", icon: Users, category: "main" },
    { path: "/vacation", label: "휴가신청", icon: Plane, category: "main" },
    { path: "/calendar", label: "캘린더", icon: CalendarIcon, category: "main" },
    { path: "/search", label: "업무검색", icon: SearchIcon, category: "main" },
    { path: "/chat", label: "채팅", icon: MessageSquare, category: "main" },
    { path: "/evaluation", label: "사내평가", icon: ClipboardCheck, category: "main" },
    { path: "/approval", label: "결재", icon: CheckSquare, category: "main" },
    { path: "/org-chart", label: "조직도", icon: GitBranch, category: "extra" },
    { path: "/heart-letter", label: "마음의편지", icon: Heart, category: "extra" },
    { path: "/community", label: "커뮤니티", icon: UsersRound, category: "extra" },
    { path: "/handover", label: "인수인계", icon: FileText, category: "extra" },
  ];

  const mainItems = navItems.filter(item => item.category === "main");
  const extraItems = navItems.filter(item => item.category === "extra");

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">WorkHub</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3">
          {/* Main Navigation */}
          <div className="mb-6">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              주요 기능
            </div>
            <div className="space-y-1">
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm",
                      active
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="size-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Extra Features */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              부가 기능
            </div>
            <div className="space-y-1">
              {extraItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm",
                      active
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="size-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              홍
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">홍길동</div>
              <div className="text-xs text-gray-600">개발팀 · 팀장</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
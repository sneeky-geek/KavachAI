import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  user: {
    name: string;
    initials: string;
    role: string;
    details: {
      label: string;
      value: string;
    }[];
    stats?: {
      label: string;
      value: string;
    }[];
  };
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="w-full lg:w-64 p-4 bg-white border-r">
      <Card className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarFallback className="text-xl">{user.initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{user.role}</p>
          
          <div className="w-full space-y-2">
            {user.details.map((detail, index) => (
              <div key={index} className="text-left">
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                <p className="font-medium">{detail.value}</p>
              </div>
            ))}
          </div>

          {user.stats && (
            <div className="mt-6 w-full bg-primary/5 rounded-lg p-4">
              {user.stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                  <span className="text-sm">{stat.label}</span>
                  <span className="font-semibold text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
